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
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        if len(arr[mid]) < len(target):
            right = mid - 1
        elif len(arr[mid]) > len(target):
            left = mid + 1
        else:
            if arr[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
    return -1
target = input("Nhập chuỗi cần tìm: ")
pos = binary_search(arr, target)
if pos != -1:
    print(f"Tìm thấy tại vị trí: {pos}")
else:
    print("Không tìm thấy")