from app.core.database import Base 
from sqlalchemy import Column , func , DateTime , Date , ForeignKey , String , Integer  , Text
from sqlalchemy.dialects.postgresql import UUID 
import uuid 
import enum 
from sqlalchemy.orm import relationship 



class WasteEntry(Base):

    __tablename__ = "waste_entries"

    id = Column(UUID(as_uuid=True),
                primary_key=True,
                default=uuid.uuid4)

    product_name = Column(String, nullable=False)

    quantity = Column(Integer, nullable=False)

    reason = Column(Text, nullable=False)

    thrown_at = Column(Date, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )