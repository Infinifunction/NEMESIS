import { useCallback, useRef, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { ChatLayout } from './components/ChatLayout'
import { PlaceholderPage } from './components/PlaceholderPage'
import type { ChatMessage, NavigationView, Project } from './types'
import { ToastViewport, type ToastItem } from './components/ToastViewport'

function App(): React.JSX.Element {
  const [activeView, setActiveView] = useState<NavigationView>('new-chat')
  const [projects, setProjects] = useState<Project[]>([])
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isPending, setIsPending] = useState(false)
  const [pendingMessageId, setPendingMessageId] = useState<string | null>(null)
  const [placeholderDetail, setPlaceholderDetail] = useState('')
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const toastId = useRef(0)
  const sequence = useRef(0)

  const pushToast = useCallback((message: string): void => {
    toastId.current += 1
    setToasts((current) => [...current, { id: toastId.current, message }])
  }, [])

  const dismissToast = useCallback((id: number): void => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const navigate = (view: NavigationView): void => {
    setActiveView(view)
    setActiveProjectId(null)
    if (view === 'new-chat') {
      setMessages([])
      setPlaceholderDetail('')
    }
  }

  const createProject = (): void => {
    sequence.current += 1
    const id = `project-${sequence.current}`
    const project = { id, name: `Untitled project ${projects.length + 1}` }
    setProjects((current) => [...current, project])
    setActiveProjectId(id)
    setActiveView('new-chat')
    setMessages([])
  }

  const sendMessage = (content: string): void => {
    const userId = `message-${Date.now()}-user`
    const pendingId = `message-${Date.now()}-pending`
    setMessages((current) => [...current, { id: userId, role: 'user', content }])
    setIsPending(true)
    setPendingMessageId(pendingId)
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `message-${Date.now()}-assistant`,
          role: 'assistant',
          content:
            'This is a local workspace preview. Connect an AI provider to generate live responses.'
        }
      ])
      setIsPending(false)
      setPendingMessageId(null)
    }, 900)
  }

  const sessionAction = (action: 'chat' | 'github' | 'url' | 'folder'): void => {
    if (action === 'chat') {
      setActiveProjectId(null)
      setActiveView('new-chat')
      setMessages([])
      setPlaceholderDetail('')
      return
    }
    setActiveView('customize')
    setActiveProjectId(null)
    setPlaceholderDetail(
      action === 'github'
        ? 'GitHub import is ready to be connected to a repository provider.'
        : action === 'url'
          ? 'URL import is ready for a controlled web source flow.'
          : 'Local folder selection requires a dedicated Electron file picker.'
    )
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeView={activeView}
        projects={projects}
        activeProjectId={activeProjectId}
        onNavigate={navigate}
        onProjectSelect={(id) => {
          setActiveProjectId(id)
          setActiveView('new-chat')
          setMessages([])
        }}
        onProjectCreate={createProject}
        onSessionAction={sessionAction}
      />
      {activeView === 'new-chat' ? (
        <ChatLayout
          messages={messages}
          onSend={sendMessage}
          isPending={isPending}
          pendingMessageId={pendingMessageId}
          onNotify={pushToast}
        />
      ) : activeView === 'automations' ? (
        <PlaceholderPage
          icon="automation"
          title="Automations"
          description="Create repeatable workflows that combine prompts, skills, and connected tools."
          actionLabel="Create automation"
          detail="Automation execution will appear here when the backend is connected."
          onAction={() => setPlaceholderDetail('Automation creation requires a workflow backend.')}
        />
      ) : activeView === 'customize' ? (
        <PlaceholderPage
          icon="customize"
          title={placeholderDetail ? 'Add context' : 'Customize'}
          description={
            placeholderDetail
              ? 'Choose a source to extend the context available to NEMESIS.'
              : 'Manage skills, instructions, MCP servers, and workspace behavior.'
          }
          actionLabel="Configure workspace"
          detail={
            placeholderDetail || 'Skill and MCP configuration requires the integration backend.'
          }
          onAction={() =>
            setPlaceholderDetail(
              placeholderDetail || 'Configuration has not been connected to a backend.'
            )
          }
        />
      ) : (
        <PlaceholderPage
          icon="settings"
          title="Settings"
          description="Review workspace preferences, privacy controls, and application behavior."
          actionLabel="Open preferences"
          detail="Settings persistence is not yet connected."
          onAction={() =>
            setPlaceholderDetail('Settings persistence requires a local configuration service.')
          }
        />
      )}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}

export default App
