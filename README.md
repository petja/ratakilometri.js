![ratakilometri.js](logo.png 'Ratakilometri.js')

[![Build Status](https://travis-ci.org/petja/ratakilometri.js.svg?branch=master)](https://travis-ci.org/petja/ratakilometri.js)
[![npm](https://img.shields.io/npm/v/ratakilometri.svg)](https://yarnpkg.com/en/package/ratakilometri)
[![license](https://img.shields.io/github/license/petja/ratakilometri.js.svg)](https://github.com/petja/ratakilometri.js/blob/master/LICENSE)

Find the shortest route between two railway stations of Finland by using Dijkstra's algorithm. Station location data the library is using, is extracted from the [PDF](https://julkaisut.liikennevirasto.fi/pdf8/lv_2018-01_luettelo_rautatieliikennepaikoista_web.pdf) provided by [Finnish Transport Agency](https://fta.fi/) and enriched with other information available freely on the Internet.

## Install

```
yarn add ratakilometri
```

## Usage

```
const {getRoute} = require('ratakilometri')
// OR
import {getRoute} from 'ratakilometri'
```

To find out distance between Hämeenlinna (HL) and Kouvola (KV), you would call:

```
const {route, distance} = await getRoute('HL', 'KV')
console.log(distance)
```

Please note that `getRoute` returns `Promise`.

## Options

As we pass parameters of `getRoute` almost directly to `node-dijkstra`, you can use [options object](https://github.com/albertorestifo/node-dijkstra#graphpathstart-goal--options) of the library as a third parameter of `getRoute`.

*   `trim: boolean`, default `false`: If set to true, the result won't include the start and end stations.
*   `reverse: boolean`, default `false`: If set to true, the route array will be in reversed order, from the end to start
*   `avoid: array`, default `[]`: Stations to be avoided

---

:information_source: Be aware algorithm really tries to find out **the shortest path** which isn't always **the best path**. For example, if you try to find out distance from Leppävaara (LPV) to Tikkurila (TKL) for the commercial passenger train, library would tell you to go thru Ilmala Rail Yard (ILR) which surely isn't the best route :wink:
