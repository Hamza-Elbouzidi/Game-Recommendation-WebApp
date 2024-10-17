import pandas as pd
import textdistance 
from fastapi import FastAPI

app = FastAPI()

game_db = pd.read_parquet("../data/game_database.parquet")

@app.get("/")
def index():
    return {"Hello world"}


@app.get("/search")
def search(game_name: str):
    distances = game_db["name"].apply(lambda v : textdistance.levenshtein(v,game_name)).sort_values()
    return [{"game": game_db.loc[idx].to_json(),"distance" : distance} for idx, distance
            in distances[:3].items()]