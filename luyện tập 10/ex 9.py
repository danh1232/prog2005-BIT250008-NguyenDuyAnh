class Person:
    count = 0
    def __init__(self, name, age):
        self.name = name
        self.age = age
        Person.count += 1
    def get_name(self):
        return self._name
    def set_name(self, value):
        if value == "":
            raise ValueError("Tên không được rỗng")
        self._name = value
    name = property(get_name, set_name)
    @property
    def age(self):
        return self._age
    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Tuổi không hợp lệ")
        self._age = value
    def __str__(self):
        return f"Person({self.name}, {self.age})"
    def say_hello(self):
        return f"Xin chào, tôi là {self.name}"
    @classmethod
    def get_count(cls):
        return cls.count
    @staticmethod
    def is_adult(age):
        return age >= 18
    def __eq__(self, other):
        return self.name == other.name and self.age == other.age
class Student(Person):
    def __init__(self, name, age, score):
        super().__init__(name, age)
        self.score = score
    def __str__(self):
        return f"Student({self.name}, {self.age}, {self.score})"
p1 = Person("An", 20)
p2 = Person("An", 20)
s1 = Student("Bình", 18, 9)
print(p1)
print(s1)
print(p1.say_hello())
print("Số người:", Person.get_count())
print("So sánh:", p1 == p2)
print("Có phải người lớn:", Person.is_adult(20))