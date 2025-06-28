import { View, Text } from 'react-native'
import { IconCalendarOff } from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'
import { Button } from '@/components/ui'
import { router } from 'expo-router'
import { styles } from './styles'

export function EmptyGoalList({ habitId }: { habitId: string }) {
  return (
    <View style={styles.container}>
      <IconCalendarOff size={64} color={colors.lime[500]} />
      <Text style={styles.title}>Nenhuma meta cadastrada</Text>
      <Text style={styles.subtitle}>
        Crie sua primeira meta e comece sua jornada!
      </Text>
      <Button
        onPress={() => {
          router.navigate({
            pathname: '/create-goal',
            params: { habitId },
          })
        }}
        variant='secundary'
        style={{ width: '100%', marginTop: 20 }}
      >
        <Button.Title style={{ color: colors.zinc[50] }}>
          Criar meta
        </Button.Title>
      </Button>
    </View>
  )
}
