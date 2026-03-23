def process_tuple(t):
    total = sum(t)
    maximum = max(t)
    minimum = min(t)
    return total, maximum, minimum
t = tuple(map(int, input("Nhập các số nguyên: ").split()))
total, maximum, minimum = process_tuple(t)
print("Tổng:", total)
print("Giá trị lớn nhất:", maximum)
print("Giá trị nhỏ nhất:", minimum)