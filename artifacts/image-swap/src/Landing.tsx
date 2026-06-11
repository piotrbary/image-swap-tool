import { useRef, useState } from "react";
import { useLocation } from "wouter";

const STAR_PATH = "M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z";

const testimonials = [
  { quote: "Zestawiam wersje grafiki w sekundę i od razu wiem, która jest lepsza. Zero zbędnych kroków.", initials: "MK", chart: "1", name: "Marta K.", role: "Projektantka UI" },
  { quote: "Wczytuję dwa zrzuty ekranu, kopiuję strzałką i mam porównanie. Używam codziennie do QA.", initials: "TP", chart: "2", name: "Tomek P.", role: "Front-end developer" },
  { quote: "Nic nie instaluję, otwieram w przeglądarce i działa. Dokładnie tak proste, jak powinno być.", initials: "AW", chart: "4", name: "Ania W.", role: "Fotografka" },
];

const logos = ["Pixelary", "Studio Nórd", "Frontda", "Kowalski Foto", "DevHouse"];

function MiniPanel({ label, image, onPick }: { label: string; image: string | null; onPick: () => void }) {
  return (
    <div
      onClick={onPick}
      style={{
        flex: 1, maxWidth: 200, aspectRatio: "4/3", border: `2px ${image ? "solid" : "dashed"} hsl(var(--lp-border))`,
        borderRadius: 8, background: "hsl(var(--lp-card))", cursor: "pointer", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
        transition: "border-color .15s, box-shadow .15s",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "hsl(var(--lp-primary))")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = image ? "hsl(var(--lp-primary))" : "hsl(var(--lp-border))")}
    >
      {image ? (
        <img src={image} alt={label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "hsl(var(--lp-muted-fg))", padding: 8 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 32, height: 32, opacity: .5 }}>
            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
          </svg>
          <strong style={{ fontSize: 12, fontWeight: 500 }}>Wczytaj obraz</strong>
          <small style={{ fontSize: 11, opacity: .7 }}>Kliknij</small>
        </div>
      )}
      {image && (
        <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,.6)", color: "#fff", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 99, letterSpacing: ".04em", textTransform: "uppercase", pointerEvents: "none" }}>{label}</div>
      )}
    </div>
  );
}

function SwapBtn({ label, disabled, onClick, dir }: { label: string; disabled: boolean; onClick: () => void; dir: ">" | "<" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        width: 36, height: 36, borderRadius: "50%", border: "1px solid hsl(var(--lp-border))",
        background: hovered && !disabled ? "hsl(var(--lp-primary))" : "hsl(var(--lp-card))",
        color: hovered && !disabled ? "#fff" : "hsl(var(--lp-fg))",
        fontSize: "1.3rem", lineHeight: 1, cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: disabled ? .35 : 1, transition: "all .15s", transform: hovered && !disabled ? "scale(1.08)" : "scale(1)",
      }}
      title={label}
    >{dir}</button>
  );
}

