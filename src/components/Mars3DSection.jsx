import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import * as THREE from "three";

function MarsModel() {
  const groupRef = useRef();
  const { scene } = useGLTF("/models/mars.glb");

  useEffect(() => {
    if (!groupRef.current || !scene) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        console.log("MESH:", child.name, "MATERIAL:", child.material, "MAP:", child.material?.map);
        if (child.material?.map) {
          child.material.map.colorSpace = THREE.SRGBColorSpace;
          child.material.needsUpdate = true;
        }
      }
    });
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetDiameter = 1.6;
    const scaleFactor = targetDiameter / maxDim;

    scene.position.set(-center.x, -center.y, -center.z);
    scene.scale.setScalar(scaleFactor);

    groupRef.current.add(scene);

    return () => {
      groupRef.current && groupRef.current.remove(scene);
    };
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      // Gentle auto-rotation
      groupRef.current.rotation.y += 0.00008;
    }
  });

  return <group ref={groupRef} />;
}

export default function Mars3DSection() {
  return (
    <section className="relative py-32 md:py-40" style={{ background: "#1a1a1a" }}>
      <div className="px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-widest font-light mb-6" style={{ color: "#d4af6a" }}>
              Immersive Experience
            </p>

            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6" style={{ color: "#f5f5f5" }}>
              Explore Mars in Real-Time 3D
            </h2>

            <p className="text-sm leading-relaxed mb-8" style={{ color: "#a8a8a8" }}>
              Interact with NASA's authentic Mars surface data in stunning detail. Rotate, zoom, and examine the actual topography and terrain before planning your habitat construction. Experience the real Martian landscape.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex gap-4">
                <div
                  className="w-1 h-12 flex-shrink-0"
                  style={{ background: "#d4af6a" }}
                />
                <div>
                  <h3 className="text-sm font-light mb-1" style={{ color: "#f5f5f5" }}>
                    Real NASA Data
                  </h3>
                  <p className="text-xs" style={{ color: "#a8a8a8" }}>
                    Authentic topography from orbital surveys and rover data
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="w-1 h-12 flex-shrink-0"
                  style={{ background: "#d4af6a" }}
                />
                <div>
                  <h3 className="text-sm font-light mb-1" style={{ color: "#f5f5f5" }}>
                    Full Detail Preservation
                  </h3>
                  <p className="text-xs" style={{ color: "#a8a8a8" }}>
                    Observe craters, valleys, and geological formations at full resolution
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="w-1 h-12 flex-shrink-0"
                  style={{ background: "#d4af6a" }}
                />
                <div>
                  <h3 className="text-sm font-light mb-1" style={{ color: "#f5f5f5" }}>
                    Site Selection
                  </h3>
                  <p className="text-xs" style={{ color: "#a8a8a8" }}>
                    Identify optimal habitat locations based on real terrain analysis
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-3 text-xs uppercase tracking-widest font-light transition-all duration-300"
              style={{
                color: "#1a1a1a",
                background: "#d4af6a",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Start Planning
              <ArrowUpRight size={12} />
            </Link>
          </motion.div>

          {/* Right Column - 3D Mars */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative rounded-none overflow-hidden"
            style={{
              aspectRatio: "1",
              border: "1px solid rgba(212, 175, 106, 0.3)",
              background: "#0a0a0a",
            }}
          >
            <Canvas
              style={{
                width: "100%",
                height: "100%",
              }}
              camera={{ position: [0, 0, 4], fov: 40 }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                precision: "highp",
                outputColorSpace: THREE.SRGBColorSpace,
              }}
            >
              {/* Lighting setup */}
              <ambientLight intensity={0.6} color="#ffffff" />

              <directionalLight
                position={[8, 5, 8]}
                intensity={1.3}
                color="#ffd4a3"
                castShadow
              />

              <directionalLight
                position={[-6, -4, -6]}
                intensity={0.4}
                color="#d4af6a"
              />

              <pointLight
                position={[0, 0, 3]}
                intensity={0.25}
                color="#d4af6a"
              />

              {/* Mars Model */}
              <Suspense fallback={null}>
                <MarsModel />
              </Suspense>

              {/* Interactive Controls */}
              <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                autoRotate={false}
                rotateSpeed={0.7}
                zoomSpeed={1.2}
                panSpeed={0.8}
                minDistance={2.2}
                maxDistance={10}
                target={[0, 0, 0]}
              />
            </Canvas>

            {/* Top Label */}
            <div
              className="absolute top-4 right-4 text-xs font-light px-4 py-2 rounded-none pointer-events-none"
              style={{
                background: "rgba(26, 26, 26, 0.8)",
                border: "1px solid rgba(212, 175, 106, 0.4)",
                color: "#d4af6a",
                backdropFilter: "blur(10px)",
              }}
            >
              NASA 3D DATA
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload("/models/mars.glb");