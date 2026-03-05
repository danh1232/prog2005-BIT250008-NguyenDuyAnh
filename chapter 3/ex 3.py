colors = ["Red", "Blue","Yellow", "Black","Green"]
try:
    colors.remove("Green")
    print("Đã xóa Green khỏi danh sách")
except ValueError:
    print("Green không có trong danh sách")
print("Danh sách màu:", colors)