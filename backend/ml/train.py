import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib
import os

DATASET_PATH = "../train_dataset.csv"
MODEL_DIR = "../../model"
MODEL_PATH = os.path.join(MODEL_DIR, "model.pkl")

def train():
    if not os.path.exists(DATASET_PATH):
        print(f"Dataset not found at {DATASET_PATH}")
        return

    print("Loading dataset...")
    df = pd.read_csv(DATASET_PATH)
    
    # Features: a, e, i
    # Target: Orbit_type
    features = ['a', 'e', 'i']
    target = 'Orbit_type'
    
    # Drop rows with missing values in these columns
    df = df.dropna(subset=features + [target])
    
    X = df[features]
    y = df[target]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training model...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    print(f"Model accuracy: {model.score(X_test, y_test):.4f}")
    
    if not os.path.exists(MODEL_DIR):
        os.makedirs(MODEL_DIR)
    
    joblib.dump(model, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")

if __name__ == "__main__":
    train()
