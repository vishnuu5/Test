import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setFilteredTypes } from './redux/actions';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import TypeFilter from './components/TypeFilter';
import PokemonDetailModal from './components/PokemonDetailModal';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const { searchTerm, filteredTypes } = useSelector((state) => state);

  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Fetch Pokemon data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20`);
        const pokemonData = response.data.results;
        setPokemons(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokemon data', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle card click and fetch detailed information
  const handleCardClick = async (id) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const detailedPokemon = response.data;
      setSelectedPokemon(detailedPokemon);
    } catch (error) {
      console.error('Error fetching detailed Pokemon data', error);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedPokemon(null);
  };

  // Function to handle search term change
  const handleSearch = (value) => {
    dispatch(setSearchTerm(value));
  };

  // Function to handle type filter change
  const handleTypeChange = (selectedType) => {
    let newFilteredTypes = [...filteredTypes];

    if (filteredTypes.includes(selectedType)) {
      newFilteredTypes = newFilteredTypes.filter((type) => type !== selectedType);
    } else {
      newFilteredTypes.push(selectedType);
    }

    dispatch(setFilteredTypes(newFilteredTypes));
  };

  // Filter pokemons based on search term and selected types
  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filteredTypes.length === 0 || filteredTypes.includes(pokemon.type))
  );

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <TypeFilter types={['grass', 'fire', 'water', 'electric']} handleTypeChange={handleTypeChange} />
      <PokemonList pokemons={filteredPokemons} handleCardClick={handleCardClick} />
      {selectedPokemon && <PokemonDetailModal pokemon={selectedPokemon} closeModal={closeModal} />}
    </div>
  );
}

export default App;
