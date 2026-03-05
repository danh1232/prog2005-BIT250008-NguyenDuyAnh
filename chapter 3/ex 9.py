numbers = list(map(int, input("Nhập các số : ").split()))
print("Các số lẻ trong danh sách là:")
for num in numbers:
    if num % 2 != 0:
        print(num)