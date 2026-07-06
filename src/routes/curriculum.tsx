import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SUBJECTS } from "@/lib/study-data";
import { accentClass, useStore } from "@/lib/store";

export const Route = createFileRoute("/curriculum")({
  component: Curriculum,
});

function Curriculum() {
  const [active, setActive] = useState<string>(SUBJECTS[0].id);
  const [query, setQuery] = useState("");
  const { addActivity } = useStore();
  const [units, setUnits] = useState(() =>
    Object.fromEntries(SUBJECTS.map((s) => [s.id, s.units.map((u) => u.done)]))
  );

  const subject = SUBJECTS.find((s) => s.id === active)!;
  const filtered = SUBJECTS.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));

  const toggle = (i: number) => {
    const next = { ...units, [active]: units[active].map((v, j) => (j === i ? !v : v)) };
    setUnits(next);
    if (!units[active][i]) {
      addActivity({
        icon: "task_alt",
        accent: subject.accent,
        title: `Marked complete: ${subject.units[i].title}`,
        meta: `${subject.name.toUpperCase()} • CURRICULUM`,
        status: "SUCCESS",
        statusColor: "english",
      });
    }
  };

  const done = units[active].filter(Boolean).length;
  const total = units[active].length;
  const pct = Math.round((done / total) * 100);

  return (
    <>
      <section className="mb-10">
        <p className="label-caps text-secondary mb-2">NEB · CLASS 12 · 2081 BS</p>
        <h1 className="font-display text-[56px] md:text-[72px] font-extrabold leading-none tracking-tighter">CURRICULUM.</h1>
      </section>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="FILTER SUBJECTS..."
        className="w-full md:w-80 mb-8 border-2 border-primary bg-surface px-4 py-3 label-caps outline-none"
      />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4 rounded-sm border-2 border-primary bg-card divide-y divide-primary">
          {filtered.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`w-full text-left p-5 flex items-center gap-4 transition-colors ${
                active === s.id ? "bg-primary text-primary-foreground" : "hover:bg-surface-container-low"
              }`}
            >
              <span className="material-symbols-outlined text-3xl">{s.icon}</span>
              <div className="flex-1">
                <p className="font-bold">{s.name}</p>
                <p className="mono-label opacity-70">{s.code}</p>
              </div>
              <span className="label-caps">{s.progress}%</span>
            </button>
          ))}
        </div>

        <div className="col-span-12 md:col-span-8 rounded-sm border-2 border-primary bg-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <p className="label-caps text-secondary">{subject.code}</p>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tighter mt-2">{subject.name.toUpperCase()}</h2>
            </div>
            <div className="text-right">
              <p className="label-caps text-secondary">UNITS COMPLETE</p>
              <p className="font-display text-4xl font-extrabold">{done}<span className="text-secondary text-2xl">/{total}</span></p>
            </div>
          </div>

          <div className="h-2 w-full bg-surface-container mb-8">
            <div className={`h-full ${accentClass(subject.accent, "bg")}`} style={{ width: `${pct}%` }} />
          </div>

          <ul className="divide-y divide-primary border-y border-primary">
            {subject.units.map((u, i) => {
              const complete = units[active][i];
              return (
                <li key={u.title} className="py-4 flex items-center gap-4">
                  <button
                    onClick={() => toggle(i)}
                    className={`w-6 h-6 border-2 border-primary flex items-center justify-center ${complete ? accentClass(subject.accent, "bg") : "bg-surface"}`}
                    aria-label="toggle"
                  >
                    {complete && <span className="material-symbols-outlined text-white text-base">check</span>}
                  </button>
                  <div className="flex-1">
                    <p className={`font-semibold ${complete ? "line-through text-secondary" : ""}`}>{u.title}</p>
                    <p className="mono-label text-secondary">UNIT {String(i + 1).padStart(2, "0")}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
