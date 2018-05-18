const { getRoute } = require('../index')

// Data output
test('getRoute returns object with following keys: route, distance', () => {
    return getRoute('HL', 'TL').then(({ route, distance }) => {
        expect(route).toBeDefined()
        expect(distance).toBeDefined()
    })
})

// Kehärata
test('Distance from HKI to HPL', () => {
    return getRoute('HKI', 'HPL').then(({ distance }) => {
        expect(distance).toBe(6257)
    })
})

test('Distance from HPL to LEN', () => {
    return getRoute('HPL', 'LEN').then(({ distance }) => {
        expect(distance).toBe(20231)
    })
})

test('Distance from LEN to TKL', () => {
    return getRoute('LEN', 'TKL').then(({ distance }) => {
        expect(distance).toBe(8540)
    })
})

test('Distance from TKL to HKI', () => {
    return getRoute('TKL', 'HKI').then(({ distance }) => {
        expect(distance).toBe(14683)
    })
})

// Keravan kaupunkirata
test('Distance from HKI to KE', () => {
    return getRoute('HKI', 'KE').then(({ distance }) => {
        expect(distance).toBe(27694)
    })
})

// Leppävaaran kaupunkirata
test('Distance from HKI to LPV', () => {
    return getRoute('HKI', 'LPV').then(({ distance }) => {
        expect(distance).toBe(11047)
    })
})

// Päärata
test('Distance from HKI to PRI', () => {
    return getRoute('HKI', 'PRI').then(({ distance }) => {
        expect(distance).toBe(318603)
    })
})

test('Distance from HKI to KLI', () => {
    return getRoute('HKI', 'KLI').then(({ distance }) => {
        expect(distance).toBe(994512)
    })
})

// Others
test('Distance from VSA to ÄKI', () => {
    return getRoute('VSA', 'ÄKI').then(({ distance }) => {
        expect(distance).toBe(379191)
    })
})

test('Distance from TKU to SL', () => {
    return getRoute('TKU', 'SL').then(({ distance }) => {
        expect(distance).toBe(567236)
    })
})

test('Distance from ROI to VUS', () => {
    return getRoute('ROI', 'VUS').then(({ distance }) => {
        expect(distance).toBe(474062)
    })
})

test('Distance from RI to HNK', () => {
    return getRoute('RI', 'HNK').then(({ distance }) => {
        expect(distance).toBe(161215)
    })
})
