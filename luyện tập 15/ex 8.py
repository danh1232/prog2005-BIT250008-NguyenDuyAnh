class Product:
    def __init__ (self,price):
        self.price = price
    @property
    def price(self):
        return self._price
    @price.setter
    def price(self,value):
        if value<0:
            raise ValueError("Lỗi")
        self._price = value
x = Product(10000)
print(x.price)