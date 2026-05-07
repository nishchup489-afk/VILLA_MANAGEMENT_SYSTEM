"""
seed_inventory.py

Seeds initial inventory items into database.

WHY SEEDING EXISTS
==================

Imagine manually inserting 80 inventory items
through Swagger UI one by one 💀

Seeding allows us to:
- populate initial data
- keep environments consistent
- onboard faster
- reset development DB easily

Real companies use seeding for:
- permissions
- roles
- categories
- admin accounts
- inventory templates
- default settings
"""

import asyncio

from sqlalchemy import select

from app.core.database import AsyncSessionLocal
from app.models.inventory import (
    InventoryItem,
    InventoryItemCategory
)


# =========================================================
# INVENTORY DATA
# =========================================================

# ---------------------------------------------------------
# WHY TUPLES?
#
# ("name", category)
#
# Clean
# lightweight
# immutable
# easy to loop
# ---------------------------------------------------------

inventory_seed_data = [

    # =====================================================
    # MEAT
    # =====================================================

    ("Grilled Chicken Breast", InventoryItemCategory.MEAT),
    ("Breaded Chicken", InventoryItemCategory.MEAT),
    ("Meatball", InventoryItemCategory.MEAT),
    ("Pepperoni", InventoryItemCategory.MEAT),
    ("Sausage", InventoryItemCategory.MEAT),
    ("Bacon", InventoryItemCategory.MEAT),
    ("Salami", InventoryItemCategory.MEAT),
    ("Prosciutto", InventoryItemCategory.MEAT),

    # =====================================================
    # VEGETABLE
    # =====================================================

    ("Zucchini", InventoryItemCategory.VEGETABLE),
    ("Eggplant", InventoryItemCategory.VEGETABLE),
    ("Heirloom Tomato", InventoryItemCategory.VEGETABLE),
    ("Grape Tomato", InventoryItemCategory.VEGETABLE),
    ("Mushroom", InventoryItemCategory.VEGETABLE),
    ("Caramelized Onion", InventoryItemCategory.VEGETABLE),

    # =====================================================
    # CHEESE
    # =====================================================

    ("Fresh Mozzarella", InventoryItemCategory.CHEESE),
    ("Shredded Mozzarella", InventoryItemCategory.CHEESE),
    ("Provolone Cheese", InventoryItemCategory.CHEESE),
    ("Parmesan Cheese", InventoryItemCategory.CHEESE),

    # =====================================================
    # CANS
    # =====================================================

    ("Roasted Red Pepper Can", InventoryItemCategory.CANS),
    ("Artichoke Can", InventoryItemCategory.CANS),
    ("Sun Dried Tomato Can", InventoryItemCategory.CANS),
    ("Pomodoro Sauce Can", InventoryItemCategory.CANS),
    ("Cherry Pepper", InventoryItemCategory.CANS),
    ("Pepperoncini", InventoryItemCategory.CANS),
    ("Caesar Dressing", InventoryItemCategory.CANS),
    ("Balsamic", InventoryItemCategory.CANS),
    ("Balsamic Glaze", InventoryItemCategory.CANS),
    ("Oil Spray", InventoryItemCategory.CANS),
    ("Olive Oil", InventoryItemCategory.CANS),
    ("Dough", InventoryItemCategory.CANS),
    ("Butter", InventoryItemCategory.CANS),
    ("Garlic", InventoryItemCategory.CANS),
    ("Ketchup", InventoryItemCategory.CANS),
    ("Egg Patty", InventoryItemCategory.CANS),

    # =====================================================
    # DRY
    # =====================================================

    ("Paper Towel", InventoryItemCategory.DRY),
    ("Napkins", InventoryItemCategory.DRY),
    ("Hand Dry Tissue", InventoryItemCategory.DRY),
    ("Plastic Forks Knives Spoons", InventoryItemCategory.DRY),
    ("Small Containers and Lids", InventoryItemCategory.DRY),
    ("Large Salad Bowls", InventoryItemCategory.DRY),
    ("Small Salad Bowls and Lids", InventoryItemCategory.DRY),
    ("Large Salad Bowl Lids", InventoryItemCategory.DRY),
    ("Wheat", InventoryItemCategory.DRY),

    # =====================================================
    # LEAVES
    # =====================================================

    ("Arugula", InventoryItemCategory.LEAVES),
    ("Romaine Lettuce", InventoryItemCategory.LEAVES),
    ("Fresh Basil", InventoryItemCategory.LEAVES),
    ("Parsley", InventoryItemCategory.LEAVES),

    # =====================================================
    # CONTAINERS
    # =====================================================

    ("Pomodoro Containers", InventoryItemCategory.CONTAINERS),
    ("Caesar Containers", InventoryItemCategory.CONTAINERS),
    ("Balsamic Containers", InventoryItemCategory.CONTAINERS),

    # =====================================================
    # BREADS
    # =====================================================

    ("Focaccia", InventoryItemCategory.BREADS),
    ("Ciabatta", InventoryItemCategory.BREADS),
    ("Croissant Bun", InventoryItemCategory.BREADS),
    ("Baguette Demi", InventoryItemCategory.BREADS),

    # =====================================================
    # MILKS
    # =====================================================

    ("Oat Milk", InventoryItemCategory.MILKS),
    ("Full Fat Milk", InventoryItemCategory.MILKS),
    ("Wheat Milk", InventoryItemCategory.MILKS),

    # =====================================================
    # DISH STUFF
    # =====================================================

    ("Sanitizer", InventoryItemCategory.DISH_STUFF),
    ("Soap Liquid", InventoryItemCategory.DISH_STUFF),
    ("Puffer", InventoryItemCategory.DISH_STUFF),
    ("Scrapper", InventoryItemCategory.DISH_STUFF),

    # =====================================================
    # UTILITY
    # =====================================================

    ("Sweep", InventoryItemCategory.UTILITY),
    ("Mop", InventoryItemCategory.UTILITY),
    ("Mop Bucket", InventoryItemCategory.UTILITY),
    ("Ladder", InventoryItemCategory.UTILITY),
    ("Big Tray", InventoryItemCategory.UTILITY),
    ("Small Tray", InventoryItemCategory.UTILITY),
    ("Transparent Small Container", InventoryItemCategory.UTILITY),
    ("Steel Small Container", InventoryItemCategory.UTILITY),
    ("Transparent Big Container", InventoryItemCategory.UTILITY),
    ("Steel Big Container", InventoryItemCategory.UTILITY),
    ("Steel Long Container", InventoryItemCategory.UTILITY),

    # =====================================================
    # STICKERS
    # =====================================================

    ("Pepperoni Sticker", InventoryItemCategory.STICKERS),
    ("Margarita Sticker", InventoryItemCategory.STICKERS),
    ("Croissant Bacon Sticker", InventoryItemCategory.STICKERS),
    ("Croissant Sausage Sticker", InventoryItemCategory.STICKERS),
    ("Croissant Egg Cheese Sticker", InventoryItemCategory.STICKERS),
    ("Regular Sticker", InventoryItemCategory.STICKERS),
    ("Italian Deli Garden Salad Sticker", InventoryItemCategory.STICKERS),
    ("Chicken Caesar Salad Sticker", InventoryItemCategory.STICKERS),
    ("Arugula Antipasto Salad Sticker", InventoryItemCategory.STICKERS),
    ("Caprese Salad Sticker", InventoryItemCategory.STICKERS),
    ("Classic Italian Sandwich Sticker", InventoryItemCategory.STICKERS),
    ("Prosciutto Mozzarella Sandwich Sticker", InventoryItemCategory.STICKERS),
]


