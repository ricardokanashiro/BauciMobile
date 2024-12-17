import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

import AsyncStorage from '@react-native-async-storage/async-storage'

import icons from "../../constants/icons"

const user = () => {

   const [userNome, setUserNome] = useState("")
   const [userLogin, setUserLogin] = useState("")
   const [userCategoria, setUserCategoria] = useState("")

   const router = useRouter()

   useEffect(() => {

      const getUser = async () => {

         const loginDataItem = await AsyncStorage.getItem('loginData')
         const loginData = JSON.parse(loginDataItem)

         setUserNome(loginData.nome)
         setUserLogin(loginData.login)
         setUserCategoria(loginData.categoria)
      }

      getUser()

   }, [])

   async function logOut()
   {
      await AsyncStorage.clear()
      router.push('/')
   }

   return (
      <View style={styles.container}>

         <Text style={styles.title}>Usuário</Text>
         
         <View>

            <Text style={styles.nome}>{userNome}</Text>
            <Text style={styles.login}>{userLogin}</Text>

            <View style={styles.label}>
               <Text style={styles.labelText}>{userCategoria}</Text>
            </View>

         </View>

         <TouchableOpacity style={styles.exitBtn} onPress={logOut}>

            <Text style={styles.exitBtnText}>Sair</Text>
            <icons.exit width={18} height={18} style={styles.exitIcon} />

         </TouchableOpacity>

      </View>
   )
}

const styles = StyleSheet.create({

   container: {
      backgroundColor: '#FFF',
      flex: 1,
      paddingTop: 40,
      paddingBottom: 15,
      paddingHorizontal: 20,
      justifyContent: 'flex-start'
   },

   title: {
      fontSize: 40,
      fontFamily: 'Inter_700Bold',
      marginBottom: 30,
   },

   nome: {
      fontSize: 26,
      fontFamily: 'Inter_700Bold',
   },

   login: {
      color: '#2D3648',
      fontFamily: 'Inter_400Regular',
   },

   label: {
      backgroundColor: '#000',
      padding: 6,
      borderRadius: 4,
      alignSelf: 'flex-start',
      marginTop: 8
   },

   labelText: {
      color: '#FFF',
      fontFamily: 'Inter_400Regular'
   },

   exitBtn: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      fontFamily: 'Inter_700Bold',
      backgroundColor: '#000',
      flexDirection: 'row',
      alignSelf: 'flex-start',
      borderRadius: 5,
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
   },

   exitBtnText: {
      color: '#FFF',
      fontFamily: 'Inter_700Bold',
      fontSize: 16
   },

   exitIcon: {
      marginLeft: 5
   }
})

export default user