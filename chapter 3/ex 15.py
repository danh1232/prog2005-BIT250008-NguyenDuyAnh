s = input("Nhập một chuỗi: ")
reverse1 = s[::-1]
print("Đảo chuỗi bằng slicing:", reverse1)
reverse2 = ""
for char in s:
    reverse2 = char + reverse2
print("Đảo chuỗi không dùng slicing:", reverse2)