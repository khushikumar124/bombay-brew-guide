import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { UserCollection } from '../types/coffee'
import { loadCollection, saveCollection } from '../utils/storage'

interface CollectionContextValue {
  collection: UserCollection
  isSaved: (id: string) => boolean
  isVisited: (id: string) => boolean
  toggleSaved: (id: string) => void
  toggleVisited: (id: string) => void
}

const CollectionContext = createContext<CollectionContextValue | null>(null)

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [collection, setCollection] = useState<UserCollection>(() => loadCollection())

  useEffect(() => {
    saveCollection(collection)
  }, [collection])

  const toggleSaved = useCallback((id: string) => {
    setCollection((prev) => {
      const existing = prev[id] ?? { saved: false, visited: false }
      return {
        ...prev,
        [id]: { ...existing, saved: !existing.saved },
      }
    })
  }, [])

  const toggleVisited = useCallback((id: string) => {
    setCollection((prev) => {
      const existing = prev[id] ?? { saved: false, visited: false }
      const nextVisited = !existing.visited
      return {
        ...prev,
        [id]: {
          ...existing,
          visited: nextVisited,
          visitedAt: nextVisited ? new Date().toISOString() : undefined,
        },
      }
    })
  }, [])

  const isSaved = useCallback((id: string) => Boolean(collection[id]?.saved), [collection])
  const isVisited = useCallback((id: string) => Boolean(collection[id]?.visited), [collection])

  const value = useMemo(
    () => ({ collection, isSaved, isVisited, toggleSaved, toggleVisited }),
    [collection, isSaved, isVisited, toggleSaved, toggleVisited],
  )

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>
}

export function useCollection(): CollectionContextValue {
  const ctx = useContext(CollectionContext)
  if (!ctx) {
    throw new Error('useCollection must be used within a CollectionProvider')
  }
  return ctx
}
