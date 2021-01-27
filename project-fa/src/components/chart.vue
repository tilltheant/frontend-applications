<template>
  <div id="chart-wrapper">
    <svg id="d3-chart"></svg>
  </div>
</template>

<!-- bron: Code les van Robert met mijn eigen tweaks-->
<script>
import * as d3 from "d3";

// Vue exporteren
export default {
  name: "Chart",
  props: ["chartData"],
  data() {
    //de meegegeven variabele moeten een object, functie of nummer zijn zodat er minder snel een
    //fout kan komen tijdens de data transfer
    return {
      svgElement: Object,
      x: Function,
      y: Function,
      width: Number,
      height: Number
    };
  },
  //de visualisatie maken met gekregen data
  mounted() {
    let data = this.chartData.data;
    console.log("Chart is klaargezet");
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
  //updaten van de data 
  updated() {
    console.log("Updated chart");
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
  }
};
</script>

<style media="screen">
rect {
  fill: black;
}
</style>
