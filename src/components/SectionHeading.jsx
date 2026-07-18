import Reveal from "./Reveal.jsx";

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <Reveal className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-titanium-300">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-titanium-500 leading-relaxed">{description}</p>
      )}
    </Reveal>
  );
}
