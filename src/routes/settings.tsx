import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

const paletteOptions = [
  { id: "default", label: "Classic" },
  { id: "neon", label: "Neon Pop" },
  { id: "sunset", label: "Sunset" },
  { id: "ocean", label: "Ocean" },
] as const;

function Settings() {
  const {
    layout,
    setLayout,
    theme,
    setTheme,
    palette,
    setPalette,
    animationsEnabled,
    setAnimationsEnabled,
    logout,
  } = useStore();

  return (
    <div className="space-y-10 fade-in">
      <section className="mb-8">
        <p className="label-caps text-secondary mb-2">USER HUB</p>
        <h1 className="font-display text-[56px] md:text-[72px] font-extrabold leading-none tracking-tighter">SETTINGS.</h1>
        <p className="max-w-2xl text-secondary mt-4 leading-8">
          Customize your study vibes with themes, layout mode, and focused preferences. Keep it clean, intentional, and easy to move through.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-sm border-2 border-primary bg-card p-6 md:p-8 space-y-6">
          <div>
            <p className="label-caps text-secondary">NAVIGATION</p>
            <h2 className="text-2xl font-bold tracking-tight mt-3">Where should your toolkit live?</h2>
            <p className="mt-3 text-sm text-secondary">Pick how STUDY.NP lays out on desktop: either top nav only or one clean sidebar system.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setLayout("navbar")}
              className={`rounded-sm border-2 border-primary p-5 text-left transition-colors ${layout === "navbar" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-surface-container-high"}`}
            >
              <p className="label-caps mb-1">Navbar</p>
              <p className="font-semibold">Clean top bar</p>
            </button>
            <button
              type="button"
              onClick={() => setLayout("sidebar")}
              className={`rounded-sm border-2 border-primary p-5 text-left transition-colors ${layout === "sidebar" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-surface-container-high"}`}
            >
              <p className="label-caps mb-1">Navbar + Sidebar</p>
              <p className="font-semibold">Full study control panel</p>
            </button>
          </div>
        </div>

        <div className="rounded-sm border-2 border-primary bg-card p-6 md:p-8 space-y-6">
          <div>
            <p className="label-caps text-secondary">MOOD</p>
            <h2 className="text-2xl font-bold tracking-tight mt-3">Theme mode</h2>
            <p className="mt-3 text-sm text-secondary">Toggle between light and dark mode for late-night and early-morning study sessions.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value as "light" | "dark")}
                className={`rounded-sm border-2 border-primary p-5 transition-colors ${theme === option.value ? "bg-primary text-primary-foreground" : "bg-card hover:bg-surface-container-high"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="rounded-sm border-2 border-primary bg-card p-6 md:p-8 space-y-6">
        <div>
          <p className="label-caps text-secondary">COLOR PALETTE</p>
          <h2 className="text-2xl font-bold tracking-tight mt-3">Pick a study palette</h2>
          <p className="mt-3 text-sm text-secondary">Choose the color scheme that helps your brain focus hardest.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-4">
          {paletteOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setPalette(option.id)}
              className={`rounded-sm border-2 border-primary p-5 text-left transition-colors ${palette === option.id ? "bg-primary text-primary-foreground" : "bg-card hover:bg-surface-container-high"}`}
            >
              <p className="font-semibold">{option.label}</p>
              <p className="text-sm text-secondary mt-2">{option.id === "default" ? "OG classic" : option.id === "neon" ? "Vaporwave energy" : option.id === "sunset" ? "Warm focus" : "Cool calm"}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-sm border-2 border-primary bg-card p-6 md:p-8 space-y-4">
          <div>
            <p className="label-caps text-secondary">STUDY SETTINGS</p>
            <h2 className="text-2xl font-bold tracking-tight mt-3">Focus mode</h2>
            <p className="mt-3 text-sm text-secondary">Enable or disable subtle animations while you study.</p>
          </div>
          <button
            type="button"
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className={`rounded-sm border-2 border-primary px-4 py-3 font-medium transition-colors ${animationsEnabled ? "bg-primary text-primary-foreground" : "bg-card hover:bg-surface-container-high"}`}
          >
            {animationsEnabled ? "Motion on — keep it vibey" : "Motion off — focus mode"}
          </button>
        </div>

        <div className="rounded-sm border-2 border-primary bg-card p-6 md:p-8 space-y-4">
          <div>
            <p className="label-caps text-secondary">ACCOUNT</p>
            <h2 className="text-2xl font-bold tracking-tight mt-3">Session control</h2>
            <p className="mt-3 text-sm text-secondary">Placeholder auth is active; sign out to return to the landing page.</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-sm border-2 border-primary bg-primary px-4 py-3 text-primary-foreground font-medium hover:bg-card hover:text-primary transition-colors"
          >
            Logout placeholder
          </button>
        </div>
      </section>
    </div>
  );
}
