from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db

from app.schemas.waste import (
    WasteEntryInput,
    WasteEntryOut
)

from app.services.waste import (
    add_waste_entry,
    get_waste_history
)


router = APIRouter(
    prefix="/waste",
    tags=["Waste"]
)


@router.post(
    "/",
    response_model=WasteEntryOut
)
async def add_waste_entry_route(
    data: WasteEntryInput,
    db: AsyncSession = Depends(get_db)
):

    try:

        result = await add_waste_entry(
            db=db,
            data=data
        )

        return result

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get(
    "/",
    response_model=list[WasteEntryOut]
)
async def get_waste_history_route(
    db: AsyncSession = Depends(get_db)
):

    try:

        waste_products = await get_waste_history(
            db=db
        )

        return waste_products

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )