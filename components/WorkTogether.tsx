import React, { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

// --- 1. SHADERS ORIGINAIS (SEM ALTERAÇÕES LÓGICAS) ---

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Truque para renderizar o plano em tela cheia sem depender da câmera
    gl_Position = vec4(position, 1.0); 
  }
`;

// Fragment Shader copiado integralmente do seu código Vanilla JS
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform vec3 uColor5;
  uniform vec3 uColor6;
  uniform float uSpeed;
  uniform float uIntensity;
  uniform sampler2D uTouchTexture;
  uniform float uGrainIntensity;
  uniform vec3 uDarkNavy;
  uniform float uGradientSize;
  uniform float uGradientCount;
  uniform float uColor1Weight;
  uniform float uColor2Weight;
  
  varying vec2 vUv;
  
  // Grain function
  float grain(vec2 uv, float time) {
    vec2 grainUv = uv * uResolution * 0.5;
    float grainValue = fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453);
    return grainValue * 2.0 - 1.0;
  }
  
  vec3 getGradientColor(vec2 uv, float time) {
    float gradientRadius = uGradientSize;
    
    // Centros animados (1 a 6)
    vec2 center1 = vec2(0.5 + sin(time * uSpeed * 0.4) * 0.4, 0.5 + cos(time * uSpeed * 0.5) * 0.4);
    vec2 center2 = vec2(0.5 + cos(time * uSpeed * 0.6) * 0.5, 0.5 + sin(time * uSpeed * 0.45) * 0.5);
    vec2 center3 = vec2(0.5 + sin(time * uSpeed * 0.35) * 0.45, 0.5 + cos(time * uSpeed * 0.55) * 0.45);
    vec2 center4 = vec2(0.5 + cos(time * uSpeed * 0.5) * 0.4, 0.5 + sin(time * uSpeed * 0.4) * 0.4);
    vec2 center5 = vec2(0.5 + sin(time * uSpeed * 0.7) * 0.35, 0.5 + cos(time * uSpeed * 0.6) * 0.35);
    vec2 center6 = vec2(0.5 + cos(time * uSpeed * 0.45) * 0.5, 0.5 + sin(time * uSpeed * 0.65) * 0.5);
    
    // Centros extras (7 a 12) - usados se uGradientCount > 6
    vec2 center7 = vec2(0.5 + sin(time * uSpeed * 0.55) * 0.38, 0.5 + cos(time * uSpeed * 0.48) * 0.42);
    vec2 center8 = vec2(0.5 + cos(time * uSpeed * 0.65) * 0.36, 0.5 + sin(time * uSpeed * 0.52) * 0.44);
    vec2 center9 = vec2(0.5 + sin(time * uSpeed * 0.42) * 0.41, 0.5 + cos(time * uSpeed * 0.58) * 0.39);
    vec2 center10 = vec2(0.5 + cos(time * uSpeed * 0.48) * 0.37, 0.5 + sin(time * uSpeed * 0.62) * 0.43);
    vec2 center11 = vec2(0.5 + sin(time * uSpeed * 0.68) * 0.33, 0.5 + cos(time * uSpeed * 0.44) * 0.46);
    vec2 center12 = vec2(0.5 + cos(time * uSpeed * 0.38) * 0.39, 0.5 + sin(time * uSpeed * 0.56) * 0.41);
    
    // Distâncias
    float dist1 = length(uv - center1);
    float dist2 = length(uv - center2);
    float dist3 = length(uv - center3);
    float dist4 = length(uv - center4);
    float dist5 = length(uv - center5);
    float dist6 = length(uv - center6);
    float dist7 = length(uv - center7);
    float dist8 = length(uv - center8);
    float dist9 = length(uv - center9);
    float dist10 = length(uv - center10);
    float dist11 = length(uv - center11);
    float dist12 = length(uv - center12);
    
    // Influências
    float influence1 = 1.0 - smoothstep(0.0, gradientRadius, dist1);
    float influence2 = 1.0 - smoothstep(0.0, gradientRadius, dist2);
    float influence3 = 1.0 - smoothstep(0.0, gradientRadius, dist3);
    float influence4 = 1.0 - smoothstep(0.0, gradientRadius, dist4);
    float influence5 = 1.0 - smoothstep(0.0, gradientRadius, dist5);
    float influence6 = 1.0 - smoothstep(0.0, gradientRadius, dist6);
    float influence7 = 1.0 - smoothstep(0.0, gradientRadius, dist7);
    float influence8 = 1.0 - smoothstep(0.0, gradientRadius, dist8);
    float influence9 = 1.0 - smoothstep(0.0, gradientRadius, dist9);
    float influence10 = 1.0 - smoothstep(0.0, gradientRadius, dist10);
    float influence11 = 1.0 - smoothstep(0.0, gradientRadius, dist11);
    float influence12 = 1.0 - smoothstep(0.0, gradientRadius, dist12);
    
    // Rotação para overlays radiais
    vec2 rotatedUv1 = uv - 0.5;
    float angle1 = time * uSpeed * 0.15;
    rotatedUv1 = vec2(rotatedUv1.x * cos(angle1) - rotatedUv1.y * sin(angle1), rotatedUv1.x * sin(angle1) + rotatedUv1.y * cos(angle1));
    rotatedUv1 += 0.5;
    
    vec2 rotatedUv2 = uv - 0.5;
    float angle2 = -time * uSpeed * 0.12;
    rotatedUv2 = vec2(rotatedUv2.x * cos(angle2) - rotatedUv2.y * sin(angle2), rotatedUv2.x * sin(angle2) + rotatedUv2.y * cos(angle2));
    rotatedUv2 += 0.5;
    
    float radialGradient1 = length(rotatedUv1 - 0.5);
    float radialGradient2 = length(rotatedUv2 - 0.5);
    float radialInfluence1 = 1.0 - smoothstep(0.0, 0.8, radialGradient1);
    float radialInfluence2 = 1.0 - smoothstep(0.0, 0.8, radialGradient2);
    
    // Mistura de cores
    vec3 color = vec3(0.0);
    color += uColor1 * influence1 * (0.55 + 0.45 * sin(time * uSpeed)) * uColor1Weight;
    color += uColor2 * influence2 * (0.55 + 0.45 * cos(time * uSpeed * 1.2)) * uColor2Weight;
    color += uColor3 * influence3 * (0.55 + 0.45 * sin(time * uSpeed * 0.8)) * uColor1Weight;
    color += uColor4 * influence4 * (0.55 + 0.45 * cos(time * uSpeed * 1.3)) * uColor2Weight;
    color += uColor5 * influence5 * (0.55 + 0.45 * sin(time * uSpeed * 1.1)) * uColor1Weight;
    color += uColor6 * influence6 * (0.55 + 0.45 * cos(time * uSpeed * 0.9)) * uColor2Weight;
    
    if (uGradientCount > 6.0) {
      color += uColor1 * influence7 * (0.55 + 0.45 * sin(time * uSpeed * 1.4)) * uColor1Weight;
      color += uColor2 * influence8 * (0.55 + 0.45 * cos(time * uSpeed * 1.5)) * uColor2Weight;
      color += uColor3 * influence9 * (0.55 + 0.45 * sin(time * uSpeed * 1.6)) * uColor1Weight;
      color += uColor4 * influence10 * (0.55 + 0.45 * cos(time * uSpeed * 1.7)) * uColor2Weight;
    }
    if (uGradientCount > 10.0) {
      color += uColor5 * influence11 * (0.55 + 0.45 * sin(time * uSpeed * 1.8)) * uColor1Weight;
      color += uColor6 * influence12 * (0.55 + 0.45 * cos(time * uSpeed * 1.9)) * uColor2Weight;
    }
    
    color += mix(uColor1, uColor3, radialInfluence1) * 0.45 * uColor1Weight;
    color += mix(uColor2, uColor4, radialInfluence2) * 0.4 * uColor2Weight;
    
    color = clamp(color, vec3(0.0), vec3(1.0)) * uIntensity;
    
    // Saturação e Contraste
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(luminance), color, 1.35);
    color = pow(color, vec3(0.92)); 
    
    // Navy Base blending
    float brightness1 = length(color);
    float mixFactor1 = max(brightness1 * 1.2, 0.15);
    color = mix(uDarkNavy, color, mixFactor1);
    
    // Cap brightness
    float maxBrightness = 1.0;
    float brightness = length(color);
    if (brightness > maxBrightness) {
      color = color * (maxBrightness / brightness);
    }
    
    return color;
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Distorção do Touch
    vec4 touchTex = texture2D(uTouchTexture, uv);
    float vx = -(touchTex.r * 2.0 - 1.0);
    float vy = -(touchTex.g * 2.0 - 1.0);
    float intensity = touchTex.b;
    
    uv.x += vx * 0.8 * intensity;
    uv.y += vy * 0.8 * intensity;
    
    // Ripple effect
    vec2 center = vec2(0.5);
    float dist = length(uv - center);
    float ripple = sin(dist * 20.0 - uTime * 3.0) * 0.04 * intensity;
    float wave = sin(dist * 15.0 - uTime * 2.0) * 0.03 * intensity;
    uv += vec2(ripple + wave);
    
    vec3 color = getGradientColor(uv, uTime);
    
    // Film Grain
    float grainValue = grain(uv, uTime);
    color += grainValue * uGrainIntensity;
    
    // Color shift
    float timeShift = uTime * 0.5;
    color.r += sin(timeShift) * 0.02;
    color.g += cos(timeShift * 1.4) * 0.02;
    color.b += sin(timeShift * 1.2) * 0.02;
    
    // Mix final com Navy
    float brightness2 = length(color);
    float mixFactor2 = max(brightness2 * 1.2, 0.15);
    color = mix(uDarkNavy, color, mixFactor2);
    
    color = clamp(color, vec3(0.0), vec3(1.0));
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// --- 2. CLASSE TOUCH TEXTURE (Lógica de Física/Canvas) ---

class TouchTexture {
  size: number;
  maxAge: number;
  radius: number;
  trail: Array<{ x: number; y: number; age: number; force: number; vx: number; vy: number }>;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  texture: THREE.Texture;
  last: { x: number; y: number } | null;

  constructor() {
    this.size = 64;
    this.maxAge = 64;
    this.radius = 0.25 * this.size;
    this.trail = [];
    this.last = null;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.size, this.size);

    this.texture = new THREE.Texture(this.canvas);
  }

  update() {
    this.clear();
    const speed = 1 / this.maxAge;

    for (let i = this.trail.length - 1; i >= 0; i--) {
      const point = this.trail[i];
      let f = point.force * speed * (1 - point.age / this.maxAge);
      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age++;

      if (point.age > this.maxAge) {
        this.trail.splice(i, 1);
      } else {
        this.drawPoint(point);
      }
    }
    this.texture.needsUpdate = true;
  }

  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addTouch(x: number, y: number) {
    let force = 0;
    let vx = 0;
    let vy = 0;
    
    if (this.last) {
      const dx = x - this.last.x;
      const dy = y - this.last.y;
      if (dx === 0 && dy === 0) return;
      
      const dd = dx * dx + dy * dy;
      const d = Math.sqrt(dd);
      
      vx = dx / d;
      vy = dy / d;
      force = Math.min(dd * 20000, 2.0);
    }
    
    this.last = { x, y };
    this.trail.push({ x, y, age: 0, force, vx, vy });
  }

  drawPoint(point: { x: number; y: number; age: number; force: number; vx: number; vy: number }) {
    const pos = {
      x: point.x * this.size,
      y: (1 - point.y) * this.size
    };

    let intensity = 1;
    if (point.age < this.maxAge * 0.3) {
      intensity = Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2));
    } else {
      const t = 1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
      intensity = -t * (t - 2);
    }
    intensity *= point.force;

    const radius = this.radius;
    // O shader espera os vetores nos canais R e G e a intensidade no B
    // A fórmula é: color = (vx+1)/2, (vy+1)/2, intensity
    let color = `${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255}, ${intensity * 255}`;
    
    let offset = this.size * 5;
    this.ctx.shadowOffsetX = offset;
    this.ctx.shadowOffsetY = offset;
    this.ctx.shadowBlur = radius * 1;
    this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255,0,0,1)";
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

// --- 3. COMPONENTE REACT THREE FIBER ---

const LiquidBackground: React.FC = () => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  
  const touchTexture = useMemo(() => new TouchTexture(), []);

  // CONFIGURAÇÃO IDENTICA AO SCHEME 2 DO SEU CÓDIGO
  const uniforms = useMemo(() => {
    // Scheme 2 Colors
    // Coral Red-Orange: 1.0, 0.424, 0.314
    // Turquoise: 0.251, 0.878, 0.816
    const coral = new THREE.Vector3(1.0, 0.424, 0.314);
    const turquoise = new THREE.Vector3(0.251, 0.878, 0.816);
    const navy = new THREE.Vector3(0.0, 0.0, 0.0);

    return {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uTouchTexture: { value: touchTexture.texture },
      
      // Cores alternadas como no Scheme 2
      uColor1: { value: coral },
      uColor2: { value: turquoise },
      uColor3: { value: coral },
      uColor4: { value: turquoise },
      uColor5: { value: coral },
      uColor6: { value: turquoise },
      
      // PARÂMETROS CRÍTICOS DO SCHEME 2
      uDarkNavy: { value: navy },
      uGradientSize: { value: 0.6 },   // Scheme 2 usa 1.0 (bolas grandes)
      uGradientCount: { value: 6.0 },  // Scheme 2 usa apenas 6 centros
      uSpeed: { value: 1.2 },          // Velocidade do Scheme 2
      uColor1Weight: { value: 1.0 },   // Pesos iguais
      uColor2Weight: { value: 1.0 },
      
      // Outros
      uIntensity: { value: 1.8 },
      uGrainIntensity: { value: 0.02 },
      uZoom: { value: 1.0 }
    };
  }, [touchTexture, size]);

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta;
      touchTexture.update();
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const workTogetherSection = document.getElementById('work-together-section');
      if (!workTogetherSection) return;
      
      const rect = workTogetherSection.getBoundingClientRect();
      const isInSection = e.clientY >= rect.top && e.clientY <= rect.bottom;
      
      if (isInSection) {
        const x = e.clientX / window.innerWidth;
        // Inversão do Y para alinhar coordenadas de tela com WebGL
        const y = 1 - (e.clientY / window.innerHeight);
        touchTexture.addTouch(x, y);
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [touchTexture]);

  return (
    <mesh>
      {/* PlaneGeometry cobrindo 2x2 clipspace */}
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// --- 4. LAYOUT PRINCIPAL ---

const WorkTogether: React.FC = () => {
  const [maceioTime, setMaceioTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const maceioTimeString = now.toLocaleTimeString('pt-BR', {
        timeZone: 'America/Maceio',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setMaceioTime(maceioTimeString);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="work-together-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden"
      style={{ fontFamily: "'Syne', sans-serif", backgroundColor: '#000000' }}
    >
      <div className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }}>
        <Canvas
          dpr={[1, 2]} // Performance: Max pixel ratio de 2
          orthographic
          camera={{ zoom: 1, position: [0, 0, 100] }}
          gl={{ 
            antialias: true, 
            powerPreference: "high-performance",
            alpha: false 
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <LiquidBackground />
        </Canvas>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pointer-events-none">
        <h2 
          className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-center mb-16 text-white transition-colors duration-700 pointer-events-auto"
          style={{
            textShadow: '0 2px 20px rgba(0,0,0,0.5)'
          }}
        >
          Let's work <br /> <span className="opacity-50">together?</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 max-w-2xl pointer-events-auto">
          {[
            { label: "Email", link: "mailto:jg.vieira.dev@gmail.com" },
            { label: "Schedule Meeting", link: "https://cal.com/jose-gabriel-mulcbp" },
            { label: "LinkedIn", link: "https://www.linkedin.com/in/gabriel-work/" }
          ].map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 
                         text-white font-bold uppercase tracking-widest text-xs shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:bg-white hover:text-black hover:border-white cursor-pointer"
            >
              {item.label}
              <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      <footer className="relative z-10 w-full p-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pointer-events-auto">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="text-[12px] font-bold tracking-[0.3em] uppercase opacity-100 text-white">
            © 2026 JOSÉ GABRIEL — UFAL COMPUTER ENGINEERING
          </div>
          <div className="text-[12px] font-bold tracking-[0.2em] uppercase opacity-100 text-white">
            MACEIÓ, AL — {maceioTime}
          </div>
        </div>
        
        <div className="flex gap-6 text-white">
          <a href="https://github.com/josegabriel" target="_blank" rel="noopener noreferrer" className="opacity-100 hover:opacity-100 transition-opacity cursor-pointer">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </footer>
    </section>
  );
};

export default WorkTogether;