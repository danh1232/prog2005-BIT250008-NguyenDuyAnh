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
book1 = Book("Book 1", 30000)
book2 = Book("Book 2", 50000)
book3 = Book("Book 3", 10000)
total = book1.get_price() + book2.get_price() + book3.get_price()
with open("books.txt", "w", encoding="utf-8") as f:
    f.write(f"{book1.get_name()};{book1.get_price()}\n")
    f.write(f"{book2.get_name()};{book2.get_price()}\n")
    f.write(f"{book3.get_name()};{book3.get_price()}\n")
    f.write(f"Tong;{total}")