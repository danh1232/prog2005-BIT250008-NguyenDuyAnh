x = int(input("Nhập điểm môn thứ nhất:"))
y = int(input("Nhập điểm môn thứ hai:"))
z = int(input("Nhập điểm môn thứ ba:"))
trung_binh = (x+y+z)/3
print("Điểm trung bình:",trung_binh)
if trung_binh>=8:
    print("Xếp loại giỏi")
elif trung_binh>=6.5:
    print("Xếp loại khá")
elif trung_binh>=5.0:
    print("Xếp loại trung bình")
else :
    print("Xếp loại yếu")