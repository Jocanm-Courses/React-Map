import React from 'react';
import { useMapContext, usePlacesContext } from '../context';

const styles: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: '999'
}

export const MyLocationBtn = () => {

    const { isMapReady, map } = useMapContext()
    const { userLocation } = usePlacesContext()

    const handleOnClick = () => {
        if (!isMapReady || !map) {
            throw new Error('Mapa no esta listo')
        }

        if (!userLocation) {
            throw new Error('No hay ubicacion')
        }

        map.flyTo({
            center: userLocation,
            zoom: 15
        })
    }

    return (
        <button
            onClick={handleOnClick}
            style={styles}
            className='btn btn-primary'
        >
            Mi ubicación
        </button>
    )
}


