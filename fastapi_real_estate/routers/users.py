from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User
from schemas import UserBase, UserOut
from database import SessionLocal
from pydantic import BaseModel
from passlib.hash import bcrypt
from Crypto.Cipher import AES
import base64

router = APIRouter()

# AES KEY (must be 16/24/32 bytes)
AES_KEY = b"RealEstateShop15"  # 16 bytes
AES_BLOCK_SIZE = AES.block_size  # usually 16

# PKCS7 unpad for bytes
def pkcs7_unpad(data: bytes) -> bytes:
    if not data:
        raise ValueError("Empty decrypted data")
    pad_len = data[-1]
    if pad_len < 1 or pad_len > AES_BLOCK_SIZE:
        raise ValueError(f"Invalid padding length: {pad_len}")
    if data[-pad_len:] != bytes([pad_len]) * pad_len:
        raise ValueError("Invalid PKCS7 padding bytes")
    return data[:-pad_len]

def decrypt_password(enc_password: str) -> str:
    """
    Accepts standard Base64 or URL-safe Base64, with or without '=' padding.
    Returns the decrypted plaintext string (utf-8).
    Raises HTTPException on failure with visible error for easier debugging.
    """
    if not enc_password:
        raise HTTPException(status_code=400, detail="Empty encrypted password")

    s = enc_password.strip()
    # remove accidental whitespace/newlines
    s = s.replace(" ", "").replace("\n", "").replace("\r", "")

    # Try urlsafe_b64decode first (handles - and _). Ensure padding added.
    try:
        padded = s + ("=" * (-len(s) % 4))
        enc = base64.urlsafe_b64decode(padded)
    except Exception as e_url:
        # fallback: replace -/_ with +/ and try standard b64 decode
        try:
            s2 = s.replace("-", "+").replace("_", "/")
            s2 = s2 + ("=" * (-len(s2) % 4))
            enc = base64.b64decode(s2)
        except Exception as e_std:
            # both attempts failed — print debug and return nice error
            print("Base64 decode failed. urlsafe_err=", e_url, "std_err=", e_std, "input=", repr(enc_password))
            raise HTTPException(status_code=400, detail="Invalid Base64 for encrypted password")

    # Decoded bytes must be multiple of AES block size
    if len(enc) % AES_BLOCK_SIZE != 0:
        print("Decoded bytes length not multiple of AES block size:", len(enc), "input:", repr(enc_password))
        raise HTTPException(status_code=400, detail="Invalid encrypted payload length")

    # AES-ECB decrypt
    try:
        cipher = AES.new(AES_KEY, AES.MODE_ECB)
        decrypted_bytes = cipher.decrypt(enc)
    except Exception as e:
        print("AES decryption error:", e)
        raise HTTPException(status_code=400, detail="AES decryption error")

    # PKCS7 unpad (bytes)
    try:
        unpadded = pkcs7_unpad(decrypted_bytes)
    except Exception as e:
        print("PKCS7 unpad error:", e, "decrypted_bytes (hex):", decrypted_bytes.hex())
        # Keep an explicit message so you can distinguish base64 vs padding issues
        raise HTTPException(status_code=400, detail="Decryption error: incorrect padding")

    # Decode to string
    try:
        plaintext = unpadded.decode("utf-8")
    except UnicodeDecodeError:
        # fallback to latin-1 if somehow used; normally shouldn't happen
        try:
            plaintext = unpadded.decode("latin-1")
        except Exception:
            raise HTTPException(status_code=400, detail="Decrypted bytes are not valid text")

    return plaintext

# Login request schema
class LoginRequest(BaseModel):
    email: str
    password: str  # AES encrypted from frontend

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    try:
        decrypted_password = decrypt_password(request.password)
    except Exception:
        raise HTTPException(status_code=400, detail="Decryption failed")

    combined = decrypted_password + request.mac_address + SALT_STRING

    if not bcrypt.verify(combined, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "user_id": user.user_id,
        "email": user.email,
        "mac_address": user.mac_address
    }

SALT_STRING = "SuperSecretExtraSalt"  # can store in env var

@router.post("/", response_model=UserOut)
def create_user(user: UserBase, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    combined = user.password + user.mac_address + SALT_STRING

    db_obj = User(
        email=user.email,
        password=bcrypt.hash(combined),
        mac_address=user.mac_address   # make sure DB model has this field
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

# List users
@router.get("/", response_model=list[UserOut])
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()

# Get user by ID
@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Delete user
@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"msg": "User deleted"}


# -------------------------
# Quick local test snippet:
# -------------------------
# You can run this module directly to test the decrypt_password function:
#
# if __name__ == "__main__":
#     test_enc = "R33NYVFwdQfBG5TruOh4pQ=="  # example you gave previously
#     print("Decrypting:", test_enc)
#     print("Plain:", decrypt_password(test_enc))
#
# Save and run: python this_file.py
# (Remove or comment out debug prints before running in production.)
