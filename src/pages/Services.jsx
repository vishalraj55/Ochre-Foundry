import { Link } from "react-router-dom";
import { Check, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import CTASection from "../components/CTASection.jsx";

const services = [
  {
    name: "Outpost Pod",
    crew: "2–4 crew",
    timeline: "8–11 sols",
    summary:
      "A single-shell habitat for short-duration research or survey teams. Everything you need to sleep, eat, and work under cover, nothing you don't.",
    features: [
      "One sintered shell, 62m² floor area",
      "Single airlock with EVA prep bay",
      "Life-support tie-in ports (crew supplies hardware)",
      "2.1m regolith shielding on the sun-facing wall",
      "Structural warranty: 6 Earth years",
    ],
  },
  {
    name: "Settlement Block",
    crew: "12–40 crew",
    timeline: "3–5 weeks",
    summary:
      "Interlinked pods around a shared core, built for crews who are staying. Includes the life-support hardware, not just the routing for it.",
    features: [
      "4–10 linked pods, shared pressurized core",
      "Dual redundant airlocks per pod cluster",
      "Full life-support hardware: air, water reclaim, power spine",
      "2.4m shielding average, thicker on exterior faces",
      "Structural warranty: 12 Earth years",
      "Quarterly seal inspection included",
    ],
    featured: true,
  },
  {
    name: "Colony Grid",
    crew: "200+ residents",
    timeline: "Staged, 6+ months",
    summary:
      "District-scale printing: internal roads, a shared power spine, and a build sequence that lets the colony keep growing after we leave.",
    features: [
      "Unlimited pod clusters on a shared grid plan",
      "Printed internal roadways and utility trenching",
      "Redundant power spine with load balancing",
      "Expansion blueprint for future print phases",
      "On-site gantry lease option for self-directed growth",
      "Structural warranty: 20 Earth years",
    ],
  },
];

export default function Services() {
  return (
    <>
      <section className="container-px pt-16 pb-14">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-3">Services</p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-titanium-300">
            One print process. Three scales of commitment.
          </h1>
          <p className="mt-5 text-titanium-500 leading-relaxed">
            Every tier runs through the same sintering gantry and the same
            structural standard. What changes is how much of your life-support
            stack we deliver, and how far the grid extends.
          </p>
        </Reveal>
      </section>

      <section className="container-px pb-24 grid lg:grid-cols-3 gap-6 items-start">
        {services.map((s, i) => (
          <Reveal
            key={s.name}
            delay={i * 0.08}
            className={`card p-8 flex flex-col h-full ${
              s.featured ? "border-rust-500/60 ring-1 ring-rust-500/30" : ""
            }`}
          >
            {s.featured && (
              <span className="eyebrow mb-4 text-rust-400">Most deployed</span>
            )}
            <h2 className="font-display text-2xl text-titanium-300">{s.name}</h2>
            <div className="mt-2 flex gap-4 font-mono text-xs uppercase tracking-wide text-titanium-500">
              <span>{s.crew}</span>
              <span className="text-basalt-600">/</span>
              <span>{s.timeline}</span>
            </div>
            <p className="mt-5 text-sm text-titanium-500 leading-relaxed">{s.summary}</p>
            <ul className="mt-6 space-y-3 flex-1">
              {s.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-titanium-400">
                  <Check size={15} className="mt-0.5 shrink-0 text-printline-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-ghost mt-8 justify-center">
              Discuss this tier <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        ))}
      </section>

      <section className="border-t border-basalt-700">
        <div className="container-px py-24 grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <SectionHeading
            eyebrow="Beyond the shell"
            title="What we don't print, we still route for."
          />
          <Reveal delay={0.1} className="text-titanium-500 leading-relaxed space-y-4">
            <p>
              Every tier leaves the gantry with conduit already run for power, air,
              and water lines, so your own hardware — or ours, from Settlement Block
              up — ties in without cutting into a finished wall.
            </p>
            <p>
              Interior fit-out, furniture, and lab equipment are outside our scope
              by design. We've found crews build those out faster themselves once
              the shell is sealed and pressure-holding.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
