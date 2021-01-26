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
  <h2>{{ currentYear }}</h2>
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
      RDWdata: null
    };
  },
  // lifecycle hook waarmee ik de data voordat de DOM is aangemaakt kan ophalen en plaatsen in een variabele
  created() {
    this.fetchdata();
    console.log("data is ingeladen");
  },
  computed: {
    // Watcher die kijkt naar veranderingen in de data, hij returned het juiste jaar die gelijk staat aan currentYear
    chartData: function() {
      if ( !this.RDWdata || !this.currentYear ) {
        return null;
      }
      return this.RDWdata.find(item => item.year === this.currentYear);
    }
  },
  // functies die worden gebruikt om de data opte halen of om het aan te passen in de D3 vis
  methods: {
    //Data async ophale en jaartal klaarzetten voor eerste visualisatie
    async fetchdata() {
      this.RDWdata = await getData();
      this.currentYear = "2018";
    },
    //veranderen van het jaartal met een button die het jaar meegeeft
    updateYear: function(year) {
      this.currentYear = year;
    }
  }
};
</script>
