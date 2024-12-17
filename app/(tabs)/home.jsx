import { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import PrazoFilterBar from '../../components/PrazoFilterBar'
import ProdutosHomeList from '../../components/ProdutosHomeList'

import { Loading } from '../../components/Loading'

import { SearchFiltersContext } from '../../contexts/SearchFiltersContext'
import { ProductsListContext } from '../../contexts/productsListContext'

import icons from '../../constants/icons'

const Home = () => {

   const [userNome, setUserNome] = useState("")
   const [userCategoria, setUserCategoria] = useState("")
   const [isLoading, setIsLoading] = useState(false)

   const { inputTextValue, setInputTextValue } = useContext(SearchFiltersContext)
   const { setProductsList } = useContext(ProductsListContext)

   async function fetchDataFunc() {

      const loginData = await AsyncStorage.getItem('loginData')
      const { token } = JSON.parse(loginData)

      if (token) {

         try {

            setIsLoading(true)

            const response = await fetch(`https://bauciapi-production.up.railway.app/produto/${JSON.parse(loginData).categoriaID}`, {
               method: "GET",
               headers: {
                  'Authorization': `Bearer ${token}`,
               },
            })

            const fetchedData = await response.json()

            if(response.ok) {
               setProductsList(fetchedData)
               setIsLoading(false)
            }

         }
         catch (error) {
            console.log("erro: " + error.message)
         }

      }
   }

   useEffect(() => {

      const getUser = async () => {

         const loginDataItem = await AsyncStorage.getItem('loginData')
         const loginData = JSON.parse(loginDataItem)

         setUserNome(loginData.nome)
         setUserCategoria(loginData.categoria)
      }

      getUser()

   }, [])

   return (
      <View style={styles.container}>

         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20 }}>

            <Text style={styles.title}>
               Olá {userNome.split(' ')[0]}
            </Text>

            <View style={{ backgroundColor: '#333840', paddingVertical: 6, paddingHorizontal: 8, borderRadius: 5 }}>
               <Text style={{ color: '#FFF', fontSize: 12, fontFamily: 'Inter_400Regular', }}>{userCategoria}</Text>
            </View>

         </View>

         <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 60, marginTop: 20, paddingHorizontal: 20, gap: 15 }}>

            <View style={styles.searchBarWrapper}>

               <TextInput
                  placeholder='Nome do produto...'
                  value={inputTextValue}
                  style={styles.searchBar}
                  onChangeText={(text) => setInputTextValue(text)}
               />

               {
                  inputTextValue && (
                     <TouchableOpacity
                        style={{ height: 18, width: 18, marginLeft: 14 }}
                        onPress={() => setInputTextValue("")}
                     >
                        <icons.XGray width={18} height={18} />
                     </TouchableOpacity>
                  )
               }

            </View>

            <TouchableOpacity 
               style={{
                  width: 60,
                  height: 60,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  backgroundColor: '#2D3648',
                  borderStyle: 'solid',
                  borderRadius: 5,
               }}
               onPress={fetchDataFunc}
            >

               {
                  isLoading ? (
                     <Loading />
                  ) : (
                     <icons.reloadWhite width={24} height={24} />
                  )
               }

            </TouchableOpacity>

         </View>

         <PrazoFilterBar />
         <ProdutosHomeList />

      </View>
   )
}

const styles = StyleSheet.create({

   container: {
      backgroundColor: '#FFF',
      flex: 1,
      paddingTop: 40,
   },

   title: {
      fontSize: 30,
      fontFamily: 'Inter_700Bold',
   },

   searchBarWrapper: {
      flex: 1,
      flexDirection: 'row',

      borderWidth: 2,
      borderColor: '#C0C0C0',
      borderStyle: 'solid',

      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',

      paddingVertical: 8,
      borderRadius: 5,
      paddingHorizontal: 12,

      fontSize: 15
   },

   searchBar: {
      flex: 1,
   }

})

export default Home