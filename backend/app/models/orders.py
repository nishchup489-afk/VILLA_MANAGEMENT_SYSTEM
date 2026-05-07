from sqlalchemy import Integer, String, Column, DateTime, func, ForeignKey, Enum, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
import enum
from app.core.database import Base


class OrderType(enum.Enum):
    DINE_IN = "DINE_IN"
    TAKE_AWAY = "TAKE_AWAY"
    DELIVERY = "DELIVERY"


class Customer(Base):
    __tablename__ = "customer"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_name = Column(String, nullable=False)
    cashier_name = Column(String, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    orders = relationship("Order", back_populates="customer", cascade="all, delete")


class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customer.id"))

    daily_order_number = Column(Integer , nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    order_type = Column(Enum(OrderType), nullable=False, default=OrderType.DINE_IN)

    totals = Column(Numeric(10, 2), nullable=False)

    customer = relationship("Customer", back_populates="orders")
    receipt_number = Column(String , unique=True , index=True)

    order_items = relationship("Order_Item", back_populates="order", cascade="all, delete")


class Order_Item(Base):
    __tablename__ = "order_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"))

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    item_name = Column(String, nullable=False)
    item_price = Column(Numeric(10, 2), nullable=False)
    quantity = Column(Integer, nullable=False)

    order = relationship("Order", back_populates="order_items")