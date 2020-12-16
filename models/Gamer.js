
    //stores the player's name and game score
    class Gamer{
        name;
        score;

        leftTennisRacket;
        rightTennisRacket;
        gameBall;
        gameView;

        constructor(gamerName = 'gamer') {
            const typeString = 'string';
            if(typeof gamerName === typeString) {
                this.name = gamerName;
                this.score = 0;
            } else {
                throw new TypeError('The name of the gamer must be string');
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

        setView(view) {
            const typeObject = 'object';
            if(typeof(view) === typeObject){
                this.gameView = gameView;
            } else {
                throw new TypeError('View must be object type of someView');
            }
        }

        setTennisRacket(tennisRacket, isLeft = true) {
            const typeObject = 'object';
            if(typeof(tennisRacket) === typeObject){
                if(isLeft){
                    this.leftTennisRacket = tennisRacket;
                }
                else {
                    this.rightTennisRacket = tennisRacket;
                }
            } else {
                throw new TypeError('LeftTennisRacket must be object type of TennisRacket');
            }
        }

        setGameBall(gameBall) {
            const typeObject = 'object';
            if(typeof(gameBall) === typeObject){
                this.gameBall = gameBall;
            } else {
                throw new TypeError('GameBall must be object type of GameBall');
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

        increaseScore() {
            const maxScore = 3;
            this.score++;
            this.gameView.updateScore();
            if(this.score === maxScore) {
                this.gameBall.stopMove();
                this.leftTennisRacket.stopMove();
                this.rightTennisRacket.stopMove();
                this.gameView.showWinner();
            }
        }

        destruct() {
            this.leftTennisRacket = null;
            this.rightTennisRacket = null;
            this.gameBall = null;
            this.gameView = null;
        }
    }