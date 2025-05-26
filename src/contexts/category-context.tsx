import { createContext, useContext, useEffect, useState } from 'react'
import { Category } from '@/types/category'
import AsyncStorage from '@react-native-async-storage/async-storage'

const defaultCategories: Category[] = [
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

type CategoryContextData = {
  categories: Category[]
  createCategory: (category: Category) => void
  deleteCategory: (id: string) => void
}

const CategoryContext = createContext<CategoryContextData>(
  {} as CategoryContextData
)

const STORAGE_KEY = '@custom_categories'

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [customCategories, setCustomCategories] = useState<Category[]>([])

  const categories = [...defaultCategories, ...customCategories]

  useEffect(() => {
    async function loadCustomCategories() {
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: Category[] = JSON.parse(stored)
        setCustomCategories(parsed)
      }
    }

    loadCustomCategories()
  }, [])

  async function saveCustomCategories(categories: Category[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
    } catch (error) {
      console.error('Erro ao salvar categorias personalizadas:', error)
    }
  }

  function createCategory(category: Category) {
    if (customCategories.length >= 5) {
      alert('Você só pode criar até 5 categorias personalizadas.')
      return
    }

    const updated = [...customCategories, category]
    setCustomCategories(updated)
    saveCustomCategories(updated)
  }

  function deleteCategory(id: string) {
    const updated = customCategories.filter((c) => c.id !== id)
    setCustomCategories(updated)
    saveCustomCategories(updated)
  }

  return (
    <CategoryContext.Provider
      value={{ categories, createCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategory() {
  return useContext(CategoryContext)
}
