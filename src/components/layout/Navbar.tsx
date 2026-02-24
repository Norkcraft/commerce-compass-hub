import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ijmbRoutes } from "@/data/ijmbRoutes";

const topLinks = [
  { label: "Home", path: "/" },
  ...ijmbRoutes
    .filter((route) => route.label !== "Registration Info")
    .map((route) => ({ label: route.label, path: route.path })),
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="border-b bg-[#0f766e] py-2 text-white">
        <div className="container mx-auto flex items-center justify-between gap-3 px-4 text-[11px] sm:text-xs md:text-sm">
          <p className="font-medium">Official IJMB Registration & Information Portal</p>
          <div className="hidden items-center gap-2 sm:flex">
            <Link to="/ijmb-registration-2026-27" className="rounded-md bg-white px-3 py-1 font-semibold text-[#0f766e] transition hover:bg-emerald-50">Register Now</Link>
            <Link to="/portal-login" className="rounded-md border border-white/80 px-3 py-1 font-semibold transition hover:bg-white/10">Login</Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img
            src="https://ijmb.ng/wp-content/uploads/2023/01/LEARNPLUS_09-removebg-preview.png"
            alt="IJMB logo"
            className="h-10 w-auto sm:h-12"
          />
          <span className="text-xl font-extrabold tracking-tight text-emerald-900 sm:text-2xl">ijmb.ng</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/ijmb-registration-2026-27"
            className="hidden animate-glow rounded-md bg-emerald-700 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-emerald-800 md:inline-flex"
          >
            Register For IJMB
          </Link>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex items-center rounded-md border border-slate-200 p-2 text-slate-700 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="hidden border-y bg-white md:block">
        <div className="container mx-auto overflow-x-auto px-4 py-3">
          <nav className="flex min-w-max items-center gap-5 text-sm font-semibold text-slate-700">
            {topLinks.map((item) => (
              <Link key={item.label} to={item.path} className="whitespace-nowrap transition hover:text-emerald-700">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="container mx-auto px-4 py-4">
            <Link
              to="/ijmb-registration-2026-27"
              className="mb-4 inline-flex rounded-md bg-emerald-700 px-4 py-2 text-sm font-bold text-white"
              onClick={() => setMenuOpen(false)}
            >
              Register For IJMB
            </Link>
            <nav className="grid gap-2 text-sm font-semibold text-slate-700">
              {topLinks.map((item) => (
                <Link key={item.label} to={item.path} className="rounded px-2 py-2 hover:bg-emerald-50" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
