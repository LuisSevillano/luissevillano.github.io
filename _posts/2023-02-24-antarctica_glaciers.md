---
title: The center of the world crumbles like a cookie
description: Antarctica is already suffering heat waves that exceed 18 degrees Celsius and is melting at its edges. What's happening?
media_type: video
media_source: /assets/images/antarctica
date: 2023-02-24
permalink: antarctica_glaciers
features: [R, QGIS, d3js, GoogleEarthEngine, ai2html, Illustrator]
---

This collaboration with our colleagues from Materia, the science section of El País, resulted in a most rewarding experience. Manuel Ansede and Claudio Álvarez had the opportunity to travel to the Antarctic continent accompanying a Chilean scientific mission. This group of scientists is studying the changes that are taking place in Antarctica, many of them appreciable on a human scale.

Pursuing the idea of showing the Antarctic continent as a protagonist and fundamental actor in the balance of the planet, my colleague Ansede showed me a projection known as _Spilhaus Projection_ that presents all the seas of the planet as a single body of water with Antarctica in the center.

{% include custom/antarctica.html %}

To what extent would it be possible to work with such a projection? At that time we still didn't know exactly how we were going to produce the story and generally this kind of complex projections are difficult to reproduce in QGIS, the main software we use when working with geographic data. After searching in depth I found that it was indeed not possible and that the only way to be able to use this projection was going to be through d3js.

Having presented the idea of interconnected water masses thanks to Spilhaus and localizing the journey of my colleagues, how could I show the melting of Antarctica?

Fortunately, we have data from [NASA's ICESat-2 mission](ttps://icesat-2.gsfc.nasa.gov/mission). This satellite _carries a photon-counting laser altimeter that allows scientists to measure the elevation of ice sheets, glaciers, sea ice and more - all in unprecedented detail_. This mission offers its data openly in NetCDF, an archive format designed to store multidimensional scientific data, such as climate data, oceanographic data, atmospheric data, numerical model data and the like.


![netcdf_1](/assets/images/netcdf_1.jpg)
_https://web.itu.edu.tr/~tokerem/netcdf.html_

**The Data**

NetCDF data is a format that is being used more and more often by the scientific community and can be somewhat complex: it contains a lot of information, it is usually a very large file (in this case more than 6.4Gb), etc.

Access to this dataset can be done through the following [link](https://n5eil01u.ecs.nsidc.org/ATLAS/ATL15.003/2019.03.29/?C=S;O=D) and here [ATLAS/ICESat-2 L3B Gridded Antarctic and Arctic Land Ice Height Change](https://nsidc.org/data/atl15/versions/2), is the description of the dataset. I recommend taking a look at the documentation that can be found here.

![netcdf_1](/assets/images/icesat_lag_table.jpg)
_https://nsidc.org/sites/default/files/documents/user-guide/atl15-v003-userguide_0.pdf_


**A bit of code**

The idea behind the work with R is to get a csv with a lat/lng coordinates and a value for each point to paint the change in ice height and ilustrate the mass loss.

The work I performed with R was as follows:
- Reading the raw ICESat-2 data.
- Calculating the mean using the more detailed data (lag1 ~ Quarterly).
- Generalizing the data with `aggregate` from the Raster package.
- Polygonize
- Extract the centroid of each polygon.
- Export the data

We can now draw the grid on our d3js globe.

These are the packages that I used in the process (probably some of them I don't even use, I have not been able to check thoroughly)


```R
library(glue)
library(sf)
library(ncdf4)
library(raster)
library(rasterVis)
library(RColorBrewer)
library(lubridate)
library(tidyverse)
library(janitor)

```
And here is the main function with which I generate the csv
```R
generate_raster <-
  function(lag,
           crs_value,
           aggregate_factor,
           write_raster,
           write_shp
           ) {
    varname <- glue("dhdt_lag{lag}/dhdt")

    # extract data
    ice_change_raw <-
      brick(path, varname = varname)

    # assign projection
    crs(ice_change_raw) <- "EPSG:3031"

    # calculate mean
    print('Calculating mean...')
    mean_ice_change <- mean(ice_change_raw)

    # reduce cell size
    print('Aggregating values...')
    raster_aggregated <-
      aggregate(mean_ice_change, fact = aggregate_factor)

    if (write_raster == T) {
      print('Writing raster...')
      writeRaster(
        mean_ice_change,
        filename = glue("median_ice_change_dhdt_lag{lag}.tif"),
        overwrite = T
      )
    }

    # to shp
    print('Poligonizing...')
    poligonized <- rasterToPolygons(raster_aggregated)
    if(write_shp) {
      raster::shapefile(
        poligonized,
        glue(
          "poligonized_lag{lag}_aggregate_factor{aggregate_factor}.shp"
        ),
        overwrite = T
      )
    }

    # convert to simple features
    as_sf <- poligonized %>% st_as_sf()

    # extract centroids
    print('Calculating centroids...')
    centroids <- as_sf %>%
      st_centroid() %>%
      st_transform('EPSG:4326') %>%
      mutate(value = format(round(layer, 2), nsmall = 2),
             long = unlist(map(geometry, 1)),
             lat = unlist(map(geometry, 2)),
             long=format(round(long, 2), nsmall = 2),
             lat=format(round(lat, 2), nsmall = 2)
      ) %>%
      select(-layer) %>%
      st_drop_geometry()

    # write centroids
    st_write(
      centroids <- as_sf %>%
        st_centroid() %>%
        st_transform('EPSG:4326'),
      glue(
        "centroids_lag{lag}_aggregate_factor{aggregate_factor}.geojson"
      ),
      delete_dsn = T
    )

    # write cscv
    write_csv(
      centroids,
      glue("centroids_lag{lag}_aggregate_factor{aggregate_factor}.csv")
    )

    write_csv(
      centroids %>%
        filter(as.numeric(value) <= 0),
      glue("centroids_lag{lag}_aggregate_factor{aggregate_factor}_ice_lost.csv")
    )

  }
```

*_2024 Update_ Latest version has split the continent into four different files: two 1.6Gb files, one 1Gb file and one 776Mb file..




**Conclusions**
I am glad with the outcome of this project. The opportunity to face several barriers along the way and overcome them is something that doesn't always happen in media and specially when you stick your nose into other people's business. Facing that raw NASA data, working with it, making decisions on how to use it and finding the best way to transform it to get the most out of it has been a very positive experience.

You can take a look at the article [here](https://elpais.com/ciencia/2023-02-24/el-centro-del-mundo-se-desmigaja-como-una-galleta.html).
