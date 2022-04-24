import { createContext, useContext } from "react";


export interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: [number, number];
}

export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);

export const usePlacesContext = () => {
    return useContext(PlacesContext);
};
