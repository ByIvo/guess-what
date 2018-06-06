'use strict';

const chai = require('chai');
const expect = chai.expect;

const sinon = require('sinon');

const GuessGame = require('./');

describe("Tests the main game", () => {

    it("Should create a game with secret values", () => {
       const guessGame = new GuessGame([1,2,3,4]);
       
       expect(guessGame.getSecretValues()).to.deep.equal([1,2,3,4]);
    });

    it("An error must be throw if any digit is repeated in secret values", () => {
        expect(() => {
            const guessGame = new GuessGame([1,1,3,4]);
        }).to.throw(`The value 1,1,3,4 contains a repeated digit and It turns this game into an invalid one.`);
    });

    it("Should guess the secret values and get the proper answer", () => {
        const guessGame = new GuessGame([1,2,3,4]);
        const guessResult = guessGame.guess([1,3,2,4]);

        const expectedResult = buildGuessResult([1,3,2,4], 4, 2);

        expect(guessResult).to.deep.equal(expectedResult);
    });

    it("When no guess value is on secret values, an 0/0 should be answered", () => {
        const guessGame = new GuessGame([5,6,7,8]);
        const guessResult = guessGame.guess([1,3,2,4]);

        const expectedResult = buildGuessResult([1,3,2,4], 0, 0);

        expect(guessResult).to.deep.equal(expectedResult);
    });

    it("Every guess should be registered and retrived", () => {
        const guessGame = new GuessGame([1,2,3,4]);

        guessGame.guess([5,6,8,9]);
        guessGame.guess([1,2,4,3]);
        guessGame.guess([1,2,3,4]);

        const gameGuesses = guessGame.getGuesses();
        
        const expectedGameGuesses = [
            buildGuessResult([5,6,8,9], 0, 0),
            buildGuessResult([1,2,4,3], 4, 2),
            buildGuessResult([1,2,3,4], 4, 4)
        ];

        expect(gameGuesses).to.deep.equal(expectedGameGuesses);
    });

});

const buildGuessResult = (guessValues, contained, rightPositioned) => {
    return {
        guessValues: guessValues,
        contained: contained,
        rightPositioned: rightPositioned
    };
}