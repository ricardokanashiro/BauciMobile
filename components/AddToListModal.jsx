import React, { useContext, useMemo, useRef, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Pressable, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

import BottomSheet from '@gorhom/bottom-sheet'

import { ToAddListProductsContext } from '../contexts/toAddListProductsContext'
import { ProductsSelectedContext } from '../contexts/ProductsSelectedContext'

import icons from '../constants/icons'

const { width, height } = Dimensions.get('window')

const ProductModal = () => {

   const [amount, setAmount] = useState(1)

   const { modalActive, setModalActive, selectedProduct } = useContext(ToAddListProductsContext)
   const { setSelectedProducts, selectedProducts } = useContext(ProductsSelectedContext)

   const bottomSheetRef = useRef(null)

   const snapPoints = useMemo(() => ['20%', '35%'], [])
   
   const router = useRouter()

   if (!modalActive) {
      return null
   }

   function addProductInList() {

      const existentProduct = selectedProducts.find(product => product.id === selectedProduct.id)

      if(!existentProduct)
      {
         const newProduct = {
            image: selectedProduct.image,
            nome: selectedProduct.nome,
            prazoMin: selectedProduct.prazoMin,
            prazoMax: selectedProduct.prazoMax,
            quantidade: amount,
            id: selectedProduct.id
         }

         setSelectedProducts(prev => ([newProduct, ...prev]))
      }
      else 
      {
         setSelectedProducts(prev => prev.map(product => product.id === selectedProduct.id ? { ...product, quantidade: amount } : product))
      }

      setAmount(1)
      setModalActive(false)
      router.push('/list')
   }

   return (
      <View style={styles.overlay}>
         <Pressable style={styles.backdrop} onPress={() => {setModalActive(false); setAmount(0)}} />

         <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onClose={() => setModalActive(false)}
            style={styles.bottomSheet}
         >
            <View style={styles.contentContainer}>

               <View style={styles.row}>

                  <Image source={{ uri: selectedProduct.image }} style={styles.image} resizeMode="cover" />

                  <View style={styles.detailsContainer}>

                     <Text style={styles.title}>{selectedProduct.nome}</Text>

                     <Text style={styles.subtitle}>
                        <Text style={styles.boldText}>Prazo:</Text> {selectedProduct.prazoMin} - {selectedProduct.prazoMax}
                     </Text>

                     <View style={styles.counterContainer}>

                        <View style={styles.counter}>

                           <TouchableOpacity style={styles.counterButton} onPress={() => setAmount(prev => prev > 1 ? --prev : prev)}>
                              <icons.minus width={12} height={12} />
                           </TouchableOpacity>

                           <Text style={styles.counterText}>{amount}</Text>

                           <TouchableOpacity style={styles.counterButton} onPress={() => setAmount(prev => ++prev)}>
                              <icons.plus width={12} height={12} />
                           </TouchableOpacity>

                        </View>

                     </View>

                  </View>

               </View>

               <TouchableOpacity style={styles.addButton} onPress={addProductInList}>
                  <Text style={styles.addButtonText}>Adicionar à Lista</Text>
               </TouchableOpacity>

            </View>

         </BottomSheet>

      </View>
   );
};

const styles = StyleSheet.create({
   overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: width,
      height: height,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
      zIndex: 1000
   },

   backdrop: {
      width: '100%',
      height: '100%',
   },

   bottomSheet: {
      backgroundColor: '#FFF',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
   },

   contentContainer: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: 16,
      flexDirection: 'column',
   },

   row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      gap: 20,
   },

   image: {
      height: 120,
      width: 120,
      aspectRatio: 1
   },

   detailsContainer: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      height: 100,
   },

   title: {
      fontFamily: 'Inter_700Bold',
      fontSize: 18,
   },

   subtitle: {
      fontFamily: 'Inter_400Regular',
      fontSize: 13,
      color: '#717D96',
   },

   boldText: {
      fontFamily: 'Inter_700Bold',
   },

   counterContainer: {
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
   },

   counter: {
      backgroundColor: '#EDF0F7',
      flexDirection: 'row',
      width: 85,
      height: 40,
      paddingVertical: 10,
      paddingHorizontal: 5,
      borderRadius: 5,
   },

   counterButton: {
      width: 25,
      justifyContent: 'center',
      alignItems: 'center',
   },

   counterText: {
      width: 25,
      textAlign: 'center',
      fontFamily: 'Inter_700Bold',
   },

   addButton: {
      backgroundColor: '#000',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
   },

   addButtonText: {
      color: '#FFF',
      fontFamily: 'Inter_700Bold',
   },
});

export default ProductModal;
