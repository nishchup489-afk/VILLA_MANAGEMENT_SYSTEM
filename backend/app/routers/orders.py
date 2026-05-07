from fastapi import APIRouter , Depends 
from sqlalchemy.ext.asyncio import AsyncSession 

from app.core.database import get_db
from app.schemas.orders import CustomerCreate , OrderItemCreate , OrderCreate , OrderOut 
from app.services.orders import create_order , get_order



router = APIRouter(prefix="/orders" , tags=["Order"])


@router.post("/", response_model=OrderOut)
async def OrderCreate(data: OrderCreate, db: AsyncSession = Depends(get_db)):
    return await create_order(db, data)


@router.get("/")
async def get_order_data(db: AsyncSession = Depends(get_db)):
    return await get_order(db)  #returns list


