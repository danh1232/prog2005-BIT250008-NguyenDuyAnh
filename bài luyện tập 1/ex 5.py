import random
m = int(input("Nhập số hàng M: "))
n = int(input("Nhập số cột N: "))
matrix = []
for i in range(m):
    row = []
    for j in range(n):
        row.append(random.randint(1, 1000))
    matrix.append(row)
print("Ma trận:")
for row in matrix:
    print(row)
hang = int(input("Nhập số hàng cần xem (1 → M): "))
print("Hàng", hang, ":", matrix[hang-1])
cot = int(input("Nhập số cột cần xem (1 → N): "))
print("Cột", cot, ":")
for i in range(m):
    print(matrix[i][cot-1])
max_value = matrix[0][0]
for row in matrix:
    for value in row:
        if value > max_value:
            max_value = value
print("Giá trị lớn nhất trong ma trận:", max_value)