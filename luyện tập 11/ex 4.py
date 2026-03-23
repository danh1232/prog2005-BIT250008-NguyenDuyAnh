import math
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True
arr = list(map(int, input("Nhập danh sách số nguyên: ").split()))
x = int(input("Nhập phần tử cần thêm: "))
arr.append(x)
print("Sau khi thêm:", arr)
k = int(input("Nhập giá trị k: "))
count = arr.count(k)
print(f"Số lần xuất hiện của {k}:", count)
prime_sum = sum(i for i in arr if is_prime(i))
print("Tổng các số nguyên tố:", prime_sum)
arr.sort()
print("Danh sách sau khi sắp xếp:", arr)
arr.clear()
print("Danh sách sau khi xóa:", arr)