export default function Landing() {
  const [, navigate] = useLocation();
  const [imgA, setImgA] = useState<string | null>(null);
  const [imgB, setImgB] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pickTarget = useRef<"a" | "b">("a");

  function pick(slot: "a" | "b") { pickTarget.current = slot; inputRef.current?.click(); }
  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { const src = ev.target?.result as string; pickTarget.current === "a" ? setImgA(src) : setImgB(src); };
    reader.readAsDataURL(file); e.target.value = "";
  }

  return (
    <div className="lp-root">
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onFile} />

      {/* NAV */}
      <nav className="lp-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "hsl(var(--lp-primary))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19H31"/><path d="M27 15L31 19L27 23"/><path d="M33 29H17"/><path d="M21 33L17 29L21 25"/>
            </svg>
          </div>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-.02em" }}>
            Image<span style={{ color: "hsl(var(--lp-primary))" }}> Swap</span>
          </span>
        </div>
        <div className="lp-nav-links">
          <a href="#opinie">Jak to działa</a>
          <a href="#opinie">Opinie</a>
          <button className="lp-btn lp-btn-primary lp-btn-sm" onClick={() => navigate("/app")}>Wypróbuj</button>
        </div>
      </nav>

      {/* HERO */}
      <div className="lp-hero">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 9999, background: "hsl(var(--lp-primary) / .10)", marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: 9999, background: "hsl(var(--lp-primary))", display: "block" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "hsl(var(--lp-primary))" }}>Działa w przeglądarce · bez rejestracji</span>
          </div>
          <h1 className="lp-h1">Porównuj obrazy<br />obok siebie.</h1>
          <p className="lp-body-lg" style={{ marginTop: 18, maxWidth: 480 }}>
            Wczytaj zdjęcie do dowolnego panelu i przenoś je między nimi jednym kliknięciem. Bez kont, bez instalacji — po prostu otwórz i porównaj.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
            <button className="lp-btn lp-btn-primary lp-btn-lg" onClick={() => navigate("/app")}>Wypróbuj teraz</button>
            <button className="lp-btn lp-btn-ghost lp-btn-lg" onClick={() => navigate("/app")}>Wczytaj drugi obraz</button>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <MiniPanel label="Obraz 1" image={imgA} onPick={() => pick("a")} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <SwapBtn label="Kopiuj →" disabled={!imgA} onClick={() => imgA && setImgB(imgA)} dir=">" />
              <div style={{ width: 1, height: 20, background: "hsl(var(--lp-border))" }} />
              <SwapBtn label="Kopiuj ←" disabled={!imgB} onClick={() => imgB && setImgA(imgB)} dir="<" />
            </div>
            <MiniPanel label="Obraz 2" image={imgB} onPick={() => pick("b")} />
          </div>
          <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px dashed hsl(var(--lp-border))" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <span className="lp-badge">Wkrótce</span>
              <button className="lp-btn lp-btn-outline lp-btn-sm">✨ Ulepsz z AI</button>
              <button className="lp-btn lp-btn-outline lp-btn-sm">Usuń tło</button>
              <div style={{ width: 1, height: 18, background: "hsl(var(--lp-border))" }} />
              <button className="lp-btn lp-btn-outline lp-btn-sm">Zapisz</button>
              <button className="lp-btn lp-btn-outline lp-btn-sm">Wczytaj</button>
            </div>
            <p style={{ fontSize: 11, fontWeight: 500, color: "hsl(var(--lp-muted-fg))", marginTop: 10 }}>
              Te akcje podepniemy później — transformacje AI oraz zapis i wczytywanie projektu.
            </p>
          </div>
        </div>
      </div>

      {/* SOCIAL PROOF */}
      <section id="opinie" style={{ background: "hsl(var(--lp-card))", borderTop: "1px solid hsl(var(--lp-border))", padding: "56px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ paddingBottom: 32, borderBottom: "1px solid hsl(var(--lp-border))", textAlign: "center" }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "hsl(var(--lp-muted-fg))", marginBottom: 16 }}>Używane w codziennej pracy zespołów produktowych</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 44, flexWrap: "wrap", opacity: .5 }}>
              {logos.map(l => <span key={l} style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-.02em" }}>{l}</span>)}
            </div>
          </div>
          <div style={{ paddingTop: 52 }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-.02em", margin: 0 }}>Prosto, szybko, bez tarcia</h2>
              <p className="lp-body-lg" style={{ marginTop: 12, maxWidth: 520, margin: "12px auto 0" }}>
                Tak o pracy z obrazami mówią osoby, które korzystają z Image Swap na co dzień.
              </p>
            </div>
            <div className="lp-testimonials">
              {testimonials.map(t => (
                <div key={t.initials} style={{ background: "hsl(var(--lp-card))", border: "1px solid hsl(var(--lp-border))", borderRadius: 14, boxShadow: "0 1px 3px rgba(0,0,0,.08)", padding: 28 }}>
                  <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="hsl(30 90% 50%)" stroke="none"><path d={STAR_PATH} /></svg>
                    ))}
                  </div>
                  <p style={{ fontSize: "1rem", lineHeight: 1.6, margin: 0 }}>„{t.quote}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: `hsl(var(--lp-chart-${t.chart}) / .15)`, color: `hsl(var(--lp-chart-${t.chart}))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>{t.initials}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "hsl(var(--lp-muted-fg))" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <footer style={{ background: "hsl(var(--lp-primary))", padding: "64px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-.02em", margin: 0, color: "#fff" }}>Gotowy, żeby porównać swoje obrazy?</h2>
          <p style={{ fontSize: "1.125rem", color: "rgba(255,255,255,.85)", margin: "14px auto 0", maxWidth: 520 }}>Otwórz Image Swap i wczytaj pierwszy obraz — zajmie Ci to mniej niż minutę.</p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
            <button className="lp-btn lp-btn-secondary lp-btn-lg" onClick={() => navigate("/app")}>Wypróbuj teraz</button>
            <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,.8)" }}>Działa w przeglądarce · bez rejestracji</span>
          </div>
        </div>
      </footer>

      {/* FOOTER LINKS */}
      <div style={{ padding: "24px 32px", borderTop: "1px solid hsl(var(--lp-primary) / .15)", background: "hsl(var(--lp-primary) / .04)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", maxWidth: 1280, margin: "0 auto" }}>
          <span style={{ fontSize: "0.875rem", color: "hsl(var(--lp-muted-fg))" }}>© 2026 Image Swap</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Prywatność", "GitHub", "Kontakt"].map(l => <a key={l} href="#" style={{ fontSize: "0.875rem", color: "hsl(var(--lp-muted-fg))", textDecoration: "none" }}>{l}</a>)}
          </div>
        </div>
      </div>
    </div>
  );
}
