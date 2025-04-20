import {
  IconBarbell,
  IconBrain,
  IconChartAreaLine,
  IconMusic,
  IconSalad,
  type IconProps,
} from '@tabler/icons-react-native'

export const categoriesIcons: Record<string, React.ComponentType<IconProps>> = {
  'atividade fisica': IconBarbell,
  'saude mental': IconBrain,
  'alimentacao saudavel': IconSalad,
  'rotina e produtividade': IconChartAreaLine,
  'bem estar e lazer': IconMusic,
}
