def count_vowels(s):
    vowels = "aeiouAEIOU"
    count = 0
    for i in s:
        if i in vowels:
            count =count+1
    return count
x = input("Nhập chuỗi: ")
print("Số nguyên âm:", count_vowels(x))