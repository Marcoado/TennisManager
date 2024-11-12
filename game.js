const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 80;
const BALL_RADIUS = 10;
const PADDLE_SPEED = 5;
const BALL_SPEED = 5;

class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = PADDLE_WIDTH;
        this.height = PADDLE_HEIGHT;
        this.dy = 0;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.y += this.dy;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
        }
    }
}

class Ball {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = BALL_RADIUS;
        this.dx = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
        this.dy = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off top and bottom
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
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

const paddle1 = new Paddle(0, canvas.height/2 - PADDLE_HEIGHT/2);
const paddle2 = new Paddle(canvas.width - PADDLE_WIDTH, canvas.height/2 - PADDLE_HEIGHT/2);
const ball = new Ball();
let score1 = 0;
let score2 = 0;

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${score1} - ${score2}`, canvas.width/2, 30);
}

function update() {
    // Clear canvas
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Move paddles
    paddle1.move();
    paddle2.move();

    // Move ball
    ball.move();

    // Check collisions
    if (ball.collidesWith(paddle1) || ball.collidesWith(paddle2)) {
        ball.dx = -ball.dx;
    }

    // Check scoring
    if (ball.x < 0) {
        score2++;
        ball.reset();
    } else if (ball.x > canvas.width) {
        score1++;
        ball.reset();
    }

    // Draw everything
    paddle1.draw();
    paddle2.draw();
    ball.draw();
    drawScore();

    requestAnimationFrame(update);
}

// Controls
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w': paddle1.dy = -PADDLE_SPEED; break;
        case 's': paddle1.dy = PADDLE_SPEED; break;
        case 'ArrowUp': paddle2.dy = -PADDLE_SPEED; break;
        case 'ArrowDown': paddle2.dy = PADDLE_SPEED; break;
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'w': case 's': paddle1.dy = 0; break;
        case 'ArrowUp': case 'ArrowDown': paddle2.dy = 0; break;
    }
});

// Start the game
update();