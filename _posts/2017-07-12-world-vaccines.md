---
layout: work
title:  "Spanish goverment recomendations"
date:   2017-07-12
permalink: world-vaccines
---
<div class="row">
  <div class="col-md-7">
    <p>
      I create this world map to consult Spanish goverment recomendations about travelling abroad. The map shows info about recomended vaccines, population, capital city, etc. that you need to know if you're planning to travel.
    </p>
    <p>
      Spanish Ministry Of Health doesn't have a way to extract the data with his information web app. We created a scrape in <code>nodejs</code> to save they recomendations (here is the <a href="scraping-with-nodejs">link</a> to its post).
    </p>
  </div>
</div>
<div class="row">
  <div class="col-md-7">
    <a href="https://www.elindependiente.com/vida-sana/2017/07/02/cuidado-con-lo-que-te-traes-de-las-vacaciones/?utm_source=share_buttons&utm_medium=twitter&utm_campaign=social_share"><img src="/img/world-vaccines.jpg" class="img-responsive img" alt="front-page" style="width: 100%;"/></a>
    <p class="caption">
      A Peirce Quincuncial projection.
    </p>
  </div>
</div>
<div class="row">
  <div class="col-md-7">
    <p>
      I choose to use a <a href="https://en.wikipedia.org/wiki/Peirce_quincuncial_projection">Peirce Quincuncial</a> map projection. I wanted to use a map projection with a <i>square</i> ratio because of small devices.
    </p>
    <p>
      To make the information accessible by small devices or if anyone was planning to a country which didn't know where it was I added a searcher with suggestions.
    </p>
    <p>
      This time the version for mobile phones offers the whole information from the official app, more information than the desktop which just shows if the country has a risk of malaria or yellow fever.
    </p>
  </div>
</div>
<div>
  <div class="row">
    <div class="col-md-4">
      <a href="https://www.elindependiente.com/vida-sana/2017/07/02/cuidado-con-lo-que-te-traes-de-las-vacaciones/?utm_source=share_buttons&utm_medium=twitter&utm_campaign=social_share"><img src="/img/world-vaccines-mobile3.jpg" class="img-responsive img no-sdw" alt="front-page" style="width: 100%;"/></a>
    </div>
    <div class="col-md-4">
      <a href="https://www.elindependiente.com/vida-sana/2017/07/02/cuidado-con-lo-que-te-traes-de-las-vacaciones/?utm_source=share_buttons&utm_medium=twitter&utm_campaign=social_share"><img src="/img/world-vaccines-mobile2.jpg" class="img-responsive img no-sdw" alt="front-page" style="width: 100%;"/></a>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-md-7">
    <p class="caption">
      Version for small devices shows the whole Ministry information.
    </p>
  </div>
</div>
<div class="row">
  <div class="col-md-7">
    <p>
      <a href="https://www.elindependiente.com/vida-sana/2017/07/02/cuidado-con-lo-que-te-traes-de-las-vacaciones/?utm_source=share_buttons&utm_medium=twitter&utm_campaign=social_share">Go to the project</a>.
    </p>
    <p class="pills">
      <span class="tool pill">D3</span>
      <span class="tool pill">Rollup</span>
      <span class="tool pill">SASS</span>
      <span class="tool pill">Pymjs</span>
    </p>
  </div>
</div>
