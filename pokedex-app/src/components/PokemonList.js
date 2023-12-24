// components/PokemonList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PokemonCard from './PokemonCard';
import PokemonDetailModal from './PokemonDetailModal';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const searchTerm = useSelector((state) => state.searchTerm);
  const filteredType = useSelector((state) => state.filteredTypes);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const results = response.data.results;

      const newPokemons = await Promise.all(
        results.map(async (pokemon) => {
          const detailedResponse = await axios.get(pokemon.url);
          return {
            id: detailedResponse.data.id,
            name: pokemon.name,
            type: detailedResponse.data.types[0].type.name,
            image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${detailedResponse.data.id}.svg`,
          };
        })
      );

      setPokemons(newPokemons);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [offset, searchTerm, filteredType]);

  const handlePrevious = () => {
    setOffset(offset - 20);
  };

  const handleNext = () => {
    setOffset(offset + 20);
  };

  const handleCardClick = (pokemonId) => {
    setSelectedPokemonId(pokemonId);
  };

  const closeModal = () => {
    setSelectedPokemonId(null);
  };

  return (
    <div><br></br>
      <button onClick={handlePrevious} disabled={offset === 0}>
        Previous
      </button>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} onOpenModal={handleCardClick} />
      ))}
      <button onClick={handleNext}>Next</button>

      {selectedPokemonId && <PokemonDetailModal pokemonId={selectedPokemonId} closeModal={closeModal} />}
    </div>
  );
};

export default PokemonList;
