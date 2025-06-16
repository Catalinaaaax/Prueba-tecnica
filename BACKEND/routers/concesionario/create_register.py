import logging
import uuid # Para generar IDs únicos
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

# Importar el modelo SQLAlchemy de Concesionario
from models.concesionario import Concesionario as ConcesionarioModel # Alias para evitar colisión de nombres

# Configuración básica del logger
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Esquema Pydantic para la creación de un concesionario (datos de entrada)
class ConcesionarioCreateSchema(BaseModel):
    marca: str
    sucursal: str
    aspirante: str

# Esquema Pydantic para mostrar un concesionario (incluye el ID y otros campos del modelo)
class ConcesionarioDisplaySchema(BaseModel):
    id: str
    marca: str
    sucursal: str
    aspirante: str

    class Config:
        from_attributes = True # Permite que Pydantic lea datos de atributos de objetos ORM

# Esquema Pydantic para la respuesta del endpoint
class ConcesionarioResponse(BaseModel):
    message: str
    data: ConcesionarioDisplaySchema # Usamos el esquema de visualización que incluye el ID

async def create_register(concesionario_data: ConcesionarioCreateSchema, db: Session):
    """
    Almacena los datos de un nuevo concesionario en la base de datos.
    """
    data_to_log = concesionario_data.model_dump()
    logger.info(f"Datos recibidos para nuevo concesionario: {data_to_log}")

    generated_id = str(uuid.uuid4())
    db_concesionario = ConcesionarioModel(id=generated_id, **data_to_log)
    
    try:
        db.add(db_concesionario)
        db.commit()
        db.refresh(db_concesionario)
        logger.info(f"Concesionario registrado exitosamente con ID: {db_concesionario.id}")
        return {"message": "Concesionario registrado exitosamente", "data": db_concesionario}
    except Exception as e:
        db.rollback()
        logger.error(f"Error al registrar concesionario: {e}")
        raise # Opcionalmente, puedes levantar una HTTPException específica aquí