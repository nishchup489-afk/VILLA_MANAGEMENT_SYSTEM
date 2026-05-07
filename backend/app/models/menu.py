import uuid
import enum
from sqlalchemy import (
    Column, String, Numeric, Enum, Float, Boolean,
    DateTime, func, CheckConstraint, Index
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import expression
from app.core.database import Base


class     MenuItemCategory(enum.Enum):
    BREAKFAST = "BREAKFAST"
    PIZZA = "PIZZA"
    LUNCH_SANDWICH = "LUNCH_SANDWICH"
    GRAB_AND_GO_SANDWICH = "GRAB_AND_GO_SANDWICH"
    SALAD = "SALAD"
    COFFEE = "COFFEE"
    SIDE = "SIDE"
    BEVERAGE = "BEVERAGE"


class MenuItem(Base):
    __tablename__ = "menu_items"

    __table_args__ = (
        CheckConstraint('item_price > 0', name='ck_item_price_positive'),
        Index("ix_menu_items_category", "item_category"),
    )

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    item_name = Column(String, nullable=False, index=True)
    item_price = Column(Numeric(10, 2), nullable=False)
    item_category = Column(
        Enum(
    MenuItemCategory,
    name="menu_item_category_enum"
)
    )

    item_details = Column(JSONB, nullable=True)

    item_weight = Column(Float, nullable=True)

    extra_data = Column(JSONB, nullable=True)

    is_available = Column(Boolean, server_default=expression.true())

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )