import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SUBJECTS } from "@/lib/study-data";
import { useStore, accentClass } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: IndexRoute,
});

function IndexRoute() {
  const { isLoggedIn, login } = useStore();
  return isLoggedIn ? <Dashboard /> : <LandingPage onLogin={login} />;
}

function LandingPage({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="space-y-16 fade-in">
      <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr] items-center">
        <div className="space-y-6">
          <p className="label-caps text-secondary mb-2">STUDY NEO — NOTES, QUIZZES, FLASHCARDS</p>
          <h1 className="font-display text-[56px] md:text-[72px] font-extrabold leading-tight tracking-tighter">
            Your study hub for NEB Grade 11/12 — built for the grind.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-secondary">
            Notes, solved model questions, quizzes, flashcards, and study streak juice — all in one brutalist dashboard. No cap, your study game is about to get way more organized.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onLogin}
              className="bg-primary text-primary-foreground px-8 py-4 label-caps transition-transform duration-300 hover:-translate-y-1"
            >
              Login &amp; start studying
            </button>
            <button
              onClick={onLogin}
              className="border-2 border-primary px-8 py-4 label-caps hover:bg-surface hover:text-primary transition-all"
            >
              Sign up placeholder
            </button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["Notes vault", "Quick reference notes for all NEB subjects."],
              ["Flashcard drills", "Flip cards for fast vocab and formula recall."],
              ["Quiz mode", "Mini-tests for every topic, no pressure."],
              ["Session log", "Track your focus and flex your progress."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-sm border-2 border-primary bg-card p-6 shadow-[6px_6px_0_0_#000] transition-all hover:-translate-y-1">
                <p className="font-semibold">{title}</p>
                <p className="mt-3 text-sm text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-sm border-2 border-primary bg-surface p-8 shadow-[8px_8px_0_0_#000] animate-slide-up">
          <p className="label-caps text-secondary mb-4">TRENDING</p>
          <div className="space-y-4">
            <div className="rounded-sm border-2 border-primary p-6 bg-card">
              <p className="font-semibold">Six-seven mode on</p>
              <p className="mt-3 text-sm text-secondary">Study like a legend with notes, quick quizzes, and flashcards that match your vibes.</p>
            </div>
            <div className="rounded-sm border-2 border-primary p-6 bg-card">
              <p className="font-semibold">NEB question feeds</p>
              <p className="mt-3 text-sm text-secondary">Access solved model questions and keep your revision lit.</p>
            </div>
            <div className="rounded-sm border-2 border-primary p-6 bg-card">
              <p className="font-semibold">Daily streak boost</p>
              <p className="mt-3 text-sm text-secondary">Log sessions, earn momentum, and never miss the grind.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {[
          ["Notes", "Bags of crisp NEB notes for fast revision."],
          ["Quizzes", "Short practice checks to keep your brain sharp."],
          ["Flashcards", "Memory boosts for facts, formulas, and quotes."],
        ].map(([title, desc]) => (
          <div key={title} className="rounded-sm border-2 border-primary bg-card p-7 transition duration-300 hover:-translate-y-1">
            <p className="font-bold text-xl">{title}</p>
            <p className="mt-4 text-secondary">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function Dashboard() {
  const { activity, addActivity } = useStore();
  const [logOpen, setLogOpen] = useState(false);

  const overall = useMemo(() => {
    const avg = SUBJECTS.reduce((s, x) => s + x.progress, 0) / SUBJECTS.length;
    return Math.round(avg * 10) / 10;
  }, []);

  const downloadReport = () => {
    const lines = [
      "STUDY.NP — ACADEMIC REPORT",
      "Student: AARAV SHARMA (NP-2081-8891)",
      `Overall: ${overall}%`,
      "",
      "SUBJECTS:",
      ...SUBJECTS.map((s) => `  ${s.code}  ${s.name.padEnd(20)} ${s.progress}%`),
      "",
      "RECENT ACTIVITY:",
      ...activity.map((a) => `  ${a.date}  ${a.title}  [${a.status}]`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "study-np-report.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Header */}
      <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="label-caps text-secondary mb-2">Welcome Back, Aarav</p>
          <h1 className="font-display text-[56px] md:text-[80px] font-extrabold leading-none tracking-tighter">OVERVIEW.</h1>
        </div>
        <div className="flex flex-wrap gap-4">
          <button onClick={downloadReport} className="bg-card border-2 border-primary text-primary px-6 md:px-8 py-4 label-caps hover:bg-primary hover:text-primary-foreground transition-all active:scale-95">
            DOWNLOAD REPORT
          </button>
          <button onClick={() => setLogOpen(true)} className="bg-primary text-primary-foreground border-2 border-primary px-6 md:px-8 py-4 label-caps hover:bg-card hover:text-primary transition-all active:scale-95">
            LOG SESSION
          </button>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-6">
        {/* Overall Progress */}
        <div className="col-span-12 lg:col-span-8 border-2 border-primary bg-card p-6 md:p-8 flex flex-col justify-between min-h-[420px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="label-caps uppercase tracking-[0.35em] text-secondary">OVERALL ACADEMIC PROGRESS</h3>
            </div>
            <span className="mono-label text-secondary">TERM 01 / 2081 BS</span>
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6 my-8">
            <span className="font-display text-[100px] md:text-[130px] lg:text-[150px] font-extrabold leading-none tracking-tighter">{overall}</span>
            <div className="flex flex-col gap-3">
              <span className="text-2xl md:text-3xl font-bold tracking-wide">PERCENTAGE</span>
              <span className="label-caps text-accent-english flex items-center gap-2">
                <span className="material-symbols-outlined text-base">trending_up</span> +2.4% FROM LAST MONTH
              </span>
            </div>
          </div>
          <div className="w-full border-t border-primary pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ["CREDITS", "24 / 30"],
              ["ATTENDANCE", "96%"],
              ["RANK", "04 / 120"],
              ["STATUS", "ACTIVE"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-sm bg-surface-container p-4">
                <p className="label-caps text-secondary">{k}</p>
                <p className="text-lg font-semibold mt-2">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Profile */}
        <div className="col-span-12 lg:col-span-4 border-2 border-primary bg-card p-6 md:p-8 flex flex-col gap-6">
          <div className="rounded-sm overflow-hidden border-2 border-primary bg-surface h-48">
            <img
              className="w-full h-full object-cover"
              alt="Student portrait"
              src="https://images.unsplash.com/photo-1584697964192-b8f4c37b1ec8?w=800&auto=format&fit=crop&q=60"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1 tracking-wide">AARAV SHARMA</h3>
            <p className="label-caps text-secondary">STUDENT ID: NP-2081-8891</p>
          </div>
          <div className="space-y-4 border-t border-primary pt-6">
            {[
              ["LEVEL", "GRADE 12"],
              ["FACULTY", "SCIENCE (+2)"],
              ["CAMPUS", "KATHMANDU"],
              ["BOARD", "NEB, NEPAL"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <span className="label-caps text-secondary">{k}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Cards */}
        {SUBJECTS.map((s) => (
          <Link
            key={s.id}
            to="/curriculum"
            className="col-span-12 sm:col-span-6 lg:col-span-4 border-2 border-primary bg-card p-6 group cursor-pointer transition-colors hover:text-white"
            style={{ ["--hoverAccent" as any]: `var(--accent-${s.accent})` }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `var(--accent-${s.accent})`)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
          >
            <div className="flex justify-between items-start mb-12">
              <span className="material-symbols-outlined text-4xl">{s.icon}</span>
              <span className="mono-label">{s.code}</span>
            </div>
            <h4 className="text-2xl md:text-3xl font-bold mb-2 tracking-wide">{s.name.toUpperCase()}</h4>
            <div className="h-1 w-full bg-surface-container group-hover:bg-surface/70 mb-4">
              <div className={`h-full ${accentClass(s.accent, "bg")} group-hover:bg-surface`} style={{ width: `${s.progress}%` }} />
            </div>
            <p className="label-caps">{s.progress}% COMPLETE</p>
          </Link>
        ))}

        {/* Recent Activity */}
        <div className="col-span-12 border-2 border-primary bg-card">
          <div className="p-6 border-b border-primary flex justify-between items-center">
            <h3 className="text-xl font-bold uppercase tracking-tight">Recent Activity Log</h3>
            <Link to="/archives" className="label-caps underline hover:no-underline">VIEW FULL ARCHIVE</Link>
          </div>
          <div className="divide-y divide-primary">
            {activity.slice(0, 5).map((a) => (
              <div key={a.id} className="p-6 grid grid-cols-12 gap-4 items-center hover:bg-surface-container-low transition-colors">
                <div className="col-span-1 flex items-center">
                  <span className={`material-symbols-outlined ${accentClass(a.accent)}`}>{a.icon}</span>
                </div>
                <div className="col-span-7 md:col-span-8">
                  <p className="font-semibold">{a.title}</p>
                  <p className="label-caps text-secondary mt-1">{a.meta}</p>
                </div>
                <div className="col-span-4 md:col-span-3 text-right">
                  <p className="mono-label">{a.date}</p>
                  <p className={`label-caps mt-1 ${accentClass(a.statusColor ?? "")}`}>{a.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {logOpen && (
        <LogSessionDialog
          onClose={() => setLogOpen(false)}
          onSubmit={(data) => {
            const subj = SUBJECTS.find((s) => s.id === data.subject)!;
            addActivity({
              icon: "schedule",
              accent: subj.accent,
              title: `Study session — ${subj.name} (${data.minutes} min)`,
              meta: `${subj.name.toUpperCase()} • ${data.topic || "GENERAL"}`,
              status: "LOGGED",
              statusColor: "english",
            });
            setLogOpen(false);
          }}
        />
      )}
    </>
  );
}

function LogSessionDialog({ onClose, onSubmit }: { onClose: () => void; onSubmit: (d: { subject: string; minutes: number; topic: string }) => void }) {
  const [subject, setSubject] = useState(SUBJECTS[0].id);
  const [minutes, setMinutes] = useState(45);
  const [topic, setTopic] = useState("");
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-card border-2 border-primary p-6 md:p-8 w-full max-w-md shadow-[8px_8px_0_0_#000]">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="label-caps text-secondary">NEW ENTRY</p>
            <h2 className="text-2xl font-bold tracking-tight mt-1">LOG STUDY SESSION</h2>
          </div>
          <button onClick={onClose} className="material-symbols-outlined hover:bg-primary hover:text-primary-foreground p-1">close</button>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); onSubmit({ subject, minutes, topic }); }}
          className="space-y-4"
        >
          <label className="block">
            <span className="label-caps">SUBJECT</span>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-2 w-full border-2 border-primary bg-surface p-3 outline-none">
              {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="label-caps">MINUTES</span>
            <input type="number" min={5} max={480} value={minutes} onChange={(e) => setMinutes(+e.target.value)} className="mt-2 w-full border-2 border-primary bg-surface p-3 outline-none" />
          </label>
          <label className="block">
            <span className="label-caps">TOPIC (OPTIONAL)</span>
            <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Integration by parts" className="mt-2 w-full border-2 border-primary bg-surface p-3 outline-none" />
          </label>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-4 label-caps hover:bg-card hover:text-primary border-2 border-primary transition-all active:scale-95">
            SAVE SESSION
          </button>
        </form>
      </div>
    </div>
  );
}
