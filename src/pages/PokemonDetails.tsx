import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchPokeDetail} from "../services/pokedexAPI"
import { Container, Info, Title, Image } from "./PokemonDetails.styled"
import type { Poke } from "../types/Poke"

export function PokemonDetails(){

    const {id} = useParams()
    const [poke, setPoke] = useState<Poke | null>(null)

    useEffect(() => {
        if (!id) return;                       // sem id não faz nada
        const numericId = parseInt(id, 10);    // converte “1” → 1
        fetchPokeDetail(numericId).then(setPoke);
      }, [id]);

    if (!poke) return <p>Carregando...</p>

    return(
        <Container>
            <Image src={poke.sprite} alt= {poke.name}/>
            <Title>{poke.name}</Title>
            <Info>{poke.flavor_text}</Info>
        </Container>
    )
}