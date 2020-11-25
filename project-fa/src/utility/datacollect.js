import { filterenhelearray, count, sortByYear } from "./transformer.js";

export default function() {
  //ophalen data van alle autos met hun kleur
  const kentekenautos =
    "https://opendata.rdw.nl/resource/m9d7-ebf2.json?$limit=10000";

  getData().then(resultaat => {
    const jaardata = count(resultaat);
    const sortedData = jaardata.sort(sortByYear);
    return sortedData;
  });

  async function getData() {
    const data = await dataophalen(kentekenautos);
    const filtered = filterenhelearray(data);
    const combinedData = filtered.map(item => {
      return {
        year: item.datum_eerste_toelating.substring(0, 4),
        color: item.eerste_kleur
      };
    });
    return combinedData;
  }
  // de data ophalen en wachten op een antwoord voordat die verder gaat, vervolgens de data omzetten naar een json
  async function dataophalen(url) {
    const antwoord = await fetch(url);
    const data = await antwoord.json(url);
    return data;
  }
}
