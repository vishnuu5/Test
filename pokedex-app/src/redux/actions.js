// redux/actions.js
export const setSearchTerm = (term) => ({
    type: 'SET_SEARCH_TERM',
    payload: term,
  });
  
  export const setFilteredTypes = (types) => ({
    type: 'SET_FILTERED_TYPES',
    payload: types,
  });
  