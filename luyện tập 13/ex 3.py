i = 1
tong = 0
while i <= 30:
    if i % 2 != 0:
        print(i, end=" ")
        tong += i
    i += 1
print("\nTổng các số lẻ:", tong)