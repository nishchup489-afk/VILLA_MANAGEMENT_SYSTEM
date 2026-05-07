from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.waste import WasteEntry
from app.schemas.waste import (
    WasteEntryInput,
    WasteEntryOut
)


async def add_waste_entry(
    db: AsyncSession,
    data: WasteEntryInput
) -> WasteEntryOut:

    waste_product = WasteEntry(

        product_name=data.product_name,

        quantity=data.quantity,

        reason=data.reason,

        thrown_at=data.thrown_at
    )

    db.add(waste_product)

    await db.commit()

    await db.refresh(waste_product)

    return WasteEntryOut.model_validate(
        waste_product
    )


async def get_waste_history(
    db: AsyncSession
):

    query = select(WasteEntry)

    result = await db.execute(query)

    waste_products = result.scalars().all()

    return waste_products