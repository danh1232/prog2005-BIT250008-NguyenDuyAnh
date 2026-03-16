class SinhVien:
    count = 0
    def __init__(self, name):
        self.name = name
        SinhVien.count += 1
    @classmethod
    def dem_so_sinh_vien(cls):
        return cls.count
sv1 = SinhVien("Danh")
sv2 = SinhVien("Anh")
sv3 = SinhVien("Vinh")
print("Số sinh viên đã tạo:", SinhVien.dem_so_sinh_vien())