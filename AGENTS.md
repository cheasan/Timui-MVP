# AGENTS.md

This file contains guidelines for agentic coding assistants working on this repository.

## Build, Lint, and Test Commands

### Development
- `npm i` - Install dependencies
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production

### Testing
- No test framework is currently configured in this project
- Before adding tests, check with the user which testing framework to use

### Code Quality
- No linting or type checking scripts are currently configured
- Consider adding ESLint and TypeScript checking if working extensively on the codebase

## Project Overview

**Timui MVP** is a mobile-first React application built with Vite, TypeScript, and Tailwind CSS. It helps Gen Z university students manage assignments, tasks, career development, and more.

**Tech Stack:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS 4.1 for styling
- Radix UI components
- Lucide React icons

## Code Style Guidelines

### Imports
- Use absolute imports with `@` alias for src directory (configured in vite.config.ts)
  ```tsx
  import { Component } from '@/app/components/Component';
  ```
- Group imports: external libraries first, then internal imports
- Use named exports for components (preferred over default exports)

### Component Structure
- Functional components with TypeScript interfaces for props
- Place prop interfaces at the top of the file, before the component
- Use TypeScript for all components and data structures
- Example:
  ```tsx
  interface ComponentProps {
    title: string;
    onAction: () => void;
  }

  export function Component({ title, onAction }: ComponentProps) {
    // implementation
  }
  ```

### Naming Conventions
- Components: PascalCase (`AssignmentCard.tsx`)
- Functions/variables: camelCase (`handleClick`, `userName`)
- Constants: UPPER_SNAKE_CASE (`PRESET_REMINDERS`, `API_BASE_URL`)
- TypeScript interfaces: PascalCase (`Assignment`, `Task`)
- Boolean variables: prefix with `is`, `has`, `should` (`isDarkMode`, `hasCompleted`)

### Styling
- **Mobile-first design only** - ignore desktop layouts
- Use Tailwind CSS classes for most styling
- Use inline `style` prop only for dynamic values or CSS variables
- Always use CSS variables from theme.css for colors, spacing, and typography:
  ```tsx
  <div style={{ color: 'var(--foreground)', borderRadius: 'var(--radius-button)' }}>
  ```
- Key CSS variables to use:
  - Colors: `var(--primary)`, `var(--foreground)`, `var(--muted-foreground)`
  - Spacing: `var(--radius-button)`, `var(--radius-card)`, `var(--radius-input)`
  - Typography: `var(--text-sm)`, `var(--text-base)`, `var(--font-weight-medium)`
  - Glass effects: `var(--glass-background)`, `var(--glass-border)`
- **No hover states** - use `active:scale-[0.98]` or `active:opacity-80` for touch feedback
- Minimum touch target size: 44px x 44px

### Dark Mode
- Support dark mode throughout the app
- Use `isDarkMode` prop or state for conditional rendering
- Apply dark mode class to document root:
  ```tsx
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  ```
- CSS variables automatically adapt to dark mode via `.dark` selector

### State Management
- Use React hooks (useState, useEffect) for local state
- For shared state, pass props or consider React Context
- Keep state as close to where it's used as possible
- Use functional updates for state derived from previous state:
  ```tsx
  setAssignments(prev => [...prev, newAssignment]);
  ```

### Error Handling
- Minimal error handling currently exists
- Add try-catch blocks around async operations
- Validate user input before processing
- Provide user-friendly error messages

### File Organization
- `src/app/components/` - Application components (AssignmentCard, Welcome, etc.)
- `src/app/components/ui/` - Reusable UI components (button.tsx, card.tsx, etc.)
- `src/imports/` - Imported assets and Figma-generated components
- `src/styles/` - Global styles (fonts.css, theme.css, tailwind.css)
- Follow the existing structure when adding new files

### UI Components
- Radix UI components are available via `@radix-ui/react-*` packages
- Use shadcn/ui style components from `@radix-ui` when possible
- Existing UI components are in `src/app/components/ui/`
- Check existing components before creating new ones

### Typography
- All text uses **Inter** font family
- Use CSS variables for font sizes: `--text-xs`, `--text-sm`, `--text-base`, `--text-lg`, `--text-xl`, `--text-2xl`, `--text-3xl`
- Use CSS variables for font weights: `--font-weight-normal` (400), `--font-weight-medium` (500), `--font-weight-semibold` (600)

### Icons
- Use Lucide React icons: `import { IconName } from 'lucide-react'`
- Size icons using `w-5 h-5` or similar Tailwind classes
- Apply `className="shrink-0"` to prevent icon shrinking

### Dates and Time
- Use JavaScript `Date` objects for dates
- Format dates using `toLocaleString()` or similar native methods
- Consider `date-fns` library for more complex date operations (already in dependencies)

### Glass Theme Design
- Glass effects use `backdrop-blur-xl` class
- Background colors: `var(--glass-background)` for transparent backgrounds
- Border colors: `var(--glass-border)` for subtle borders
- Shadows: `var(--glass-shadow)` or `var(--glass-shadow-lg)`
- Apply to cards, modals, navigation elements

### Accessibility (Mobile)
- Minimum text size: 14px (`--text-sm`)
- Touch targets: minimum 44px x 44px
- Adequate color contrast
- Use semantic HTML elements

### Comments
- DO NOT add comments to code unless explicitly requested
- The project follows a minimal-comment approach

### Git Workflow
- DO NOT commit changes unless explicitly asked
- When asked to commit, follow these steps:
  1. Run `git status` and `git diff` to see changes
  2. Run `git log` to understand commit message style
  3. Stage relevant files
  4. Create commit with descriptive message
  5. Run `git status` to verify

### General Rules
- Always prefer editing existing files over creating new ones
- Follow existing patterns in the codebase
- Check if a library/framework is already in use before adding it (check package.json)
- Test mobile responsiveness - this is a mobile-first app
- Support both light and dark modes for all new features
- Avoid introducing secrets, API keys, or credentials in code