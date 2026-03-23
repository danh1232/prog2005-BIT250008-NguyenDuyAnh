def average_score(d):
    if len(d) == 0:
        return 0
    return sum(d.values()) / len(d)
n = int(input("Nhập số sinh viên: "))
students = {}
for i in range(n):
    name = input(f"Tên sinh viên {i+1}: ")
    score = float(input("Điểm: "))
    students[name] = score
avg = average_score(students)
print("Dictionary:", students)
print("Điểm trung bình:", avg)