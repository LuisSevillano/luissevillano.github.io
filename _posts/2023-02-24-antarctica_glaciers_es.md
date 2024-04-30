---
title: The center of the world crumbles like a cookie
description: Antarctica is already suffering heat waves that exceed 18 degrees Celsius and is melting at its edges. What's happening?
media_type: video
media_source: /assets/images/antarctica
date: 2023-02-24
permalink: antarctica_glaciers_es
tags: [R, QGIS, d3js, ai2html, Illustrator]
language: 'es'
---

Esta colaboración con nuestros compañeros de Materia, la sección de Ciencia de El País, resultó en una experiencia de lo más gratificante. Manuel Ansede y Claudio Álvarez tuvieron la oportunidad de viajar al continente antártico acompañando a una misión científica chilena. Este grupo de científicos estudian los cambios que se están produciendo en la Antártida, muchos de ellos apreciables a escala humana.

Persiguiendo la idea de mostrar al contiennte antártico como protagonista y actor fundamental en el equilibrio del planeta, mi compañero Ansede me mostró una proyección conocida como _Spilhaus Projection_ que presenta todos los mares del planeta como una única masa de agua y la Antártida en el centro.

![spilhaus](/assets/images/spilhaus.jpeg)
_https://le-cartographe.net/blog/archives/342-athelstan-spilhaus_

¿Hasta qué punto sería posible trabajar con una proyección como esta? En ese momento toavía no sabíamos exactamente cómo ibamos a instroducir la historia y generalmente este tipo de proyecciones complejas son difíciles de reproducir en QGIS, el principal software que utilizamos a la hora de trabajar con datos geográficos. Después de buscar en profundidad comprobé que efectivamente no era posible y que la única manera de poder utilizar esta proyección iba a ser a través de d3js.

Una vez presentada la idea de las masas de agua interconectadas gracias a Spilhaus y de localizar el viaje de mis compañeros ¿cómo podría mostrar el derretimiento de la Antártida?

Fortunately, we have data from [NASA's ICESat-2 mission](ttps://icesat-2.gsfc.nasa.gov/mission). This satellite _carries a photon-counting laser altimeter that allows scientists to measure the elevation of ice sheets, glaciers, sea ice and more - all in unprecedented detail_. This mission offers its data openly in NetCDF, an archive format designed to store multidimensional scientific data, such as climate data, oceanographic data, atmospheric data, numerical model data and the like.


![netcdf_1](/assets/images/netcdf_1.jpg)
_https://web.itu.edu.tr/~tokerem/netcdf.html_

**Los datos**
NetCDF data is a format increasingly used by the scientific community and can be somewhat complex: it contains a lot of information, it is usually a very large file (in this case more than 6.4Gb), etc.

Access to this dataset can be done through the following [link](https://n5eil01u.ecs.nsidc.org/ATLAS/ATL15.003/2019.03.29/?C=S;O=D) and here [ATLAS/ICESat-2 L3B Gridded Antarctic and Arctic Land Ice Height Change](https://nsidc.org/data/atl15/versions/2), is the description of the dataset. I recommend taking a look at the documentation that can be found here.

![netcdf_1](/assets/images/icesat_lag_table.jpg)
_https://nsidc.org/sites/default/files/documents/user-guide/atl15-v003-userguide_0.pdf_


**Un poco de código**
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
