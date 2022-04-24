export const getUserLocation = async (): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve([position.coords.longitude, position.coords.latitude])
            },
            (error) => {
                alert('Could not get your location. Please try again.')
                console.log(error)
                reject(error)
            }
        )

    })
}