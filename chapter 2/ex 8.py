def reverse_number(num):
    reversed_num = 0
    while num > 0:
        digit = num % 10
        reversed_num = reversed_num * 10 + digit
        num //= 10
    return reversed_num
user_input = int(input("Nhập một số nguyên dương: "))
result = reverse_number(user_input)
print(f"Số đảo ngược của {user_input} là: {result}")