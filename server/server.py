import pandas as pd
import textdistance 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

game_db = pd.read_parquet("../data/game_database.parquet")

@app.get("/")
def index():
    return {"Hello world"}


@app.get("/search")
def search(query: str):
    distances = game_db["name"].apply(lambda v : textdistance.levenshtein(v,query)).sort_values()
    return [{"game": json.loads(game_db.loc[idx].to_json()),"distance" : distance} for idx, distance
            in distances[:3].items()]