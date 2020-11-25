<template>
  <div class="line"></div>
  <div class="btnclick">
    <div class="">
      <button v-on:click="update">2017</button>
      <button v-on:click="update2">2018</button>
    </div>
    <img src="../assets/logo.svg" />
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
  methods: {
    async fetchdata() {
      let data = await getData();
      this.chartData = data[72];
    },
    update: async function() {
      let data = await getData();
      this.chartData = data[70];
    },
    update2: async function() {
      let data = await getData();
      this.chartData = data[72];
    }
  }
};
</script>

<style>
.btnclick {
  display: flex;
  align-items: center;
}
.btnclick > div {
  padding-left: 15em;
  padding-bottom: 2em;
}

.line {
  background-color: black;
  position: fixed;
  border: black dotted 1px;
  height: 70em;
  width: 0, 5em;
  margin-left: 10em;
  margin-top: -10em;
}

img {
  position: fixed;
  margin: 30em 20em 0em 40em;
  height: 70em;
  width: 50em;
  z-index: -2;
  opacity: 0.2;
}

button:hover {
  background-color: grey;
  color: white;
  border: none;
}

button:active {
  background-color: lightgrey;
  color: black;
}

button {
  margin: 25px 5px 50px 20px;
  background-color: black;
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}
</style>
