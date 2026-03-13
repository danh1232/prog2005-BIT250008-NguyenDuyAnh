class Student:
    def __init__(self, ten, diem):
        if 0 <= diem <= 10:
            self.ten = ten
            self.diem = diem
        else:
            print("Điểm phải nằm trong khoảng 0 đến 10")
            self.ten = ten
            self.diem = None
    def display(self):
        print(f"Sinh viên {self.ten} có điểm là {self.diem}")
sv1 = Student("Anh", 7)
sv2 = Student("Duy", 5.5)
sv1.display()
sv2.display()