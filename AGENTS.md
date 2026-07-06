<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project Summary

This repository is a Vite + React + TypeScript study portal for Nepal's NEB Grade 11/12 students. It uses TanStack Router and TanStack Start for routing and SSR, Tailwind CSS for styling, and local browser state for session, theme, and activity tracking.

### Current focus
- Add a landing page for unauthenticated visitors
- Use a placeholder login/signup flow to switch to the dashboard
- Move layout and theme controls from `Support` into a new `Settings` route
- Show `Settings` only when logged in via profile dropdown
- Support Navbar-only and Navbar+Sidebar desktop layouts
- Add light/dark theme toggle and color palette presets
- Keep the brutalist visual design while adding subtle animation and Gen Z-friendly wording

### Important files
- `src/lib/store.tsx` — global store with auth placeholder, theme, layout, palette, and local persistence
- `src/routes/index.tsx` — landing page and dashboard routing
- `src/routes/settings.tsx` — new settings page
- `src/routes/support.tsx` — support page with FAQ and contact form
- `src/components/Shell.tsx` — app shell, navigation, profile dropdown, theme toggle
- `src/styles.css` — global styling and animations

