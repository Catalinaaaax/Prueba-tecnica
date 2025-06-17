import logging
from typing import Optional

from fastapi import HTTPException, status # Importar HTTPException y status
from sqlalchemy.orm import Session

# Importar el modelo SQLAlchemy de Concesionario
from models.concesionario import Concesionario as ConcesionarioModel # Alias para evitar colisión de nombres
# Importar los esquemas Pydantic desde el módulo de esquemas
from schemas.concesionario import ConcesionarioUpdateSchema, ConcesionarioDisplaySchema, ConcesionarioResponse

# Configuración básica del logger
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


async def actualizar_registro(
    concesionario_id: str,
    datos_actualizacion: ConcesionarioUpdateSchema,
    db: Session
):
    """
    Actualiza los datos de un concesionario existente en la base de datos.
    El logger registrará los datos ingresados para la actualización.
    """
    # Obtener solo los campos que se enviaron para actualizar
    update_payload = datos_actualizacion.model_dump(exclude_unset=True)

    if not update_payload:
        logger.warning(f"Intento de actualización para concesionario ID: {concesionario_id} sin datos.")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se proporcionaron datos para la actualización."
        )

    logger.info(f"Intentando actualizar concesionario ID: {concesionario_id} con los datos ingresados: {update_payload}")

    db_concesionario = db.query(ConcesionarioModel).filter(ConcesionarioModel.id == concesionario_id).first()

    if not db_concesionario:
        logger.warning(f"Concesionario con ID: {concesionario_id} no encontrado para actualizar.")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Concesionario con ID: {concesionario_id} no encontrado."
        )

    # Aplicar las actualizaciones a los campos proporcionados
    for key, value in update_payload.items():
        setattr(db_concesionario, key, value)
    try:
        db.commit()
        db.refresh(db_concesionario)
        logger.info(f"Concesionario ID: {concesionario_id} actualizado exitosamente. Nuevos datos: {ConcesionarioDisplaySchema.model_validate(db_concesionario).model_dump()}")
        # El endpoint que llama a esta función usará ConcesionarioResponse como response_model,
        # por lo que este diccionario será serializado correctamente.
        return {"message": "Concesionario actualizado exitosamente", "data": db_concesionario}
    except Exception as e:
        db.rollback()
        logger.error(f"Error al actualizar concesionario ID {concesionario_id}: {e}", exc_info=True)
        # En un contexto FastAPI, se podría levantar HTTPException(status_code=500, detail="Error interno del servidor")
        # Considera si quieres relanzar la excepción o devolver una respuesta de error específica.
        # raise # Descomenta si prefieres que la excepción se propague
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error interno del servidor al actualizar el concesionario: {str(e)}"
        )
