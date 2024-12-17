import { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'

import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'

import dayjs from 'dayjs'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { ProductsSelectedContext } from '../../contexts/ProductsSelectedContext'

import ListProdutoList from '../../components/ListProdutoList'

import { logo } from "../../utils/bauciLogo64"

const list = () => {

   const { selectedProducts } = useContext(ProductsSelectedContext)

   async function generateAndSharePDF() {

      const loginDataItem = await AsyncStorage.getItem('loginData')
      const loginData = JSON.parse(loginDataItem)

      const currentDate = dayjs().format('DD-MM-YYYY')
      const currentTime = dayjs().format('HH:mm:ss')

      const html = `
         <html>
            <body style="display: flex; align-items: center; width: 100%; flex-direction: column">
               <img src="${logo}" style="width: 170px; height: 170px;" />

               <h1>PEDIDO DE COMPRA</h1>

               <p style="text-align: left; width: 750px; margin-top: 50px"><b>Nome: </b> ${loginData.nome}</p>
               <p style="text-align: left; width: 750px; margin-top: 0px"><b>Categoria: </b> ${loginData.categoria}</p>
               <p style="text-align: left; width: 750px; margin-top: 0px"><b>Data: </b> ${currentDate}</p>
               <p style="text-align: left; width: 750px; margin-top: 0px; margin-bottom: 80px"><b>Horário: </b> ${currentTime}</p>

               <table style="border-collapse: collapse; width: 100%; max-width: 600px; margin: auto;">
                  <thead>
                     <tr>
                     <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Nome do Produto</th>
                     <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Quantidade</th>
                     </tr>
                  </thead>
                  <tbody>

                     ${selectedProducts.map(produto => (`
                        <tr>
                           <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${produto.nome}</td>
                           <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${produto.quantidade}</td>
                        </tr>
                     `))}

                  </tbody>
               </table>

            </body>
         </html>
      `

      const { uri } = await Print.printToFileAsync({ html })

      const whatsappUrl = `whatsapp://send`

      if (await Linking.canOpenURL(whatsappUrl)) {

         if (uri) {

            try {
              await Sharing.shareAsync(uri, {
                mimeType: 'application/pdf',
                UTI: 'com.adobe.pdf',
              })

            } catch (error) {

              alert("Erro ao compartilhar o arquivo PDF")
            }
          } else {
            alert("Erro ao gerar o PDF")
          }

      } else {
         alert('WhatsApp não está instalado no dispositivo!')
      }
   }

   return (
      <View style={styles.container}>

         <Text style={styles.title}>Lista</Text>

         <ListProdutoList />

         <TouchableOpacity style={styles.button} onPress={async () => await generateAndSharePDF()}>
            <Text style={styles.buttonText}>Finalizar Lista</Text>
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
   },

   title: {
      fontSize: 40,
      fontFamily: 'Inter_700Bold',
      marginBottom: 30,
   },

   button: {
      backgroundColor: '#000',
      paddingVertical: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
   },

   buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'Inter_700Bold'
   }
})

export default list