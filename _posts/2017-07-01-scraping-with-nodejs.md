---
layout: work
title: "Scraping with nodejs"
date: 2017-07-01
permalink: scraping-with-nodejs
---

<div class="row">
  <div class="col-md-9">
    <p>
      In the context of summer, a newsroom coworker was seeking advice and information to go abroad with the intention of making news, and which countries were at risk of malaria, yellow fever, etc. She found a <a href="http://www.msssi.gob.es/profesionales/saludPaises.do">web application</a> from the Spanish government where you could not download the information to make an exhaustive analysis.
    </p>
    <p>
      Spanish Ministry Of Health doesn't have a way to extract the data with the information web app. We asked them for a csv or any other format to obtain the information. However, they won't facilite any document as they told us that the information is already on the website. Then, I made this scrape.
    </p>
    <p>
      There is a select on the landing page I use to fill and array with all the links for <a href="http://www.msssi.gob.es/profesionales/saludPaises.do?metodo=verDetallePais&pais=37">each</a> country I will scrape later.
    </p>
    <p>
      To avoid being banned by making multiple requests to the same page until I have the code that would extract the information from each country page I used <a href="https://developers.google.com/web/tools/chrome-devtools/snippets?hl=en">Google Chrome snippets</a> thanks to which you can run small pieces of code on client side.
    </p>
    <p>
      Take a look to the code at <a href="https://github.com/LuisSevillano/scrape-vaccines/">GitHub</a>.
    </p>
    <p class="pills">
      <span class="tool pill">nodejs</span>
    </p>
  </div>
</div>
