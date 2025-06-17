import logging
import uuid # Para generar IDs únicos
from sqlalchemy.orm import Session
from fastapi import HTTPException, status # Importar HTTPException y status

# Importar el modelo SQLAlchemy de Concesionario
from models.concesionario import Concesionario as ConcesionarioModel # Alias para evitar colisión de nombres

# Importar los esquemas Pydantic desde el módulo de esquemas centralizado
# Asegúrate de que estos esquemas estén definidos en schemas/concesionario.py
# from schemas.concesionario import ConcesionarioCreateSchema, ConcesionarioDisplaySchema, ConcesionarioResponse
# Por ahora, para que el código sea autocontenido para el ejemplo, los re-declararé aquí,
# pero la mejor práctica es importarlos.
from pydantic import BaseModel

class ConcesionarioCreateSchema(BaseModel):
    marca: str
    sucursal: str
    aspirante: str

class ConcesionarioDisplaySchema(BaseModel):
    id: str
    marca: str
    sucursal: str
    aspirante: str

    class Config:
        from_attributes = True

class ConcesionarioResponse(BaseModel):
    message: str
    data: ConcesionarioDisplaySchema


# Configuración básica del logger
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


async def create_register(concesionario_data: ConcesionarioCreateSchema, db: Session):
    """
    Almacena los datos de un nuevo concesionario en la base de datos.
    """
    data_to_log = concesionario_data.model_dump()
    logger.info(f"Datos recibidos para nuevo concesionario: {data_to_log}")

    generated_id = str(uuid.uuid4())
    # Crea una instancia del modelo SQLAlchemy
    db_concesionario = ConcesionarioModel(id=generated_id, **data_to_log)
    
    try:
        db.add(db_concesionario)
        db.commit()
        db.refresh(db_concesionario) # Actualiza el objeto con datos de la BD (como el ID si es autogenerado por la BD)
        logger.info(f"Concesionario registrado exitosamente con ID: {db_concesionario.id}")
        # La respuesta será serializada por FastAPI usando el ConcesionarioResponse
        # definido en el decorador del endpoint en concesionario_router.py
        return {"message": "Concesionario registrado exitosamente", "data": db_concesionario}
    except Exception as e:
        db.rollback()
        logger.error(f"Error al registrar concesionario: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error interno del servidor al registrar el concesionario: {str(e)}"
        )

