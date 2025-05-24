import { Category } from '@/types/category'
import { 
  IconBarbell, 
  IconBrain, 
  IconChartAreaLine, 
  IconMusic, 
  IconSalad 
} from '@tabler/icons-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useEffect, useState } from 'react'

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
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Atividade física', isCustom: false, icon: IconBarbell },
    { id: '2', name: 'Saúde mental', isCustom: false, icon: IconBrain },
    { id: '3', name: 'Alimentação saudável', isCustom: false, icon: IconSalad },
    { id: '4', name: 'Rotina e produtividade', isCustom: false, icon: IconChartAreaLine },
    { id: '5', name: 'Bem-estar e lazer', isCustom: false, icon: IconMusic },
  ])

  useEffect(() => {
    async function loadCustomCategories() {
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: Category[] = JSON.parse(stored)

        setCategories(prev => [...prev, ...parsed])
      }
    }

    loadCustomCategories()
  }, [])

  async function saveCustomCategories(customCategories: Category[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(customCategories))
    } catch (error) {
      console.error('Erro ao salvar categorias personalizadas:', error)
    }
  }

  function createCategory(category: Category) {
    const customCategories = categories.filter((c) => c.isCustom)

    if (customCategories.length >= 5) {
      alert('Você só pode criar até 5 categorias personalizadas.')
      return
    }

    const updated = [...categories, category]
    setCategories(updated)

    const updatedCustom = updated.filter((c) => c.isCustom)
    saveCustomCategories(updatedCustom)
  }

  function deleteCategory(id: string) {
    const updated = categories.filter((c) => c.id !== id)
    setCategories(updated)

    const updatedCustom = updated.filter((c) => c.isCustom)
    saveCustomCategories(updatedCustom)
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
