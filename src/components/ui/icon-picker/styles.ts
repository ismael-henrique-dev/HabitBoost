// components/styles.ts
import { StyleSheet } from 'react-native'
import { colors } from '@/styles/theme'

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    width: '85%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  iconButton: {
    backgroundColor: '#A3EB0C',
    borderRadius: 50,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  iconSelected: {
    borderWidth: 2,
    borderColor: '#000',
  },
  iconText: {
    fontSize: 20,
  },
  concludeButton: {
    backgroundColor: '#A3EB0C',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  concludeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#E4E4E7',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#444',
    fontWeight: 'bold',
  },
})
