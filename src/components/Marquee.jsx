import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
} from "framer-motion";

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const StripeStrip = () => (
  <div
    className="h-3 md:h-4 w-full"
    style={{
      background:
        "repeating-linear-gradient(135deg, rgba(212,175,106,0.5) 0px, rgba(212,175,106,0.5) 10px, transparent 10px, transparent 20px)",
    }}
  />
);

export const ContinuousMarquee = ({ items, speed = 22, reverse = false, className = "" }) => {
  const track = [...items, ...items, ...items];
  return (
    <div className={`relative ${className}`}>
      <StripeStrip />
      <div
        className="relative overflow-hidden border-y border-opacity-20 py-3 md:py-6"
        style={{ borderColor: "#d4af6a", background: "#1a1a1a" }}
      >
        <div
          className="flex whitespace-nowrap will-change-transform"
          style={{ animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite` }}
        >
          {track.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-6 md:gap-10 px-3 md:px-5 text-4xl md:text-7xl italic font-bold uppercase tracking-tight shrink-0"
              style={{
                color: i % 2 === 0 ? "#d4af6a" : "transparent",
                WebkitTextStroke: i % 2 === 0 ? "none" : "1.5px #d4af6a",
                fontStyle: "italic",
              }}
            >
              {item}
              <span style={{ color: "#d4af6a" }}>*</span>
            </span>
          ))}
        </div>
      </div>
      <StripeStrip />
    </div>
  );
};

export const ScrollMarquee = ({ items, baseSpeed = 3, className = "" }) => {
  const track = [...items, ...items, ...items, ...items];
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-2000, 0, 2000], [-6, 0, 6], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseSpeed * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`relative ${className}`}>
      <StripeStrip />
      <div
        className="relative overflow-hidden border-y border-opacity-20 py-3 md:py-6"
        style={{ borderColor: "#d4af6a", background: "#1a1a1a" }}
      >
        <motion.div className="flex whitespace-nowrap will-change-transform" style={{ x }}>
          {track.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-6 md:gap-10 px-3 md:px-5 text-4xl md:text-7xl italic font-bold uppercase tracking-tight shrink-0"
              style={{
                color: i % 2 === 0 ? "#d4af6a" : "transparent",
                WebkitTextStroke: i % 2 === 0 ? "none" : "1.5px #d4af6a",
                fontStyle: "italic",
              }}
            >
              {item}
              <span style={{ color: "#d4af6a" }}>*</span>
            </span>
          ))}
        </motion.div>
      </div>
      <StripeStrip />
    </div>
  );
};