import { IconProps } from "@tabler/icons-react-native"

export type Category = {
  id: string
  name: string
  icon: React.ElementType<IconProps>
  isCustom: boolean 
}
