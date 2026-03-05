numbers = list(map(int, input("Nhập các số : ").split()))
max_num = numbers[0]
min_num = numbers[0]
for num in numbers:
    if num > max_num:
        max_num = num
    if num < min_num:
        min_num = num
print("Giá trị lớn nhất là:", max_num)
print("Giá trị nhỏ nhất là:", min_num)