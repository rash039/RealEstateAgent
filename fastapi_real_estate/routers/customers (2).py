from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import CustomerDetails
from schemas import CustomerBase, CustomerOut

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.post("/", response_model=CustomerOut)
def create_customer(customer: CustomerBase, db: Session = Depends(get_db)):
    db_obj = CustomerDetails(**customer.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/", response_model=list[CustomerOut])
def list_customers(db: Session = Depends(get_db)):
    return db.query(CustomerDetails).all()

@router.get("/{customer_id}", response_model=CustomerOut)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    db_obj = db.query(CustomerDetails).filter(CustomerDetails.customer_id == customer_id).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Customer not found")
    return db_obj

@router.delete("/{customer_id}")
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    db_obj = db.query(CustomerDetails).filter(CustomerDetails.customer_id == customer_id).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_obj)
    db.commit()
    return {"msg": "Deleted"}
