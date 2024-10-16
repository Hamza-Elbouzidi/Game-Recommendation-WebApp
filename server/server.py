from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def index():
    return {"Hello world"}


@app.get("/get_recommendations")
def read_item(game_name:str):
    return {"game_name" : game_name}