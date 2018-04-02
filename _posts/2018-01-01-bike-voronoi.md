---
layout: work
title:  "A Coruna city bike use"
date:   2018-02-01
permalink: bike-voronoi
---

<div class="row">
  <div class="col-md-7">
    <p>October the 10th was the Hackatiño Mobilidade Sostible. More than 60 people met in the Centro Agora of A Coruña city, Spain to work on city mobility. Hackers had several datasets from the city Major such a complete year registry of public bike, real time bus, real time traffic, parking lots, etc.
    </p>
    <p>During the session the group that I was part of worked with data on the use of bicicoruña and came to produce four maps with Leaflet and D3js. Three heatmaps about general behaviour and use, trips with same departure and arrival station, time-lapse animated map. The last one was an attempt to show which one was the most common trip from each station (<a href="https://www.luissevillano.net/bici-coruna/">link</a>).
    </p>
    <p>The project was hosted on Github, feel free to make any suggestions, open issues or pull request. <a href="https://github.com/LuisSevillano/bici-coruna">Link to the repository</a>.
    </p>
    <p class="break-p"></p>
    <p>That day I couldn't finish a map to show what was the most common trip from each station so moths after I return to the project and finish that map.
    </p>
    <p class="break-p"></p>
    <p>As the original datasets has a big size and to avoid complex processing on the client's side, node is used to process the whole data and create a json object reducing the weight of the file in a 99,999280608% way.
    </p>
    <p class="pills">
      <span class="tool pill">d3</span>
      <span class="tool pill">node</span>
      <span class="tool pill">TopoJSON</span>
      <span class="tool pill">QGIS</span>
    </p>
  </div>
</div>
<div class="img-container z-margin">
  <div class="row">
    <div class="col-md-8">
      <a href="https://www.luissevillano.net/bici-coruna/voronoi"><img src="/img/voronoi.jpg" class="img-responsive img b-lazy" alt="front-page" style="width: 100%;"/></a>
      <p class="caption">The map uses a shoreline to contextualize the map.</p>
      <p>Both the color and the thickness of each line are calculated regard to the possible combination with the highest number of trips from each station.</p>
      <a href="https://www.luissevillano.net/bici-coruna/voronoi"><img src="/img/voronoi_detail.jpg" class="img-responsive img b-lazy" alt="front-page" style="width: 100%;"/></a>
      <p class="caption">Detail of the map that shows the Santa Cristina beach of the Oleiros municipality.</p>
    </div>
  </div>
</div>
