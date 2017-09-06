var width, height,statePath,
mapContainer = d3.select("#map-counties"),
candidates = {
  "c":"Hillary Clinton",
  "t":"Donald Trump",
  "j":"Gary Johnson"
},
filter = {
  "winner":"candidate1",
  "dem":"j",
  "rep":"t"
}
key = "c1p",
winner = "c1n";
active = d3.select(null),
desktop = window.innerWidth > 768,
containerWidth = mapContainer.node().getBoundingClientRect().width,
width = Math.min(containerWidth, 1600),
height = (width * 0.62),
tooltip = d3.select("#tooltip"),
tooltipArrow = d3.select("#arrow"),

format = d3.formatLocale({
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["", ""]
}).format("$,d"),
decFormat = function(d){
  var value = d.replace(".", ",");
  return value;
},
demColorScale = d3.scaleLinear().domain([40,85]).range(["#5EA6D6","#1A80C4"]),
repColorScale = d3.scaleLinear().domain([40,85]).range(["#DB7777","#CC3D3D"]),

scales = {
  "c":function(d){
    return demColorScale(d);
  },
  "t":function(d){
    return repColorScale(d);
  },
};

var projection = d3.geoAlbersUsa()
.scale(1100);

var path = d3.geoPath()
.projection(projection);

d3.queue()
.defer(d3.json, "resources/us-counties/map/us.json")
.await(ready);

