import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Tabs, useRouter } from 'expo-router'

import { GestureHandlerRootView } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-async-storage/async-storage'

import SearchFiltersProvider from '../../contexts/SearchFiltersContext'
import ProductsSelectedProvider from '../../contexts/ProductsSelectedContext'
import ToAddListProductsProvider from '../../contexts/toAddListProductsContext'
import ProductsListProvider from '../../contexts/productsListContext'

import AddToListModal from '../../components/AddToListModal'


import icons from "../../constants/icons"

const TabIcon = ({ Icon, IconDisabled, name, focused }) => {
   return (
      <View style={{
         justifyContent: 'center',
         alignItems: 'center',
         height: '100%',
         marginBottom: '-100%',
         width: 100
      }}>

         {
            focused ? <Icon width={24} height={24} /> : <IconDisabled width={24} height={24} />
         }

         <Text style={{ marginTop: 5, fontFamily: 'Inter_400Regular', color: `${focused ? '#000' : '#C0C0C0'}`, textAlign: 'center' }}>{name}</Text>

      </View>
   )
}

const Layout = () => {

   const [isLoading, setIsLoading] = useState(true)

   const router = useRouter()

   useEffect(() => {

      const validate = async () => {

         const loginDataItem = await AsyncStorage.getItem('loginData')
         const loginData = JSON.parse(loginDataItem)

         if (!loginData.token) {
            router.push('/')
         }

         try {
            const response = await fetch('https://bauciapi-production.up.railway.app/usuario/validate', {

               method: "POST",
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ token: loginData.token }),

            })

            if (!response.ok) {
               router.push('/')
            }
         }
         catch (error) {
            console.log(error)
         }
      }

      validate()
      setIsLoading(false)

   }, [])

   if (isLoading) {
      return (
         <View>
            <Text>Carregando...</Text>
         </View>
      )
   }

   return (
      <>
         <SearchFiltersProvider>
            <ProductsSelectedProvider>
               <ToAddListProductsProvider>
                  <ProductsListProvider>
                     <GestureHandlerRootView style={{ flex: 1 }}>

                        <AddToListModal />

                        <Tabs
                           screenOptions={{
                              tabBarShowLabel: false,
                              tabBarStyle: {
                                 height: 70,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                              },
                              tabBarItemStyle: {
                                 justifyContent: 'center',
                                 alignItems: 'center',
                              },
                              tabBarLabelStyle: {
                                 fontSize: 16,
                                 fontFamily: 'Inter_400Regular',
                                 color: '#000',
                                 textAlign: 'center',
                              },
                           }}
                        >

                           <Tabs.Screen
                              name='home'
                              options={{
                                 title: 'Home',
                                 headerShown: false,
                                 tabBarIcon: ({ color, focused }) => (
                                    <TabIcon
                                       Icon={icons.Home}
                                       IconDisabled={icons.HomeDisabled}
                                       color={color}
                                       name="Home"
                                       focused={focused}
                                    />
                                 ),
                              }}
                           />

                           <Tabs.Screen
                              name='list'
                              options={{
                                 title: 'List',
                                 headerShown: false,
                                 tabBarIcon: ({ color, focused }) => (
                                    <TabIcon
                                       Icon={icons.List}
                                       IconDisabled={icons.ListDisabled}
                                       color={color}
                                       name="Lista"
                                       focused={focused}
                                    />
                                 )
                              }}
                           />

                           <Tabs.Screen
                              name='user'
                              options={{
                                 title: 'User',
                                 headerShown: false,
                                 tabBarIcon: ({ color, focused }) => (
                                    <TabIcon
                                       Icon={icons.User}
                                       IconDisabled={icons.UserDisabled}
                                       color={color}
                                       name="Usuário"
                                       focused={focused}
                                    />
                                 )
                              }}
                           />

                        </Tabs>

                     </GestureHandlerRootView>
                  </ProductsListProvider>
               </ToAddListProductsProvider>
            </ProductsSelectedProvider>
         </SearchFiltersProvider>
      </>
   )
}

export default Layout