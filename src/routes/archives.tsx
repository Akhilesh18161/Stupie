import { createFileRoute } from "@tanstack/react-router";
import { useStore, accentClass } from "@/lib/store";

export const Route = createFileRoute("/archives")({
  component: Archives,
});

function Archives() {
  const { activity, clear } = useStore();
  return (
    <>
      <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="label-caps text-secondary mb-2">FULL ACTIVITY LOG</p>
          <h1 className="font-display text-[56px] md:text-[72px] font-extrabold leading-none tracking-tighter">ARCHIVES.</h1>
        </div>
        <button onClick={() => { if (confirm("Clear all activity?")) clear(); }} className="border-2 border-primary bg-card px-6 py-3 label-caps hover:bg-primary hover:text-primary-foreground transition-colors">
          CLEAR ALL
        </button>
      </section>

      <div className="rounded-sm border-2 border-primary bg-card divide-y divide-primary">
        {activity.length === 0 && (
          <div className="p-10 text-center label-caps text-secondary">NO ACTIVITY YET — LOG A SESSION FROM THE DASHBOARD</div>
        )}
        {activity.map((a) => (
          <div key={a.id} className="p-6 grid grid-cols-12 gap-4 items-center">
            <span className={`col-span-1 material-symbols-outlined text-3xl ${accentClass(a.accent)}`}>{a.icon}</span>
            <div className="col-span-7 md:col-span-8">
              <p className="font-bold">{a.title}</p>
              <p className="label-caps text-secondary mt-1">{a.meta}</p>
            </div>
            <div className="col-span-4 md:col-span-3 text-right">
              <p className="mono-label">{a.date}</p>
              <p className={`label-caps mt-1 ${accentClass(a.statusColor ?? "")}`}>{a.status}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
