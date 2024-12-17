import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

import AsyncStorage from '@react-native-async-storage/async-storage'

import icons from '../constants/icons'

const Login = () => {

   const [userCredentials, setUserCredentials] = useState({ login: '', senha: '' })
   const [errorOnFetch, setErrorOnFetch] = useState(false)

   const router = useRouter()
   
   useEffect(() => {

      const validate = async () => { 

         const loginDataItem = await AsyncStorage.getItem('loginData')
         const loginData = JSON.parse(loginDataItem)

         if(!loginData.token) {
            await AsyncStorage.clear()
            return
         }

         try {
            const response = await fetch('https://bauciapi-production.up.railway.app/usuario/validate', {

               method: "POST",
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ token: loginData.token }),

            })

            const responseData = await response.json()

            if (loginData.token && response.ok) {
               router.push('/home')
            }
            else {
               await AsyncStorage.clear()
            }
         }
         catch (error) {
            console.log(error)
         }
      }

      validate()

   }, [])

   async function logIn() {

      try {

         const response = await fetch('https://bauciapi-production.up.railway.app/usuario/login', {

            method: "POST",
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               login: userCredentials.login,
               senha: userCredentials.senha,
            }),
         })

         const data = await response.json()

         if (response.ok) {
            AsyncStorage.setItem('loginData', JSON.stringify(data))
            router.push('/home')
         }
         else {
            AsyncStorage.clear()
            setErrorOnFetch(true)
            return
         }
      }
      catch (err) {
         console.log(err)
      }
   }

   return (
      
      <View style={styles.container}>

         <View style={styles.logoWrapper}>
            <icons.logo width={130} />
         </View>

         <View style={styles.form}>

            <Text style={styles.title}>Bem-Vindo</Text>

            <View style={styles.fieldsWrapper}>

               <Text style={styles.inputLabel}>Login</Text>

               <TextInput
                  placeholder='Insira o login'
                  style={[styles.input, errorOnFetch && { borderColor: 'red' }]}
                  value={userCredentials.login}
                  onChangeText={(text) => setUserCredentials(credentials => ({ ...credentials, login: text }))}
               />

               { errorOnFetch && <Text style={styles.errorSpan}>Login Inválido!</Text> }

               <Text style={styles.inputLabel}>Senha</Text>

               <TextInput
                  placeholder='Insira a senha'
                  style={[styles.input, errorOnFetch && { borderColor: 'red' }]}
                  value={userCredentials.senha}
                  onChangeText={(text) => setUserCredentials(credentials => ({ ...credentials, senha: text }))}
                  secureTextEntry={true}
               />

               { errorOnFetch && <Text style={styles.errorSpan}>Senha Inválida!</Text> }

               <View style={styles.buttonWrapper}>

                  <TouchableOpacity style={styles.logInBtn} onPress={logIn}>
                     <Text style={styles.logInText}>Entrar</Text>
                  </TouchableOpacity>

               </View>

            </View>

         </View>

      </View>
   )
}

const styles = StyleSheet.create({

   container: {
      backgroundColor: '#333840',
      flex: 1,
   },

   logoWrapper: {
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },

   form: {
      backgroundColor: '#FFF',
      paddingVertical: 30,
      paddingHorizontal: 20,
      flexDirection: 'column',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      height: '60%'
   },

   title: {
      fontFamily: 'Inter_700Bold',
      color: '#333840',
      fontSize: 30,
      marginBottom: 15
   },

   fieldsWrapper: {
      flex: 1,
      flexDirection: 'column'
   },

   input: {
      borderWidth: 1.5,
      borderColor: '#CBD2E0',
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 10,
      marginTop: 5,
      fontSize: 14,
      fontFamily: 'Inter_400Regular',
   },

   errorSpan: {
      color: 'red',
      fontFamily: 'Inter_700Bold',
      textAlign: 'right',
      fontSize: 10,
      marginBottom: -15
   },

   inputLabel: {
      marginTop: 15,
      fontFamily: 'Inter_700Bold',
      color: '#333840',
      fontSize: 12
   },

   buttonWrapper: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
   },

   logInBtn: {
      backgroundColor: '#333840',
      borderRadius: 5,
      paddingVertical: 10,
      marginTop: 30
   },

   logInText: {
      color: '#FFF',
      textAlign: 'center',
      fontFamily: 'Inter_700Bold',
      fontSize: 14
   }

})

export default Login