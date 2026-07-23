import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Assets that must finish loading before the site reveals itself.
// Add/remove paths here as your project grows.
const ASSETS = {
  images: ["/images/mars-image.png"],
  videos: ["/videos/solar-system.mp4", "/videos/timeline-1.mp4", "/videos/timeline-2.mp4", "/videos/timeline-3.mp4", "/videos/timeline-4.mp4"],
  models: ["/models/mars.glb"],
};

const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });

const loadVideo = (src) =>
  new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.oncanplaythrough = resolve;
    video.onerror = resolve;
    video.src = src;
  });

const loadModel = (src) =>
  fetch(src)
    .then(() => {})
    .catch(() => {});

export function usePreloadAssets() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tasks = [
      ...ASSETS.images.map((src) => () => loadImage(src)),
      ...ASSETS.videos.map((src) => () => loadVideo(src)),
      ...ASSETS.models.map((src) => () => loadModel(src)),
    ];

    let completed = 0;
    const total = tasks.length || 1;

    const updateProgress = () => {
      completed += 1;
      setProgress(Math.round((completed / total) * 100));
    };

    Promise.all(tasks.map((task) => task().then(updateProgress))).then(() => {
      setProgress(100);
      // brief hold so the 100% state is visible before revealing the site
      setTimeout(() => setDone(true), 400);
    });
  }, []);

  return { progress, done };
}

export default function LoadingScreen({ progress, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "#1a1a1a" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm uppercase tracking-[0.3em] font-light mb-6 md:mb-8"
            style={{ color: "#d4af6a" }}
          >
            Ochre Foundry
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-light tabular-nums mb-8 md:mb-10"
            style={{ color: "#f5f5f5" }}
          >
            {progress}
            <span style={{ color: "#d4af6a" }}>%</span>
          </motion.div>

          <div className="w-48 md:w-72 h-px overflow-hidden" style={{ background: "rgba(212,175,106,0.15)" }}>
            <motion.div
              className="h-full"
              style={{ background: "#d4af6a" }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 md:mt-8 text-[10px] uppercase tracking-widest font-light"
            style={{ color: "#808080" }}
          >
            Printing terrain data...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}