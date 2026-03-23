import pandas as pd
import matplotlib.pyplot as plt
df = pd.read_csv('california_cities.csv')
top10 = df.sort_values(by='area_total_km2', ascending=False).head(10)
plt.barh(top10['city'], top10['area_total_km2'])
plt.gca().invert_yaxis()
plt.title('Top 10 thành phố lớn nhất California theo diện tích')
plt.xlabel('Diện tích (km²)')
plt.ylabel('Thành phố')
plt.show()