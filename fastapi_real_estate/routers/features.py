# routers/features.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import PropertyFeature
from schemas import PropertyFeatureBase, PropertyFeatureOut
from database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.post("/", response_model=PropertyFeatureOut)
def create_feature(feature: PropertyFeatureBase, db: Session = Depends(get_db)):
    obj = PropertyFeature(**feature.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.get("/", response_model=list[PropertyFeatureOut])
def list_features(db: Session = Depends(get_db)):
    return db.query(PropertyFeature).all()

@router.get("/{feature_id}", response_model=PropertyFeatureOut)
def get_feature(feature_id: int, db: Session = Depends(get_db)):
    obj = db.query(PropertyFeature).filter(PropertyFeature.feature_id == feature_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Feature not found")
    return obj

@router.delete("/{feature_id}")
def delete_feature(feature_id: int, db: Session = Depends(get_db)):
    obj = db.query(PropertyFeature).filter(PropertyFeature.feature_id == feature_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Feature not found")
    db.delete(obj)
    db.commit()
    return {"msg": "Deleted"}
