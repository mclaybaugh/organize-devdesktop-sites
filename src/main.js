let fs = require('fs').promises;
let xml2js = require('xml2js');

let parser = new xml2js.Parser();
let builder = new xml2js.Builder();
const datamodelPath = '/Applications/DevDesktop/Acquia Dev Desktop.app/Contents/MacOS/datamodel.xml';

fs.readFile(datamodelPath)
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
Review content and place in ` + datamodelPath);
        })
        .catch((reason) => {
          console.log(reason);
        });
    });
  })
  .catch((reason) => {
    console.log(reason);
  });

function swap(items, i, j) {
  let temp = items[i];
  items[i] = items[j];
  items[j] = temp;
}
function partition(items, i, j) {
  let pivot   = items[Math.floor((j + i) / 2)];
  while (i <= j) {
    while (items[i].name[0].localeCompare(pivot.name) < 0) {
      i++;
    }
    while (items[j].name[0].localeCompare(pivot.name) > 0) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}
function quicksort(items, left, right) {
  let index;
  if (items.length > 1) {
    index = partition(items, left, right);
    if (left < index - 1) {
      quicksort(items, left, index - 1);
    }
    if (index < right) {
      quicksort(items, index, right);
    }
  }
  return items;
}