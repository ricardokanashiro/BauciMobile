import { useContext, useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import HomeProdutoCard from './HomeProdutoCard'

import { SearchFiltersContext } from '../contexts/SearchFiltersContext'
import { ProductsListContext } from '../contexts/productsListContext'

const ProdutosHomeList = () => {

   const { inputTextValue, prazosSelected } = useContext(SearchFiltersContext)
   const { productsList, setProductsList } = useContext(ProductsListContext)

   const prazosAtivos = prazosSelected.filter(prazo => prazo.active)

   async function fetchDataFunc() {

      const loginData = await AsyncStorage.getItem('loginData')
      const { token } = JSON.parse(loginData)

      if (token) {
         try {
            const response = await fetch(`https://bauciapi-production.up.railway.app/produto/${JSON.parse(loginData).categoriaID}`, {
               method: "GET",
               headers: {
                  'Authorization': `Bearer ${token}`,
               },
            })

            const fetchedData = await response.json()

            setProductsList(fetchedData)
         }
         catch (error) {
            console.log("erro: " + error.message)
         }

      }
   }

   useEffect(() => {

      fetchDataFunc()

   }, [])

   return (

      <ScrollView>

         <View style={styles.container}>

            {
               inputTextValue !== "" ?

                  prazosAtivos.length > 0 ?

                  productsList.filter(produto =>
                        prazosAtivos.find(prazo =>
                           (prazo.max === produto.prazomaximo || prazo.max === produto.prazominimo || prazo.min === produto.prazomaximo || prazo.min === produto.prazominimo) && produto.nome.includes(inputTextValue)
                        ))
                        .map((produto, index) =>
                           <HomeProdutoCard
                              nome={produto.nome}
                              descricao={produto.descricao}
                              prazoMin={produto.prazominimo}
                              prazoMax={produto.prazomaximo}
                              image={produto.imagem}
                              id={produto.produtoid}
                              onLeft={index % 2 !== 0}
                              key={produto.produtoid}
                              index={index}
                           />
                        )

                     :

                     productsList.filter(produto => produto.nome.toUpperCase().includes(inputTextValue.toUpperCase())).map((produto, index) => produto.nome.toUpperCase().includes(inputTextValue.toUpperCase()) && (
                        <HomeProdutoCard
                           nome={produto.nome}
                           descricao={produto.descricao}
                           prazoMin={produto.prazominimo}
                           prazoMax={produto.prazomaximo}
                           image={produto.imagem}
                           id={produto.produtoid}
                           onLeft={index % 2 !== 0}
                           key={produto.produtoid}
                           index={index}
                        />
                     ))

                  :

                  prazosAtivos.length > 0 ?

                  productsList.filter(produto => prazosAtivos.find(prazo => (prazo.max === produto.prazomaximo || prazo.max === produto.prazominimo || prazo.min === produto.prazomaximo || prazo.min === produto.prazominimo))).map((produto, index) =>

                        <HomeProdutoCard
                           nome={produto.nome}
                           descricao={produto.descricao}
                           prazoMin={produto.prazominimo}
                           prazoMax={produto.prazomaximo}
                           image={produto.imagem}
                           id={produto.produtoid}
                           onLeft={index % 2 !== 0}
                           key={produto.produtoid}
                           index={index}
                        />

                     )

                     :

                     productsList.map((produto, index) => (
                        <HomeProdutoCard
                           nome={produto.nome}
                           descricao={produto.descricao}
                           prazoMin={produto.prazominimo}
                           prazoMax={produto.prazomaximo}
                           image={produto.imagem}
                           id={produto.produtoid}
                           onLeft={index % 2 !== 0}
                           key={produto.produtoid}
                           index={index}
                        />
                     ))
            }

         </View>

      </ScrollView>
   )
}

const styles = StyleSheet.create({

   container: {
      flex: 1,
      marginHorizontal: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
      position: 'relative'
   }
})

export default ProdutosHomeList