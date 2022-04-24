import { PlacesProps } from './PlacesProvider';


type PlacesAction = {
    type: 'setUserLocation', payload: [number, number]
}

export const placesReducer = (state: PlacesProps, { payload, type }: PlacesAction): PlacesProps => {

    switch (type) {
        case 'setUserLocation':

            return {
                ...state,
                isLoading: false,
                userLocation: payload
            }

        default:
            return state
    }

}