import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-basalt-700 bg-basalt-900/40">
      <div className="container-px py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-display text-lg font-medium text-titanium-300">
            OCHRE <span className="text-rust-400">FOUNDRY</span>
          </span>
          <p className="mt-3 max-w-sm text-sm text-titanium-500">
            Additive habitat engineering, printed on-site from Martian regolith.
            Registered outpost: Elysium Planitia, Sector 9. Operating under IMSA
            Habitat Class III certification.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Company</p>
          <ul className="space-y-2 text-sm text-titanium-400">
            <li><Link to="/about" className="hover:text-printline-300">About</Link></li>
            <li><Link to="/services" className="hover:text-printline-300">Services</Link></li>
            <li><Link to="/pricing" className="hover:text-printline-300">Pricing</Link></li>
            <li><Link to="/contact" className="hover:text-printline-300">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Comms</p>
          <ul className="space-y-2 text-sm text-titanium-400">
            <li>relay@ochrefoundry.mars</li>
            <li>Earth-Mars channel: OF-9</li>
            <li>Signal lag notice applies</li>
          </ul>
        </div>
      </div>

      <div className="container-px border-t border-basalt-700 py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-titanium-500 font-mono">
        <span>© {new Date().getFullYear()} OCHRE FOUNDRY — ELYSIUM OPERATIONS</span>
        <span>SOL-COMPLIANT · IMSA CLASS III</span>
      </div>
    </footer>
  );
}
