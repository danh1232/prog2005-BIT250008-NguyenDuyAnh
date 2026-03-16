class User:
    def __init__(self, id):
        self._id = id
    @property
    def id(self):
        return self._id
    @id.setter
    def id(self, value):
        self._id = value