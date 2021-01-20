import { count, sortByYear } from "./transformer.js";

export default function() {
  //ophalen data van alle autos met hun kleur
  const kentekenautos =
  "https://opendata.rdw.nl/resource/m9d7-ebf2.json?" +
  "$select=datum_eerste_toelating%2Ceerste_kleur" +
  "&$order=`eerste_kleur`+ASC"+
  "&$where=%28%28%60datum_eerste_toelating%60%20%3E%20%2720170131%27%20AND%20%60datum_eerste_toelating%60%20%3C%20%2720191231%27%29%20AND%20%60datum_eerste_toelating%60%20IS%20NOT%20NULL%29" +
  "AND%20%28%28%60eerste_kleur%60%20%21%3D%20%27N.v.t.%27%20AND%20%60eerste_kleur%60%20%21%3D%20%27Niet%20geregistreerd%27%20AND%20%60eerste_kleur%60%20%21%3D%20%27BEIGE%27%20AND%20%60eerste_kleur%60%20%21%3D%20%27DIVERSEN%27%20%29%20OR%20%60eerste_kleur%60%20IS%20NULL%20%29%20" +
  "AND%20(%60merk%60%20%3D%20%27VOLKSWAGEN%27%20OR%20%60merk%60%20%3D%20%27OPEL%27%20OR%20%60merk%60%20%3D%20%27RENAULT%27%20OR%20%60merk%60%20%3D%20%27PEUGEOT%27%20OR%20%60merk%60%20%3D%20%27TOYOTA%27)" +
  "&$limit=100000";


  return getData().then(resultaat => {
    const jaardata = count(resultaat);
    const sortedData = jaardata.sort(sortByYear);
    return sortedData; 
  });

  async function getData() {
    const data = await dataophalen(kentekenautos);
    const combinedData = data.map(item => {
      return {
        year: item.datum_eerste_toelating.substring(0, 4),
        color: item.eerste_kleur
      };
    });
    return combinedData;
  }


  /**
   * De data ophalen en wachten op een antwoord voordat die verder gaat, vervolgens de data omzetten naar een json
   * @param {string} url 
   * @return {object}
   */
  async function dataophalen(url) {
    const antwoord = await fetch(url);
    const data = antwoord.json(url);
    return data;
  }
}
