export class Game {
    constructor(canvas, config) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.config = config;
        this.score1 = 0;
        this.score2 = 0;
    }

    drawScore() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${this.score1} - ${this.score2}`, this.canvas.width/2, 30);
    }

    clear() {
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    checkScore(ball) {
        if (ball.x < 0) {
            this.score2++;
            return true;
        } else if (ball.x > this.canvas.width) {
            this.score1++;
            return true;
        }
        return false;
    }
}