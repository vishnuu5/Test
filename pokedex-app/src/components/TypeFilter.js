// components/TypeFilter.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredTypes } from '../redux/actions';
import axios from 'axios';

const TypeFilter = () => {
  const dispatch = useDispatch();
  const [types, setTypes] = useState([]);
  const selectedType = useSelector((state) => state.filteredTypes);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokemon types:', error);
      }
    };

    fetchTypes();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setFilteredTypes(value));
  };

  return (
    
    <select value={selectedType} onChange={handleChange}>
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type.name} value={type.name}>
          {type.name}
        </option>
      ))}
    </select>
  );
};

export default TypeFilter;
