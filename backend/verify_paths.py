import os
import pandas as pd

# Path from backend/app/routes/orbit.py
DATASET_PATH = os.path.join("app/routes", "../../train_dataset.csv")
# Adjust for running from backend/
DATASET_PATH_FROM_ROOT = "train_dataset.csv"

if os.path.exists(DATASET_PATH_FROM_ROOT):
    try:
        df = pd.read_csv(DATASET_PATH_FROM_ROOT, nrows=5)
        print("Successfully loaded dataset sample:")
        print(df)
    except Exception as e:
        print(f"Error reading CSV: {e}")
else:
    print(f"Dataset not found at {DATASET_PATH_FROM_ROOT}")
