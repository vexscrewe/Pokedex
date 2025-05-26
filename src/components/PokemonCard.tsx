import { Link } from 'react-router-dom'
import type {Poke} from '../types/Poke'
import { Info, Title, Image, Card } from './PokemonCard.style'

interface Props{
    poke: Poke
}

export function PokeCard ({poke}: Props){
    return(
        <Card>
            <Link to={`/poke/${poke.id}`} />
            <Image src={poke.sprite} />
            <Title>{poke.name}</Title>
            <Info>{poke.flavor_text} - {poke.type}</Info>
        </Card>
    )


}