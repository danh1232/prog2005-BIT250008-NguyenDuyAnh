def lay_ten_file(path):
    return path.split("\\")[-1]
def lay_ten_bai_hat(path):
    ten_file = lay_ten_file(path)
    return ten_file.split(".")[0]
path = "d:\\music\\muabui.mp3"
print("Tên file:", lay_ten_file(path))
print("Tên bài hát:", lay_ten_bai_hat(path))