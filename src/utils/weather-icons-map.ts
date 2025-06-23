import {
  IconSun,
  IconMoon,
  IconCloud,
  IconCloudRain,
  IconCloudStorm,
  IconSnowflake,
  IconMist,
} from '@tabler/icons-react-native'
import type { IconProps } from '@tabler/icons-react-native'

export const weatherIconsMap: Record<string, React.ComponentType<IconProps>> = {
  '01d': IconSun,            // clear sky (day)
  '01n': IconMoon,           // clear sky (night)

  '02d': IconCloud,          // few clouds (day)
  '02n': IconCloud,          // few clouds (night)

  '03d': IconCloud,          // scattered clouds
  '03n': IconCloud,

  '04d': IconCloud,          // broken clouds
  '04n': IconCloud,

  '09d': IconCloudRain,      // shower rain
  '09n': IconCloudRain,

  '10d': IconCloudRain,      // rain
  '10n': IconCloudRain,

  '11d': IconCloudStorm,     // thunderstorm
  '11n': IconCloudStorm,

  '13d': IconSnowflake,      // snow
  '13n': IconSnowflake,

  '50d': IconMist,           // mist
  '50n': IconMist,
}
