import asyncio
from decimal import Decimal

from sqlalchemy import select

from app.models.menu import MenuItem, MenuItemCategory
from app.core.database import AsyncSessionLocal


def make_instruction(item_name: str, category: MenuItemCategory) -> str:
    if category == MenuItemCategory.BREAKFAST:
        return (
            f"Prepare {item_name} fresh. Toast bread if needed, heat fillings properly, "
            "assemble neatly, and serve hot."
        )

    if category == MenuItemCategory.PIZZA:
        return (
            f"Prepare {item_name} with pizza dough, sauce, cheese, and toppings. "
            "Bake until crust is crisp and cheese is melted."
        )

    if category == MenuItemCategory.LUNCH_SANDWICH:
        return (
            f"Prepare {item_name} fresh. Toast bread if needed, layer ingredients evenly, "
            "and serve warm."
        )

    if category == MenuItemCategory.GRAB_AND_GO_SANDWICH:
        return (
            f"Assemble {item_name} neatly, wrap properly, and keep ready for grab-and-go service."
        )

    if category == MenuItemCategory.SALAD:
        return (
            f"Prepare {item_name} fresh. Toss ingredients gently and add dressing before serving "
            "or pack dressing separately."
        )

    if category == MenuItemCategory.SIDE:
        return f"Prepare {item_name} fresh and serve as a side item."

    if category == MenuItemCategory.COFFEE:
        return f"Prepare {item_name} fresh according to café coffee standards."

    if category == MenuItemCategory.BEVERAGE:
        return f"Prepare or serve {item_name} chilled or hot according to drink type."

    return f"Prepare {item_name} according to house standard."


def menu_item(
    name: str,
    price: str,
    category: MenuItemCategory,
    details: list[str],
    weight: float,
    instruction: str | None = None,
    extra_data: dict | None = None,
) -> MenuItem:
    data = extra_data.copy() if extra_data else {}
    data["instruction"] = instruction or make_instruction(name, category)

    return MenuItem(
        item_name=name,
        item_price=Decimal(price),
        item_category=category,
        item_details=details,
        item_weight=weight,
        extra_data=data,
    )


