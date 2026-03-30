class Flower:
    def __init__(self, color):
        self._color = color
    def get_color(self):
        return self._color
    def set_color(self, color):
        self._color = color
f = Flower("red")
print("Màu ban đầu:", f.get_color())
f.set_color("yellow")
print("Màu sau khi đổi:", f.get_color())