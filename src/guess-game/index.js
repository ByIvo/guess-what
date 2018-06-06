class GuessGame {

    constructor(arrSecretValues) {
        this.arrSecretValues = arrSecretValues;
        this.guesses = [];
        this._validateSecretValues();
    }

    getSecretValues() {
        return this.arrSecretValues;
    }

    getGuesses() {
        return this.guesses;
    }

    guess(guessValues) {
        const contained = this.countContainedValues(guessValues);
        const rightPositioned = this.countRightPositionedValues(guessValues);

        const guessResult = {
            guessValues: guessValues,
            contained: contained,
            rightPositioned: rightPositioned
        };

        this.guesses.push(guessResult);
        return guessResult;
    }

    countContainedValues(guessValues) {
        let count = 0;

        for (let i = 0; i < guessValues.length; i++) {
            const guessValue = guessValues[i];
            
            if(this.arrSecretValues.indexOf(guessValue) > -1) {
                count++;
            }
        }

        return count;
    }

    countRightPositionedValues(guessValues) {
        let count = 0;
        for (let i = 0; i < guessValues.length; i++) {
            const guessValue = guessValues[i];
            
            if(this.arrSecretValues[i] === guessValue) {
                count++;
            }
        }

        return count;
    }

    _validateSecretValues () {
        const hasRepeatedValue = this.doSecretValuesHaveRepetition();

        if(hasRepeatedValue) {
            throw new Error(`The value ${this.arrSecretValues} contains a repeated digit and It turns this game into an invalid one.`)
        }
    }

    doSecretValuesHaveRepetition() {
        const lastIndex = this.arrSecretValues.length;
        for(let i=0; i < lastIndex; i++) {
            for(let j= i + 1; j < lastIndex; j++) {
                if(this.arrSecretValues[i] == this.arrSecretValues[j]) {
                    return true;
                }
            }
        }

        return false;
    }
}

module.exports = GuessGame;