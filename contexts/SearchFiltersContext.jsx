import { createContext, useState } from 'react'

export const SearchFiltersContext = createContext()

const SearchFiltersProvider = ({ children }) => {

   const [inputTextValue, setInputTextValue] = useState("")
   const [prazosSelected, setPrazosSelected] = useState([

      { id: 1, min: 1, max: 2, active: false },
      { id: 2, min: 3, max: 4, active: false },
      { id: 3, min: 5, max: 6, active: false },
      { id: 4, min: 7, max: 8, active: false },
      { id: 5, min: 9, max: 10, active: false },
   ])

   return (
      <SearchFiltersContext.Provider value={{
         inputTextValue, setInputTextValue,
         prazosSelected, setPrazosSelected
      }}>
         {children}
      </SearchFiltersContext.Provider>
   )
}

export default SearchFiltersProvider