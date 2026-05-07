from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.services.menu import get_menu, create_menu_item
from app.schemas.menu import MenuItemCreate

router = APIRouter(prefix="/menu/", tags=["Menu"])

@router.get("/")
async def read_menu(db: AsyncSession = Depends(get_db)):
    return await get_menu(db)


@router.post("/")
async def add_menu(item: MenuItemCreate, db: AsyncSession = Depends(get_db)):
    return await create_menu_item(db, item)