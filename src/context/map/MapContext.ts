import { createContext, useContext } from 'react';
import { Map } from 'mapbox-gl';


export interface MapContextProps {
    isMapReady: boolean;
    map?: Map

    setMap: (map: Map) => void;
}


export const MapContext = createContext({} as MapContextProps);

export const useMapContext = () => {
    return useContext(MapContext);
}