import { useContext, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import { ToAddListProductsContext } from '../contexts/toAddListProductsContext'

const HomeProdutoCard = ({ nome, descricao, prazoMin, prazoMax, image, id, onLeft, index }) => {

   const { setModalActive, setSelectedProduct } = useContext(ToAddListProductsContext)

   function selectProduct() {

      const selectedProduct = {
         image,
         nome,
         descricao,
         prazoMin,
         prazoMax,
         id
      }

      setSelectedProduct(selectedProduct)
      setModalActive(true)
   }

   return (
      <View style={[styles.container, { marginLeft: onLeft ? '4%' : '0%' }]}>

         <Image source={{ uri: image }} style={styles.image} />

         <View style={styles.contentWrapper}>

            <Text style={styles.titulo}>{nome}</Text>
            <Text style={styles.descricao}>{descricao}</Text>

            <Text style={styles.prazo}>
               <Text style={styles.span}>Prazo: </Text> {prazoMin}-{prazoMax} dias
            </Text>

            <View style={styles.buttonWrapper}>
               <TouchableOpacity style={styles.button} onPress={selectProduct}>
                  <Text style={styles.buttonText}>Adicionar à Lista</Text>
               </TouchableOpacity>
            </View>

         </View>

      </View>
   )
}

const styles = StyleSheet.create({

   container: {
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '#000',
      borderRadius: 6,
      width: '48%',
      height: 360,
      marginTop: 15,
      paddingBottom: 5,
      flexDirection: 'column'
   },

   image: {
      width: '100%',
      height: '35%'
   },

   contentWrapper: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      flex: 1
   },

   titulo: {
      fontSize: 20,
      fontFamily: 'Inter_700Bold',
   },

   descricao: {
      fontSize: 10.5,
      fontFamily: 'Inter_400Regular',
      color: '#565d6d'
   },

   prazo: {
      fontSize: 12,
      marginVertical: 8
   },

   span: {
      fontFamily: 'Inter_700Bold',
      fontSize: 12
   },

   buttonWrapper: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end'
   },

   button: {
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      borderRadius: 5,
      flexShrink: 0
   },

   buttonText: {
      color: '#FFF',
      fontFamily: 'Inter_700Bold',
      fontSize: 12
   }
})

export default HomeProdutoCard