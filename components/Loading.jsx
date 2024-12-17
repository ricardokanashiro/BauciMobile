import { View, StyleSheet, ActivityIndicator } from 'react-native'

const Loading = () => (

   <View style={styles.container}>

      <ActivityIndicator size="large" color="#FFF" style={{ transform: [{ scaleX: .9 }, { scaleY: .9 }] }} /> 

   </View>

)

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
})

export { Loading }
