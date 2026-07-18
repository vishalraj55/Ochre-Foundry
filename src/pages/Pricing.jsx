import { Link } from "react-router-dom";
import { Check, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import FAQ from "../components/FAQ.jsx";
import CTASection from "../components/CTASection.jsx";

const plans = [
  {
    name: "Outpost Pod",
    price: "184,000",
    unit: "per pod",
    desc: "Fixed-scope print for a single shell, quoted flat once your site survey is in.",
    features: [
      "Site survey & print simulation",
      "62m² sintered shell, single airlock",
      "Conduit routing, no hardware included",
      "9-sol average delivery",
      "6-year structural warranty",
    ],
  },
  {
    name: "Settlement Block",
    price: "1.1M",
    unit: "starting, per cluster",
    desc: "Scoped per cluster size at survey time. Includes full life-support hardware.",
    features: [
      "Everything in Outpost Pod",
      "4–10 linked pods, shared core",
      "Full life-support hardware installed",
      "Quarterly seal inspection, year one included",
      "12-year structural warranty",
      "Priority gantry scheduling",
    ],
    featured: true,
  },
  {
    name: "Colony Grid",
    price: "Custom",
    unit: "staged contract",
    desc: "Priced per phase against your expansion blueprint. No two grids are quoted the same.",
    features: [
      "Everything in Settlement Block",
      "District roads & power spine",
      "Multi-phase print scheduling",
      "Optional gantry lease for self-build phases",
      "20-year structural warranty",
      "Dedicated engineering liaison",
    ],
  },
];

const billingFaqs = [
  {
    q: "What currency are quotes issued in?",
    a: "We quote in Earth-launch equivalent credits, settled against your organization's existing supply contract. Most research and mining consortia already have a settlement path through their home agency.",
  },
  {
    q: "Is the site survey included in the price?",
    a: "Yes, for Outpost Pod and Settlement Block. Colony Grid surveys are billed separately since they typically cover a much larger footprint and feed directly into the phased contract.",
  },
  {
    q: "What's not covered by the structural warranty?",
    a: "The warranty covers the printed shell and shielding against structural failure. Interior fit-out, third-party hardware, and damage from undeclared seismic activity outside our site survey's modeled range fall outside it.",
  },
  {
    q: "Can we finance a Colony Grid contract in phases?",
    a: "That's the default structure. Each phase is quoted and billed separately as the blueprint progresses, so you're never committing capital for print work that hasn't been scheduled yet.",
  },
];

export default function Pricing() {
  return (
    <>
      <section className="container-px pt-16 pb-14">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-3">Pricing</p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-titanium-300">
            Priced by the survey, not the guess.
          </h1>
          <p className="mt-5 text-titanium-500 leading-relaxed">
            Every quote below is a starting point from past contracts at comparable
            sites. Your figure is finalized after we've mapped your specific
            regolith and radiation profile — usually within a week of survey.
          </p>
        </Reveal>
      </section>

      <section className="container-px pb-24 grid lg:grid-cols-3 gap-6 items-start">
        {plans.map((p, i) => (
          <Reveal
            key={p.name}
            delay={i * 0.08}
            className={`card p-8 flex flex-col h-full ${
              p.featured ? "border-rust-500/60 ring-1 ring-rust-500/30" : ""
            }`}
          >
            {p.featured && <span className="eyebrow mb-4 text-rust-400">Most deployed</span>}
            <h2 className="font-display text-2xl text-titanium-300">{p.name}</h2>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-3xl text-titanium-300">
                {p.price !== "Custom" && "₥"}{p.price}
              </span>
              <span className="font-mono text-xs uppercase tracking-wide text-titanium-500">
                {p.unit}
              </span>
            </div>
            <p className="mt-4 text-sm text-titanium-500 leading-relaxed">{p.desc}</p>
            <ul className="mt-6 space-y-3 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-titanium-400">
                  <Check size={15} className="mt-0.5 shrink-0 text-printline-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-primary mt-8 justify-center">
              Request a quote <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        ))}
      </section>

      <section className="border-t border-basalt-700">
        <div className="container-px py-24">
          <SectionHeading eyebrow="Billing" title="Common questions on cost." />
          <div className="mt-10">
            <FAQ items={billingFaqs} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
