import logging
from sqlalchemy.orm import Session
from typing import List

# Asumiendo una estructura de proyecto donde estos imports relativos son correctos.
# Ajustar si la estructura es diferente (ej. from ..database o from BACKEND.database)
# Para que este archivo sea ejecutable de forma aislada (si es necesario para pruebas)
# o si la estructura del proyecto no está configurada para estos imports relativos,
# podrías necesitar ajustar el PYTHONPATH o la forma en que ejecutas la aplicación.
try:
    from ...database import SessionLocal, engine, Base # Ejemplo: si database.py está dos niveles arriba
    from ...models.concesionario import Concesionario as ConcesionarioModel # Ejemplo: si models/ está dos niveles arriba
except ImportError:
    # Fallback para el caso de que los imports relativos fallen (ej. ejecución directa del script)
    # Esto es menos ideal para una estructura de proyecto robusta.
    # Considera configurar tu PYTHONPATH o usar imports absolutos basados en la raíz de tu proyecto.
    # Ejemplo de imports absolutos si 'BACKEND' es la raíz del paquete:
    # from BACKEND.database import SessionLocal, engine, Base
    # from BACKEND.models.concesionario import Concesionario as ConcesionarioModel
    # Por ahora, mantendré los imports originales del usuario para el fallback.
    # Si estás ejecutando esto como parte de una aplicación FastAPI más grande,
    # los imports relativos deberían funcionar si la estructura de directorios es correcta.
    from database import SessionLocal, engine, Base
    from models.concesionario import Concesionario as ConcesionarioModel


logger = logging.getLogger(__name__)


def obtener_datos_concesionario(db: Session) -> List[ConcesionarioModel]:
    """
    Obtiene todos los registros de la tabla 'concesionario'.
    Retorna una lista de objetos ConcesionarioModel.
    """
    logger.info("Iniciando la obtención de datos de la tabla 'concesionarios'.")
    try:
        concesionarios = db.query(ConcesionarioModel).all()

        if concesionarios:
            logger.info(f"Se encontraron {len(concesionarios)} registros en la tabla 'concesionarios'.")
            # El logging detallado de cada registro puede ser verboso para muchos registros,
            # considera si es necesario en producción o solo para debugging.
            # for concesionario_db in concesionarios:
            #     logger.debug( # Cambiado a debug para menos verbosidad por defecto
            #         f"  ID: {concesionario_db.id}, "
            #         f"Marca: {concesionario_db.marca}, "
            #         f"Sucursal: {concesionario_db.sucursal}, "
            #         f"Aspirante: {concesionario_db.aspirante}"
            #     )
        else:
            logger.info("No se encontraron registros en la tabla 'concesionario'.")
        return concesionarios
    except Exception as e:
        logger.error(f"Error al obtener datos de la tabla 'concesionarios': {e}", exc_info=True)
        # Devolver una lista vacía en caso de error para que el endpoint no falle
        # si espera una lista. Considerar levantar una HTTPException si el error debe propagarse.
        return []

