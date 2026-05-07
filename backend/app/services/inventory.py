from datetime import date
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.inventory import (
    InventoryItem,
    InventoryStockHistory
)

from app.schemas.inventory import (
    AddNewInventoryItem,
    InventoryItemOut,
    InputStockUpdate,
    InventoryStockHistoryOut
)


# =========================================================
# CREATE NEW INVENTORY ITEM
# =========================================================

async def create_new_inventory_item(
    db: AsyncSession,
    data: AddNewInventoryItem
) -> InventoryItemOut:

    """
    Creates a new inventory item.

    Example:
    Chicken
    Milk
    Bread

    This table stores the MASTER item identity,
    not daily stock history.
    """

    # ---------------------------------------------
    # CHECK IF ITEM ALREADY EXISTS
    # ---------------------------------------------

    existing_item_query = select(InventoryItem).where(
        InventoryItem.item_name == data.item_name
    )

    existing_item_result = await db.execute(
        existing_item_query
    )

    existing_item = existing_item_result.scalar_one_or_none()

    if existing_item:
        raise ValueError(
            "Inventory item already exists."
        )

    # ---------------------------------------------
    # CREATE ORM OBJECT
    # ---------------------------------------------

    inventory_item = InventoryItem(
        item_name=data.item_name,
        item_category=data.item_category
    )

    # ---------------------------------------------
    # ADD TO DATABASE SESSION
    # ---------------------------------------------

    db.add(inventory_item)

    # ---------------------------------------------
    # COMMIT TRANSACTION
    # ---------------------------------------------

    await db.commit()

    # ---------------------------------------------
    # REFRESH OBJECT
    #
    # WHY?
    #
    # PostgreSQL may generate:
    # - UUID
    # - timestamps
    #
    # refresh() reloads the newest DB state
    # into the Python ORM object.
    # ---------------------------------------------

    await db.refresh(inventory_item)

    # ---------------------------------------------
    # RETURN OUTPUT SCHEMA
    # ---------------------------------------------

    return InventoryItemOut(
        item_name=inventory_item.item_name,
        item_category=inventory_item.item_category
    )


# =========================================================
# INSERT DAILY STOCK HISTORY
# =========================================================

async def update_stock_status(
    db: AsyncSession,
    data: InputStockUpdate
) -> InventoryStockHistoryOut:

    """
    Night manager inserts stock snapshot.

    Example:
    Chicken -> 34
    Milk -> 12

    for date:
    2026-05-06
    """

    # =====================================================
    # STEP 1
    # CHECK IF INVENTORY ITEM EXISTS
    # =====================================================

    inventory_item = await db.get(
        InventoryItem,
        data.inventory_item_id
    )

    if not inventory_item:
        raise ValueError(
            "Inventory item not found."
        )

    # =====================================================
    # STEP 2
    # CHECK DUPLICATE ENTRY
    #
    # WHY?
    #
    # We only allow:
    # ONE stock entry
    # PER item
    # PER day
    #
    # Otherwise:
    #
    # Chicken - May 6 -> 40
    # Chicken - May 6 -> 20
    #
    # becomes corrupted history.
    # =====================================================

    existing_stock_query = select(
        InventoryStockHistory
    ).where(
        InventoryStockHistory.inventory_item_id
        == data.inventory_item_id,

        InventoryStockHistory.stock_date
        == data.stock_date
    )

    existing_stock_result = await db.execute(
        existing_stock_query
    )

    existing_stock = (
        existing_stock_result.scalar_one_or_none()
    )

    if existing_stock:
        raise ValueError(
            "Stock entry already exists for this day."
        )

    # =====================================================
    # STEP 3
    # CREATE STOCK HISTORY ROW
    # =====================================================

    daily_stock_history = InventoryStockHistory(
        inventory_item_id=data.inventory_item_id,
        stock_quantity=data.stock_quantity,
        stock_date=data.stock_date
    )

    # =====================================================
    # STEP 4
    # ADD TO SESSION
    # =====================================================

    db.add(daily_stock_history)

    # =====================================================
    # STEP 5
    # COMMIT TRANSACTION
    # =====================================================

    await db.commit()

    # =====================================================
    # STEP 6
    # REFRESH OBJECT
    # =====================================================

    await db.refresh(daily_stock_history)

    # =====================================================
    # STEP 7
    # RETURN CLEAN API RESPONSE
    # =====================================================

    return InventoryStockHistoryOut(
        item_name=inventory_item.item_name,
        stock_quantity=daily_stock_history.stock_quantity,
        stock_date=daily_stock_history.stock_date
    )


# =========================================================
# GET ALL INVENTORY ITEMS
# =========================================================

async def get_inventory_items(
    db: AsyncSession
):

    """
    Returns all inventory master items.

    Example:
    Chicken
    Milk
    Bread
    """

    query = select(InventoryItem)

    result = await db.execute(query)

    inventory_items = result.scalars().all()

    return inventory_items


# =========================================================
# GET ALL STOCK HISTORY
# =========================================================

async def get_stock_history(
    db: AsyncSession
):

    """
    Returns all inventory stock history.

    Includes preloaded inventory item relation.
    """

    # =====================================================
    # WHY selectinload?
    #
    # Without it:
    #
    # history.inventory_item.item_name
    #
    # causes extra SQL queries.
    #
    # This creates:
    #
    # N+1 query problem
    #
    # selectinload preloads related rows
    # efficiently using:
    #
    # WHERE id IN (...)
    # =====================================================

    query = (
        select(InventoryStockHistory)
        .options(
            selectinload(
                InventoryStockHistory.inventory_item
            )
        )
    )

    result = await db.execute(query)

    stock_history = result.scalars().all()

    return stock_history


# =========================================================
# GET TODAY STOCK
# =========================================================

async def get_today_stock(
    db: AsyncSession
):

    """
    Returns today's stock snapshot only.
    """

    today = date.today()

    query = (
        select(InventoryStockHistory)
        .where(
            InventoryStockHistory.stock_date == today
        )
        .options(
            selectinload(
                InventoryStockHistory.inventory_item
            )
        )
    )

    result = await db.execute(query)

    today_stock = result.scalars().all()

    return today_stock


# =========================================================
# GET STOCK HISTORY FOR ONE ITEM
# =========================================================

async def get_item_stock_history(
    db: AsyncSession,
    inventory_item_id: UUID
):

    """
    Returns stock history timeline
    for one inventory item.
    """

    query = (
        select(InventoryStockHistory)
        .where(
            InventoryStockHistory.inventory_item_id
            == inventory_item_id
        )
        .options(
            selectinload(
                InventoryStockHistory.inventory_item
            )
        )
        .order_by(
            InventoryStockHistory.stock_date.desc()
        )
    )

    result = await db.execute(query)

    item_history = result.scalars().all()

    return item_history