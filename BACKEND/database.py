import os 
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
load_dotenv()
SQLALCHEMY_DATABASE_URL = os.getenv("SUPABASE_URL")
if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("SUPABASE_URL environment variable is not set.")
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal= sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()