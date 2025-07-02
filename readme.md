<!-- <p align="center">
  <img align="center" height="300" src="public/sponsor-icon.png"  />
</p> -->

## <p align="center">HabitBoost</p>

<p align="center">
   <img src="https://img.shields.io/badge/React-18.3.1-white?style=for-the-badge" />
   <img src="https://img.shields.io/badge/NPM-v10.9.2-white?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Expo-V52.0.43-white?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Nodejs-=>22-white?style=for-the-badge" />
</p>

O HabitBoost é um aplicativo mobile desenvolvido para ajudar usuários a criarem e acompanharem hábitos diários e metas pessoais. Ele oferece funcionalidades como notificações, sugestões baseadas no clima, histórico semanal de progresso e muito mais.

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

4. **Inclua as variáveis ambiente nele**:

   ```bash
   EXPO_PUBLIC_API_URL=https://habitboost-api.onrender.com
   EXPO_PUBLIC_WEATHER_API_URL=f5a2e366e83d3c078f316ca7e7f272e3

   ```

5. **Inicie o servidor de desenvolvimento**:

   ```bash
   npx expo start
   ```

   ou caso tenha o emulador:

   ```bash
   npx expo run:android
   ```

6. **Abra o aplicativo**:

- Escaneie o QR Code exibido no terminal ou na interface web do Expo usando o aplicativo Expo Go no seu dispositivo móvel.

- Alternativamente, você pode rodar o projeto em um emulador Android/iOS configurado, veja se está em `Using development build` quando rodar o projeto, se não tiver pressione `s` no terminal para alterar.

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
  Biblioteca de componentes de calendário para React Native, oferecendo suporte a múltiplos formatos (agenda, calendário marcado, etc.), altamente customizável e ideal para exibir datas, eventos e seleções de período.

- react-native-notificated
  Biblioteca para exibição de notificações toast e alertas visuais em apps React Native, com suporte a temas, animações e diferentes tipos de mensagens (sucesso, erro, informação).

- expo-notifications
  Biblioteca do Expo para lidar com notificações locais e push, permitindo agendamento, recebimento e gerenciamento de notificações de forma integrada ao ecossistema do Expo.

### 🛠️ Ferramentas e Tecnologias

- TypeScript  
  Superset do JavaScript que adiciona tipagem estática, proporcionando maior segurança e produtividade no desenvolvimento.

- React Native  
  Framework para desenvolvimento de aplicações móveis multiplataforma com JavaScript e React.

- Expo  
  Plataforma que simplifica o desenvolvimento, build e deploy de apps em React Native.

## 🛠️ Funcionalidades

- CRUD de hábitos e metas

- Filtro por dia, categoria e status do hábito

- Paginação de hábitos

- Conclusão de hábitos e metas

- Sugestões de hábitos baseadas no clima

- Histórico e gráfico semanal de progresso

- Sistema de autenticação (login, registro, recuperação de senha)

- Ranking semanal de usuários

- Edição de perfil e foto de usuário

- Notificações agendadas por dia/hora

## 🎓 Aprendizado

Esse projeto foi essencial para colocar em prática os conceitos aprendidos na disciplina. Um dos maiores desafios (e também conquistas) foi integrar funcionalidades nativas do celular, como notificações agendadas, manipulação de imagem de perfil, e o uso de dados do clima para gerar sugestões dinâmicas.
