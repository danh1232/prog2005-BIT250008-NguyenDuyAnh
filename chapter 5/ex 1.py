import matplotlib.pyplot as plt
labels = ['Xuất sắc', 'Giỏi', 'Trung bình', 'Yếu', 'Kém']
values = [6, 10, 12, 4, 1]
plt.bar(labels, values)
plt.title('Kết quả học tập của lớp')
plt.xlabel('Xếp loại')
plt.ylabel('Số lượng học sinh')
plt.show()
