import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import s from "../../styles/Detail.module.css";
import Image from "next/image";

const Details = () => {
  const {
    query: { id },
  } = useRouter();

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const getPokemon = async () => {
      const res = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
      );
      const data = await res.json();
      setPokemon(data);
    };
    if (id) {
      getPokemon();
    }
  }, [id]);

  if (!pokemon) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>

      <div>
        <Link href="/">Back to Home</Link>
      </div>
      <div className={s.layout}>
        <div>
          <Image
            className={s.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
            width={300}
            height={300}
          />
        </div>
        <div>
          <div className={s.name}>{pokemon.name}</div>
          <div className={s.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <tb className={s.attribute}>{name}</tb>
                  <tb>{value}</tb>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Details;
