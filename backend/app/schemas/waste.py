from uuid import UUID

from pydantic import BaseModel, ConfigDict

from datetime import date


class WasteEntryInput(BaseModel):

    product_name: str

    quantity: int

    reason: str

    thrown_at: date


class WasteEntryOut(BaseModel):

    id: UUID

    product_name: str

    quantity: int

    reason: str

    thrown_at: date

    model_config = ConfigDict(
    from_attributes=True
)