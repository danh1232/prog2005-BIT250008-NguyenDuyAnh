def gcd(a, b):
    while b != 0:
        a, b = b, a % b  # Cập nhật a và b
    return a
num1 = int(input("Nhập số nguyên dương đầu tiên: "))
num2 = int(input("Nhập số nguyên dương thứ hai: "))
result = gcd(num1, num2)
print(f"Ước số chung lớn nhất của {num1} và {num2} là: {result}")