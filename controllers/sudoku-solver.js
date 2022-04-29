class SudokuSolver {

  validate(puzzle, value, coordinate) {
    let stringRegex =/\.+|\d+/g;
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    if (puzzle.length > 0 && puzzle.length < 81 || 
          puzzle.length > 0 && puzzle.length > 81) {
      return "to long or to short";
    };
    if (puzzle.length > 0 && puzzle.match(stringRegex).join("").length < 81) {
      return "invalid characters"
    };
    if (coordinate === undefined || coordinate === ""
    || value === undefined || value === "" ||
    puzzle === undefined || puzzle === "") {
      return "missing fields"
    };
    if (coordinate.length < 2 || letters.find((x) =>  x === coordinate.slice(0, 1)) === undefined 
        || numbers.find((x) => x === +coordinate.slice(1)) === undefined) {
      return "invalid coordinate"
    };
    if (numbers.find((x) => x === +value) === undefined) {
      return "invalid value"
    };
    return "valid";
  };

  checkRowPlacement(puzzleString, value, coordinate) {
    let row = coordinate.slice(0, 1);
    let column = coordinate.slice(1);
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    // find correct row, index of row letters * 9 finds correct row, slice to and including 9th number of that row
    let rowPuzzleString = puzzleString.slice((letters.indexOf(row)) * 9, ((letters.indexOf(row)) * 9) + 9);
    if (rowPuzzleString.split("").map((x) => x !== "." ? +x : x).includes(+value) && rowPuzzleString.indexOf(+value) !== +column - 1)  {
      return "row conflict";
    }
  };

  checkColPlacement(puzzleString, value, coordinate) {
    let row = coordinate.slice(0, 1);
    let column = coordinate.slice(1);
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let colPuzzleArray = [];
    // find column, iterate through whole puzzle and push every 9th (0 based) number in array;
    for (let i = 0 + (+column - 1); i <= puzzleString.length - 1; i += 9) {
      colPuzzleArray.push(puzzleString[i]);
    }
    if (colPuzzleArray.map((x) => x !== "." ? +x : x).includes(+value) && colPuzzleArray.indexOf(value) !== letters.indexOf(row)) {
      return "column conflict";
    }
  }

  checkRegionPlacement(puzzleString, value, coordinate) {
    let row = coordinate.slice(0, 1);
    let column = coordinate.slice(1);
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let array = []
    if (letters.indexOf(row) + 1 <= 3 && +column <= 3) {
      array.push(puzzleString.slice(0, 3), puzzleString.slice(9, 12), puzzleString.slice(18, 21))
      array = array.join("").split("").filter((x) => x !== ".").map((x) => +x);
      if (array.includes(+value)
          && puzzleString.slice(0, 3).indexOf(value) !== +column - 1
          && puzzleString.slice(9, 12).indexOf(value) !== +column - 1
          && puzzleString.slice(18, 21).indexOf(value) !== +column - 1
        ) {
        return "region conflict"
      }
    }
    if (letters.indexOf(row) + 1 <= 3 && +column > 3 && +column <= 6) {
      array.push(puzzleString.slice(3, 6), puzzleString.slice(12, 15), puzzleString.slice(21, 24))
      array = array.join("").split("").filter((x) => x !== ".").map((x) => +x);
      if (array.includes(+value) 
          && puzzleString.slice(3, 6).indexOf(value) !== +column - 1
          && puzzleString.slice(12, 15).indexOf(value) !== +column - 1
          && puzzleString.slice(21, 24).indexOf(value) !== +column - 1
        ) {
        return "region conflict"
      }
    }
    if (letters.indexOf(row) + 1 <= 3 && +column > 6) {
      array.push(puzzleString.slice(6, 9), puzzleString.slice(15, 18), puzzleString.slice(24, 27))
      array = array.join("").split("").filter((x) => x !== ".").map((x) => +x);
      if (array.includes(+value) 
          && puzzleString.slice(6, 9).indexOf(value) !== +column - 1
          && puzzleString.slice(15, 18).indexOf(value) !== +column - 1
          && puzzleString.slice(24, 27).indexOf(value) !== +column - 1
        ) {
        return "region conflict"
      }
    }
    if (letters.indexOf(row) + 1 > 3 && letters.indexOf(row) + 1 <= 6 && +column <= 3) {
      array.push(puzzleString.slice(27, 30), puzzleString.slice(36, 39), puzzleString.slice(45, 48))
      array = array.join("").split("").filter((x) => x !== ".").map((x) => +x);
      if (array.includes(+value)
          && puzzleString.slice(27, 30).indexOf(value) !== +column - 1
          && puzzleString.slice(36, 39).indexOf(value) !== +column - 1
          && puzzleString.slice(45, 48).indexOf(value) !== +column - 1
        ) {
        return "region conflict"
      }
    }
    if (letters.indexOf(row) + 1 > 3 && letters.indexOf(row) + 1 <= 6 && +column > 3 && +column <= 6) {
      array.push(puzzleString.slice(30, 33), puzzleString.slice(39, 42), puzzleString.slice(48, 51))
      array = array.join("").split("").filter((x) => x !== ".").map((x) => +x);
      if (array.includes(+value) 
          && puzzleString.slice(30, 33).indexOf(value) !== +column - 1
          && puzzleString.slice(39, 42).indexOf(value) !== +column - 1
          && puzzleString.slice(48, 51).indexOf(value) !== +column - 1
        ) {
        return "region conflict"
      }
    }
    if (letters.indexOf(row) + 1 > 3 && letters.indexOf(row) + 1 <= 6 && +column > 6) {
      array.push(puzzleString.slice(33, 36), puzzleString.slice(42, 45), puzzleString.slice(51, 54))
      array = array.join("").split("").filter((x) => x !== ".").map((x) => +x);
      if (array.includes(+value) 
          && puzzleString.slice(33, 36).indexOf(value) !== +column - 1
          && puzzleString.slice(42, 45).indexOf(value) !== +column - 1
          && puzzleString.slice(51, 54).indexOf(value) !== +column - 1
        ) {
        return "region conflict"
      }
    }
    if (letters.indexOf(row) + 1 > 6 && +column <= 3) {
      array.push(puzzleString.slice(54, 57), puzzleString.slice(63, 66), puzzleString.slice(72, 75))
      array = array.join("").split("").filter((x) => x !== ".").map((x) => +x);
      if (array.includes(+value) 
          && puzzleString.slice(54, 57).indexOf(value) !== +column - 1
          && puzzleString.slice(63, 66).indexOf(value) !== +column - 1
          && puzzleString.slice(72, 75).indexOf(value) !== +column - 1
       ) {
        return "region conflict"
      }
    }
    if (letters.indexOf(row) + 1 > 6 && +column > 3 && +column <= 6) {
      array.push(puzzleString.slice(57, 60), puzzleString.slice(66, 69), puzzleString.slice(75, 78))
      array = array.join("").split("").filter((x) => x !== ".").map((x) => +x);
      if (array.includes(+value) 
          && puzzleString.slice(57, 60).indexOf(value) !== +column - 1
          && puzzleString.slice(66, 69).indexOf(value) !== +column - 1
          && puzzleString.slice(75, 78).indexOf(value) !== +column - 1
        ) {
        return "region conflict"
      }
    }
    if (letters.indexOf(row) + 1 > 6 && +column > 6) {
      array.push(puzzleString.slice(60, 63), puzzleString.slice(69, 72), puzzleString.slice(78, 81))
      array = array.join("").split("").filter((x) => x !== ".").map((x) => +x);
      if (array.includes(+value) 
          && puzzleString.slice(60, 63).indexOf(value) !== +column - 1
          && puzzleString.slice(69, 72).indexOf(value) !== +column - 1
          && puzzleString.slice(78, 81).indexOf(value) !== +column - 1
        ) {
        return "region conflict"
      }
    }
  }

  solve(puzzleString) {
    let rowArray = [];
    let colPuzzleArrayOne = [];
    let colPuzzleArrayTwo = [];
    let colPuzzleArrayThree = [];
    let colPuzzleArrayFour = [];
    let colPuzzleArrayFive = [];
    let colPuzzleArraySix = [];
    let colPuzzleArraySeven = [];
    let colPuzzleArrayEight = [];
    let colPuzzleArrayNine = [];
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let stringRegex =/\.+|\d+/g;
    if (puzzleString === undefined || puzzleString === "") {
      return "field missing";
    }
    if (puzzleString.length !== 81) {
      return "to long or to short";
    }
    if (puzzleString.match(stringRegex).join("").length < 81) {
      return "invalid characters"
    }

    // solving soduku

    // find rows
    for (let i = 1; i < 80; i++) {
      let rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
      let rowPuzzleString = puzzleString.slice(letters.indexOf(rowLetter) * 9, letters.indexOf(rowLetter) * 9 + 9);
      let cleanRowPuzzleString = rowPuzzleString.split("").filter((x) => x !== ".");
      if (i % 8 === 0) {
        rowArray.push([rowLetter, cleanRowPuzzleString]);
      };
    };


    // find columns
    for (let r = 0; r < 81; r += 9) {
        colPuzzleArrayOne.push(puzzleString[r]);
    }
    for (let r = 1; r < 81; r += 9) {
      colPuzzleArrayTwo.push(puzzleString[r]);
    }
    for (let r = 2; r < 81; r += 9) {
      colPuzzleArrayThree.push(puzzleString[r]);
    }
    for (let r = 3; r < 81; r += 9) {
      colPuzzleArrayFour.push(puzzleString[r]);
    }
    for (let r = 4; r < 81; r += 9) {
      colPuzzleArrayFive.push(puzzleString[r]);
    }
    for (let r = 5; r < 81; r += 9) {
      colPuzzleArraySix.push(puzzleString[r]);
    }
    for (let r = 6; r < 81; r += 9) {
      colPuzzleArraySeven.push(puzzleString[r]);
    }
    for (let r = 7; r < 81; r += 9) {
      colPuzzleArrayEight.push(puzzleString[r]);
    }
    for (let r = 8; r < 81; r += 9) {
      colPuzzleArrayNine.push(puzzleString[r]);
    }
    let one = colPuzzleArrayOne.filter((x) => x !== ".");
    let two = colPuzzleArrayTwo.filter((x) => x !== ".");
    let three = colPuzzleArrayThree.filter((x) => x !== ".");
    let four = colPuzzleArrayFour.filter((x) => x !== ".");
    let five = colPuzzleArrayFive.filter((x) => x !== ".");
    let six = colPuzzleArraySix.filter((x) => x !== ".");
    let seven = colPuzzleArraySeven.filter((x) => x !== ".");
    let eight = colPuzzleArrayEight.filter((x) => x !== ".");
    let nine = colPuzzleArrayNine.filter((x) => x !== ".");
    let colArray = [["1", one]].concat([["2", two]], [["3", three]], [["4", four]], [["5", five]], [["6", six]], [["7", seven]],
     [["8", eight]], [["9", nine]]);
    let colArrayTwo = [["1", colPuzzleArrayOne]].concat([["2", colPuzzleArrayTwo]], [["3", colPuzzleArrayThree]], [["4", colPuzzleArrayFour]],
      [["5", colPuzzleArrayFive]], [["6", colPuzzleArraySix]], [["7", colPuzzleArraySeven]], [["8", colPuzzleArrayEight]], [["9", colPuzzleArrayNine]]);

    // regions
    let regionArrayAOne = [];
    let regionArrayAFour = [];
    let regionArrayASeven = [];
    let regionArrayDOne = [];
    let regionArrayDFour = [];
    let regionArrayDSeven = [];
    let regionArrayGOne = [];
    let regionArrayGFour = [];
    let regionArrayGSeven = [];
    regionArrayAOne.push(puzzleString.slice(0, 3), puzzleString.slice(9, 12), puzzleString.slice(18, 21));
    regionArrayAFour.push(puzzleString.slice(3, 6), puzzleString.slice(12, 15), puzzleString.slice(21, 24));
    regionArrayASeven.push(puzzleString.slice(6, 9), puzzleString.slice(15, 18), puzzleString.slice(24, 27))
    regionArrayDOne.push(puzzleString.slice(27, 30), puzzleString.slice(36, 39), puzzleString.slice(45, 48));
    regionArrayDFour.push(puzzleString.slice(30, 33), puzzleString.slice(39, 42), puzzleString.slice(48, 51));
    regionArrayDSeven.push(puzzleString.slice(33, 36), puzzleString.slice(42, 45), puzzleString.slice(51, 54));
    regionArrayGOne.push(puzzleString.slice(54, 57), puzzleString.slice(63, 66), puzzleString.slice(72, 75));
    regionArrayGFour.push(puzzleString.slice(57, 60), puzzleString.slice(66, 69), puzzleString.slice(75, 78));
    regionArrayGSeven.push(puzzleString.slice(60, 63), puzzleString.slice(69, 72), puzzleString.slice(78, 81));
    let aOne = regionArrayAOne.join("");
    let aFour = regionArrayAFour.join("");
    let aSeven = regionArrayASeven.join("");
    let dOne = regionArrayDOne.join("");
    let dFour = regionArrayDFour.join("");
    let dSeven = regionArrayDSeven.join("");
    let gOne = regionArrayGOne.join("");
    let gFour = regionArrayGFour.join("");
    let gSeven = regionArrayGSeven.join("");
    let regionArray = [["A1", aOne.split("").filter((x) => x !== ".").join("")]].concat([["A4", aFour.split("").filter((x) => x !== ".").join("")]],
      [["A7", aSeven.split("").filter((x) => x !== ".").join("")]], [["D1", dOne.split("").filter((x) => x !== ".").join("")]],
      [["D4", dFour.split("").filter((x) => x !== ".").join("")]], [["D7", dSeven.split("").filter((x) => x !== ".").join("")]],
      [["G1", gOne.split("").filter((x) => x !== ".").join("")]], [["G4", gFour.split("").filter((x) => x !== ".").join("")]],
      [["G7", gSeven.split("").filter((x) => x !== ".").join("")]]);

    // begin filling in when possible
    let rowRaw = rowArray.map((x) => x.flat());
    let regRaw = regionArray.map((x) => x.join(""));
    let colRaw = colArray.map((x) => x.flat());


    // first:
    // for any coordinate check if empty; 
    // check which numbers are missing in Row of coordinate;
    // check if these numbers are also missing in column of coordinate;
    // check if these numbers are also missing in region coordinate;
    // check if coordinates directly adjecent to it in the row are not empty;
    // check if the these numbers are present in the other rows directly adjecent to coordinate: if yes: fill in the numbers; or
    // check if the rows and columns directly adjecent to coordinate have the numbers: if yes fill in the numbers; or
    // check if one row and both columns have the numbers, and the coordinate of the row which doesnt have the number in the row is not empty;
      // if yes: fill in number; do this also for the columns; if none of these:
    // push any number that is left to an array per region;
    // later if array only has one number fill this number in
    let arrayOne = [];
    let arrayTwo = [];
    let arrayThree = [];
    let arrayFour = [];
    let arrayFive = [];
    let arraySix = [];
    let arraySeven = [];
    let arrayEight = [];
    let arrayNine = [];

    for (let a = 0; a < puzzleString.length; a++) {
      if (puzzleString[a] === "." && a < 3) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[0].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[0].slice(2).split("").map((x) => +x).includes(b)) {
                  if (a === 0 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "." 
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    || a === 0 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    || a === 0 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                      && !rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[9] !== "."
                    || a === 0 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[18] !== "."
                    || a === 0 && !colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[1] !== "."
                    || a === 0 && colRaw[1].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[2] !== "."
                    || a === 0 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[9] !== "." && puzzleString[18] !== "."
                    || a === 0 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                      && puzzleString[2] !== "." && puzzleString[18] !== "." && puzzleString[20] !== "."
                    || a === 0 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[2] !== "." && puzzleString[9] !== "." && puzzleString[11] !== "."
                    || a === 0 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                      && puzzleString[1] !== "." && puzzleString[18] !== "." && puzzleString[19] !== "."
                    || a === 0 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[1] !== "." && puzzleString[9] !== "." && puzzleString[10] !== "."
                    || regRaw[0].slice(2).split("").map((x) => +x).length === 8

                    || a === 1 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    || a === 1 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    || a === 1 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                      && !rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[10] !== "."
                    || a === 1 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[19] !== "."
                    || a === 1 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[0] !== "."
                    || a === 1 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[2] !== "."
                    || a === 1 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[10] !== "." && puzzleString[19] !== "."
                    || a === 1 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                      && puzzleString[2] !== "." && puzzleString[19] !== "." && puzzleString[20] !== "."
                    || a === 1 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[2] !== "." && puzzleString[10] !== "." && puzzleString[11] !== "."
                    || a === 1 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                      && puzzleString[0] !== "." && puzzleString[18] !== "." && puzzleString[19] !== "."
                    || a === 1 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[0] !== "." && puzzleString[9] !== "." && puzzleString[10] !== "."

                    || a === 2 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    || a === 2 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    || a === 2 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                      && !rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[11] !== "."
                    || a === 2 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[20] !== "."
                    || a === 2 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[0] !== "."
                    || a === 2 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[1].slice(1).map((x) => +x).includes(b)
                      && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[1] !== "."
                    || a === 2 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                      && puzzleString[11] !== "." && puzzleString[20] !== "."
                    || a === 2 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                      && puzzleString[1] !== "." && puzzleString[20] !== "." & puzzleString[19] !== "."
                    || a === 2 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[1] !== "." && puzzleString[10] !== "." & puzzleString[11] !== "."
                    || a === 2 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                      && puzzleString[0] !== "." && puzzleString[18] !== "." & puzzleString[20] !== "."
                    || a === 2 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                      && puzzleString[0] !== "." && puzzleString[9] !== "." & puzzleString[11] !== ".") {
                    puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                    return this.solve(puzzleString);
                  }
                arrayOne.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 8 && a < 12) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[1].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 9].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[0].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 9 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 9 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 9 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[0] !== "."
                  || a === 9 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[18] !== "."
                  || a === 9 && !colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[10] !== "."
                  || a === 9 && colRaw[1].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[11] !== "."
                  || a === 9 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[0] !== "." && puzzleString[18] !== "."
                  || a === 9 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[11] !== "." && puzzleString[18] !== "." && puzzleString[20] !== "."
                  || a === 9 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[0] !== "." && puzzleString[2] !== "." && puzzleString[11] !== "."
                  || a === 9 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[10] !== "." && puzzleString[18] !== "." && puzzleString[19] !== "."
                  || a === 9 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[0] !== "." && puzzleString[1] !== "." && puzzleString[9] !== "."
                  || regRaw[0].slice(2).split("").map((x) => +x).length === 8


                  || a === 10 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 10 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 10 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[1] !== "."
                  || a === 10 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[19] !== "."
                  || a === 10 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[9] !== "."
                  || a === 10 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[11] !== "."
                  || a === 10 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[1] !== "." && puzzleString[19] !== "."
                  || a === 10 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[11] !== "." && puzzleString[19] !== "." && puzzleString[20] !== "."
                  || a === 10 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[1] !== "." && puzzleString[2] !== "." && puzzleString[11] !== "."
                  || a === 10 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[9] !== "." && puzzleString[18] !== "." && puzzleString[19] !== "."
                  || a === 10 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[0] !== "." && puzzleString[1] !== "." && puzzleString[9] !== "."


                  || a === 11 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 11 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 11 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[2] !== "."
                  || a === 11 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[20] !== "."
                  || a === 11 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[9] !== "."
                  || a === 11 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[10] !== "."
                  || a === 11 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[2] !== "." && puzzleString[20] !== "."
                  || a === 11 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[10] !== "." && puzzleString[19] !== "." && puzzleString[20] !== "."
                  || a === 11 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[1] !== "." && puzzleString[2] !== "." && puzzleString[10] !== "."
                  || a === 11 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[9] !== "." && puzzleString[18] !== "." && puzzleString[20] !== "."
                  || a === 11 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[0] !== "." && puzzleString[2] !== "." && puzzleString[9] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayOne.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 17 && a < 21) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[2].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 18].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[0].slice(2).split("").map((x) => +x).includes(b)) { 
                if (a === 18 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "." 
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 18 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 18 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[0] !== "."
                  || a === 18 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[9] !== "."
                  || a === 18 && !colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[19] !== "."
                  || a === 18 && colRaw[1].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[20] !== "."
                  || a === 18 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[0] !== "." && puzzleString[9] !== "."
                  || a === 18 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[9] !== "." && puzzleString[11] !== "." && puzzleString[20] !== "."
                  || a === 18 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[0] !== "." && puzzleString[2] !== "." && puzzleString[20] !== "."
                  || a === 18 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[9] !== "." && puzzleString[10] !== "." && puzzleString[19] !== "."
                  || a === 18 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[0] !== "." && puzzleString[1] !== "." && puzzleString[19] !== "."
                  || regRaw[0].slice(2).split("").map((x) => +x).length === 8

                  || a === 19 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 19 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 19 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[1] !== "."
                  || a === 19 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[10] !== "."
                  || a === 19 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[18] !== "."
                  || a === 19 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[20] !== "."
                  || a === 19 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[1] !== "." && puzzleString[10] !== "."
                  || a === 19 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[10] !== "." && puzzleString[11] !== "." && puzzleString[20] !== "."
                  || a === 19 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[1] !== "." && puzzleString[2] !== "." && puzzleString[20] !== "."
                  || a === 19 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[9] !== "." && puzzleString[10] !== "." && puzzleString[18] !== "."
                  || a === 19 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[0] !== "." && puzzleString[1] !== "." && puzzleString[18] !== "."

                  || a === 20 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 20 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 20 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[2] !== "."
                  || a === 20 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[11] !== "."
                  || a === 20 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[18] !== "."
                  || a === 20 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[19] !== "."
                  || a === 20 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[2] !== "." && puzzleString[11] !== "."
                  || a === 20 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[10] !== "." && puzzleString[11] !== "." && puzzleString[19] !== "."
                  || a === 20 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[1] !== "." && puzzleString[2] !== "." && puzzleString[19] !== "."
                  || a === 20 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[9] !== "." && puzzleString[11] !== "." && puzzleString[18] !== "."
                  || a === 20 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[0] !== "." && puzzleString[2] !== "." && puzzleString[18] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayOne.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 2 && a < 6) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[0].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[1].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 3 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 3 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 3 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[12] !== "."
                  || a === 3 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[21] !== "."
                  || a === 3 && !colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[4] !== "."
                  || a === 3 && colRaw[4].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[5] !== "."
                  || a === 3 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[12] !== "." && puzzleString[21] !== "."
                  || a === 3 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[5] !== "." && puzzleString[21] !== "." && puzzleString[23] !== "."
                  || a === 3 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[5] !== "." && puzzleString[12] !== "." && puzzleString[14] !== "."
                  || a === 3 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[4] !== "." && puzzleString[21] !== "." && puzzleString[22] !== "."
                  || a === 3 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[4] !== "." && puzzleString[12] !== "." && puzzleString[13] !== "."
                  || regRaw[1].slice(2).split("").map((x) => +x).length === 8

                  || a === 4 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 4 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 4 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[13] !== "."
                  || a === 4 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[22] !== "."
                  || a === 4 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "."
                  || a === 4 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[5] !== "."
                  || a === 4 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[13] !== "." && puzzleString[22] !== "."
                  || a === 4 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[5] !== "." && puzzleString[22] !== "." && puzzleString[23] !== "."
                  || a === 4 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[5] !== "." && puzzleString[13] !== "." && puzzleString[14] !== "."
                  || a === 4 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "." && puzzleString[21] !== "." && puzzleString[22] !== "."
                  || a === 4 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "." && puzzleString[12] !== "." && puzzleString[13] !== "."

                  || a === 5 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 5 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 5 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[14] !== "."
                  || a === 5 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[23] !== "."
                  || a === 5 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "."
                  || a === 5 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[4] !== "."
                  || a === 5 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[14] !== "." && puzzleString[23] !== "."
                  || a === 5 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[4] !== "." && puzzleString[22] !== "." && puzzleString[23] !== "."
                  || a === 5 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[4] !== "." && puzzleString[13] !== "." && puzzleString[14] !== "."
                  || a === 5 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "." && puzzleString[21] !== "." && puzzleString[23] !== "."
                  || a === 5 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "." && puzzleString[12] !== "." && puzzleString[14] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayTwo.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 11 && a < 15) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[1].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 9].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[1].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 12 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 12 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 12 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "."
                  || a === 12 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[21] !== "."
                  || a === 12 && !colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[13] !== "."
                  || a === 12 && colRaw[4].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[14] !== "."
                  || a === 12 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "." && puzzleString[21] !== "."
                  || a === 12 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[14] !== "." && puzzleString[21] !== "." && puzzleString[23] !== "."
                  || a === 12 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "." && puzzleString[5] !== "." && puzzleString[14] !== "."
                  || a === 12 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[13] !== "." && puzzleString[21] !== "." && puzzleString[22] !== "."
                  || a === 12 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "." && puzzleString[4] !== "." && puzzleString[13] !== "."
                  || regRaw[1].slice(2).split("").map((x) => +x).length === 8

                  || a === 13 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 13 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 13 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[4] !== "."
                  || a === 13 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[22] !== "."
                  || a === 13 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[12] !== "."
                  || a === 13 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[14] !== "."
                  || a === 13 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[4] !== "." && puzzleString[22] !== "."
                  || a === 13 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[14] !== "." && puzzleString[22] !== "." && puzzleString[23] !== "."
                  || a === 13 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[4] !== "." && puzzleString[5] !== "." && puzzleString[14] !== "."
                  || a === 13 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[12] !== "." && puzzleString[21] !== "." && puzzleString[22] !== "."
                  || a === 13 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "." && puzzleString[4] !== "." && puzzleString[12] !== "."

                  || a === 14 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 14 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 14 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[5] !== "."
                  || a === 14 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[23] !== "."
                  || a === 14 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[12] !== "."
                  || a === 14 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[13] !== "."
                  || a === 14 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[5] !== "." && puzzleString[23] !== "."
                  || a === 14 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[13] !== "." && puzzleString[22] !== "." && puzzleString[23] !== "."
                  || a === 14 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[4] !== "." && puzzleString[5] !== "." && puzzleString[13] !== "."
                  || a === 14 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[12] !== "." && puzzleString[21] !== "." && puzzleString[23] !== "."
                  || a === 14 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "." && puzzleString[5] !== "." && puzzleString[12] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayTwo.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 20 && a < 24) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[2].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 18].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[1].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 21 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 21 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 21 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "."
                  || a === 21 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[12] !== "."
                  || a === 21 && !colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[22] !== "."
                  || a === 21 && colRaw[4].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[23] !== "."
                  || a === 21 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "." && puzzleString[12] !== "."
                  || a === 21 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[12] !== "." && puzzleString[14] !== "." && puzzleString[23] !== "."
                  || a === 21 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "." && puzzleString[5] !== "." && puzzleString[23] !== "."
                  || a === 21 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[12] !== "." && puzzleString[13] !== "." && puzzleString[22] !== "."
                  || a === 21 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "." && puzzleString[4] !== "." && puzzleString[22] !== "."
                  || regRaw[1].slice(2).split("").map((x) => +x).length === 8

                  || a === 22 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 22 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 22 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[4] !== "."
                  || a === 22 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[13] !== "."
                  || a === 22 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[21] !== "."
                  || a === 22 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[23] !== "."
                  || a === 22 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[4] !== "." && puzzleString[13] !== "."
                  || a === 22 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[13] !== "." && puzzleString[14] !== "." && puzzleString[23] !== "."
                  || a === 22 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[4] !== "." && puzzleString[5] !== "." && puzzleString[23] !== "."
                  || a === 22 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[12] !== "." && puzzleString[13] !== "." && puzzleString[21] !== "."
                  || a === 22 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "." && puzzleString[4] !== "." && puzzleString[21] !== "."


                  || a === 23 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 23 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 23 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[5] !== "."
                  || a === 23 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[14] !== "."
                  || a === 23 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[21] !== "."
                  || a === 23 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[22] !== "."
                  || a === 23 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[5] !== "." && puzzleString[14] !== "."
                  || a === 23 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[13] !== "." && puzzleString[14] !== "." && puzzleString[22] !== "."
                  || a === 23 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[4] !== "." && puzzleString[5] !== "." && puzzleString[22] !== "."
                  || a === 23 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[12] !== "." && puzzleString[14] !== "." && puzzleString[21] !== "."
                  || a === 23 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[3] !== "." && puzzleString[5] !== "." && puzzleString[21] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayTwo.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 5 && a < 9) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[0].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[2].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 6 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 6 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 6 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[15] !== "."
                  || a === 6 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[24] !== "."
                  || a === 6 && !colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[7] !== "."
                  || a === 6 && colRaw[7].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[8] !== "."
                  || a === 6 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[15] !== "." && puzzleString[24] !== "."
                  || a === 6 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[8] !== "." && puzzleString[24] !== "." && puzzleString[26] !== "."
                  || a === 6 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[8] !== "." && puzzleString[15] !== "." && puzzleString[17] !== "."
                  || a === 6 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[7] !== "." && puzzleString[24] !== "." && puzzleString[25] !== "."
                  || a === 6 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[7] !== "." && puzzleString[15] !== "." && puzzleString[16] !== "."
                  || regRaw[2].slice(2).split("").map((x) => +x).length === 8

                  || a === 7 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 7 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 7 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[16] !== "."
                  || a === 7 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[25] !== "."
                  || a === 7 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "."
                  || a === 7 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[8] !== "."
                  || a === 7 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[16] !== "." && puzzleString[25] !== "."
                  || a === 7 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[8] !== "." && puzzleString[25] !== "." && puzzleString[26] !== "."
                  || a === 7 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[8] !== "." && puzzleString[16] !== "." && puzzleString[17] !== "."
                  || a === 7 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[24] !== "." && puzzleString[25] !== "."
                  || a === 7 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[15] !== "." && puzzleString[16] !== "."

                  || a === 8 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 8 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 8 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[17] !== "."
                  || a === 8 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[26] !== "."
                  || a === 8 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "."
                  || a === 8 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[7] !== "."
                  || a === 8 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[17] !== "." && puzzleString[26] !== "."
                  || a === 8 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[7] !== "." && puzzleString[25] !== "." && puzzleString[26] !== "."
                  || a === 8 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[7] !== "." && puzzleString[16] !== "." && puzzleString[17] !== "."
                  || a === 8 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[24] !== "." && puzzleString[26] !== "."
                  || a === 8 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[15] !== "." && puzzleString[17] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayThree.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 14 && a < 18) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[1].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 9].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[2].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 15 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 15 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 15 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "."
                  || a === 15 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[24] !== "."
                  || a === 15 && !colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[16] !== "."
                  || a === 15 && colRaw[7].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[17] !== "."
                  || a === 15 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[24] !== "."
                  || a === 15 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[17] !== "." && puzzleString[24] !== "." && puzzleString[26] !== "."
                  || a === 15 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[8] !== "." && puzzleString[17] !== "."
                  || a === 15 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[16] !== "." && puzzleString[24] !== "." && puzzleString[25] !== "."
                  || a === 15 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[7] !== "." && puzzleString[16] !== "."
                  || regRaw[2].slice(2).split("").map((x) => +x).length === 8


                  || a === 16 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 16 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 16 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[7] !== "."
                  || a === 16 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[25] !== "."
                  || a === 16 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[15] !== "."
                  || a === 16 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[17] !== "."
                  || a === 16 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[25] !== "."
                  || a === 16 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[17] !== "." && puzzleString[25] !== "." && puzzleString[26] !== "."
                  || a === 16 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[7] !== "." && puzzleString[8] !== "." && puzzleString[17] !== "."
                  || a === 16 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[15] !== "." && puzzleString[24] !== "." && puzzleString[25] !== "."
                  || a === 16 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[7] !== "." && puzzleString[15] !== "."

                  || a === 17 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 17 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                  || a === 17 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[8] !== "."
                  || a === 17 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[26] !== "."
                  || a === 17 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[15] !== "."
                  || a === 17 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[16] !== "."
                  || a === 17 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[8] !== "." && puzzleString[26] !== "."
                  || a === 17 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[16] !== "." && puzzleString[25] !== "." && puzzleString[26] !== "."
                  || a === 17 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[7] !== "." && puzzleString[8] !== "." && puzzleString[16] !== "."
                  || a === 17 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[15] !== "." && puzzleString[24] !== "." && puzzleString[26] !== "."
                  || a === 17 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[8] !== "." && puzzleString[15] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString)
                }
                arrayThree.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 23 && a < 27) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[2].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 18].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[2].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 24 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 24 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 24 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "."
                  || a === 24 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[15] !== "."
                  || a === 24 && !colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[25] !== "."
                  || a === 24 && colRaw[7].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[26] !== "."
                  || a === 24 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[15] !== "."
                  || a === 24 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[15] !== "." && puzzleString[17] !== "." && puzzleString[26] !== "."
                  || a === 24 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[8] !== "." && puzzleString[26] !== "."
                  || a === 24 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[15] !== "." && puzzleString[16] !== "." && puzzleString[25] !== "."
                  || a === 24 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[7] !== "." && puzzleString[25] !== "."
                  || regRaw[2].slice(2).split("").map((x) => +x).length === 8

                  || a === 25 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 25 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 25 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[7] !== "."
                  || a === 25 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[16] !== "."
                  || a === 25 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[24] !== "."
                  || a === 25 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[26] !== "."
                  || a === 25 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[7] !== "." && puzzleString[16] !== "."
                  || a === 25 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[16] !== "." && puzzleString[17] !== "." && puzzleString[26] !== "."
                  || a === 25 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[7] !== "." && puzzleString[8] !== "." && puzzleString[26] !== "."
                  || a === 25 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[15] !== "." && puzzleString[16] !== "." && puzzleString[24] !== "."
                  || a === 25 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[7] !== "." && puzzleString[24] !== "."

                  || a === 26 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 26 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                  || a === 26 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[8] !== "."
                  || a === 26 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && !rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[17] !== "."
                  || a === 26 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[24] !== "."
                  || a === 26 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[25] !== "."
                  || a === 26 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[8] !== "." && puzzleString[17] !== "."
                  || a === 26 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[16] !== "." && puzzleString[17] !== "." && puzzleString[25] !== "."
                  || a === 26 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[7] !== "." && puzzleString[8] !== "." && puzzleString[25] !== "."
                  || a === 26 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[0].slice(1).map((x) => +x).includes(b)
                    && puzzleString[15] !== "." && puzzleString[17] !== "." && puzzleString[24] !== "."
                  || a === 26 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[6] !== "." && puzzleString[8] !== "." && puzzleString[24] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString)
                }
                arrayThree.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 26 && a < 30) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[3].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 27].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[3].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 27 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 27 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 27 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[36] !== "."
                  || a === 27 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[45] !== "."
                  || a === 27 && !colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[28] !== "."
                  || a === 27 && colRaw[1].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[29] !== "."
                  || a === 27 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[36] !== "." && puzzleString[45] !== "."
                  || a === 27 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[29] !== "." && puzzleString[45] !== "." && puzzleString[47] !== "."
                  || a === 27 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[29] !== "." && puzzleString[36] !== "." && puzzleString[38] !== "."
                  || a === 27 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[28] !== "." && puzzleString[45] !== "." && puzzleString[46] !== "."
                  || a === 27 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[28] !== "." && puzzleString[36] !== "." && puzzleString[37] !== "."
                  || regRaw[3].slice(2).split("").map((x) => +x).length === 8

                  || a === 28 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 28 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 28 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[37] !== "."
                  || a === 28 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[46] !== "."
                  || a === 28 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "."
                  || a === 28 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[29] !== "."
                  || a === 28 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[37] !== "." && puzzleString[46] !== "."
                  || a === 28 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[29] !== "." && puzzleString[46] !== "." && puzzleString[47] !== "."
                  || a === 28 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[29] !== "." && puzzleString[37] !== "." && puzzleString[38] !== "."
                  || a === 28 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[45] !== "." && puzzleString[46] !== "."
                  || a === 28 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[36] !== "." && puzzleString[37] !== "."

                  || a === 29 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 29 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 29 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[38] !== "."
                  || a === 29 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[47] !== "."
                  || a === 29 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "."
                  || a === 29 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[28] !== "."
                  || a === 29 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[38] !== "." && puzzleString[47] !== "."
                  || a === 29 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[28] !== "." && puzzleString[46] !== "." && puzzleString[47] !== "."
                  || a === 29 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[28] !== "." && puzzleString[37] !== "." && puzzleString[38] !== "."
                  || a === 29 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[45] !== "." && puzzleString[47] !== "."
                  || a === 29 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[36] !== "." && puzzleString[38] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayFour.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 35 && a < 39) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[4].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 36].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[3].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 36 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 36 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 36 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "."
                  || a === 36 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[45] !== "."
                  || a === 36 && !colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[37] !== "."
                  || a === 36 && colRaw[1].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[38] !== "."
                  || a === 36 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[45] !== "."
                  || a === 36 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[38] !== "." && puzzleString[45] !== "." && puzzleString[47] !== "."
                  || a === 36 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[29] !== "." && puzzleString[38] !== "."
                  || a === 36 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[37] !== "." && puzzleString[45] !== "." && puzzleString[46] !== "."
                  || a === 36 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[28] !== "." && puzzleString[37] !== "."
                  || regRaw[3].slice(2).split("").map((x) => +x).length === 8
                  
                  || a === 37 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 37 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 37 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[28] !== "."
                  || a === 37 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[46] !== "."
                  || a === 37 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[36] !== "."
                  || a === 37 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[38] !== "."
                  || a === 37 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[28] !== "." && puzzleString[46] !== "."
                  || a === 37 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[38] !== "." && puzzleString[46] !== "." && puzzleString[47] !== "."
                  || a === 37 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[28] !== "." && puzzleString[29] !== "." && puzzleString[38] !== "."
                  || a === 37 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[36] !== "." && puzzleString[45] !== "." && puzzleString[46] !== "."
                  || a === 37 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[28] !== "." && puzzleString[36] !== "."
                    
                  || a === 38 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 38 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 38 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[29] !== "."
                  || a === 38 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[47] !== "."
                  || a === 38 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[36] !== "."
                  || a === 38 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[37] !== "."
                  || a === 38 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[29] !== "." && puzzleString[47] !== "."
                  || a === 38 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[37] !== "." && puzzleString[46] !== "." && puzzleString[47] !== "."
                  || a === 38 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[28] !== "." && puzzleString[29] !== "." && puzzleString[37] !== "."
                  || a === 38 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[36] !== "." && puzzleString[45] !== "." && puzzleString[47] !== "."
                  || a === 38 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[36] !== "." && puzzleString[38] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayFour.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 44 && a < 48) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[5].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 45].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[3].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 45 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                  || a === 45 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                  || a === 45 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "."
                  || a === 45 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[36] !== "."
                  || a === 45 && !colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[46] !== "."
                  || a === 45 && colRaw[1].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[47] !== "."
                  || a === 45 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[36] !== "."
                  || a === 45 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[36] !== "."
                  || a === 45 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[36] !== "." && puzzleString[38] !== "." && puzzleString[47] !== "."
                  || a === 45 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[29] !== "." && puzzleString[47] !== "."
                  || a === 45 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[36] !== "." && puzzleString[37] !== "." && puzzleString[46] !== "."
                  || a === 45 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[28] !== "." && puzzleString[46] !== "."
                  || regRaw[3].slice(2).split("").map((x) => +x).length === 8

                  || a === 46 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                  || a === 46 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                  || a === 46 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[28] !== "."
                  || a === 46 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[37] !== "."
                  || a === 46 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[45] !== "."
                  || a === 46 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[47] !== "."
                  || a === 46 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[28] !== "." && puzzleString[37] !== "."
                  || a === 46 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[37] !== "." && puzzleString[38] !== "." && puzzleString[47] !== "."
                  || a === 46 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[28] !== "." && puzzleString[29] !== "." && puzzleString[47] !== "."
                  || a === 46 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[36] !== "." && puzzleString[37] !== "." && puzzleString[45] !== "."
                  || a === 46 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[28] !== "." && puzzleString[45] !== "."

                  || a === 47 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                  || a === 47 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                  || a === 47 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[29] !== "."
                  || a === 47 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[38] !== "."
                  || a === 47 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[45] !== "."
                  || a === 47 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[46] !== "."
                  || a === 47 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[29] !== "." && puzzleString[38] !== "."
                  || a === 47 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[37] !== "." && puzzleString[38] !== "." && puzzleString[46] !== "."
                  || a === 47 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[28] !== "." && puzzleString[29] !== "." && puzzleString[46] !== "."
                  || a === 47 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[36] !== "." && puzzleString[38] !== "." && puzzleString[45] !== "."
                  || a === 47 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[27] !== "." && puzzleString[29] !== "." && puzzleString[45] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayFour.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 29 && a < 33) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[3].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 27].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[4].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 30 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 30 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 30 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[39] !== "."
                  || a === 30 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[48] !== "."
                  || a === 30 && !colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[31] !== "."
                  || a === 30 && colRaw[4].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[32] !== "."
                  || a === 30 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[39] !== "." && puzzleString[48] !== "."
                  || a === 30 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[32] !== "." && puzzleString[48] !== "." && puzzleString[50] !== "."
                  || a === 30 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[32] !== "." && puzzleString[39] !== "." && puzzleString[41] !== "."
                  || a === 30 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[31] !== "." && puzzleString[48] !== "." && puzzleString[49] !== "."
                  || a === 30 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[31] !== "." && puzzleString[39] !== "." && puzzleString[40] !== "."
                  || regRaw[4].slice(2).split("").map((x) => +x).length === 8

                  || a === 31 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 31 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 31 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[40] !== "."
                  || a === 31 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[49] !== "."
                  || a === 31 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[30] !== "."
                  || a === 31 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[32] !== "."
                  || a === 31 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[40] !== "." && puzzleString[49] !== "."
                  || a === 31 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[32] !== "." && puzzleString[49] !== "." && puzzleString[50] !== "."
                  || a === 31 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[32] !== "." && puzzleString[40] !== "." && puzzleString[41] !== "."
                  || a === 31 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[30] !== "." && puzzleString[48] !== "." && puzzleString[49] !== "."
                  || a === 31 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[30] !== "." && puzzleString[39] !== "." && puzzleString[40] !== "."

                  || a === 32 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 32 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 32 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[41] !== "."
                  || a === 32 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[50] !== "."
                  || a === 32 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[30] !== "."
                  || a === 32 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[31] !== "."
                  || a === 32 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[41] !== "." && puzzleString[50] !== "."
                  || a === 32 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[31] !== "." && puzzleString[49] !== "." && puzzleString[50] !== "."
                  || a === 32 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[31] !== "." && puzzleString[40] !== "." && puzzleString[41] !== "."
                  || a === 32 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[30] !== "." && puzzleString[48] !== "." && puzzleString[50] !== "."
                  || a === 32 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[30] !== "." && puzzleString[39] !== "." && puzzleString[41] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayFive.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 38 && a < 42) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[4].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 36].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[4].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 39 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 39 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 39 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[30] !== "."
                  || a === 39 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[48] !== "."
                  || a === 39 && !colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[40] !== "."
                  || a === 39 && colRaw[4].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[41] !== "."
                  || a === 39 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[30] !== "." && puzzleString[48] !== "."
                  || a === 39 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[41] !== "." && puzzleString[48] !== "." && puzzleString[50] !== "."
                  || a === 39 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[30] !== "." && puzzleString[32] !== "." && puzzleString[41] !== "."
                  || a === 39 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[40] !== "." && puzzleString[48] !== "." && puzzleString[49] !== "."
                  || a === 39 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[30] !== "." && puzzleString[31] !== "." && puzzleString[40] !== "."
                  || regRaw[4].slice(2).split("").map((x) => +x).length === 8

                  || a === 40 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 40 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 40 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[31] !== "."
                  || a === 40 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[49] !== "."
                  || a === 40 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[39] !== "."
                  || a === 40 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[41] !== "."
                  || a === 40 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[31] !== "." && puzzleString[49] !== "."
                  || a === 40 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[41] !== "." && puzzleString[49] !== "." && puzzleString[50] !== "."
                  || a === 40 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[32] !== "." && puzzleString[33] !== "." && puzzleString[41] !== "."
                  || a === 40 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[39] !== "." && puzzleString[48] !== "." && puzzleString[49] !== "."
                  || a === 40 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[30] !== "." && puzzleString[31] !== "." && puzzleString[39] !== "."

                  || a === 41 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 41 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 41 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[32] !== "."
                  || a === 41 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[50] !== "."
                  || a === 41 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[39] !== "."
                  || a === 41 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[40] !== "."
                  || a === 41 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[32] !== "." && puzzleString[50] !== "."
                  || a === 41 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[40] !== "." && puzzleString[49] !== "." && puzzleString[50] !== "."
                  || a === 41 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[31] !== "." && puzzleString[32] !== "." && puzzleString[40] !== "."
                  || a === 41 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[39] !== "." && puzzleString[48] !== "." && puzzleString[50] !== "."
                  || a === 41 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[30] !== "." && puzzleString[32] !== "." && puzzleString[39] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayFive.push(a, b);
              }
            }
          }
        }
      }

      if (puzzleString[a] === "." && a > 47 && a < 51) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[5].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 45].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[4].slice(2).split("").map((x) => +x).includes(b)) {
                  if (a === 48 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    || a === 48 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    || a === 48 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[30] !== "."
                    || a === 48 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[39] !== "."
                    || a === 48 && !colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[49] !== "."
                    || a === 48 && colRaw[4].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[50] !== "."
                    || a === 48 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && puzzleString[30] !== "." && puzzleString[39] !== "."
                    || a === 48 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                      && puzzleString[39] !== "." && puzzleString[41] !== "." && puzzleString[50] !== "."
                    || a === 48 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[30] !== "." && puzzleString[32] !== "." && puzzleString[50] !== "."
                    || a === 48 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                      && puzzleString[39] !== "." && puzzleString[40] !== "." && puzzleString[49] !== "."
                    || a === 48 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[30] !== "." && puzzleString[31] !== "." && puzzleString[49] !== "."
                    || regRaw[4].slice(2).split("").map((x) => +x).length === 8

                    || a === 49 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    || a === 49 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    || a === 49 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[31] !== "."
                    || a === 49 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[40] !== "."
                    || a === 49 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[48] !== "."
                    || a === 49 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[50] !== "."
                    || a === 49 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && puzzleString[31] !== "." && puzzleString[40] !== "."
                    || a === 49 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                      && puzzleString[40] !== "." && puzzleString[41] !== "." && puzzleString[50] !== "."
                    || a === 49 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[31] !== "." && puzzleString[32] !== "." && puzzleString[50] !== "."
                    || a === 49 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                      && puzzleString[39] !== "." && puzzleString[40] !== "." && puzzleString[48] !== "."
                    || a === 49 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[30] !== "." && puzzleString[31] !== "." && puzzleString[48] !== "."

                    || a === 50 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    || a === 50 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    || a === 50 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                      && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[32] !== "."
                    || a === 50 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[41] !== "."
                    || a === 50 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[48] !== "."
                    || a === 50 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[4].slice(1).map((x) => +x).includes(b)
                      && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[49] !== "."
                    || a === 50 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[32] !== "." && puzzleString[41] !== "."
                    || a === 50 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                      && puzzleString[40] !== "." && puzzleString[41] !== "." && puzzleString[49] !== "."
                    || a === 50 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[31] !== "." && puzzleString[32] !== "." && puzzleString[49] !== "."
                    || a === 50 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                      && puzzleString[39] !== "." && puzzleString[41] !== "." && puzzleString[48] !== "."
                    || a === 50 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[30] !== "." && puzzleString[32] !== "." && puzzleString[48] !== ".") {
                    puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                    return this.solve(puzzleString);
                  }
                arrayFive.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 32 && a < 36) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[3].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 27].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[5].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 33 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 33 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 33 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[42] !== "."
                  || a === 33 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[51] !== "."
                  || a === 33 && !colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[34] !== "."
                  || a === 33 && colRaw[7].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[35] !== "."
                  || a === 33 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[42] !== "." && puzzleString[51] !== "." 
                  || a === 33 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[35] !== "." && puzzleString[51] !== "." && puzzleString[53] !== "."
                  || a === 33 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[35] !== "." && puzzleString[42] !== "." && puzzleString[44] !== "."
                  || a === 33 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[34] !== "." && puzzleString[51] !== "." && puzzleString[52] !== "." 
                  || a === 33 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[34] !== "." && puzzleString[42] !== "." && puzzleString[43] !== "."
                  || regRaw[5].slice(2).split("").map((x) => +x).length === 8

                  || a === 34 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 34 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 34 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[43] !== "."
                  || a === 34 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[52] !== "."
                  || a === 34 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "."
                  || a === 34 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[35] !== "."
                  || a === 34 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[43] !== "." && puzzleString[52] !== "."
                  || a === 34 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[35] !== "." && puzzleString[52] !== "." && puzzleString[53] !== "."
                  || a === 34 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[35] !== "." && puzzleString[43] !== "." && puzzleString[44] !== "."
                  || a === 34 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "." && puzzleString[51] !== "." && puzzleString[52] !== "."
                  || a === 34 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "." && puzzleString[42] !== "." && puzzleString[43] !== "."

                  || a === 35 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 35 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 35 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[44] !== "."
                  || a === 35 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[53] !== "."
                  || a === 35 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "."
                  || a === 35 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[34] !== "."
                  || a === 35 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[44] !== "." && puzzleString[53] !== "."
                  || a === 35 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[34] !== "." && puzzleString[52] !== "." && puzzleString[53] !== "."
                  || a === 35 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[34] !== "." && puzzleString[43] !== "." && puzzleString[44] !== "."
                  || a === 35 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "." && puzzleString[51] !== "." && puzzleString[53] !== "."
                  || a === 35 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "." && puzzleString[42] !== "." && puzzleString[44] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arraySix.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 41 && a < 45) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[4].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 36].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[5].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 42 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 42 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 42 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "."
                  || a === 42 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[51] !== "."
                  || a === 42 && !colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[43] !== "."
                  || a === 42 && colRaw[7].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[44] !== "."
                  || a === 42 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "." && puzzleString[51] !== "."
                  || a === 42 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[44] !== "." && puzzleString[51] !== "." && puzzleString[53] !== "."
                  || a === 42 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "." && puzzleString[35] !== "." && puzzleString[44] !== "."
                  || a === 42 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[43] !== "." && puzzleString[51] !== "." && puzzleString[52] !== "."
                  || a === 42 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "." && puzzleString[34] !== "." && puzzleString[43] !== "."
                  || regRaw[5].slice(2).split("").map((x) => +x).length === 8

                  || a === 43 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 43 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 43 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[34] !== "."
                  || a === 43 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[52] !== "."
                  || a === 43 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[42] !== "."
                  || a === 43 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[44] !== "."
                  || a === 43 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[34] !== "." && puzzleString[52] !== "."
                  || a === 43 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[44] !== "." && puzzleString[52] !== "." && puzzleString[53] !== "."
                  || a === 43 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[34] !== "." && puzzleString[35] !== "." && puzzleString[44] !== "."
                  || a === 43 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[42] !== "." && puzzleString[51] !== "." && puzzleString[52] !== "."
                  || a === 43 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "." && puzzleString[34] !== "." && puzzleString[42] !== "."

                  || a === 44 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 44 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                  || a === 44 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[35] !== "."
                  || a === 44 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[53] !== "."
                  || a === 44 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[42] !== "."
                  || a === 44 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[43] !== "."
                  || a === 44 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[35] !== "." && puzzleString[53] !== "."
                  || a === 44 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[43] !== "." && puzzleString[52] !== "." && puzzleString[53] !== "."
                  || a === 44 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[34] !== "." && puzzleString[35] !== "." && puzzleString[43] !== "."
                  || a === 44 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[42] !== "." && puzzleString[51] !== "." && puzzleString[53] !== "."
                  || a === 44 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "." && puzzleString[35] !== "." && puzzleString[42] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arraySix.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 50 && a < 54) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[5].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 45].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[5].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 51 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                  || a === 51 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                  || a === 51 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "."
                  || a === 51 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[42] !== "."
                  || a === 51 && !colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[52] !== "."
                  || a === 51 && colRaw[7].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[53] !== "."
                  || a === 51 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "." && puzzleString[42] !== "."
                  || a === 51 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[42] !== "." && puzzleString[44] !== "." && puzzleString[53] !== "."
                  || a === 51 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "." && puzzleString[35] !== "." && puzzleString[53] !== "."
                  || a === 51 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[42] !== "." && puzzleString[43] !== "." && puzzleString[52] !== "."
                  || a === 51 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "." && puzzleString[34] !== "." && puzzleString[52] !== "."
                  || regRaw[5].slice(2).split("").map((x) => +x).length === 8

                  || a === 52 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                  || a === 52 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                  || a === 52 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[34] !== "."
                  || a === 52 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[43] !== "."
                  || a === 52 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[51] !== "."
                  || a === 52 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[53] !== "."
                  || a === 52 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[43] !== "." && puzzleString[34] !== "."
                  || a === 52 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[43] !== "." && puzzleString[44] !== "." && puzzleString[53] !== "."
                  || a === 52 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[34] !== "." && puzzleString[35] !== "." && puzzleString[53] !== "."
                  || a === 52 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[42] !== "." && puzzleString[43] !== "." && puzzleString[51] !== "."
                  || a === 52 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "." && puzzleString[34] !== "." && puzzleString[51] !== "."

                  || a === 53 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                  || a === 53 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    || a === 53 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[35] !== "."
                  || a === 53 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && !rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[44] !== "."
                  || a === 53 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[51] !== "."
                  || a === 53 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[52] !== "."
                  || a === 53 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[35] !== "." && puzzleString[44] !== "."
                  || a === 53 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[43] !== "." && puzzleString[44] !== "." && puzzleString[52] !== "."
                  || a === 53 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[34] !== "." && puzzleString[35] !== "." && puzzleString[52] !== "."
                  || a === 53 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[3].slice(1).map((x) => +x).includes(b)
                    && puzzleString[42] !== "." && puzzleString[44] !== "." && puzzleString[51] !== "."
                  || a === 53 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[33] !== "." && puzzleString[35] !== "." && puzzleString[51] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arraySix.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 53 && a < 57) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[6].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 54].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[6].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 54 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 54 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 54 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[63] !== "."
                  || a === 54 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[72] !== "."
                  || a === 54 && !colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[55] !== "."
                  || a === 54 && colRaw[1].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[56] !== "."
                  || a === 54 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[63] !== "." && puzzleString[72] !== "."
                  || a === 54 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[56] !== "." && puzzleString[72] !== "." && puzzleString[74] !== "."
                  || a === 54 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[56] !== "." && puzzleString[63] !== "." && puzzleString[65] !== "."
                  || a === 54 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[55] !== "." && puzzleString[72] !== "." && puzzleString[73] !== "."
                  || a === 54 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[55] !== "." && puzzleString[63] !== "." && puzzleString[64] !== "."
                  || regRaw[6].slice(2).split("").map((x) => +x).length === 8

                  || a === 55 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 55 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 55 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[64] !== "."
                  || a === 55 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[73] !== "."
                  || a === 55 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "."
                  || a === 55 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[56] !== "."
                  || a === 55 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[64] !== "." && puzzleString[73] !== "."
                  || a === 55 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[56] !== "." && puzzleString[73] !== "." && puzzleString[74] !== "."
                  || a === 55 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[56] !== "." && puzzleString[64] !== "." && puzzleString[65] !== "."
                  || a === 55 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[72] !== "." && puzzleString[73] !== "."
                  || a === 55 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[63] !== "." && puzzleString[64] !== "."

                  || a === 56 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 56 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 56 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[65] !== "."
                  || a === 56 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[74] !== "."
                  || a === 56 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "."
                  || a === 56 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[55] !== "."
                  || a === 56 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[65] !== "." && puzzleString[74] !== "."
                  || a === 56 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[55] !== "." && puzzleString[73] !== "." && puzzleString[74] !== "."
                  || a === 56 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[55] !== "." && puzzleString[64] !== "." && puzzleString[65] !== "."
                  || a === 56 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[72] !== "." && puzzleString[74] !== "."
                  || a === 56 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[63] !== "." && puzzleString[65] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arraySeven.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 62 && a < 66) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[7].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 63].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[6].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 63 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 63 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 63 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "."
                  || a === 63 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[72] !== "."
                  || a === 63 && !colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[64] !== "."
                  || a === 63 && colRaw[1].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[65] !== "."
                  || a === 63 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[72] !== "."
                  || a === 63 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[65] !== "." && puzzleString[72] !== "." && puzzleString[74] !== "."
                  || a === 63 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[56] !== "." && puzzleString[65] !== "."
                  || a === 63 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[64] !== "." && puzzleString[72] !== "." && puzzleString[73] !== "."
                  || a === 63 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[55] !== "." && puzzleString[64] !== "."
                  || regRaw[6].slice(2).split("").map((x) => +x).length === 8

                  || a === 64 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 64 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 64 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[55] !== "."
                  || a === 64 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[73] !== "."
                  || a === 64 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[63] !== "."
                  || a === 64 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[65] !== "."
                  || a === 64 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[55] !== "." && puzzleString[73] !== "."
                  || a === 64 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[65] !== "." && puzzleString[73] !== "." && puzzleString[74] !== "."
                  || a === 64 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[55] !== "." && puzzleString[56] !== "." && puzzleString[65] !== "."
                  || a === 64 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[63] !== "." && puzzleString[72] !== "." && puzzleString[73] !== "."
                  || a === 64 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[55] !== "." && puzzleString[63] !== "."

                  || a === 65 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 65 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 65 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[56] !== "."
                  || a === 65 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[74] !== "."
                  || a === 65 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[63] !== "."
                  || a === 65 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[64] !== "."
                  || a === 65 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[56] !== "." && puzzleString[74] !== "."
                  || a === 65 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[64] !== "." && puzzleString[73] !== "." && puzzleString[74] !== "."
                  || a === 65 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[55] !== "." && puzzleString[56] !== "." && puzzleString[64] !== "."
                  || a === 65 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[63] !== "." && puzzleString[72] !== "." && puzzleString[74] !== "."
                  || a === 65 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[56] !== "." && puzzleString[63] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arraySeven.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 71 && a < 75) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[8].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 72].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[6].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 72 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 72 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 72 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "."
                  || a === 72 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[63] !== "."
                  || a === 72 && !colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[73] !== "."
                  || a === 72 && colRaw[1].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[74] !== "."
                  || a === 72 && colRaw[1].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[63] !== "."
                  || a === 72 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[63] !== "." && puzzleString[65] !== "." && puzzleString[74] !== "."
                  || a === 72 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[56] !== "." && puzzleString[74] !== "."
                  || a === 72 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[63] !== "." && puzzleString[64] !== "." && puzzleString[73] !== "."
                  || a === 72 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[55] !== "." && puzzleString[73] !== "."
                  || regRaw[6].slice(2).split("").map((x) => +x).length === 8

                  || a === 73 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 73 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 73 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[55] !== "."
                  || a === 73 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[64] !== "."
                  || a === 73 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[72] !== "."
                  || a === 73 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[2].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[74] !== "."
                  || a === 73 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[2].slice(1).map((x) => +x).includes(b)
                    && puzzleString[55] !== "." && puzzleString[64] !== "."
                  || a === 73 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[64] !== "." && puzzleString[65] !== "." && puzzleString[74] !== "."
                  || a === 73 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[55] !== "." && puzzleString[56] !== "." && puzzleString[74] !== "."
                  || a === 73 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[63] !== "." && puzzleString[64] !== "." && puzzleString[72] !== "."
                  || a === 73 && colRaw[2].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[55] !== "." && puzzleString[72] !== "."

                  || a === 74 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 74 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 74 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[56] !== "."
                  || a === 74 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[65] !== "."
                  || a === 74 && !colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[72] !== "."
                  || a === 74 && colRaw[0].slice(1).map((x) => +x).includes(b) && !colRaw[1].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[73] !== "."
                  || a === 74 && colRaw[0].slice(1).map((x) => +x).includes(b) && colRaw[1].slice(1).map((x) => +x).includes(b)
                    && puzzleString[56] !== "." && puzzleString[65] !== "."
                  || a === 74 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[65] !== "." && puzzleString[73] !== "."
                  || a === 74 && colRaw[0].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[55] !== "." && puzzleString[56] !== "." && puzzleString[73] !== "."
                  || a === 74 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[63] !== "." && puzzleString[65] !== "." && puzzleString[72] !== "."
                  || a === 74 && colRaw[1].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[54] !== "." && puzzleString[56] !== "." && puzzleString[72] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arraySeven.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 56 && a < 60) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[6].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 54].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[7].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 57 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 57 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 57 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[66] !== "."
                  || a === 57 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[75] !== "."
                  || a === 57 && !colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[58] !== "."
                  || a === 57 && colRaw[4].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[59] !== "."
                  || a === 57 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[66] !== "." && puzzleString[75] !== "."
                  || a === 57 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[59] !== "." && puzzleString[75] !== "." && puzzleString[77] !== "."
                  || a === 57 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[59] !== "." && puzzleString[66] !== "." && puzzleString[68] !== "."
                  || a === 57 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[58] !== "." && puzzleString[75] !== "." && puzzleString[76] !== "."
                  || a === 57 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[58] !== "." && puzzleString[66] !== "." && puzzleString[67] !== "."
                  || regRaw[7].slice(2).split("").map((x) => +x).length === 8                    

                  || a === 58 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 58 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 58 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[67] !== "."
                  || a === 58 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[76] !== "."
                  || a === 58 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[57] !== "."
                  || a === 58 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[59] !== "."
                  || a === 58 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[67] !== "." && puzzleString[76] !== "."
                  || a === 58 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[59] !== "." && puzzleString[76] !== "." && puzzleString[77] !== "."
                  || a === 58 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[59] !== "." && puzzleString[67] !== "." && puzzleString[68] !== "."
                  || a === 58 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[57] !== "." && puzzleString[75] !== "." && puzzleString[76] !== "."
                  || a === 58 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[57] !== "." && puzzleString[66] !== "." && puzzleString[67] !== "."

                  || a === 59 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 59 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 59 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[68] !== "."
                  || a === 59 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[77] !== "."
                  || a === 59 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[57] !== "."
                  || a === 59 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[58] !== "."
                  || a === 59 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[68] !== "." && puzzleString[77] !== "."
                  || a === 59 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[58] !== "." && puzzleString[76] !== "." && puzzleString[77] !== "."
                  || a === 59 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[58] !== "." && puzzleString[67] !== "." && puzzleString[68] !== "."
                  || a === 59 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[57] !== "." && puzzleString[75] !== "." && puzzleString[77] !== "."
                  || a === 59 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[57] !== "." && puzzleString[66] !== "." && puzzleString[68] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayEight.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 65 && a < 69) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[7].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 63].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[7].slice(2).split("").map((x) => +x).includes(b)) {
                  if (a === 66 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    || a === 66 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    || a === 66 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[57] !== "."
                    || a === 66 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[75] !== "."
                    || a === 66 && !colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[67] !== "."
                    || a === 66 && colRaw[4].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[68] !== "."
                    || a === 66 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && puzzleString[57] !== "." && puzzleString[75] !== "."
                    || a === 66 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                      && puzzleString[68] !== "." && puzzleString[75] !== "." && puzzleString[77] !== "."
                    || a === 66 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[57] !== "." && puzzleString[59] !== "." && puzzleString[68] !== "."
                    || a === 66 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                      && puzzleString[67] !== "." && puzzleString[75] !== "." && puzzleString[76] !== "."
                    || a === 66 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[57] !== "." && puzzleString[58] !== "." && puzzleString[67] !== "."
                    || regRaw[7].slice(2).split("").map((x) => +x).length === 8

                    || a === 67 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    || a === 67 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    || a === 67 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[58] !== "."
                    || a === 67 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[76] !== "."
                    || a === 67 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[66] !== "."
                    || a === 67 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[68] !== "."
                    || a === 67 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                      && puzzleString[58] !== "." && puzzleString[76] !== "."
                    || a === 67 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                      && puzzleString[68] !== "." && puzzleString[76] !== "." && puzzleString[77] !== "."
                    || a === 67 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[58] !== "." && puzzleString[59] !== "." && puzzleString[68] !== "."
                    || a === 67 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                      && puzzleString[66] !== "." && puzzleString[75] !== "." && puzzleString[76] !== "."
                    || a === 67 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[57] !== "." && puzzleString[58] !== "." && puzzleString[66] !== "."

                    || a === 68 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    || a === 68 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    || a === 68 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                      && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[59] !== "."
                    || a === 68 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[77] !== "."
                    || a === 68 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[66] !== "."
                    || a === 68 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[4].slice(1).map((x) => +x).includes(b)
                      && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[67] !== "."
                    || a === 68 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                      && puzzleString[59] !== "." && puzzleString[77] !== "."
                    || a === 68 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                      && puzzleString[67] !== "." && puzzleString[76] !== "." && puzzleString[77] !== "."
                    || a === 68 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[58] !== "." && puzzleString[59] !== "." && puzzleString[67] !== "."
                    || a === 68 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                      && puzzleString[66] !== "." && puzzleString[75] !== "." && puzzleString[77] !== "."
                    || a === 68 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                      && puzzleString[57] !== "." && puzzleString[59] !== "." && puzzleString[66] !== ".") {
                    puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                    return this.solve(puzzleString);
                  }
                arrayEight.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 74 && a < 78) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[8].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 72].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[7].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 75 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 75 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 75 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[57] !== "."
                  || a === 75 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[66] !== "."
                  || a === 75 && !colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[76] !== "."
                  || a === 75 && colRaw[4].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[77] !== "."
                  || a === 75 && colRaw[4].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[57] !== "." && puzzleString[66] !== "."
                  || a === 75 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[66] !== "." && puzzleString[68] !== "." && puzzleString[77] !== "."
                  || a === 75 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[57] !== "." && puzzleString[59] !== "." && puzzleString[77] !== "."
                  || a === 75 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[66] !== "." && puzzleString[67] !== "." && puzzleString[76] !== "."
                  || a === 75 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[57] !== "." && puzzleString[58] !== "." && puzzleString[76] !== "."
                  || regRaw[7].slice(2).split("").map((x) => +x).length === 8

                  || a === 76 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 76 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 76 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[58] !== "."
                  || a === 76 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[67] !== "."
                  || a === 76 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[75] !== "."
                  || a === 76 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[5].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[77] !== "."
                  || a === 76 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[5].slice(1).map((x) => +x).includes(b)
                    && puzzleString[58] !== "." && puzzleString[67] !== "."
                  || a === 76 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[67] !== "." && puzzleString[68] !== "." && puzzleString[77] !== "."
                  || a === 76 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[58] !== "." && puzzleString[59] !== "." && puzzleString[77] !== "."
                  || a === 76 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[66] !== "." && puzzleString[67] !== "." && puzzleString[75] !== "."
                  || a === 76 && colRaw[5].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[57] !== "." && puzzleString[58] !== "." && puzzleString[75] !== "."

                  || a === 77 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 77 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 77 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[59] !== "."
                  || a === 77 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[68] !== "."
                  || a === 77 && !colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[75] !== "."
                  || a === 77 && colRaw[3].slice(1).map((x) => +x).includes(b) && !colRaw[4].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[76] !== "."
                  || a === 77 && colRaw[3].slice(1).map((x) => +x).includes(b) && colRaw[4].slice(1).map((x) => +x).includes(b)
                    && puzzleString[59] !== "." && puzzleString[68] !== "."
                  || a === 77 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[67] !== "." && puzzleString[68] !== "." && puzzleString[76] !== "."
                  || a === 77 && colRaw[3].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[58] !== "." && puzzleString[59] !== "." && puzzleString[76] !== "."
                  || a === 77 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[66] !== "." && puzzleString[68] !== "." && puzzleString[75] !== "."
                  || a === 77 && colRaw[4].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[57] !== "." && puzzleString[59] !== "." && puzzleString[75] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayEight.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 59 && a < 63) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[6].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 54].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[8].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 60 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 60 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 60 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[69] !== "."
                  || a === 60 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[78] !== "."
                  || a === 60 && !colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[61] !== "."
                  || a === 60 && colRaw[7].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[62] !== "."
                  || a === 60 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[69] !== "." && puzzleString[78] !== "."
                  || a === 60 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[62] !== "." && puzzleString[78] !== "." && puzzleString[80] !== "."
                  || a === 60 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[62] !== "." && puzzleString[69] !== "." && puzzleString[71] !== "."
                  || a === 60 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[61] !== "." && puzzleString[78] !== "." && puzzleString[79] !== "."
                  || a === 60 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[61] !== "." && puzzleString[69] !== "." && puzzleString[70] !== "."
                  || regRaw[8].slice(2).split("").map((x) => +x).length === 8

                  || a === 61 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 61 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 61 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[70] !== "."
                  || a === 61 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[79] !== "."
                  || a === 61 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "."
                  || a === 61 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[62] !== "."
                  || a === 61 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[70] !== "." && puzzleString[79] !== "."
                  || a === 61 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[62] !== "." && puzzleString[79] !== "." && puzzleString[80] !== "."
                  || a === 61 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[62] !== "." && puzzleString[70] !== "." && puzzleString[71] !== "."
                  || a === 61 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "." && puzzleString[78] !== "." && puzzleString[79] !== "."
                  || a === 61 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "." && puzzleString[69] !== "." && puzzleString[70] !== "."

                  || a === 62 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 62 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 62 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[71] !== "."
                  || a === 62 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[80] !== "."
                  || a === 62 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "."
                  || a === 62 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[61] !== "."
                  || a === 62 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[71] !== "." && puzzleString[80] !== "."
                  || a === 62 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[61] !== "." && puzzleString[79] !== "." && puzzleString[80] !== "."
                  || a === 62 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[61] !== "." && puzzleString[70] !== "." && puzzleString[71] !== "."
                  || a === 62 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "." && puzzleString[78] !== "." && puzzleString[80] !== "."
                  || a === 62 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "." && puzzleString[69] !== "." && puzzleString[71] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayNine.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 68 && a < 72) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[7].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 63].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[8].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 69 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 69 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 69 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "."
                  || a === 69 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[78] !== "."
                  || a === 69 && !colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[70] !== "."
                  || a === 69 && colRaw[7].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[71] !== "."
                  || a === 69 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "." && puzzleString[78] !== "."
                  || a === 69 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[71] !== "." && puzzleString[78] !== "." && puzzleString[80] !== "."
                  || a === 69 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "." && puzzleString[62] !== "." && puzzleString[71] !== "."
                  || a === 69 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[70] !== "." && puzzleString[78] !== "." && puzzleString[79] !== "."
                  || a === 69 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "." && puzzleString[61] !== "." && puzzleString[70] !== "."
                  || regRaw[8].slice(2).split("").map((x) => +x).length === 8

                  || a === 70 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 70 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 70 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[61] !== "."
                  || a === 70 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[79] !== "."
                  || a === 70 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[69] !== "."
                  || a === 70 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[71] !== "."
                  || a === 70 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[61] !== "." && puzzleString[79] !== "."
                  || a === 70 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[71] !== "." && puzzleString[79] !== "." && puzzleString[80] !== "."
                  || a === 70 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[61] !== "." && puzzleString[62] !== "." && puzzleString[71] !== "."
                  || a === 70 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[69] !== "." && puzzleString[78] !== "." && puzzleString[79] !== "."
                  || a === 70 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "." && puzzleString[61] !== "." && puzzleString[69] !== "."

                  || a === 71 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 71 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                  || a === 71 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[62] !== "."
                  || a === 71 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[80] !== "."
                  || a === 71 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[69] !== "."
                  || a === 71 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[70] !== "."
                  || a === 71 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[62] !== "." && puzzleString[80] !== "."
                  || a === 71 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[70] !== "." && puzzleString[79] !== "." && puzzleString[80] !== "."
                  || a === 71 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[61] !== "." && puzzleString[62] !== "." && puzzleString[70] !== "."
                  || a === 71 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[69] !== "." && puzzleString[78] !== "." && puzzleString[80] !== "."
                  || a === 71 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "." && puzzleString[62] !== "." && puzzleString[69] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayNine.push(a, b);
              }
            }
          }
        }
      }
      if (puzzleString[a] === "." && a > 77) {
        for (let b = 1; b < 10; b++) {
          if (!rowRaw[8].slice(1).map((x) => +x).includes(b)) {
            if (!colRaw[a - 72].slice(1).map((x) => +x).includes(b)) {
              if (!regRaw[8].slice(2).split("").map((x) => +x).includes(b)) {
                if (a === 78 && puzzleString[a + 1] !== "." && puzzleString[a + 2] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 78 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 78 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "."
                  || a === 78 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[69] !== "."
                  || a === 78 && !colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[79] !== "."
                  || a === 78 && colRaw[7].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[80] !== "."
                  || a === 78 && colRaw[7].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "." && puzzleString[69] !== "."
                  || a === 78 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[69] !== "." && puzzleString[71] !== "." && puzzleString[80] !== "."
                  || a === 78 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "." && puzzleString[62] !== "." && puzzleString[80] !== "."
                  || a === 78 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[69] !== "." && puzzleString[70] !== "." && puzzleString[79] !== "."
                  || a === 78 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "." && puzzleString[61] !== "." && puzzleString[79] !== "."
                  || regRaw[8].slice(2).split("").map((x) => +x).length === 8

                  || a === 79 && puzzleString[a - 1] !== "." && puzzleString[a + 1] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 79 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 79 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[61] !== "."
                  || a === 79 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[70] !== "."
                  || a === 79 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[78] !== "."
                  || a === 79 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[8].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[80] !== "."
                  || a === 79 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[8].slice(1).map((x) => +x).includes(b)
                    && puzzleString[61] !== "." && puzzleString[70] !== "."
                  || a === 79 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[70] !== "." && puzzleString[71] !== "." && puzzleString[80] !== "."
                  || a === 79 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[70] !== "." && puzzleString[71] !== "." && puzzleString[80] !== "."
                  || a === 79 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[69] !== "." && puzzleString[70] !== "." && puzzleString[78] !== "."
                  || a === 79 && colRaw[8].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "." && puzzleString[61] !== "." && puzzleString[78] !== "."

                  || a === 80 && puzzleString[a - 1] !== "." && puzzleString[a - 2] !== "."
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 80 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                  || a === 80 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && !rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[62] !== "."
                  || a === 80 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && !rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[71] !== "."
                  || a === 80 && !colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[78] !== "."
                  || a === 80 && colRaw[6].slice(1).map((x) => +x).includes(b) && !colRaw[7].slice(1).map((x) => +x).includes(b)
                    && rowRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[79] !== "."
                  || a === 80 && colRaw[6].slice(1).map((x) => +x).includes(b) && colRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[62] !== "." && puzzleString[71] !== "."
                  || a === 80 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[70] !== "." && puzzleString[71] !== "." && puzzleString[79] !== "."
                  || a === 80 && colRaw[6].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[61] !== "." && puzzleString[62] !== "." && puzzleString[79] !== "."
                  || a === 80 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[6].slice(1).map((x) => +x).includes(b)
                    && puzzleString[69] !== "." && puzzleString[71] !== "." && puzzleString[78] !== "."
                  || a === 80 && colRaw[7].slice(1).map((x) => +x).includes(b) && rowRaw[7].slice(1).map((x) => +x).includes(b)
                    && puzzleString[60] !== "." && puzzleString[62] !== "." && puzzleString[78] !== ".") {
                  puzzleString = puzzleString.slice(0, a).concat(b).concat(puzzleString.slice(a + 1));
                  return this.solve(puzzleString);
                }
                arrayNine.push(a, b);
              }
            }
          }
        }
      }
    }

    // fill in coordinates if possible
    if (arrayOne.length === 1) {
      // console.log(arrayOne)
      puzzleString = puzzleString.slice(0, +arrayOne[0])
        .concat(arrayOne[1]).concat(puzzleString.slice(+arrayOne[0] + 1));
      return this.solve(puzzleString);
    }
    if (arrayTwo.length === 1) {
      // console.log(arrayTwo)
      puzzleString = puzzleString.slice(0, +arrayTwo[0])
        .concat(arrayTwo[1]).concat(puzzleString.slice(+arrayTwo[0] + 1));
      return this.solve(puzzleString);
    }
    if (arrayThree.length === 1) {
      // console.log(arrayThree)
      puzzleString = puzzleString.slice(0, +arrayThree[0])
        .concat(arrayThree[1]).concat(puzzleString.slice(+arrayThree[0] + 1));
      return this.solve(puzzleString);
    }
    if (arrayFour.length === 1) {
      // console.log(arrayFour)
      puzzleString = puzzleString.slice(0, +arrayFour[0])
        .concat(arrayFour[1]).concat(puzzleString.slice(+arrayFour[0] + 1));
      return this.solve(puzzleString);
    }
    if (arrayFive.length === 1) {
      // console.log(arrayFive)
      puzzleString = puzzleString.slice(0, +arrayFive[0])
        .concat(arrayFive[1]).concat(puzzleString.slice(+arrayFive[0] + 1));
      return this.solve(puzzleString);
    }
    if (arraySix.length === 1) {
      // console.log(arraySix)
      puzzleString = puzzleString.slice(0, +arraySix[0])
        .concat(arraySix[1]).concat(puzzleString.slice(+arraySix[0] + 1));
      return this.solve(puzzleString);
    }
    if (arraySeven.length === 1) {
      // console.log(arraySeven)
      puzzleString = puzzleString.slice(0, +arraySeven[0])
        .concat(arraySeven[1]).concat(puzzleString.slice(+arraySeven[0] + 1));
      return this.solve(puzzleString);
    }
    if (arrayEight.length === 1) {
      // console.log(arrayEight)
      puzzleString = puzzleString.slice(0, +arrayEight[0])
        .concat(arrayEight[1]).concat(puzzleString.slice(+arrayEight[0] + 1));
      return this.solve(puzzleString);
    }
    if (arrayNine.length === 1) {
      // console.log(arrayThree)
      puzzleString = puzzleString.slice(0, +arrayNine[0])
        .concat(arrayNine[1]).concat(puzzleString.slice(+arrayNine[0] + 1));
      return this.solve(puzzleString);
    };
    if (puzzleString.includes(".")) {
      return "problem"
    };
    for (let x = 0; x < regRaw.length; x++) {
      for (let y = 1; y < 10; y++) {
        if (regRaw[x].slice(2).length === 9 && !regRaw[x].slice(2).split("").map((x) => +x).includes(y)) {
          return "problem"
        };
      };
    };
    // console.log(puzzleString);
    return puzzleString
  }
}

module.exports = SudokuSolver;