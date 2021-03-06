---
title: Tile Writer
description: Python script to export the canvas of a QGIS project to xyz tiles in order to be able to use them later in openstreetmap or some other tile manager.
media_type: video
media_source: /assets/images/tile-writer
date: 2018-10-01
url: /qgis-tile-writer
features: [QGIS, Python, OSM]
---

During my year at iCarto, I had a task that consisted basically of trying to find an efficient way to create tiles from a QGIS project.

They uses to create applications with multples features on maps. Usually with a base map over which uses to have several GeoJSON with a specific look and style. They were looking for a way where cartographers and map designers could export their designs directly from QGIS with no intervention of any engineer.
Then [Francisco Puga](https://twitter.com/fpuga) put me on the trail of a project called Tile Writer following a question in GIS Stack Exchange. It was and old project created by Alexander Hajnal that didn't work in QGIS 3 which uses Python3 (with the change to version 3 his API experienced many changes too). So I spent a few hours updating to the new QGIS API and to work with Python3.
_Tile Writer_ is a Python script that runs from QGIS' Python console. Check out the [demo](https://www.luissevillano.net/tile-writer/map/#12/40.4425/-3.7012).

[Go to the project](https://github.com/LuisSevillano/tile-writer)

{% include media.html media_type="video"
media_source="/assets/images/tile-writer" caption="Capture of a Tile Writer demo." class_names="fixed_width" media_caption="Capture of a Tile Writer demo." %}
