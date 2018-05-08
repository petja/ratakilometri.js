![ratakilometri.js](logo.png "Ratakilometri.js")

[![Build Status](https://travis-ci.org/petja/ratakm.svg?branch=master)](https://travis-ci.org/petja/ratakm)
[![Digitraffic](https://img.shields.io/badge/data_source-digitraffic-blue.svg)](http://digitraffic.liikennevirasto.fi/en/)

Find the shortest route between two railway stations of Finland by using Dijkstra's algorithm. Station location data is provided by Finnish Transport Agency and shared with Creative Commons BY license.

## Install
`yarn add ratakilometri`

## Usage
```
const {getRoute} = require('ratakilometri')
// OR
import {getRoute} from 'ratakilometri'
```

To find out distance between Hämeenlinna (HL) and Kouvola (KV), you would call:

```
const {route, distance} = getRoute('HL', 'KV')
console.log(distance)
```

---

:information_source: Be aware algorithm really tries to find out **the shortest path** which isn't always **the best path**. For example, if you try to find out distance from Leppävaara (LPV) to Tikkurila (TKL) for the commercial passenger train, library would tell you to go thru Ilmala Rail Yard (ILR) which surely isn't the best route :wink:
