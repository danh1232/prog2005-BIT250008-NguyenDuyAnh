n = int(input("Nhập số n: "))
count = 0
for i in range(1, n + 1):
    if n % i == 0:
        count += 1
if count == 2:
    print(n, "là số nguyên tố")
else:
    print(n, "không phải là số nguyên tố")
