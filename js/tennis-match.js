export class TennisMatch {
    constructor(player1, player2, bestOfSets = 3) {
        this.player1 = player1;
        this.player2 = player2;
        this.bestOfSets = bestOfSets;
        this.setsToWin = Math.ceil(bestOfSets / 2);
        this.setHistory = [];
        this.currentSet = 1;
        this.reset();
    }

    reset() {
        this.points = { [this.player1]: 0, [this.player2]: 0 };
        this.games = { [this.player1]: 0, [this.player2]: 0 };
        this.sets = { [this.player1]: 0, [this.player2]: 0 };
        this.winner = null;
        this.advantage = null;
        this.deuce = false;
        this.tiebreak = false;
        this.tiebreakPoints = { [this.player1]: 0, [this.player2]: 0 };
        this.setHistory = [];
        this.currentSet = 1;
    }

    getPointsDisplay(player) {
        if (this.tiebreak) {
            return this.tiebreakPoints[player];
        }
        
        if (this.deuce) {
            if (this.advantage === player) {
                return "AD";
            } else if (this.advantage === null) {
                return "40";
            } else {
                return "40";
            }
        }

        const pointsMap = {
            0: '0',
            1: '15',
            2: '30',
            3: '40'
        };
        return pointsMap[this.points[player]] || '40';
    }

    addPoint(player) {
        if (this.winner) return;

        const opponent = player === this.player1 ? this.player2 : this.player1;

        if (this.tiebreak) {
            this.tiebreakPoints[player]++;
            if (this.tiebreakPoints[player] >= 7 && 
                this.tiebreakPoints[player] >= this.tiebreakPoints[opponent] + 2) {
                this.winGame(player);
            }
            return;
        }

        if (this.deuce) {
            if (player === this.advantage) {
                this.winGame(player);
            } else if (this.advantage === null) {
                this.advantage = player;
            } else {
                this.advantage = null;
            }
            return;
        }

        this.points[player]++;

        // Check for deuce
        if (this.points[player] >= 3 && this.points[opponent] >= 3) {
            if (this.points[player] === this.points[opponent]) {
                this.deuce = true;
                this.points[player] = 3;
                this.points[opponent] = 3;
                return;
            }
        }

        // Check for game win
        if (this.points[player] >= 4 && this.points[player] >= this.points[opponent] + 2) {
            this.winGame(player);
        }
    }

    winGame(player) {
        this.games[player]++;
        this.points = { [this.player1]: 0, [this.player2]: 0 };
        this.deuce = false;
        this.advantage = null;

        const opponent = player === this.player1 ? this.player2 : this.player1;

        // Check for tiebreak at 6-6
        if (this.games[player] === 6 && this.games[opponent] === 6) {
            this.tiebreak = true;
            this.tiebreakPoints = { [this.player1]: 0, [this.player2]: 0 };
            return;
        }

        // Check for set win
        if ((this.games[player] >= 6 && this.games[player] >= this.games[opponent] + 2) ||
            (this.tiebreak && this.games[player] === 7)) {
            this.winSet(player);
        }
    }

    winSet(player) {
        const opponent = player === this.player1 ? this.player2 : this.player1;
        
        // Record set history
        this.setHistory.push({
            setNumber: this.currentSet,
            [this.player1]: this.games[this.player1],
            [this.player2]: this.games[this.player2],
            tiebreak: this.tiebreak ? 
                `${this.tiebreakPoints[this.player1]}-${this.tiebreakPoints[this.player2]}` : 
                null
        });

        this.sets[player]++;
        this.games = { [this.player1]: 0, [this.player2]: 0 };
        this.tiebreak = false;
        this.tiebreakPoints = { [this.player1]: 0, [this.player2]: 0 };
        this.currentSet++;

        // Check for match win
        if (this.sets[player] >= this.setsToWin) {
            this.winner = player;
        }
    }

    getStatus() {
        if (this.winner) {
            return `${this.winner} venceu a partida!`;
        }
        if (this.tiebreak) {
            return `Tiebreak: ${this.tiebreakPoints[this.player1]} - ${this.tiebreakPoints[this.player2]}`;
        }
        if (this.deuce) {
            return this.advantage ? `Vantagem para ${this.advantage}` : 'Deuce';
        }
        return '';
    }

    getScore(player) {
        return {
            points: this.getPointsDisplay(player),
            games: this.games[player],
            sets: this.sets[player]
        };
    }

    getSetHistory() {
        return this.setHistory;
    }
}