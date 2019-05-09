---
layout: work
title: "Tile Writer"
date: 2018-10-01
permalink: tile-writer
---

<div class="row">
  <div class="col-md-7">
    <p>During my year in icarto, I had a task that consisted basically of trying to find an efficient way to create tiles from a QGIS project.
    </p>
    <p>They uses to create applications with multples features on maps. Usually with a base map over which uses to have several GeoJSON with a specific look and style. They were looking for a way where cartographers and map designers could export their designs directly from QGIS with no intervention of any engineer.</p>
    <p>Then <a href="https://twitter.com/fpuga">Francisco Puga</a> put me on the trail of a project called Tile Writer following a question in GIS Stack Exchange. It was and old project created by Alexander Hajnal that didn't work in QGIS 3 which uses Python3 (with the change to version 3 his API experienced many changes too). So I spent a few hours updating to the new QGIS API and to work with Python3.</p>
    <p><i>Tile Writer</i> is a Python script that runs from QGIS' Python console. I want to open the repository soon.</p>
    <p>Meanwhile, it is possible to see a demo of the script in the link below.</p>
    <p>
      <a href="https://www.luissevillano.net/tile-writer/map/#12/40.4425/-3.7012">Go to the project</a>.
    </p>
    <p class="break-p"></p>
    <p class="pills">
      <span class="tool pill">QGIS</span>
      <span class="tool pill">Python</span>
      <span class="tool pill">OSM</span>
    </p>
  </div>
</div>
<div class="img-container z-margin">  
  <div class="row">
      <div class="col-md-12">
          <video src="/img/tile-writer.mp4" class="embed-video" muted="" loop="" autoplay="" playsinline=""></video>
          <p class="caption">Capture of a Tile Writer demo.</p>
      </div>
  </div>  
</div>
