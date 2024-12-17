import { createContext, useState } from "react"

export const ProductsSelectedContext = createContext()

const ProductsSelectedProvider = ({ children }) => {

   const [selectedProducts, setSelectedProducts] = useState([])

   return (
      <ProductsSelectedContext.Provider value={{ selectedProducts, setSelectedProducts }}>
         { children }
      </ProductsSelectedContext.Provider>
   )
}

export default ProductsSelectedProvider