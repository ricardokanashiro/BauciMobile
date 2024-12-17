import { Text, StyleSheet, TouchableOpacity } from 'react-native'

import icons from '../constants/icons'

const PrazoFilter = ({ prazoRatio, active, setPrazosSelected, id }) => {

   function selectPrazo() {

      setPrazosSelected(
         prazos => 
            prazos.map(prazo => prazo.id === id ? { ...prazo, active: true } : prazo)
      )
   }

   function unselectedPrazo() {

      setPrazosSelected(
         prazos => 
            prazos.map(prazo => prazo.id === id ? { ...prazo, active: false } : prazo)
      )
   }

   return (
      <TouchableOpacity
         onPress={selectPrazo}
         activeOpacity={0.6}
         style={[
            styles.container, { 
               backgroundColor: active ? '#2D3648' : '#00000000',
               borderWidth: 2,
               borderStyle: 'solid',
               borderColor: active ? '#FFF' : '#2D3648'
            }
         ]}
      >

         <Text style={[styles.text, { color: active ? '#FFF' : '#2D3648' }]}>{prazoRatio}</Text>

         {
            active && (
               <TouchableOpacity onPress={unselectedPrazo} activeOpacity={0.6}>
                  <icons.X width={14} height={14} style={{ marginLeft: 10 }} />
               </TouchableOpacity>
            )
         }

      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({

   container: {
      height: 40,
      paddingHorizontal: 15,
      borderRadius: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 5,
      flexDirection: 'row'
   },

   text: {
      fontFamily: 'Inter_400Regular',
      fontSize: 13
   }
})

export default PrazoFilter