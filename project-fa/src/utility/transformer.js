
//zoeken naar het year in de object van RDW als die true is dan return hij die waarde
function findYearIndex(yearItem, array) {
  return array.findIndex((item) => yearItem.year === item.year);
}

// samen met gijs gemaakt tellen van de jaartallen en kleuren per jaartal
function count(array) {
  // Create a new array called yearlyData
  const yearlyData = [];

  // Loop through all our items in our json fetch, they all have their own individual year & color value
  // We need to assign them to the right year by finding their index's
  array.forEach((item) => {
    //destructuring const voor overzichtlijkheid.
    const { color, year } = item;

    // Find index of this year, if it's -1 make a new object.
    const yearIndex = findYearIndex(item, yearlyData);

    // If the year is not indexed yet, create a new object inside the year array.
    if (yearIndex < 0) {
      yearlyData.push({
        year: item.year,
        data: [
          {
            color: item.color,
            value: 1,
          },
        ],
      });
    } else {
      // Add this item's data to the corrosponding year
      // Get the index of the color data
      // Check if the color exists, if yes add up one to the value or otherwise create new object with value 1
      const colorData = yearlyData[yearIndex].data;
      const colorIndexInYear = colorData.findIndex(
        (color) => color.color === item.color
      );

      if (colorIndexInYear < 0) {
        colorData.push({
          color: item.color,
          value: 1,
        });
      } else {
        colorData[colorIndexInYear].value++;
      }
    }
  });

  return yearlyData;
}

//hele dataset filteren en in een array zetten
function filterenhelearray(data) {
  return data.map((uitkomst) => uitkomst);
}

//sorteren op jaar, door de strings naar numbers te veranderen || samen met gijs gemaakt.
function sortByYear(a, b) {
  const yearA = Number(a.year);
  const yearB = Number(b.year);

  if (yearA < yearB) return -1;
  if (yearA > yearB) return 1;
  return 0;
}
