import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Eye, Shield, Activity, RotateCw } from 'lucide-react';

export default function Tooth3DCanvas() {
  const mountRef = useRef(null);
  const [activeMode, setActiveMode] = useState('pearl'); // 'pearl', 'xray', 'aligner'
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isRotating, setIsRotating] = useState(true);

  // References for Three.js state
  const sceneRef = useRef(null);
  const toothGroupRef = useRef(null);
  const toothMeshRef = useRef(null);
  const pulpMeshRef = useRef(null);
  const alignerMeshRef = useRef(null);
  const particlesRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    // Tooth Group
    const toothGroup = new THREE.Group();
    toothGroupRef.current = toothGroup;
    scene.add(toothGroup);

    // ==========================================
    // PROCEDURAL HIGH-PRECISION 3D TOOTH MESH
    // ==========================================
    // Construct anatomically inspired molar geometry:
    // Crown + 4 cusps + neck + dual curved roots
    
    // 1. Crown Geometry (Softened rounded rectangular block with cusp depressions)
    const crownGeo = new THREE.CylinderGeometry(1.4, 1.1, 1.6, 32, 16);
    const pos = crownGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      // Occlusal table sculpting: 4 cusps on top (y > 0.4)
      if (y > 0.4) {
        const cusp1 = Math.sin(x * 2.2) * 0.22;
        const cusp2 = Math.cos(z * 2.2) * 0.22;
        const centerDip = (x * x + z * z) * 0.15;
        y += cusp1 + cusp2 - centerDip;
        pos.setY(i, y);
      }

      // Slightly squarish molar curvature
      const angle = Math.atan2(z, x);
      const radiusMod = 1 + 0.12 * Math.cos(4 * angle);
      x *= radiusMod;
      z *= radiusMod;
      pos.setX(i, x);
      pos.setZ(i, z);
    }
    crownGeo.computeVertexNormals();

    // 2. Dual Anatomical Roots
    const rootGeo1 = new THREE.ConeGeometry(0.55, 2.3, 24, 16);
    rootGeo1.translate(0, -1.15, 0);
    const rpos1 = rootGeo1.attributes.position;
    for (let i = 0; i < rpos1.count; i++) {
      let rx = rpos1.getX(i);
      let ry = rpos1.getY(i);
      let rz = rpos1.getZ(i);
      // Gentle natural outward bend towards apex
      rx += Math.sin(-ry * 0.8) * 0.28;
      rz += Math.cos(-ry * 0.8) * 0.12;
      rpos1.setX(i, rx);
      rpos1.setZ(i, rz);
    }
    rootGeo1.computeVertexNormals();

    const rootGeo2 = rootGeo1.clone();
    // Mirror & slight variance for root 2
    const rpos2 = rootGeo2.attributes.position;
    for (let i = 0; i < rpos2.count; i++) {
      rpos2.setX(i, -rpos2.getX(i));
    }
    rootGeo2.computeVertexNormals();

    // Combine Crown + Roots into single compound group
    const crownMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.15,
      ior: 1.55,
      reflectivity: 0.9,
      specularColor: new THREE.Color(0x38bdf8),
    });

    const rootMat = new THREE.MeshStandardMaterial({
      color: 0xf3f4f6,
      roughness: 0.45,
      metalness: 0.0,
    });

    const crownMesh = new THREE.Mesh(crownGeo, crownMat);
    crownMesh.position.y = 0.8;
    toothGroup.add(crownMesh);

    const root1Mesh = new THREE.Mesh(rootGeo1, rootMat);
    root1Mesh.position.set(-0.55, 0.1, 0);
    toothGroup.add(root1Mesh);

    const root2Mesh = new THREE.Mesh(rootGeo2, rootMat);
    root2Mesh.position.set(0.55, 0.1, 0);
    toothGroup.add(root2Mesh);

    toothMeshRef.current = { crown: crownMesh, root1: root1Mesh, root2: root2Mesh };

    // 3. Internal Nerve / Pulp Chamber (Visible in X-ray mode)
    const pulpCurve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.8, 0),
      new THREE.Vector3(-0.4, 0.2, 0),
      new THREE.Vector3(-0.6, -1.0, 0.1),
      new THREE.Vector3(-0.7, -1.9, 0.2),
    ]);
    const pulpCurve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.8, 0),
      new THREE.Vector3(0.4, 0.2, 0),
      new THREE.Vector3(0.6, -1.0, -0.1),
      new THREE.Vector3(0.7, -1.9, -0.2),
    ]);

    const pulpGeo1 = new THREE.TubeGeometry(pulpCurve1, 32, 0.09, 8, false);
    const pulpGeo2 = new THREE.TubeGeometry(pulpCurve2, 32, 0.09, 8, false);
    const pulpBulbGeo = new THREE.SphereGeometry(0.32, 16, 16);
    pulpBulbGeo.translate(0, 0.7, 0);

    const pulpMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Vibrant nerve red
      emissive: 0xd97706,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      transparent: true,
      opacity: 0,
      visible: false
    });

    const pulp1 = new THREE.Mesh(pulpGeo1, pulpMat);
    const pulp2 = new THREE.Mesh(pulpGeo2, pulpMat);
    const pulpCenter = new THREE.Mesh(pulpBulbGeo, pulpMat);
    const pulpGroup = new THREE.Group();
    pulpGroup.add(pulp1, pulp2, pulpCenter);
    toothGroup.add(pulpGroup);
    pulpMeshRef.current = pulpGroup;

    // 4. Clear Aligner Shell (Visible in Aligner Mode)
    const alignerGeo = new THREE.CylinderGeometry(1.48, 1.18, 1.7, 32, 16);
    const alignerMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.45,
      transparent: true,
      opacity: 0,
      visible: false,
      wireframe: false
    });
    const alignerMesh = new THREE.Mesh(alignerGeo, alignerMat);
    alignerMesh.position.y = 0.82;
    toothGroup.add(alignerMesh);
    alignerMeshRef.current = alignerMesh;

    // Center tooth
    toothGroup.position.set(0, 0.2, 0);
    toothGroup.rotation.x = 0.2;
    toothGroup.rotation.y = -0.4;

    // ==========================================
    // FLOATING NANO-PARTICLES / CLEAN IONS
    // ==========================================
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle sprite
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(56, 189, 248, 1)');
    grad.addColorStop(0.5, 'rgba(14, 165, 233, 0.4)');
    grad.addColorStop(1, 'rgba(14, 165, 233, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const particleTex = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      map: particleTex,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    particlesRef.current = particleSystem;

    // ==========================================
    // LIGHTING SETUP (Sky-blue & Crystal White)
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const skyBlueRimLight = new THREE.DirectionalLight(0x0ea5e9, 3.0);
    skyBlueRimLight.position.set(-6, -4, -4);
    scene.add(skyBlueRimLight);

    const topSparkleLight = new THREE.PointLight(0x38bdf8, 2.0, 10);
    topSparkleLight.position.set(0, 4, 3);
    scene.add(topSparkleLight);

    // ==========================================
    // INTERACTION & ANIMATION LOOP
    // ==========================================
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Slow idle floating rotation
      if (toothGroupRef.current && isRotating && !isDraggingRef.current) {
        toothGroupRef.current.rotation.y += 0.008;
        toothGroupRef.current.position.y = 0.2 + Math.sin(elapsedTime * 1.5) * 0.12;
      }

      // Gently swirl particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.04;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ==========================================
    // DRAG ROTATION HANDLERS
    // ==========================================
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current || !toothGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      toothGroupRef.current.rotation.y += deltaX * 0.01;
      toothGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch support for mobile devices
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current || !toothGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      toothGroupRef.current.rotation.y += deltaX * 0.012;
      toothGroupRef.current.rotation.x += deltaY * 0.012;

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    // Scroll listener for camera perspective effect
    const handleScroll = () => {
      if (toothGroupRef.current) {
        const scrollY = window.scrollY;
        toothGroupRef.current.rotation.z = Math.sin(scrollY * 0.002) * 0.2;
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('scroll', handleScroll);

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update materials when activeMode changes
  useEffect(() => {
    if (!toothMeshRef.current || !pulpMeshRef.current || !alignerMeshRef.current) return;
    const { crown, root1, root2 } = toothMeshRef.current;
    const pulp = pulpMeshRef.current;
    const aligner = alignerMeshRef.current;

    if (activeMode === 'pearl') {
      // Lustrous natural enamel
      crown.material.transparent = false;
      crown.material.opacity = 1.0;
      crown.material.color.setHex(0xffffff);
      crown.material.roughness = 0.18;
      crown.material.transmission = 0.15;
      crown.material.wireframe = false;

      root1.material.transparent = false;
      root1.material.opacity = 1.0;
      root1.material.wireframe = false;

      root2.material.transparent = false;
      root2.material.opacity = 1.0;
      root2.material.wireframe = false;

      pulp.visible = false;
      aligner.visible = false;
    } else if (activeMode === 'xray') {
      // Holographic X-Ray & Root Inspection
      crown.material.transparent = true;
      crown.material.opacity = 0.35;
      crown.material.color.setHex(0x38bdf8);
      crown.material.wireframe = true;

      root1.material.transparent = true;
      root1.material.opacity = 0.4;
      root1.material.wireframe = true;

      root2.material.transparent = true;
      root2.material.opacity = 0.4;
      root2.material.wireframe = true;

      pulp.visible = true;
      pulp.traverse((child) => {
        if (child.isMesh) {
          child.material.opacity = 0.95;
          child.material.visible = true;
        }
      });
      aligner.visible = false;
    } else if (activeMode === 'aligner') {
      // Aligner Fit Simulation
      crown.material.transparent = false;
      crown.material.opacity = 0.9;
      crown.material.color.setHex(0xf8fafc);
      crown.material.roughness = 0.2;
      crown.material.wireframe = false;

      root1.material.transparent = false;
      root1.material.opacity = 1.0;
      root1.material.wireframe = false;

      root2.material.transparent = false;
      root2.material.opacity = 1.0;
      root2.material.wireframe = false;

      pulp.visible = false;
      aligner.visible = true;
      aligner.material.visible = true;
      aligner.material.opacity = 0.55;
    }
  }, [activeMode]);

  const hotspots = [
    {
      id: 'crown',
      label: 'Enamel Crown',
      desc: '96% Hydroxyapatite mineral matrix. Treated with pain-free cold laser whitening.',
      top: '25%',
      left: '42%'
    },
    {
      id: 'neck',
      label: 'Cervical Gumline',
      desc: 'Precision sulcular scaling preserves gingival attachment and stops bleeding.',
      top: '52%',
      left: '28%'
    },
    {
      id: 'root',
      label: 'Bifurcated Apex',
      desc: 'Micro-rotary nickel-titanium instrumentation preserves natural root anatomy.',
      top: '78%',
      left: '58%'
    }
  ];

  return (
    <div className="relative w-full h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center select-none">
      {/* 3D Canvas Mount */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
      />

      {/* Floating 3D Interactive Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-col sm:flex-row gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-sky-200/80 shadow-glass">
        <button
          onClick={() => setActiveMode('pearl')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeMode === 'pearl'
              ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md'
              : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pearl Enamel</span>
        </button>

        <button
          onClick={() => setActiveMode('xray')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeMode === 'xray'
              ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md'
              : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>3D X-Ray & Canal</span>
        </button>

        <button
          onClick={() => setActiveMode('aligner')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeMode === 'aligner'
              ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md'
              : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Clear Aligner</span>
        </button>
      </div>

      {/* Rotation toggle button */}
      <button
        onClick={() => setIsRotating(!isRotating)}
        className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-sky-200/80 text-xs font-medium text-slate-700 shadow-sm hover:bg-sky-50 transition-all"
        title="Toggle Auto Rotation"
      >
        <RotateCw className={`w-3.5 h-3.5 text-sky-600 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
        <span className="hidden sm:inline">{isRotating ? 'Pause Spin' : 'Auto Rotate'}</span>
      </button>

      {/* Interactive Hotspots */}
      {hotspots.map((h) => (
        <div
          key={h.id}
          style={{ top: h.top, left: h.left }}
          className="absolute z-20 group"
        >
          <button
            onClick={() => setActiveHotspot(activeHotspot === h.id ? null : h.id)}
            className="relative flex items-center justify-center w-6 h-6 rounded-full bg-white/90 border-2 border-sky-500 shadow-glow-sky hover:scale-125 transition-transform"
          >
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-sky-600 relative z-10" />
          </button>

          {/* Hotspot Tooltip */}
          <div
            className={`absolute left-8 -top-3 w-56 p-3 rounded-2xl bg-slate-900/90 backdrop-blur-lg border border-sky-400/40 text-white shadow-2xl text-xs transition-all pointer-events-none duration-300 ${
              activeHotspot === h.id
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
            }`}
          >
            <div className="font-bold text-sky-300 flex items-center gap-1 mb-1">
              <Eye className="w-3 h-3 text-sky-400" />
              <span>{h.label}</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">{h.desc}</p>
          </div>
        </div>
      ))}

      {/* Gesture Hint Badge */}
      <div className="absolute bottom-4 z-20 bg-slate-900/75 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-[11px] flex items-center gap-2 border border-sky-400/30 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
        <span>Drag to rotate 3D anatomy in 360° | Scroll down to explore</span>
      </div>

      {/* Background Soft Glow Aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-sky-400/15 blur-3xl" />
      </div>
    </div>
  );
}