async def seed_menu():
    async with AsyncSessionLocal() as db:
        items = [
            # ============================================================
            # BREAKFAST
            # ============================================================

            menu_item(
                name="Croissant Breakfast Sandwich (Bacon)",
                price="16.99",
                category=MenuItemCategory.BREAKFAST,
                weight=9.5,
                details=[
                    "croissant_bun",
                    "egg_patty",
                    "fresh_mozzarella",
                    "bacon",
                ],
                instruction=(
                    "Toast croissant bun lightly. Heat egg patty and bacon. "
                    "Add fresh mozzarella, assemble, and serve hot."
                ),
            ),

            menu_item(
                name="Croissant Breakfast Sandwich (Sausage)",
                price="16.99",
                category=MenuItemCategory.BREAKFAST,
                weight=9.8,
                details=[
                    "croissant_bun",
                    "egg_patty",
                    "fresh_mozzarella",
                    "sausage",
                ],
                instruction=(
                    "Toast croissant bun lightly. Heat egg patty and sausage. "
                    "Add fresh mozzarella, assemble, and serve hot."
                ),
            ),

            menu_item(
                name="Croissant Breakfast Egg & Cheese Sandwich",
                price="16.99",
                category=MenuItemCategory.BREAKFAST,
                weight=8.5,
                details=[
                    "croissant_bun",
                    "egg_patty",
                    "fresh_mozzarella_cheese",
                ],
                instruction=(
                    "Toast croissant bun lightly. Heat egg patty, add fresh mozzarella cheese, "
                    "assemble, and serve hot."
                ),
            ),

            menu_item(
                name="Focaccia Breakfast Sandwich",
                price="15.99",
                category=MenuItemCategory.BREAKFAST,
                weight=10.5,
                details=[
                    "focaccia_bun",
                    "egg_patty",
                    "prosciutto",
                    "provolone_cheese",
                    "arugula",
                    "spicy_tomato_pesto",
                ],
                instruction=(
                    "Toast focaccia lightly. Add egg patty, prosciutto, provolone, arugula, "
                    "and spicy tomato pesto. Serve warm."
                ),
            ),

            menu_item(
                name="Ciabatta Breakfast Sandwich",
                price="9.99",
                category=MenuItemCategory.BREAKFAST,
                weight=8.0,
                details=[
                    "ciabatta_bun",
                    "shredded_mozzarella_cheese",
                    "roasted_red_pepper",
                    "olive_oil",
                    "salt",
                    "pepper",
                    "fresh_basil",
                ],
                instruction=(
                    "Toast ciabatta. Add shredded mozzarella, roasted red pepper, olive oil, "
                    "salt, pepper, and fresh basil. Serve warm."
                ),
            ),

            menu_item(
                name="Pepperoni Breakfast Pizza",
                price="19.99",
                category=MenuItemCategory.BREAKFAST,
                weight=13.5,
                details=[
                    "pizza_dough",
                    "pizza_sauce",
                    "oil",
                    "salt",
                    "pepper",
                    "shredded_mozzarella",
                    "pepperoni_8_slices",
                ],
                instruction=(
                    "Prepare dough with sauce, oil, seasoning, mozzarella, and pepperoni. "
                    "Bake until crust is crisp."
                ),
            ),

            menu_item(
                name="Margarita Breakfast Pizza",
                price="18.99",
                category=MenuItemCategory.BREAKFAST,
                weight=12.8,
                details=[
                    "pizza_dough",
                    "oil",
                    "salt",
                    "pepper",
                    "pizza_sauce",
                    "fresh_mozzarella_5_slices",
                    "fresh_basil",
                ],
                instruction=(
                    "Prepare dough with sauce, oil, seasoning, fresh mozzarella, and basil. "
                    "Bake until cheese melts and crust is crisp."
                ),
            ),

            menu_item(
                name="Breakfast Special Bacon Egg & Sausage Pizza",
                price="19.99",
                category=MenuItemCategory.BREAKFAST,
                weight=15.0,
                details=[
                    "pizza_dough",
                    "oil",
                    "salt",
                    "pepper",
                    "pizza_sauce",
                    "fresh_mozzarella",
                    "egg_patty_cubed",
                    "sausage_8_slices",
                    "bacon_8_slices",
                ],
                instruction=(
                    "Prepare pizza with sauce, mozzarella, cubed egg patty, sausage, and bacon. "
                    "Bake until fully heated and crisp."
                ),
            ),

            # ============================================================
            # PIZZA
            # ============================================================

            menu_item(
                name="Margarita Pizza",
                price="18.99",
                category=MenuItemCategory.PIZZA,
                weight=12.8,
                details=[
                    "pizza_dough",
                    "oil",
                    "salt",
                    "pepper",
                    "pizza_sauce",
                    "fresh_mozzarella_5_slices",
                    "fresh_basil",
                ],
                instruction=(
                    "Prepare dough with sauce, oil, seasoning, fresh mozzarella, and basil. "
                    "Bake until cheese melts and crust is crisp."
                ),
            ),

            menu_item(
                name="Pepperoni Pizza",
                price="19.99",
                category=MenuItemCategory.PIZZA,
                weight=13.5,
                details=[
                    "pizza_dough",
                    "pizza_sauce",
                    "oil",
                    "salt",
                    "pepper",
                    "shredded_mozzarella",
                    "pepperoni_8_slices",
                ],
                instruction=(
                    "Prepare dough with sauce, oil, seasoning, mozzarella, and pepperoni. "
                    "Bake until crust is crisp."
                ),
            ),

            menu_item(
                name="Sausage Pizza",
                price="19.99",
                category=MenuItemCategory.PIZZA,
                weight=14.0,
                details=[
                    "pizza_dough",
                    "oil",
                    "salt",
                    "pepper",
                    "pizza_sauce",
                    "shredded_mozzarella",
                    "sausage_12_slices",
                    "caramelized_onion",
                ],
                instruction=(
                    "Prepare pizza with sauce, mozzarella, sausage slices, and caramelized onion. "
                    "Bake until golden."
                ),
            ),

            menu_item(
                name="Meatball Pizza",
                price="21.99",
                category=MenuItemCategory.PIZZA,
                weight=15.0,
                details=[
                    "pizza_dough",
                    "oil",
                    "salt",
                    "pepper",
                    "pizza_sauce",
                    "shredded_mozzarella",
                    "meatball_12_slices",
                    "cherry_pepper",
                ],
                instruction=(
                    "Prepare pizza with sauce, mozzarella, meatball slices, and cherry pepper. "
                    "Bake until hot and crisp."
                ),
            ),

            menu_item(
                name="Del Orto Pizza",
                price="19.99",
                category=MenuItemCategory.PIZZA,
                weight=14.2,
                details=[
                    "pizza_dough",
                    "oil",
                    "salt",
                    "pepper",
                    "pizza_sauce",
                    "shredded_mozzarella",
                    "arugula",
                    "zucchini",
                    "mushroom",
                    "roasted_red_pepper",
                    "caramelized_onion",
                    "grated_parmesan_cheese",
                ],
                instruction=(
                    "Prepare vegetable pizza with sauce, mozzarella, vegetables, and parmesan. "
                    "Bake until crust is crisp."
                ),
            ),

            menu_item(
                name="Tri Formaggi Pizza",
                price="18.99",
                category=MenuItemCategory.PIZZA,
                weight=13.0,
                details=[
                    "pizza_dough",
                    "oil",
                    "salt",
                    "pepper",
                    "herb_ricotta",
                    "shredded_mozzarella",
                    "provolone_cheese_sliced",
                    "fresh_basil",
                ],
                instruction=(
                    "Prepare three-cheese pizza with ricotta, mozzarella, provolone, and basil. "
                    "Bake until cheese is melted."
                ),
            ),

            menu_item(
                name="Chicken Pesto Pizza",
                price="19.99",
                category=MenuItemCategory.PIZZA,
                weight=14.5,
                details=[
                    "pizza_dough",
                    "oil",
                    "salt",
                    "pepper",
                    "herb_ricotta",
                    "shredded_mozzarella",
                    "diced_chicken",
                    "roasted_red_pepper",
                    "basil_pesto",
                ],
                instruction=(
                    "Prepare pizza with ricotta, mozzarella, diced chicken, roasted pepper, and basil pesto. "
                    "Bake until hot."
                ),
            ),

            # ============================================================
            # LUNCH SANDWICH
            # ============================================================

            menu_item(
                name="Chicken Parm Sandwich",
                price="16.99",
                category=MenuItemCategory.LUNCH_SANDWICH,
                weight=11.5,
                details=[
                    "focaccia_bun",
                    "pizza_sauce",
                    "breaded_chicken_patty",
                    "fresh_mozzarella",
                    "spicy_tomato_pesto",
                ],
                instruction=(
                    "Toast focaccia. Heat breaded chicken with sauce and mozzarella. "
                    "Add spicy tomato pesto and serve hot."
                ),
            ),

            menu_item(
                name="Veggie Focaccia Sandwich",
                price="16.99",
                category=MenuItemCategory.LUNCH_SANDWICH,
                weight=10.0,
                details=[
                    "focaccia_bun",
                    "sun_dried_tomato",
                    "roasted_red_pepper",
                    "zucchini",
                    "mushroom",
                    "basil_pesto",
                ],
                instruction=(
                    "Toast focaccia. Add vegetables, sun-dried tomato, roasted pepper, zucchini, "
                    "mushroom, and basil pesto."
                ),
            ),

            menu_item(
                name="Provolone Chicken Sandwich",
                price="16.99",
                category=MenuItemCategory.LUNCH_SANDWICH,
                weight=10.8,
                details=[
                    "ciabatta_bun",
                    "grilled_chicken",
                    "provolone_cheese",
                    "spicy_tomato_pesto",
                ],
                instruction=(
                    "Toast ciabatta. Add grilled chicken, provolone, and spicy tomato pesto. "
                    "Serve warm."
                ),
            ),

            menu_item(
                name="Grilled Eggplant Sandwich",
                price="16.99",
                category=MenuItemCategory.LUNCH_SANDWICH,
                weight=10.2,
                details=[
                    "ciabatta_bun",
                    "roasted_red_pepper",
                    "provolone_cheese",
                    "grilled_eggplant",
                    "spicy_tomato_pesto",
                ],
                instruction=(
                    "Toast ciabatta. Add grilled eggplant, roasted red pepper, provolone, "
                    "and spicy tomato pesto. Serve warm."
                ),
            ),

            # ============================================================
            # GRAB AND GO SANDWICH
            # ============================================================

            menu_item(
                name="Classic Italian Sandwich",
                price="19.99",
                category=MenuItemCategory.GRAB_AND_GO_SANDWICH,
                weight=12.5,
                details=[
                    "baguette_bun",
                    "prosciutto_2_slices",
                    "heirloom_tomato",
                    "salami_3_slices",
                    "provolone_2_slices",
                    "pepperoni_5_slices",
                    "romaine_lettuce",
                    "oil",
                    "balsamic_glaze",
                ],
                instruction=(
                    "Assemble cold sandwich with meats, cheese, tomato, lettuce, oil, and balsamic glaze. "
                    "Wrap for grab-and-go."
                ),
            ),

            menu_item(
                name="Prosciutto & Mozzarella Sandwich",
                price="19.99",
                category=MenuItemCategory.GRAB_AND_GO_SANDWICH,
                weight=11.0,
                details=[
                    "baguette_bun",
                    "prosciutto_2_slices",
                    "heirloom_tomato",
                    "fresh_mozzarella_3_slices",
                    "salt",
                    "arugula",
                ],
                instruction=(
                    "Assemble baguette with prosciutto, tomato, mozzarella, salt, and arugula. "
                    "Wrap neatly."
                ),
            ),

            # ============================================================
            # SALAD
            # ============================================================

            menu_item(
                name="Chicken Caesar Salad",
                price="19.99",
                category=MenuItemCategory.SALAD,
                weight=13.0,
                details=[
                    "romaine_lettuce",
                    "diced_chicken",
                    "garlic_croutons",
                    "parmesan_cheese",
                    "caesar_dressing",
                ],
                instruction=(
                    "Prepare romaine, chicken, croutons, parmesan, and Caesar dressing. "
                    "Toss gently or pack dressing separately."
                ),
            ),

            menu_item(
                name="Caprese Salad",
                price="14.99",
                category=MenuItemCategory.SALAD,
                weight=10.5,
                details=[
                    "arugula",
                    "heirloom_tomato",
                    "fresh_mozzarella",
                    "fresh_basil",
                    "oil_and_balsamic_glaze_dressing",
                ],
                instruction=(
                    "Layer arugula, tomato, mozzarella, and basil. "
                    "Finish with oil and balsamic glaze dressing."
                ),
            ),

            menu_item(
                name="Arugula Antipasto Salad",
                price="18.99",
                category=MenuItemCategory.SALAD,
                weight=12.0,
                details=[
                    "arugula",
                    "artichoke_hearts",
                    "provolone_cut",
                    "salami",
                    "prosciutto",
                    "roasted_red_pepper",
                    "pepperoncini",
                    "balsamic_vinaigrette_dressing",
                ],
                instruction=(
                    "Build salad with arugula, antipasto meats, cheese, vegetables, "
                    "and balsamic vinaigrette."
                ),
            ),

            # ============================================================
            # SIDE
            # ============================================================

            menu_item(
                name="Italian Deli Garden Salad",
                price="7.99",
                category=MenuItemCategory.SIDE,
                weight=8.0,
                details=[
                    "romaine_lettuce",
                    "arugula",
                    "zucchini",
                    "eggplant",
                    "grape_tomato",
                    "cucumber",
                    "balsamic_vinaigrette_dressing",
                ],
                instruction=(
                    "Prepare small garden salad with vegetables and balsamic vinaigrette dressing."
                ),
            ),

            menu_item(
                name="Garlic Knots",
                price="3.99",
                category=MenuItemCategory.SIDE,
                weight=4.5,
                details=[
                    "baked_dough_knot",
                    "butter",
                    "garlic",
                    "parsley",
                    "salt",
                    "pepper",
                    "parmesan_cheese",
                ],
                instruction=(
                    "Warm garlic knots. Toss with butter, garlic, parsley, salt, pepper, and parmesan."
                ),
            ),

            # ============================================================
            # COFFEE
            # ============================================================

            menu_item(
                name="Latte",
                price="2.99",
                category=MenuItemCategory.COFFEE,
                weight=12.0,
                details=[
                    "espresso",
                    "steamed_milk",
                ],
                instruction="Pull espresso shot, steam milk, combine smoothly, and serve hot.",
                extra_data={
                    "sizes": [
                        {"name": "Small", "price": 2.99, "weight": 12.0},
                        {"name": "Large", "price": 3.99, "weight": 16.0},
                    ],
                    "milk_options": ["whole_milk", "oat_milk", "almond_milk"],
                    "iced_available": True,
                },
            ),

            menu_item(
                name="Espresso",
                price="2.50",
                category=MenuItemCategory.COFFEE,
                weight=2.0,
                details=[
                    "espresso_shot",
                ],
                instruction="Pull a fresh espresso shot and serve immediately.",
                extra_data={
                    "sizes": [
                        {"name": "Single", "price": 2.50, "weight": 1.0},
                        {"name": "Double", "price": 3.50, "weight": 2.0},
                    ]
                },
            ),

            menu_item(
                name="Americano",
                price="3.00",
                category=MenuItemCategory.COFFEE,
                weight=12.0,
                details=[
                    "espresso",
                    "hot_water",
                ],
                instruction="Pull espresso shot, add hot water, and serve hot.",
                extra_data={
                    "sizes": [
                        {"name": "Small", "price": 3.00, "weight": 12.0},
                        {"name": "Medium", "price": 3.50, "weight": 16.0},
                        {"name": "Large", "price": 4.00, "weight": 20.0},
                    ],
                    "iced_available": True,
                },
            ),

            menu_item(
                name="Cappuccino",
                price="4.25",
                category=MenuItemCategory.COFFEE,
                weight=8.0,
                details=[
                    "espresso",
                    "steamed_milk",
                    "milk_foam",
                ],
                instruction="Pull espresso shot, steam milk with foam, and serve with thick foam top.",
                extra_data={
                    "sizes": [
                        {"name": "Small", "price": 4.25, "weight": 8.0},
                        {"name": "Medium", "price": 4.75, "weight": 12.0},
                    ],
                    "milk_options": ["whole_milk", "oat_milk", "almond_milk"],
                },
            ),

            menu_item(
                name="Flat White",
                price="4.50",
                category=MenuItemCategory.COFFEE,
                weight=6.0,
                details=[
                    "espresso",
                    "microfoam_milk",
                ],
                instruction="Pull espresso shot and pour steamed microfoam milk smoothly.",
                extra_data={
                    "milk_options": ["whole_milk", "oat_milk", "almond_milk"]
                },
            ),

            menu_item(
                name="Mocha",
                price="4.75",
                category=MenuItemCategory.COFFEE,
                weight=12.0,
                details=[
                    "espresso",
                    "chocolate",
                    "steamed_milk",
                ],
                instruction="Combine espresso, chocolate, and steamed milk. Add whipped cream if requested.",
                extra_data={
                    "sizes": [
                        {"name": "Small", "price": 4.75, "weight": 12.0},
                        {"name": "Large", "price": 5.75, "weight": 16.0},
                    ],
                    "toppings": ["whipped_cream"],
                    "iced_available": True,
                },
            ),

            menu_item(
                name="Caramel Latte",
                price="5.25",
                category=MenuItemCategory.COFFEE,
                weight=12.0,
                details=[
                    "espresso",
                    "steamed_milk",
                    "caramel_syrup",
                ],
                instruction="Pull espresso, add caramel syrup, combine with steamed milk, and serve.",
                extra_data={
                    "sizes": [
                        {"name": "Small", "price": 5.25, "weight": 12.0},
                        {"name": "Large", "price": 6.25, "weight": 16.0},
                    ],
                    "milk_options": ["whole_milk", "oat_milk", "almond_milk"],
                    "iced_available": True,
                },
            ),

            menu_item(
                name="Vanilla Latte",
                price="5.00",
                category=MenuItemCategory.COFFEE,
                weight=12.0,
                details=[
                    "espresso",
                    "steamed_milk",
                    "vanilla_syrup",
                ],
                instruction="Pull espresso, add vanilla syrup, combine with steamed milk, and serve.",
                extra_data={
                    "sizes": [
                        {"name": "Small", "price": 5.00, "weight": 12.0},
                        {"name": "Large", "price": 6.00, "weight": 16.0},
                    ],
                    "milk_options": ["whole_milk", "oat_milk", "almond_milk"],
                    "iced_available": True,
                },
            ),

            menu_item(
                name="Iced Coffee",
                price="3.50",
                category=MenuItemCategory.COFFEE,
                weight=16.0,
                details=[
                    "brewed_coffee",
                    "ice",
                ],
                instruction="Fill cup with ice and pour chilled brewed coffee. Add milk or sweetener if requested.",
                extra_data={
                    "sizes": [
                        {"name": "Regular", "price": 3.50, "weight": 16.0},
                        {"name": "Large", "price": 4.25, "weight": 20.0},
                    ],
                    "milk_options": ["whole_milk", "oat_milk", "almond_milk"],
                },
            ),

            menu_item(
                name="Cold Brew",
                price="4.50",
                category=MenuItemCategory.COFFEE,
                weight=16.0,
                details=[
                    "cold_brew_coffee",
                    "ice",
                ],
                instruction="Serve cold brew over ice. Add milk or sweetener if requested.",
                extra_data={
                    "sizes": [
                        {"name": "Regular", "price": 4.50, "weight": 16.0},
                        {"name": "Large", "price": 5.25, "weight": 20.0},
                    ],
                    "milk_options": ["whole_milk", "oat_milk", "almond_milk"],
                },
            ),

            menu_item(
                name="Nitro Cold Brew",
                price="5.50",
                category=MenuItemCategory.COFFEE,
                weight=16.0,
                details=[
                    "nitro_cold_brew",
                ],
                instruction="Pour nitro cold brew fresh and serve chilled without ice unless requested.",
                extra_data={
                    "sizes": [
                        {"name": "Regular", "price": 5.50, "weight": 16.0},
                    ]
                },
            ),

            # ============================================================
            # BEVERAGE — no random cheap soda garbage
            # ============================================================

            menu_item(
                name="Hot Chocolate",
                price="3.75",
                category=MenuItemCategory.BEVERAGE,
                weight=12.0,
                details=[
                    "chocolate",
                    "steamed_milk",
                ],
                instruction="Steam milk, mix with chocolate, and serve hot.",
                extra_data={
                    "sizes": [
                        {"name": "Small", "price": 3.75, "weight": 12.0},
                        {"name": "Large", "price": 4.75, "weight": 16.0},
                    ]
                },
            ),

            menu_item(
                name="Chai Latte",
                price="4.50",
                category=MenuItemCategory.BEVERAGE,
                weight=12.0,
                details=[
                    "chai",
                    "steamed_milk",
                    "spices",
                ],
                instruction="Combine chai concentrate with steamed milk and serve hot.",
                extra_data={
                    "sizes": [
                        {"name": "Small", "price": 4.50, "weight": 12.0},
                        {"name": "Large", "price": 5.50, "weight": 16.0},
                    ],
                    "iced_available": True,
                },
            ),

            menu_item(
                name="Matcha Latte",
                price="4.75",
                category=MenuItemCategory.BEVERAGE,
                weight=12.0,
                details=[
                    "matcha",
                    "steamed_milk",
                ],
                instruction="Whisk matcha, combine with steamed milk, and serve hot.",
                extra_data={
                    "sizes": [
                        {"name": "Small", "price": 4.75, "weight": 12.0},
                        {"name": "Large", "price": 5.75, "weight": 16.0},
                    ],
                    "milk_options": ["whole_milk", "oat_milk", "almond_milk"],
                    "iced_available": True,
                },
            ),

            menu_item(
                name="Iced Tea",
                price="2.99",
                category=MenuItemCategory.BEVERAGE,
                weight=16.0,
                details=[
                    "tea",
                    "ice",
                ],
                instruction="Serve chilled tea over ice. Add lemon or sweetener if requested.",
                extra_data={
                    "sizes": [
                        {"name": "Regular", "price": 2.99, "weight": 16.0},
                        {"name": "Large", "price": 3.75, "weight": 20.0},
                    ]
                },
            ),

            menu_item(
                name="House Lemonade",
                price="3.25",
                category=MenuItemCategory.BEVERAGE,
                weight=16.0,
                details=[
                    "lemon",
                    "water",
                    "sugar",
                    "ice",
                ],
                instruction="Serve house lemonade chilled over ice.",
                extra_data={
                    "sizes": [
                        {"name": "Regular", "price": 3.25, "weight": 16.0},
                        {"name": "Large", "price": 4.00, "weight": 20.0},
                    ]
                },
            ),

            menu_item(
                name="Sparkling Lemonade",
                price="4.25",
                category=MenuItemCategory.BEVERAGE,
                weight=16.0,
                details=[
                    "lemon",
                    "sparkling_water",
                    "sugar",
                    "ice",
                ],
                instruction="Mix lemonade with sparkling water and serve over ice.",
                extra_data={
                    "sizes": [
                        {"name": "Regular", "price": 4.25, "weight": 16.0},
                    ]
                },
            ),

            menu_item(
                name="Italian Sparkling Water",
                price="2.50",
                category=MenuItemCategory.BEVERAGE,
                weight=16.9,
                details=[
                    "sparkling_mineral_water",
                ],
                instruction="Serve chilled bottle.",
                extra_data={
                    "bottle": True,
                    "brand_style": "premium_italian",
                },
            ),

            menu_item(
                name="Still Water",
                price="1.99",
                category=MenuItemCategory.BEVERAGE,
                weight=16.9,
                details=[
                    "still_water",
                ],
                instruction="Serve chilled bottle.",
                extra_data={
                    "bottle": True,
                },
            ),

            menu_item(
                name="Fresh Orange Juice",
                price="3.99",
                category=MenuItemCategory.BEVERAGE,
                weight=12.0,
                details=[
                    "fresh_orange_juice",
                ],
                instruction="Serve orange juice chilled.",
                extra_data={
                    "sizes": [
                        {"name": "Regular", "price": 3.99, "weight": 12.0},
                    ]
                },
            ),

            menu_item(
                name="Apple Juice",
                price="3.50",
                category=MenuItemCategory.BEVERAGE,
                weight=12.0,
                details=[
                    "apple_juice",
                ],
                instruction="Serve apple juice chilled.",
                extra_data={
                    "sizes": [
                        {"name": "Regular", "price": 3.50, "weight": 12.0},
                    ]
                },
            ),

            menu_item(
                name="San Pellegrino Blood Orange",
                price="3.25",
                category=MenuItemCategory.BEVERAGE,
                weight=11.15,
                details=[
                    "sparkling_blood_orange_beverage",
                ],
                instruction="Serve chilled can.",
                extra_data={
                    "can": True,
                    "brand_style": "premium_italian",
                },
            ),

            menu_item(
                name="San Pellegrino Lemon",
                price="3.25",
                category=MenuItemCategory.BEVERAGE,
                weight=11.15,
                details=[
                    "sparkling_lemon_beverage",
                ],
                instruction="Serve chilled can.",
                extra_data={
                    "can": True,
                    "brand_style": "premium_italian",
                },
            ),

            menu_item(
                name="Milkshake (Vanilla)",
                price="5.99",
                category=MenuItemCategory.BEVERAGE,
                weight=16.0,
                details=[
                    "milk",
                    "vanilla_ice_cream",
                ],
                instruction="Blend milk and vanilla ice cream until smooth. Serve cold.",
                extra_data={
                    "sizes": [
                        {"name": "Regular", "price": 5.99, "weight": 16.0},
                    ]
                },
            ),

            menu_item(
                name="Milkshake (Chocolate)",
                price="5.99",
                category=MenuItemCategory.BEVERAGE,
                weight=16.0,
                details=[
                    "milk",
                    "chocolate_ice_cream",
                ],
                instruction="Blend milk and chocolate ice cream until smooth. Serve cold.",
                extra_data={
                    "sizes": [
                        {"name": "Regular", "price": 5.99, "weight": 16.0},
                    ]
                },
            ),
        ]

        item_names = [item.item_name for item in items]

        result = await db.execute(
            select(MenuItem).where(MenuItem.item_name.in_(item_names))
        )

        existing_items = {
            item.item_name: item
            for item in result.scalars().all()
        }

        created_count = 0
        updated_count = 0

        for item in items:
            existing_item = existing_items.get(item.item_name)

            if existing_item:
                existing_item.item_price = item.item_price
                existing_item.item_category = item.item_category
                existing_item.item_details = item.item_details
                existing_item.item_weight = item.item_weight
                existing_item.extra_data = item.extra_data
                updated_count += 1
            else:
                db.add(item)
                created_count += 1

        await db.commit()

        print(
            f"Menu seed complete. Created: {created_count}, Updated: {updated_count}."
        )


if __name__ == "__main__":
    asyncio.run(seed_menu())