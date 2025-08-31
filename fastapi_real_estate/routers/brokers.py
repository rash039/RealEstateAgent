from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import PropertyBroker
from schemas import PropertyBrokerBase, PropertyBrokerOut
from database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.post("/", response_model=PropertyBrokerOut)
def create_broker(broker: PropertyBrokerBase, db: Session = Depends(get_db)):
    db_obj = PropertyBroker(**broker.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/", response_model=list[PropertyBrokerOut])
def list_brokers(db: Session = Depends(get_db)):
    return db.query(PropertyBroker).all()

@router.get("/{id}", response_model=PropertyBrokerOut)
def get_broker(id: int, db: Session = Depends(get_db)):
    obj = db.query(PropertyBroker).filter(PropertyBroker.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    return obj

@router.delete("/{id}")
def delete_broker(id: int, db: Session = Depends(get_db)):
    obj = db.query(PropertyBroker).filter(PropertyBroker.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(obj)
    db.commit()
    return {"msg": "Deleted"}
