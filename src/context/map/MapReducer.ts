import { Map } from 'mapbox-gl';
import { MapProps } from './MapProvider';

type MapAction = { type: 'setMap', payload: Map }

export const MapReducer = (state: MapProps, { payload, type }: MapAction): MapProps => {

    switch (type) {

        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: payload
            }

        default:
            return state;
    }

}