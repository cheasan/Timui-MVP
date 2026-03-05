# Mobile App Guidelines

## App Overview

**Timui** is a comprehensive mobile application designed specifically for **Gen Z university students** to support their entire academic journey from first year through to securing their first job.

### Target Audience

**Gen Z University Students (Born 1997-2012)**

Timui is built with Gen Z values and preferences in mind:
* **Digital natives** who expect seamless, intuitive mobile experiences
* **Socially conscious** - interested in volunteering and making an impact
* **Career-focused** - proactive about building experience and skills early
* **Value authenticity** - prefer genuine, relatable communication
* **Visually driven** - appreciate modern, aesthetic design with vibrant colors
* **Community-oriented** - want to connect with peers and opportunities
* **Budget-conscious** - actively seek student discounts and money-saving tips
* **Multi-taskers** - juggle academics, work, social life, and career prep

### Design Philosophy for Gen Z

When implementing features, consider Gen Z preferences:
* **Bold, vibrant colors** - Use our signature purple (#8245FE) and fresh mint backgrounds
* **Clean, modern UI** - Minimalist yet playful design language
* **Quick interactions** - Fast, gesture-based navigation
* **Visual hierarchy** - Use emojis, icons, and imagery to communicate quickly
* **Authentic tone** - Friendly, supportive, not corporate or condescending
* **Personalization** - Let users customize their experience
* **Status & achievements** - Subtle gamification and progress tracking
* **Social proof** - Show community engagement and opportunities

### Purpose & Features

The app serves as an all-in-one platform to help students succeed by providing:

**Academic Support:**
* Track assignment deadlines with countdown timers
* Manage daily school tasks and to-do lists
* Set multiple reminders and alerts for assignments
* Take notes and organize coursework

**Student Deals & Discounts:**
* Access exclusive student discount deals
* Partner offers and promotions
* Money-saving opportunities tailored for students

**Career Development:**
* Volunteer opportunities to build experience
* Internship listings and applications
* Job opportunities for students and recent graduates
* Upskilling programs and learning resources
* Professional development tools

**Portfolio & Digital CV:**
* Build and maintain a professional portfolio
* Create and update a digital CV/resume
* Easy sharing with employers and connections
* Track achievements and experiences
* Showcase skills and projects

**Goal:**
To support students holistically from their first year of university all the way through to landing their first job, helping them manage academics, save money, and build their careers.

## General Guidelines

This is a **mobile-first application** designed specifically for mobile devices. All designs and implementations should prioritize mobile views.

### Mobile-First Rules:
* **Design for mobile only** - Ignore desktop/web sizes and layouts
* **Mobile viewport** - Ensure everything fits and is visible within mobile screen dimensions (375px - 428px width)
* **Vertical scrolling** - Content should scroll vertically, optimized for one-handed use
* **Touch interactions** - Use tap and swipe gestures instead of hover functions
* **No hover states** - Remove all hover effects; use active/pressed states instead
* **Touch targets** - Ensure buttons and interactive elements are at least 44px x 44px for easy tapping
* **Bottom navigation** - Keep primary navigation at the bottom for thumb-friendly access

### Interaction Guidelines:
* Use **tap** for clicks and selections
* Use **swipe** for navigation between screens or dismissing cards
* Use **long press** for secondary actions (if needed)
* Use **pull to refresh** for updating content (if needed)
* Avoid hover-dependent features entirely

### Layout Guidelines:
* Use single-column layouts for mobile
* Maximize screen real estate with edge-to-edge designs where appropriate
* Ensure proper padding (16-24px) for content readability
* Stack elements vertically for better mobile flow
* Use the bottom navigation bar as the primary navigation method

## Design System Guidelines

### Typography
* All text must use the **Inter** font family as defined in the CSS
* Use CSS variables for font sizes (`--text-xs`, `--text-sm`, `--text-base`, etc.)
* Use CSS variables for font weights (`--font-weight-normal`, `--font-weight-medium`, `--font-weight-semibold`)

### Colors
* Use CSS variables for all colors to ensure consistency with the design system
* Primary color: `var(--primary)`
* Indigo selection color: `var(--indigo-500)`
* Glass effects: Use `var(--glass-background)`, `var(--glass-card)`, `var(--glass-border)`
* Muted text: `var(--muted-foreground)`

### Spacing & Borders
* Use CSS variables for border radius (`--radius-button`, `--radius-card`, `--radius-input`, `--radius-small`)
* Use consistent spacing from the design system
* Glass effects should use `backdrop-blur-xl` with appropriate alpha transparency

### Components
* **Bottom Navigation**: Fixed at bottom, glass effect, rounded corners (28px), 3 main tabs + 1 floating action button
* **Tabs**: Glass pill design with indigo selection, fully rounded (20px)
* **Cards**: Glass effect with backdrop blur, rounded corners, shadow
* **Buttons**: Use CSS variable radius, clear tap targets, no hover states
* **Profile Photo**: Circular, bordered with indigo color
* **Interactive Elements**: Clear visual feedback on tap (active states, not hover)

### Glass Theme
* Background: `var(--glass-background)` with `backdrop-blur-xl`
* Cards: `var(--glass-card)` with appropriate shadows
* Borders: `var(--glass-border)` for subtle separation
* Consistent blur effects throughout the app

### Accessibility for Mobile
* Ensure text is legible at minimum 14px
* Provide adequate contrast ratios
* Make tap targets large enough (min 44px x 44px)
* Support portrait orientation primarily
* Ensure scrollable content is obvious and smooth