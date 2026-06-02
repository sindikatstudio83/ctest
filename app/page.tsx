import type { Metadata } from "next";
import Link from "next/link";
import { HomeJobsGrid } from "@/components/home-jobs-grid";
import { HomeFaq } from "@/components/home-faq";
import { getLookups, getHomepageData, getCompanies, getPopularTags } from "@/lib/queries/public";
import type { JobWithPromotion } from "@/types/domain";

export const metadata: Metadata = {
  title: "imaposla.me - Poslovi u Crnoj Gori",
  description: "Pronađi posao ili objavi oglas u Crnoj Gori. Kandidati, firme i oglasi na jednom mjestu.",
};

export const revalidate = 300;

const STEPS = [
  { n: 4, icon: "🤝", h: "Prijavi se ili zaposli", p: "Pošalji prijavu na posao koji ti odgovara, ili kao firma vodi kandidate kroz selekciju." },
  { n: 3, icon: "🔎", h: "Pronađi posao", p: "Pretraži oglase po gradu i kategoriji, ili pronađi radnika za kratak angažman." },
  { n: 2, icon: "✉️", h: "Verifikuj nalog", p: "Potvrdi e-mail kako bi osigurao bezbjednost naloga i prijava." },
  { n: 1, icon: "👤", h: "Kreiraj nalog", p: "Registracija je jednostavna — tvoje putovanje počinje u svega nekoliko koraka." },
];

const TESTIMONIALS = [
  { name: "Marko P.", role: "Konobar, Budva", body: "Napravio sam brzi profil i za par dana me pozvala firma za sezonski angažman. Brzo i bez komplikacija." },
  { name: "Ana R.", role: "HR, Podgorica", body: "Objavili smo oglas i dobili kvalitetne prijave. Selekcija na jednom mjestu nam je uštedjela dosta vremena." },
  { name: "Stefan M.", role: "Frontend Developer", body: "Pregledan sajt, lako se pretražuje. Prijavio sam se na nekoliko oglasa i pratio status prijava." },
];

