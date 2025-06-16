import logging
from sqlalchemy.orm import Session
from fastapi import HTTPException, status


from models.concesionario import Concesionario as ConcesionarioModel # Alias para evitar colisión de nombres
from schemas.concesionario import ConcesionarioDeleteResponse
logger = logging.getLogger(__name__)

async def eliminar_concesionario(concesionario_id: str, db: Session):
    logger.info(f"Solicitud para eliminar concesionario con ID: {concesionario_id}")

    db_concesionario = db.query(ConcesionarioModel).filter(ConcesionarioModel.id == concesionario_id).first()

    if db_concesionario is None:
        logger.warning(f"Concesionario con ID: {concesionario_id} no encontrado.")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Concesionario no encontrado")

    try:
        db.delete(db_concesionario)
        db.commit()
        logger.info(f"Concesionario con ID: {concesionario_id} eliminado exitosamente.")
        return {"message": "Concesionario eliminado exitosamente", "id": concesionario_id}
    except Exception as e:
        db.rollback()
        logger.error(f"Error al eliminar concesionario con ID: {concesionario_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error interno del servidor al intentar eliminar el concesionario: {e}"
        )
    