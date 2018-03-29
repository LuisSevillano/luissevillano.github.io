---
layout: work
title:  "Catastro A Coruna"
date:   2017-11-01
permalink: catastro-coruna
---

<div class="row">
  <div class="col-md-7">
    <p>
      I recently discover a nice QGIS plugin named <a href="https://github.com/sigdeletras/Spanish_Inspire_Catastral_Downloader">Spanish Inspire Catastral Downloader</a> to download catastre data from the INSPIRE Services of Spanish Cadastral Cartography.
    </p>
    <p>
      The plugin allows you to download a set of very accurate data both at parcel level and building.
    </p>
    <p>
      It will download to your machine several sets of data in which you will find a layer named like <i>building Building Polygon</i> that contains the building data. This layer has a field in it's attribute table named `end` that contains the year in which that building was finished so you can get it with a basic field calculator manipulation.
    </p>
    <p>
      This time I just make a series of sketches about A Coruña city and Colmenar Viejo town.
    </p>
    <p class="pills">
      <span class="tool pill">QGIS</span>
      <span class="tool pill">R</span>
    </p>
  </div>
</div>
<div class="img-container z-margin">
  <div class="row">
    <div class="col-md-8">
      <p>This map uses a <i>quantitaive</i> scale to assing the color ramp to the buildings years. So the black color is assigned to those buildings completed between the year 1860 and 1960, next color to 1960-1965 and so on.</p>
      <img src="/img/colmenar.jpg" class="img-responsive img" alt="front-page" style="width: 100%;"/>
      <p class="caption">Colmenar Viejo, Madrid.</p>
    </div>
    <div class="col-md-8">
      <p>On the other hand, I did this other sketch from A Coruña city (below) where the color scale is assigned using decades: from 900 (year of the oldest building documented in the database) to 1910, from 1910 to 1920 and so on. </p>
      <p>Since I live in this city, I have seen several times the map of the city rotated about 315º as it happens with the city of Barcelona. I suppose that since a large part of the city is located on a peninsula, it obeys to bring the idea of the city closer to how its citizens conceive it.
      </p>
      <img src="/img/coruna-catastro.jpg" class="img-responsive img" alt="front-page" style="width: 100%;"/>
      <p class="caption">A Coruña city (the map is rotated 315º).</p>
      <p>
        I added a layer of roads from OSM to give the map a bit more consistency.
      </p>
      <p>Next image makes zoom to the older part of the city. The district of Pescadería (known as <i>Fish Market</i>) and La Ciudad Vieja (Old Town) the two oldest parts of the city. In the Fish Market district, specifically in the street of the Franja Street and Riego del Agua is where the original core of the city seems to be concentrated where even archaeological vestiges of Roman era have been found.
      </p>
      <img src="/img/old-city-coruna-legend.jpg" class="img-responsive img" alt="front-page" style="width: 100%;"/>
      <p class="caption">In black color the district of Pescadería and La Ciudad Vieja the two oldest parts of A Coruña.</p>
      <p>But when you plot this dataset you quickly realize that there is probably a methodological error in the collection of the data or simply at some point some reports with approximate data were filled out.
      </p>
      <img src="/img/plot_coruna_buildings.jpeg" class="img-responsive img" alt="front-page" style="width: 100%;"/>
      <p class="caption">Plot in R with the development of the city. Using the wonderful <a href="https://github.com/jrnold/ggthemes">theme_fivethirtyeight</a> for it.</p>
      <p>It seems a bit strange the number of buildings built in the year 1900 or the accumulation of buildings built in <i>rounded</i> years (1920, 1930, 1935, 1940 and thereafter).
      </p>
    </div>
  </div>
</div>
