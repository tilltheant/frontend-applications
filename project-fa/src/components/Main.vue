<template>
  <div class="line2"></div>
  <div class="btnclick">
    <div class="">
      <button v-on:click="updateYear('2017')">2017</button>
      <button v-on:click="updateYear('2018')">2018</button>
      <button v-on:click="updateYear('2019')">2019</button>
    </div>
    <img class="worldpic" src="../assets/logo.svg" />
  </div>

  <Chart v-if="chartData" :chartData="chartData" />
  <h2> {{currentYear}}</h2>
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
      currentYear: null,
      RDWdata: null,
    };
  },
  created() {
    this.fetchdata();
    console.log("data is ingeladen");
  },
  computed: {
    chartData: function () {
      if(!this.RDWdata || !this.currentYear ) {
        return null;
      }
      
      return this.RDWdata.find(item => item.year === this.currentYear);
    }
  },
  // functies die worden gebruikt om de data opte halen of om het aan te passen in de D3 vis
  methods: {
    async fetchdata() {
      this.RDWdata = await getData();
      this.currentYear = "2018";
    },
    updateYear: function(year) {
      this.currentYear = year;
    }
  }
};
</script>
