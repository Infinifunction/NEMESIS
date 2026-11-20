import { useEffect } from 'react'
import { Info, X } from 'lucide-react'

export type ToastItem = {
  id: number
  message: string
}

type ToastViewportProps = {
  toasts: ToastItem[]
  onDismiss: (id: number) => void
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps): React.JSX.Element {
  useEffect(() => {
    const timers = toasts.map((toast) => window.setTimeout(() => onDismiss(toast.id), 3500))
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [onDismiss, toasts])

  return (
    <div className="toast-viewport" role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div className="toast" key={toast.id} role="status">
          <span className="toast-icon" aria-hidden="true">
            <Info size={15} />
          </span>
          <span className="toast-message">{toast.message}</span>
          <button
            className="toast-close"
            type="button"
            aria-label="Dismiss notification"
            onClick={() => onDismiss(toast.id)}
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  )
}
