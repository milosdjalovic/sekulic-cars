import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-4 pt-[72px] text-center">
        <h1 className="text-6xl font-bold text-accent">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Stranica nije pronađena</h2>
        <p className="mt-2 text-muted">
          Stranica koju tražite ne postoji ili je uklonjena.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-lg bg-accent px-6 py-3 font-semibold text-background transition-colors hover:bg-accent-hover"
        >
          Nazad na početnu
        </Link>
      </main>
      <Footer />
    </div>
  );
}
