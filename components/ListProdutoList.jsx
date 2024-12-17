import { useContext } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import ListProdutoCard from './ListProdutoCard'

import { ProductsSelectedContext } from '../contexts/ProductsSelectedContext'

const ListProdutoList = () => {

   const { selectedProducts, setSelectedProducts } = useContext(ProductsSelectedContext)

   return (
      <ScrollView style={styles.container}>

         {
            selectedProducts.map((produto, index) => (

               <ListProdutoCard
                  id={produto.id}
                  image={produto.image}
                  name={produto.nome}
                  prazoMin={produto.prazoMin}
                  prazoMax={produto.prazoMax}
                  amount={produto.quantidade}
                  setSelectedProducts={setSelectedProducts}
                  key={index}
                  index={produto.id}
               />
            ))
         }

      </ScrollView>
   )
}

const styles = StyleSheet.create({

   container: {
      flex: 1,
      flexDirection: 'column',
      marginBottom: 20
   }
})

export default ListProdutoList