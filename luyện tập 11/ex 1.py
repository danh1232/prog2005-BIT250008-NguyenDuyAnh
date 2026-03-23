arr = []
for i in range(5):
    s = input(f"Nhập chuỗi thứ {i+1}: ")
    arr.append(s)
print("\nBan đầu:", arr)
for i in range(1, len(arr)):
    key = arr[i]
    j = i - 1
    print(f"\nBước {i}:")
    print("Key =", key)
    while j >= 0 and len(arr[j]) < len(key):
        arr[j + 1] = arr[j]
        j -= 1
        print("  Dịch chuyển:", arr)
    arr[j + 1] = key
    print("  Chèn key:", arr)
print("\nKết quả cuối cùng:", arr)