import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Activity = {
  id: string;
  icon: string;
  accent: string;
  title: string;
  meta: string;
  date: string;
  status: string;
  statusColor?: string;
};

type Palette = "default" | "neon" | "sunset" | "ocean";

type User = {
  name: string;
  email: string;
};

const seed: Activity[] = [
  { id: "a1", icon: "assignment_turned_in", accent: "science", title: "Physics Lab Report Submitted", meta: "PHYSICS • UNIT 4", date: "12 KARTIK 2081", status: "SUCCESS", statusColor: "english" },
  { id: "a2", icon: "quiz", accent: "math", title: "Calculus Mid-Term Exam", meta: "MATHEMATICS • SEMESTER 1", date: "10 KARTIK 2081", status: "GRADED: 94/100" },
  { id: "a3", icon: "menu_book", accent: "english", title: "Library Resource Accessed: Muna Madan", meta: "RESOURCES • DIGITAL ARCHIVE", date: "09 KARTIK 2081", status: "HISTORY" },
];

type Ctx = {
  activity: Activity[];
  addActivity: (a: Omit<Activity, "id" | "date">) => void;
  clear: () => void;
  notifications: { id: string; text: string; read: boolean }[];
  markNotifsRead: () => void;
  layout: "navbar" | "sidebar";
  setLayout: (l: "navbar" | "sidebar") => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  palette: Palette;
  setPalette: (palette: Palette) => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const StoreCtx = createContext<Ctx | null>(null);

const ACTIVITY_KEY = "studynp:activity:v1";
const SETTINGS_KEY = "studynp:settings:v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [activity, setActivity] = useState<Activity[]>(seed);
  const [notifications, setNotifs] = useState([
    { id: "n1", text: "New NEB model question set uploaded", read: false },
    { id: "n2", text: "Calculus assignment due in 3 days", read: false },
    { id: "n3", text: "Attendance at 96% — keep it up!", read: false },
  ]);
  const [layout, setLayoutState] = useState<"navbar" | "sidebar">("navbar");
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const [palette, setPaletteState] = useState<Palette>("default");
  const [animationsEnabled, setAnimationsEnabledState] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const rawActivity = localStorage.getItem(ACTIVITY_KEY);
      if (rawActivity) setActivity(JSON.parse(rawActivity));
      const rawSettings = localStorage.getItem(SETTINGS_KEY);
      if (rawSettings) {
        const parsed = JSON.parse(rawSettings);
        if (parsed.layout === "navbar" || parsed.layout === "sidebar") setLayoutState(parsed.layout);
        if (parsed.theme === "light" || parsed.theme === "dark") setThemeState(parsed.theme);
        if (["default", "neon", "sunset", "ocean"].includes(parsed.palette)) setPaletteState(parsed.palette);
        if (typeof parsed.animationsEnabled === "boolean") setAnimationsEnabledState(parsed.animationsEnabled);
        if (parsed.user && typeof parsed.user.name === "string" && typeof parsed.user.email === "string") setUser(parsed.user);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activity)); } catch {}
  }, [activity]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ layout, theme, palette, animationsEnabled, user }));
    } catch {}
  }, [layout, theme, palette, animationsEnabled, user]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const paletteConfig: Record<Palette, Record<string, string>> = {
      default: {
        "--primary": "#111111",
        "--primary-foreground": "#ffffff",
        "--accent": "#111111",
        "--accent-foreground": "#ffffff",
        "--accent-science": "#3f51b5",
        "--accent-math": "#b71c1c",
        "--accent-english": "#2e7d32",
        "--accent-nepali": "#ef6c00",
        "--accent-social": "#6a1b9a",
        "--accent-computer": "#00695c",
      },
      neon: {
        "--primary": "#0f172a",
        "--primary-foreground": "#e0f2fe",
        "--accent": "#f43f5e",
        "--accent-foreground": "#ffffff",
        "--accent-science": "#7c3aed",
        "--accent-math": "#ec4899",
        "--accent-english": "#22d3ee",
        "--accent-nepali": "#f59e0b",
        "--accent-social": "#8b5cf6",
        "--accent-computer": "#14b8a6",
      },
      sunset: {
        "--primary": "#1f2937",
        "--primary-foreground": "#f8fafc",
        "--accent": "#fb923c",
        "--accent-foreground": "#111827",
        "--accent-science": "#f97316",
        "--accent-math": "#f43f5e",
        "--accent-english": "#f59e0b",
        "--accent-nepali": "#fb8500",
        "--accent-social": "#ef4444",
        "--accent-computer": "#0ea5e9",
      },
      ocean: {
        "--primary": "#0f172a",
        "--primary-foreground": "#e0f2fe",
        "--accent": "#22d3ee",
        "--accent-foreground": "#0f172a",
        "--accent-science": "#2563eb",
        "--accent-math": "#0284c7",
        "--accent-english": "#0ea5e9",
        "--accent-nepali": "#22c55e",
        "--accent-social": "#14b8a6",
        "--accent-computer": "#0f766e",
      },
    };
    Object.entries(paletteConfig[palette]).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [palette]);

  const nepaliDate = () => {
    const months = ["BAISHAKH","JESTHA","ASHADH","SHRAWAN","BHADRA","ASHWIN","KARTIK","MANGSIR","POUSH","MAGH","FALGUN","CHAITRA"];
    const d = new Date();
    return `${String(d.getDate()).padStart(2,"0")} ${months[d.getMonth()]} 2081`;
  };

  const addActivity: Ctx["addActivity"] = (a) => {
    setActivity((prev) => [
      { ...a, id: crypto.randomUUID(), date: nepaliDate() },
      ...prev,
    ]);
  };

  const login = () => {
    setUser({ name: "Aarav Sharma", email: "student@neb.edu" });
  };

  const logout = () => {
    setUser(null);
  };

  const setLayout = (l: "navbar" | "sidebar") => {
    setLayoutState(l);
  };

  const setAnimationsEnabled = (enabled: boolean) => {
    setAnimationsEnabledState(enabled);
  };

  return (
    <StoreCtx.Provider value={{
      activity,
      addActivity,
      clear: () => setActivity([]),
      notifications,
      markNotifsRead: () => setNotifs((n) => n.map((x) => ({ ...x, read: true }))),
      layout,
      setLayout,
      theme,
      setTheme: setThemeState,
      palette,
      setPalette: setPaletteState,
      animationsEnabled,
      setAnimationsEnabled,
      user,
      isLoggedIn: Boolean(user),
      login,
      logout,
    }}>
      {children}
    </StoreCtx.Provider>
  );
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("StoreProvider missing");
  return c;
}

export function accentClass(accent: string, kind: "text" | "bg" = "text") {
  const map: Record<string, string> = {
    science: kind === "bg" ? "bg-accent-science" : "text-accent-science",
    math: kind === "bg" ? "bg-accent-math" : "text-accent-math",
    english: kind === "bg" ? "bg-accent-english" : "text-accent-english",
    nepali: kind === "bg" ? "bg-accent-nepali" : "text-accent-nepali",
    social: kind === "bg" ? "bg-accent-social" : "text-accent-social",
    computer: kind === "bg" ? "bg-accent-computer" : "text-accent-computer",
  };
  return map[accent] ?? (kind === "bg" ? "bg-primary" : "text-primary");
}
