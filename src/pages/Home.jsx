import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import FAQ from "../components/FAQ.jsx";
import CTASection from "../components/CTASection.jsx";

// Animated Counter
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

// Gradient Mesh Background
const GradientMesh = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-rust-600/20 rounded-full blur-3xl mix-blend-screen" />
    <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl mix-blend-screen" />
    <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl mix-blend-multiply" />
  </div>
);

// Timeline Component
const TimelineItem = ({ year, title, desc, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }
      }
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:text-right" : ""}`}
    >
      <div className={index % 2 === 1 ? "md:order-2" : ""}>
        <div className="w-full aspect-video bg-black rounded-lg border border-basalt-700 overflow-hidden relative group">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src={`/videos/timeline-${index + 1}.mp4`}
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-rust-500/0 via-rust-500/10 to-rust-500/0 group-hover:via-rust-500/20 transition-all" />
        </div>
      </div>
      <div>
        <p className="eyebrow mb-3">{year}</p>
        <h3 className="text-2xl md:text-3xl font-display text-titanium-300 mb-3">
          {title}
        </h3>
        <p className="text-titanium-500 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

// Stat Card with Parallax
const StatCard = ({ value, label, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="card p-8 md:p-10 group hover:border-rust-500 transition-colors"
    >
      <div className="text-sm eyebrow mb-6">{label}</div>
      <motion.div className="text-5xl md:text-6xl font-display text-rust-400 group-hover:text-rust-300 transition-colors">
        {value}
      </motion.div>
    </motion.div>
  );
};

