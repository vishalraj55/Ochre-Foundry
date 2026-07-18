import Reveal from "./Reveal.jsx";

export default function TestimonialCard({ quote, name, role, delay = 0 }) {
  return (
    <Reveal delay={delay} className="card p-7 flex flex-col justify-between h-full">
      <p className="font-display text-lg leading-snug text-titanium-300">“{quote}”</p>
      <div className="mt-6 pt-4 border-t border-basalt-700 font-mono text-xs uppercase tracking-wide">
        <p className="text-titanium-300">{name}</p>
        <p className="text-titanium-500 mt-1">{role}</p>
      </div>
    </Reveal>
  );
}
