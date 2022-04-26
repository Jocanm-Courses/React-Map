import React from 'react'
import { MapView, MyLocationBtn, SearchBar } from '../components'

export const HomePage = () => {
    return (
        <>
            <MapView />
            <MyLocationBtn />
            <SearchBar />
        </>
    )
}
