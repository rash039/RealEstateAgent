# routers/properties.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Property
from schemas import PropertyBase, PropertyOut
from database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.post("/", response_model=PropertyOut)
def create_property(data: PropertyBase, db: Session = Depends(get_db)):
    obj = Property(**data.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.get("/", response_model=list[PropertyOut])
def list_properties(db: Session = Depends(get_db)):
    return db.query(Property).all()

@router.get("/{property_id}", response_model=PropertyOut)
def get_property(property_id: int, db: Session = Depends(get_db)):
    obj = db.query(Property).filter(Property.property_id == property_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    return obj

@router.delete("/{property_id}")
def delete_property(property_id: int, db: Session = Depends(get_db)):
    obj = db.query(Property).filter(Property.property_id == property_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(obj)
    db.commit()
    return {"msg": "Deleted"}
