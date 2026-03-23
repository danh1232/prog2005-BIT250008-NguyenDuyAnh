d = {}
n = int(input("Nhập số người: "))
for i in range(n):
    name = input(f"Nhập tên người {i+1}: ")
    age = int(input(f"Nhập tuổi của {name}: "))
    d[name] = age
print("Dictionary:", d)
avg_age = sum(d.values()) / len(d) if d else 0
print("Tuổi trung bình:", avg_age)