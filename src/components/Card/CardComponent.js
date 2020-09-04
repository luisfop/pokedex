import React from "react";

import { Card} from "react-bootstrap";

export default function CardComponent({ pokemon }) {
  // console.log(pokemon.abilities[0].ability.name);



  const pokeAbi = pokemon.abilities.map(xablau => {
    return <p>{xablau.ability.name}</p>
  })




  return (
    <>
      <Card style={{ width: "18rem", marginBottom: "50px" }}>
        <Card.Img variant="top" src={pokemon.sprites.front_default} />
        <Card.Body>
          <Card.Title>{pokemon.name}</Card.Title>            
              {pokeAbi}
        </Card.Body>
      </Card>
    </>
  );
}

