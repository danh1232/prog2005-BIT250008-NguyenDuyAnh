class Student:
    def __init__(self, ten, diem):
        self.ten = ten
        self.diem = diem
sv1 = Student("Duy", 9)
sv2 = Student("Anh", 8.5)
print("Sinh viên 1:", sv1.ten, sv1.diem)
print("Sinh viên 2:", sv2.ten, sv2.diem)