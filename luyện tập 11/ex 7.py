import csv
n = int(input("Nhập số nhân viên: "))
employees = []
for i in range(n):
    name = input(f"Tên NV {i+1}: ")
    age = input("Tuổi: ")
    emp_id = input("ID: ")
    employees.append([name, age, emp_id])
with open("nhanvien.txt", "w", encoding="utf-8") as f:
    for emp in employees:
        f.write(f"{emp[0]} - {emp[1]} - {emp[2]}\n")
with open("nhanvien.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["Name", "Age", "ID"])
    writer.writerows(employees)
print("\n--- Nội dung file TXT ---")
with open("nhanvien.txt", "r", encoding="utf-8") as f:
    print(f.read())
print("--- Nội dung file CSV ---")
with open("nhanvien.csv", "r", encoding="utf-8") as f:
    print(f.read())