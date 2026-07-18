import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-basalt-700 bg-basalt-900/50">
      <div className="grain-overlay" />
      <div className="container-px py-24 relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-3">Next launch window: Sol 118</p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-titanium-300">
            Ground breaks the day the printer lands.
          </h2>
          <p className="mt-5 text-titanium-500 leading-relaxed max-w-lg">
            Tell us your site coordinates and crew size. We'll return a pressurization
            timeline within one Earth week.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">
              Request a quote <ArrowUpRight size={16} />
            </Link>
            <Link to="/pricing" className="btn-ghost">
              See pricing tiers
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
