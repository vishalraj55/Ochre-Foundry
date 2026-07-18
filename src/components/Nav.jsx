import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-basalt-950/85 backdrop-blur-md border-b border-basalt-700" : "bg-transparent"
      }`}
    >
      <div className="container-px flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <svg width="22" height="22" viewBox="0 0 32 32" className="shrink-0">
            <rect width="32" height="32" rx="6" fill="#1C1F27" />
            <path d="M8 24V12l8-4 8 4v12" stroke="#B33F23" strokeWidth="2" fill="none" />
            <path d="M8 24h16M12 24v-6h8v6" stroke="#7FE7E0" strokeWidth="1.6" fill="none" />
          </svg>
          <span className="font-display text-base font-medium tracking-tight text-titanium-300">
            OCHRE <span className="text-rust-400">FOUNDRY</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-mono text-[13px] uppercase tracking-[0.06em] transition-colors ${
                  isActive ? "text-printline-400" : "text-titanium-400 hover:text-titanium-300"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-primary">
            Request a quote
          </Link>
        </nav>

        <button
          className="md:hidden text-titanium-300"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-basalt-700 bg-basalt-950 container-px py-4 flex flex-col gap-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `font-mono text-sm uppercase tracking-[0.06em] ${
                  isActive ? "text-printline-400" : "text-titanium-400"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-primary w-fit" onClick={() => setOpen(false)}>
            Request a quote
          </Link>
        </div>
      )}
    </header>
  );
}
