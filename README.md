# Sekulić Cars

Premium web aplikacija za auto salon — javni sajt za pregled vozila i privatni admin panel za upravljanje ponudom.

## Tehnologije

- **Next.js 15** (App Router, React 19)
- **Supabase** (PostgreSQL baza, autentifikacija, storage za slike)
- **Tailwind CSS 4** (tamna premium tema)
- **TypeScript**

## Struktura projekta

```
src/
├── app/
│   ├── (public)/          # Javne stranice (početna, ponuda, kontakt, detalji vozila)
│   ├── admin/             # Admin panel (zaštićen login-om)
│   ├── layout.tsx         # Root layout
│   ├── sitemap.ts         # SEO sitemap
│   └── robots.ts          # SEO robots
├── components/            # UI komponente
├── lib/                   # Supabase klijenti, helper funkcije
└── types/                 # TypeScript tipovi
supabase/
└── schema.sql             # SQL šema baze podataka
```

---

## 1. Pokretanje projekta lokalno

### Preduslov

Instalirajte [Node.js](https://nodejs.org/) (verzija 18 ili novija).

### Koraci

```bash
# 1. Instalirajte zavisnosti
npm install

# 2. Kopirajte primer env fajla
copy .env.example .env.local

# 3. Popunite .env.local sa Supabase vrednostima (vidi sekciju 2)

# 4. Pokrenite development server
npm run dev
```

Otvorite [http://localhost:3000](http://localhost:3000) u browseru.

---

## 2. Podešavanje Supabase baze

### Kreiranje projekta

1. Idite na [supabase.com](https://supabase.com) i napravite besplatan nalog
2. Kliknite **New Project** i kreirajte projekat (npr. `sekulic-cars`)
3. Sačekajte da se projekat kreira (~2 minuta)

### SQL šema

1. U Supabase Dashboard idite na **SQL Editor**
2. Otvorite fajl `supabase/schema.sql` iz ovog projekta
3. Kopirajte ceo sadržaj i pokrenite ga u SQL Editoru
4. Ovo kreira tabele `vehicles` i `vehicle_images`, storage bucket, i sigurnosne politike

### Env varijable

U Supabase Dashboard > **Project Settings** > **API**, kopirajte:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Dodajte ih u `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PHONE=+38268080898
NEXT_PUBLIC_VIBER=+38268080898
NEXT_PUBLIC_INSTAGRAM=https://www.instagram.com/sekulic__cars/
NEXT_PUBLIC_INSTAGRAM_HANDLE=@sekulic__cars
NEXT_PUBLIC_MAPS_URL=https://maps.app.goo.gl/EYatL4tkVTZuQxB7A
NEXT_PUBLIC_LOCATION_LABEL=Nedakusi, Bijelo Polje
```

---

## 3. Kreiranje prvog admin naloga

Admin nalog se kreira u Supabase Dashboard-u (ne kroz sajt):

1. Idite na **Authentication** > **Users**
2. Kliknite **Add user** > **Create new user** (ne „Invite user“)
3. Unesite email i lozinku (npr. `admin@sekulic-cars.rs`)
4. **Obavezno** označite **Auto Confirm User**
5. Potvrdite kreiranje

Sada se možete prijaviti na [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

> **Napomena:** Samo korisnici kreirani u Supabase Auth mogu pristupiti admin panelu. Obični posetioci nemaju pristup.

### Rešavanje problema sa prijavom

| Problem | Rešenje |
|---------|---------|
| „Pogrešan email ili lozinka“ | Proverite email/lozinku. Korisnik mora biti kreiran sa **Create new user**, ne Invite. |
| „Email nije potvrđen“ | U Users kliknite korisnika → Confirm email, ili isključite **Confirm email** u Authentication → Providers → Email |
| Prijava uspe, ali vraća na login | Restartujte `npm run dev` nakon izmene `.env.local` |
| Env greška | Proverite da `.env.local` sadrži prave vrednosti iz Supabase → Settings → API |

---

## 4. Dodavanje vozila (za vlasnika)

1. Prijavite se na `/admin/login`
2. Kliknite **+ Dodaj vozilo**
3. Popunite informacije (marka, model, godište, kilometraža, cena, itd.)
4. Dodajte fotografije (kliknite **+ Dodaj** i izaberite slike)
5. Opciono: označite **Istakni na početnoj stranici**
6. Kliknite **Dodaj vozilo**

### Upravljanje postojećim vozilima

- **Uredi** — izmena podataka, cene, fotografija
- **Označi kao prodato** — vozilo se skriva sa javne ponude
- **Obriši vozilo** — trajno brisanje

---

## 5. Deploy online (besplatno)

Preporučujemo **Vercel** (besplatan plan, odličan za Next.js):

### Koraci

1. Napravite GitHub repozitorijum i push-ujte kod:

```bash
git init
git add .
git commit -m "Initial commit: Sekulić Cars"
git remote add origin https://github.com/VAS-USERNAME/sekulic-cars.git
git push -u origin main
```

2. Idite na [vercel.com](https://vercel.com) i prijavite se sa GitHub nalogom
3. Kliknite **Add New Project** i izaberite repozitorijum
4. U **Environment Variables** dodajte sve varijable iz `.env.local`
5. Promenite `NEXT_PUBLIC_SITE_URL` na vaš Vercel URL (npr. `https://sekulic-cars.vercel.app`)
6. Kliknite **Deploy**

Sajt će biti dostupan na `https://sekulic-cars.vercel.app` (ili slično).

---

## 6. Povezivanje custom domena

1. Kupite domen (npr. `sekulic-cars.rs` na [rnids.rs](https://www.rnids.rs/) ili bilo kom registraru)
2. U Vercel Dashboard > **Settings** > **Domains**
3. Dodajte domen (npr. `sekulic-cars.rs` i `www.sekulic-cars.rs`)
4. Vercel će vam dati DNS zapise — dodajte ih kod vašeg registrara domena:
   - **A record**: `76.76.21.21`
   - **CNAME** za www: `cname.vercel-dns.com`
5. Sačekajte propagaciju DNS-a (do 48h, obično brže)
6. Ažurirajte `NEXT_PUBLIC_SITE_URL` u Vercel env varijablama

---

## 7. Vidljivost na Google-u (besplatno)

### Google Search Console

1. Idite na [search.google.com/search-console](https://search.google.com/search-console)
2. Dodajte sajt (URL prefix sa vašim domenom)
3. Verifikujte vlasništvo (DNS zapis ili HTML tag)
4. Pošaljite sitemap: `https://vas-domen.rs/sitemap.xml`

### Google Business Profile

1. Idite na [business.google.com](https://business.google.com)
2. Kreirajte profil za "Sekulić Cars"
3. Dodajte adresu, telefon, radno vreme, link ka sajtu
4. Dodajte fotografije vozila i salona

### Instagram

- U bio profilu dodajte link ka sajtu
- Koristite isti link u story-jevima i objavama

### Osnovni SEO (već uključen)

- Automatski `sitemap.xml` sa svim vozilima
- `robots.txt` (admin deo je blokiran)
- Meta tagovi na svakoj stranici
- Open Graph tagovi za deljenje na društvenim mrežama

---

## Stranice

| Stranica | URL | Opis |
|----------|-----|------|
| Početna | `/` | Hero sekcija, istaknuta vozila, CTA |
| Ponuda | `/ponuda` | Sva dostupna vozila |
| Detalji vozila | `/vozilo/[id]` | Galerija, specifikacije, kontakt |
| Kontakt | `/kontakt` | Telefon, Viber, WhatsApp, Instagram |
| Admin login | `/admin/login` | Prijava za vlasnika |
| Admin panel | `/admin` | Upravljanje vozilima |

---

## Licenca

Privatni projekat — Sekulić Cars.
