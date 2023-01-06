import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import s from "../styles/Home.module.css";
import Image from "next/image";

const Home = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const getPokemon = async () => {
      const res = await fetch(
        "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
      );
      const data = await res.json();
      setPokemon(data);
    };
    getPokemon();
  }, []);

  return (
    <>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <main>
        <h2>Pokemon List</h2>
        <div className={s.grid}>
          {pokemon.map((pokemon) => (
            <div className={s.card} key={pokemon.id}>
              <Link href={`/pokemon/${pokemon.id}`}>
                <Image
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                  width={200}
                  height={200}
                />
                <h3>{pokemon.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
