def count_vowels(s):
    vowels = "a,e,i,o,u"
    count = 0
    for char in s.lower():
        if char in vowels:
            count += 1
    return count
text = input("Nhập một chuỗi: ")
print("Số nguyên âm trong chuỗi là:", count_vowels(text))