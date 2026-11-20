import type { SVGProps } from 'react'
import {
  ChevronRight,
  Folder,
  GitBranch,
  Link2,
  Menu,
  MessageSquare,
  Plus,
  Send,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Workflow
} from 'lucide-react'

export type IconName =
  | 'chat'
  | 'automation'
  | 'customize'
  | 'settings'
  | 'plus'
  | 'chevron'
  | 'github'
  | 'link'
  | 'folder'
  | 'send'
  | 'menu'
  | 'spark'

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName
  size?: number
}

export function Icon({ name, size = 18, ...props }: IconProps): React.JSX.Element {
  const icons: Record<IconName, React.ComponentType<{ size?: number }>> = {
    chat: MessageSquare,
    automation: Workflow,
    customize: SlidersHorizontal,
    settings: Settings,
    plus: Plus,
    chevron: ChevronRight,
    github: GitBranch,
    link: Link2,
    folder: Folder,
    send: Send,
    menu: Menu,
    spark: Sparkles
  }
  const IconComponent = icons[name]

  return <IconComponent size={size} {...props} aria-hidden="true" />
}
