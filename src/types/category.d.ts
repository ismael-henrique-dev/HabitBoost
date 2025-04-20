export type Category = {
  id: string
  name: string
  icon?: string // opcional, caso o usuário escolha um ícone
  isCustom: boolean // true se foi criada pelo usuário
}
