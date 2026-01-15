const STORAGE_KEY = 'hayyak.completedItems'

function readStoredIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((x) => typeof x === 'string')
  } catch {
    return []
  }
}

function writeStoredIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(new Set(ids)).sort()))
}

export function getCompletedIds(): Set<string> {
  return new Set(readStoredIds())
}

export function isCompleted(id: string): boolean {
  return getCompletedIds().has(id)
}

export function setCompleted(id: string, completed: boolean) {
  const ids = getCompletedIds()
  if (completed) ids.add(id)
  else ids.delete(id)
  writeStoredIds(Array.from(ids))
}

export function toggleCompleted(id: string) {
  setCompleted(id, !isCompleted(id))
}

export function computeProgress(allIds: readonly string[]) {
  const uniqueIds = Array.from(new Set(allIds)).filter(Boolean)
  const totalCount = uniqueIds.length
  const completedIds = getCompletedIds()
  const completedCount = uniqueIds.reduce((acc, id) => acc + (completedIds.has(id) ? 1 : 0), 0)
  const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  return {
    completedCount,
    totalCount,
    percent,
  }
}
