function ImportTeams() {
  var teamSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Teams");
  var speakerSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Speakers");

  var test = teamSheet.getLastRow();
  Logger.log(test);

  var statusColumn = cellByReference(teamSheet, "status");
  var teams = teamSheet.getRange("A2:" + columnToLetter(teamSheet.getLastColumn()) + teamSheet.getLastRow()).getValues();
  Logger.log(teams);
/*
  var TEAM_URL_ID = "%s/api/v1/institutions/%s"

  for (var team of Object.entries(teams))
  {    
    var teamParameters = {
    //"muteHttpExceptions" : true,
    'method'      : 'post',
    'contentType' : 'application/json',
    'headers'     : {'Authorization':'Token '+API_TOKEN},
    'payload'     : JSON.stringify(
      {
        "reference"       : "A",
        "short_reference" : "",
        "code_name"       : team[1][2],
        "emoji"           : "",
        "institution"     : `${TAB_URL}/api/v1/institutions/${team[1][11]}`,
        "speakers"        : [
              {
                "name"        : team[1][3],
                "email"       : team[1][4],
                "phone"       : team[1][5],
                "anonymous"   : false,
                "pronoun"     : "",
                "categories"  : [],
                "url_key"     : team[1][6]
              },
              {
                "name"        : team[1][7],
                "email"       : team[1][8],
                "phone"       : team[1][9],
                "anonymous"   : false,
                "pronoun"     : "",
                "categories"  : [],
                "url_key"     : team[1][10]
              }
                            ],
      
      "use_institution_prefix"  : true,
      "break_categories"        : [],
      "institution_conflicts"   : [`${TAB_URL}/api/v1/institutions/${team[1][11]}`]
      })//--end JSON.stringify
     }; //--end options variable declaration

      var row = Number(team[0])+2;

      if (team[1][statusColumn-1] != ADD_SUCCESS && team[1][0] != "") {
        
        try {
        var postTeam = 
        JSON.parse(UrlFetchApp.fetch(`${TAB_URL}/api/v1/tournaments/${TOURNAMENT_SLUG}/teams`, teamParameters));
        
        Logger.log(postTeam);
        Logger.log(`Success adding ${postTeam.reference} with id: ${postTeam.id}`);
        
        //------------------add success status and all nec ids
        teamSheet.getRange(columnToLetter(statusColumn)+row).setValue(ADD_SUCCESS);
        teamSheet.getRange("M"+row+":O"+row).setValues([
          [
            postTeam.id,
            postTeam.speakers[0].id,
            postTeam.speakers[1].id
          ]]);


        //----------------LOG ALL SPEAKERS TO SEPARATE SHEET FOR MAIL BLASTING PURPOSE
        speakerSheet.getRange("A"+(row*2-2)+":F"+(row*2-1)).setValues([
          [
            postTeam.speakers[0].id,
            postTeam.speakers[0].url,
            postTeam.speakers[0].name,
            postTeam.speakers[0].email,
            postTeam.speakers[0].phone,
            postTeam.speakers[0].url_key,
          ],
          [
            postTeam.speakers[1].id,
            postTeam.speakers[1].url,
            postTeam.speakers[1].name,
            postTeam.speakers[1].email,
            postTeam.speakers[1].phone,
            postTeam.speakers[1].url_key,
          ]]); //-----------------------------------------end logging

        }//--end try

        catch (err) {
        teamSheet.getRange(columnToLetter(statusColumn)+row).setValue(err);
        Logger.log(err);
        }
      } //-- end if

  } //-- end for var institution loop
*/
} //-- end function

/* 
TEAMS API SCHEMA
#Post
{
  "reference": "string",
  "short_reference": "string",
  "code_name": "string",
  "emoji": "string",
  "institution": "string",
  "speakers": [
    {
      "name": "string",
      "email": "user@example.com",
      "phone": "string",
      "anonymous": true,
      "pronoun": "string",
      "categories": [
        "string"
      ],
      "url_key": "string"
    }
  ],
  "use_institution_prefix": true,
  "break_categories": [
    "string"
  ],
  "institution_conflicts": [
    "string"
  ]
}

#Response
{
  "url": "string",
  "id": 0,
  "reference": "string",
  "short_reference": "string",
  "code_name": "string",
  "emoji": "string",
  "short_name": "string",
  "long_name": "string",
  "institution": "string",
  "speakers": [
    {
      "id": 0,
      "url": "string",
      "name": "string",
      "email": "user@example.com",
      "phone": "string",
      "anonymous": true,
      "pronoun": "string",
      "categories": [
        "string"
      ],
      "url_key": "string",
      "_links": {
        "checkin": "string"
      }
    }
  ],
  "use_institution_prefix": true,
  "break_categories": [
    "string"
  ],
  "institution_conflicts": [
    "string"
  ]
}
*/