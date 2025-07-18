import { ScrollView, View } from 'react-native'
import { styles } from './styles'
import { RankingCard } from '@/components/ranking/ranking-card'
import { IconTargetArrow, IconTrophy } from '@tabler/icons-react-native'
import { Podium } from '@/components/ranking/podium'
import { Button } from '@/components/ui/button'
import { colors } from '@/styles/theme'
import { WarningCard } from '@/components/ui/warning-card'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  getRankingData,
  RankingUser,
} from '@/services/http/ranking/get-ranking-data'
import { useStatistics } from '@/hooks/use-statistics'
import { useAuth } from '@/contexts/auth-context'

type RankingData = {
  data: RankingUser[]
}

export function RankingScreen() {
  const [rankingData, setRankingData] = useState<RankingData | null>(null)
  const { isLogged } = useAuth()
  const { totalGoalsCompleted } = useStatistics()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRankingData()
      if (response) {
        setRankingData({ data: response.leaderboard })
      }
      setLoading(false)
    }

    fetchData()
  }, [totalGoalsCompleted])

  const podiumData = {
    first: rankingData?.data[0],
    second: rankingData?.data[1],
    third: rankingData?.data[2],
  }

  const goalsToBeTheWinner =
    podiumData.first && podiumData.first.weektotal > totalGoalsCompleted
      ? podiumData.first.weektotal - totalGoalsCompleted
      : 0

  return (
    <ScrollView>
      <View
        style={[styles.container, !isLogged && { justifyContent: 'center' }]}
      >
        {isLogged ? (
          <>
            {rankingData?.data.length === 0 ? (
              <WarningCard warningMessage='Ainda não há participantes no ranking esta semana.' />
            ) : (
              <>
                <RankingCard
                  icon={IconTrophy}
                  title={
                    goalsToBeTheWinner === 0
                      ? 'Parabéns, você é o vencedor.'
                      : 'Metas para você ser o vencedor'
                  }
                  value={
                    goalsToBeTheWinner === 0 ? undefined : goalsToBeTheWinner
                  }
                  loading={loading}
                />
                <RankingCard
                  icon={IconTargetArrow}
                  title='Metas concluídas por você'
                  value={totalGoalsCompleted}
                  loading={loading}
                />
                <Podium data={podiumData} loading={loading} />
              </>
            )}
          </>
        ) : (
          <>
            <WarningCard warningMessage='Para salvar suas configurações e acessar o perfil em diferentes dispositivos, faça login com sua conta.' />
            <Button
              variant='secundary'
              onPress={() => router.navigate('/login')}
            >
              <Button.Title style={{ color: colors.zinc[50] }}>
                Fazer login
              </Button.Title>
            </Button>
          </>
        )}
      </View>
    </ScrollView>
  )
}
