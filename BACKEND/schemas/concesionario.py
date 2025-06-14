from pydantic import BaseModel
class Concesionario(BaseModel): # Corrected typo
    id: int
    marca: str
    sucursal: str
    aspirante: str
    class Config:
        orm_mode = True