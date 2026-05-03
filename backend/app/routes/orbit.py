from fastapi import APIRouter
import pandas as pd
import os

router = APIRouter()

DATASET_PATH = os.path.join(os.path.dirname(__file__), "../../../../train_dataset.csv")

@router.get("/asteroid/{index}")
async def get_asteroid(index: int):
    if not os.path.exists(DATASET_PATH):
        return {"error": "Dataset not found"}
    
    df = pd.read_csv(DATASET_PATH, nrows=index+1)
    if index >= len(df):
        return {"error": "Index out of range"}
    
    asteroid = df.iloc[index].to_dict()
    return asteroid

@router.get("/list")
async def list_asteroids(limit: int = 10):
    if not os.path.exists(DATASET_PATH):
        return {"error": "Dataset not found"}
    
    df = pd.read_csv(DATASET_PATH, nrows=limit)
    return df.to_dict(orient="records")
