m = int(input("Nhập số hàng: "))
n = int(input("Nhập số cột: "))
print("Nhập ma trận A:")
A = []
for i in range(m):
    row = list(map(int, input().split()))
    A.append(row)
print("Nhập ma trận B:")
B = []
for i in range(m):
    row = list(map(int, input().split()))
    B.append(row)
C = []
for i in range(m):
    row = []
    for j in range(n):
        row.append(A[i][j] + B[i][j])
    C.append(row)
print("Ma trận tổng:")
for row in C:
    print(row)