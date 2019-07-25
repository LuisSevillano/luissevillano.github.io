---
layout: work
title: "2019 General election"
date: 2019-04-01
permalink: 2019-general-election
---

<div class="row">
  <div class="col-md-7">
    <p>This year I had the opportunity of get back to Media and make election charts again with d3js!. This time, <a href="https://datadista.com/">Datadista</a> give me the chance to create a full coverage of the Spanish General Elections (2019) with a multiple types of charts like maps, scatterplots or cartograms.
    </p>
    <p>The coverage was a project for Spanish Public Television (<a href="http://www.rtve.es/">RTVE</a>) and during the previous weeks of the election we were launching a deeply analisis of the last General Election results (2016) and then we updated all the charts with the last results after the elections. The topics of the analysis were the <i>cost of each vote</i>, scatterplots to relate % of vote with several socioeconomic variables or a series of small multiples of maps such like participation or <i>bipartidism</i>.</p>
    <p>Up to approx. 2015, in Spain there was a bipartisan political scenario where the main weight of the electoral results was played by the two main parties. This situation began to be diluted as a result of the appearance of new parties.</p>
    <p class="break-p"></p>
    <p>Other kind of graph I did for the first time was a Cartogram with the Joseph Bailey's georgeus <code>geogrid</code> R package.</p>
    <p class="break-p"></p>
    <p>
        <a href="http://lab.rtve.es/los-datos-hablan/">Go to the project</a>.
    </p>
    <p class="pills">
      <span class="tool pill">d3</span>
      <span class="tool pill">TopoJSON</span>
      <span class="tool pill">Hexgrid</span>
      <span class="tool pill">Canvas</span>
      <span class="tool pill">d3-regression</span>
      <span class="tool pill">Rbush</span>
    </p>
  </div>
</div>
<div class="img-container z-margin">
    <div class="row">
        <div class="col-md-8">
            <p class="break-p"></p>
            <p>Regards to each graphic, <a href="http://lab.rtve.es/los-datos-hablan/radiografia-votante/">Scatterplots</a> uses the new <code>d3-regression</code> by Harry Stevens and <code>d3-delaunay</code> for the tooltip interaction. There is no hidden Voronoi layer or anything else. It's really powerful and fast!</p>
            <img data-src="/img/delaunay.jpg|/img/delaunay-r.jpg" class="img-responsive img b-lazy" alt="front-page" style="width: 100%;"/>
            <p class="caption">Capture of the delaunay path for the interaction (not visible in production).</p>
            <p>Regrettably, SVG uses to be pretty slow when renders thousands of elements in browsers. Each scatterplot has over 800 points and there is 12 scatterplots. In order to improve the perfomance it was the first time I combine Canvas and SVG in a scatterplot. Even that, the results wasn't as good as I expected so next time I should give a try to WebGL.</p>
            <p class="break-p"></p>
        </div>
    </div>
  <div class="row">
      <div class="col-md-10">
          <a href="http://lab.rtve.es/los-datos-hablan/radiografia-votante/">
              <figure aria-label="media" role="group" itemscope="" itemprop="associatedMedia" itemtype="http://schema.org/VideoObject">
                   <video class="embed-video" muted="" loop="" autoplay="" playsinline="" style="background-image:url('/img/scatterplots_cut.jpg')">
                      <source src="/img/scatterplot_r.mp4" type="video/mp4">
                      <source src="/img/scatterplot_r.webm" type="video/webm">
                      <i>Your browser does not support the video tag.</i>
                  </video>
              </figure>
        </a>
          <p class="caption">Capture of small multiples of scatterplots whose relate % of vote with several socioeconomic variables.</p>
      </div>
  </div>
  <div class="row">
      <div class="col-md-8">
          <p>We created <a href="http://lab.rtve.es/los-datos-hablan/resultados-interactivos-elecciones/">Winner Party</a> maps but this time we relate the electoral results with the population density in order to create a more accurate map. A very high percentage of the Spanish population lives in the cities and their nearby areas, which creates a landscape that has received in recent years the adjective, debatable, of La España Vacía (The empty Spain).</p>
          <p>This type of maps with interaction uses a combination of two layers too. The choropleth is drawn on the Canvas one and the hover path is drawn on the SVG layer.</p>
          <p class="break-p"></p>
      </div>
  </div>
  <div class="row">
      <div class="col-md-8">
          <a href="http://lab.rtve.es/los-datos-hablan/resultados-interactivos-elecciones/">
              <figure aria-label="media" role="group" itemscope="" itemprop="associatedMedia" itemtype="http://schema.org/VideoObject">
                   <video class="embed-video" muted="" loop="" autoplay="" playsinline="" style="background-image:url('/img/muniwinner-2019_cut.jpg')">
                      <source src="/img/muni-winner_r.mp4" type="video/mp4">
                      <source src="/img/muni-winner_r.webm" type="video/webm">
                      <i>Your browser does not support the video tag.</i>
                  </video>
              </figure>
          </a>
          <p class="caption">Video capture of Winner per Municipality / population density. I used a scaleQuantile for the color and a scalePow for the <i>rect legend</i> to illustrate the irregular distribution of the values.</p>
      </div>
  </div>
  <div class="row">
      <div class="col-md-8">
          <p><a href="http://lab.rtve.es/los-datos-hablan/valor-voto/">Treemaps</a> were used to show how many votes were needed to get one of the 350 seats of which the Spanish parliament is composed. You can navigate through all the spanish General Elections, from 1977 to 2019.</p>
          <p>The Spanish electoral system makes the vote not worth the same in all provinces and, in addition, penalizes minority parties of a national nature, and that is what this graph wants to highlight.</p>
          <a href="http://lab.rtve.es/los-datos-hablan/valor-voto/">
              <figure aria-label="media" role="group" itemscope="" itemprop="associatedMedia" itemtype="http://schema.org/VideoObject">
                   <video class="embed-video" muted="" loop="" autoplay="" playsinline="" style="background-image:url('/img/treemap_cut.jpg')">
                      <source src="/img/treemap_r.mp4" type="video/mp4">
                      <source src="/img/treemap_r.webm" type="video/webm">
                      <i>Your browser does not support the video tag.</i>
                  </video>
              </figure>
          </a>
          <p class="caption">Video capture of the Treemap graph that shows The Cost of a Vote.</p>
      </div>
  </div>
  <div class="row">
      <div class="col-md-8">
          <p>In Spain, when we talk about bipartidism when creating maps like the following, we usually paint the sum of the voting percentage of the two main parties, PP (Popular Party) and PSOE (Spanish Socialist Workers' Party). This kind of visualization helps us to see pretty well the end of a political scenario.</p>
          <p>In this map, two outliers are clearly visible. There is a gap to this kind of vote in Catalonia (right) and the Basque Country (top) where the vote for nationalist parties has always been greater.</p>
          <img src="/img/map-small-multiples.jpg" class="img-responsive img" alt="front-page" style="width: 100%;"/>
          <p class="caption">Capture of small multiples of maps about the decline of bipartidism.</p>
      </div>
  </div>
</div>
