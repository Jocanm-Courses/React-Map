import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import './index.css'


mapboxgl.accessToken = 'pk.eyJ1Ijoiam9jYW5tIiwiYSI6ImNsMmRyNm9vZjExeWgzbnBkbHFpb2Q0YXMifQ.OhnIhYdVSC5PvhgwiIaYlw';

if (!navigator.geolocation) {
  alert('Geolocation is not supported by your browser')
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);

