import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Particles ──
    const MAX_PARTICLES = 5000; // Increased max particles to accommodate new ones
    let currentParticleCount = 2200; // Initial particles
    const positions = new Float32Array(MAX_PARTICLES * 3);
    const colors = new Float32Array(MAX_PARTICLES * 3);
    const speeds = new Float32Array(MAX_PARTICLES);
    const birthTimes = new Float32Array(MAX_PARTICLES); // To track new particle lifespan

    const palette = [
      new THREE.Color('#4F8EF7'), // Blue
      new THREE.Color('#7C3AED'), // Purple
      new THREE.Color('#F472B6'), // Pink
      new THREE.Color('#38BDF8'), // Light Blue
      new THREE.Color('#a78bfa'), // Lavender
    ];

    // Initialize initial particles
    for (let i = 0; i < currentParticleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
      speeds[i] = Math.random() * 0.6 + 0.2;
      birthTimes[i] = -1; // -1 for initial particles, means they don't fade out
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute('birthTime', new THREE.BufferAttribute(birthTimes, 1)); // New attribute

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uColorShift: { value: 0 }, // New uniform for color shifting
        uClickTime: { value: -1000 }, // Time of last click for particle burst effect
        uClickPos: { value: new THREE.Vector3(0, 0, 0) }, // Position of last click
      },
      vertexShader: `
        attribute vec3 color;
        attribute float speed;
        attribute float birthTime; // New attribute
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uScroll;
        uniform float uColorShift; // New uniform
        uniform float uClickTime;
        uniform vec3 uClickPos;

        vec3 hsv2rgb(vec3 c) {
            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }

        void main() {
          vec3 baseColor = color;
          
          // Apply color shift
          vec3 hsv = rgb2hsv(baseColor); // Assuming rgb2hsv exists or is implemented
          hsv.x = fract(hsv.x + uColorShift);
          vColor = hsv2rgb(hsv);
          
          vec3 p = position;
          
          // Particle burst effect
          float life = uTime - birthTime;
          if (birthTime > 0.0 && life < 2.0) { // New particles last 2 seconds
            float fade = 1.0 - life / 2.0;
            p = uClickPos + normalize(position - uClickPos) * life * 1.5; // Expand outwards from click
            vAlpha = fade * 0.8;
          } else {
            p.x += sin(uTime * 0.25 * speed + position.z * 0.8) * 0.35;
            p.y += cos(uTime * 0.2 * speed + position.x * 0.6) * 0.3;
            vAlpha = 0.5 + 0.5 * sin(uTime * speed + position.x * 2.0);
          }
          
          p.y -= uScroll * 0.004;
          p.y = mod(p.y + 11.0, 22.0) - 11.0;
          
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (2.2 + speed * 1.2) * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }

        vec3 rgb2hsv(vec3 c) {
            vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
            vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
            vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

            float d = q.x - min(q.w, q.y);
            float e = 1.0e-10;
            return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.05, d) * vAlpha * 0.85;
          gl_FragColor = vec4(vColor, a);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);


    // ── Connection lines ──
    const lineVerts: number[] = [];
    const lineAlphas: number[] = [];
    const SAMPLE = 350;
    const MAX_DIST = 2.2;

    for (let i = 0; i < SAMPLE; i++) {
      for (let j = i + 1; j < SAMPLE; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < MAX_DIST) {
          lineVerts.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2], positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
          const a = (1 - d / MAX_DIST) * 0.18;
          lineAlphas.push(a, a);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3));
    lineGeo.setAttribute('alpha', new THREE.Float32BufferAttribute(lineAlphas, 1));

    const lineMat = new THREE.ShaderMaterial({
      uniforms: {
        uScroll: { value: 0 },
        uColorShift: { value: 0 }, // New uniform for color shifting
      },
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        uniform float uScroll;
        uniform float uColorShift; // New uniform

        vec3 hsv2rgb(vec3 c) {
            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.w);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }

        void main() {
          vAlpha = alpha;
          vec3 p = position;
          p.y -= uScroll * 0.004;
          p.y = mod(p.y + 11.0, 22.0) - 11.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        uniform float uColorShift; // New uniform

        vec3 hsv2rgb(vec3 c) {
            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.w);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }
        vec3 rgb2hsv(vec3 c) {
            vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
            vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
            vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

            float d = q.x - min(q.w, q.y);
            float e = 1.0e-10;
            return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
        }

        void main() {
          vec3 baseColor = vec3(0.31, 0.56, 0.97); // Original line color
          vec3 hsv = rgb2hsv(baseColor);
          hsv.x = fract(hsv.x + uColorShift);
          gl_FragColor = vec4(hsv2rgb(hsv), vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const lineSegs = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegs);


    // ── Floating wireframe shapes ──
    const shapes: { mesh: THREE.Mesh; baseY: number; dir: number; initialColor: THREE.Color }[] = [];

    const addShape = (
      g: THREE.BufferGeometry, color: number,
      x: number, y: number, z: number, opacity: number
    ) => {
      const initialColor = new THREE.Color(color);
      const mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({
        color: initialColor, wireframe: true, transparent: true, opacity,
      }));
      mesh.position.set(x, y, z);
      scene.add(mesh);
      shapes.push({ mesh, baseY: y, dir: Math.random() > 0.5 ? 1 : -1, initialColor });
    };

    addShape(new THREE.TorusKnotGeometry(1.0, 0.28, 100, 16), 0x4F8EF7, 4.5, 1.0, -3, 0.07);
    addShape(new THREE.IcosahedronGeometry(0.8, 1), 0x7C3AED, -5.0, -1.5, -2, 0.09);
    addShape(new THREE.OctahedronGeometry(0.6), 0xF472B6, 3.0, -3.0, -1, 0.08);
    addShape(new THREE.TorusGeometry(0.7, 0.2, 12, 40), 0x38BDF8, -3.5, 2.5, -2, 0.07);

    // ── Mouse parallax ──
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 1.2;
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 0.8;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Click Interaction ──
    const onClick = (e: MouseEvent) => {
      const clickX = (e.clientX / window.innerWidth) * 2 - 1;
      const clickY = -(e.clientY / window.innerHeight) * 2 + 1;

      const vec = new THREE.Vector3(clickX, clickY, 0.5); // Z=0.5 for a point in front of camera
      vec.unproject(camera);

      const dir = vec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z; // Intersection with XY plane (Z=0)
      const clickWorldPos = camera.position.clone().add(dir.multiplyScalar(distance));

      mat.uniforms.uClickTime.value = clock.getElapsedTime();
      mat.uniforms.uClickPos.value.copy(clickWorldPos);

      // Generate a burst of new particles
      const burstCount = 50;
      for (let i = 0; i < burstCount; i++) {
        if (currentParticleCount < MAX_PARTICLES) {
          const index = currentParticleCount;
          positions[index * 3] = clickWorldPos.x + (Math.random() - 0.5) * 0.5;
          positions[index * 3 + 1] = clickWorldPos.y + (Math.random() - 0.5) * 0.5;
          positions[index * 3 + 2] = clickWorldPos.z + (Math.random() - 0.5) * 0.5;

          const c = palette[Math.floor(Math.random() * palette.length)];
          colors[index * 3] = c.r; colors[index * 3 + 1] = c.g; colors[index * 3 + 2] = c.b;
          speeds[index] = Math.random() * 0.8 + 0.4; // Faster initial speed for burst
          birthTimes[index] = clock.getElapsedTime(); // Mark birth time

          currentParticleCount++;
        }
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
      geo.attributes.speed.needsUpdate = true;
      geo.attributes.birthTime.needsUpdate = true;
      geo.setDrawRange(0, currentParticleCount);
    };
    window.addEventListener('mousedown', onClick);


    // ── Scroll ──
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Resize ──
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animate ──
    let raf: number;
    const clock = new THREE.Clock();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      mat.uniforms.uTime.value = t;
      mat.uniforms.uScroll.value = scrollY;
      mat.uniforms.uColorShift.value = t * 0.02; // Slowly shift hue over time

      lineMat.uniforms.uScroll.value = scrollY;
      lineMat.uniforms.uColorShift.value = t * 0.02; // Slowly shift hue over time for lines

      shapes.forEach(({ mesh, baseY, dir, initialColor }, i) => {
        const rotSpeeds = [
          [0.15, 0.10], [0.20, 0.12], [0.25, 0.18], [0.10, 0.08],
        ];
        mesh.rotation.x += 0.005 * rotSpeeds[i][0] * 10;
        mesh.rotation.y += 0.005 * rotSpeeds[i][1] * 10;
        mesh.position.y = baseY - scrollY * 0.002 * (i + 1) * dir * 0.5;

        // Apply color shift to shapes (if you want them to shift too)
        const hsv = initialColor.getHSL({ h: 0, s: 0, l: 0 });
        hsv.h = (hsv.h + t * 0.02) % 1; // Cycle hue
        (mesh.material as THREE.MeshBasicMaterial).color.setHSL(hsv.h, hsv.s, hsv.l);
      });

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onClick); // Remove click listener
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none' }}
    />
  );
}