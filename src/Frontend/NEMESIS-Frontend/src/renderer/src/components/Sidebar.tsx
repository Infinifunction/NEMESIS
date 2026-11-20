import { useEffect, useRef, useState } from 'react'
import type { NavigationView, Project } from '../types'
import { Icon, type IconName } from './Icon'

type SidebarProps = {
  activeView: NavigationView
  projects: Project[]
  activeProjectId: string | null
  onNavigate: (view: NavigationView) => void
  onProjectSelect: (projectId: string) => void
  onProjectCreate: () => void
  onSessionAction: (action: 'chat' | 'github' | 'url' | 'folder') => void
}

type NavigationItemProps = {
  icon: IconName
  label: string
  active: boolean
  onClick: () => void
}

function NavigationItem({ icon, label, active, onClick }: NavigationItemProps): React.JSX.Element {
  return (
    <button
      className={`nav-item${active ? ' is-active' : ''}`}
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      <Icon name={icon} />
      <span>{label}</span>
    </button>
  )
}

export function Sidebar({
  activeView,
  projects,
  activeProjectId,
  onNavigate,
  onProjectSelect,
  onProjectCreate,
  onSessionAction
}: SidebarProps): React.JSX.Element {
  const [projectsOpen, setProjectsOpen] = useState(true)
  const [sessionsOpen, setSessionsOpen] = useState(true)
  const [sessionMenuOpen, setSessionMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const sessionMenuRef = useRef<HTMLDivElement>(null)
  const sessionButtonRef = useRef<HTMLButtonElement>(null)
  const accountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent): void => {
      const target = event.target as Node
      if (sessionMenuOpen && !sessionMenuRef.current?.contains(target)) setSessionMenuOpen(false)
      if (accountOpen && !accountRef.current?.contains(target)) setAccountOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') return
      if (sessionMenuOpen) {
        setSessionMenuOpen(false)
        sessionButtonRef.current?.focus()
      }
      if (accountOpen) setAccountOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [accountOpen, sessionMenuOpen])

  const selectSessionAction = (action: 'chat' | 'github' | 'url' | 'folder'): void => {
    setSessionMenuOpen(false)
    onSessionAction(action)
  }

  return (
    <aside className="sidebar">
      <div className="brand" aria-label="NEMESIS">
        <span className="brand-mark">N</span>
        <span>NEMESIS</span>
      </div>

      <nav className="primary-nav" aria-label="Primary navigation">
        <NavigationItem
          icon="chat"
          label="New Chat"
          active={activeView === 'new-chat'}
          onClick={() => onNavigate('new-chat')}
        />
        <NavigationItem
          icon="automation"
          label="Automations"
          active={activeView === 'automations'}
          onClick={() => onNavigate('automations')}
        />
        <NavigationItem
          icon="customize"
          label="Customize"
          active={activeView === 'customize'}
          onClick={() => onNavigate('customize')}
        />
        <NavigationItem
          icon="settings"
          label="Settings"
          active={activeView === 'settings'}
          onClick={() => onNavigate('settings')}
        />
      </nav>

      <div className="sidebar-section">
        <button
          className="section-heading"
          type="button"
          aria-expanded={projectsOpen}
          onClick={() => setProjectsOpen((open) => !open)}
        >
          <span>Projects</span>
          <span className="section-heading-icon">
            <Icon name="chevron" size={15} />
          </span>
        </button>
        <button
          className="section-add"
          type="button"
          aria-label="Create project"
          onClick={onProjectCreate}
        >
          <Icon name="plus" size={15} />
        </button>
        {projectsOpen && (
          <div className="section-list">
            {projects.map((project) => (
              <button
                key={project.id}
                className={`project-item${activeProjectId === project.id ? ' is-active' : ''}`}
                type="button"
                onClick={() => onProjectSelect(project.id)}
              >
                <span className="project-dot" />
                <span>{project.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar-section sessions-section">
        <button
          className="section-heading"
          type="button"
          aria-expanded={sessionsOpen}
          onClick={() => setSessionsOpen((open) => !open)}
        >
          <span>Sessions</span>
          <span className="section-heading-icon">
            <Icon name="chevron" size={15} />
          </span>
        </button>
        <button
          ref={sessionButtonRef}
          className="section-add"
          type="button"
          aria-label="Create session"
          aria-expanded={sessionMenuOpen}
          onClick={() => setSessionMenuOpen((open) => !open)}
        >
          <Icon name="plus" size={15} />
        </button>
        {sessionsOpen && (
          <div className="section-list">
            <button
              className="project-item"
              type="button"
              onClick={() => selectSessionAction('chat')}
            >
              <span className="session-line" />
              <span>Untitled chat</span>
            </button>
          </div>
        )}
        {sessionMenuOpen && (
          <div
            ref={sessionMenuRef}
            className="session-menu"
            role="menu"
            aria-label="Create session"
          >
            <button type="button" role="menuitem" onClick={() => selectSessionAction('chat')}>
              <span className="menu-icon">
                <Icon name="chat" />
              </span>
              <span>
                <strong>Chat</strong>
                <small>Start a new conversation</small>
              </span>
            </button>
            <button type="button" role="menuitem" onClick={() => selectSessionAction('github')}>
              <span className="menu-icon menu-icon-github">
                <Icon name="github" />
              </span>
              <span>
                <strong>Add from GitHub</strong>
                <small>Import a repository</small>
              </span>
            </button>
            <button type="button" role="menuitem" onClick={() => selectSessionAction('url')}>
              <span className="menu-icon menu-icon-link">
                <Icon name="link" />
              </span>
              <span>
                <strong>Add from URL</strong>
                <small>Bring in an online source</small>
              </span>
            </button>
            <button type="button" role="menuitem" onClick={() => selectSessionAction('folder')}>
              <span className="menu-icon menu-icon-folder">
                <Icon name="folder" />
              </span>
              <span>
                <strong>Add local folder or repository</strong>
                <small>Choose from this device</small>
              </span>
            </button>
          </div>
        )}
      </div>

      <div ref={accountRef} className="account-wrap">
        {accountOpen && (
          <div className="account-menu" role="menu">
            <button type="button" role="menuitem">
              Account details
            </button>
            <button type="button" role="menuitem">
              Manage preferences
            </button>
          </div>
        )}
        <button
          className="account-card"
          type="button"
          aria-expanded={accountOpen}
          onClick={() => setAccountOpen((open) => !open)}
        >
          <span className="avatar">AY</span>
          <span className="account-copy">
            <strong>Alex Yilmaz</strong>
            <small>Personal workspace</small>
          </span>
          <Icon name="chevron" size={14} />
        </button>
      </div>
    </aside>
  )
}
