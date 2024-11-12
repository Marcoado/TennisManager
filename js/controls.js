export class Controls {
    constructor(paddle1, paddle2, config) {
        this.paddle1 = paddle1;
        this.paddle2 = paddle2;
        this.config = config;
        this.setupControls();
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'w': this.paddle1.dy = -this.config.PADDLE_SPEED; break;
                case 's': this.paddle1.dy = this.config.PADDLE_SPEED; break;
                case 'ArrowUp': this.paddle2.dy = -this.config.PADDLE_SPEED; break;
                case 'ArrowDown': this.paddle2.dy = this.config.PADDLE_SPEED; break;
            }
        });

        document.addEventListener('keyup', (e) => {
            switch(e.key) {
                case 'w': case 's': this.paddle1.dy = 0; break;
                case 'ArrowUp': case 'ArrowDown': this.paddle2.dy = 0; break;
            }
        });
    }
}