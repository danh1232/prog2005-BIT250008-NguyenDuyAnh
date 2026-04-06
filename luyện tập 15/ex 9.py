def save_to_file():
    s = input("Nhập chuỗi: ")
    with open("output.txt", "w", encoding="utf-8") as f:
        f.write(s)
save_to_file()