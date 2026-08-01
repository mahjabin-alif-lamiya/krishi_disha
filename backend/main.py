from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# FastAPI অ্যাপ তৈরি করা
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# সেভ করা model লোড করা
model = joblib.load('crop_model.pkl')

# কৃষক যে তথ্য পাঠাবে তার গঠন (input format)
class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

# হোম route — শুধু চেক করার জন্য API চলছে কিনা
@app.get("/")
def home():
    return {"message": "KrishiDisha API is running"}

# prediction route — এখানে ফসল সুপারিশ হবে
@app.post("/predict")
def predict(data: CropInput):
    # input কে DataFrame বানানো (model যেভাবে চায়)
    input_df = pd.DataFrame([[
        data.N, data.P, data.K, data.temperature,
        data.humidity, data.ph, data.rainfall
    ]], columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'])

    # prediction ও confidence বের করা
    probabilities = model.predict_proba(input_df)
    crop = model.classes_[probabilities.argmax()]
    confidence = round(probabilities.max() * 100, 2)

    # ফলাফল ফেরত পাঠানো
    return {
        "recommended_crop": crop,
        "confidence": confidence
    }
    