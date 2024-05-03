---
title: Mexico has 30% of its land under high seismic risk
description: Authorities risk's maps reveal that one third of the population is exposed to high or very high levels of seismic hazard. Researchers analyze the risks to prevent the probable damage of a major earthquake in the country.
media_type: img
media_source: /assets/images/guerrero_landscape.jpg
date: 2019-08-08
permalink: guerrero-gap
language: 'en'
---

Following an article published on the seismological risk in spain, the possibility of publishing a similar story focused on Mexico arose. Mexico has a great seismic activity and has in particular an area that has attracted the attention of researchers for decades: The Guerrero Gap.

The area known as the **Guerrero Gap** is an 110 kilometers area long where no major earthquake has been recorded for more than a century, despite being located in a zone of high seismic activity. In a country where every year more than a thousand earthquakes of magnitude greater than 3.5 are registered, this place attracts the attention of experts: how much energy has accumulated in this place and when will it detonate?

{% include custom/guerrero.html %}

This article offered me the opportunity to get my first taste of Blender. The famous software for the elaboration of three-dimensional graphics has earned a place during the last years in the field of Cartography, especially in the use of its capabilities to create a more realistic lighting than the traditional Hillshades offered by GIS software such as QGIS.

In order to create a scene with real elevation data, Blender needs a `height map`: a black and white image where the pixels closest to the white represent the highest altitude and the black ones the lowest. This data can come from a digital elevation model (DEM). However, a small modification of this type of file is necessary to work with it in Blender. This process is covered in depth in the best post on using Blender to create shaded reliefs:  Daniel Huffman's [Creating Shaded Relief in Blender](https://somethingaboutmaps.wordpress.com/2017/11/16/creating-shaded-relief-in-blender/).


One of the problems I found was how to combine Elevation data with Bathymetry data. The best idea I had was to create a few functions that use GDAL to filter values above and below zero, perform a resampling to make sure that the two data sets had the same resolution and finally merge them into one file.

```shell
function filter_values(){
    file_name="${1%%.*}"
    input=${1}_clipped.tif
    calc=$2
    echo "Filtering values from ${1}..."
    gdal_calc.py \
        --quiet \
        --overwrite \
        -A $input \
        --calc=$calc \
        --outfile ${file_name}_filtered.tif
}
```

This function was then used as follows:
```shell
filter_values srtm "(A>0)*A"
filter_values gebco "(A<0)*A"
```

A _resampling_ of the data is performed to avoid conflicts related to different resolutions:

```shell
function resample(){
    file_name="${1%%.*}"
    input=${1}_filtered.tif
    output=${file_name}_resampled.tif
    gdalwarp \
        -overwrite \
        -of GTiff -co COMPRESS=DEFLATE \
        -ts 1000 1000 \
        -r cubic \
        $input temp.tif

    gdal_translate \
        -of GTiff -a_nodata 0 \
        temp.tif $output

    rm temp.tif
}
```
Finally, a _merge_ of the two files is made:

```shell
function merge_files(){
    file_name1="${1%%.*}"
    file_name2="${2%%.*}"
    input1=$1
    input2=$2
    output=srtm_gebco_merged.tif
    gdal_merge.py \
        -o temp.tif \
        -init 0 \
        $input1 $input2

    # fill no data values
    gdal_fillnodata.py temp.tif $output
    rm temp.tif
}
```
With these steps we get a TIFF file with bathymetry and altimetry data. Finally, I used the great `blenderize` script by Nick Underwood ([enlace](https://github.com/nunderwood6/blender_prep)) that allows to scale the values, project to your desired CRS, etc. and get a height map ready to work in Blender.

Blender was used only in the locator map that opens the piece. In the article there are other interesting elements such as a locator of the Guerrero Gap or a large map of Mexico that collects all the earthquakes in the area during the last century.

{% include custom/mexico.html %}

These maps were made with QGIS and Adobe Adobe Illustrator and were published through [ai2html](http://ai2html.org/).

**Conclusions**

Until the moment of working on this article I had never used 3D software even though it was something that had always caught my attention. As in any field when you start is hard and making a simple diorama cost me more than planned but I learned along the way, I lost the fear of Blender and today is one of my favorite tools and I use whenever I have the opportunity.

What would you change today from the article? Two ideas come to my mind: the design, the composition of the _diorama_ is designed for desktop and does not work on mobile. I would probably not mess around processing the batting data and would use the GEBCO data directly. They are fantastic and for the scale of the map it is more than enough resolution.

You can take a look at the article [here](https://elpais.com/mexico/2021-04-18/en-la-busqueda-del-proximo-gran-terremoto-en-la-brecha-sismica-de-guerrero.html).
