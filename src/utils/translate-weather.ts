export function translateWeather(main: string): string {
  const translations: Record<string, string> = {
    Clear: 'Ensolarado',
    Rain: 'Chuva',
    Snow: 'Neve',
    Clouds: 'Nublado',
    Drizzle: 'Garoa',
    Thunderstorm: 'Trovoada',
    Mist: 'Névoa',
    Smoke: 'Fumaça',
    Haze: 'Neblina',
    Dust: 'Poeira',
    Fog: 'Nevoeiro',
    Sand: 'Areia',
    Ash: 'Cinzas',
    Squall: 'Rajadas de vento',
    Tornado: 'Tornado',
  }

  return translations[main] || main
}
