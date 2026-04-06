student={
    'Anh':9,
    'An':8.5,
    'Duy':7,
}
def diem_trung_binh(student):
    tong=sum(student.values())
    trung_binh=tong/len(student)
    return trung_binh
print(f"Điểm trung bình của các sinh viên:{diem_trung_binh(student)}")