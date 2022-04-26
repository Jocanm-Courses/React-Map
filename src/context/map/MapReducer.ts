//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map, Marker } from '!mapbox-gl';
import { MapProps } from './MapProvider';

type MapAction =
    | { type: 'setMap', payload: Map }
    | { type: 'setMarkers', payload: Marker[] }

export const MapReducer = (state: MapProps, { payload, type }: MapAction): MapProps => {

    switch (type) {

        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: payload
            }

        case "setMarkers":
            return {
                ...state,
                markers: payload
            }

        default:
            return state;
    }

}