class SinhVien:
    def __init__(self, score):
        self.score = score
    def __eq__(self, other):
        return self.score == other.score
sv1 = SinhVien(8)
sv2 = SinhVien(10)
print(sv1 == sv2)
