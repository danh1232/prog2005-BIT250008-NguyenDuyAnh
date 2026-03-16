class Product:
    def __init__(self, price):
        self._price = price
    @property
    def price(self):
        return self._price
    @price.setter
    def price(self, value):
        if value > 0:
            self._price = value
        else:
            print("Price phải > 0")
    def __str__(self):
        return f"Price: {self._price}"
p = Product(271)
print(p)
p.price = 264
print(p)
p.price = -200
print(p)