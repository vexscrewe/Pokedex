import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchPokesById } from "../services/pokedexAPI"
import { Container, Info, Title } from "./PokemonDetails.styled"
import type { Poke } from "../types/Poke"

export function PokemonDetails(){

    const {id} = useParams()
    const [poke, setPoke] = useState<Poke | null>(null)

    useEffect(() => {
        if(id) {
            fetchPokesById(id).then(setPoke)
        }
    }, [id])

    if (poke!) return <p>Carregando...</p>

    return(
        <Container>
            <Image src={poke.sprite} alt= {poke.name}/>
            <Title>{poke.name}</Title>
            <Info>{poke.flavor_text}</Info>
        </Container>
    )
}