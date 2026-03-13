n = int(input("Nhập số: "))
if 1 <= n <= 9:
    for i in range(1, 10):
        print(n, "x", i, "=", n * i)
else:
    print("Số phải nằm trong khoảng 1 đến 9")