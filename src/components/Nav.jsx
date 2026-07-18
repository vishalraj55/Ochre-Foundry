import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

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
      className="sticky top-0 z-50 transition-all duration-500 border-b"
      style={{
        background: scrolled 
          ? "rgba(26, 26, 26, 0.4)" 
          : "rgba(26, 26, 26, 0.2)",
        backdropFilter: "blur(20px)",
        borderColor: scrolled 
          ? "rgba(212, 175, 106, 0.2)" 
          : "rgba(212, 175, 106, 0.08)",
        boxShadow: scrolled 
          ? "0 8px 32px rgba(0, 0, 0, 0.15)" 
          : "0 4px 16px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="px-8 md:px-16 max-w-7xl mx-auto flex h-20 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group transition-opacity duration-300 hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          <div className="w-8 h-8 rounded-sm overflow-hidden" style={{ background: "#1a1a1a", border: "1px solid #d4af6a" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" className="w-full h-full">
              <rect width="32" height="32" rx="2" fill="none" />
              <path d="M8 24V12l8-4 8 4v12" stroke="#d4af6a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 24h16M12 24v-6h8v6" stroke="#d4af6a" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-light tracking-widest uppercase" style={{ color: "#f5f5f5" }}>
            Ochre <span style={{ color: "#d4af6a" }}>Foundry</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-12">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                "text-xs font-light uppercase tracking-widest transition-all duration-300 relative group"
              }
              style={({ isActive }) => ({
                color: isActive ? "#d4af6a" : "#a8a8a8",
              })}
            >
              {l.label}
              <span
                className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: "#d4af6a" }}
              />
            </NavLink>
          ))}

          <div className="w-px h-6" style={{ background: "rgba(212, 175, 106, 0.2)" }} />

          <Link
            to="/contact"
            className="px-8 py-2.5 text-xs font-light uppercase tracking-widest transition-all duration-300 rounded-sm group"
            style={{
              color: "#1a1a1a",
              background: "#d4af6a",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Request a quote
          </Link>
        </nav>

        <button
          className="md:hidden p-2 transition-all duration-300 rounded-sm"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          style={{
            color: "#d4af6a",
            background: open ? "rgba(212, 175, 106, 0.08)" : "transparent",
          }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden border-t"
          style={{
            background: "rgba(26, 26, 26, 0.35)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(212, 175, 106, 0.15)",
            boxShadow: "inset 0 1px 0 rgba(212, 175, 106, 0.1)",
          }}
        >
          <div className="px-8 py-8 flex flex-col gap-6">
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    "text-xs font-light uppercase tracking-widest transition-all duration-300 block"
                  }
                  style={({ isActive }) => ({
                    color: isActive ? "#d4af6a" : "#a8a8a8",
                  })}
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}

            <div className="h-px" style={{ background: "rgba(212, 175, 106, 0.2)" }} />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: links.length * 0.05 }}
            >
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block px-8 py-3 text-xs font-light uppercase tracking-widest transition-all duration-300 rounded-sm text-center w-full"
                style={{
                  color: "#1a1a1a",
                  background: "#d4af6a",
                }}
              >
                Request a quote
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </header>
  );
}