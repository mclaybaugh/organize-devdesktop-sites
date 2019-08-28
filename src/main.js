let fs = require('fs').promises;
let xml2js = require('xml2js');

let parser = new xml2js.Parser();
let builder = new xml2js.Builder();
fs.readFile('/Applications/DevDesktop/Acquia Dev Desktop.app/Contents/MacOS/datamodel.xml')
  .then((data) => {
    parser.parseString(data, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      let envList = result.root.datamodel[0].codebases[0].codebases[0].item;
      for (let env of envList) {
        let sites = env.sites[0].item;
        quicksort(sites, 0, sites.length - 1);
      }
      let xml = builder.buildObject(result);
      fs.writeFile('datamodel.xml', xml)
        .then(() => {
          console.log(`XML written to datamodel.xml
Review content and place in /Applications/DevDesktop/Acquia Dev Desktop.app/Contents/MacOS/datamodel.xml`);
        }).catch((reason) => {
          console.log(reason);
        })
    });
  }).catch((reason) => {
    console.log(reason);
  });

function swap(items, i, j) {
  let temp = items[i];
  items[i] = items[j];
  items[j] = temp
}
function partition(items, i, j) {
  var pivot   = items[Math.floor((j + i) / 2)]; //middle element
  while (i <= j) {
      while (items[i].name[0].localeCompare(pivot.name) < 0) {
          i++;
      }
      while (items[j].name[0].localeCompare(pivot.name) > 0) {
          j--;
      }
      if (i <= j) {
          swap(items, i, j); //sawpping two elements
          i++;
          j--;
      }
  }
  return i;
}
function quicksort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quicksort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quicksort(items, index, right);
        }
    }
    return items;
}