from pydantic import BaseModel, Field, field_validator
from typing import List, Optional, Dict, Any
from decimal import Decimal
from app.models.menu import MenuItemCategory


class MenuItemBase(BaseModel):
    item_name: str = Field(..., min_length=2, max_length=100)
    item_price: Decimal = Field(..., gt=0)
    item_category: MenuItemCategory

    # ingredients list
    item_details: Optional[List[str]] = None

    item_weight: Optional[float] = Field(None, gt=0)

    is_available: bool = True


class MenuItemCreate(MenuItemBase):
    extra_data: Optional[Dict[str, Any]] = None


    
    @field_validator("item_name")
    @classmethod
    def clean_name(cls, v):
        return v.strip().title()


    @field_validator("item_details")
    @classmethod
    def validate_details(cls, v):
        if v is None:
            return v
        
        if not isinstance(v, list):
            raise ValueError("item_details must be a list")

        if len(v) == 0:
            raise ValueError("item_details cannot be empty list")

        return [item.strip().lower() for item in v]