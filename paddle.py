class Paddle:
    def __init__(self, canvas, x, y):
        self.canvas = canvas
        self.x = x
        self.y = y
        self.width = 20
        self.height = 80
        self.speed = 5
        self.moving_up = False
        self.moving_down = False
        
        self.shape = canvas.create_rectangle(
            x, y,
            x + self.width,
            y + self.height,
            fill="white"
        )
    
    def move(self):
        if self.moving_up and self.y > 0:
            self.y -= self.speed
        if self.moving_down and self.y < 400 - self.height:
            self.y += self.speed
        
        self.canvas.coords(
            self.shape,
            self.x, self.y,
            self.x + self.width,
            self.y + self.height
        )