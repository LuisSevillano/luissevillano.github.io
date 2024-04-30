---
title: "Mexico has 30% of its land under high seismic risk"
description: "Authorities risk's maps reveal that one third of the population is exposed to high or very high levels of seismic hazard. Researchers analyze the risks to prevent the probable damage of a major earthquake in the country."
media_type: img
media_source: /assets/images/guerrero_landscape.jpg
date: 2019-08-08
permalink: guerrero-gap-es
tags: [QGIS, GDAL scripts, Blender, ai2html, Illustrator]
language: 'es'
---

A raíz de un artículo sobre el riesgo sísmico en España, surgió la posibilidad de realizar una colaboración con nuestros compañeros de El País México sobre esta situación en su país. México tiene una gran actividad sísmica y cuenta en particular con una zona que llama la atención de los investigadores desde hace décadas: La Brecha de Guerrero.

La conocida como Brecha de Guerrero es un área de 110 kilómetros de largo donde desde hace más de un siglo no se registra un gran terremoto a pesar de estar situada en una zona de alta actividad sísmica. En un país donde cada año se registran más de mil sismos de magnitud superior a 3,5, este lugar reúne las miradas de expertos: ¿cuánta energía se ha acumulado en ese lugar y cuándo detonará?

{% include custom/guerrero.html %}

Desde el punto de vista técnico este artículo me ofreció la oportunidad de estrenarme con Blender. El famoso software para la elaboración de gráficos tridimensionales se ha ganado un lugar durante los últimos años en el ámbito de la Cartografía, especialmente en el uso de sus capacidades para crear una iluminación más realista que el tradicional _shaded relief_ que ofrecen softwares GIS como QGIS.

Para lograr crear una escena con datos reales de elevación, Blender necesita un tipo de archivo conocido como `height map`: una imagen en blanco y negro donde los píxeles más cercanos al blanco representan la mayor altitud y los negros la menor. Estos datos pueden venir de un modelo digital de elevación (DEM: Digital Elevation Model). Pero para poder trabajarlos con Blender es necesaria una pequeña modificación. No vamos a cubrir este aspecto en este post, para ello está el mejor lugar al que puedes acudir:  Daniel Huffman's [Creating Shaded Relief in Blender](https://somethingaboutmaps.wordpress.com/2017/11/16/creating-shaded-relief-in-blender/).

Uno de los inconvenientes con los que me encontré fue cómo combinar datos de Elevación con datos de Batimetría. En ese momento la mejor idea que tuve fue la de crear un script en bash con unas funciones que permitían filtrar los valores por encima y por debajo de cero, realizar un resampling para asegurarme de que los dos conjuntos de datos tuvieran la misma resolución y por último mergearlos.

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

Esta función era después utilizada de la siguiente manera:
```shell
filter_values srtm "(A>0)*A"
filter_values gebco "(A<0)*A"
```

Posteriormente se hace un _resampling_ de los datos para evitar conflictos relacionados con las diferentes resoluciones:

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
Por último se hace un _merge_ de los dos archivos:

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

Con estos pasos obtenemos un archivo TIFF con datos de batimetría y altimetría. Finalmente, utilicé el magnífico script `blenderize` de Nick Underwood ([enlace](https://github.com/nunderwood6/blender_prep)) que permite escalar los valores, proyectar al CRS deseado, etc. y obtener un height map preparado para trabajar en Blender.

Blender fue utilizado únicamente en el mapa localizador que abre la pieza. En el artículo existen otros elementos interesantes como un localizador de la Brecha de Guerrero o un gran mapa de México que recoge todos los terremotos producidos en la zona durante el último siglo.

{% include custom/mexico.html %}

Estos mapas fueron realizados con QGIS y Adobe Illustrator y fueron publicados a través de [ai2html](http://ai2html.org/).

**Conclusiones**

Hasta el momento de trabajar en este artículo nunca había utilizado con un software de 3D a pesar de ser algo que siempre me había llamado la atención. Como en cualquier ámbito cuando empiezas es duro y realizar un simple diorama me costó más de lo planeado pero aprendí por el camino, perdí el miedo a Blender y hoy es una de mis herramientas favoritas y que utilizo siempre que tengo la oportunidad.

¿Qué cambiaría hoy del artículo? Dos ideas me vienen a la cabeza: el diseño, la composición del _diorama_ está pensado para escritorio y no funciona en móbile. Problablemente no me liaría procesando los datos de batimería y utilizaría directamente los datos de GEBCO. Son fantásticos y para la escala que tiene el mapa es una resolución más que suficiente.

Puedes echar un ojo al artículo [aquí](https://elpais.com/mexico/2021-04-18/en-la-busqueda-del-proximo-gran-terremoto-en-la-brecha-sismica-de-guerrero.html).
