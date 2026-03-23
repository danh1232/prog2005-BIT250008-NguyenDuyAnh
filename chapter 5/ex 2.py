import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(-10, 10, 100)
y1 = x**2
y2 = x**3
plt.plot(x, y1, label='y = x^2')   # mặc định màu xanh
plt.plot(x, y2, color='red', label='y = x^3')
plt.title('Đồ thị y = x^2 và y = x^3')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.show()