class Animal:
    def __init__(self, name):
        self.name = name
    def sound(self):
        print("Animal makes a sound")
class Dog(Animal):
    def __init__(self, name):
        super().__init__(name)
    def sound(self):
        print("Gâu gâu ")
d = Dog("Bông")
print("Name:", d.name)
d.sound()