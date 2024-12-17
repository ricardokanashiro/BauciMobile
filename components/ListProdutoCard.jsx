import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import icons from '../constants/icons'

const ListProdutoCard = ({ id, image, name, prazoMin, prazoMax, amount, setSelectedProducts, index }) => {

   function changeAmount(operation) {

      if(operation === 'increase')
      {
         setSelectedProducts(products => products.map(product => product.id === id ? {...product, quantidade: ++amount} : product))
      }
      else if (operation === 'decrease')
      {
         setSelectedProducts(products => products.map(product => product.id === id ? {...product, quantidade: --amount} : product))

         if(amount === 1)
            {
               deleteProduct()
            }
      }
   }

   function deleteProduct()
   {
      setSelectedProducts(products => products.filter(product => product.id !== id))
   }

   return (
      
      <View style={[styles.container, {marginTop: index !== 0 ? 15 : 0}]}>

         <Image source={{ uri: image }} style={styles.image} />

         <View style={styles.contentWrapper}>

            <Text style={styles.name}>{name}</Text>

            <Text style={styles.prazo}>
               <Text style={styles.span}>Prazo: </Text> {prazoMin}-{prazoMax} dias
            </Text>

            <View style={styles.amountSelectorWrapper}>

               <View style={styles.amountSelector}>

                  <TouchableOpacity style={styles.minusButton} onPress={() => changeAmount('decrease')}>
                     <icons.minus width={16} height={16} />
                  </TouchableOpacity>

                  <View style={styles.amountNumWrapper}>
                     <Text style={styles.amountNum}>{amount}</Text>
                  </View>

                  <TouchableOpacity style={styles.plusButton} onPress={() => changeAmount('increase')}>
                     <icons.plus width={16} height={16} />
                  </TouchableOpacity>

               </View>

            </View>

         </View>

      </View>
   )
}

const styles = StyleSheet.create({

   container: {
      width: '100%',
      minHeight: 160,
      flexDirection: 'row',
      borderWidth: 2,
      borderColor: '#000',
      borderRadius: 5,
      borderStyle: 'solid'
   },

   image: {
      width: '40%',
      height: '100%',
      resizeMode: 'cover'
   },

   contentWrapper: {
      padding: 10,
      flex: 1
   },

   name: {
      fontFamily: 'Inter_700Bold',
      fontSize: 18
   },

   prazo: {
      fontSize: 13,
      marginVertical: 10,
      flexShrink: 0
   },

   span: {
      fontFamily: 'Inter_700Bold',
   },

   amountSelectorWrapper: {
      flexDirection: 'column',
      flexGrow: 1,
      flexShrink: 0,
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
   },

   amountSelector: {
      backgroundColor: '#EDF0F7',
      width: 105,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 5
   },

   minusButton: {
      width: 35,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center'
   },

   amountNumWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 35,
      height: 35,
   },

   amountNum: {
      
   },

   plusButton: {
      width: 35,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center'
   },
})

export default ListProdutoCard