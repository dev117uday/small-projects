
var width = 1255
var height = 700

var svg = d3.select("#graph")
	.append("svg")
	.attr("id", "treemap")
	.attr("width", width)
	.attr("height", height);

var tooltip = d3.select("body")
	.append("div")
	.attr("id", "tooltip")
	.style("opacity", 0);

var treemap = d3.treemap()
	.size([width, height])
	.paddingInner(1);

var fader = function (color) { return d3.interpolateRgb(color, "#fff")(0.2); },
	color = d3.scaleOrdinal(d3.schemeCategory10.map(fader));


function sumBySize(d) {
	return d.value;
}

dataUrl = "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json"

d3.json(dataUrl).then((data) => {

	var root = d3.hierarchy(data)
		.eachBefore((d) => {
			d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
		})
		.sum(sumBySize)
		.sort((a, b) => {
			return b.height - a.height || b.value - a.value;
		});

	treemap(root);

	var cell = svg.selectAll("g")
		.data(root.leaves())
		.enter()
		.append("g")
		.attr("class", "group")
		.attr("transform", function (d) {
			return "translate(" + d.x0 + "," + d.y0 + ")";
		});

	cell.append("rect")
		.attr("id", (d) => d.data.id)
		.attr("class", "tile")
		.attr("width", (d) => (d.x1 - d.x0))
		.attr("height", (d) => (d.y1 - d.y0))
		.attr("data-name", (d) => d.data.name)
		.attr("data-category", (d) => d.data.category)
		.attr("data-value", (d) => d.data.value)
		.attr("fill", (d) => color(d.data.category))
		.on("mouseover", (d) => {
			tooltip.transition()
				.duration(200)
				.style("opacity", 0.9);
			tooltip.html(
				"Name: " + d.data.name + "<br>" +
				"Category: " + d.data.category + "<br>" +
				"Value: " + d.data.value)
				.attr("data-value", d.data.value)
				.style("left", (d3.event.pageX + 10) + "px")
				.style("top", (d3.event.pageY - 30) + "px");
		})
		.on("mouseout", (d) => {
			tooltip.transition()
				.duration(200)
				.style("opacity", 0);
		});

	cell.append("text")
		.attr("class", "tile-text")
		.selectAll("tspan")
		.data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
		.enter()
		.append("tspan")
		.attr("x", 3)
		.attr("y", (d, i) => (13 + i * 10))
		.text((d) => d);

	var categories = root.leaves().map((nodes) => {
		return nodes.data.category;
	});
	categories = categories.filter((category, index, self) => {
		return self.indexOf(category) === index;
	});

	var legendWidth = 1100;
	var legendHeight = 100;
	var legendOffset = 10;
	var legendRectSize = 15;
	var legendHSpacing = 150;
	var legendVSpacing = 10;
	var legendTextXOffset = 3;
	var legendTextYOffset = -2;

	var legend = d3.select("#legend")
		.append("svg")
		.attr("width", legendWidth)
		.attr("height", legendHeight);

	var legendElemsPerRow = Math.floor(legendWidth / legendHSpacing);

	var legendElem = legend.append("g")
		.attr("transform", "translate(60," + legendOffset + ")")
		.selectAll("g")
		.data(categories)
		.enter()
		.append("g")
		.attr("transform", function (d, i) {
			return "translate(" + ((i % legendElemsPerRow) * legendHSpacing) + "," + ((Math.floor(i / legendElemsPerRow)) * legendRectSize + (legendVSpacing * (Math.floor(i / legendElemsPerRow)))) + ")";
		})

	legendElem.append("rect")
		.attr("width", legendRectSize)
		.attr("height", legendRectSize)
		.attr("class", "legend-item")
		.attr("fill", (d) => color(d));

	legendElem.append("text")
		.attr("class", "legend-text")
		.attr("x", legendRectSize + legendTextXOffset)
		.attr("y", legendRectSize + legendTextYOffset)
		.text((d) => d)
});