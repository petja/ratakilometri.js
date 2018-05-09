![ratakilometri.js](logo.png "Ratakilometri.js")

[![Build Status](https://travis-ci.org/petja/ratakilometri.js.svg?branch=master)](https://travis-ci.org/petja/ratakilometri.js)
[![npm](https://img.shields.io/npm/v/ratakilometri.svg)](https://yarnpkg.com/en/package/ratakilometri)
[![license](https://img.shields.io/github/license/petja/ratakilometri.js.svg)](https://github.com/petja/ratakilometri.js/blob/master/LICENSE)
[![Digitraffic](https://img.shields.io/badge/data_source-digitraffic-blue.svg)](http://digitraffic.liikennevirasto.fi/en/)

Find the shortest route between two railway stations of Finland by using Dijkstra's algorithm. Station location data the library uses is provided by [Digitraffic / Finnish Transport Agency](http://digitraffic.liikennevirasto.fi/en/) and shared with [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/). If you're using this library, please remember to not only backlink into this library, but also mention about the data source.

**:warning: Track kilometers are not always exactly 1000 meters long. Because of this, there might be some inaccuracy in distances. We're currently trying to solve this problem.**

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

Please note that `getRoute` returns `Promise`. This is because of the network request library makes to Digitraffic API on the first time function is invoked.

## Options
As we pass parameters of `getRoute` almost directly to `node-dijkstra`, you can use [options object](https://github.com/albertorestifo/node-dijkstra#graphpathstart-goal--options) of the library as a third parameter of `getRoute`.

* `trim: boolean`, default `false`: If set to true, the result won't include the start and end stations.
* `reverse: boolean`, default `false`: If set to true, the route array will be in reversed order, from the end to start
* `avoid: array`, default `[]`: Stations to be avoided 

## How it works
Every station of Finnish railway network have its own "track kilometer" which is absolute distance in kilometers from the beginning of the rail network (Helsinki Central Railway Station). Some stations are interchange stations and thus belong to multiple track sections. Also, many track section are be connected on the both ends. So we just can't substract one value from another to have the distance between the stations. I built this library to solve this problem.

Here's how library works:

1. Fetch all stations and their track locations from Digitraffic API.
2. Group each station by the track section they belong to. Interchange stations have multiple track locations, so they are found from multiple groups as well.
3. Calculate distances between all stations within the track section. This is simple mathematical substraction.
4. Combine all distances of every track section calculated on the previous step, to one huge object.
5. Resolve shortest path between the stations by using `node-dijkstra`.

Voíla!

---

:information_source: Be aware algorithm really tries to find out **the shortest path** which isn't always **the best path**. For example, if you try to find out distance from Leppävaara (LPV) to Tikkurila (TKL) for the commercial passenger train, library would tell you to go thru Ilmala Rail Yard (ILR) which surely isn't the best route :wink:
