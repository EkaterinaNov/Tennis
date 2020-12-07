class Gamer{
    name = 'gamer';
    score = 0;

    constructor(gamerName, gamerScore) {
        const typeString = 'string';
        if(typeof gamerName === typeString) {
            this.name = gamerName;
        } else {
            throw new TypeError('The name of the gamer must be string');
        }

        if(Number.isInteger(gamerScore)) {
            this.score = gamerScore;
        } else {
            throw new TypeError('The score of the gamer must be integer');
        }
    }

    setName(gamerName) {
        const typeString = 'string';
        if(typeof gamerName === typeString) {
            this.name = gamerName;
        } else {
            throw new TypeError('The name of the gamer must be string');
        }
    }

    setScore(gamerScore) {
        if(Number.isInteger(gamerScore)) {
            this.score = gamerScore;
        } else {
            throw new TypeError('The score of the gamer must be integer');
        }
    }

    getName() {
        return {name: this.name};
    }

    getScore() {
        return {score: this.score};
    }

    getInfo() {
        return {name: this.name, score: this.score};
    }
}