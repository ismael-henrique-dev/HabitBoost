import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Category } from '@/types/category'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getCategories } from '@/services/http/categories/get-categories'
import { defaultCategories } from '@/utils/default-categories'
import { useAuth } from './auth-context'

type CategoryContextData = {
  isLoading: boolean
  categories: Category[]
  customCategories: Category[]
  createCategory: (category: Category) => void
  deleteCategory: (id: string) => void
}

const CategoryContext = createContext<CategoryContextData>(
  {} as CategoryContextData
)

const STORAGE_KEY = '@custom_categories'

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [customCategories, setCustomCategories] = useState<Category[]>([])
  const [fetchedCategories, setFetchedCategories] = useState<Category[]>([])
  const [isLoading, setIsloading] = useState(false)
  const { isLogged } = useAuth() // ← aqui está o hook

  const categories = useMemo(() => {
    return [...defaultCategories, ...customCategories, ...fetchedCategories]
  }, [customCategories, fetchedCategories])

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsloading(true)
        // Sempre carrega as categorias do AsyncStorage
        const stored = await AsyncStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed: Category[] = JSON.parse(stored)
          setCustomCategories(parsed)
        }

        // Só busca da API se estiver logado
        if (isLogged) {
          const response = await getCategories()
          const allCategories = response.categories

          const apiCustomCategories = allCategories.filter(
            (cat) => cat.isCustom
          )
          const apiDefaultCategories = allCategories.filter(
            (cat) => !cat.isCustom
          )

          // Substitui as customCategories apenas se logado
          setCustomCategories(apiCustomCategories)
          saveCustomCategories(apiCustomCategories) // opcional: para manter em sync localmente
          setFetchedCategories(apiDefaultCategories)
        }
      } catch (error) {
        console.error('Erro ao carregar categorias:', error)
      } finally {
        setIsloading(false)
      }
    }

    loadCategories()
  }, [isLogged]) // ← depende de isLogged para reexecutar ao fazer login

  async function saveCustomCategories(categories: Category[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
    } catch (error) {
      console.error('Erro ao salvar categorias personalizadas:', error)
    }
  }

  function createCategory(category: Category) {
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
      value={{
        isLoading,
        categories,
        customCategories,
        createCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategory() {
  return useContext(CategoryContext)
}
