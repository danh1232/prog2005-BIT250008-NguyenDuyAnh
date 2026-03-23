arr = list(map(int, input("Nhập danh sách số: ").split()))
even_numbers = [x for x in arr if x % 2 == 0]
total = sum(even_numbers)
print("Các số chẵn:", even_numbers)
print("Tổng các số chẵn:", total)