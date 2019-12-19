#!/bin/sh

DATAMODEL_PATH="/Applications/DevDesktop/Acquia Dev Desktop.app/Contents/MacOS/datamodel.xml"
NEW_FILE="datamodel.xml"

sudo cp -v "$DATAMODEL_PATH" "datamodel.xml.old"
sudo cp -v "$NEW_FILE" "$DATAMODEL_PATH"
