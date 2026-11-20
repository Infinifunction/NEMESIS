# NEMESIS Frontend

NEMESIS Frontend is the user interface of the NEMESIS desktop application, which aims to transform artificial intelligence into an extensible and context-aware workspace. The interface is built with React, TypeScript, Electron, and Vite, following the **"Dark Premium AI Workspace"** design language.

This README serves as a temporary introduction to the current interface. UI flows are provided for backend and provider integrations that are not yet complete; operations that do not have a real integration are never presented as successful.

## What It Does

The frontend provides the application shell for chat, automation, customization, settings, projects, and sessions.

- Start new conversations and use the local chat flow.
- Navigate to the Automations, Customize, and Settings pages through the sidebar.
- Create projects from the Projects section and open their workspaces.
- Open placeholder interfaces for Chat, GitHub, URL, or local folder workflows from the Sessions section.
- Write multi-line messages using the Chat Composer and send them by pressing Enter.
- Open and make selections from the +, Plan, Model, Chat, and This computer controls.
- Display toast notifications in the bottom-left corner for backend-dependent operations in the Plus, Chat, and Execution menus.

## Chat Interface

The Chat screen has two primary states.

### Initial State

- The NEMESIS brand is displayed in the center of the main area.
- The unified Composer is positioned between the logo and the suggestion cards for a balanced layout.
- Suggested Prompt cards provide starting ideas.
- Clicking a card transfers its suggested text into the Composer.

### Active Chat State

- Once the first message is sent, the logo and suggestion cards are removed.
- The conversation history becomes visible.
- The conversation area automatically scrolls to the bottom as new messages arrive.
- The Composer remains horizontally centered at the bottom of the screen.

## Chat Composer

The Composer is a single, integrated, two-layer component:

- The upper section contains a multi-line message input.
- The bottom-left section contains the +, Plan, and Default controls.
- The bottom-right section contains a microphone placeholder and a send button.
- Chat and This computer selectors are positioned below the Composer.
- Pressing Enter sends the message; Shift+Enter inserts a new line.

Selections managed within the frontend state:

- Plan mode: Interactive, Plan, or Autopilot
- Tool permissions: Always ask, Assisted, or Approve all
- Chat mode
- Execution environment
- Model Fusion toggle placeholder

GitHub, URL, local folder, model providers, and cloud environment workflows are not yet connected to the backend. Therefore, options requiring these integrations only provide UI flows, and toast notifications do not claim that real integrations are available.

## Design System

The frontend uses the existing NEMESIS dark design language:

- Main background: `#111315`
- Sidebar: `#171A1D`
- Secondary surfaces: `#1D2125`
- Cards and input fields: `#24282C`
- Primary text: `#F0F0F0`
- Secondary text: `#92989F`
- Accent color: `#E5484D`

The interface features Lucide icons, focus states, hover interactions, subtle transitions, and a responsive desktop layout with a minimum width of 320px.

## Component Structure

Key renderer components:

- `Sidebar`: Main navigation, Projects, Sessions, and account section
- `ChatLayout`: Initial and active chat layouts
- `ChatComposer`: Integrated chat input component
- `ComposerMenus`: Plus, Chat, Environment, Plan, and Model menus
- `SuggestedPrompts`: Initial suggestion cards
- `ToastViewport`: Reusable notification system
- `PlaceholderPage`: Backend-dependent or not-yet-ready sections

## Project Structure

```text
src/
  main/
    Electron main process code
  preload/
    Controlled API boundary between the renderer and Electron
  renderer/src/
    App.tsx
    components/
    assets/
```

The renderer process is not given direct access to Node.js or privileged Electron APIs.

## Requirements

- Node.js and npm
- A suitable Electron development environment for Windows, macOS, or Linux

## Installation

Install dependencies in the frontend directory:

```bash
npm install
```

## Development

Run the application in Electron development mode:

```bash
npm run dev
```

Vite runs alongside the Electron development server and automatically reloads renderer changes.

## Checks

Run TypeScript checks:

```bash
npm run typecheck
```

Run lint checks:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

Platform-specific packages:

```bash
npm run build:win
npm run build:mac
npm run build:linux
```

## Current Technical Limitations

- Chat responses currently use local preview behavior.
- GitHub, URL, and local folder selection do not perform actual file or repository imports.
- Cloud environments, model lists, and tool permissions are not connected to real providers.
- Automations, Customize, and Settings are extensible placeholder pages.

These limitations reflect the temporary behavior of the interface and are not presented as successful operations until the corresponding backend integrations are implemented.