from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.menu import MenuItem
from app.schemas.menu import MenuItemCreate


# 🔹 GET ALL MENU ITEMS
async def get_menu(db: AsyncSession):
    result = await db.execute(select(MenuItem))
    return result.scalars().all()


# 🔹 CREATE MENU ITEM
async def create_menu_item(db: AsyncSession, data: MenuItemCreate):
    item = MenuItem(
        item_name=data.item_name,
        item_price=data.item_price,
        item_category=data.item_category,
        item_details=data.item_details,
        item_weight=data.item_weight,
        extra_data=data.extra_data,
        is_available=data.is_available,
    )

    db.add(item)
    await db.commit()
    await db.refresh(item)

    return item