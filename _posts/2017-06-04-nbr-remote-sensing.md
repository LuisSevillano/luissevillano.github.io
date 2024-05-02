---
title: The power of remote sensing and its application to the media
description: Exploring remote sensing through an analysis of two practical applications of the Difference Normalized Burn Index, focusing on the assessment of the severity of two major fires in Spain using Landsat 8 imagery.
media_type: img
media_source: /assets/images/thumbnails/remote-sensing.jpg
date: 2017-06-04
url: /nbr-remote-sensing
tags: [QGIS, Landsat 8, OSM, ai2html]
---

I usually say that if I would study something new it will be something related with the remote sensing. As I am always searching for how learn more about this area I always try to apply when I have an oportunity to.

Unfortunately the Iberian peninsula usually suffers every summer more fires than anyone would want, either intentionally or by chance. This year a fatal fire in Pedrogao, Portugal killed more than 60 people. A simple search in Nasa's Earth Explorer reveal the magnitude of this misfortune.

{:.half-image}
![image](/assets/images/LC08_L1TP_204032_20170615_20170628_01_T1-sm.jpg)

{:.half-image}
![image](/assets/images/LC08_L1TP_204032_20170701_20170715_01_T1-sm.jpg)
_Capture from the lesson about how to use the basic algorythms of any GIS (buffers, clips, difference, etc.)._

The Landsat 8 sensor allows us to appreciate these consequences on the ground. On the left, a shot taken the 15th of june, on the right the first of july of 2017.

I saw people work with Landsat's bands and calculate several index to extract information about like NVDI or NBR. I found [Nasa's product guide](https://landsat.usgs.gov/sites/default/files/documents/si_product_guide.pdf) and this [paper](http://www.mtbs.gov/pdf/Escuin_Navarro_etal_2008_BS_NBR_NDVI_Spain.pdf) from the 2008 International Journal of Remote Sensing write by a spanish investigation group of Cordoba Univeristy.

Thanks to Luca Congedo's [Semi-Automatic Classification Plugin](https://github.com/semiautomaticgit/SemiAutomaticClassificationPlugin) for QGIS is easy to pre processing images, make post processing of classifications or realize raster operations.

I have had the opportunity to apply my new and humble knowledge twice. In the context of Portugal fire we wrote a feature about how similar is the scenario in Spain. I analyzed the fire occured in La Palma island that burned 7% of its land.

{% include custom/la-palma.html %}

The same weekend that we launch this feature a new devastating fire was
declared in Donana's Natural Park in southwest of Spain. We had to wait
until new post-fire data was available to make the comparision and
apreciate the fire magnitude.

It was the second chance to calculate the Normalized Burn Ratio (NBR)
index from Landsat 8 bands in Donana fire and estimate its magnitude.

{% include custom/donana.html %}
