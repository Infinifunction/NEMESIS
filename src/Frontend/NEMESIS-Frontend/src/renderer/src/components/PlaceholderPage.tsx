import type { IconName } from './Icon'
import { Icon } from './Icon'

type PlaceholderPageProps = {
  icon: IconName
  title: string
  description: string
  actionLabel: string
  detail: string
  onAction: () => void
}

export function PlaceholderPage({
  icon,
  title,
  description,
  actionLabel,
  detail,
  onAction
}: PlaceholderPageProps): React.JSX.Element {
  return (
    <main className="placeholder-page">
      <header className="chat-header">
        <div>
          <span className="chat-label">Workspace</span>
          <strong>{title}</strong>
        </div>
      </header>
      <div className="placeholder-content">
        <div className="placeholder-icon">
          <Icon name={icon} size={24} />
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
        <button className="primary-button" type="button" onClick={onAction}>
          {actionLabel}
        </button>
        <div className="placeholder-detail" role="status">
          {detail}
        </div>
      </div>
    </main>
  )
}
