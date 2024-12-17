import { createContext, useState } from 'react'

export const ToAddListProductsContext = createContext()

const ToAddListProductsProvider = ({ children }) => {

   const [modalActive, setModalActive] = useState(false)
   const [selectedProduct, setSelectedProduct] = useState({})

   return (
      <ToAddListProductsContext.Provider 
         value={{ modalActive, setModalActive, selectedProduct, setSelectedProduct }}
      >
         { children }
      </ToAddListProductsContext.Provider>
   )
}

export default ToAddListProductsProvider