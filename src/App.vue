<template>
  <textpage />
  <Main />
</template>

<script>
//bij elkaar plakken van de D3 en de text pagina
import Main from "./components/Main.vue";
import textpage from "./components/textpage.vue";
export default {
  name: "App",
  components: {
    Main,
    textpage
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
