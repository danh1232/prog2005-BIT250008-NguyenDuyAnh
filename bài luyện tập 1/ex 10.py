ma = input("Nhập mã sản phẩm: ")
ten = input("Nhập tên sản phẩm: ")
gia = float(input("Nhập giá: "))
with open("products.txt", "a", encoding="utf-8") as f:
    f.write(f"{ma};{ten};{gia}\n")
products = []
with open("products.txt", "r", encoding="utf-8") as f:
    for line in f:
        ma, ten, gia = line.strip().split(";")
        products.append([ma, ten, float(gia)])
print("Danh sách sản phẩm:")
for p in products:
    print(p[0], p[1], p[2])
products.sort(key=lambda x: x[2], reverse=True)
print("\nSản phẩm sau khi sắp xếp theo giá giảm dần:")
for p in products:
    print(p[0], p[1], p[2])