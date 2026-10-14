import {
  Globe,
  Code2,
  Hammer,
  KanbanSquare,
  LayoutDashboard,
  LayoutTemplate,
  Layers,
  type LucideIcon,
  ClipboardList,
  PenTool,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  TerminalSquare,
  Users,
  Workflow,
} from 'lucide-react'

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  'figma-to-nextjs': LayoutTemplate,
  'figma-ui-ux-design': PenTool,
  'saas-dashboard-development': LayoutDashboard,
  'full-stack-web-app-development': Layers,
  'ai-automation-n8n': Workflow,
  'crm-custom-software-development': Users,
  'ecommerce-app-development': ShoppingCart,
  'react-native-app-development': Smartphone,
  'claude-code-export-cleanup': TerminalSquare,
  'ai-built-app-cleanup': ShieldCheck,
  'project-management': KanbanSquare,
}

export const COURSE_ICONS: Record<string, LucideIcon> = {
  'ui-ux-design': PenTool,
  'frontend-development': Code2,
  'backend-development': Server,
  'full-stack-development': Layers,
  'mobile-app-development': Smartphone,
  'ai-automation': Workflow,
}

export const PROCESS_ICONS: LucideIcon[] = [Search, ClipboardList, Hammer, Rocket]
