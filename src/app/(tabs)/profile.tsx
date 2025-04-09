import { StyleSheet, Text, View } from 'react-native'

import { router } from 'expo-router'

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        onPress={() => router.navigate('/(auth)/register')}
      >
        Profile
      </Text>
      <View style={styles.separator} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
