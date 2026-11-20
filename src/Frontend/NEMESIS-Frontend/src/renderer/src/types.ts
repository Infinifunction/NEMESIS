export type NavigationView = 'new-chat' | 'automations' | 'customize' | 'settings'

export type Project = {
  id: string
  name: string
}

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}
