import React, { useEffect, useReducer } from 'react'
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';
import { getUserLocation } from '../../helpers/getUserLocation';

export interface PlacesProps {
    isLoading: boolean
    userLocation?: [number, number]
}

const INITIAL_STATE: PlacesProps = {
    isLoading: true,
    userLocation: undefined
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

    return (
        <PlacesContext.Provider value={state}>
            {children}
        </PlacesContext.Provider>
    )
}
