import { View } from 'react-native'
import { styles } from './styles'
import { RankingCard } from '@/components/ranking/ranking-card'
import { IconTargetArrow, IconTrophy } from '@tabler/icons-react-native'
import { Podium } from '@/components/ranking/podium'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { colors } from '@/styles/theme'
import { WarningCard } from '@/components/ui/warning-card'
import { router } from 'expo-router'

export function RankingScreen() {
  const { isLogged } = useAuth()

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      {isLogged ? (
        <>
          <RankingCard
            icon={IconTrophy}
            title='Metas para você ser o vencedor'
            value={10}
          />
          <RankingCard
            icon={IconTargetArrow}
            title='Metas concluídas por você'
            value={10}
          />
          <Podium />
        </>
      ) : (
        <>
          <WarningCard warningMessage='Para salvar suas configurações e acessar o perfil em diferentes dispositivos, faça login com sua conta.' />
          <Button variant='secundary' onPress={() => router.navigate('/login')}>
            <Button.Title style={{ color: colors.zinc[50] }}>
              Fazer login
            </Button.Title>
          </Button>
        </>
      )}
    </View>
  )
}
