s = input("Nhập chuỗi số: ")
parts = s.split(";")
numbers = []
for x in parts:
    numbers.append(int(x.strip()))
print("Các số:")
for n in numbers:
    print(n)
count_even = 0
for n in numbers:
    if n % 2 == 0:
        count_even += 1
print("Số chẵn:", count_even)
count_negative = 0
for n in numbers:
    if n < 0:
        count_negative += 1
print("Số âm:", count_negative)
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True
count_prime = 0
for n in numbers:
    if is_prime(n):
        count_prime += 1
print("Số nguyên tố:", count_prime)
avg = sum(numbers) / len(numbers)
print("Giá trị trung bình:", avg)