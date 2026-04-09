while True:
    print("\n--- MENU ---")
    print("1. Bài 2")
    print("2. Bài 3")
    print("3. Thoát")
    choice = input("Chọn: ")
    if choice == "1":
        s = input("Nhập chuỗi: ")
        ch = input("Nhập ký tự: ")
        print(s.count(ch))
    elif choice == "2":
        def gt(n):
            return 1 if n <= 1 else n * gt(n - 1)
        n = int(input("Nhập n: "))
        print(gt(n))
    elif choice == "3":
        break
    else:
        print("Chọn sai!")