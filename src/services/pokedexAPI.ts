import axios from 'axios'
import type {Poke} from '../types/Poke'


const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})


interface PokemonResponse {
    id:number;
    types: { type: { name: string } }[];
    sprites: { front_default: string };
  }
  interface SpeciesResponse {
    names: { name: string; language: { name: string } }[];
    flavor_text_entries: {
      flavor_text: string;
      language: { name: string };
      version: { name: string };
    }[];
  }


export async function fetchPokeDetail(idOrName: string | number): Promise<Poke> {
  // dispara as duas requisições em paralelo
  const [pokRes, specRes] = await Promise.all([
    api.get<PokemonResponse>(`pokemon/${idOrName}`),
    api.get<SpeciesResponse>(`pokemon-species/${idOrName}`),
  ]);
  
    const pokemonData = pokRes.data;
    const speciesData = specRes.data;
  
    // name em inglês
    const nameEN =
    speciesData.names.find((n) => n.language.name === 'en')?.name ?? `${idOrName}`;
  
    // flavor_text em inglês, versão black
    const flavorEntry = speciesData.flavor_text_entries.find(
      f =>
        f.language.name === 'en' &&
        f.version.name.toLowerCase() === 'black'
    );
    const flavorText = flavorEntry?.flavor_text.replace(/\n|\f/g, ' ') ?? '';
  
    // tipos
    const types = pokemonData.types.map(t => t.type.name);
  
    // sprite
    const sprite = pokemonData.sprites.front_default;
  
    return {
      id: pokemonData.id,
      name: nameEN,
      flavor_text: flavorText,
      types,
      sprite,
    };
  }
