import { useContext } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import PrazoFilter from './PrazoFilter'

import { SearchFiltersContext } from '../contexts/SearchFiltersContext'

const prazoFilterBar = () => {

   const { prazosSelected, setPrazosSelected } = useContext(SearchFiltersContext)

  return (

    <ScrollView style={styles.container} horizontal={true}>

      {
         prazosSelected.map(prazo => 
            <PrazoFilter 
               prazoRatio={`${prazo.min}-${prazo.max} dias`} 
               active={prazo.active} 
               setPrazosSelected={setPrazosSelected}
               id={prazo.id}
               key={prazo.id}
            />
         )
      }

    </ScrollView>
  )
}

const styles = StyleSheet.create({

   container: {
      display: 'flex',
      marginTop: 20,
      marginLeft: 15,
      flexGrow: 0,
      marginBottom: 30,
      flexShrink: 0
   }
})

export default prazoFilterBar