import { colors } from '@/styles/theme'
import { StyleSheet, View } from 'react-native'

export function Separator() {
  return <View style={stylesSeperator.separator} />
}

const stylesSeperator = StyleSheet.create({
  separator: {
    width: 20,
    height: 0,
    borderBottomWidth: 1,
    borderColor: colors.zinc[900], 
    transform: [{ rotate: '-90deg' }],
    alignSelf: 'center',
  },
  modalSeparator: {
    width: '100%',
    height: 0,
    borderBottomWidth: 1,
    borderColor: colors.zinc[600], 
    alignSelf: 'center',
  },
})

export function ModalSeparator() {
  return <View style={stylesSeperator.modalSeparator} />
}
