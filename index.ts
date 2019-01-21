import Graph from 'node-dijkstra'
import edges from './edges'

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

export default () => {
  const graph = new Graph(createGraph())

  return {
    getRoute: (fromStation, toStation, opts = {}) =>
      graph.path(fromStation, toStation, opts),

    getDistance: (fromStation, toStation, opts = {}) =>
      graph.path(fromStation, toStation, { ...opts, cost: true }).cost,
  }
}
