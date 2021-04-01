function ImportVenues() {
  var IMPORT_VENUES_QUERY = "%s/api/v1/tournaments/%s/venues";
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var statusColumn = ss.getLastColumn();
  var teams = ss.getSheetByName("Venues").getRange("A2:D" + ss.getLastRow()).getValues();
}

/*
VENUE API SCHEMA
#Post
{
  "categories": [
    "string"
  ],
  "name": "string",
  "priority": 0,
  "external_url": "string"
}

#Response
{
  "url": "string",
  "id": 0,
  "categories": [
    "string"
  ],
  "display_name": "string",
  "_links": {
    "checkin": "string"
  },
  "name": "string",
  "priority": 0,
  "external_url": "string"
}
*/