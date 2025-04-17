import { Text, View } from 'react-native'
import {
  IconCalendar,
  IconChartBar,
  IconTrophy,
} from '@tabler/icons-react-native'
import { Step } from '../step'
import { styles } from './styles'

export function Steps() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>O que você pode fazer:</Text>
      <Step
        title='Gerencie seus hábitos e metas'
        description='Defina novos hábitos, estabeleça metas realistas e mantenha a consistência.'
        icon={IconCalendar}
      />
      <Step
        title='Acompanhe seu progresso'
        description='Veja seu desempenho com estatísticas detalhadas.'
        icon={IconChartBar}
      />
      <Step
        title='Garanta vantagens perto de você'
        description='Complete suas metas e compare seu desempenho com outros usuários.'
        icon={IconTrophy}
      />
    </View>
  )
}
