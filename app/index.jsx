import { View } from 'react-native'
import { useFonts } from 'expo-font'
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter'

import Login from '../components/Login'
import { Loading } from '../components/Loading'

import icons from '../constants/icons'

const index = () => {

   const [fontsLoaded] = useFonts({
      Inter_400Regular,
      Inter_700Bold,
   })

   if (!fontsLoaded) {
      return (
         <View style={{ backgroundColor: '#333840', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <icons.logo width={200} />
            <Loading />
         </View>
      )
   }

   return (
      <Login />
   )
}

export default index
