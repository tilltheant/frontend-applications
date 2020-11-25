<template>
  <button v-on:click="update(chartData[72])">Click me!</button>
  <br />
  <Chart v-if="chartData" :chartData="chartData" />
</template>

<script>
import getData from "../utility/datacollect.js";
import Chart from "./Chart.vue";
// Vue export logic
export default {
  name: "Main",
  components: {
    Chart
  },
  props: ["data"],
  data() {
    return {
      chartData: []
    };
  },
  mounted() {
    console.log("Mounted main");
    this.fetchdata();
  },
  methods: {
    async fetchdata() {
      let data = await getData();
      console.log(data);
      this.chartData = data;
    }
  }
};
</script>
