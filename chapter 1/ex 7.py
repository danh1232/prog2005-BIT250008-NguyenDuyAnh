# Nhập vào ba số
a = int(input("Nhập số thứ nhất: "))
b = int(input("Nhập số thứ hai: "))
c = int(input("Nhập số thứ ba: "))

# Kiểm tra và tìm số lớn nhất
if a >= b and a >= c:
    print("Số lớn nhất là:", a)
elif b >= a and b >= c:
    print("Số lớn nhất là:", b)
else:
    print("Số lớn nhất là:", c)
