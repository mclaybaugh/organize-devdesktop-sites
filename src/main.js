let fs = require('fs').promises;
let xml2js = require('xml2js');

let parser = new xml2js.Parser();
fs.readFile('/Applications/DevDesktop/Acquia Dev Desktop.app/Contents/MacOS/datamodel.xml')
  .then((data) => {
    parser.parseString(data, (err, result) => {
      console.log('Error: ')
      console.log(err);
      console.log('Result: ')
      console.dir(result);
    });
  }).catch((reason) => {
    console.log(reason);
  });