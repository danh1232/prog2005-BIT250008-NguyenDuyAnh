class Hoa:
    def __init__(self, ten, mau):
        self.ten = ten
        self.mau = mau
    def __str__(self):
        return f"Tên: {self.ten}, Màu: {self.mau}"
hoa1 = Hoa("Hoa hồng", "Đỏ")
print(hoa1)