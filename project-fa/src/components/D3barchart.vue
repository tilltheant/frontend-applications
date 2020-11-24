<template>
	<div id="chart-wrapper">
		<svg id="d3-chart"></svg>
	</div>
</template>

<script>
	import * as d3 from 'd3';
	// Vue export logic
	export default {
		name: "Chart",
		props: ['chartData'],
		data() {
			return {
				svgElement: Object,
				x: Function,
				y: Function,
				width: Number,
				height: Number
			}
		},
		mounted() {
			let data = this.chartData;
			this.svgElement = d3.select("#d3-chart")
			// set the dimensions and margins of the graph
			const margin = {
					top: 20,
					right: 20,
					bottom: 30,
					left: 40
				},
				width = 960 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;
			// set the ranges
			const x = d3.scaleBand()
				.range([0, width])
				.padding(0.1);
			const y = d3.scaleLinear()
				.range([height, 0]);
			// append the svg object to the body of the page
			// append a 'group' element to 'svg'
			// moves the 'group' element to the top left margin
			const svg = d3.select("#d3-chart")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform",
					"translate(" + margin.left + "," + margin.top + ")");
			// format the data
			data.forEach(function(d) {
				d.sales = +d.sales;
			});
			// Scale the range of the data in the domains
			this.x.domain(data.map(function(d) {
				return d.name;
			}));
			this.y.domain([0, d3.max(data, function(d) {
				return d.sales;
			})]);
			// append the rectangles for the bar chart
			svg.selectAll(".bar")
				.data(data)
				.enter().append("rect")
				.attr("class", "bar")
				.attr("x", function(d) {
					return x(d.name);
				})
				.attr("width", x.bandwidth())
				.attr("y", function(d) {
					return y(d.sales);
				})
				.attr("height", function(d) {
					return height - y(d.sales);
				});
			// add the x Axis
			svg.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x));
			// add the y Axis
			svg.append("g")
				.call(d3.axisLeft(y));
			this.svgElement = svg;
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		},
		updated() {
			console.log('Updated chart');
			console.log(this.chartData);
			console.log(this.svgElement);
			// Create the u variable
			let u = this.svgElement.selectAll("rect")
				.data(this.chartData)
			u
				.enter()
				.append("rect") // Add a new rect for each new elements
				.merge(u) // get the already existing elements as well
				.transition() // and apply changes to all of them
				.duration(1000)
				.attr("x", (d) => { return this.x(d.name); })
				.attr("y", (d) => { return this.y(d.sales); })
				.attr("width", this.x.bandwidth())
				.attr("height", (d) => {
					return this.height - this.y(d.sales);
				})
			// If less group in the new dataset, I delete the ones not in use anymore
			u
				.exit()
				.remove()
		},
		computed() {
			console.log('Computed chart');
			console.log(this)
		}
	};
</script>
