from pydantic import BaseModel, Field
from decimal import Decimal
from datetime import datetime
from typing import List
from app.models.orders import OrderType


# 🔹 Customer input
class CustomerCreate(BaseModel):
    customer_name: str = Field(..., min_length=1)
    cashier_name: str = Field(..., min_length=1)


# 🔹 Item inside an order
class OrderItemCreate(BaseModel):
    item_name: str
    item_price: Decimal = Field(..., gt=0)
    quantity: int = Field(..., gt=0)


# 🔹 Full order input
class OrderCreate(BaseModel):
    customer: CustomerCreate   
    order_type: OrderType
    items: List[OrderItemCreate]


class CustomerOut(BaseModel):
    customer_name: str
    cashier_name: str

    class Config:
        from_attributes = True


class OrderItemOut(BaseModel):
    item_name: str
    item_price: Decimal
    quantity: int

    class Config:
        from_attributes = True


class OrderOut(BaseModel):
    receipt_number: str
    order_type: OrderType
    total_price: Decimal
    created_at: datetime
    customer: CustomerOut
    items: List[OrderItemOut]

    class Config:
        from_attributes = True