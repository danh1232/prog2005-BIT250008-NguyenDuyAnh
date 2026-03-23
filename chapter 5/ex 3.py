import matplotlib.pyplot as plt
labels = ['A', 'B', 'C', 'D', 'E']
sizes = [30, 25, 15, 20, 10]
plt.pie(sizes, labels=labels, autopct='%1.1f%%')
plt.title('Tỷ lệ doanh số của các sản phẩm')
plt.show()