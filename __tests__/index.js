const {getRoute} = require('../index')

// Data output
test('getRoute returns object with following keys: route, distance', () => {
    return getRoute('HL', 'TL').then(({route, distance}) => {
        expect(route).toBeDefined()
        expect(distance).toBeDefined()
    })
})

// Kehärata
test('Distance from HKI to HPL is close to 6 kilometers', () => {
    return getRoute('HKI', 'HPL').then(({distance}) => {
        expect(distance).toBeCloseTo(6, 0)
    })
})

test('Distance from HPL to LEN is close to 20 kilometers', () => {
    return getRoute('HPL', 'LEN').then(({distance}) => {
        expect(distance).toBeCloseTo(20, 0)
    })
})

test('Distance from LEN to TKL is close to 9 kilometers', () => {
    return getRoute('LEN', 'TKL').then(({distance}) => {
        expect(distance).toBeCloseTo(9, 0)
    })
})

test('Distance from TKL to HKI is close to 16 kilometers', () => {
    return getRoute('TKL', 'HKI').then(({distance}) => {
        expect(distance).toBeCloseTo(16, 0)
    })
})

// Keravan kaupunkirata
test('Distance from HKI to KE is close to 29 kilometers', () => {
    return getRoute('HKI', 'KE').then(({distance}) => {
        expect(distance).toBeCloseTo(29, 0)
    })
})

// Leppävaaran kaupunkirata
test('Distance from HKI to LPV is close to 11 kilometers', () => {
    return getRoute('HKI', 'LPV').then(({distance}) => {
        expect(distance).toBeCloseTo(11, 0)
    })
})

// Päärata
test('Distance from HKI to PRI is close to 323 kilometers', () => {
    return getRoute('HKI', 'PRI').then(({distance}) => {
        expect(distance).toBeCloseTo(323, 0)
    })
})

test('Distance from HKI to KLI is close to 996 kilometers', () => {
    return getRoute('HKI', 'KLI').then(({distance}) => {
        expect(distance).toBeCloseTo(996, 0)
    })
})

// Others
test('Distance from VSA to ÄKI is close to 380 kilometers', () => {
    return getRoute('VSA', 'ÄKI').then(({distance}) => {
        expect(distance).toBeCloseTo(380, 0)
    })
})

test('Distance from TKU to SL is close to 507 kilometers', () => {
    return getRoute('TKU', 'SL').then(({distance}) => {
        expect(distance).toBeCloseTo(507, 0)
    })
})

test('Distance from ROI to VUS is close to 473 kilometers', () => {
    return getRoute('ROI', 'VUS').then(({distance}) => {
        expect(distance).toBeCloseTo(473, 0)
    })
})

test('Distance from RI to HNK is close to 162 kilometers', () => {
    return getRoute('RI', 'HNK').then(({distance}) => {
        expect(distance).toBeCloseTo(162, 0)
    })
})