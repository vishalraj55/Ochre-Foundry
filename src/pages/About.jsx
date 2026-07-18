import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import StatStrip from "../components/StatStrip.jsx";
import CTASection from "../components/CTASection.jsx";

const timeline = [
  { year: "2068", label: "Founded", body: "Three ex-JPL structural engineers start Ochre Foundry in a leased bay at Jezero Depot, testing sintering ratios on borrowed regolith samples." },
  { year: "2069", label: "First print", body: "Unit 01 completes at Jezero — a single Outpost Pod, printed in 14 sols. It's still standing, now used as our equipment archive." },
  { year: "2071", label: "Elysium relocation", body: "Operations move to Elysium Planitia for better regolith consistency and closer access to the growing research corridor." },
  { year: "2073", label: "Settlement Block launches", body: "First interlinked cluster ships to Hellas Research Station, adding full life-support hardware to our scope for the first time." },
  { year: "2075", label: "Colony Grid contract", body: "Arcadia Planitia commissions our first district-scale grid — roads, power spine, and a five-phase build sequence." },
];

const values = [
  {
    title: "The site decides the design",
    body: "We don't ship a standard shell and hope the ground cooperates. Every print starts from what your regolith and radiation profile actually allow.",
  },
  {
    title: "Pressure-tested before handoff",
    body: "We hold seal for 72 hours before anyone moves in. It costs us time on every contract. We've never shortened it.",
  },
  {
    title: "Built by people who've lived in one",
    body: "Half our field crew has spent a rotation inside a habitat they printed. Complaints from that rotation shape the next revision.",
  },
];

const stats = [
  { value: "37", label: "Habitats delivered" },
  { value: "7", label: "Years operating" },
  { value: "3", label: "Active print sites" },
  { value: "0", label: "Structural failures" },
];

export default function About() {
  return (
    <>
      <section className="container-px pt-16 pb-14">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-3">About</p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-titanium-300">
            We got tired of watching shells sit half-assembled.
          </h1>
          <p className="mt-5 text-titanium-500 leading-relaxed">
            Ochre Foundry started as a bet that the ground under a landing site was
            a better building material than anything we could afford to launch.
            Seven years and thirty-seven habitats later, it's still the bet we're
            making.
          </p>
        </Reveal>
      </section>

      <StatStrip stats={stats} />

      <section className="container-px py-24">
        <SectionHeading eyebrow="What we hold to" title="Three things that don't change per contract." />
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <h3 className="font-display text-xl text-titanium-300">{v.title}</h3>
              <p className="mt-3 text-sm text-titanium-500 leading-relaxed">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-basalt-700 bg-basalt-900/40">
        <div className="container-px py-24">
          <SectionHeading eyebrow="Since 2068" title="How we got from one borrowed bay to three print sites." />
          <div className="mt-14 space-y-0">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <div className="grid md:grid-cols-[110px_1fr] gap-4 md:gap-10 py-6 border-t border-basalt-700 first:border-t-0">
                  <span className="font-mono text-sm text-rust-400">{t.year}</span>
                  <div>
                    <h3 className="font-display text-lg text-titanium-300">{t.label}</h3>
                    <p className="mt-2 text-sm text-titanium-500 leading-relaxed max-w-xl">{t.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
