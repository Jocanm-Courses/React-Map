//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map } from '!mapbox-gl';
import { useLayoutEffect, useRef } from 'react';
import { useMapContext, usePlacesContext } from '../context';
import { Loading } from './';

export const MapView = () => {

    const { isLoading, userLocation } = usePlacesContext();
    const { setMap } = useMapContext()
    const mapDiv = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {

        if (!isLoading) {
            const map = new Map({
                container: mapDiv.current!, // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: userLocation, // starting position [lng, lat]
                zoom: 14 // starting zoom
            });
            setMap(map)
        }

    }, [isLoading])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div
            ref={mapDiv}
            style={{
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0
            }}
        >
            {userLocation?.join(', ')}
        </div>
    )
}
