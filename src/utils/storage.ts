import type { UserCollection } from '../types/coffee'

const STORAGE_KEY = 'coffee-mumbai:collection:v1'

export function loadCollection(): UserCollection {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') {
      return parsed as UserCollection
    }
    return {}
  } catch {
    // Corrupt or inaccessible storage shouldn't break the app.
    return {}
  }
}

export function saveCollection(collection: UserCollection): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(collection))
  } catch {
    // Storage might be full or blocked (private browsing) — fail silently.
  }
}
