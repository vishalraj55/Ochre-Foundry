import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="border-t transition-all duration-300"
      style={{
        background: "#1a1a1a",
        borderColor: "rgba(212, 175, 106, 0.15)",
      }}
    >
      <div className="px-8 md:px-16 max-w-7xl mx-auto py-20 grid gap-16 md:grid-cols-4">
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-light uppercase tracking-widest" style={{ color: "#f5f5f5" }}>
            Ochre <span style={{ color: "#d4af6a" }}>Foundry</span>
          </span>
          <p className="mt-6 max-w-sm text-xs font-light leading-relaxed" style={{ color: "#a8a8a8" }}>
            Additive habitat engineering, printed on-site from Martian regolith. Registered outpost: Elysium Planitia, Sector 9. Operating under IMSA Habitat Class III certification.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-xs uppercase tracking-widest font-light mb-6" style={{ color: "#d4af6a" }}>
            Company
          </p>
          <ul className="space-y-4 text-xs font-light" style={{ color: "#a8a8a8" }}>
            <li>
              <Link
                to="/about"
                className="transition-all duration-300 hover:opacity-100 opacity-80"
                style={{ color: "#a8a8a8" }}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="transition-all duration-300 hover:opacity-100 opacity-80"
                style={{ color: "#a8a8a8" }}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="transition-all duration-300 hover:opacity-100 opacity-80"
                style={{ color: "#a8a8a8" }}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="transition-all duration-300 hover:opacity-100 opacity-80"
                style={{ color: "#a8a8a8" }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-widest font-light mb-6" style={{ color: "#d4af6a" }}>
            Comms
          </p>
          <ul className="space-y-4 text-xs font-light" style={{ color: "#a8a8a8" }}>
            <li>relay@ochrefoundry.mars</li>
            <li>Earth-Mars channel: OF-9</li>
            <li>Signal lag notice applies</li>
          </ul>
        </motion.div>
      </div>

      <div
        className="border-t transition-all duration-300 px-8 md:px-16 max-w-7xl mx-auto py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-light"
        style={{
          borderColor: "rgba(212, 175, 106, 0.15)",
          color: "#808080",
        }}
      >
        <span>© {new Date().getFullYear()} OCHRE FOUNDRY — VISHAL RAJBHAR ❤️</span>
        <span style={{ color: "#d4af6a" }}>SOL-COMPLIANT · IMSA CLASS III</span>
      </div>
    </footer>
  );
}