export default async function HomePage() {
  const [homepageData, lookups, popularTags] = await Promise.all([
    getHomepageData(),
    getLookups(),
    getPopularTags(),
  ]);

  const { paidTopJobs, featuredJobs, regularJobs, recommendedCompanies } = homepageData;
  const fallbackCompaniesRaw = recommendedCompanies.length === 0 ? await getCompanies(8) : [];
  const fallbackCompanies = fallbackCompaniesRaw as unknown as typeof recommendedCompanies;

  const allJobs: JobWithPromotion[] = [...paidTopJobs, ...featuredJobs, ...regularJobs];
  const displayCompanies = recommendedCompanies.length > 0 ? recommendedCompanies : fallbackCompanies;
  void popularTags;

  const tickerItems = displayCompanies.length > 0
    ? displayCompanies.map(c => c.name)
    : ["Podgorica", "Bar", "Nikšić", "Budva", "Herceg Novi", "Bijelo Polje"];

  return (
    <div className="home-redesign">

      {/* HERO */}
      <section className="rd-hero">
        <div className="rd-hero-wrap">
          <div className="rd-hero-left">
            <h1 className="rd-hero-h1">Pronađi <strong>Posao Iz Snova</strong> Danas!</h1>
            <p className="rd-hero-sub">
              Istraži otvorene pozicije i pronađi uloge koje odgovaraju tvojim interesima i stručnosti.
              Od početnih do rukovodećih pozicija.
            </p>

            <form className="rd-hero-search" action="/oglasi">
              <input className="rd-hero-input" name="q" placeholder="Naziv posla ili firma..." aria-label="Naziv posla ili firma" />
              <select className="rd-hero-select" name="city" aria-label="Grad">
                <option value="">Odaberi grad</option>
                {lookups.cities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
              <select className="rd-hero-select" name="category" aria-label="Kategorija">
                <option value="">Kategorija</option>
                {lookups.categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
              <button className="rd-btn-search" type="submit">🔍 Pretraži</button>
            </form>

            <div className="rd-hero-stats">
              <div className="rd-h-stat">
                <div className="rd-h-stat-icon">💼</div>
                <strong>{allJobs.length > 0 ? allJobs.length : "—"}</strong>
                <span>Oglasi</span>
              </div>
              <div className="rd-h-stat">
                <div className="rd-h-stat-icon">👥</div>
                <strong>{displayCompanies.length > 0 ? displayCompanies.length : "—"}</strong>
                <span>Firme</span>
              </div>
              <div className="rd-h-stat">
                <div className="rd-h-stat-icon">⚡</div>
                <strong>Brzi</strong>
                <span>Angažmani</span>
              </div>
            </div>
          </div>

          <div className="rd-hero-right">
            <div className="rd-hero-img">
              <div className="rd-hero-person">🧑‍💼</div>
            </div>
            <div className="rd-hero-stamp">
              <div className="rd-stamp-circle"><div className="rd-stamp-inner" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="rd-ticker">
        <div className="rd-ticker-flex">
          <span className="rd-ticker-label">NA PLATFORMI</span>
          <div className="rd-ticker-track">
            <div className="rd-ticker-inner">
              {[...tickerItems, ...tickerItems].map((name, i) => (
                <span className="rd-ticker-item" key={i}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* INTENT / KATEGORIJE */}
      <section className="rd-section rd-sec-dark">
        <div className="rd-sec-wrap">
          <div className="rd-sec-head">
            <h2>Šta želiš <span>da uradiš?</span></h2>
            <p>Tri jednostavna puta — izaberi onaj koji ti treba.</p>
          </div>
          <div className="rd-cat-grid">
            <Link href="/oglasi" className="rd-cat-card">
              <div className="rd-cat-icon">🔍</div>
              <h4>Tražim posao</h4>
              <p>Pretraži oglase i prati prijave</p>
              <span className="rd-cat-read">Otvori oglase →</span>
            </Link>
            <Link href="/registracija?role=candidate&intent=worker" className="rd-cat-card">
              <div className="rd-cat-icon">⚡</div>
              <h4>Nudim usluge</h4>
              <p>Napravi profil za brze angažmane</p>
              <span className="rd-cat-read">Napravi profil →</span>
            </Link>
            <Link href="/registracija?role=company" className="rd-cat-card">
              <div className="rd-cat-icon">🏢</div>
              <h4>Zapošljavam</h4>
              <p>Objavi oglas ili nađi radnika</p>
              <span className="rd-cat-read">Kreni kao firma →</span>
            </Link>
            <Link href="/brzi-poslovi" className="rd-cat-card">
              <div className="rd-cat-icon">🚀</div>
              <h4>Brzi poslovi</h4>
              <p>Angažuj radnika odmah</p>
              <span className="rd-cat-read">Pogledaj →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* NAJNOVIJI OGLASI */}
      <section className="rd-section rd-sec-dark" style={{ paddingTop: 0 }}>
        <div className="rd-sec-wrap">
          <div className="rd-sec-head">
            <h2>Najnoviji <span>Oglasi</span></h2>
            <p>Prikazuju se samo oglasi koji su odobreni i aktivni.</p>
          </div>
          <HomeJobsGrid jobs={allJobs.slice(0, 6)} />
          <div className="rd-view-more">
            <Link className="rd-btn-big" href="/oglasi">Pogledaj sve oglase</Link>
          </div>
        </div>
      </section>

      {/* KAKO FUNKCIONISE */}
      <section className="rd-section rd-sec-mid">
        <div className="rd-sec-wrap">
          <div className="rd-sec-head">
            <h2>Kako <span>Funkcioniše?</span></h2>
            <p>Pronalaženje pravog posla je jednostavno i brzo. Prati nekoliko koraka.</p>
          </div>
          <div className="rd-hiw">
            <div className="rd-hiw-left">🧭</div>
            <div>
              {STEPS.map(s => (
                <div className="rd-hiw-step" key={s.n}>
                  <div className="rd-hiw-num">{s.n}</div>
                  <div className="rd-hiw-icon">{s.icon}</div>
                  <div className="rd-hiw-text"><h4>{s.h}</h4><p>{s.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIJALI */}
      <section className="rd-section rd-sec-dark">
        <div className="rd-sec-wrap">
          <div className="rd-sec-head">
            <h2>Priče o <span>Uspjehu</span></h2>
            <p>Kako su ljudi pronašli prave prilike kroz platformu.</p>
          </div>
          <div className="rd-test-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="rd-test-card" key={i}>
                <div className="rd-stars">★★★★★</div>
                <div className="rd-test-head">
                  <div className="rd-test-avatar">👤</div>
                  <div>
                    <div className="rd-test-name">{t.name}</div>
                    <div className="rd-test-role">{t.role}</div>
                  </div>
                </div>
                <p className="rd-test-body">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rd-section rd-sec-pale">
        <div className="rd-sec-wrap">
          <div className="rd-cta-box">
            <div>
              <h2 className="rd-cta-h">Pronađi Sledeći Posao iz <span>brojnih Oglasa</span></h2>
              <p className="rd-cta-p">Posvećeni smo pružanju kvalitetne usluge — registruj se i prati nove prilike.</p>
              <Link className="rd-btn-big" href="/oglasi">Pronađi posao</Link>
            </div>
            <div className="rd-cta-right">🧑‍💻</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="rd-section rd-sec-mid">
        <div className="rd-sec-wrap">
          <div className="rd-sec-head">
            <h2>Često Postavljana <span>Pitanja</span></h2>
          </div>
          <HomeFaq />
        </div>
      </section>

    </div>
  );
}
