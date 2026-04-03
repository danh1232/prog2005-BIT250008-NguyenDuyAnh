class Book:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    def get_name(self):
        return self.name
    def get_price(self):
        return self.price
    def set_price(self, price):
        if price > 0:
            self.price = price
        else:
            print("Lỗi")
book1 = Book("Book 1", 100000)
book2 = Book("Book 2", 200000)
print("Giá:", book1.get_price())