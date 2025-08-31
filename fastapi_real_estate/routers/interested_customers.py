from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import InterestedCustomer
from schemas import InterestedCustomerBase, InterestedCustomerOut
from database import SessionLocal


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=InterestedCustomerOut)
def create_interested_customer(data: InterestedCustomerBase, db: Session = Depends(get_db)):
    obj = InterestedCustomer(**data.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.get("/", response_model=list[InterestedCustomerOut])
def get_all(db: Session = Depends(get_db)):
    return db.query(InterestedCustomer).all()

@router.get("/{id}", response_model=InterestedCustomerOut)
def get_one(id: int, db: Session = Depends(get_db)):
    obj = db.query(InterestedCustomer).filter(InterestedCustomer.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    return obj

@router.delete("/{id}")
def delete_one(id: int, db: Session = Depends(get_db)):
    obj = db.query(InterestedCustomer).filter(InterestedCustomer.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(obj)
    db.commit()
    return {"message": "Deleted"}

