var tokenSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tokens");

var API_TOKEN = ValueByReference(tokenSheet, "API Token");
var TAB_URL = ValueByReference(tokenSheet, "Tab URL");
var TOURNAMENT_SLUG = ValueByReference(tokenSheet, "Tournament Slug");
var MEMBERS_PER_TEAM = ValueByReference(tokenSheet, "Members / Team");
var ADD_SUCCESS = "✅Successfully Added";



