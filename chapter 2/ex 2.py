number = int(input("Nhập một số dương: "))
def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True
if is_prime(number):
    print(f"{number} là số nguyên tố.")
else:
    print(f"{number} không phải là số nguyên tố.")