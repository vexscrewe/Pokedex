import axios from 'axios'

import type {Poke} from '../types/Poke'

interface PokeResponse {
    pokes: Poke[] | null;
}

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

export async function fetchPokes (search = '') {
    
    try {
        const response = await api.get<PokeResponse>(`search.php?s=${search}`)
        return response.data.pokes ?? []
    } catch (error) {
        console.log('Erro ao buscar pokemons: ', error);
        return[];
    }

}

export async function fetchPokesById (id : string) {
    
    try {
        const response = await api.get<PokeResponse>(`lookup.php?s=${id}`)
        return response.data.pokes?.[0] ?? null
    } catch (error) {
        console.log('Erro ao buscar detalhes do pokemon: ', error);
    }

}