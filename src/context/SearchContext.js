import React, {createContext} from 'react'

const SearchContext = createContext({
  searchInput: '',
  searchResponse: {},
  onTriggerSearchingQuery: () => {},
})

export default SearchContext