function ready(error, map){

  d3.selectAll(".filter").on("click", filter);

  var svg = mapContainer.append("svg")
  .attr('width', width)
  .attr('height', height)
  .append("g")
  .attr('class', 'composition');

  var defs = svg.append("defs");

  defs.append("filter")
  .attr("id", "blur")
  .append("feGaussianBlur")
  .attr("stdDeviation", 8);

  defs.append("path")
  .datum(topojson.feature(map, map.objects.states))
  .attr("id", "land")
  .attr("d", path);

  svg.append("use")
  .attr("class", "land-glow")
  .attr("xlink:href", "#land")
  .attr('transform', 'translate(-50,0)');

  svg.append("use")
  .attr("class", "land-fill")
  .attr("xlink:href", "#land")
  .attr('transform', 'translate(-50,0)');

  // groups definition
  var land = svg.append("g").attr("class", "land").attr('transform', 'translate(-50,0)');
  countiesG = svg.append("g").attr("class", "counties").attr('transform', 'translate(-50,0)'),
  statesG = svg.append("g").attr("class", "states").attr('transform', 'translate(-50,0)'),
  labelsG = svg.append("g").attr('class', 'labels').attr('transform', 'translate(-50,0)');
  var stateCod = [];
  // counties
  var counties = countiesG.selectAll(".county")
  .data(topojson.feature(map, map.objects.counties).features)
  .enter()
  .append("path")
  .attr("d", path)
  .attr("class", function(d){
    return "county path" + " county_cod_" + d.id + " " + d.properties.n
  })
  .attr('stroke-width', '0.5')
  .attr('fill', function(d){
    return scales[d.properties.c1n](d.properties.c1p);
  })
  .attr('stroke', function(d){
    return scales[d.properties.c1n](d.properties.c1p);
  });

  if(desktop) counties.on("mouseenter",mouseenter).on("mousemove",mousemove).on("mouseenter",mouseenter).on("mouseleave",mouseleave);


  // states
  var states = statesG.selectAll(".state")
  .data(topojson.feature(map, map.objects.states).features)
  .enter()
  .append("path")
  .attr("d", path)
  .attr("class", function(d){
    return "state path" + " state_cod_" + d.id + " " + d.properties.n
  });


  var labels = labelsG.selectAll("map-label label")
  .data(topojson.feature(map, map.objects.states).features)
  .enter()
  .append("text")
  .attr('class', function(d){
    return "map-label label label_"+d.properties.id;
  })
  .attr('transform', function(d){
    var centroid = path.centroid(d);
    return tranSettings[d.properties.id] && (centroid[0] += tranSettings[d.properties.id][0], centroid[1] += tranSettings[d.properties.id][1]), "translate(" + centroid + ")"
  })
  .text(whatLabels);

  function whatLabels(d,i){
    var givenState = d.properties.id, search;
    if (otherStates.indexOf(givenState) === -1) {
      return givenState;
    }
  }

  statesG.select(".Alaska").attr("data", function(d){
    d.properties.c1n = "t";
    d.properties.c1v = "130415";
    d.properties.c1p = "52.9";

    d.properties.c2n = "c";
    d.properties.c2v = "93007";
    d.properties.c2p = "37.7";

    d.properties.c3n = "j";
    d.properties.c3v = "14593";
    d.properties.c3p = "5.9";

    d.properties.t = 1;
    d.properties.c = 2;
    d.properties.j = 3;
  })
  .style("fill", function(d){
    return repColorScale(d.properties.c1p)
  })
  .on("mouseenter",mouseenter)
  .on("mousemove",mousemove)
  .on("mouseleave",mouseleave);

  function mousemove(d){

    tooltipArrow.style("left", "");

    tooltipArrow.classed("top bottom", false);
    var eventX = d3.event.layerX,
    eventY = d3.event.layerY,
    xPosition = 0, yPosition = 0;
    tooltipHeight = tooltip.node().getBoundingClientRect().height,
    tooltipWidth = tooltip.node().getBoundingClientRect().width,
    middleTooltipW = tooltipWidth / 2,
    middleTooltipH = tooltipHeight / 2,

    margins = {
      left: middleTooltipW + 10,
      right : width - middleTooltipW + 2,
      top: tooltipHeight + middleTooltipH,
      bottom: height - middleTooltipH
    };

    isBetweenMarginsW = eventX > margins.left && eventX < margins.right;
    isBetweenMarginsH = eventY > margins.top && eventY < margins.bottom;

    // handle vertical position
    if(eventY < margins.top) {
      yPosition = eventY + 50;
      tooltipArrow.classed("top", true);
    }else if(eventY > margins.top) {
      yPosition = eventY - tooltipHeight - 20;
      tooltipArrow.classed("bottom", true);
    }else {
      yPosition = eventY - tooltipHeight - 20;
      tooltipArrow.classed("bottom", true);

    }
    // handle horizontal position
    if(eventX < margins.left) {
      xPosition = 10;
      tooltipArrow.style("left", "").style("left", Math.max((eventX - 20), -2)  + "px");
    }
    else if(isBetweenMarginsW){
      xPosition = eventX - middleTooltipW;
      tooltipArrow.style("left", "").style("left", middleTooltipW - 10 + "px");
    }
    else if (eventX > margins.right) {
      xPosition = width - tooltipWidth + 2;
      tooltipArrow.style("left", "").style("right", Math.max((width - eventX - 8), -2) + "px");
    }else {
      xPosition = eventX - middleTooltipW
      tooltipArrow.style("left", "").style("left", middleTooltipW - 10 + "px");
    }

    tooltip
    .style("left", "") // reset values
    .style("right", "") // reset values
    .style("left", xPosition + "px")
    .style("top", yPosition + "px");
  }

  function mouseenter(d) {
    var data = d.properties;
    d3.event.preventDefault()

    d3.select(this)
    .style("opacity", 0.85)
    .style('stroke-width', '1.5')
    .style('stroke', 'black')
    .attr("opacity", null)
    .attr('stroke-width', null)
    .attr('stroke', null)
    .raise()

    tooltip.style("display", "block");

    tooltip.selectAll("tbody tr").classed("c t j", false);

    tooltip.select(".c1").classed(data.c1n, true);
    tooltip.select(".c2").classed(data.c2n, true);
    tooltip.select(".c3").classed(data.c3n, true);

    tooltip.select(".county-name").html("Condado de "+data.n);
    tooltip.select(".state-name").html(stateNames[d.properties.cd].n+":");
    tooltip.select(".electoral-votes").html(""+stateNames[d.properties.cd].v+" votos electorales");

    tooltip.select(".c1 .cname").html(candidates[data.c1n])
    tooltip.select(".c1 .cv").html(format(data.c1v))
    tooltip.select(".c1 .cp").html(decFormat(data.c1p)+"%")

    tooltip.select(".c2 .cname").html(candidates[data.c2n])
    tooltip.select(".c2 .cv").html(format(data.c2v))
    tooltip.select(".c2 .cp").html(decFormat(data.c2p)+"%")

    tooltip.select(".c3 .cname").html(candidates[data.c3n])
    tooltip.select(".c3 .cv").html(format(data.c3v))
    tooltip.select(".c3 .cp").html(decFormat(data.c3p)+"%")

  }
  function mouseleave(d) {
    // Hide tooltip
    tooltip.style("display", "none");

    var scale = scales[key] || function(){}

    return d3.select(this)
    .style('opacity', '1')
    .style('stroke-width', '0.5')
    .style('stroke', function(d){
      return scale(d.properties["c"+d.properties[key]+"p"]) || scales[d.properties.c1n](d.properties.c1p);
    });
  }
  function filter(){

    // d3.selectAll(".filter").classed("active", false)
    d3.selectAll(".filter").classed("active", false)
    d3.select(this).classed("active", true)
    key = d3.select(this).attr("data-candidate"),
    winner = key.length > 1 ? "c1n" : key;
    var scale;

    scale = scales[key] || function(){}
    svg.selectAll(".county")
    .style("fill", function(d,i){
      return scale(d.properties["c"+d.properties[key]+"p"]) || scales[d.properties.c1n](d.properties.c1p);
    })
    .style("stroke", function(d,i){
      return scale(d.properties["c"+d.properties[key]+"p"]) || scales[d.properties.c1n](d.properties.c1p);
    });
    d3.select(".Alaska").style("fill", function(d){
      return scale(d.properties["c"+d.properties[key]+"p"]) || scales[d.properties.c1n](d.properties.c1p);
    })


  }
  d3.select(window).on('resize', resize);
  resize();
  function resize() {
    // update variables
    desktop = window.innerWidth > 768,
    containerWidth = mapContainer.node().getBoundingClientRect().width,
    width = Math.min(containerWidth, 1600);

    if(desktop) counties.on("mousemove",mousemove).on("mouseenter",mouseenter).on("mouseleave",mouseleave);
    else if(desktop) counties.on("mouseenter",null).on("mousemove",null).on("mouseenter",null).on("mouseleave",null);

    tooltip.style("display", "none")
    // resize
    d3.selectAll("g.composition").attr("transform", "scale(" + containerWidth/860 + ")");
    d3.select("#map-counties svg").style("height", containerWidth*0.62);
    d3.select("#map-counties svg").style("width", containerWidth);
  }



}
