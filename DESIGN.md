---
name: VS Code Portfolio
description: A high-fidelity developer portfolio that emulates the Visual Studio Code environment to create a "system immersion" experience.
tokens:
  color:
    background:
      dark: "#1e1e1e"
      light: "#ffffff"
    sidebar:
      dark: "#252526"
      light: "#f3f3f3"
    tab:
      active:
        dark: "#1e1e1e"
        light: "#ffffff"
      inactive:
        dark: "#2d2d2d"
        light: "#ececec"
    statusbar:
      default: "#007acc"
    activity-bar:
      dark: "#333333"
      light: "#2c2c2c"
    border:
      dark: "#3c3c3c"
      light: "#e1e1e1"
    text:
      primary:
        dark: "#d4d4d4"
        light: "#333333"
      accent: "#2563eb"
    syntax:
      added: "#2ea043"
      modified: "#218bff"
  typography:
    sans: "Geist, ui-sans-serif, system-ui, sans-serif"
    mono: "Geist Mono, ui-monospace, SFMono-Regular, monospace"
    sizes:
      title: "24px"
      body: "13px"
      detail: "11px"
      status: "11px"
  radii:
    none: "0px"
    sm: "2px"
    md: "4px"
    lg: "8px"
  motion:
    standard: "0.2s ease"
    spring: "spring(stiffness: 300, damping: 30)"
---

# Design Identity: The Operating Environment

The design intent for the VS Code Portfolio is to dissolve the boundary between a "website" and a "workstation." It treats the browser window as an IDE instance where the user isn't just viewing static content, but exploring a live system.

## Visual Language

The interface relies on structural hierarchy rather than decorative elements. It uses the VS Code "Workbench" layout to provide a familiar mental model for developers and recruiters:

- **Activity Bar:** Global navigation via high-contrast iconography.
- **Side Bar:** Contextual information (File Explorer, Search, Extensions).
- **Editor Area:** The core content stage, utilizing tab-based navigation and code syntax highlighting.
- **Status Bar:** Real-time system telemetry and environment metadata.

## Intentions & Experience

### 1. The "System" Illusion
Every interactive element should feel functional. Buttons aren't just "links"; they are "toggles" or "actions." The code view includes Git-style line indicators and a simulated minimap to reinforce the idea that this is a real-time edit session.

### 2. Density as a Feature
Unlike modern "minimalist" web design that uses wide margins and massive whitespace, this system embraces high information density. Small font sizes (11px–13px) and tight padding (8px–12px) create a professional, technical aesthetic that signals engineering competence.

### 3. Motion & Transitions
Use `motion/react` to provide subtle feedback during layout shifts.
- **Tabs:** Slide in with a slight vertical offset to suggest they are being "opened."
- **Sidebars:** Smoothly compress/expand the editor area to maintain context without jarring jumps.
- **Interactive Elements:** Use scale-down effects (active:scale-95) for a tactile feel.

### 4. Color Strategy
The palette is dominated by low-saturation grays to let the content (the developer's projects and skills) stand out. The `vscode-statusbar` blue serves as the primary orienting color, anchoring the layout at the bottom of the screen.

## Responsive Strategy
On mobile, the interface "collapses" into a focused view. The complex layout controls are hidden behind a menu to prioritize readability, while still maintaining the IDE typography and color scheme.
