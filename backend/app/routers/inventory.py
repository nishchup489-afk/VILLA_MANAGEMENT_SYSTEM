from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db

from app.schemas.inventory import (
    AddNewInventoryItem,
    InventoryItemOut,
    InputStockUpdate,
    InventoryStockHistoryOut
)

from app.services.inventory import (
    create_new_inventory_item,
    update_stock_status,
    get_inventory_items,
    get_stock_history,
    get_today_stock,
    get_item_stock_history
)


# =========================================================
# CREATE ROUTER
# =========================================================

router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"]
)


# =========================================================
# CREATE NEW INVENTORY ITEM
# =========================================================

@router.post(
    "/create",
    response_model=InventoryItemOut
)
async def create_inventory_item(
    data: AddNewInventoryItem,
    db: AsyncSession = Depends(get_db)
):

    """
    Creates a new inventory item.

    Example:
    Chicken
    Milk
    Bread
    """

    try:

        result = await create_new_inventory_item(
            db=db,
            data=data
        )

        return result

    except ValueError as e:

        # =================================================
        # WHY HTTPException?
        #
        # FastAPI converts this into:
        #
        # {
        #   "detail": "message"
        # }
        #
        # with proper status codes.
        # =================================================

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# =========================================================
# INSERT DAILY STOCK SNAPSHOT
# =========================================================

@router.post(
    "/stock/update",
    response_model=InventoryStockHistoryOut
)
async def insert_stock_update(
    data: InputStockUpdate,
    db: AsyncSession = Depends(get_db)
):

    """
    Night manager inserts stock snapshot.

    Example:
    Chicken -> 40
    Milk -> 20
    """

    try:

        result = await update_stock_status(
            db=db,
            data=data
        )

        return result

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# =========================================================
# GET ALL INVENTORY ITEMS
# =========================================================

@router.get(
    "/items",
    response_model=list[InventoryItemOut]
)
async def get_all_inventory_items(
    db: AsyncSession = Depends(get_db)
):

    """
    Returns all inventory items.
    """

    inventory_items = await get_inventory_items(
        db=db
    )

    return inventory_items


# =========================================================
# GET ALL STOCK HISTORY
# =========================================================

@router.get(
    "/stock/history"
)
async def get_all_stock_history(
    db: AsyncSession = Depends(get_db)
):

    """
    Returns all stock history.
    """

    stock_history = await get_stock_history(
        db=db
    )

    return stock_history


# =========================================================
# GET TODAY STOCK
# =========================================================

@router.get(
    "/stock/today"
)
async def get_today_inventory_stock(
    db: AsyncSession = Depends(get_db)
):

    """
    Returns today's stock snapshot.
    """

    today_stock = await get_today_stock(
        db=db
    )

    return today_stock


# =========================================================
# GET STOCK HISTORY FOR ONE ITEM
# =========================================================

@router.get(
    "/stock/history/{inventory_item_id}"
)
async def get_single_item_stock_history(
    inventory_item_id: UUID,
    db: AsyncSession = Depends(get_db)
):

    """
    Returns stock history for one item.

    Example:
    Chicken stock timeline
    """

    item_history = await get_item_stock_history(
        db=db,
        inventory_item_id=inventory_item_id
    )

    return item_history