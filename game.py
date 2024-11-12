import tkinter as tk
from paddle import Paddle
from ball import Ball

class Game(tk.Canvas):
    def __init__(self, master):
        super().__init__(
            master,
            width=600,
            height=400,
            bg="green",
            highlightthickness=0
        )
        
        self.paddle1 = Paddle(self, 20, 200)
        self.paddle2 = Paddle(self, 560, 200)
        self.ball = Ball(self)
        
        self.score1 = 0
        self.score2 = 0
        self.score_display = self.create_text(
            300, 50, text="0 - 0", fill="white", font=("Arial", 20)
        )
        
        self.bind("<KeyPress>", self.handle_keypress)
        self.bind("<KeyRelease>", self.handle_keyrelease)
        
        self.game_loop()
    
    def handle_keypress(self, event):
        if event.keysym == "w":
            self.paddle1.moving_up = True
        elif event.keysym == "s":
            self.paddle1.moving_down = True
        elif event.keysym == "Up":
            self.paddle2.moving_up = True
        elif event.keysym == "Down":
            self.paddle2.moving_down = True
    
    def handle_keyrelease(self, event):
        if event.keysym == "w":
            self.paddle1.moving_up = False
        elif event.keysym == "s":
            self.paddle1.moving_down = False
        elif event.keysym == "Up":
            self.paddle2.moving_up = False
        elif event.keysym == "Down":
            self.paddle2.moving_down = False
    
    def update_score(self):
        self.itemconfig(self.score_display, text=f"{self.score1} - {self.score2}")
    
    def game_loop(self):
        self.paddle1.move()
        self.paddle2.move()
        self.ball.move()
        
        # Ball collision with paddles
        if self.ball.collides_with(self.paddle1) or self.ball.collides_with(self.paddle2):
            self.ball.dx *= -1
        
        # Ball out of bounds
        if self.ball.x <= 0:
            self.score2 += 1
            self.ball.reset()
        elif self.ball.x >= 600:
            self.score1 += 1
            self.ball.reset()
        
        self.update_score()
        self.after(16, self.game_loop)  # ~60 FPS