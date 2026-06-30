---
title: "Omnilister AI — Raport architektoniczny (sumaryczny)"
created: 2026-06-30
author: Claude (claude-opus-4-8)
inputs:
  - piotrbary/10x-Omnilister-AI : context/map/repo-map.md
  - piotrbary/10x-Omnilister-AI : context/changes/ux-redesign-analysis/research.md
  - piotrbary/10x-Omnilister-AI : context/changes/refactor-opportunities/plan.md
  - piotrbary/10x-Omnilister-AI : context/domain/{01,02,03}.md
verification: porównanie artefaktów (branch UX_REDESIGN) z aktualnym kodem `main` (HEAD 6d13945, 2026-06-30)
---

# Raport architektoniczny — Omnilister AI

> Zasada: każde twierdzenie strukturalne pochodzi z wymienionego artefaktu lub z weryfikacji aktualnego kodu (oznaczone „kod `main`"). Gdy artefaktu brak — napisano wprost „BRAK artefaktu".

## 1. Opisane projekty

Wszystkie cztery wejścia pochodzą z **jednego** repozytorium — nie ma rozjazdu między projektami (potwierdzone nagłówkami `repository:` w każdym artefakcie).

| Repo | Stack | Skala (orientacyjnie) | Przy którym artefakcie |
|---|---|---|---|
| **piotrbary/10x-Omnilister-AI** | Astro 6.3 + React 19 (islands), API routes Astro, Cloudflare Workers, Supabase (PostgreSQL + Storage), AI przez OpenRouter (Gemini 2.5 Flash Image, GPT‑4o) | ~19 modułów API, ~31 komponentów, 12 przepływów produktowych; single‑contributor (bus factor = 1) | wszystkie 4 wejścia (repo‑map, research, plan refaktoru, 3× domena) |

Raport jest commitowany do **piotrbary/image-swap-tool** (`context/architect-report.md`, branch `claude/omnilister-ai-architecture-wntzlk`) — to repo‑host dokumentu, nie źródło artefaktów. *(BRAK artefaktu UX/wizualnego „research.md" — mimo nazwy `ux-redesign-analysis`, artefakt dotyczy przepływów Supabase/API, nie designu UI.)*

## 2. Mapa projektu (repo-map.md)

- **Lokalne centra pracy:** `src/lib` (21 edycji/12 mies.) i `src/components/editor` (19 edycji) — tu skupia się logika AI i UI edytora; reszta peryferii stabilna.
- **Strefy ryzyka (graf dep-cruiser):** `config.ts` fan‑in=15, `supabase.ts` fan‑in=18 (brak warstwy serwisowej), `EditorShell.tsx` fan‑out=9, `middleware.ts` 77 distinct git‑partnerów.
- **Entry pointy (pierwszy dzień):** `config.ts` → `middleware.ts` → `supabase.ts` → `start.ts`/`guest.ts` → `transformation-processor.ts` → `EditorShell.tsx`.
- **Najważniejszy unknown:** pliki `.astro` poza skanem dep-cruiser — powiązania stron Astro ↔ komponenty React są `unknown`; cykli importów: **0**.
- **Pułapka:** `database.generated.ts` regenerowany (4×) przez CLI — co‑change w git to artefakt narzędzia, nie świadoma edycja.

## 3. Analiza ficzera (research.md)

- **Badany przepływ i dlaczego:** zapis/odczyt Supabase + wywołania API + OpenRouter — to dokładnie strefy ryzyka #2–#4 z mapy (`config.ts`, `supabase.ts`, AI pipeline z osobną ścieżką `guest.ts`).
- **Overview:** input z `EditorShell` → API route (`start.ts` dla zalogowanych / `guest.ts` dla gości); stan zmienia się w Supabase (F‑2: **8 operacji DB + 2 Storage**) i przez triggery licznika storage; wraca tablica jobów `{result_url, score_after, status}`. `supabase.ts` to wspólny węzeł wszystkich 12 flow.
- **Technical debt (3 najważniejsze):**
  1. **Ślepa plamka `guest.ts`** — omija `transformation-processor`; `generateFull()` ma **dokładnie 2 callsite'y** (`transformation-processor.ts:81`, `guest.ts:44`) — *potwierdzone ast-grep (twierdzenie #1)*. Zmiana sygnatury aktualizowana zwykle tylko w procesorze → guest milcząco się rozjeżdża.
  2. **Luka testowa:** pokrycie **<5%**, żadna z **17 tras API** nietestowana (research §Luki).
  3. **Blast radius modeli AI:** runtime‑branching `supportsImageOutput` w `config.ts` zmienia ścieżkę wykonania, nie tylko UI — *potwierdzone ast-grep (#9)*; dodanie modelu do `TRANSFORMATION_MODELS` zmienia 1‑krok vs 2‑kroki.
- Ast-grep zweryfikował 20 twierdzeń: **17 potwierdzonych, 2 doprecyzowane, 1 obalone** (fan‑in `config.ts` to 21, nie 15 — snapshot dep-cruiser był nieaktualny).

## 4. Plan refaktoryzacji (plan.md) + stan vs aktualny kod

- **Co refaktoryzowane:** 3 niezależne, samodzielnie wdrażalne fazy. Docelowy kształt: realne metryki „Ocena przed" zamiast mocka, niezawodne usuwanie plików, trwale odświeżalne URL‑e wyników.
- **Czego świadomie NIE robimy:** warstwa serwisowa `supabase.ts` (C‑1), ekstrakcja hooków `EditorShell` (C‑4), usunięcie podwójnego ownership‑check (C‑6), pełny fix race condition (C‑7), SSIM/MSE i BRISQUE/NIQE — wszystkie wymagają pokrycia testami lub UI jako prerekwizytu.

| Faza | Jedna linijka | Weryfikacja |
|---|---|---|
| **C‑3** | `MOCK_SCORE_BEFORE` → on‑demand scoring (tani model, cache w `quality_scores`) | auto: lint+build; ręcznie: panel pokazuje realne dane |
| **C‑5** | `slice(-3)` URL → rekonstrukcja ścieżki z trusted values | auto: lint+build; ręcznie: delete usuwa plik z bucketu |
| **C‑8** | kolumna `result_storage_path` + endpoint `result-url` re‑signujący URL | auto: migracja+lint+build; ręcznie: obraz renderuje po wygaśnięciu |

**Stan artefaktów (branch UX_REDESIGN) vs kod `main` (HEAD 6d13945).** Artefakty powstały *przed* refaktorem i *przed* planem testów; UX_REDESIGN został zmergowany do `main`. Różnice (weryfikacja w kodzie):

| Pozycja artefaktu | Stan w artefakcie | Stan w `main` dziś |
|---|---|---|
| `MOCK_SCORE_BEFORE` (TD‑1, RU‑4) | bezwarunkowy w produkcji | **usunięty** ✅ |
| `slice(-3)` storage path (TD‑6, C‑5) | kruchy parsing URL | **naprawiony** ✅ |
| `result_storage_path` (C‑8) | brak kolumny, URL 24h | **dodany** (migracja `20260626135427`) ✅ |
| `previewModel` (C‑3) | plan: `google/gemini-2.0-flash-lite` | wdrożony jako **`openai/gpt-4o-mini`** ⚠️ (świadoma zmiana) |
| Testy | 2 pliki / 176 linii, 0 tras API | **dodano `tests/integration/`** (5 plików / 335 linii: auth gate, guest, photos‑ownership, quality‑scoring, smoke) + `context/foundation/test-plan.md` (risk‑map 7 ryzyk) ✅; unit ~115 linii |
| **I‑1 `score_after > score_before`** server‑side | tylko UI | **wciąż tylko UI** — `score-regression-guard` ma status `planned`, brak w `save.ts` ❌ |
| `PROTECTED_ROUTES` | `/app/editor` niechroniony | **bez zmian** — `["/dashboard","/objects"]` ❌ |

## 5. Domena wg DDD (domain/*.md)

- **Ubiquitous language (kluczowe):** Obiekt (galeria ≤10 zdjęć), Quality Score (8 wymiarów × 0–10 + overall + `is_sales_ready`), Sales Readiness (próg overall ≥ 7), Transformacja (job AI: zdjęcie+prompt → nowe zdjęcie), Guardrail no‑distortion (prompt nie dodaje nieistniejących cech). 18‑pojęciowy słownik; 9 subdomen (3 Core / 3 Supporting / 3 Generic).
- **Najważniejsze rozjazdy model‑vs‑kod:** D‑1 „score po > przed" nieegzekwowany; D‑4 „draft < 5 s" — `draftPreviewTimeoutMs=5000` to martwy config (brak dwufazowego pipeline'u); D‑7 brak moderacji globalnych stylów (pole `is_reported` bez obsługi).
- **Niezmiennik #1 i agregat:** **I‑1 — `score_after.overall > score_before.overall`**, należy do agregatu **A3 — TransformationJob** (wiersz `transformations` + orchestracja w `transformation-processor.ts`). Jedyny strażnik to checkbox w `TransformationSession.tsx:88–93` (UI) — klient pilnuje rdzeniowej reguły (antypattern). **Wciąż aktualne w `main`** (patrz §4).
- **Anti-Corruption Layer:** przeciekająca zależność **A — `SupabaseClient<Database>`** (`@supabase/supabase-js`) w sygnaturach **4 funkcji domenowych** w `src/lib/`; przecieka przez **3 warstwy** (infra Supabase → serwis domenowy `lib/` → API route `pages/api/`). Skutek: `analyzeObject`/`processTransformationBatch` nietestowalne bez prawdziwego Supabase. Zależność B (nazwy kolumn duplikowane) jest objawem A.

## 6. Decyzje, które należą do Ciebie (właściciela)

Claude (ten raport + artefakty) podpowiedziało: refaktor C‑3/C‑5/C‑8 jako pierwszy, bo tani i bez prerekwizytów — i to zostało **wdrożone**. Rozstrzygnięcia, które pozostają po Twojej stronie, bo zależą od intencji produktu, nie od kodu: **(1)** czy egzekwować I‑1 (`score-regression-guard`) jako twardy 409 czy miękki warning z override — wybór UX vs poprawność (dziś tylko zaplanowane). **(2)** Czy `/app/editor` ma być chroniony, czy celowo dostępny w trybie guest (open question #1 z research). **(3)** Czy `previewModel = gpt-4o-mini` (odejście od planowanego Gemini) jest docelowe pod kątem kosztu/jakości scoringu. **(4)** Priorytet ACL (rozbicie `SupabaseClient` na adapter) względem dalszego rozwoju ficzerów — to większy refaktor świadomie odłożony. **(5)** Czy martwy NFR „draft < 5 s" (D‑4) zostaje obietnicą produktu, czy wypada z PRD.
