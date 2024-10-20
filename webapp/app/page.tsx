"use client";

import Head from "next/head";

export default function Home() {
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
          fetch('api/search').then((res) => res.json()).then((data)=>{
            console.log(data);
          });
        } } />
        </div>
      </main>

      <footer>
      </footer>
    </div>
  );
}
