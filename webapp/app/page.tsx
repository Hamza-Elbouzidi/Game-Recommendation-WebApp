"use client";

import Head from "next/head";
import { useState } from "react";

type Game = {
name : string;
header_image : string;
short_description : string;
detailed_description : string;
genres : string;
embedding : number[];
}

type SearchResults = {
  game : Game;
  distance : number;
}

export default function Home() {
  const [searchResults, setSearchResults] = useState([] as SearchResults[]);
  return (
    <div>
      <Head>
        <title>Game Oracle</title>
      </Head>   

      <header className="header"> 
        <h1 className="logo">
          <a >Game Oracle</a>
        </h1>
      </header>

      <main>
        <div className="content">
        <input type="search" className ="searchbar" placeholder="Enter text" onChange={(e) =>{
          fetch('http://127.0.0.1:8000/search?' + new URLSearchParams({ query: e.target.value})).then((res) => res.json()).then((data)=>{
            console.log(data);
            setSearchResults(data as SearchResults[]);
          });
        } } />
        <div className="results">
          {searchResults.map((result , idx) => 
            <div key ={idx} className="result">
              <h2 className="resultName">{result.game.name}</h2>
              <img src={result.game.header_image}/>
            </div>)}
        </div>
        </div>
      </main>

      <footer>
      </footer>
    </div>
  );
}
