class Product:
    def __init__(self, price):
        self._price = None
        self.price = price
    @property
    def price(self):
        return self._price
    @price.setter
    def price(self, value):
        if value > 0:
            self._price = value
        else:
            print("Giá phải > 0")
    def __str__(self):
        return f"Price: {self._price}"
p = Product(100)
print(p)
p.price = -50
print(p)
p.price = 200
print(p)
