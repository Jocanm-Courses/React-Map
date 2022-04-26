import React, { useEffect, useReducer } from 'react'
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';
import { getUserLocation } from '../../helpers/getUserLocation';
import { searchApi } from '../../apis';
import { Feature, PlacesResponse } from '../../interfaces/places';

export interface PlacesProps {
    isLoading: boolean
    userLocation?: [number, number]
    isLoadingPlaces: boolean;
    places: Feature[]
}

const INITIAL_STATE: PlacesProps = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: []
}

interface CompProps {
    children: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({ children }: CompProps) => {

    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE)

    useEffect(() => {
        getUserLocation()
            .then(coords => {
                dispatch({
                    type: 'setUserLocation',
                    payload: coords
                })
            })
    }, [])

    const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {

        if (query.length === 0) {
            dispatch({ type: "setPlaces", payload: [] })
            return []
        } //Todo: Limpiar el state
        if (!state.userLocation) throw new Error('No se pudo obtener la ubicación del usuario');

        dispatch({ type: "setIsLoading", payload: true })

        const { data } = await searchApi.get<PlacesResponse>(`${query}.json`, {
            params: {
                proximity: state.userLocation.join(',')
            }
        })

        dispatch({ type: "setPlaces", payload: data.features })

        return data.features
    }

    return (
        <PlacesContext.Provider value={{
            ...state,

            // Methods
            searchPlacesByTerm
        }}>
            {children}
        </PlacesContext.Provider>
    )
}
