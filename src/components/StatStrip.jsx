import Reveal from "./Reveal.jsx";

export default function StatStrip({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-y border-basalt-700 divide-x divide-basalt-700">
      {stats.map((s, i) => (
        <Reveal key={i} delay={i * 0.06} className="px-5 py-8 md:px-8">
          <p className="font-display text-3xl md:text-4xl text-titanium-300">{s.value}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-titanium-500">
            {s.label}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
