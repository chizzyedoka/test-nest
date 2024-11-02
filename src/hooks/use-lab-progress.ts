import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface LabProgress {
  attempts: number
  points: number
  isJailbroken: boolean
}

interface LabProgressStore {
  progress: Record<string, LabProgress>
  updateProgress: (labId: string, data: Partial<LabProgress>) => void
  resetProgress: (labId: string) => void
  getProgress: (labId: string) => LabProgress
}

const DEFAULT_PROGRESS: LabProgress = {
  attempts: 0,
  points: 0,
  isJailbroken: false,
}

export const useLabProgressStore = create<LabProgressStore>()(
  persist(
    (set, get) => ({
      progress: {},
      updateProgress: (labId, data) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [labId]: {
              ...get().getProgress(labId),
              ...data,
            },
          },
        })),
      resetProgress: (labId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [labId]: DEFAULT_PROGRESS,
          },
        })),
      getProgress: (labId) => {
        const state = get()
        return state.progress[labId] || DEFAULT_PROGRESS
      },
    }),
    {
      name: 'lab-progress',
      version: 1,
      partialize: (state) => ({ progress: state.progress }),
    }
  )
)

export function useLabProgress(labId: string) {
  const queryClient = useQueryClient()
  const store = useLabProgressStore()

  const { data: progress = DEFAULT_PROGRESS } = useQuery({
    queryKey: ['lab-progress', labId],
    queryFn: () => store.getProgress(labId),
    initialData: () => store.getProgress(labId),
    staleTime: Infinity,
  })

  const updateProgress = (data: Partial<LabProgress>) => {
    store.updateProgress(labId, data)
    queryClient.setQueryData(['lab-progress', labId], (old: LabProgress = DEFAULT_PROGRESS) => ({
      ...old,
      ...data,
    }))
  }

  const resetProgress = () => {
    store.resetProgress(labId)
    queryClient.setQueryData(['lab-progress', labId], DEFAULT_PROGRESS)
  }

  return {
    progress,
    updateProgress,
    resetProgress,
  }
}