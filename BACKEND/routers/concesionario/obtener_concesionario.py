import logging
from sqlalchemy.orm import Session
try:
    from ...database import SessionLocal, engine, Base
    from ...models.concesionario import Concesionario as ConcesionarioModel
except ImportError:
    import sys
    import os
    from database import SessionLocal, engine, Base
    from models.concesionario import Concesionario as ConcesionarioModel

logger = logging.getLogger(__name__)


def obtener_datos_concesionario(db: Session):
    logger.info("Iniciando la obtención de datos de la tabla 'concesionarios'.")
    try:
        concesionarios = db.query(ConcesionarioModel).all()

        if concesionarios:
            logger.info(f"Se encontraron {len(concesionarios)} registros en la tabla 'concesionarios':")
            for concesionario_db in concesionarios:
                logger.info(
                    f"  ID: {concesionario_db.id}, "
                    f"Marca: {concesionario_db.marca}, "
                    f"Sucursal: {concesionario_db.sucursal}, "
                    f"Aspirante: {concesionario_db.aspirante}"
                )
        else:
            logger.info("No se encontraron registros en la tabla 'concesionario'.")
        return concesionarios
    except Exception as e:
        logger.error(f"Error al obtener datos de la tabla 'concesionarios': {e}")
        return None

