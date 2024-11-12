export class Ball {
    constructor(config) {
        this.config = config;
        this.reset();
    }

    reset() {
        this.x = this.config.CANVAS_WIDTH / 2;
        this.y = this.config.CANVAS_HEIGHT / 2;
        this.radius = this.config.BALL_RADIUS;
        this.dx = this.config.BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
        this.dy = this.config.BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.y - this.radius < 0 || this.y + this.radius > this.config.CANVAS_HEIGHT) {
            this.dy = -this.dy;
        }
    }

    collidesWith(paddle) {
        return this.x + this.radius > paddle.x &&
               this.x - this.radius < paddle.x + paddle.width &&
               this.y + this.radius > paddle.y &&
               this.y - this.radius < paddle.y + paddle.height;
    }
}