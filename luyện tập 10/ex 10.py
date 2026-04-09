arr = []
for i in range(5):
    arr.append(input(f"Nhập chuỗi {i+1}: "))
n = len(arr)
for i in range(n):
    for j in range(0, n - i - 1):
        if len(arr[j]) < len(arr[j + 1]):
            arr[j], arr[j + 1] = arr[j + 1], arr[j]
        print(f"Bước {i}-{j}: {arr}")
print("Kết quả:", arr)