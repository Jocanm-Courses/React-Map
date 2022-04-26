//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from '!mapbox-gl';
import React, { useEffect, useReducer } from 'react';
import { usePlacesContext } from '../';
import { directionsApi } from '../../apis/directionsApis';
import { DirectionsResponse } from '../../interfaces/directions';
import { MapContext } from './MapContext';
import { MapReducer } from './MapReducer';

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

    const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {

        const { data } = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)

        const { distance, duration, geometry: { coordinates: coords } } = data.routes[0]

        const kms = Number((distance / 1000).toFixed(2))
        const minutes = Math.floor(duration / 60)

        const bounds = new LngLatBounds(
            start, start
        )

        for (const coord of coords) {

            bounds.extend(coord as [number, number])
            state.map?.fitBounds(bounds, { padding: 100 })
        }

        // Polyline

        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        if (state.map?.getLayer('routeString')) {
            state.map?.removeLayer('routeString')
            state.map?.removeSource('routeString')
        }

        state.map?.addSource('routeString', sourceData)
        state.map?.addLayer({
            id: 'routeString',
            type: 'line',
            source: 'routeString',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#3bb2d0',
                'line-width': 3
            }
        })

    }

    return (
        <MapContext.Provider
            value={{
                ...state,

                // Methods
                setMap,
                getRouteBetweenPoints
            }}
        >
            {children}
        </MapContext.Provider>
    )
}
