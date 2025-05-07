import { colors } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: -20,
    
  },
  podiumItem: {
    alignItems: 'center',
    // height: '100%'
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    backgroundColor: colors.zinc[50]
  },
  initials: {
    fontWeight: 'bold',
    color: '#7BC100',
  },
  name: {
    fontSize: 12,
    color: '#000',
    marginBottom: 4,
  },
  bar: {
    width: 50,
    backgroundColor: '#7BC100',
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 4,
  },
  position: {
    color: '#000',
    fontWeight: 'bold',
  },
  metas: {
    fontSize: 12,
    color: '#000',
    marginTop: 4,
  },
  goalsInfo: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6
    ,backgroundColor: colors.zinc[50],
    alignItems: 'center',
    justifyContent: 'center'
  }
})
