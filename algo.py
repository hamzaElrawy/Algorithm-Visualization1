import random
import time
from tkinter import Tk, Canvas


WINDOW_WIDTH = 800
WINDOW_HEIGHT = 400
BAR_WIDTH = 10
DELAY = 0.1

class SortVisualizer:
    def __init__(self):
        self.window = Tk()
        self.window.title("Sort Visualizer")
        self.canvas = Canvas(self.window, width=WINDOW_WIDTH, height=WINDOW_HEIGHT, bg="#2c3e50")
        self.canvas.pack()
        self.array = []
        self.bars = []

    def generate_array(self, size=50):

        self.array = [random.randint(10, WINDOW_HEIGHT - 10) for _ in range(size)]
        self.draw_array()

    def draw_array(self, highlight_indices=[]):
        self.canvas.delete("all")
        for i, value in enumerate(self.array):
            x0 = i * BAR_WIDTH
            y0 = WINDOW_HEIGHT - value
            x1 = x0 + BAR_WIDTH
            y1 = WINDOW_HEIGHT
            color = "#2ecc71" if i not in highlight_indices else "#e74c3c"
            self.canvas.create_rectangle(x0, y0, x1, y1, fill=color, outline="")
        self.window.update_idletasks()

    def bubble_sort(self):
        for i in range(len(self.array)):
            for j in range(len(self.array) - i - 1):
                self.draw_array(highlight_indices=[j, j + 1])
                time.sleep(DELAY)
                if self.array[j] > self.array[j + 1]:
                    self.array[j], self.array[j + 1] = self.array[j + 1], self.array[j]
        self.draw_array()

    def selection_sort(self):
        for i in range(len(self.array)):
            min_idx = i
            for j in range(i + 1, len(self.array)):
                self.draw_array(highlight_indices=[i, j])
                time.sleep(DELAY)
                if self.array[j] < self.array[min_idx]:
                    min_idx = j
            self.array[i], self.array[min_idx] = self.array[min_idx], self.array[i]
        self.draw_array()

    def insertion_sort(self):
        for i in range(1, len(self.array)):
            key = self.array[i]
            j = i - 1
            while j >= 0 and self.array[j] > key:
                self.array[j + 1] = self.array[j]
                self.draw_array(highlight_indices=[j, j + 1])
                time.sleep(DELAY)
                j -= 1
            self.array[j + 1] = key
        self.draw_array()

    def run(self):
        self.generate_array(size=50)
        algorithms = {
            "1": ("Bubble Sort", self.bubble_sort),
            "2": ("Selection Sort", self.selection_sort),
            "3": ("Insertion Sort", self.insertion_sort)
        }

        print("Choose an algorithm:")
        for key, (name, _) in algorithms.items():
            print(f"{key}: {name}")
        choice = input("Enter your choice: ")

        if choice in algorithms:
            print(f"Running {algorithms[choice][0]}...")
            algorithms[choice][1]()
        else:
            print("Invalid choice. Exiting.")

        self.window.mainloop()


if __name__ == "__main__":
    visualizer = SortVisualizer()
    visualizer.run()
