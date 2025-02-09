"use client";

export function convertJsonPattern(json: any) {
  console.log(JSON.stringify(json, null, 2));
  let pattern = [];
  let log = "[";
  for (let card = 0; card < json.length; card++) {
    let newCard = [];
    log += "\n [";
    for (let row = 0; row < json[card].length; row++) {
      let newRow = [];
      log += "\n  [";
      for (let cell = 0; cell < json[card][row].rowSquares; cell++) {
        console.log(json[card][row].rowSquares[cell].value);
        if (json[card][row].rowSquares[cell].value === true) {
          newRow.push(1);
          log += "a, ";
        } else {
          newRow.push(0);
          log += "b, ";
        }
      }
      newCard.push(newRow);
      log += "]";
    }
    pattern.push(newCard);
    log += "\n ]";
  }
  log += "\n]";
  console.log(log);
  return pattern;
}
