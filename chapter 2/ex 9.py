n = int(input("Nhập số nguyên dương 5 chữ số: "))
max = 0
while n > 0:
    digit = n % 10
    if digit > max:
        max = digit
    n //= 10
print("Chữ số lớn nhất là:", max)
