from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import orders
from app.routers import menu  
from app.routers.inventory import router as inventory_router
from app.routers.waste import router as waste_router


app = FastAPI()

app.include_router(orders.router)
app.include_router(menu.router)
app.include_router(inventory_router)
app.include_router(waste_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://www.villa-management-system.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "ok"}