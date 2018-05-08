const Graph = require('node-dijkstra')
const fetch = require('node-fetch')

// Config
const CACHE_MAX_AGE = 3600000

const toJSON = (resp) => resp.json()

let cached = {}
let cachedAt = null

const getRoute = async (fromStation, toStation, opts = {}) => {
    const distances = await getDistances()
    const graph = new Graph(distances)

    const {path, cost} = graph.path(fromStation, toStation, {
        ...opts,
        cost            : true,
    })

    return {
        route           : path,
        distance        : cost,
    }
}

const getDistance = async (fromStation, toStation, opts) => (
    await (getRoute(fromStation, toStation, opts)).distance
)

const getAllStations = () => {
    const url = `https://rata.digitraffic.fi/infra-api/0.2/rautatieliikennepaikat.json`
    return fetch(url).then(toJSON)
}

const getDistances = async () => {
    // If cache isn't stale, return distance data straight from the cache
    const cacheInvalidAt = Date.now() - CACHE_MAX_AGE
    if(cachedAt >= cacheInvalidAt) return cached

    const stations = await getAllStations()
    const groupedByTrack = groupStationsByTrackId(stations)

    cached = processAllTracks(groupedByTrack)
    cachedAt = Date.now()

    return cached
}

const processAllTracks = (groupedByTrack) => (
    Object.keys(groupedByTrack).reduce((acc, trackId) => {
        const distances = getDistancesWithinTrack(groupedByTrack[trackId])

        return Object.keys(distances).reduce((acc2, fromStation) => {
            if(!acc2[fromStation]) acc2[fromStation] = {}

            acc2[fromStation] = {
                ...acc[fromStation],
                ...distances[fromStation],
            }

            return acc2
        }, acc)
    }, {})
)

/*
    Group stations by track they belong to

    Expected input:
    {"x.x.xxx.LIVI.INFRA.39.81260": {}}

    Expected output:
    {"003": [{"code": "HL", "distance": 107}], "007": []}
*/
const groupStationsByTrackId = (stations) => (
    Object.keys(stations).reduce((acc1, oid) => {
        const station = stations[oid][0]
        const code = station.lyhenne.toUpperCase()

        const locations = getLocationsOfStation(station)

        Object.keys(locations).forEach((trackId) => {
            const distance = locations[trackId]

            if(! acc1[trackId]) acc1[trackId] = []
            acc1[trackId].push({code, distance})
        })

        return acc1
    }, {})
)

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

module.exports = {
    getRoute,
    getDistance,
}