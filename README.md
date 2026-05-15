# VS Code Developer Portfolio

A high-fidelity developer portfolio that emulates the Visual Studio Code environment to create a "system immersion" experience. The browser window is treated as an IDE instance where the user isn't just viewing static content, but exploring a live system.

## 🚀 Features

- **Activity Bar:** Global navigation via high-contrast iconography.
- **Side Bar:** Contextual information (File Explorer, Search, Extensions).
- **Editor Area:** Tab-based navigation and code syntax highlighting.
- **Status Bar:** Real-time system telemetry and environment metadata.
- **High-Density Layout:** Professional, technical aesthetic with IDE-like typography and spacing.
- **Smooth Animations:** Built with `motion/react` for fluid layout shifts and interactive feedback.
- **Responsive:** Collapses into a focused view on mobile devices while maintaining the IDE theme.

## 🛠️ Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS (v4)
- **Animations:** Motion
- **Icons:** Lucide React
- **Syntax Highlighting:** React Syntax Highlighter
- **Theme Management:** next-themes

## 📂 Project Structure

The project follows a modular directory structure for scalability:

- `src/components/layout/`: Core UI components (Sidebar, TitleBar, etc.)
- `src/components/views/`: Individual page views and content tabs.
- `src/components/ui/`: Shared interactive UI elements and animations.
- `src/components/providers/`: Context providers and state management.
- `src/lib/`: Utility functions and shared helpers.
- `src/types/`: TypeScript definitions and interfaces.

**Prerequisites:** Node.js

1. Clone the repository:
   ```bash
   git clone https://github.com/Sumit-5002/sumit-prasad-portfolio.git
   cd sumit-prasad-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL provided in the terminal.

## 🗄️ Database Setup (Vercel KV)

The portfolio uses Vercel KV for persistent visitor tracking and analytics. To enable this on Vercel:

1. Push your code to GitHub and deploy to Vercel.
2. In the Vercel Dashboard, go to your project.
3. Select the **Storage** tab and click **Create Database**.
4. Choose **KV** (Redis) and follow the prompts to create it.
5. Once created, click **Connect** and select your project.
6. Vercel will automatically add the necessary environment variables (`KV_URL`, `KV_REST_API_URL`, etc.).
7. Redeploy your project for the changes to take effect.

---

## 🎨 Design

See [DESIGN.md](./DESIGN.md) for detailed information regarding the design system, color palette, typography, and motion specifications.
