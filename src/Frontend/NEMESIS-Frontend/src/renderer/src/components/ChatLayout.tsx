import { useEffect, useRef, useState } from 'react'
import type { ChatMessage } from '../types'
import { ChatComposer } from './ChatComposer'
import { SuggestedPrompts } from './SuggestedPrompts'

type ChatLayoutProps = {
  messages: ChatMessage[]
  onSend: (message: string) => void
  isPending: boolean
  pendingMessageId: string | null
  onNotify: (message: string) => void
}

export function ChatLayout({
  messages,
  onSend,
  isPending,
  pendingMessageId,
  onNotify
}: ChatLayoutProps): React.JSX.Element {
  const [draft, setDraft] = useState('')
  const conversationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    conversationRef.current?.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [messages, isPending])

  const submit = (): void => {
    const message = draft.trim()
    if (!message || isPending) return
    onSend(message)
    setDraft('')
  }

  return (
    <main className="chat-layout">
      <div ref={conversationRef} className="conversation" aria-live="polite">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="nemesis-glyph" aria-hidden="true">
              <span className="nemesis-glyph-core">N</span>
            </div>
            <ChatComposer
              draft={draft}
              isPending={isPending}
              onDraftChange={setDraft}
              onSubmit={submit}
              initial
              onNotify={onNotify}
            />
            <SuggestedPrompts onSelect={setDraft} />
          </div>
        ) : (
          <div className="message-list">
            {messages.map((message) => (
              <article key={message.id} className={`message message-${message.role}`}>
                <span className="message-author">
                  {message.role === 'user' ? 'You' : 'NEMESIS'}
                </span>
                <p>{message.content}</p>
              </article>
            ))}
            {isPending && pendingMessageId && (
              <div className="message message-assistant message-pending" role="status">
                <span className="message-author">NEMESIS</span>
                <span className="loading-dots" aria-label="Preparing a response">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {messages.length > 0 && (
        <div className="composer-wrap">
          <ChatComposer
            draft={draft}
            isPending={isPending}
            onDraftChange={setDraft}
            onSubmit={submit}
            onNotify={onNotify}
          />
        </div>
      )}
    </main>
  )
}
