lst = []
for i in range(5):
    name = input(f"Nhập tên người thứ {i+1}: ")
    lst.append(name)
print("Danh sách ban đầu:", lst)
lst.pop(1)
print("Danh sách sau khi xóa:", lst)