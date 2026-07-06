import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { useStore } from "@/lib/store";

const NAV = [
  { to: "/", label: "DASHBOARD", icon: "dashboard" },
  { to: "/curriculum", label: "CURRICULUM", icon: "menu_book" },
  { to: "/resources", label: "RESOURCES", icon: "folder_open" },
  { to: "/archives", label: "ARCHIVES", icon: "history_edu" },
  { to: "/support", label: "SUPPORT", icon: "help_outline" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { notifications, markNotifsRead, layout, theme, setTheme, isLoggedIn, user, login, logout } = useStore();
  const unread = notifications.filter((n) => !n.read).length;
  const isSettingsPage = pathname === "/settings";
  const showSidebar = layout === "sidebar" && !isSettingsPage;

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* TopNav */}
      <header className="fixed top-0 z-50 bg-surface w-full border-b-2 border-primary flex justify-between items-center px-5 md:px-16 py-4">
        <Link to="/" className="font-display text-2xl md:text-3xl font-extrabold tracking-tighter text-primary">
          STUDY<span className="text-accent-nepali">.</span>NP
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          {(showSidebar ? NAV.slice(0, 3) : NAV).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`label-caps py-1 border-b-2 transition-colors ${
                isActive(n.to) ? "border-primary text-primary" : "border-transparent text-secondary hover:text-primary"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 relative">
          <form
            onSubmit={(e) => { e.preventDefault(); if (query.trim()) window.location.href = `/curriculum?q=${encodeURIComponent(query)}`; }}
            className="hidden sm:block"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border border-primary px-4 py-2 label-caps focus:border-2 focus:ring-0 outline-none w-56"
              placeholder="SEARCH PORTAL..."
              type="text"
            />
          </form>
          <div className="relative">
            <button
              onClick={() => { setNotifOpen((v) => !v); if (!notifOpen) markNotifsRead(); }}
              className="material-symbols-outlined text-primary p-1 hover:bg-primary hover:text-primary-foreground transition-colors relative"
              aria-label="Notifications"
            >
              notifications
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-math text-white text-[10px] w-4 h-4 flex items-center justify-center font-bold">{unread}</span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-card border-2 border-primary p-4 shadow-[6px_6px_0_0_#000]">
                <p className="label-caps mb-3">NOTIFICATIONS</p>
                <ul className="space-y-3">
                  {notifications.map((n) => (
                    <li key={n.id} className="text-sm border-l-2 border-primary pl-3">{n.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {!isLoggedIn ? (
            <button
              onClick={login}
              className="hidden md:inline-flex items-center justify-center rounded-md border-2 border-primary bg-card px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Login
            </button>
          ) : null}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="material-symbols-outlined text-primary p-1 hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "light_mode" : "dark_mode"}
          </button>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="material-symbols-outlined text-primary p-1 hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Profile"
          >
            {isLoggedIn ? "account_circle" : "person_outline"}
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-3 w-72 bg-card border-2 border-primary p-4 shadow-[6px_6px_0_0_#000]">
              <p className="label-caps text-secondary mb-3">{isLoggedIn ? `Welcome back, ${user?.name.split(" ")[0]}` : "Need a login?"}</p>
              {isLoggedIn ? (
                <div className="space-y-2">
                  <Link
                    to="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="block rounded-sm border-2 border-primary bg-card px-4 py-3 text-sm font-medium text-primary hover:bg-surface-container-high"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => { logout(); setProfileOpen(false); }}
                    className="w-full rounded-sm border-2 border-primary bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-card hover:text-primary"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => { login(); setProfileOpen(false); }}
                    className="w-full rounded-sm border-2 border-primary bg-card px-4 py-3 text-sm font-medium text-primary hover:bg-surface-container-high"
                  >
                    Login placeholder
                  </button>
                  <button
                    onClick={() => { login(); setProfileOpen(false); }}
                    className="w-full rounded-sm border-2 border-primary bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-card hover:text-primary"
                  >
                    Sign up placeholder
                  </button>
                </div>
              )}
            </div>
          )}
          <button className="md:hidden material-symbols-outlined text-primary p-1" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            {menuOpen ? "close" : "menu"}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-[64px] left-0 right-0 z-40 bg-surface border-b-2 border-primary md:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setMenuOpen(false)} className={`flex items-center gap-4 p-5 label-caps border-b border-primary ${isActive(n.to) ? "bg-primary text-primary-foreground" : ""}`}>
              <span className="material-symbols-outlined">{n.icon}</span>{n.label}
            </Link>
          ))}
        </div>
      )}

      {/* Sidebar */}
      {showSidebar && (
      <aside className="fixed left-0 top-0 h-full w-64 border-r-2 border-primary bg-sidebar hidden md:flex flex-col pt-24 z-30">
        <div className="px-8 mb-12">
          <h2 className="font-display text-xl font-bold text-primary leading-none">ACADEMIC PORTAL</h2>
          <p className="label-caps text-secondary mt-2">NEB · GRADE 12</p>
        </div>
        <nav className="flex flex-col flex-grow">
          {NAV.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              className={`flex items-center gap-4 p-6 label-caps transition-colors ${
                isActive(n.to) ? "bg-primary text-primary-foreground" : "text-on-surface hover:bg-surface-container-high"
              } ${i === NAV.length - 1 ? "mt-auto border-t border-primary" : ""}`}
            >
              <span className="material-symbols-outlined">{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="px-8 py-4 border-t border-primary mt-auto">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex w-full items-center justify-between rounded-sm border-2 border-primary bg-card px-4 py-3 text-left text-sm font-medium text-primary hover:bg-surface-container-high"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
              Theme
            </span>
            <span>{theme === "dark" ? "Dark" : "Light"}</span>
          </button>
        </div>
      </aside>
      )}

      <main className={`${showSidebar ? "md:ml-64" : ""} pt-28 px-5 md:px-16 pb-20 min-h-screen`}>
        {children}
      </main>

      <footer className={`${showSidebar ? "md:ml-64" : ""} px-5 md:px-16 py-6 flex flex-col md:flex-row justify-between items-center border-t-2 border-primary bg-surface gap-3`}>
        <p className="mono-label">© 2081 BS · STUDY.NP · NEB ACADEMIC PORTAL · NEPAL</p>
        <div className="flex gap-6">
          <a className="mono-label hover:underline" href="https://neb.gov.np/" target="_blank" rel="noreferrer">NEB.gov.np</a>
          <a className="mono-label hover:underline" href="#">Privacy</a>
          <a className="mono-label hover:underline" href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
}
