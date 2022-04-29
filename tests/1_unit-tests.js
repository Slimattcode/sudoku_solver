const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
    test("Valid String of 81 characters", () => {
        assert.equal(solver.validate('135762984946381257728459613694517832812936745357824196473298561581673429269145378', "1", "A1"), 
            "valid");
    });
    test("String with invalid characters", () => {
        assert.equal(solver.validate('135762984946381257728459613694517832812936745357824196473298561581673k29269145378'), "invalid characters");
    });
    test("String is not 81 characters long", () => {
        assert.equal(solver.validate('13576298494638125772845961369451783281293674535782419647329856158167342926914537'), "to long or to short");
    });
    test("Valid row placement", () => {
        assert.equal(solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', "3", "A2"), 
            undefined);
    });
    test("Invalid row placement", () => {
        assert.equal(solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', "1", "A2"), 
            "row conflict");
    });
    test("Valid col placement", () => {
        assert.equal(solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', "3", "A2"), 
            undefined);
    });
    test("Invalid col placement", () => {
        assert.equal(solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', "3", "A1"), 
            "column conflict");
    });
    test("Valid region placement", () => {
        assert.equal(solver.checkRegionPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 
        "3", "A2"), undefined);
    });
    test("Invalid region placement", () => {
        assert.equal(solver.checkRegionPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',  
        "3", "D3"), "region conflict");
    });
    test("Valid string in solver", () => {
        assert.equal(solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), 
         '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
    });
    test("Invalid string in solver", () => {
        assert.equal(solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.379'), 
        "problem");
    });
    test("Expected solution for an incomplete puzzle", () => {
        assert.equal(solver.solve('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'),
         '769235418851496372432178956174569283395842761628713549283657194516924837947381625');
    });
});
