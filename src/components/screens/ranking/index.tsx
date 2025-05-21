import { View } from 'react-native'
import { styles } from './styles'
import { RankingCard } from '@/components/ranking/ranking-card'
import { IconTrophy } from '@tabler/icons-react-native'
import { Podium } from '@/components/ranking/podium'

export function RankingScreen() {
  return (
    <View style={styles.container}>
 
        <RankingCard
          icon={IconTrophy}
          title='Metas para você ser o vencedor'
          value={10}
        />
        <RankingCard
          icon={IconTrophy}
          title='Metas para você ser o vencedor'
          value={10}
        />
    
      <Podium />
    </View>
  )
}
