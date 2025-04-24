### 🔍 O que você pode avaliar:

- **Home**: A home que é a tela de habitos está quase pronta, o que falta é fazer é arrumar criar a funcionalidade de filtragem, adicionei o toast lá, também um detalhizinho com a pai de clima e do widget de clima.
- **Create-Habit**: Aqui falta adicionar o time-picker e corrigir uns erros do formulário de criar habito.

### 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto localmente:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/ismael-henrique-dev/HabitBoost
   ```

2. **Instale as dependencias**:

   ```bash
   npm install
   ```

3. **Crie o arquivo `.env` na raiz do projeto**:

4. **Cole isso nele**:

   ```bash
   EXPO_PUBLIC_API_URL=https://habitboost-api.onrender.com EXPO_PUBLIC_WEATHER_API_URL=f5a2e366e83d3c078f316ca7e7f272e3

   ```

5. **Inicie o servidor de desenvolvimento**:
   ```bash
   npx expo start
   ```

6. **Abra o aplicativo**:
- Escaneie o QR Code exibido no terminal ou na interface web do Expo usando o aplicativo Expo Go no seu dispositivo móvel.
- Alternativamente, você pode rodar o projeto em um emulador Android/iOS configurado.

### 📚 Bibliotecas Utilizadas

- react-hook-form e @hookform/resolvers  
  Facilita o gerenciamento de formulários com validação simples e performática.

- zod  
  Biblioteca de validação de esquemas TypeScript-first, usada em conjunto com react-hook-form para garantir dados consistentes.

- axios  
  Cliente HTTP baseado em Promises para requisições à API.

- @tabler/icons-react-native  
  Conjunto de ícones leves e personalizáveis para React Native.

- react-native-bottom-sheet  
  Biblioteca para criar bottom sheets altamente customizáveis e performáticos.

- react-native-gesture-handler  
  Biblioteca para manipulação de gestos em aplicações React Native, essencial para interações fluidas.

- react-native-calendars

- react-native-notificated

### 🛠️ Ferramentas e Tecnologias

- TypeScript  
  Superset do JavaScript que adiciona tipagem estática, proporcionando maior segurança e produtividade no desenvolvimento.

- React Native  
  Framework para desenvolvimento de aplicações móveis multiplataforma com JavaScript e React.

- Expo  
  Plataforma que simplifica o desenvolvimento, build e deploy de apps em React Native.
