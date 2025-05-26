import { useEffect, useState } from "react";
import { Button, Container, Grid, Input, SearchBox, Title } from "./Home.styles";
import type { Poke } from "../types/Poke";
import { fetchPokeDetail, fetchPokes } from "../services/pokedexAPI";
import { PokeCard } from "../components/PokemonCard";

export function Home(){

    const [limit] = useState(151);

    const [pokes, setPokes] = useState<Poke[]>([])
    const [search, setSearch] = useState('')

    const handleSearch = async () => {

        const result = await fetchPokes(search)
        setPokes(result)
    }

    /*useEffect(() => {
        fetchPokes().then(setPokes)
    }, [])*/

    useEffect(() => {
        const ids = Array.from({ length: limit }, (_, i) => i + 1);
        Promise.all(ids.map(fetchPokeDetail))
          .then(setPokes);
      }, [limit]);

    return (
        <Container>

            <Title>Teste</Title>

            <SearchBox>
                <Input
                    type= "text"
                    placeholder= "Buscar pokemon..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Buscar</Button>
            </SearchBox>

            <Grid>
                {
                    pokes.map((poke) => (
                        <PokeCard key={poke.id}
                        poke={poke}
                        />
                    ))
                }
            </Grid>

        </Container>
    )

}