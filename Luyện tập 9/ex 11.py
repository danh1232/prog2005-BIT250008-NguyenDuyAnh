class SinhVien:
    count = 0
    def __init__(self, name):
        self.name = name
        SinhVien.count += 1
    @classmethod
    def dem_so_sinh_vien(cls):
        return cls.count
sv1 = SinhVien("Nam")
sv2 = SinhVien("An")
sv3 = SinhVien("Lan")
print("Số sinh viên đã tạo:", SinhVien.dem_so_sinh_vien())