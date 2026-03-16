class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    @classmethod
    def from_string(cls, data):
        name, age = data.split("-")
        return cls(name, int(age))
p = Person.from_string("Nam-20")
print(p.name)
print(p.age)

