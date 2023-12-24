// redux/reducers.js
const initialState = {
    searchTerm: '',
    filteredTypes: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SEARCH_TERM':
        return { ...state, searchTerm: action.payload };
  
      case 'SET_FILTERED_TYPES':
        return { ...state, filteredTypes: action.payload };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;
  