import joblib
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "../../../model/model.pkl")

class MLService:
    def __init__(self):
        self.model = None
        print(f"Attempting to load model from: {os.path.abspath(MODEL_PATH)}")
        if os.path.exists(MODEL_PATH):
            self.model = joblib.load(MODEL_PATH)
            print("Model loaded successfully!")
        else:
            print("Model file not found!")
    
    def predict(self, a, e, i):
        if self.model:
            prediction = self.model.predict([[a, e, i]])
            return prediction[0]
        return "Model not trained"

ml_service = MLService()
