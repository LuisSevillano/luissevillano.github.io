---
layout: work
title:  "US Elections"
date:   2016-11-15
permalink: post-truth-and-the-facebook-americas
js:
  - resources/us-counties/js/vendor.js  
jsarr:
  - graphs/us-counties/js/vendor.js  
cssarr:
  - graphs/us-counties/styles/style.css

---
<div class="row">
  <div class="col-md-9">
    <p>
      This seems to be the post thruth year, a <i>new</i> word very often in the public eye since Trumps wins. All the things related to all those fake news, etc.
    </p>
    <p>
      An this is what <a href="https://twitter.com/miguel_riano">Miguel Riaño</a>'s <a href="http://www.elindependiente.com/politica/elecciones-eeuu/2016/11/12/la-posverdad-y-la-america-de-facebook/"> article </a>is about. In the context of US Elections I was  around with US maps and It seems a good chance to publish a county level one.
    </p>
    <p>
      Before that I made a states level map showing the las five us elections. It features a <i>stacked bar</i> with the results with the candidates faces (a little old-fashioned I know) and some buttons to navigate between them.
    </p>
    <img src="/img/us-states-map.jpg" class="img-responsive img" alt="front-page" style="width: 100%;"/>
    <p class="caption">
      An <i>old-fashioned</i> interactive map with the last six General Elections.
    </p>
    <p>
      Both maps are made in svg with <code>d3js</code> and <code>TopoJSON</code> in svg. Maybe It wasn't a good idea as svg is pretty slow on firefox when you have thousands of svg paths. The issue is in the <i>hover</i> effect on each county path. I used a method to clone that node and put it above, but seems its a cost way to do that.
    </p>
    <p>
      After the release of this map I was testing the use of a canvas basemap where a svg path appears to create the hover effect. Check it on <a href="https://bl.ocks.org/luissevillano/3d2b22e85b94d5ffcc5a11a79fc4d137">blocks!</a>.
    </p>
    <p>
      To map the electoral results to each county I use the TopoJSON CLI. I did something similar in this <a href="https://bl.ocks.org/luissevillano/a5d147cd45c624e8811238f0a5480439">block</a>. You just need an ID's to match between them.
    </p>
    <p>
      The maps are deployed as plain javascript using d3 and implemented in a responsive iFrame using npr's <a href="http://blog.apps.npr.org/pym.js/">pymjs</a>.
    </p>

    <p>
    The link to the project is broken so I reproduce the code below.
    </p>
    <p class="pills">
      <span class="tool pill">d3</span>
      <span class="tool pill">TopoJSON</span>
      <span class="tool pill">TopoJSON CLI</span>
      <span class="tool pill">Pym.js</span>
    </p>
  </div>
</div>
<hr>
<div class="col-md-12 interactive">
  <div id="map-counties"></div>
  <div id="buttons">
    <button class="active winner filter" data-candidate="c1p">Ganador</button>
    <button class="dem filter" data-candidate="c">Voto demócrata</button>
    <button class="rep filter" data-candidate="t">Voto republicano</button>
  </div>
  <div id="tooltip">
    <div class="state-data">
      <div class="county-name"></div>
      <div class="state-name"></div>
      <div class="electoral-votes"></div>
    </div>
    <div class="content">
      <table>
        <thead>
          <tr>
            <th class="cn">Candidato</th>
            <th class="cv">Votos</th>
            <th class="cp">Pct</th>
          </tr>
        </thead>
        <tbody>
          <tr class="c1">
            <td class="cn">
              <span class="sq"></span>
              <span class="cname"></span>
            </td>
            <td class="cv"></td>
            <td class="cp"></td>
          </tr>
          <tr class="c2">
            <td class="cn">
              <span class="sq"></span>
              <span class="cname"></span>
            </td>
            <td class="cv"></td>
            <td class="cp"></td>
          </tr>
          <tr class="c3">
            <td class="cn">
              <span class="sq"></span>
              <span class="cname"></span>
            </td>
            <td class="cv"></td>
            <td class="cp"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="arrow"></div>
  </div>
</div>
