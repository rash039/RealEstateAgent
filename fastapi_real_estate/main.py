from fastapi import FastAPI
from routers import customers, interested_customers, brokers, users, properties, enquiries, features, images
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Real Estate FastAPI")

 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://localhost:3001"],  # Only allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create tables
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(customers.router, prefix="/api/customers", tags=["Customers"])
app.include_router(interested_customers.router, prefix="/api/interested", tags=["Interested Customers"])
app.include_router(brokers.router, prefix="/api/brokers", tags=["Property Brokers"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(properties.router, prefix="/api/properties", tags=["Properties"])
app.include_router(enquiries.router, prefix="/api/enquiries", tags=["Customer Enquiries"])
app.include_router(features.router, prefix="/api/features", tags=["Property Features"])
app.include_router(images.router, prefix="/api/images", tags=["Property Images"])

@app.get("/")
def root():
    return {"msg": "Welcome to Real Estate API"}
