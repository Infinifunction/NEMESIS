import { useState } from 'react'
import {
  Check,
  ChevronRight,
  Cloud,
  Folder,
  FolderGit2,
  GitBranch,
  Link2,
  Monitor,
  Search,
  Settings,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'

export type ComposerMenu = 'plus' | 'chat' | 'environment' | 'plan' | 'model' | null
export type PlanMode = 'Interactive' | 'Plan' | 'Autopilot'
export type ToolPermission = 'Always ask' | 'Assisted' | 'Approve all'

type MenuProps = {
  onStatus: (status: string) => void
}

export function ComposerPlusMenu({ onStatus }: MenuProps): React.JSX.Element {
  const options = [
    { label: 'Repository file or folder...', icon: FolderGit2 },
    { label: 'Session...', icon: GitBranch },
    { label: 'Files...', icon: Folder },
    { label: 'Folder...', icon: Folder }
  ]

  return (
    <div className="composer-popover plus-popover" role="menu" aria-label="Add context">
      {options.map(({ label, icon: OptionIcon }) => (
        <button
          key={label}
          type="button"
          role="menuitem"
          onClick={() =>
            onStatus(`${label} selection is available when local context access is connected.`)
          }
        >
          <OptionIcon size={16} aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}

type ChatModeSelectorProps = MenuProps & {
  selected: string
  onSelectedChange: (selected: string) => void
}

export function ChatModeSelector({
  selected,
  onSelectedChange,
  onStatus
}: ChatModeSelectorProps): React.JSX.Element {
  const [search, setSearch] = useState('')
  const options = [
    { label: 'Chat', icon: Search },
    { label: 'Add from GitHub', icon: GitBranch },
    { label: 'Add from URL', icon: Link2 },
    { label: 'Add from local folder or repository', icon: Folder }
  ]
  const visibleOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="composer-popover chat-popover" role="menu" aria-label="Chat source">
      <label className="popover-search">
        <Search size={14} aria-hidden="true" />
        <input
          value={search}
          aria-label="Search chat modes"
          placeholder="Search"
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>
      <div className="popover-options">
        {visibleOptions.map(({ label, icon: OptionIcon }) => (
          <button
            key={label}
            type="button"
            role="menuitem"
            onClick={() => {
              onSelectedChange(label)
              onStatus(
                label === 'Chat' ? 'Chat selected.' : `${label} is not connected to a backend yet.`
              )
            }}
          >
            <OptionIcon size={16} aria-hidden="true" />
            <span>{label}</span>
            {selected === label && <Check className="option-check" size={14} aria-hidden="true" />}
          </button>
        ))}
      </div>
    </div>
  )
}

type ExecutionEnvironmentSelectorProps = MenuProps & {
  selected: string
  onSelectedChange: (selected: string) => void
}

export function ExecutionEnvironmentSelector({
  selected,
  onSelectedChange,
  onStatus
}: ExecutionEnvironmentSelectorProps): React.JSX.Element {
  return (
    <div
      className="composer-popover environment-popover"
      role="menu"
      aria-label="Execution environment"
    >
      <span className="popover-section-title">Run on</span>
      {[
        { label: 'This computer', icon: Monitor },
        { label: 'Cloud', icon: Cloud }
      ].map(({ label, icon: OptionIcon }) => (
        <button
          key={label}
          type="button"
          role="menuitem"
          onClick={() => {
            onSelectedChange(label)
            onStatus(
              label === 'This computer'
                ? 'This computer selected.'
                : 'Cloud execution is not connected yet.'
            )
          }}
        >
          <OptionIcon size={16} aria-hidden="true" />
          <span>{label}</span>
          {selected === label && <Check className="option-check" size={14} aria-hidden="true" />}
        </button>
      ))}
      <div className="popover-divider" />
      <span className="popover-section-title">Environments</span>
      <button
        type="button"
        role="menuitem"
        onClick={() => onStatus('Environment management is not connected yet.')}
      >
        <Settings size={16} aria-hidden="true" />
        <span>Manage environments...</span>
        <ChevronRight className="option-check" size={14} aria-hidden="true" />
      </button>
    </div>
  )
}

type PlanModeSelectorProps = MenuProps & {
  mode: PlanMode
  permission: ToolPermission
  onModeChange: (mode: PlanMode) => void
  onPermissionChange: (permission: ToolPermission) => void
}

export function PlanModeSelector({
  mode,
  permission,
  onModeChange,
  onPermissionChange
}: PlanModeSelectorProps): React.JSX.Element {
  const modes: Array<{ label: PlanMode; description: string }> = [
    { label: 'Interactive', description: 'Step-by-step collaboration' },
    { label: 'Plan', description: 'Plan first, execute when ready' },
    { label: 'Autopilot', description: 'End-to-end execution without interruption' }
  ]
  const permissions: ToolPermission[] = ['Always ask', 'Assisted', 'Approve all']

  return (
    <div className="composer-popover plan-popover" role="menu" aria-label="Plan mode">
      <div className="plan-modes">
        <span className="popover-section-title">Mode</span>
        {modes.map((option) => (
          <button
            key={option.label}
            type="button"
            role="menuitemradio"
            aria-checked={mode === option.label}
            onClick={() => onModeChange(option.label)}
          >
            {mode === option.label ? (
              <Check size={14} aria-hidden="true" />
            ) : (
              <span className="option-placeholder" aria-hidden="true" />
            )}
            <span>
              <strong>{option.label}</strong>
              <small>{option.description}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="plan-permissions">
        <span className="popover-section-title">Tool permissions</span>
        {permissions.map((option) => (
          <button
            key={option}
            type="button"
            role="menuitemradio"
            aria-checked={permission === option}
            onClick={() => onPermissionChange(option)}
          >
            {permission === option ? (
              <Check size={14} aria-hidden="true" />
            ) : (
              <span className="option-placeholder" aria-hidden="true" />
            )}
            <span>
              <strong>{option}</strong>
              <small>
                {option === 'Always ask'
                  ? 'Ask before running tools'
                  : option === 'Assisted'
                    ? 'Use AI to reduce approval prompts'
                    : 'Run tools without asking'}
              </small>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

type ModelSelectorProps = {
  fusionEnabled: boolean
  onFusionChange: (enabled: boolean) => void
}

export function ModelSelector({
  fusionEnabled,
  onFusionChange,
}: ModelSelectorProps): React.JSX.Element {
  const [search, setSearch] = useState('')

  return (
    <div
      className="composer-popover model-popover"
      role="menu"
      aria-label="Model selector"
    >
      <button
        className="fusion-row"
        type="button"
        aria-pressed={fusionEnabled}
        onClick={() => onFusionChange(!fusionEnabled)}
      >
        <span>Copilot Fusion</span>
        {fusionEnabled ? (
          <ToggleRight size={28} aria-hidden="true" />
        ) : (
          <ToggleLeft size={28} aria-hidden="true" />
        )}
      </button>
      <div className="model-heading">
        <span>Model</span>
        <strong>Default</strong>
      </div>
      <label className="popover-search model-search">
        <Search size={14} aria-hidden="true" />
        <input
          value={search}
          aria-label="Search models"
          placeholder="Search models"
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>
      <p className="no-models">{search ? `No models match "${search}"` : 'No models available'}</p>
    </div>
  )
}
