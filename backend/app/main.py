
from fastapi import FastAPI

app = FastAPI(
    title="License Plate Recognition API",
    version="0.1.0",
    description="API for license plate text recognition.",
)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/")
def root():
    return {"message": "License Plate Recognition API"}
