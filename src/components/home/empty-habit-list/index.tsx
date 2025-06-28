import { View, Text } from 'react-native'
import { IconCalendarOff } from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'
import { Button } from '@/components/ui'
import { router } from 'expo-router'
import { styles } from './styles'

export function EmptyHabitList() {
  return (
    <View style={styles.container}>
      <IconCalendarOff size={64} color={colors.lime[500]} /> 
      <Text style={styles.title}>Nenhum hábito cadastrado hoje</Text>
      <Text style={styles.subtitle}>
        Crie seu primeiro hábito e comece sua jornada!
      </Text>
      <Button
        onPress={() => router.navigate('/create-habit')}
        variant='secundary'
        style={{ width: '100%', marginTop: 20 }}
      >
        <Button.Title style={{ color: colors.zinc[50] }}>
          Criar hábito
        </Button.Title>
      </Button>
    </View>
  )
}
