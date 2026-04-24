from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

items = [
    {"id": 1, "text": "Prvi item"},
    {"id": 2, "text": "Drugi item"},
]

class ItemCreate(BaseModel):
    text: str

@app.get("/items")
def get_items():
    return items

@app.post("/items")
def add_item(item: ItemCreate):
    new_item = {
        "id": max([i["id"] for i in items], default=0) + 1,
        "text": item.text
    }
    items.append(new_item)
    return new_item

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    global items
    items = [item for item in items if item["id"] != item_id]
    return {"message": "Item deleted"}