export function getSuggestionByWeather(weather: string): string {
  switch (true) {
    case weather.includes('Clear'):
      return 'Está um lindo dia lá fora! Que tal uma corrida no parque?'
    case weather.includes('Rain'):
      return 'Parece que está chovendo... Que tal um treino indoor hoje? 🏋️‍♀️'
    case weather.includes('Snow'):
      return 'Está bem frio lá fora! Mas você pode se aquecer com um treino de força ou dança em casa.'
    case weather.includes('Wind'):
      return 'O vento está forte hoje! Talvez uma caminhada rápida seja uma melhor opção do que corrida.'
    case weather.includes('Clouds'):
      return 'Hoje está um dia nublado, perfeito para uma caminhada ou uma pedalada leve!'
    default:
      return 'O clima está neutro. Que tal uma caminhada leve?'
  }
}
