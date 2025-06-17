from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
from typing import List # Import List for response_model

# Importamos los esquemas Pydantic desde la ubicación centralizada
from schemas.concesionario import (
    ConcesionarioCreateSchema,
    ConcesionarioResponse,
    ConcesionarioDisplaySchema,
    ConcesionarioDeleteResponse,
    ConcesionarioUpdateSchema  # Esquema para la actualización
)

# Importamos las funciones de lógica de negocio (servicios)
from .create_register import create_register
# Importamos get_db para la inyección de dependencia de la sesión de BD
from database import get_db
# Importamos la función para obtener los datos del concesionario
from .obtener_concesionario import obtener_datos_concesionario
from .eliminar_concesionario import eliminar_concesionario
from .actualizar_concesionario import actualizar_registro # Importamos la función para actualizar

# Crea una instancia de APIRouter
# Puedes agregar un prefijo y etiquetas para organizar mejor tus rutas
router = APIRouter(
    prefix="/concesionarios",
    tags=["Concesionarios"],
)

# Define el endpoint POST para crear un nuevo registro de concesionario
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=ConcesionarioResponse)
async def register_concesionario_endpoint(
    concesionario_data: ConcesionarioCreateSchema, # Usamos el esquema de creación para los datos de entrada
    db: Session = Depends(get_db) # Inyectamos la sesión de la base de datos
):
    """
    Endpoint para registrar un nuevo concesionario.
    """
    # Pasamos los datos del concesionario y la sesión de BD a la función de creación
    return await create_register(concesionario_data, db)

# Define el endpoint GET para obtener todos los registros de concesionarios
@router.get("/", status_code=status.HTTP_200_OK, response_model=List[ConcesionarioDisplaySchema])
async def get_all_concesionarios_endpoint(
    db: Session = Depends(get_db) # Inyectamos la sesión de la base de datos
):
    """
    Endpoint para obtener todos los concesionarios registrados.
    """
    concesionarios = obtener_datos_concesionario(db)
    # Pydantic se encargará de la serialización de la lista de objetos ORM
    # al formato definido por ConcesionarioDisplaySchema gracias a `from_attributes = True`
    return concesionarios

# Define el endpoint PUT para actualizar un concesionario existente por su ID
@router.put("/{concesionario_id}", status_code=status.HTTP_200_OK, response_model=ConcesionarioResponse)
async def update_concesionario_endpoint(
    concesionario_id: str, # El ID del concesionario a actualizar
    datos_actualizacion: ConcesionarioUpdateSchema, # Datos para la actualización
    db: Session = Depends(get_db) # Inyectamos la sesión de la base de datos
):
    """
    Endpoint para actualizar un concesionario existente por su ID.
    """
    # Llama a la función actualizar_registro y espera su resultado
    response = await actualizar_registro(concesionario_id, datos_actualizacion, db)
    return response

# Define el endpoint DELETE para eliminar un concesionario por su ID
@router.delete("/{concesionario_id}", status_code=status.HTTP_200_OK, response_model=ConcesionarioDeleteResponse)
async def delete_concesionario_endpoint(
    concesionario_id: str, # El ID del concesionario a eliminar
    db: Session = Depends(get_db) # Inyectamos la sesión de la base de datos
):
    """
    Endpoint para eliminar un concesionario por su ID.
    """
    # Llama a la función eliminar_concesionario y espera su resultado
    # La función eliminar_concesionario ya maneja las excepciones y la lógica de negocio
    response = await eliminar_concesionario(concesionario_id, db)
    return response
