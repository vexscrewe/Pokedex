import { Link } from 'react-router-dom'
import type {Poke} from '../types/Poke'
import { Info, Title, Image, Card } from './PokemonCard.style'

interface Props{
    poke: Poke
}

export function PokeCard ({poke}: Props){

    const displayTypes = poke.types
    .map(t => t.charAt(0).toUpperCase() + t.slice(1))
    .join("/");
    
    return(
        <Card>
            <Link to={`/poke/${poke.id}`} >
                <Image src={poke.sprite} />
                <Title>{poke.name}</Title>
                <Info>{displayTypes}</Info>
            </Link>
        </Card>
    )


}