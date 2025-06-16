from fastapi import FastAPI
# Import CORSMiddleware
from fastapi.middleware.cors import CORSMiddleware

# Import Base and engine from your database configuration
from database import Base, engine

# Import your models so SQLAlchemy knows about them.
# This line ensures that any models defined in 'models/concesionario.py'
# (which should inherit from database.Base) are registered with SQLAlchemy's metadata.
# Adjust 'models.concesionario' if your file is named differently or located elsewhere
# (e.g., if 'concesionario.py' is in the same directory as main.py, use 'import concesionario').
import models.concesionario # Asegúrate que esta ruta sea correcta para tu proyecto

# Asumiendo que 'main.py' está en la carpeta BACKEND y 'routers' es una subcarpeta.
from routers.concesionario.concesionario_router import router as cr_router

# Create database tables defined in your models
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API de Prueba Fullstack",
    description="API para la gestión de concesionarios.",
    version="0.1.0"
)

# Configure CORS
origins = [
    "http://localhost:5173",  # Your frontend origin
    # You can add other origins here, like your deployed frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Incluir el router de concesionarios en la aplicación principal
# El prefijo "/concesionarios" ya está configurado dentro de concesionario_router.py
# cr_router is already the APIRouter instance imported from your concesionario_router.py
app.include_router(cr_router, prefix="/api") # Added /api prefix to match frontend requests

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de Prueba Fullstack"}

# Para ejecutar esta aplicación (guarda este archivo como main.py en la carpeta BACKEND):
# Abre tu terminal en la carpeta BACKEND y ejecuta:
# uvicorn main:app --reload
#
# Luego puedes enviar una petición POST a http://127.0.0.1:8000/api/concesionarios/
# con un cuerpo JSON como:
# {
#   "nombre": "Concesionario XYZ",
#   "direccion": "Avenida Siempre Viva 742"
# }