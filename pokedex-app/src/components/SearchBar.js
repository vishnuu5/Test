// components/SearchBar.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../redux/actions';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchTerm(value));
  };

  return <input type="text" placeholder="Search Pokemon" onChange={handleChange} />;
};

export default SearchBar;
