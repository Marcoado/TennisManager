import random

class Ball:
    def __init__(self, canvas):
        self.canvas = canvas
        self.reset()
        self.shape = canvas.create_oval(
            self.x - self.radius,
            self.y - self.radius,
            self.x + self.radius,
            self.y + self.radius,
            fill="white"
        )
    
    def reset(self):
        self.x = 300
        self.y = 200
        self.radius = 10
        self.speed = 5
        self.dx = self.speed * random.choice([-1, 1])
        self.dy = self.speed * random.choice([-1, 1])
    
    def move(self):
        self.x += self.dx
        self.y += self.dy
        
        # Bounce off top and bottom
        if self.y <= self.radius or self.y >= 400 - self.radius:
            self.dy *= -1
        
        self.canvas.coords(
            self.shape,
            self.x - self.radius,
            self.y - self.radius,
            self.x + self.radius,
            self.y + self.radius
        )
    
    def collides_with(self, paddle):
        paddle_coords = self.canvas.coords(paddle.shape)
        ball_coords = self.canvas.coords(self.shape)
        
        return (
            ball_coords[2] >= paddle_coords[0] and
            ball_coords[0] <= paddle_coords[2] and
            ball_coords[3] >= paddle_coords[1] and
            ball_coords[1] <= paddle_coords[3]
        )