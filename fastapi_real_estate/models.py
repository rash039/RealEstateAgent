from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, DateTime, Date, CheckConstraint
from sqlalchemy.sql import func
from database import Base

class CustomerDetails(Base):
    __tablename__ = 'customers_details'
    customer_id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# Add more models as needed, based on your schema

class InterestedCustomer(Base):
    __tablename__ = 'interested_customers'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    phone = Column(String, nullable=False)
    preferred_contact_time = Column(String)
    budget = Column(String)
    financing = Column(String, nullable=False)
    property_id = Column(Integer, ForeignKey('properties.property_id', ondelete="CASCADE"))
    message = Column(Text)
    date_submitted = Column(DateTime(timezone=True), server_default=func.now())

    
class PropertyBroker(Base):
    __tablename__ = 'property_brokers'

    id = Column(Integer, primary_key=True, index=True)
    broker_name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    phone = Column(String, nullable=False)
    property_id = Column(Integer)
    property_type = Column(String)
    location = Column(String)
    comments = Column(Text)
    date_created = Column(DateTime, server_default=func.now())

    __table_args__ = (
        CheckConstraint("property_type IN ('house', 'apartment', 'townhouse', 'condo', 'land')"),
    )


class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    mac_address = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class CustomerEnquiry(Base):
    __tablename__ = 'customer_enquiry'

    request_id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers_details.customer_id", ondelete="CASCADE"))
    request_type = Column(String, nullable=False)
    property_type = Column(String)
    location = Column(String)
    min_price = Column(Float)
    max_price = Column(Float)
    bedrooms = Column(Integer)
    bathrooms = Column(Integer)
    area_sqft = Column(Float)
    description = Column(Text)
    submitted_at = Column(Date)

    
class Property(Base):
    __tablename__ = 'properties'

    property_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id', ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    location = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    price_unit = Column(String, default='month')
    bedrooms = Column(Integer)
    bathrooms = Column(Integer)
    area_sqft = Column(Float)
    type = Column(String, nullable=False)
    purpose = Column(String, default='rent')
    description = Column(Text)
    main_image_url = Column(String)
    listed_at = Column(Date, server_default=func.current_date())

    
class PropertyFeature(Base):
    __tablename__ = 'property_features'

    feature_id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey('properties.property_id', ondelete="CASCADE"))
    feature = Column(String, nullable=False)


class PropertyImage(Base):
    __tablename__ = 'property_images'

    image_id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey('properties.property_id', ondelete="CASCADE"))
    image_url = Column(String, nullable=False)
    alt_text = Column(String)