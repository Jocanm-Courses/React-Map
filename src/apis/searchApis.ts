import axios from "axios";


export const searchApi = axios.create({
    baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
    params: {
        limit: 6,
        language: 'es',
        access_token: "pk.eyJ1Ijoiam9jYW5tIiwiYSI6ImNsMmRyNm9vZjExeWgzbnBkbHFpb2Q0YXMifQ.OhnIhYdVSC5PvhgwiIaYlw"
    }
})