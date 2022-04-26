import axios from "axios";


export const directionsApi = axios.create({
    baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: "pk.eyJ1Ijoiam9jYW5tIiwiYSI6ImNsMmRyNm9vZjExeWgzbnBkbHFpb2Q0YXMifQ.OhnIhYdVSC5PvhgwiIaYlw"
    }
})