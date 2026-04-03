n = int(input("Nhập số lượng phần tử: "))
arr = []
for i in range(n):
    x = int(input(f"Nhập phần tử thứ {i+1}: "))
    arr.append(x)
so_le = [x for x in arr if x % 2 == 1]
print("Các số lẻ:", so_le)
print("Tổng số lượng số lẻ:", len(so_le))
def la_so_nguyen_to(n):
    if n < 2:
        return False
    for i in range(2, n):
        if n % i == 0:
            return False
    return True
so_nguyen_to = [x for x in arr if la_so_nguyen_to(x)]
print("Các số nguyên tố:", so_nguyen_to)