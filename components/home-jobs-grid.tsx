import Link from "next/link";
import type { JobWithPromotion } from "@/types/domain";

const ICONS = ["💼", "🖥️", "📈", "🎨", "🔧", "📊", "🧑‍💻", "📱", "🗂️"];

export function HomeJobsGrid({ jobs }: { jobs: JobWithPromotion[] }) {
  if (jobs.length === 0) {
    return (
      <div className="rd-jcard" style={{ padding: 32, textAlign: "center", gridColumn: "1 / -1" }}>
        <strong style={{ color: "var(--rd-dark)", fontSize: 16 }}>Trenutno nema aktivnih oglasa</strong>
        <p style={{ color: "var(--rd-muted)", marginTop: 8 }}>Novi oglasi se objavljuju svakodnevno.</p>
      </div>
    );
  }

  return (
    <div className="rd-jcards">
      {jobs.map((job, i) => {
        const url = `/oglasi/${job.slug}`;
        const co = job.companies?.name || "Poslodavac";
        const city = job.cities?.name;
        const type = job.contract_type;
        const sal = job.salary_text;
        const desc = (job.description ?? "").replace(/<[^>]*>/g, "").slice(0, 110);
        return (
          <Link href={url} key={job.id} className="rd-jcard">
            <div className="rd-jcard-img">{ICONS[i % ICONS.length]}</div>
            <div className="rd-jcard-body">
              <div className="rd-jcard-tags">
                {type && <span className="rd-jtag rd-jtag-main">{type}</span>}
                {job.categories?.name && <span className="rd-jtag rd-jtag-gray">{job.categories.name}</span>}
              </div>
              <span className="rd-jcard-title">{job.title}</span>
              <div className="rd-jcard-loc">🏢 {co}{city ? ` · ${city}` : ""}</div>
              {sal && <div className="rd-jcard-sal">{sal}</div>}
              {desc && <p className="rd-jcard-desc">{desc}…</p>}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
