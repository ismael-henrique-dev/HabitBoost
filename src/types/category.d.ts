export type Category = {
  id: string
  name: string
  icon?: React.ElementType<TablerIconProps>
  isCustom: boolean // true se foi criada pelo usuário
}
