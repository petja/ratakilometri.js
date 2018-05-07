const Graph = require('node-dijkstra')
const fetch = require('node-fetch')

const toJSON = (resp) => resp.json()

async function getAllStations() {
    const url = `https://rata.digitraffic.fi/infra-api/0.2/rautatieliikennepaikat.json`
    
    const infraStations = await fetch(url).then(toJSON)
    const stationOIDs = Object.keys(infraStations)

    const stations = stationOIDs.reduce((acc1, oid) => {
        const station = infraStations[oid][0]
        const code = station.lyhenne.toUpperCase()

        const locations = getLocationsOfStation(station)

        Object.keys(locations).forEach((trackId) => {
            const distance = locations[trackId]

            if(! acc1[trackId]) acc1[trackId] = []
            acc1[trackId].push({code, distance})
        })

        return acc1
    }, {})

    console.log(getDistancesWithinTrack(stations['003']))

    //console.log(require('util').inspect(stations, {colors: true}))
}

// MAIN
getAllStations().catch(err => console.error(err))
/////////

/*
    Get distances between all stations within track

    Expecting array like:
    [{"code": "HL", "distance": 107}, {"code": "KE", "distance": 29}]

    Returning object like:
    {"HL": {"KE": 78}, "KE": {"HL": 79}}
*/
const getDistancesWithinTrack = (trackStations) => (
    trackStations.reduce((acc1, locationA) => ({
        ...acc1,
        [locationA.code]: trackStations.filter(locationB => (
            // Routing isn't possible if there's an infinite loop
            locationA.code !== locationB.code
        )).reduce((acc2, locationB) => ({
            ...acc2,
            [locationB.code]: Math.abs(locationA.distance - locationB.distance)
        }), {})
    }), {})
)

// Get track locations of single station
// Returns object {"trackA": 123.45, "trackB": 234.56}
const getLocationsOfStation = (station) => {
    const locations = station.muutRatakmsijainnit

    if(station.virallinenRatakmsijainti) {
        locations.push(station.virallinenRatakmsijainti)
    }

    return locations.reduce((acc, location) => ({
        ...acc,
        [location.ratanumero]   : location.ratakm + location.etaisyys / 1000,
    }), {})
}

// YOLO
const yolo = (tracks) => (
    Object.keys(tracks).reduce((acc, trackId) => {
        if (! acc[trackId]) acc[trackId] = {}

        acc[trackId] = {
            ...acc[trackId],
            ...tracks[trackId],
        }

        return acc
    })
)