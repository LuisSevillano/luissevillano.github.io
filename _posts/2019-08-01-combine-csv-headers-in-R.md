---
layout: work
title: "Merge CSV headers in R"
description: "A way to deal with tabular data with more than one header"
image: /img/cards/combine-headers-r.png
date: 2019-08-08
permalink: combine-csv-headers-in-R
---

<div class="row">
  <div class="col-md-7">
    <p>Usually when you work with data from Public Data Services like INE (Spanish Statistical Office) you have to deal with Excel files with a <i>non usable</i> format: metadata in the first rows, notes at the bottom, empty columns, empty rows, etc. You have to do a small data processing in order to start working.</p>
    <p class="break-p">Everyone knows the benefits of the CSV format, but precisely these metadata are there for one reason: unlike CSV where we only have the data itself, if we open this file within a few months this metadata allow you to know exactly what data it contains or where it comes from. For this reason, I think that sometimes it is not a bad idea that the first phase of working with data is reading directly from an Excel format (instead of CSV).</p>
    <p class="break-p">For these cases I usually use R due to its reproducible workflow and of course because of the whole universe of packages, specially Tidyverse, <i>an opinionated collection of R packages designed for data science</i>.</p>
    <p>Well, days ago I had to deal with a dataset that had a format with a problem I didn't face before, it had a double header like the ones shown in the following picture:</p>
  </div>
</div>
<div class="img-container z-margin">
    <div class="row">
      <div class="col-md-8">
          <img data-src="/img/www.ine.es_jaxiT3_Datos.htm_t=4247.jpg|/img/www.ine.es_jaxiT3_Datos.htm_t=4247-r.jpg" class="img-responsive img b-lazy" alt="front-page">
          <p class="caption">Capture from the Spanish Statistical Office site. Unemployment rate by ages and year quarters.</p>
      </div>
  </div>
 </div>
 <div class="row">
   <div class="col-md-7">
       <p>I spent hours searching the web looking for a solution but I didn't find any. I finally opted for create a specific function to be able to give exit to this situation.</p>
       <p class="break-p">My goal was to merge both rows and ended up with a column names as <code>Menores de 25 años_2019T2</code>, <code>Menores de 25 años_2019T1</code> or <code>Menores de 25 años_2018T4</code>, i.e. combine the two rows with an underscore. I will show step by step a case in which this function could be used. If you prefer, you can go directly to the full <a href="https://gist.github.com/LuisSevillano/42ee0de0695ec504b97152da5f971240">script</a>.</p>
       <p>First of all, I read a <a href="http://www.ine.es/jaxiT3/Tabla.htm?t=4247">xlsx</a> file with the georgeus <code>read_xlsx</code> from Tidyverse and skip the first 6 lines.</p>
       
       <script src="https://gist.github.com/LuisSevillano/f0030f246b6e60e88e8b92b45165b5f2.js"></script>
       
       <p>The function itself:</p>
       <script src="https://gist.github.com/LuisSevillano/a145dd8eb660ce73f4ec31fac793ac27.js"></script>
       <p class="caption">I am completely sure that there must be a cleaner way or an R package that solves this problem but I have been unable to find it.</p>
       <p>Basically, what <code>combineHeaders</code> does is to store in the variable <code>types</code> those column names of the first row in a vector (discarding those column names that are numbers, as R / RStudio puts by default).</p>
       <p>Then iterates through all the column names in the first row (the original one from which we have extracted <code>types</code>), creates a default index (variable <code>z</code>) initialized to <code>1</code> and creates a variable called <code>type</code> that points to the first element of <code>types</code> through <code>z</code> value.</p>
       <p class="break-p">In this iteration, it assigns the first element of the <code>types</code> vector (the value of the <code>type</code>) to the first elements. If a column name is equal to the next <code>types</code> element, it increases the value of <code>z</code> by one and updates <code>type</code>.</p>
       
       <p>Then I assign the vector result of the funcion as the new csv header and apply some dplyr's magic pipes for cleaning the data, rename the first column and create a couple of variables from the first column. </p>
       <script src="https://gist.github.com/LuisSevillano/81e638248e6fbdcde9f2b11c2fce31e1.js"></script>
       <img data-src="/img/rstudio_cleaned.png" class="img-responsive img b-lazy" alt="front-page" style="width: 100%;"/>
       <p class="caption">Capture of the data frame cleaned.</p>
       <p>Then I convert all the data frame to long format, divide the previous headers into two new variables using <code>separate</code> and parse temporal vairables to a date format:</p>
       <script src="https://gist.github.com/LuisSevillano/1dd1893324c1379863e575b04add28bd.js"></script>
       <img data-src="/img/rstudio_tidied.png" class="img-responsive img b-lazy" alt="front-page" style="width: 100%;"/>
       <p class="caption">Capture of the data frame tidied_data.</p>
       <p>And finally a plot using ggplot. The code</p>
       <script src="https://gist.github.com/LuisSevillano/2a7e8bcd41eba84cdea859918e096aea.js"></script>
       <p>And the result:</p>

   </div>
 </div>
 <div class="img-container z-margin">
     <div class="row">
         <div class="col-md-10">
             <img data-src="/img/unemployment-small-multiples.svg" class="img-responsive img b-lazy" alt="front-page" style="width: 100%;"/>
             <p class="caption">Capture of the final plot.</p>
         </div>
     </div>
</div>
