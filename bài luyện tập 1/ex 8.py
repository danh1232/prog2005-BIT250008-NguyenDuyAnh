class Student:
    def __init__(self, ten, diem):
        if 0 <= diem <= 10:
            self.ten = ten
            self.diem = diem
        else:
            print("Điểm phải nằm trong khoảng 0 đến 10")
            self.ten = ten
            self.diem = None
sv1 = Student("Duy", 10)
sv2 = Student("Anh", 2)
print(sv1.ten, sv1.diem)
print(sv2.ten, sv2.diem)