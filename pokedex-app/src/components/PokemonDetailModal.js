// components/PokemonDetailModal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonDetailModal = ({ pokemonId, closeModal }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchData();
  }, [pokemonId]);

  return (
    <div>
      {details ? (
        <div>
          <h2>{details.name}</h2>
          <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${details.id}.svg`} alt={details.name} />
          <p>Type: {details.types[0].type.name}</p>
          <p>Height: {details.height}</p>
          <p>Weight: {details.weight}</p>
          {/* Add more details as needed */}
          <button onClick={closeModal}>Close</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonDetailModal;
