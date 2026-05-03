from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import predict, orbit
from app.db.sqlite import init_db

app = FastAPI(title="Asteroid 3D System API")

@app.on_event("startup")
async def startup_event():
    init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router, prefix="/predict", tags=["ML"])
app.include_router(orbit.router, prefix="/orbit", tags=["Orbit"])

@app.get("/")
async def root():
    return {"message": "Welcome to Asteroid 3D System API"}
