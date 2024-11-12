export class Paddle {
    constructor(x, y, config) {
        this.x = x;
        this.y = y;
        this.width = config.PADDLE_WIDTH;
        this.height = config.PADDLE_HEIGHT;
        this.dy = 0;
        this.config = config;
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(canvasHeight) {
        this.y += this.dy;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > canvasHeight) {
            this.y = canvasHeight - this.height;
        }
    }
}