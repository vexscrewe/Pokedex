import { useEffect, useState } from "react";
import { Button, Container, Grid, Input, SearchBox, Title } from "./Home.styles";
import type { Poke } from "../types/Poke";
import { fetchPokeDetail } from "../services/pokedexAPI";
import { PokeCard } from "../components/PokemonCard";

export function Home(){

    const [limit] = useState(151);

    const [pokes, setPokes] = useState<Poke[]>([])
    const [search, setSearch] = useState('')

    const handleSearch = async () => {
        if (!search.trim()) {
          // se o campo ficou vazio, volta pro carregamento padrão (por exemplo, 20 primeiros)
          const ids = Array.from({ length: 20 }, (_, i) => i + 1);
          const bulk = await Promise.all(ids.map(fetchPokeDetail));
          setPokes(bulk.filter(p => p !== null) as Poke[]);
          return;
        }
      
        // busca exata por nome
        const result = await fetchPokeDetail(search.toLowerCase());
        if (result) {
          setPokes([result]);
        } else {
          setPokes([]);              // nenhum encontrado
        }
      };

    useEffect(() => {
        const ids = Array.from({ length: limit }, (_, i) => i + 1);
        Promise.all(ids.map(fetchPokeDetail))
          .then(setPokes);
      }, [limit]);

    return (
        <Container>

            <Title>Pokedex</Title>

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