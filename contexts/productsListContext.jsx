import { createContext, useState } from "react"

export const ProductsListContext = createContext()

const ProductsListProvider = ({ children }) => {

   const [productsList, setProductsList] = useState([])

   return <ProductsListContext.Provider value={{ productsList, setProductsList }}>
      { children }
   </ProductsListContext.Provider>

}

export default ProductsListProvider