from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, text
from app.models.orders import Order, Order_Item, Customer
from app.schemas.orders import OrderCreate, OrderOut
from decimal import Decimal
from datetime import datetime
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload


async def create_order(db, data):

    # 🔹 Create customer
    customer = Customer(
        customer_name=data.customer.customer_name,
        cashier_name=data.customer.cashier_name
    )
    db.add(customer)
    await db.flush()

    # 🔥 Generate receipt + order number
    receipt_number, daily_order_number = await get_receipt_number(db)

    # 🔹 Create order
    order = Order(
        customer_id=customer.id,
        order_type=data.order_type,
        totals=0,
        daily_order_number=daily_order_number,
        receipt_number=receipt_number
    )
    db.add(order)
    await db.flush()

    total_price = 0

    # 🔹 Create items
    for item in data.items:
        order_item = Order_Item(
            order_id=order.id,
            item_name=item.item_name,
            item_price=item.item_price,
            quantity=item.quantity
        )
        db.add(order_item)

        total_price += item.item_price * item.quantity

    # 🔹 Update total
    order.totals = total_price

    await db.commit()

    # 🔥 Reload with relationships
    result = await db.execute(
        select(Order)
        .options(
            selectinload(Order.customer),
            selectinload(Order.order_items)
        )
        .where(Order.id == order.id)
    )

    order = result.scalar_one()

    return OrderOut(
        receipt_number=order.receipt_number,
        order_type=order.order_type,
        total_price=float(order.totals),
        created_at=order.created_at,
        customer=order.customer,
        items=order.order_items
    )

async def get_order(db: AsyncSession):
    result = await db.execute(select(Order))
    return result.scalars().all()

async def get_receipt_number(db: AsyncSession):

    result = await db.execute(   # 🔥 ADD await
        text("SELECT nextval('receipt_seq')")
    )

    seq = result.scalar_one()   # 🔥 better than scalar()

    date_part = datetime.utcnow().strftime("%d%m%y")

    receipt_number = f"VR-{date_part}-{seq:04d}"

    return receipt_number, seq