import { useEffect, useState } from 'react';
import { useMapContext, usePlacesContext } from '../context';
import { LoadingPlaces } from './';
import { Feature } from '../interfaces/places';

export const SearchResult = () => {

    const { places, isLoadingPlaces, userLocation } = usePlacesContext()
    const { isMapReady, map, getRouteBetweenPoints } = useMapContext()

    const [activePlace, setActivePlace] = useState("")

    const handleGetRoute = (place: Feature) => {
        if (!userLocation) return;
        const [lng, lat] = place.center

        getRouteBetweenPoints(userLocation, [lng, lat])
    }

    const handleOnClick = (place: Feature) => {

        if (!isMapReady || !map) {
            return alert('Mapa no esta listo')
        }

        setActivePlace(place.id)

        map.flyTo({
            center: place.center as [number, number],
            zoom: 15
        })

    }

    useEffect(() => {
        if (!places.length) {
            setActivePlace("")
        }
    }, [places])

    if (isLoadingPlaces) {
        return <LoadingPlaces />
    }

    if (places.length === 0) {
        return <></>
    }

    return (
        <ul className='list-group mt-3'>

            {
                places.map(place => (
                    <li
                        onClick={() => handleOnClick(place)}
                        key={place.id}
                        style={{ cursor: 'pointer' }}
                        className={`list-group-item list-group-item-action cursor-pointer ${activePlace === place.id && 'active'}`}
                    >
                        <h6>{place.text_es}</h6>
                        <p
                            style={{ fontSize: '0.8rem' }}
                        >
                            {place.place_name}
                        </p>

                        <button
                            onClick={() => handleGetRoute(place)}
                            className={`btn btn-sm ${activePlace === place.id ? "btn-outline-light" : "btn-outline-primary"}`}
                        >
                            Direcciones
                        </button>
                    </li>
                ))
            }

        </ul>
    )
}
