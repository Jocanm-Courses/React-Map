import React, { useEffect, useReducer } from 'react'
import { Map, Marker, Popup } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { MapReducer } from './MapReducer';
import { usePlacesContext } from '../';

export interface MapProps {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
}

const INITIAL_STATE: MapProps = {
    isMapReady: false,
    map: undefined,
    markers: []
}

interface CompProps {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: CompProps) => {

    const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE)

    const { places } = usePlacesContext()

    const setMap = (map: Map) => {

        const myLocationPopup = new Popup()
            .setHTML(`
                <h4>Aqui estoy</h4>
                <p>${map.getCenter().toArray().join(', ')}</p>
            `)

        new Marker()
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopup)
            .addTo(map);

        dispatch({ type: 'setMap', payload: map })
    }

    useEffect(() => {

        state.markers.forEach(marker => marker.remove())

        const newMarkers: Marker[] = []

        for (const place of places) {
            console.log(place)
            const [lng, lat] = place.center
            const popup = new Popup()
                .setHTML(`
                    <h6>${place.text_es}</h6>
                    <p>${place.place_name_es}</p>
                `)

            const newMaker = new Marker()
                .setLngLat([lng, lat])
                .setPopup(popup)
                .addTo(state.map!)

            newMarkers.push(newMaker)
        }

        dispatch({ type: 'setMarkers', payload: newMarkers })

    }, [places])

    return (
        <MapContext.Provider
            value={{
                ...state,
                setMap
            }}
        >
            {children}
        </MapContext.Provider>
    )
}
