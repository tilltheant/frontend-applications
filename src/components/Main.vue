<template>
  <div class="line2"></div>
  <div class="btnclick">
    <div class="">
      <button v-on:click="update">2017</button>
      <button v-on:click="update2">2018</button>
      <button v-on:click="update3">2019</button>
    </div>
    <img class="worldpic" src="../assets/logo.svg" />
  </div>

  <Chart v-if="chartData" :chartData="chartData" />
</template>

<script>
import getData from "../utility/datacollect.js";
import Chart from "./Chart.vue";
// Vue export
export default {
  name: "Main",
  components: {
    Chart
  },
  props: ["data"],
  data() {
    return {
      chartData: null
    };
  },
  mounted() {
    console.log("Mounted main");
    this.fetchdata();
  },
  //functies die worden gebruikt om de data opte halen of om het aan te passen in de D3 vis
  methods: {
    async fetchdata() {
      let data = await getData();
      this.chartData = data[72];
    },
    update: async function() {
      let data = await getData();
      this.chartData = data[70];
      console.log(this.chartData);
    },
    update2: async function() {
      let data = await getData();
      this.chartData = data[74];
    },
    update3: async function() {
      let data = await getData();
      this.chartData = data[75];
    }
  }
};
</script>