// Feature Card with Hover Effect
const FeatureCard = ({ icon: Icon, title, desc, index }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card p-8 relative overflow-hidden group hover:border-printline-400 transition-colors cursor-pointer"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #7FE7E0 0%, transparent 80%)`,
        }}
      />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-rust-500/20 to-rust-600/10 flex items-center justify-center group-hover:from-rust-500/30 group-hover:to-rust-600/20 transition-all">
          <Icon
            size={24}
            className="text-rust-400 group-hover:text-rust-300 transition-colors"
          />
        </div>
        <h3 className="text-xl font-display text-titanium-300 mt-6 mb-3">
          {title}
        </h3>
        <p className="text-sm text-titanium-500 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <>
      {/* Hero Section */}
      <motion.section
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          backgroundImage: "url('/images/mars-image.png')",
        }}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      >
        <GradientMesh />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-basalt-900" />

        <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <p className="eyebrow mb-4 inline-block">
              Ochre Foundry • Mars Operations
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight leading-[1.05] text-titanium-300 mb-8"
          >
            We print homes
            <br />
            <span className="bg-gradient-to-r from-rust-400 via-orange-500 to-rust-500 bg-clip-text text-transparent">
              from Martian rust.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-titanium-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Shipping habitats from Earth costs a launch window and a crew's
            patience. Ochre Foundry prints yours on-site from the ground you're
            standing on—sealed and pressurized in days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/contact" className="btn-primary group">
              <span>Request a quote</span>
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </Link>
            <Link to="/services" className="btn-ghost">
              Explore services
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics Section with Parallax */}
      <section className="relative py-24 md:py-32">
        <div className="container-px">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="eyebrow mb-4">By the numbers</p>
            <h2 className="text-4xl md:text-5xl font-display text-titanium-300">
              Mars-scale engineering.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <StatCard
              value={<Counter end={37} />}
              label="Habitats delivered since 2071"
              index={0}
            />
            <StatCard
              value="2.4m"
              label="Regolith shielding thickness"
              index={1}
            />
            <StatCard
              value="9 sols"
              label="Average print-to-seal time"
              index={2}
            />
            <StatCard
              value="0.6t"
              label="Earth mass shipped per habitat"
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative py-24 md:py-32 border-t border-basalt-700">
        <div className="container-px">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="eyebrow mb-6">The challenge</p>
              <h2 className="text-4xl md:text-5xl font-display text-titanium-300 leading-tight">
                Every kilogram shipped is a kilogram you didn't need to.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6 text-titanium-400 leading-relaxed"
            >
              <p>
                Prefab shells are launched heavy, land expensive, and still need
                months of on-site assembly. The regolith under every landing
                site is a structural material that's already there—already
                radiation-dense, and free of launch cost.
              </p>
              <p>
                We built a mobile sintering gantry that transforms that regolith
                into a pressurized shell without a single Earth-side panel.
                Sealed structure in the time it used to take to unload one.
              </p>
              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-printline-400 hover:text-printline-300 group"
                >
                  Learn our story
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24 md:py-32 bg-basalt-900/30 border-y border-basalt-700">
        <div className="container-px">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="eyebrow mb-4">Why Ochre Foundry</p>
            <h2 className="text-4xl md:text-5xl font-display text-titanium-300">
              Built for the Martian frontier.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={({ size, className }) => (
                <svg
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className={className}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              )}
              title="On-site printing"
              desc="No Earth launch delays. Print habitat structures directly from local regolith where you land."
              index={0}
            />
            <FeatureCard
              icon={({ size, className }) => (
                <svg
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className={className}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              title="Radiation shielding"
              desc="Regolith composite shells test at higher compressive strength than shipped aluminum habitats."
              index={1}
            />
            <FeatureCard
              icon={({ size, className }) => (
                <svg
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className={className}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              title="Launch mass savings"
              desc="Printed habitats cost a third of the Earth-shipped alternative, measured in launch weight."
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-24 md:py-32">
        <div className="container-px">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <p className="eyebrow mb-4">Our history</p>
            <h2 className="text-4xl md:text-5xl font-display text-titanium-300">
              From concept to deployment.
            </h2>
          </motion.div>

          <div className="space-y-20">
            <TimelineItem
              year="2071"
              title="First sintering prototype"
              desc="Ochre Foundry spins up in Nili Fossae. Our first gantry successfully prints a 12m² test shell in regolith-basalt composite."
              index={0}
            />
            <TimelineItem
              year="2084"
              title="Settlement Block deployment"
              desc="The first multi-pod colony grid goes live at Jezero. 40 residents move in. This design becomes our flagship offering."
              index={1}
            />
            <TimelineItem
              year="2096"
              title="Network scale"
              desc="We've printed 37 habitats across four Martian settlements. Our gantries are now the standard for on-site construction."
              index={2}
            />
            <TimelineItem
              year="2100"
              title="What's next"
              desc="Scaling to 150+ sites. Expanding beyond habitat shells into roads, thermal systems, and underground bunker networks."
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="relative py-24 md:py-32 border-t border-basalt-700 bg-basalt-900/40">
        <div className="container-px">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="eyebrow mb-4">Our offerings</p>
            <h2 className="text-4xl md:text-5xl font-display text-titanium-300 mb-4">
              Three tiers. One printer.
            </h2>
            <p className="text-titanium-400 max-w-2xl">
              Every habitat starts as the same sintering process—the difference
              is scale, life-support depth, and how many pods link together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Outpost Pod",
                desc: "Single pressurized shell for research crews of 2–4, printed and sealed in under two weeks.",
                specs: ["8m² interior", "2–4 crew", "<14 sols delivery"],
              },
              {
                name: "Settlement Block",
                desc: "Interlinked pods with shared life support, built for permanent crews of 12–40.",
                specs: ["48m² interior", "12–40 crew", "6–8 weeks assembly"],
              },
              {
                name: "Colony Grid",
                desc: "Full district printing with roads, power spine, and staged expansion for 200+ residents.",
                specs: ["500m² total", "200+ crew", "Phase-based"],
              },
            ].map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-10 group border-2 hover:border-rust-500 transition-colors"
              >
                <h3 className="text-2xl font-display text-titanium-300 mb-3">
                  {tier.name}
                </h3>
                <p className="text-sm text-titanium-500 leading-relaxed mb-8">
                  {tier.desc}
                </p>
                <div className="space-y-2 pt-8 border-t border-basalt-700">
                  {tier.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rust-400" />
                      <span className="text-xs text-titanium-400">{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link to="/services" className="btn-primary group">
              <span>Compare all tiers</span>
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 md:py-32">
        <div className="container-px">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <p className="eyebrow mb-4">The process</p>
            <h2 className="text-4xl md:text-5xl font-display text-titanium-300">
              From bare regolith to sealed door.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                n: "01",
                title: "Site survey",
                body: "Our rover pair maps regolith composition and radiation exposure at your coordinates, then simulates the print before a single layer is laid.",
              },
              {
                n: "02",
                title: "Additive print",
                body: "A mobile gantry sinters local regolith into structural shell, layer by layer, while a second head runs conduit for power and air.",
              },
              {
                n: "03",
                title: "Seal & pressurize",
                body: "Interior liner, airlocks, and life-support tie-ins go in last. We hold pressure for 72 hours before handing you the keys.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="font-mono text-sm text-rust-400 font-bold mb-4">
                  {step.n}
                </div>
                <h3 className="text-2xl font-display text-titanium-300 mb-4">
                  {step.title}
                </h3>
                <p className="text-titanium-500 leading-relaxed text-sm">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 md:py-32 border-t border-basalt-700 bg-basalt-900/40">
        <div className="container-px">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="eyebrow mb-4">Voices from the field</p>
            <h2 className="text-4xl md:text-5xl font-display text-titanium-300">
              What our crews say.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Ground broke nine days after the gantry landed. We moved our whole lichen program in under a lunar month.",
                name: "Dr. Priya Renn",
                role: "Astrobiology Lead, Hellas Research Station",
              },
              {
                quote:
                  "We budgeted for an Earth-shipped shell and got a printed one for a third of the launch mass. That's the real number that matters.",
                name: "Tomas Ilves",
                role: "Logistics Director, Meridian Mining Co.",
              },
              {
                quote:
                  "The radiation readings inside our block are lower than our old shipped habitat. The regolith shell just works better.",
                name: "Anaya Fitch",
                role: "Settlement Coordinator, Arcadia Planitia",
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-8 border-l-2 border-l-rust-400 hover:border-l-rust-300 transition-colors"
              >
                <p className="text-titanium-300 leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div>
                  <p className="font-display text-sm text-titanium-300">
                    {t.name}
                  </p>
                  <p className="text-xs text-titanium-500 mt-1">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 md:py-32">
        <div className="container-px max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="eyebrow mb-4">Questions</p>
            <h2 className="text-4xl md:text-5xl font-display text-titanium-300">
              Before you send coordinates.
            </h2>
          </motion.div>

          <FAQ
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

      <CTASection />
    </>
  );
}
