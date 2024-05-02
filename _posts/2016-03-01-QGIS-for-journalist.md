---
title: "QGIS for journalists"
date: 2016-03-01
permalink: QGIS-for-journalists
media_type: img
media_source: /assets/images/buffer.jpg
description: Documentation on basic principles of cartography and GIS taught to data journalism students
tags: [QGIS, ai2html]
---

Last march I had the chance to participate in the 2016-2017 master in data driven journalism at Villanueva University. The idea was to teach basic concepts and ideas about GIS maps and journalism.

First day was a four hour workshop about how to make a static choropleth map using [QGIS](https://www.qgis.org/en/site/forusers/download.html). The attendees would be able to make a population density map of Spain. To change coordinates system of a shapefile, merge shapefiles, create new fields on the Attribute Table, make a spatial join, apply a right color ramp, use the print composer, etc.

I toke the decision to make it all _open source_ and share it on GitHub, so [here is the repo](https://github.com/LuisSevillano/QGIS-choropleth-workshow") (spanish).

For the rest of the course I prefered to use GitHub's gist to share the steps and examples of each workshops. All the gist has its own exercises. Here are the more relevant days:

- QGIS Basic tags: layer properties panel, rule-based styles, etc. [Link](https://gist.github.com/LuisSevillano/11d6a1520a5fb58d4598c3546521d635).
- Vector analysis: intersect, merge, clip, dissolve, buffers, etc. [Link](https://gist.github.com/LuisSevillano/ef30303be5b60fd99622e54db4e6db26).
- Working with rasters, reading from csv, heatmaps, etc. [link](https://gist.github.com/LuisSevillano/9ac49847f3b860f2c211d53f82d06446).

![image](/assets/images/diff.jpg)
_Capture from the lesson about how to use rule-based styles to customize the appearance of vector features._

![image](/assets/images/buffer.jpg)
_Capture from the lesson about how to use the basic algorythms of any GIS (buffers, clips, difference, etc.)._

![image](/assets/images/lidar.jpg)
_Capture from the lesson about how to work with raster data._
