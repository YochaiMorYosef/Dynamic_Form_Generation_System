from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from database import Base

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    data = Column(JSONB, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
