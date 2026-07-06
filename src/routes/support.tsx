import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/support")({
  component: Support,
});

const FAQ = [
  { q: "What is NEB and which grades does STUDY.NP cover?", a: "The National Examinations Board (NEB) conducts Grade 11 and Grade 12 (+2) examinations in Nepal. STUDY.NP tracks the full NEB syllabus for Science, Management, and Humanities streams." },
  { q: "How do I log a study session?", a: "Go to the Dashboard and click LOG SESSION. Choose a subject, duration, and optional topic — it appears in your Archives immediately." },
  { q: "Where do the resources come from?", a: "Resources link to official NEB, government, and open-source academic archives. STUDY.NP does not host the files itself." },
  { q: "Is my data private?", a: "All activity is stored locally in your browser. Nothing leaves your device." },
  { q: "Can I use STUDY.NP offline?", a: "Yes — once loaded, the portal works offline. Session logs sync back to your browser storage." },
];

function Support() {
  const [open, setOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="mb-10">
        <p className="label-caps text-secondary mb-2">HELP CENTER</p>
        <h1 className="font-display text-[56px] md:text-[72px] font-extrabold leading-none tracking-tighter">SUPPORT.</h1>
      </section>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 rounded-sm border-2 border-primary bg-card divide-y divide-primary">
          {FAQ.map((f, i) => (
            <div key={f.q}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left p-6 flex justify-between items-center hover:bg-surface-container-low transition-colors">
                <span className="font-bold pr-4">{f.q}</span>
                <span className="material-symbols-outlined">{open === i ? "remove" : "add"}</span>
              </button>
              {open === i && <div className="px-6 pb-6 text-secondary">{f.a}</div>}
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); (e.target as HTMLFormElement).reset(); }}
          className="col-span-12 lg:col-span-4 border-2 border-primary bg-surface-container-low p-6 md:p-8 space-y-4 h-fit"
        >
          <p className="label-caps text-secondary">CONTACT</p>
          <h3 className="text-2xl font-bold tracking-tight">Ask a question</h3>
          <input required placeholder="YOUR NAME" className="w-full border-2 border-primary bg-surface px-4 py-3 label-caps outline-none" />
          <input required type="email" placeholder="EMAIL" className="w-full border-2 border-primary bg-surface px-4 py-3 label-caps outline-none" />
          <textarea required rows={4} placeholder="MESSAGE" className="w-full border-2 border-primary bg-surface px-4 py-3 outline-none" />
          <button className="w-full bg-primary text-primary-foreground py-4 label-caps border-2 border-primary hover:bg-card hover:text-primary transition-colors active:scale-95">
            {sent ? "SENT ✓" : "SUBMIT"}
          </button>
        </form>
      </div>
    </>
  );
}
