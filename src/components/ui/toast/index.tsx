import React from 'react'
import { View, Text } from 'react-native'
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'
import { styles } from './styles'

type Props = {
  customTitle: string
  type: 'success' | 'error'
}

export const ToastSuccess: React.FC<Props> = ({
  customTitle,
  type = 'success',
}) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.iconTextContainer}>
        {type === 'success' ? (
          <IconCircleCheck size={24} color={colors.green[700]} />
        ) : (
          <IconCircleX size={24} color={colors.red[600]} />
        )}
        <Text style={styles.message}>{customTitle}</Text>
      </View>
    </View>
  )
}


