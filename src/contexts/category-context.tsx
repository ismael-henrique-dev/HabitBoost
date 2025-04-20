import { Category } from '@/types/category'
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
    { id: '1', name: 'Saúde', isCustom: false },
    { id: '2', name: 'Trabalho', isCustom: false },
    { id: '3', name: 'Estudos', isCustom: false },
    { id: '4', name: 'Estudos', isCustom: false },
    { id: '5', name: 'Estudos', isCustom: false },
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
