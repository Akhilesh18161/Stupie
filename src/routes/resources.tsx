import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { RESOURCES, SUBJECTS } from "@/lib/study-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/resources")({
  component: Resources,
});

function Resources() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const { addActivity } = useStore();

  const filters = ["All", ...SUBJECTS.map((s) => s.name)];
  const list = useMemo(
    () => RESOURCES.filter(
      (r) => (filter === "All" || r.subject === filter || r.subject === "All") &&
             r.title.toLowerCase().includes(query.toLowerCase())
    ),
    [filter, query]
  );

  const open = (r: (typeof RESOURCES)[number]) => {
    addActivity({
      icon: "download",
      accent: "english",
      title: `Resource accessed: ${r.title}`,
      meta: `RESOURCES • ${r.subject.toUpperCase()}`,
      status: r.type.toUpperCase(),
      statusColor: "english",
    });
    window.open(r.url, "_blank", "noreferrer");
  };

  return (
    <>
      <section className="mb-10">
        <p className="label-caps text-secondary mb-2">DIGITAL ARCHIVE</p>
        <h1 className="font-display text-[56px] md:text-[72px] font-extrabold leading-none tracking-tighter">RESOURCES.</h1>
      </section>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH RESOURCES..."
          className="flex-1 border-2 border-primary bg-surface px-4 py-3 label-caps outline-none"
        />
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-3 label-caps border-2 border-primary whitespace-nowrap ${filter === f ? "bg-primary text-primary-foreground" : "bg-card hover:bg-surface-container-low"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-sm border-2 border-primary bg-card divide-y divide-primary">
        {list.map((r) => (
          <div key={r.id} className="p-6 grid grid-cols-12 gap-4 items-center hover:bg-surface-container-low transition-colors">
            <span className="col-span-1 material-symbols-outlined text-3xl">description</span>
            <div className="col-span-11 md:col-span-7">
              <p className="font-bold">{r.title}</p>
              <p className="label-caps text-secondary mt-1">{r.subject} · {r.type} · {r.size}</p>
            </div>
            <div className="col-span-12 md:col-span-4 flex justify-end gap-3">
              <button onClick={() => open(r)} className="border-2 border-primary bg-primary text-primary-foreground px-4 py-2 label-caps hover:bg-card hover:text-primary transition-colors">
                OPEN
              </button>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="p-10 text-center label-caps text-secondary">NO RESULTS</div>
        )}
      </div>
    </>
  );
}
