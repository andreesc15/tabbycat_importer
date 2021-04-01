//get Value by a rowReference (string, usually row Name) and colReference (string, Column Name)
function ValueByReference(sheet, rowReference, colReference = "Value") 
{
    //Logger.log(reference);
    //Logger.log(tokenSheet.createTextFinder(reference).findNext().getRow());
    var row = sheet.createTextFinder(rowReference).findNext().getRow();
    var col = sheet.createTextFinder(colReference).findNext().getColumn();
    Logger.log(`getting ${rowReference} at row ${row} and column ${col}`);
    return sheet.getRange(row, col).getValue();
}

//get cell / index by a keyword search, using header as keyword
function cellByReference(sheet, rowReference, type = "index"){
  var row = sheet.createTextFinder(rowReference).findNext().getColumn();

  switch(type)
  {
    case "index": return row-1;
    case "column": return columnToLetter(row);
  }


}

//fetch infos by request
function fetchInfos(request){
  var Request_URL = {
      'institution'       : `${TAB_URL}/api/v1/institutions`,
      'break_category'    : `${TAB_URL}/api/v1/tournaments/${TOURNAMENT_SLUG}/break-categories`,
      'speaker_category'  : `${TAB_URL}/api/v1/tournaments/${TOURNAMENT_SLUG}/speaker-categories`,
      'teams'             : `${TAB_URL}/api/v1/tournaments/${TOURNAMENT_SLUG}/teams`,
      'team-standings'    : `${TAB_URL}/api/v1/tournaments/${TOURNAMENT_SLUG}/teams/standings`
  };

  var Parameters = {
    'method'      : 'get',
    'contentType' : 'application/json',
    'headers'     : {'Authorization':'Token '+API_TOKEN},
  };

  var Result = JSON.parse(UrlFetchApp.fetch(Request_URL[request],Parameters));
  
  Logger.log(Result);
  return Result;
}

//turn everything to proper case (capitalised first letter of each word)
function properCase(phrase) {
  var regFirstLetter = /\b(\w)/g;
  var regOtherLetters = /\B(\w)/g;

  function capitalize(firstLetters) {
    return firstLetters.toUpperCase();
  }

  function lowercase(otherLetters) {
    return otherLetters.toLowerCase();
  }
  
  var capitalized = phrase.replace(regFirstLetter, capitalize);
  var proper = capitalized.replace(regOtherLetters, lowercase);

  return proper;
}

//column number to letter
function columnToLetter(column)
{
  var temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

//letter to column number
function letterToColumn(letter)
{
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++)
  {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}

//generate randomized alphanumeric string of length len
function randAlpha(len) {
  var text = "";
 
  //Check if numbers
  if(typeof len !== 'number'){return text = "NaN"};
  
  var charStringRange = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //
  for (var i = 0; i < len; i++)
    text += charStringRange.charAt(Math.floor(Math.random() * charStringRange.length));
    
  return text;
}