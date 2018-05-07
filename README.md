![ratakilometri.js](logo.png "Ratakilometri.js")

![Digitraffic](https://img.shields.io/badge/data_source-digitraffic-blue.svg)

Get shortest possible distance between two railway stations of Finland by using Dijkstra's algorithm.

---

To find out distance between Hämeenlinna (HL) and Kouvola (KV), you would call:

`getDistance('HL', 'KV')`

:information_source: Be aware algorithm really tries to find out **the shortest path** which isn't always **the best path**. For example, if you try to find out distance from Leppävaara (LPV) to Tikkurila (TKL) for the commercial passenger train, library would tell you to go thru Ilmala Rail Yard (ILR) which surely isn't the best route :wink:
