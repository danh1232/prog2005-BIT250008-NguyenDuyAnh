s = input("Nhập chuỗi: ")
ch = input("Nhập ký tự cần đếm: ")
count = 0
for i in s:
    if i == ch:
        count += 1
print(f"Ký tự '{ch}' xuất hiện {count} lần")