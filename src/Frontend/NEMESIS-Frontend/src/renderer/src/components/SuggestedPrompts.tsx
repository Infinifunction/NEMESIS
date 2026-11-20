import { CodeXml, FolderGit2, Workflow } from 'lucide-react'

type SuggestedPromptsProps = {
  onSelect: (prompt: string) => void
}

const prompts = [
  {
    icon: FolderGit2,
    title: 'Review a codebase',
    prompt: 'Review this codebase and identify its most important architecture risks'
  },
  {
    icon: Workflow,
    title: 'Build a workflow',
    prompt: 'Design a repeatable workflow for this task'
  },
  {
    icon: CodeXml,
    title: 'Create a web application',
    prompt: 'Create a modern web application from a clear product brief'
  }
]

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps): React.JSX.Element {
  return (
    <div className="suggested-prompts" aria-label="Suggested starting prompts">
      {prompts.map(({ icon: PromptIcon, title, prompt }) => (
        <button key={title} type="button" onClick={() => onSelect(prompt)}>
          <PromptIcon size={16} aria-hidden="true" />
          <span>{title}</span>
        </button>
      ))}
    </div>
  )
}
