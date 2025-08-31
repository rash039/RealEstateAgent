# routers/enquiries.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import CustomerEnquiry
from schemas import CustomerEnquiryBase, CustomerEnquiryOut
from database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.post("/", response_model=CustomerEnquiryOut)
def create_enquiry(enquiry: CustomerEnquiryBase, db: Session = Depends(get_db)):
    obj = CustomerEnquiry(**enquiry.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.get("/", response_model=list[CustomerEnquiryOut])
def list_enquiries(db: Session = Depends(get_db)):
    return db.query(CustomerEnquiry).all()

@router.get("/{request_id}", response_model=CustomerEnquiryOut)
def get_enquiry(request_id: int, db: Session = Depends(get_db)):
    obj = db.query(CustomerEnquiry).filter(CustomerEnquiry.request_id == request_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    return obj

@router.delete("/{request_id}")
def delete_enquiry(request_id: int, db: Session = Depends(get_db)):
    obj = db.query(CustomerEnquiry).filter(CustomerEnquiry.request_id == request_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(obj)
    db.commit()
    return {"msg": "Deleted"}
