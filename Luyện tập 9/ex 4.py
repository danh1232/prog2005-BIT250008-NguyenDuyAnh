s = input("Nhập chuỗi: ")
upper = 0
lower = 0
digit = 0
special = 0
space = 0
vowel = 0
consonant = 0
vowels = "aeiouAEIOU"
for ch in s:
    if ch.isupper():
        upper += 1
    elif ch.islower():
        lower += 1
    if ch.isdigit():
        digit += 1
    if ch.isspace():
        space += 1
    if ch.isalpha():
        if ch in vowels:
            vowel += 1
        else:
            consonant += 1
    if not ch.isalnum() and not ch.isspace():
        special += 1
print("Chữ in hoa:", upper)
print("Chữ in thường:", lower)
print("Chữ số:", digit)
print("Ký tự đặc biệt:", special)
print("Khoảng trắng:", space)
print("Nguyên âm:", vowel)
print("Phụ âm:", consonant)