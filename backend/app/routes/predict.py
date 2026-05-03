from fastapi import APIRouter
from app.services.ml_service import ml_service
from app.db.sqlite import log_prediction, get_history

router = APIRouter()

@router.get("/")
async def predict_orbit_type(a: float, e: float, i: float):
    prediction = ml_service.predict(a, e, i)
    log_prediction(a, e, i, prediction)
    return {"orbit_type": prediction}

@router.get("/history")
async def prediction_history(limit: int = 10):
    history = get_history(limit)
    return history
