numbers = list(map(int, input("Nhập các số : ").split()))
found = False
for num in numbers:
    if num > 10:
        print("Số đầu tiên lớn hơn 10 là:", num)
        found = True
        break
if not found:
    print("Không có số nào lớn hơn 10 trong danh sách")