number = input("Nhập một số nguyên: ")
total = 0
for digit in number:
    total += int(digit)
print(f"Tổng các chữ số của số {number} là: {total}")