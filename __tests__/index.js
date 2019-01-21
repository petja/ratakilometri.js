const { getRoute, getDistance } = require('../dist/index').default()

// Get route
test('getRoute return array', () => {
  const route = getRoute('HL', 'TL')

  expect(route).toEqual(expect.arrayContaining(['KU', 'VIN', 'LTS', 'PRL']))
})

// Kehärata
test('Distance from HKI to HPL', () => {
  const distance = getDistance('HKI', 'HPL')
  expect(distance).toBe(6257)
})

test('Distance from HPL to LEN', () => {
  const distance = getDistance('HPL', 'LEN')
  expect(distance).toBe(20231)
})

test('Distance from LEN to TKL', () => {
  const distance = getDistance('LEN', 'TKL')
  expect(distance).toBe(8540)
})

test('Distance from TKL to HKI', () => {
  const distance = getDistance('TKL', 'HKI')
  expect(distance).toBe(14683)
})

// Keravan kaupunkirata
test('Distance from HKI to KE', () => {
  const distance = getDistance('HKI', 'KE')
  expect(distance).toBe(27694)
})

// Leppävaaran kaupunkirata
test('Distance from HKI to LPV', () => {
  const distance = getDistance('HKI', 'LPV')
  expect(distance).toBe(11047)
})

// Päärata
test('Distance from HKI to PRI', () => {
  const distance = getDistance('HKI', 'PRI')
  expect(distance).toBe(318603)
})

test('Distance from HKI to KLI', () => {
  const distance = getDistance('HKI', 'KLI')
  expect(distance).toBe(994512)
})

// Others
test('Distance from VSA to ÄKI', () => {
  const distance = getDistance('VSA', 'ÄKI')
  expect(distance).toBe(379191)
})

test('Distance from TKU to SL', () => {
  const distance = getDistance('TKU', 'SL')
  expect(distance).toBe(567236)
})

test('Distance from ROI to VUS', () => {
  const distance = getDistance('ROI', 'VUS')
  expect(distance).toBe(474062)
})

test('Distance from RI to HNK', () => {
  const distance = getDistance('RI', 'HNK')
  expect(distance).toBe(161215)
})
