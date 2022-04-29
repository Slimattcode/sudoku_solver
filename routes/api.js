'use strict';
const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = req.body.value;
      if (solver.validate(puzzle, value, coordinate) === "missing fields") {
          return res.json({ error: "Required field(s) missing" });
      };
      if (solver.validate(puzzle, value, coordinate) === "invalid coordinate") {
        return res.json({error: "Invalid coordinate"});
      };
      if (solver.validate(puzzle, value, coordinate) === "invalid value") {
        return res.json({error: "Invalid value"});
      };
      if (solver.validate(puzzle, value, coordinate) === "invalid characters") {
        return res.json({error: "Invalid characters in puzzle"});
      };
      if (solver.validate(puzzle, value, coordinate) === "to long or to short") {
        return res.json({error: "Expected puzzle to be 81 characters long"});
      };
      if (solver.checkRowPlacement(puzzle, value, coordinate) === "row conflict" &&
          solver.checkColPlacement(puzzle, value, coordinate) === "column conflict" &&
          solver.checkRegionPlacement(puzzle, value, coordinate) === "region conflict") {
          return res.json({valid: false, conflict: ["row", "column", "region"]});
      };
      if (solver.checkRowPlacement(puzzle, value, coordinate) !== "row conflict" &&
          solver.checkColPlacement(puzzle, value, coordinate) === "column conflict" &&
          solver.checkRegionPlacement(puzzle, value, coordinate) === "region conflict") {
          return res.json({valid: false, conflict: ["column", "region"]});
      };
      if (solver.checkRowPlacement(puzzle, value, coordinate) === "row conflict" &&
          solver.checkColPlacement(puzzle, value, coordinate) !== "column conflict" &&
          solver.checkRegionPlacement(puzzle, value, coordinate) === "region conflict") {
          return res.json({valid: false, conflict: ["row", "region"]});
      };
      if (solver.checkRowPlacement(puzzle, value, coordinate) === "row conflict" &&
          solver.checkColPlacement(puzzle, value, coordinate) === "column conflict" &&
          solver.checkRegionPlacement(puzzle, value, coordinate) !== "region conflict") {
          return res.json({valid: false, conflict: ["row", "column"]});
      };
      if (solver.checkRowPlacement(puzzle, value, coordinate) === "row conflict") {
          return res.json({valid: false, conflict: ["row"]});
      };
      if (solver.checkColPlacement(puzzle, value, coordinate) === "column conflict") {
          return res.json({valid: false, conflict: ["column"]});
      };
      if (solver.checkRegionPlacement(puzzle, value, coordinate) === "region conflict") {
        return res.json({valid: false, conflict: ["region"]});
      };
      if (solver.validate(puzzle, value, coordinate) === "valid"
          && solver.checkRowPlacement(puzzle, value, coordinate) !== "row conflict" 
          && solver.checkColPlacement(puzzle, value, coordinate) !== "column conflict" 
          && solver.checkRegionPlacement(puzzle, value, coordinate) !== "region conflict") {
        return res.json({valid: true});
      };
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      if (solver.solve(puzzle) === "field missing" ) {
        return res.json({ error: "Required field missing" });
      }
      if (solver.solve(puzzle) === "invalid characters") {
        return res.json({error: "Invalid characters in puzzle"});
      }
      if (solver.solve(puzzle) === "to long or to short") {
        return res.json({error: "Expected puzzle to be 81 characters long"});
      }
      if (solver.solve(puzzle) === "puzzle invalid") {
        return res.json({error: "Puzzle cannot be solved"});
      }
      if (solver.solve(puzzle) === "problem") {
        return res.json({error: "Puzzle cannot be solved"})
      }
      return res.json({solution: solver.solve(puzzle)})
    });
};
