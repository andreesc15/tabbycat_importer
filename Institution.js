function ImportInstitution() {

  var institutionSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Institutions");
  var statusColumn = cellByReference(institutionSheet, "status");
  var institutions = institutionSheet.getRange("A2:E" + institutionSheet.getLastRow()).getValues();
  
  for (var institution of Object.entries(institutions))
  {    
    var parameters = {
        'method'      : 'post',
        'contentType' : 'application/json',
        'headers'     : {'Authorization':'Token '+API_TOKEN},
        'payload'     : JSON.stringify(
          {
            'name'  : properCase(institution[1][cellByReference(institutionSheet, "name")]),
            'code'  : institution[1][cellByReference(institutionSheet, "code")],
            'region': institution[1][cellByReference(institutionSheet, "region")]

          })//--end JSON.stringify
        }; //--end parameters variable declaration

      var row = Number(institution[0])+2; //start row

      if (institution[1][statusColumn] != ADD_SUCCESS && institution[1][0]!="") {
        
        try {
          var postInstitition = JSON.parse(UrlFetchApp.fetch(`${TAB_URL}/api/v1/institutions`, parameters));

          Logger.log(`Success adding ${postInstitition.code} with id: ${postInstitition.id}`);
          institutionSheet.getRange("D"+row+":E"+row).setValues([[postInstitition.id, ADD_SUCCESS]]);       
        }

        catch (err) {
          institutionSheet.getRange(columnToLetter(statusColumn)+row).setValue(err);
          Logger.log(err);
        }
      } //-- end if

  } //-- end for var institution loop
} //-- end function

/* 
INSTITTUTION API SCHEMA

#Post
{
  "name": "string",
  "code": "string",
  "region": "string"
}

#Response
{
  "id": 0,
  "url": "string",
  "name": "string",
  "code": "string",
  "region": "string"
}

*/ 