# =========================================================
# SEED FUNCTION
# =========================================================

async def seed_inventory():

    """
    Inserts inventory items if they do not exist.

    WHY CHECK EXISTENCE?
    ====================

    Without checking:
    every script run duplicates data 💀

    We want idempotent seeding:
    meaning safe repeated execution.
    """

    async with AsyncSessionLocal() as db:

        print("\n🌱 Starting inventory seed...\n")

        inserted_count = 0
        skipped_count = 0

        for item_name, item_category in inventory_seed_data:

            # =================================================
            # CHECK EXISTING ITEM
            # =================================================

            existing_query = select(InventoryItem).where(
                InventoryItem.item_name == item_name
            )

            existing_result = await db.execute(
                existing_query
            )

            existing_item = (
                existing_result.scalar_one_or_none()
            )

            # =================================================
            # SKIP IF EXISTS
            # =================================================

            if existing_item:

                skipped_count += 1

                print(
                    f"⚠️ Skipped existing item: {item_name}"
                )

                continue

            # =================================================
            # CREATE NEW ITEM
            # =================================================

            inventory_item = InventoryItem(
                item_name=item_name,
                item_category=item_category
            )

            db.add(inventory_item)

            inserted_count += 1

            print(
                f"✅ Inserted: {item_name}"
            )

        # =====================================================
        # COMMIT ALL INSERTS
        #
        # WHY COMMIT ONCE?
        #
        # Faster
        # cleaner
        # transactional
        #
        # instead of:
        # commit commit commit commit...
        # =====================================================

        await db.commit()

        print("\n===================================")
        print(f"✅ Inserted Items : {inserted_count}")
        print(f"⚠️ Skipped Items  : {skipped_count}")
        print("🌱 Inventory seeding completed.")
        print("===================================\n")


# =========================================================
# SCRIPT ENTRY POINT
# =========================================================

if __name__ == "__main__":

    """
    WHY asyncio.run()?

    seed_inventory() is async.

    Python cannot directly run async functions.

    asyncio.run():
    creates event loop
    executes coroutine
    closes loop cleanly
    """

    asyncio.run(seed_inventory())