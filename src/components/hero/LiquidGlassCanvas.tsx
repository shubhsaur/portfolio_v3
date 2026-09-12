"use client";

import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uAccent;
uniform vec2 uResolution;
uniform vec2 uRipple;
uniform float uRippleAge;

out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  float t = uTime * 0.15;
  vec2 flow = vec2(
    fbm(p * 1.6 + vec2(t, -t * 0.7)),
    fbm(p * 1.6 + vec2(-t * 0.6, t * 0.9))
  );
  vec2 distorted = p + (flow - 0.5) * 0.35;

  float field = fbm(distorted * 2.4 + t * 0.4);
  float glass = smoothstep(0.25, 0.85, field);

  vec2 pointer = (uPointer - 0.5) * vec2(aspect, 1.0);
  float pointerDist = length(p - pointer);
  float pointerGlow = exp(-pointerDist * 3.2) * 0.22;

  float ripple = 0.0;
  if (uRippleAge < 0.4 && uRippleAge >= 0.0) {
    vec2 rippleP = (uRipple - 0.5) * vec2(aspect, 1.0);
    float d = length(p - rippleP);
    float wave = sin((d - uRippleAge * 2.5) * 28.0);
    float envelope = (1.0 - uRippleAge / 0.4) * exp(-d * 4.0);
    ripple = wave * envelope * 0.18;
  }

  vec3 base = vec3(0.024, 0.024, 0.039);
  vec3 wash = uAccent * (0.08 + glass * 0.14 + pointerGlow);
  vec3 highlight = mix(uAccent, vec3(1.0), 0.35) * (glass * 0.12 + max(ripple, 0.0));

  float vignette = smoothstep(1.25, 0.25, length(p));
  vec3 color = base + wash + highlight;
  color *= vignette;

  float alpha = 0.42 + glass * 0.18 + pointerGlow * 0.2;
  fragColor = vec4(color, clamp(alpha, 0.0, 0.65));
}
`;

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("LiquidGlass: shader compile failed", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("LiquidGlass: program link failed", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function parseAccentRgb(): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--ln-accent")
    .trim();

  if (raw.startsWith("#")) {
    const hex = raw.slice(1);
    const full =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex;
    const n = Number.parseInt(full, 16);
    if (!Number.isNaN(n)) {
      return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
    }
  }

  const rgb = raw.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgb) {
    return [
      Number(rgb[1]) / 255,
      Number(rgb[2]) / 255,
      Number(rgb[3]) / 255,
    ];
  }

  return [232 / 255, 197 / 255, 71 / 255];
}

export function LiquidGlassCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });

    if (!gl) {
      console.warn("LiquidGlass: WebGL2 unavailable");
      return;
    }

    const program = createProgram(gl);
    if (!program) return;

    const vao = gl.createVertexArray();
    const buffer = gl.createBuffer();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "uTime");
    const uPointer = gl.getUniformLocation(program, "uPointer");
    const uAccent = gl.getUniformLocation(program, "uAccent");
    const uRes = gl.getUniformLocation(program, "uResolution");
    const uRipple = gl.getUniformLocation(program, "uRipple");
    const uRippleAge = gl.getUniformLocation(program, "uRippleAge");

    let raf = 0;
    let running = true;
    let visible = true;
    let pageVisible = !document.hidden;
    let start = performance.now();
    let lastFrame = start;
    let slowFrames = 0;
    let pointer: [number, number] = [0.5, 0.5];
    let accent = parseAccentRgb();
    let ripple: [number, number] = [0.5, 0.5];
    let rippleStart = -1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
    };

    const draw = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(draw);

      if (!visible || !pageVisible) {
        lastFrame = now;
        return;
      }

      const delta = now - lastFrame;
      lastFrame = now;
      if (delta > 100) {
        slowFrames += 1;
        if (slowFrames >= 8) {
          running = false;
          console.warn("LiquidGlass: paused after thermal throttle");
          return;
        }
      } else {
        slowFrames = 0;
      }

      resize();
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const t = (now - start) / 1000;
      const rippleAge =
        rippleStart < 0 ? 1 : Math.min(1, (now - rippleStart) / 1000);

      gl.uniform1f(uTime, t);
      gl.uniform2f(uPointer, pointer[0], 1 - pointer[1]);
      gl.uniform3f(uAccent, accent[0], accent[1], accent[2]);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uRipple, ripple[0], 1 - ripple[1]);
      gl.uniform1f(uRippleAge, rippleAge);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointer = [
        (event.clientX - rect.left) / rect.width,
        (event.clientY - rect.top) / rect.height,
      ];
    };

    const onPointerDown = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      ripple = [
        (event.clientX - rect.left) / rect.width,
        (event.clientY - rect.top) / rect.height,
      ];
      rippleStart = performance.now();
    };

    const accentObserver = new MutationObserver(() => {
      accent = parseAccentRgb();
    });
    accentObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-accent", "data-color-mode", "class", "style"],
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      pageVisible = !document.hidden;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", resize);

    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      accentObserver.disconnect();
      io.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={["pointer-events-none h-full w-full", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
