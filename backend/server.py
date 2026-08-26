from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    interest: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactInquiryCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    interest: Optional[str] = None
    message: str


@api_router.get("/")
async def root():
    return {"message": "MBtex Group API"}


@api_router.post("/contact", response_model=ContactInquiry)
async def create_contact(input: ContactInquiryCreate):
    inquiry = ContactInquiry(**input.model_dump())
    await db.contact_inquiries.insert_one(inquiry.model_dump())
    return inquiry


@api_router.get("/contact", response_model=List[ContactInquiry])
async def list_contacts():
    docs = await db.contact_inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
