const Graph = require('node-dijkstra')
const edges = require('./edges')

const createGraph = () =>
  edges.reduce((acc, { stationA, stationB, distance }) => {
    // Create connection both ways
    acc = createConnection(stationA, stationB, distance, acc)
    acc = createConnection(stationB, stationA, distance, acc)

    return acc
  }, {})

const createConnection = (stationA, stationB, distance, obj) => {
  if (!obj[stationA]) obj[stationA] = {}
  obj[stationA][stationB] = distance
  return obj
}

module.exports = () => {
  const graph = new Graph(createGraph())

  return {
    getRoute: (fromStation, toStation, opts = {}) =>
      graph.path(fromStation, toStation, opts),

    getDistance: (fromStation, toStation, opts = {}) =>
      graph.path(fromStation, toStation, { ...opts, cost: true }).cost,
  }
}
