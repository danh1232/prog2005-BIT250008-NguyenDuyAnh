numbers = list(map(int, input("Nhập các số : ").split()))
sum_even = 0
print("Các số chẵn trong danh sách là:")
for num in numbers:
    if num % 2 == 0:
        print(num)
        sum_even += num
print("Tổng các số chẵn là:", sum_even)