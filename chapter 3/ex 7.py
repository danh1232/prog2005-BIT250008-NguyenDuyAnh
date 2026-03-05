numbers = list(map(int, input("Nhập các số : ").split()))
target = int(input("Nhập số cần tìm: "))
index = -1
for i in range(len(numbers)):
    if numbers[i] == target:
        index = i
        break
if index != -1:
    print("Số", target, "được tìm thấy ở vị trí:", index)
else:
    print("Không tìm thấy số", target, "trong danh sách")