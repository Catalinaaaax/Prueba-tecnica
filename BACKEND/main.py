from fastapi import FastAPI

# Asumiendo que 'main.py' está en la carpeta BACKEND y 'routers' es una subcarpeta.
from routers.concesionario.concesionario_router import concesionario_router as cr_router

app = FastAPI(
    title="API de Prueba Fullstack",
    description="API para la gestión de concesionarios.",
    version="0.1.0"
)

# Obtener la instancia del router de concesionarios
concesionario_api_router = cr_router()

# Incluir el router de concesionarios en la aplicación principal
# El prefijo "/concesionario" ya está configurado dentro de concesionario_router.py
app.include_router(concesionario_api_router)

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de Prueba Fullstack"}

# Para ejecutar esta aplicación (guarda este archivo como main.py en la carpeta BACKEND):
# Abre tu terminal en la carpeta BACKEND y ejecuta:
# uvicorn main:app --reload
#
# Luego puedes enviar una petición POST a http://127.0.0.1:8000/concesionario/
# con un cuerpo JSON como:
# {
#   "nombre": "Concesionario XYZ",
#   "direccion": "Avenida Siempre Viva 742"
# }