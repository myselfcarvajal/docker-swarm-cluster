from fastapi import FastAPI
from backendpython import personas
from backendpython.src.conexion_postgresql import check_and_create_table
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

check_and_create_table()

app.include_router(personas.router)

@app.get("/")
async def root():
    return {"message":"Hello World"}

