import tkinter as tk
from game import Game
from paddle import Paddle
from ball import Ball

def main():
    root = tk.Tk()
    root.title("Tennis Game")
    root.resizable(False, False)
    
    game = Game(root)
    game.pack()
    game.focus_set()
    
    root.mainloop()

if __name__ == "__main__":
    main()