import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface Message {
  role: "user" | "bot"
  content: string
}

interface ChatHistoryStore {
  messages: Record<string, Message[]>
  addMessage: (labId: string, message: Message) => void
  clearHistory: (labId: string) => void
  getMessages: (labId: string) => Message[]
}

export const useChatHistoryStore = create<ChatHistoryStore>()(
  persist(
    (set, get) => ({
      messages: {},
      addMessage: (labId, message) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [labId]: [...(state.messages[labId] || []), message],
          },
        })),
      clearHistory: (labId) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [labId]: [],
          },
        })),
      getMessages: (labId) => {
        const state = get()
        return state.messages[labId] || []
      }
    }),
    {
      name: 'chat-history',
      version: 1, // Add version number for future migrations
      partialize: (state) => ({ messages: state.messages }), // Only persist messages
    }
  )
)

export function useChatHistory(labId: string) {
  const queryClient = useQueryClient()
  const store = useChatHistoryStore()

  const { data: messages = [] } = useQuery({
    queryKey: ['chat-history', labId],
    queryFn: () => store.getMessages(labId),
    initialData: () => store.getMessages(labId),
    staleTime: Infinity,
  })

  const addMessage = (message: Message) => {
    store.addMessage(labId, message)
    queryClient.setQueryData(['chat-history', labId], (old: Message[] = []) => [
      ...old,
      message,
    ])
  }

  const clearHistory = () => {
    store.clearHistory(labId)
    queryClient.setQueryData(['chat-history', labId], [])
  }

  return {
    messages,
    addMessage,
    clearHistory,
  }
}