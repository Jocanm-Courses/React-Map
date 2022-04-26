import React from 'react'
import { useRef } from 'react';
import { usePlacesContext } from '../context';
import { SearchResult } from './SearchResult';

export const SearchBar = () => {

    const { searchPlacesByTerm } = usePlacesContext()

    const debounceRef = useRef<NodeJS.Timeout>();

    const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(event.target.value);
        }, 500);
    }

    return (
        <div className='search-container'>

            <input
                className='form-control'
                type='text'
                placeholder='Buscar...'
                onChange={onQueryChange}
            />

            <SearchResult />

        </div>
    )
}
