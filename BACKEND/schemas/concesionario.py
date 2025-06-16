from typing import Optional
from pydantic import BaseModel

# Esquema Pydantic para la creación de un concesionario (datos de entrada)
class ConcesionarioCreateSchema(BaseModel):
    marca: str
    sucursal: str
    aspirante: str

# Esquema Pydantic para la actualización de un concesionario (datos de entrada)
# Todos los campos son opcionales para permitir actualizaciones parciales
class ConcesionarioUpdateSchema(BaseModel):
    marca: Optional[str] = None
    sucursal: Optional[str] = None
    aspirante: Optional[str] = None

# Esquema Pydantic para mostrar un concesionario (incluye el ID y otros campos del modelo)
class ConcesionarioDisplaySchema(BaseModel):
    id: str
    marca: str
    sucursal: str
    aspirante: str

    class Config:
        from_attributes = True # Permite que Pydantic lea datos de atributos de objetos ORM

# Esquema Pydantic para la respuesta general de los endpoints de concesionario
class ConcesionarioResponse(BaseModel):
    message: str
    data: Optional[ConcesionarioDisplaySchema] = None # Data puede ser None si no se encuentra o hay error

# Esquema Pydantic para la respuesta del endpoint de eliminación de concesionario
class ConcesionarioDeleteResponse(BaseModel):
    message: str