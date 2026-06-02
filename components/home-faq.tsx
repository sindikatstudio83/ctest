"use client";

import { useState } from "react";

const FAQS = [
  { q: "Kako da kreiram nalog?", a: "Klikni na 'Registracija' u gornjem desnom uglu, popuni podatke i potvrdi e-mail adresu da bi započeo." },
  { q: "Da li je korišćenje besplatno?", a: "Pretraga oglasa i prijava na posao su besplatni za kandidate. Firme imaju pakete za objavu oglasa i dodatne opcije." },
  { q: "Kako da ažuriram profil?", a: "Prijavi se, otvori svoj profil i izmijeni biografiju, podatke i preference u svakom trenutku." },
  { q: "Mogu li se prijaviti na više poslova?", a: "Da, možeš se prijaviti na neograničen broj oglasa i pratiti status svake prijave sa svog profila." },
  { q: "Kako funkcionišu brzi poslovi?", a: "Napravi brzi profil sa svojim uslugama (konobar, moler, hostesa…) da te firme i ljudi mogu kontaktirati za kratke angažmane." },
  { q: "Kako firma objavljuje oglas?", a: "Registruj firmu, kreiraj profil firme i nakon odobrenja možeš objaviti oglas i primati prijave." },
];

export function HomeFaq() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="rd-faq-layout">
      <div className="rd-faq-left">🤔</div>
      <div>
        {FAQS.map((f, i) => (
          <div className={`rd-faq-item${open === i ? " open" : ""}`} key={i}>
            <button className="rd-faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              {f.q}
              <span className="rd-faq-chevron">▾</span>
            </button>
            {open === i && <div className="rd-faq-a">{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
