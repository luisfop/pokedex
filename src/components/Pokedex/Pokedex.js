import React, { useState, useEffect, useReducer } from "react";

import { getAllPokemon, getPokemon } from "../../services/pokemon";
import CardComponent from "../Card/CardComponent";


const ACTIONS = {
  SET_URLS: 'SET_URLS',
}


const reducer = (state,action) => {
  switch(action.type){
    case ACTIONS.SET_URLS:
      return {
        ...state,
          nextUrl: action.payload.nextUrlSet,
          prevUrl: action.payload.prevUrlSet,
          loading: action.payload.loadingSet,
      }

    default:
    return state;
  }
}



function Pokedex() {
  const [ state, dispatch ] = useReducer(reducer, {})

  const {nextUrl, prevUrl, loading } = state;
  
  const [pokemonData, setPokemonData] = useState([]);
  // const [nextUrl, setNextUrl] = useState("");
  // const [prevUrl, setPrevUrl] = useState("");
  // const [loading, setLoading] = useState(true);

  const pokemonApi = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    async function fetchData() {
      //this function will handle the fetch of the pokemonData
      let response = await getAllPokemon(pokemonApi);

      dispatch({type: ACTIONS.SET_URLS , payload: {nextUrlSet: response.next, prevUrlSet: response.previous, loadingSet: false}});
      // setNextUrl(response.next);
      // setPrevUrl(response.previous);
      let pokemon = await loadingPokemon(response.results);
    }
    
    fetchData();
  }, []);
  
  
  const loadingPokemon = async data => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url);
        
        return pokemonRecord;
      })
      );
      
      setPokemonData(_pokemonData);
    };
    
    const next = async () => {
      // setLoading(true);

    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    // setNextUrl(data.next);
    // setPrevUrl(data.previous);
    // setLoading(false);

    dispatch({type:ACTIONS.SET_URLS, payload: { nextUrlSet: data.next, prevUrlSet: data.previous, loadingSet: false}});
  };

  const previous = async () => {
    // setLoading(true);
    dispatch({type: ACTIONS.SET_URLS, payload: {...state, loadingSet:true}});

    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    // setNextUrl(data.next);
    // setPrevUrl(data.previous);
    // setLoading(false);
    dispatch({type: ACTIONS.SET_URLS, payload: {nextUrlSet: data.next, prevUrlSet: data.previous, loadingSet: false}});


  };

  

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <button 
      onClick={previous}
      >Previous</button>
      <button onClick={next}>Next</button>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {pokemonData.map((pokemon, i) => {
            return <CardComponent key={i} pokemon={pokemon} />;
          })}
        </div>
      )}

      <hr />
    </div>
  );
}

export default Pokedex;
