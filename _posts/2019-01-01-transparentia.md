---
title: Transparentia
description: Transparentia is a project that was born with the purpose of helping to answer questions that you usually ask about how many politicians are there in Spain, what are their salaries, etc.
media_type: img
media_source: /assets/images/thumbnails/transparentia_logo.jpg
date: 2019-01-02
url: /transparentia
tags: [VanillaJS, Datatables, Awesomplete]
---

A few months ago I had the chance to develop a web application for Newtral, the startup of the journalist [Ana Pastor](https://twitter.com/_anapastor_).

It wasn't an easy task as the requirements were changing as we developed the application and we saw the complexity of the initially proposed objectives.

Transparentia is an application to search and find the positions and salaries of more than 10K spanish politicians. Its developed the be able to store and show an historic of positions. Even it is designed to store more than one salary for each position.

Newtral's crew goal were to show the carrer of all the current and past politicians of our country. It lets you search by name and by salary. It also contains and advanced search where you can search by political party, position, institution, etc.

[Go to the project](https://newtral.es/transparentia/).

{% include media.html media_type="video"
media_source="/assets/images/transparentia_plain_search" class_names="fixed_width" media_caption="Capture of a search using the basic search engine." %}

Transparentia is a _one-page-app_ so the url is hacked to give the impression of navigation but all are screens that are showed or hidden using `window.history` and `history.pushState`. That is the reason because the perfomance of the app is fast.

On the backend, Transparentia is a Laravel with a MySQL Database as it has to be a Wordpress plugin. All the art in the back is from my colleague [Xavier Foguet](https://twitter.com/XavierFoguet).

{% include media.html media_type="video"
media_source="/assets/images/transparentia_advanced_search" class_names="fixed_width" media_caption="Video capture using advanced search filters." %}
