import React, { useReducer } from 'react'
import { Map, Marker, Popup } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { MapReducer } from './MapReducer';

export interface MapProps {
    isMapReady: boolean;
    map?: Map;
}

const INITIAL_STATE: MapProps = {
    isMapReady: false,
    map: undefined
}

interface CompProps {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: CompProps) => {

    const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE)

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
