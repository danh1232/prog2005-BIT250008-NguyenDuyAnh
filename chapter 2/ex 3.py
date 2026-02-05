n = int(input("Nhập một số nguyên dương n: "))
a, b = 0, 1
if n <= 0:
    print("Vui lòng nhập một số nguyên dương.")
else:
    print("Dãy Fibonacci đầu tiên là:")
    for i in range(n):
        print(a, end=' ')
        a, b = b, a + b
