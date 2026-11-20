import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Mic, Plus, Send } from 'lucide-react'
import {
  ChatModeSelector,
  ComposerPlusMenu,
  ExecutionEnvironmentSelector,
  ModelSelector,
  PlanModeSelector,
  type ComposerMenu,
  type PlanMode,
  type ToolPermission
} from './ComposerMenus'

type ChatComposerProps = {
  draft: string
  isPending: boolean
  onDraftChange: (draft: string) => void
  onSubmit: () => void
  initial?: boolean
  onNotify: (message: string) => void
}

export function ChatComposer({
  draft,
  isPending,
  onDraftChange,
  onSubmit,
  initial = false,
  onNotify
}: ChatComposerProps): React.JSX.Element {
  const [openMenu, setOpenMenu] = useState<ComposerMenu>(null)
  const [planMode, setPlanMode] = useState<PlanMode>('Plan')
  const [permission, setPermission] = useState<ToolPermission>('Approve all')
  const [fusionEnabled, setFusionEnabled] = useState(false)
  const [chatMode, setChatMode] = useState('Chat')
  const [executionEnvironment, setExecutionEnvironment] = useState('This computer')
  const [modelPosition, setModelPosition] = useState<CSSProperties>({})
  const rootRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const modelButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!openMenu) return
    const handlePointerDown = (event: PointerEvent): void => {
      if (!rootRef.current?.contains(event.target as Node)) setOpenMenu(null)
    }
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openMenu])

  useEffect(() => {
    if (!textareaRef.current) return
    textareaRef.current.style.height = '24px'
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
  }, [draft])

  useEffect(() => {
    if (initial) textareaRef.current?.focus()
  }, [initial])

  const toggleMenu = (menu: ComposerMenu): void => {
    setOpenMenu((current) => (current === menu ? null : menu))
  }

  const openModelMenu = (): void => {
    if (openMenu === 'model') {
      setOpenMenu(null)
      return
    }
    const rect = modelButtonRef.current?.getBoundingClientRect()
    if (rect) {
      const sidebarWidth = window.innerWidth <= 620 ? 64 : window.innerWidth <= 900 ? 220 : 248
      const popupWidth =
        window.innerWidth <= 620 ? Math.min(280, window.innerWidth - sidebarWidth - 24) : 280
      let left = rect.right + 8
      if (left + popupWidth > window.innerWidth - 12) left = rect.left - popupWidth - 8
      left = Math.max(sidebarWidth + 12, Math.min(left, window.innerWidth - popupWidth - 12))
      const estimatedHeight = 238
      const preferredTop = rect.top - estimatedHeight - 8
      const top =
        preferredTop >= 12
          ? preferredTop
          : Math.min(rect.bottom + 8, window.innerHeight - estimatedHeight - 12)
      setModelPosition({ left, top, width: popupWidth })
    }
    setOpenMenu('model')
  }

  return (
    <div ref={rootRef} className={`composer-shell${initial ? ' composer-shell-initial' : ''}`}>
      <div className="composer">
        <textarea
          ref={textareaRef}
          value={draft}
          aria-label="Message NEMESIS"
          placeholder="Plan a task or paste a URL. Use / for commands, & sessions, # issues..."
          rows={1}
          onChange={(event) => onDraftChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              onSubmit()
            }
          }}
        />
        <div className="composer-toolbar">
          <div className="composer-toolbar-left">
            <div className="composer-control-wrap">
              <button
                className={`composer-icon-button${openMenu === 'plus' ? ' is-active' : ''}`}
                type="button"
                aria-label="Add context"
                aria-expanded={openMenu === 'plus'}
                onClick={() => toggleMenu('plus')}
              >
                <Plus size={16} aria-hidden="true" />
              </button>
              {openMenu === 'plus' && <ComposerPlusMenu onStatus={onNotify} />}
            </div>
            <div className="composer-control-wrap">
              <button
                className={`composer-select-button${openMenu === 'plan' ? ' is-active' : ''}`}
                type="button"
                aria-expanded={openMenu === 'plan'}
                onClick={() => toggleMenu('plan')}
              >
                {planMode}
              </button>
              {openMenu === 'plan' && (
                <PlanModeSelector
                  mode={planMode}
                  permission={permission}
                  onModeChange={setPlanMode}
                  onPermissionChange={setPermission}
                  onStatus={onNotify}
                />
              )}
            </div>
            <div className="composer-control-wrap">
              <button
                ref={modelButtonRef}
                className={`composer-select-button${openMenu === 'model' ? ' is-active' : ''}`}
                type="button"
                aria-expanded={openMenu === 'model'}
                onClick={openModelMenu}
              >
                Default
              </button>
              {openMenu === 'model' && (
                <ModelSelector
                  fusionEnabled={fusionEnabled}
                  onFusionChange={setFusionEnabled}
                  style={modelPosition}
                />
              )}
            </div>
          </div>
          <div className="composer-toolbar-right">
            <button
              className="composer-icon-button"
              type="button"
              aria-label="Microphone placeholder"
              onClick={() => onNotify('Microphone input is not connected yet.')}
            >
              <Mic size={16} aria-hidden="true" />
            </button>
            <button
              className="send-button"
              type="button"
              aria-label="Send message"
              disabled={!draft.trim() || isPending}
              onClick={onSubmit}
            >
              <Send size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="composer-rail">
        <div className="composer-control-wrap">
          <button
            className={`composer-rail-button${openMenu === 'chat' ? ' is-active' : ''}`}
            type="button"
            aria-expanded={openMenu === 'chat'}
            onClick={() => toggleMenu('chat')}
          >
            <span className="rail-icon rail-chat-icon" aria-hidden="true" />
            {chatMode}
          </button>
          {openMenu === 'chat' && (
            <ChatModeSelector
              selected={chatMode}
              onSelectedChange={setChatMode}
              onStatus={onNotify}
            />
          )}
        </div>
        <div className="composer-control-wrap">
          <button
            className={`composer-rail-button${openMenu === 'environment' ? ' is-active' : ''}`}
            type="button"
            aria-expanded={openMenu === 'environment'}
            onClick={() => toggleMenu('environment')}
          >
            <span className="rail-icon rail-computer-icon" aria-hidden="true" />
            {executionEnvironment}
          </button>
          {openMenu === 'environment' && (
            <ExecutionEnvironmentSelector
              selected={executionEnvironment}
              onSelectedChange={setExecutionEnvironment}
              onStatus={onNotify}
            />
          )}
        </div>
      </div>
    </div>
  )
}
