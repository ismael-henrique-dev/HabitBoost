import { Category } from '@/types/category'
import { IconBarbell, IconBrain, IconChartAreaLine, IconMusic, IconSalad } from '@tabler/icons-react-native'
import { createContext, useContext, useState } from 'react'

type CategoryContextData = {
  categories: Category[]
  createCategory: (category: Category) => void
  deleteCategory: (id: string) => void
}

const CategoryContext = createContext<CategoryContextData>(
  {} as CategoryContextData
)

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Atividade física', isCustom: false, icon: IconBarbell },
    { id: '2', name: 'Saúde mental', isCustom: false, icon: IconBrain },
    { id: '3', name: 'Alimentação saudável', isCustom: false, icon: IconSalad},
    { id: '4', name: 'Rotina e produtividade', isCustom: false, icon: IconChartAreaLine},
    { id: '5', name: 'Bem-estar e lazer', isCustom: false, icon: IconMusic },
  ])

  function createCategory(category: Category) {
    const customCategories = categories.filter((c) => c.isCustom)
    if (customCategories.length >= 5) {
      alert('Você só pode criar até 5 categorias personalizadas.')
      return
    }

    setCategories((prev) => [...prev, category])
  }

  function deleteCategory(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id))
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
