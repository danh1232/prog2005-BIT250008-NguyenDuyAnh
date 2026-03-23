def input_matrix(rows, cols, name):
    matrix = []
    print(f"\nNhập ma trận {name}:")
    for i in range(rows):
        row = []
        for j in range(cols):
            val = input(f"Phần tử [{i}][{j}]: ").strip()
            if val == "":
                raise ValueError("Lỗi: Không được nhập giá trị trống!")
            row.append(float(val))
        matrix.append(row)
    return matrix
rows = int(input("Nhập số hàng: "))
cols = int(input("Nhập số cột: "))
try:
    A = input_matrix(rows, cols, "A")
    B = input_matrix(rows, cols, "B")
    C = []
    for i in range(rows):
        row = []
        for j in range(cols):
            row.append(A[i][j] + B[i][j])
        C.append(row)
    print("\nMa trận tổng:")
    for r in C:
        print(r)
except ValueError as e:
    print(e)