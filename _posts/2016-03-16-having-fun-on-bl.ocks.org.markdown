---
layout: post
title:  "Having fun on bl.ocks.org!"
date:   2016-03-16 02:11:14
categories: post
---

I wrote this example of step linear chart using `d3`, a JavaScript library for manipulating documents based on data created by [Mike Bostock](https://twitter.com/mbostock). Below is its code, but you can see it by your self [here](http://bl.ocks.org/LuisSevillano/7646cfbf60cb32b864c9).
<img src="/img/line-chart.png" alt="Drawing" style="width: 100%;"/>


{% highlight html %}
<html>
<head>
	<title></title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js" charset="utf-8"></script>
	<style type="text/css">
	body {
		font: 10px sans-serif;
	}

	.randomize {
		float: left;
		display: block;
		width: 90px;
		font-size: 14px;
		padding: 0.7em 1em;
		margin: 1em 0.5em;
		border: 0.01em solid rgb(197,197,197);
		background-color: rgb(240,240,240);
		border-radius: 0.1em;
		color: rgb(30,30,30);
		text-align: center;
	}

	.axis path,
	.axis line {
		fill: none;
		stroke: #777;
		shape-rendering: crispEdges;
	}
	.axis text {
		fill:#777;
	}
	.line {
		fill: none;
		stroke: rgb(255,74,27);
		stroke-width: 1.5px;
	}
	</style>
</head>
<body onload="randomize();">
	<div id="chart"></div>
	<div class="randomize">Randomize</div>
	<script type="text/javascript">

	var margin = {top: 20, right: 50, bottom: 20, left: 20};
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

	var svg = d3.select('#chart').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var path, trans = 25, circle;

	function generateData(a,b) {
		return d3.range(Math.floor(Math.random()*60)+20).map(function(item,index){
			return { x:index, y:Math.random()*10*index,z:Math.floor(Math.random()*5)+2 };
		});
	}

	var data = generateData();

	svg.append("rect")
	.data(data)
	.attr('width', width)
	.attr('height', height)
	.attr("fill-opacity", "0")
	.attr("fill", "white")
	.on("mousemove", point)
	.on("mouseover", over)
	.on("mouseleave", leave)
	.attr("transform", "translate(" + trans + ",0)");

	var path = svg.append("path");

	var x = d3.scale.linear()
	.range([0, width])
	.domain(d3.extent(data, function(d) { return d.x; }));

	var y = d3.scale.linear()
	.range([height, 0])
	.domain([0, d3.max(data, function(d) { return d.y+10; })]);

	var line = d3.svg.line()
	.interpolate("step-before")
	.x(function(d) { return x(d.x); })
	.y(function(d) { return y(d.y); });

	var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(20);

	var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(15);

	var drag = d3.behavior.drag()
	.origin(function(d) { return d; })
	.on("dragstart", dragstarted)
	.on("drag", function(){ dragged(this); })
	.on("dragend", dragended);


	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(" + trans + "," + height + ")")
	.call(xAxis);

	svg.append("g")
	.attr("class", "y axis")
	.attr("transform", "translate(" + trans + ",0)")
	.call(yAxis);

	svg.on("click", function(){
		svg.append("circle")
		.attr("cx", d3.mouse(this)[0])
		.attr("cy", d3.event.pageY-10)
		.attr("fill", "none")
		.attr("stroke", "#777")
		.attr("r", "0")
		.transition()
		.duration(500)
		.ease("circle")
		.attr("r", "50")
		.attr("stroke", "white")
		.remove();
	});

	function point(){
		var pathEl = path.node();
		var pathLength = pathEl.getTotalLength();
		var BBox = pathEl.getBBox();
		var scale = pathLength/BBox.width;
		var offsetLeft = document.getElementById("line").offsetLeft;
		var _x = d3.mouse(this)[0];
		var beginning = _x , end = pathLength, target;
		while (true) {
			target = Math.floor((beginning + end) / 2);
			pos = pathEl.getPointAtLength(target);

			if ((target === end || target === beginning) && pos.x !== _x) {
				break;
			}
			if (pos.x > _x){
				end = target;
			}else if(pos.x < _x){
				beginning = target;
			}else{
				break; //position found
			}
		}
		circle
		.attr("opacity", 1)
		.attr("cx", _x+ trans)
		.attr("cy", pos.y);

	}
	function over(){
		circle.transition().duration(200).style("opacity", "1");
	}
	function leave(){
		circle.transition().duration(200).style("opacity", "0");
	}



	function dragstarted(d){
		d3.select(this).style("cursor", "pointer");
		d3.event.sourceEvent.stopPropagation();
		d3.select(this).attr("fill", "brown");
	}
	function dragged(d){
		//d3.select(this).attr("cx", +d3.select(this).attr("cx") + d3.event.dx).attr("cy", +d3.select(this).attr("cy") + d3.event.dy)
		//d3.select(this).attr("cy", +d3.select(this).attr("cy") + d3.event.dy);
		var x = d3.select(d).attr("cx");
		var y = d3.select(d).attr("cy");
		var cradius = d3.select(d).attr("r");
		var cx = Math.min(width,+x + d3.event.dx);
		var cy = Math.min(height,+y + d3.event.dy);
		var draggedCircles = [{ "x": cx, "y": cy, "radius": cradius }];

		d3.select(d)
		.data(draggedCircles)

		.attr("cy", function (d) { return d.y; });
	}

	function dragended(d){
		d3.select(this)
		.style("cursor", "");
		d3.select(this).attr("fill", "steelblue");
	}
	function randomize(){

		var data = generateData();

		x.domain(d3.extent(data, function(d) { return d.x; }));
		y.domain([0, d3.max(data, function(d) { return d.y; })]);

		svg.selectAll(".circle")
		.transition()
		.duration(3500)
		.attr("r", "0")
		.style("opacity", "0");

		path
		.datum(data)
		.attr("class", "line")
		.attr("id", "line")
		.attr("stroke-dasharray", totalLength + " " + totalLength)
		.attr("stroke-dashoffset", totalLength);

		path
		.attr("stroke", "rgb(255,74,27)")
		.attr("stroke-width", "2")
		.attr("fill", "none")
		.attr("transform", "translate(" + trans + ",0)")
		.attr("d", function(d){
			return line(d);
		});

		var totalLength = path.node().getTotalLength();
		path
		.attr("stroke-dasharray", totalLength + " " + totalLength)
		.attr("stroke-dashoffset", totalLength)
		.transition()
		.duration(1500)
		.delay(300)
		.ease("linear")
		.attr("stroke-dashoffset", 0)
		.attr("pointer-events", "none");

		svg.select("g.x")
		.transition()
		.duration(400)
		.call(xAxis);
		svg.select("g.y")
		.transition()
		.duration(400)
		.call(yAxis);

		var bubbles = svg.selectAll(".circle").data(data);

		bubbles
		.enter()
		.append("circle")
		.attr("r", "0")
		.attr("cy" , height)
		.attr("class", "circle")
		.attr("fill", "white")
		.attr("stroke-width", "2")
		.attr("stroke", "rgb(205,23,25)")
		.attr("transform", "translate(" + trans + ",0)")
		.call(drag);

		bubbles
		.exit()
		.transition()
		.duration(100)
		.attr("r", "0")
		.remove();

		bubbles
		.transition()
		.duration(100)
		.delay(function(d, i) {
			return (i / data.length * 1000)-500;
		})
		.attr("r", "0")
		.style("opacity", "0")
		.attr("cx" , function(d){
			return x(d.x);
		})
		.attr("cy" , function(d){
			return y(d.y);
		})
		.transition()
		.duration(500)
		.delay(function(d, i) {
			return (i / data.length * 1000)+500;
		})
		.style("opacity", "1")
		.attr("r", function(d){
			return d.z;
		})

		circle = svg.append("circle")
		.attr("r", 7)
		.attr("fill", "rgb(205,23,25)")
		.style("opacity", "0")
		.attr("pointer-events", "none")
		.attr("stroke-width", "2.5")
		.attr("stroke", "white");
	}

	d3.select(".randomize").on("click", randomize);

	</script>


</body>
</html>
{% endhighlight %}
