// components/PokemonCard.js
import React from 'react';
import Card from './Card/Card';
import './PokemonCard.css';
import Details from '../Details/Details';

const PokemonCard = ({ pokemon, onOpenModal }) => {
  const handleOpenModal = () => {
    onOpenModal(Details);
  };

  return (
    <Card>
      <div className='content'>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>{pokemon.name}</p>
      <p>{pokemon.type}</p>
      <p>ID: {pokemon.id}</p>
      <button onClick={handleOpenModal}>Click To Open</button> </div>
    </Card>
  );
};

export default PokemonCard;
