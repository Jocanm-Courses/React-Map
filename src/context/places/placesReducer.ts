import { Feature } from '../../interfaces/places';
import { PlacesProps } from './PlacesProvider';


type PlacesAction =
    | { type: 'setUserLocation', payload: [number, number] }
    | { type: 'setPlaces', payload: Feature[] }
    | { type: 'setIsLoading', payload: boolean }


export const placesReducer = (state: PlacesProps, { payload, type }: PlacesAction): PlacesProps => {

    switch (type) {
        case 'setUserLocation':

            return {
                ...state,
                isLoading: false,
                userLocation: payload
            }

        case 'setIsLoading':
            return {
                ...state,
                isLoadingPlaces: payload,
                places: []
            }

        case 'setPlaces':
            return {
                ...state,
                isLoadingPlaces: false,
                places: payload
            }

        default:
            return state
    }

}