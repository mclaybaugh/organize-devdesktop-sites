# Organize Dev Desktop

Uses node and xml2js to alphabetize items in an XML file (specific to Dev Desktop's datamodel.xml).

## Instructions

This script should work on Macs using node >=11.14.0

To run:

```bash
npm install
# Generate alphabatized file
npm run main
# Backup old file to datamodel.xml.old, replace with new one
./overwrite-datamodel.sh
```
