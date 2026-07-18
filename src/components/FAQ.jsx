import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-basalt-700 border-y border-basalt-700">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <Reveal key={i} delay={i * 0.04}>
            <button
              className="w-full flex items-start justify-between gap-6 py-6 text-left"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg text-titanium-300">{item.q}</span>
              <Plus
                size={18}
                className={`mt-1 shrink-0 text-rust-400 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-6 text-titanium-500 leading-relaxed max-w-2xl">{item.a}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
