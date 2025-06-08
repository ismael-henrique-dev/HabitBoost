import { Category } from '@/types/category'

export const defaultCategories: Category[] = [
  {
    id: '1',
    name: 'Atividade física',
    isCustom: false,
    iconId: 'icon-barbell',
  },
  { id: '2', name: 'Saúde mental', isCustom: false, iconId: 'icon-brain' },
  {
    id: '3',
    name: 'Alimentação saudável',
    isCustom: false,
    iconId: 'icon-salad',
  },
  {
    id: '4',
    name: 'Rotina e produtividade',
    isCustom: false,
    iconId: 'icon-chart-area-line',
  },
  {
    id: '5',
    name: 'Bem-estar e lazer',
    isCustom: false,
    iconId: 'icon-coffee',
  },
]
