from uuid import UUID
from datetime import date

from pydantic import BaseModel, ConfigDict, Field

from app.models.inventory import InventoryItemCategory


class InventoryItemOut(BaseModel):
    id : UUID
    item_name: str
    item_category: InventoryItemCategory

    model_config = ConfigDict(from_attributes=True)


class InventoryStockHistoryOut(BaseModel):
    item_name: str
    stock_quantity: int
    stock_date: date

    model_config = ConfigDict(from_attributes=True)


class AddNewInventoryItem(BaseModel):
    item_name: str
    item_category: InventoryItemCategory


class InputStockUpdate(BaseModel):
    inventory_item_id: UUID
    stock_quantity: int = Field(ge=0)
    stock_date: date