const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite("POST /api/solve", () => {
        test("Solve puzzle with valid puzzle string", (done) => {
            chai
            .request(server)
            .post("/api/solve")
            .send({
                puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.solution, "568913724342687519197254386685479231219538467734162895926345178473891652851726943")
                done();
            })
        })

        test("Solve puzzle with missing puzzle string", (done) => {
            chai
            .request(server)
            .post("/api/solve")
            .send({
                puzzle: "",
                coordinate: "A2",
                value: "3"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.error, 'Required field missing');
                done();
            })
        })

        test("Solve puzzle with invalid characters", (done) => {
            chai
            .request(server)
            .post("/api/solve")
            .send({
                puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4..k..5.2....L..4..8916..85.72...3'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.error, "Invalid characters in puzzle")
                done();
            })
        })

        test("Solve puzzle with incorrect length", (done) => {
            chai
            .request(server)
            .post("/api/solve")
            .send({
                puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.error, "Expected puzzle to be 81 characters long")
                done();
            })
        })

        test("Solve puzzle that cannot be solved", (done) => {
            chai
            .request(server)
            .post("/api/solve")
            .send({
                puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...4'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.error, "Puzzle cannot be solved")
                done();
            })
        })
    })
    suite("Post /api/check", () => {
        test("Puzzle placement with all fields", (done) => {
            chai
            .request(server)
            .post("/api/check")
            .send({
                puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                coordinate: "A2",
                value: "3"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.valid, true);
                done();
            })
        })

        test("Puzzle placement with single placement conflict", (done) => {
            chai
            .request(server)
            .post("/api/check")
            .send({
                puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                coordinate: "A2",
                value: "4"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.valid, false);
                assert.deepEqual(res.body.conflict, [ 'row' ]);
                done();
            })
        })

        test("Puzzle placement with multiple placement conflict", (done) => {
            chai
            .request(server)
            .post("/api/check")
            .send({
                puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                coordinate: "E2",
                value: "6"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.valid, false);
                assert.deepEqual(res.body.conflict, [ 'row', 'column' ]);
                done();
            })
        })

        test("Puzzle placement with all placement conflict", (done) => {
            chai
            .request(server)
            .post("/api/check")
            .send({
                puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                coordinate: "E2",
                value: "7"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.valid, false);
                assert.deepEqual(res.body.conflict, [ 'row', 'column', "region" ]);
                done();
            })
        })

        test("Puzzle placement with missing required fields", (done) => {
            chai
            .request(server)
            .post("/api/check")
            .send({
                puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                coordinate: "",
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.error, "Required field(s) missing");
                done();
            })
        })

        test("Puzzle placement with invalid characters", (done) => {
            chai
            .request(server)
            .post("/api/check")
            .send({
                puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16.k..926914.37.",
                coordinate: "A2",
                value: "3"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.error, "Invalid characters in puzzle");
                done();
            })
        })

        test("Puzzle placement with incorrect length", (done) => {
            chai
            .request(server)
            .post("/api/check")
            .send({
                puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37",
                coordinate: "A2",
                value: "3"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
                done();
            })
        })

        test("Puzzle placement with invalid placement coordinate", (done) => {
            chai
            .request(server)
            .post("/api/check")
            .send({
                puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                coordinate: "A10",
                value: "3"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.error, "Invalid coordinate");
                done();
            })
        })

        test("Puzzle placement with invalid placement value", (done) => {
            chai
            .request(server)
            .post("/api/check")
            .send({
                puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                coordinate: "A2",
                value: "10"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.error, "Invalid value");
                done();
            })
        })

    })
});