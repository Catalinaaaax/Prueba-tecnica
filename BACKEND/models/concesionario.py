from sqlalchemy import Column, String
from database import Base # Import Base from your database.py file

class Concesionario(Base):
    __tablename__ = 'concesionario'

    id = Column(String, primary_key=True, index=True)
    marca = Column(String, nullable=False)
    sucursal = Column(String, nullable=False)
    aspirante = Column(String, nullable=False)

    def __repr__(self):
        return f"<Concesionario(id={self.id}, marca='{self.marca}', sucursal='{self.sucursal}', aspirante='{self.aspirante}')>"