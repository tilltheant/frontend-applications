<template>
  <div id="chart-wrapper">
    <svg id="d3-chart"></svg>
  </div>
</template>

<!-- bron: Code les van Robert -->
<script>
import * as d3 from "d3";
// Vue export logic
export default {
  name: "Chart",
  props: ["chartData"],
  data() {
    return {
      svgElement: Object,
      x: Function,
      y: Function,
      width: Number,
      height: Number
    };
  },
  mounted() {
    let data = this.chartData.data;
    console.log(this.chartData.data);
    this.svgElement = d3.select("#d3-chart");
    // set the dimensions and margins of the graph
    const margin = {
        top: 60,
        right: 20,
        bottom: 70,
        left: 40
      },
      width = 900 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    // set the ranges
    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3
      .select("#d3-chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data in the domains
    x.domain(
      data.map(function(d) {
        return d.color;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.value;
      })
    ]);
    // append the rectangles for the bar chart
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return x(d.color);
      })
      .attr("width", x.bandwidth())
      .attr("y", function(d) {
        return y(d.value);
      })
      .attr("height", function(d) {
        return height - y(d.value);
      });
    // add the x Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    // add the y Axis
    svg.append("g").call(d3.axisLeft(y));
    this.svgElement = svg;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    svg
      .append("text")
      .attr("x", 10)
      .attr("y", -40)
      .attr("text-anchor", "left")
      .style("font-size", "20px")
      .style("text-decoration", "none")
      .style("font-family", " Arial")
      .style("font-weight", "600")
      .text("Meest verkochte auto's per kleur in Nederland");
  },
  updated() {
    console.log("Updated chart");
    console.log(this.chartData);
    console.log(this.svgElement);
    // Create the u variable
    let u = this.svgElement.selectAll("rect").data(this.chartData.data);
    u.enter()
      .append("rect") // Add a new rect for each new elements
      .merge(u) // get the already existing elements as well
      .transition() // and apply changes to all of them
      .duration(1000)
      .attr("x", d => {
        return this.x(d.color);
      })
      .attr("y", d => {
        return this.y(d.value);
      })
      .attr("width", this.x.bandwidth())
      .attr("height", d => {
        return this.height - this.y(d.value);
      });
    // If less group in the new dataset, I delete the ones not in use anymore
    u.exit().remove();
  },
  computed() {
    console.log("Computed chart");
    console.log(this);
  }
};
</script>

<!-- <template>
  <div id="chart-wrapper">
    <svg id="my_dataviz"></svg>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "Chart",
  props: {
    chartData: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      svgElement: Object,
      xScale: Function,
      yScale: Function,
      xAxis: Function,
      yAxis: Function,
      width: Number,
      height: Number
    };
  },
  methods: {
    update() {
      let data = this.chartData;
      console.log(this.xScale);
      // Update the X axis
      this.xScale.domain(
        data.map(function(d) {
          return d.color;
        })
      );
      this.xAxis.call(d3.axisBottom(this.xScale));
      // Update the Y axis
      this.yScale.domain([
        0,
        d3.max(data, function(d) {
          return d.value;
        })
      ]);
      this.yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(this.yScale));
      // maak nieuwe let
      let change = this.svgElement.selectAll("rect").data(this.chartData);
      //met merge() combineer je de UPDATE en ENTER samen zodat het een geheel is
      change
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(change) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
        .attr("x", function(d) {
          return this.xScale(d.color);
        })
        .attr("y", function(d) {
          return this.yScale(d.value);
        })
        .attr("width", this.xScale.bandwidth())
        .attr("height", function(d) {
          return this.height - this.yScale(d.value);
        })
        .attr("fill", "#69b3a2");
      // If less group in the new dataset, I delete the ones not in use anymore
      change.exit().remove();
    }
  },
  mounted() {
    let data2 = this.chartData;
    console.log(data2);
    this.svgElement = d3.select("#my_dataviz");
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 560 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    let svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // Maken X As
    let xScale = d3
      .scaleBand()
      .range([0, width])
      .padding(0.2);
    let xAxis = svg
      .append("g")
      .attr("transform", "translate(0," + height + ")");
    // maken Y As
    let yScale = d3.scaleLinear().range([height, 0]);
    let yAxis = svg.append("g").attr("class", "myYaxis");
    this.svgElement = svg;
    this.xScale = xScale;
    this.yScale = yScale;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.width = width;
    this.height = height;
    // functie maken die de data update op basis van de gegeven data
    //
    this.update(data2);
    console.log(data2);
  }
};
</script> -->
