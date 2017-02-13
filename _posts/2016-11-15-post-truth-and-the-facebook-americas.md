---
layout: work
title:  "US Elections"
date:   2016-11-15
permalink: post-truth-and-the-facebook-americas
---
<div class="row">
  <div class="col-md-9">
    <p>
      This seems to be the post thruth year, a <i>new</i> word very often in the public eye since Trumps win. All the things related to all those fake news, etc.
    </p>
    <p>
      An this is what <a href="https://twitter.com/miguel_riano">Miguel Riaño</a>'s <a href="http://www.elindependiente.com/politica/elecciones-eeuu/2016/11/12/la-posverdad-y-la-america-de-facebook/"> article </a>is about. In the context of US Elections I was  around with US maps and It seems a good chance to publish a county level one.
    </p>
    <p>
      Before that I made a states level map showing the las five us elections. It features a <i>stacked bar</i> with the results with the candidates faces (a little old-fashioned I know) and some buttons to navigate between them.
    </p>
    <p>
      Both maps are made in svg with d3js and topojson. Maybe this wasnt a good idea as svg is pretty slow on firefox when you have thousands of svg paths. I think the issue os the <i>hover</i> effect on each county path. I used a method to clone that node and put it above, but seems its a cost way to do that. The next time I'll use canvas. I promise!
    </p>
    <p>
      The maps are deployed as plain javascript using d3 and implemented in a responsive iFrame using npr's <a href="http://blog.apps.npr.org/pym.js/">pymjs</a>. I shared the county data on <a href="https://github.com/LuisSevillano/2016-election-county-results">github</a>.
    </p>
    <p>
      <a class="no-style-link" href="http://www.elindependiente.com/politica/elecciones-eeuu/2016/11/12/la-posverdad-y-la-america-de-facebook/">Go to proyect.</a>
    </p>
    <p class="pills">
      <span class="tool pill">d3js</span>
      <span class="tool pill">topojson</span>
      <span class="tool pill">pymjs</span>
    </p>
  </div>
  <div class="col-md-3 hidden-xs hidden-sm">
    <a href="http://www.elindependiente.com/politica/elecciones-eeuu/2016/11/12/la-posverdad-y-la-america-de-facebook/"><img src="/img/us-map-tooltip.jpg" class="img-responsive img" alt="front-page" style="width: 100%;"/></a>
  </div>
</div>
<div class="img-container">
  <div class="row">
    <div class="col-md-12">
      <a href="http://www.elindependiente.com/politica/elecciones-eeuu/2016/11/12/la-posverdad-y-la-america-de-facebook/"><img src="/img/us-map-winner.jpg" class="img-responsive img" alt="front-page" style="width: 100%;"/></a>
    </div>
    <div class="col-md-12">
      <a href="http://www.elindependiente.com/politica/elecciones-eeuu/2016/11/05/asi-funciona-el-sistema-electoral-de-eeuu/"><img src="/img/us-states-map.jpg" class="img-responsive img" alt="front-page" style="width: 100%;"/></a>
    </div>
    <div class="col-md-12">
      <a href="http://www.elindependiente.com/politica/elecciones-eeuu/2016/11/12/la-posverdad-y-la-america-de-facebook/"><img src="/img/us-map-dem.jpg" class="img-responsive img" alt="front-page" style="width: 100%;"/></a>
    </div>
    <div class="col-md-12">
      <a href="http://www.elindependiente.com/politica/elecciones-eeuu/2016/11/12/la-posverdad-y-la-america-de-facebook/"><img src="/img/us-map-rep.jpg" class="img-responsive img" alt="front-page" style="width: 100%;"/></a>
    </div>
  </div>
</div>
