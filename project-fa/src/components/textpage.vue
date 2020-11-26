<template>
  <div class="line"></div>
  <div class="box">
    <h1>De auto in de stad.</h1>
    <p>
      Wanneer je in de stad loopt zoals Amsterdam, kan je er niet om heen! Nee,
      ik bedoel niet al die fietsen. Juist, ja al die auto's. In Nederland zijn
      er in 2016 bijna 7,2 miljoen personenauto's van particulieren. Dat is
      gemiddeld 0,9 personenauto per huishouden. 9 van de 10 huishoudens heeft
      dus een personenauto dat zijn er veel!
    </p>
    <p></p>
    <div class="imgboxcars">
      <img class="cars" src="../assets/carsp2.svg" />
      <p>9 op de 10 huishoudens heeft een personenauto</p>
    </div>
    <p>
      <strong>De kleur is net zo belangrijk.</strong>
      <br />
      als je naar een auto kijk is vaak het eerste wat je ziet de kleur, dat is
      natuurlijk niet de enigste wat je ziet maar wel een belangrijk puntje.
      Welke auto kleuren zijn het populairst in nederland? Met de visualisatie
      hier beneden kan je bekijken welke dat zijn van de jaren 2017,2018 en 2019
    </p>
  </div>
</template>

<style media="screen">
h1 {
  color: black;
  font-size: 10vw;
}

.box {
  margin-left: 15%;
  text-align: left;
  padding-right: 20%;
  padding-bottom: 5%;
}

.cars {
  display: block;
  margin: auto;
}

img {
  fill: red;
}

.imgboxcars {
  padding-right: 20%;
  padding-bottom: 4%;
  padding-top: 2%;
}

.imgboxcars > p {
  text-align: center;
  font-size: 16px;
}

.line {
  background-color: black;
  float: left;
  position: absolute;
  height: 80vw;
  width: 0.2em;
  margin-left: 10%;
  margin-top: 0;
}

.btnclick {
  display: flex;
  align-items: center;
}
.btnclick > div {
  padding-left: 15%;
  padding-bottom: 2%;
}

.worldpic {
  position: absolute;
  margin: 20em 0em 0em 40em;
  height: 70em;
  width: 50em;
  z-index: -2;
  opacity: 0.2;
  padding: 0;
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

.line2 {
  background-color: black;
  float: left;
  position: absolute;
  height: 70%;
  width: 0.2em;
  margin-left: 10%;
  padding: 0;
}
</style>
