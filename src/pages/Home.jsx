import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const Counter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const increment = end / (duration * 60);
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

const RefinedGradient = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/3 w-[600px] h-[600px] opacity-5 rounded-full blur-3xl mix-blend-overlay" style={{ background: "#d4af6a" }} />
    <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] opacity-3 rounded-full blur-2xl mix-blend-overlay" style={{ background: "#d4af6a" }} />
  </div>
);

const Counter_StatCard = ({ value, label, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="relative p-12 overflow-hidden group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(212,175,106,0.08), rgba(212,175,106,0))" }} />
      <div className="absolute inset-px opacity-0 group-hover:opacity-50 transition-opacity duration-500 border border-[#d4af6a]" />

      <div className="relative z-10">
        <div className="text-xs uppercase tracking-widest mb-8" style={{ color: "#d4af6a" }}>
          {label}
        </div>
        <motion.div
          className="text-6xl md:text-7xl font-light tracking-tight"
          style={{ color: "#d4af6a" }}
        >
          {value}
        </motion.div>
      </div>
    </motion.div>
  );
};

const FeatureCardMinimal = ({ title, desc, index, number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative group cursor-pointer"
    >
      <div className="relative p-10 overflow-hidden">
        <div className={`absolute inset-0 transition-all duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`} style={{ background: "linear-gradient(135deg, rgba(212,175,106,0.06), transparent)" }} />
        <div className={`absolute inset-px border transition-all duration-700 ${isHovered ? "opacity-60" : "opacity-0"}`} style={{ borderColor: "#d4af6a" }} />

        <div className="relative z-10">
          <div className="text-sm font-light uppercase tracking-widest mb-8" style={{ color: "#d4af6a" }}>
            {number}.
          </div>
          <h3 className="text-2xl font-light mb-6" style={{ color: "#f5f5f5" }}>
            {title}
          </h3>
          <p className="text-sm leading-relaxed font-light" style={{ color: "#a8a8a8" }}>
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const TimelineItemMinimal = ({ year, title, desc, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
      }
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`grid md:grid-cols-2 gap-16 items-center py-20 border-t border-opacity-20 ${index === 0 ? "border-t-0" : ""}`}
      style={{ borderColor: "#d4af6a" }}
    >
      <div className={index % 2 === 1 ? "md:order-2" : ""}>
        <div className="aspect-video bg-black rounded-sm overflow-hidden relative group">
          <video
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={`/videos/timeline-${index + 1}.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700" style={{ background: "#d4af6a" }} />
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-widest mb-6" style={{ color: "#d4af6a" }}>
          {year}
        </div>
        <h3 className="text-4xl font-light mb-6" style={{ color: "#f5f5f5" }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed font-light" style={{ color: "#a8a8a8" }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

const TierCardMinimal = ({ name, desc, specs, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative group"
    >
      <div className="relative p-12 overflow-hidden">
        <div className={`absolute inset-0 transition-all duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`} style={{ background: "linear-gradient(135deg, rgba(212,175,106,0.08), transparent)" }} />
        <div className={`absolute inset-px border transition-all duration-700 ${isHovered ? "opacity-60" : "opacity-0"}`} style={{ borderColor: "#d4af6a" }} />

        <div className="relative z-10">
          <h3 className="text-2xl font-light mb-4" style={{ color: "#f5f5f5" }}>
            {name}
          </h3>
          <p className="text-sm leading-relaxed font-light mb-10" style={{ color: "#a8a8a8" }}>
            {desc}
          </p>

          <div className="pt-8 border-t border-opacity-20" style={{ borderColor: "#d4af6a" }}>
            {specs.map((spec) => (
              <div key={spec} className="flex items-start gap-4 py-3">
                <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ background: "#d4af6a" }} />
                <span className="text-xs font-light" style={{ color: "#a8a8a8" }}>
                  {spec}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProcessStepMinimal = ({ number, title, body, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative"
    >
      <div className="flex gap-8">
        <div className="flex-shrink-0">
          <div className="text-xs uppercase tracking-widest font-light" style={{ color: "#d4af6a" }}>
            {number}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-light mb-4" style={{ color: "#f5f5f5" }}>
            {title}
          </h3>
          <p className="text-sm leading-relaxed font-light" style={{ color: "#a8a8a8" }}>
            {body}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialMinimal = ({ quote, name, role, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative group"
    >
      <div className="relative p-10 overflow-hidden">
        <div className={`absolute inset-0 transition-all duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`} style={{ background: "linear-gradient(135deg, rgba(212,175,106,0.06), transparent)" }} />
        <div className={`absolute inset-px border transition-all duration-700 ${isHovered ? "opacity-60" : "opacity-0"}`} style={{ borderColor: "#d4af6a" }} />
        <div className={`absolute left-0 top-0 w-1 h-8 transition-all duration-700 ${isHovered ? "h-12" : ""}`} style={{ background: "#d4af6a" }} />

        <div className="relative z-10">
          <p className="text-sm leading-relaxed font-light mb-8" style={{ color: "#d4d4d4" }}>
            "{quote}"
          </p>
          <div>
            <p className="text-sm font-light" style={{ color: "#f5f5f5" }}>
              {name}
            </p>
            <p className="text-xs font-light mt-2" style={{ color: "#808080" }}>
              {role}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FAQMinimal = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-1">
      {items.map((item, i) => (
        <div key={i} className="border border-opacity-20" style={{ borderColor: "#d4af6a" }}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full px-8 py-6 flex items-center justify-between hover:bg-opacity-5 transition-all duration-300 group"
            style={{ background: openIndex === i ? "rgba(212,175,106,0.04)" : "transparent" }}
          >
            <span className="text-left text-sm font-light" style={{ color: "#f5f5f5" }}>
              {item.q}
            </span>
            <motion.div
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 ml-4"
              style={{ color: "#d4af6a" }}
            >
              ↓
            </motion.div>
          </button>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: openIndex === i ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-8 py-6 border-t border-opacity-20" style={{ borderColor: "#d4af6a" }}>
              <p className="text-sm leading-relaxed font-light" style={{ color: "#a8a8a8" }}>
                {item.a}
              </p>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.96]);

  return (
    <>
      <motion.section
        style={{
          opacity: heroOpacity,
          scale: heroScale,
        }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Mars background image with blur */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/mars-image.png')",
            filter: "blur(6px)",
          }}
        />

        <RefinedGradient />

        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,26,26,0.6) 0%, rgba(26,26,26,0.75) 50%, rgba(26,26,26,0.85) 100%)" }} />

        <div className="relative z-10 text-center px-8 md:px-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mb-8"
          >
            <p className="text-xs uppercase tracking-widest font-light" style={{ color: "#d4af6a" }}>
              Ochre Foundry • Mars Operations
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-light leading-[1.0] tracking-tight mb-10"
            style={{ color: "#f5f5f5" }}
          >
            We print homes
            <br />
            <span style={{ color: "#d4af6a" }} className="font-light">
              from Martian rust.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              to="/contact"
              className="px-10 py-4 text-xs uppercase tracking-widest font-light transition-all duration-300 relative overflow-hidden group"
              style={{ color: "#1a1a1a", background: "#d4af6a" }}
            >
              <span className="relative z-10 flex items-center gap-3 justify-center">
                Request a quote
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </Link>

            <Link
              to="/services"
              className="px-10 py-4 text-xs uppercase tracking-widest font-light transition-all duration-300 border"
              style={{ color: "#d4af6a", borderColor: "#d4af6a" }}
            >
              Explore services
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <section className="relative py-32 md:py-40" style={{ background: "#1a1a1a" }}>
        <div className="px-8 md:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <p className="text-xs uppercase tracking-widest font-light mb-6" style={{ color: "#d4af6a" }}>
              By the numbers
            </p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ color: "#f5f5f5" }}>
              Mars-scale engineering.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-1 border border-opacity-20" style={{ borderColor: "#d4af6a" }}>
            <Counter_StatCard
              value={<Counter end={37} />}
              label="Habitats delivered since 2071"
              index={0}
            />
            <Counter_StatCard
              value="2.4m"
              label="Regolith shielding thickness"
              index={1}
            />
            <Counter_StatCard
              value="9 sols"
              label="Average print-to-seal time"
              index={2}
            />
            <Counter_StatCard
              value="0.6t"
              label="Earth mass shipped per habitat"
              index={3}
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden w-full" style={{ background: "#1a1a1a" }}>
        {/* Cinematic Video Background */}
        <div
          className="relative w-full"
          style={{
            minHeight: "800px",
            height: "100vh",
            maxHeight: "1200px",
          }}
        >
          {/* Video element */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/solar-system.mp4" type="video/mp4" />
          </video>

          {/* fade overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(26,26,26,0.15) 0%, rgba(26,26,26,0.08) 50%, rgba(26,26,26,0.15) 100%)",
            }}
          />

          {/*depth - matches video */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(26,26,26,0) 35%, rgba(26,26,26,0.08) 70%, rgba(26,26,26,0.2) 100%)",
            }}
          />

          {/* Top fade */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none z-20"
            style={{
              height: "280px",
              background: "linear-gradient(180deg, rgba(26,26,26,0.9) 0%, rgba(26,26,26,0.5) 40%, rgba(26,26,26,0.15) 80%, rgba(26,26,26,0) 100%)",
            }}
          />

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
            style={{
              height: "400px",
              background: "linear-gradient(180deg, rgba(26,26,26,0) 0%, rgba(26,26,26,0.2) 30%, rgba(26,26,26,0.5) 60%, rgba(26,26,26,0.95) 100%)",
            }}
          />

          {/* Problem Content OVERLAID on video */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-8 md:px-16">
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9 }}
                  className="pointer-events-auto"
                >
                  <p className="text-xs uppercase tracking-widest font-light mb-8" style={{ color: "#d4af6a" }}>
                    The challenge
                  </p>
                  <h2 className="text-5xl md:text-6xl font-light leading-tight" style={{ color: "#f5f5f5" }}>
                    Every kilogram shipped is a kilogram you didn't need to.
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 }}
                  className="space-y-6 text-sm leading-relaxed font-light pointer-events-auto"
                  style={{ color: "#d4d4d4" }}
                >
                  <p>
                    Prefab shells are launched heavy, land expensive, and still need months of on-site assembly. The regolith under every landing site is a structural material that's already there—already radiation-dense, and free of launch cost.
                  </p>
                  <p>
                    We built a mobile sintering gantry that transforms that regolith into a pressurized shell without a single Earth-side panel. Sealed structure in the time it used to take to unload one.
                  </p>
                  <div className="pt-6">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-light group transition-all duration-300"
                      style={{ color: "#d4af6a" }}
                    >
                      Learn our story
                      <ArrowUpRight
                        size={12}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Elegant centered accent line */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
            style={{
              width: "180px",
              height: "1.5px",
              background: "linear-gradient(90deg, rgba(212,175,106,0) 0%, rgba(212,175,106,0.3) 50%, rgba(212,175,106,0) 100%)",
            }}
          />
        </div>
      </section>

      <section className="relative py-32 md:py-40" style={{ background: "#1a1a1a" }}>
        <div className="px-8 md:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <p className="text-xs uppercase tracking-widest font-light mb-6" style={{ color: "#d4af6a" }}>
              Why Ochre Foundry
            </p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ color: "#f5f5f5" }}>
              Built for the Martian frontier.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCardMinimal
              number="01"
              title="On-site printing"
              desc="No Earth launch delays. Print habitat structures directly from local regolith where you land."
              index={0}
            />
            <FeatureCardMinimal
              number="02"
              title="Radiation shielding"
              desc="Regolith composite shells test at higher compressive strength than shipped aluminum habitats."
              index={1}
            />
            <FeatureCardMinimal
              number="03"
              title="Launch mass savings"
              desc="Printed habitats cost a third of the Earth-shipped alternative, measured in launch weight."
              index={2}
            />
          </div>
        </div>
      </section>

      <section className="relative py-32 md:py-40 " style={{ background: "#1a1a1a" }}>
        <div className="px-8 md:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <p className="text-xs uppercase tracking-widest font-light mb-6" style={{ color: "#d4af6a" }}>
              Our history
            </p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ color: "#f5f5f5" }}>
              From concept to deployment.
            </h2>
          </motion.div>

          <div className="space-y-1">
            <TimelineItemMinimal
              year="2071"
              title="First sintering prototype"
              desc="Ochre Foundry spins up in Nili Fossae. Our first gantry successfully prints a 12m² test shell in regolith-basalt composite."
              index={0}
            />
            <TimelineItemMinimal
              year="2084"
              title="Settlement Block deployment"
              desc="The first multi-pod colony grid goes live at Jezero. 40 residents move in. This design becomes our flagship offering."
              index={1}
            />
            <TimelineItemMinimal
              year="2096"
              title="Network scale"
              desc="We've printed 37 habitats across four Martian settlements. Our gantries are now the standard for on-site construction."
              index={2}
            />
            <TimelineItemMinimal
              year="2100"
              title="What's next"
              desc="Scaling to 150+ sites. Expanding beyond habitat shells into roads, thermal systems, and underground bunker networks."
              index={3}
            />
          </div>
        </div>
      </section>

      <section className="relative py-32 md:py-40 " style={{ background: "#1a1a1a" }}>
        <div className="px-8 md:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <p className="text-xs uppercase tracking-widest font-light mb-6" style={{ color: "#d4af6a" }}>
              Our offerings
            </p>
            <h2 className="text-5xl md:text-6xl font-light mb-6" style={{ color: "#f5f5f5" }}>
              Three tiers. One printer.
            </h2>
            <p className="text-sm font-light max-w-3xl" style={{ color: "#a8a8a8" }}>
              Every habitat starts as the same sintering process—the difference is scale, life-support depth, and how many pods link together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <TierCardMinimal
              name="Outpost Pod"
              desc="Single pressurized shell for research crews of 2–4, printed and sealed in under two weeks."
              specs={["8m² interior", "2–4 crew", "<14 sols delivery"]}
              index={0}
            />
            <TierCardMinimal
              name="Settlement Block"
              desc="Interlinked pods with shared life support, built for permanent crews of 12–40."
              specs={["48m² interior", "12–40 crew", "6–8 weeks assembly"]}
              index={1}
            />
            <TierCardMinimal
              name="Colony Grid"
              desc="Full district printing with roads, power spine, and staged expansion for 200+ residents."
              specs={["500m² total", "200+ crew", "Phase-based"]}
              index={2}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-3 px-10 py-4 text-xs uppercase tracking-widest font-light transition-all duration-300 border"
              style={{ color: "#d4af6a", borderColor: "#d4af6a" }}
            >
              Compare all tiers
              <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="relative py-32 md:py-40 " style={{ background: "#1a1a1a" }}>
        <div className="px-8 md:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <p className="text-xs uppercase tracking-widest font-light mb-6" style={{ color: "#d4af6a" }}>
              The process
            </p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ color: "#f5f5f5" }}>
              From bare regolith to sealed door.
            </h2>
          </motion.div>

          <div className="space-y-16">
            <ProcessStepMinimal
              number="01"
              title="Site survey"
              body="Our rover pair maps regolith composition and radiation exposure at your coordinates, then simulates the print before a single layer is laid."
              index={0}
            />
            <ProcessStepMinimal
              number="02"
              title="Additive print"
              body="A mobile gantry sinters local regolith into structural shell, layer by layer, while a second head runs conduit for power and air."
              index={1}
            />
            <ProcessStepMinimal
              number="03"
              title="Seal & pressurize"
              body="Interior liner, airlocks, and life-support tie-ins go in last. We hold pressure for 72 hours before handing you the keys."
              index={2}
            />
          </div>
        </div>
      </section>

      <section className="relative py-32 md:py-40 " style={{ background: "#1a1a1a" }}>
        <div className="px-8 md:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <p className="text-xs uppercase tracking-widest font-light mb-6" style={{ color: "#d4af6a" }}>
              Voices from the field
            </p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ color: "#f5f5f5" }}>
              What our crews say.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialMinimal
              quote="Ground broke nine days after the gantry landed. We moved our whole lichen program in under a lunar month."
              name="Dr. Priya Renn"
              role="Astrobiology Lead, Hellas Research Station"
              index={0}
            />
            <TestimonialMinimal
              quote="We budgeted for an Earth-shipped shell and got a printed one for a third of the launch mass. That's the real number that matters."
              name="Tomas Ilves"
              role="Logistics Director, Meridian Mining Co."
              index={1}
            />
            <TestimonialMinimal
              quote="The radiation readings inside our block are lower than our old shipped habitat. The regolith shell just works better."
              name="Anaya Fitch"
              role="Settlement Coordinator, Arcadia Planitia"
              index={2}
            />
          </div>
        </div>
      </section>

      <section className="relative py-32 md:py-40 " style={{ background: "#1a1a1a" }}>
        <div className="px-8 md:px-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <p className="text-xs uppercase tracking-widest font-light mb-6" style={{ color: "#d4af6a" }}>
              Questions
            </p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ color: "#f5f5f5" }}>
              Before you send coordinates.
            </h2>
          </motion.div>

          <FAQMinimal
            items={[
              {
                q: "How is a printed habitat structurally rated against a shipped one?",
                a: "Regolith-composite shells test at a higher compressive strength than the aluminum-lattice habitats currently shipped from Earth, and the added wall thickness gives meaningfully better radiation shielding without the added launch mass.",
              },
              {
                q: "What happens if the print is interrupted mid-layer?",
                a: "The gantry holds position and resumes from the last completed layer once conditions clear. Partial shells are structurally stable at rest and won't degrade while paused.",
              },
              {
                q: "Do you handle the life-support tie-in, or just the shell?",
                a: "Every tier includes conduit routing during the print and a final tie-in to your air, water, and power systems. Settlement Block and above include the life-support hardware itself.",
              },
            ]}
          />
        </div>
      </section>

      <section className="relative py-32 md:py-40 " style={{ background: "#1a1a1a" }}>
        <div className="px-8 md:px-16 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl md:text-6xl font-light mb-8" style={{ color: "#f5f5f5" }}>
              Ready to build on Mars?
            </h2>
            <p className="text-sm font-light max-w-2xl mx-auto mb-12" style={{ color: "#a8a8a8" }}>
              Send us your coordinates and project scope. We'll handle the rest.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-12 py-4 text-xs uppercase tracking-widest font-light transition-all duration-300"
              style={{ color: "#1a1a1a", background: "#d4af6a" }}
            >
              Request a consultation
              <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}