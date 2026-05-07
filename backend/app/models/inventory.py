from app.core.database import Base 
from sqlalchemy import Column, Date , String , Integer , Boolean , Enum , DateTime, UniqueConstraint , func , ForeignKey
from sqlalchemy.dialects.postgresql import UUID 
import uuid 
import enum
from sqlalchemy.orm import relationship



class InventoryItemCategory(enum.Enum):
    MEAT = "MEAT"
    VEGETABLE = "VEGETABLE"
    CHEESE = "CHEESE"
    CANS = "CANS"
    DRY = "DRY"
    LEAVES = "LEAVES"
    CONTAINERS = "CONTAINERS"
    BREADS = "BREADS"
    MILKS = "MILKS"
    DISH_STUFF = "DISH_STUFF"
    UTILITY = "UTILITY"
    STICKERS = "STICKERS"


class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    item_name = Column(String, unique=True, nullable=False)

    item_category = Column(
        Enum(InventoryItemCategory, name="item_category_enum"),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    stock_history = relationship(
        "InventoryStockHistory",
        back_populates="inventory_item"
    )


class InventoryStockHistory(Base):
    __tablename__ = "inventory_stock_history"

    __table_args__ = (
        UniqueConstraint(
            "inventory_item_id",
            "stock_date",
            name="unique_item_stock_per_day"
        ),
    )

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    inventory_item_id = Column(
        UUID(as_uuid=True),
        ForeignKey("inventory_items.id"),
        nullable=False
    )

    stock_quantity = Column(
        Integer,
        nullable=False
    )

    stock_date = Column(
        Date,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    inventory_item = relationship(
        "InventoryItem",
        back_populates="stock_history"
    )