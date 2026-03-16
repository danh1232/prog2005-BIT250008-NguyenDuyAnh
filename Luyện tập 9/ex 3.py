name = input("Nhập tên: ")
name = name.strip()
words = name.split()
result = []
for w in words:
    result.append(w.capitalize())
name = " ".join(result)
print(name)