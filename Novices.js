function patchSpeakerEligibility(){
  
  var speakerSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Speakers");
  var statusColumn = speakerSheet.getLastColumn();
  var speakers = speakerSheet.getRange("A2:G" + speakerSheet.getLastRow()).getValues();

  var speakerEligibility = "";

  var SPEAKER_ELIGIBILITY_QUERY = updateSpeakerCategory("novice") + "/eligibility";
  //Logger.log(SPEAKER_ELIGIBILITY_QUERY);

  Logger.log(speakers);
  var noviceSpeaker = [];
  for (speaker of speakers)if(speaker[6] == "Novice") noviceSpeaker.push(speaker[1]);
  
  Logger.log(noviceSpeaker);

  var options = {
          'url'         : SPEAKER_ELIGIBILITY_QUERY,
          //'muteHttpExceptions' : true,
          'method'      : 'patch',
          'contentType' : 'application/json',
          'headers'     : {'Authorization':'Token '+API_TOKEN},
          'payload'     : JSON.stringify(
              {
                'speaker_set'  : noviceSpeaker
              })//--end JSON.stringify
          }; //--end options variable declaration
  
  try {
          speakerEligibility = JSON.parse(UrlFetchApp.fetchAll([options]));
          Logger.log(speakerEligibility);
        }

  catch (err) {
          Logger.log(err);
        }
  
  for (speaker of Object.entries(speakers)){
    var row = Number(speaker[0])+2;

    if(!(noviceSpeaker.includes(speaker[1][1])) && speakerEligibility.speaker_set.includes(speaker[1][1])) {
      speakerSheet.getRange(columnToLetter(statusColumn)+row).setValue("🚧 was added as Novice @tab. Do recheck");
    }  
    else if (noviceSpeaker.includes(speaker[1][1]) && !speakerEligibility.speaker_set.includes(speaker[1][1])) {
      speakerSheet.getRange(columnToLetter(statusColumn)+row).setValue("🚧 was not added as Novice @tab. Do recheck");
    }
    else if (noviceSpeaker.includes(speaker[1][1]) && speakerEligibility.speaker_set.includes(speaker[1][1])) {
      speakerSheet.getRange(columnToLetter(statusColumn)+row).setValue(ADD_SUCCESS);
    }
  } //--end for loop for making logs

}

function updateSpeakerCategory(category) {
  var CREATE_SPEAKER_CATEGORY_QUERY = "%s/api/v1/tournaments/%s/speaker-categories";
  var currSpeakerCategory = fetchInfos("speaker_category");
  var SPEAKER_CATEGORY_URL = ""; //https://testrun2021.herokuapp.com/api/v1/tournaments/trial2021/speaker-categories/3

//------------- check if a novice category if created already
  if(currSpeakerCategory.length == 0){
        Logger.log("No category found -- creating one now!");

        var options = {
          'url'         : Utilities.formatString(CREATE_SPEAKER_CATEGORY_QUERY,TAB_URL,TOURNAMENT_SLUG),
          'muteHttpExceptions' : true,
          'method'      : 'post',
          'contentType' : 'application/json',
          'headers'     : {'Authorization':'Token '+API_TOKEN},
          'payload'     : JSON.stringify(
              {
                'name'  : properCase(category),
                'slug'  : category,
                'seq'   : 0,
                'limit' : 0,
                'public': true
                })//--end JSON.stringify
          }; //--end options variable declaration
    
    try {
          currSpeakerCategory = JSON.parse(UrlFetchApp.fetchAll([options]));
          SPEAKER_CATEGORY_URL = currSpeakerCategory.url;
          Logger.log(currSpeakerCategory);
          Logger.log(`Success creating Novice Category with URL ${SPEAKER_CATEGORY_URL}`);
        }
        catch (err) {
          Logger.log(err);
        }
      }//--end if

  else{
    Logger.log("Category created already -- fetching one!");
    SPEAKER_CATEGORY_URL = currSpeakerCategory[0].url;
    Logger.log(currSpeakerCategory[0]);
    Logger.log(`Novice Category with URL ${SPEAKER_CATEGORY_URL} already created.`);
  }
return SPEAKER_CATEGORY_URL;
};

  // if it has, update all speakers in "Speakers" with "Novice" as novice


/*
POST Speaker Category
/v1/tournaments/{tournament_slug}/speaker-categories
{
  "name": "string",
  "slug": "string",
  "seq": 0,
  "limit": 0,
  "public": true
}

RESPONSE
{
  "name": "string",
  "slug": "string",
  "seq": 0,
  "limit": 0,
  "public": true,
  "url": "string",
  "_links": {
    "eligibility": "string"
  }
}

PUT /v1/tournaments/{tournament_slug}/speaker-categories/{id}/eligibility
{
  "speaker_set": [
    "string"
  ]
}

RESPONSE
{
  "slug": "string",
  "speaker_set": [
    "string"
  ]
}

PATCH /v1/tournaments/{tournament_slug}/speaker-categories/{id}/eligibility
{
  "speaker_set": [
    "string"
  ]
}

RESPONSE
{
  "slug": "string",
  "speaker_set": [
    "string"
  ]
}
*/