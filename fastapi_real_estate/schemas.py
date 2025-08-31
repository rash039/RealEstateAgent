from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date

class CustomerCreate(BaseModel):
    full_name: str
    phone: str
    email: Optional[str] = None

class CustomerOut(CustomerCreate):
    customer_id: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }



class InterestedCustomerBase(BaseModel):
    name: str
    email: str
    phone: str
    preferred_contact_time: Optional[str] = None
    budget: Optional[str] = None
    financing: str
    property_id: int
    message: Optional[str] = None

class InterestedCustomerOut(InterestedCustomerBase):
    id: int
    date_submitted: datetime

    model_config = {
        "from_attributes": True
    }


class PropertyBrokerBase(BaseModel):
    broker_name: str
    email: str
    phone: str
    property_id: Optional[int]
    property_type: Optional[str]
    location: Optional[str]
    comments: Optional[str]

class PropertyBrokerOut(PropertyBrokerBase):
    id: int
    date_created: datetime

    model_config = {
        "from_attributes": True
    }


class UserBase(BaseModel):
    email: str
    password: str
    mac_address: str   # new field
class LoginRequest(BaseModel):
    email: str
    password: str  # AES encrypted
    mac_address: str

class UserOut(UserBase):
    user_id: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }


class CustomerEnquiryBase(BaseModel):
    customer_id: int
    request_type: str  # 'buy', 'sell', 'rent'
    property_type: Optional[str]
    location: Optional[str]
    min_price: Optional[float]
    max_price: Optional[float]
    bedrooms: Optional[int]
    bathrooms: Optional[int]
    area_sqft: Optional[float]
    description: Optional[str]

class CustomerEnquiryOut(CustomerEnquiryBase):
    request_id: int
    submitted_at: Optional[date]

    model_config = {
        "from_attributes": True
    }


class PropertyBase(BaseModel):
    user_id: int
    title: str
    location: str
    price: float
    price_unit: Optional[str] = "month"
    bedrooms: Optional[int]
    bathrooms: Optional[int]
    area_sqft: Optional[float]
    type: str
    purpose: Optional[str] = "rent"
    description: Optional[str]
    main_image_url: Optional[str]

class PropertyOut(PropertyBase):
    property_id: int
    listed_at: Optional[date]

    model_config = {
        "from_attributes": True
    }


class PropertyFeatureBase(BaseModel):
    property_id: int
    feature: str

class PropertyFeatureOut(PropertyFeatureBase):
    feature_id: int

    model_config = {
        "from_attributes": True
    }


class PropertyImageBase(BaseModel):
    property_id: int
    image_url: str
    alt_text: Optional[str]

class PropertyImageOut(PropertyImageBase):
    image_id: int

    model_config = {
        "from_attributes": True
    }