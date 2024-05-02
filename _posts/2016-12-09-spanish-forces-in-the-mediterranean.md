---
title: "Why are Spanish troops scattered all over the Mediterranean?"
date: 2016-12-09
permalink: spanish-forces-in-the-mediterranean
media_type: img
media_source: /assets/images/thumbnails/turkey_s.jpg
description: Maps about the presence of Spanish armed forces in Italy, Turkey and Lebanon.
tags: [QGIS, Adobe Illustrator, ai2html]
---

Old and new conflicts have made the shores of the Mediterranean one of the most insecure places on the planet. The refugee crisis, which has plagued Southern Europe for decades, has been aggravated by instability and chaos in Libya and Syria. Branches of Islamist terrorism in North Africa and the threat of the Islamic State represent a danger to peace in the region, especially the Middle East, where many conflicts of the last century are still open.

My colleague [Giulio M. Piantadosi](https://twitter.com/gmpiantadosi) had the chance to visit three of the places where Spanish forces are present. The Naval Air Station Sigonella in Sicily, UNIFIL Deployment at the _blue line_ in Lebanon and the Incirlik Air Base in Turkey.

{% include custom/lebanon.html %}

It was a great opportunity to work hard on the maps, to improve and use new techniques and tools that make that maps a little bit better than others I made before. So I made a _basemap_ in QGIS using OSM shapefiles as _landuse_ or _roads_ playing with soft colors and rule-based styles. In two of the three maps I used the [The Earth's Relief](http://www.theearthsrelief.com/) DEM layer, make by [ClusterGIS](http://www.clustergis.org/). Then I drew all the labels, arrows, polygons and other vectorial elements in Adobe Illustrator.

{% include custom/turkey.html %}

Finally I used the [ai2html](http://ai2html.org/) plugin for Adobe Illustrator to publish on the web. I created five designs for each map, fifteen Artboards in total. ai2html uses CSS's display block/in-line to show correct artboards depending on screen size. If we don't use a script or a lazy load the reader will have to download the images for all the screen sizes. To fix that I created an easy [script](https://gist.github.com/LuisSevillano/8405308f6d3ea7423c9f9c13b7e248e3) which downloads only one image for each resolution.
