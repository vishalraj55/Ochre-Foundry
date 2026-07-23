import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

function MarsModel() {
  const meshRef = useRef();

  useEffect(() => {
    // Create procedural Mars texture
    const geometry = new THREE.IcosahedronGeometry(1, 64);
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    
    const ctx = canvas.getContext("2d");
    
    // Base Mars red color
    ctx.fillStyle = "#c1440e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add texture variation
    ctx.fillStyle = "#8b3a1f";
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 100 + 20;
      ctx.globalAlpha = Math.random() * 0.6;
      ctx.fillRect(x, y, size, size);
    }
    
    // Add craters
    ctx.strokeStyle = "#5a2810";
    ctx.globalAlpha = 0.4;
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 50 + 10;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshStandardMaterial({ 
      map: texture,
      roughness: 0.85,
      metalness: 0.05,
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    if (meshRef.current) {
      meshRef.current.add(mesh);
    }
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      // Gentle auto-rotation
      meshRef.current.rotation.y += 0.0002;
    }
  });

  return <group ref={meshRef} />;
}

export default function Mars3DIntegration() {
  return (
    <section className="relative w-full" style={{ background: "#1a1a1a", height: "100vh", overflow: "hidden" }}>
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          background: "#1a1a1a",
        }}
        camera={{ position: [0, 0.5, 2.2], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} color="#ffffff" />
        
        <directionalLight
          position={[8, 5, 8]}
          intensity={1.2}
          color="#ffd4a3"
          castShadow
        />
        
        <directionalLight
          position={[-5, -3, -5]}
          intensity={0.3}
          color="#d4af6a"
        />
        
        <pointLight
          position={[0, 0, 2]}
          intensity={0.2}
          color="#d4af6a"
        />

        {/* Model */}
        <MarsModel />

        {/* OrbitControls - This makes it interactive */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          minDistance={1.2}
          maxDistance={8}
          autoRotateSpeed={1}
        />
      </Canvas>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-center">
          <p
            className="text-xs uppercase tracking-widest font-light mb-4"
            style={{ color: "#d4af6a" }}
          >
            Interactive Mars
          </p>
          <h2
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ color: "#f5f5f5" }}
          >
            Explore the Red Planet
          </h2>
          <p
            className="text-xs font-light"
            style={{ color: "#a8a8a8" }}
          >
            Drag to rotate • Scroll to zoom
          </p>
        </div>
      </div>

      {/* Info Note */}
      <div
        className="absolute bottom-8 left-8 text-xs font-light p-4 rounded-none"
        style={{
          background: "rgba(212, 175, 106, 0.08)",
          border: "1px solid rgba(212, 175, 106, 0.2)",
          color: "#a8a8a8",
          maxWidth: "300px",
          backdropFilter: "blur(10px)",
          pointerEvents: "none",
        }}
      >
        <p className="text-[0.7rem] uppercase tracking-widest mb-2" style={{ color: "#d4af6a" }}>
          Real-Time 3D
        </p>
        <p>
          Procedurally generated Mars surface. For custom 3D models, convert USDZ to GLB using Blender.
        </p>
      </div>
    </section>
  );
}