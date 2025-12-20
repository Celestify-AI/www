"use client";

import React, { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh, Color, Vec2 } from "ogl";

// --- Types & Constants ---
export type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

interface LightRaysProps {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

const DEFAULT_COLOR = "#ffffff";

// --- Shaders ---
const VERTEX_SHADER = /* glsl */ `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec2 rayPos;
  uniform vec2 rayDir;
  uniform vec3 raysColor;
  uniform float raysSpeed;
  uniform float lightSpread;
  uniform float rayLength;
  uniform float pulsating;
  uniform float fadeDistance;
  uniform float saturation;
  uniform vec2 mousePos;
  uniform float mouseInfluence;
  uniform float noiseAmount;
  uniform float distortion;

  varying vec2 vUv;

  float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
    vec2 sourceToCoord = coord - raySource;
    vec2 dirNorm = normalize(sourceToCoord);
    float cosAngle = dot(dirNorm, rayRefDirection);
    float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
    float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));
    float distance = length(sourceToCoord);
    float maxDistance = iResolution.x * rayLength;
    float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
    float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
    float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;
    float baseStrength = clamp(
      (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
      (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
      0.0, 1.0
    );
    return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
  }

  void main() {
    vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
    vec2 finalRayDir = rayDir;

    if (mouseInfluence > 0.0) {
      vec2 mouseScreenPos = mousePos * iResolution.xy;
      vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
      finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
    }

    float r1 = rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
    float r2 = rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);

    vec3 envBg = vec3(0.094, 0.094, 0.094); // #181818

    float combinedStrength = r1 * 0.5 + r2 * 0.4;
    float rayMask = smoothstep(0.02, 0.25, combinedStrength);

    vec3 rayColorOutput = vec3(combinedStrength);

    if (noiseAmount > 0.0) {
      float n = noise(coord * 0.01 + iTime * 0.1);
      rayColorOutput *= (1.0 - noiseAmount + noiseAmount * n);
    }

    // Neutral brightness (no blue tint)
    float brightness = 1.0 - (coord.y / iResolution.y);
    rayColorOutput *= 0.3 + brightness * 0.7;

    if (saturation != 1.0) {
      float gray = dot(rayColorOutput, vec3(0.299, 0.587, 0.114));
      rayColorOutput = mix(vec3(gray), rayColorOutput, saturation);
    }

    // --- Vertical taper to envBg at the bottom ---
    float taper = smoothstep(0.0, 0.2 * iResolution.y, iResolution.y - coord.y); // bottom 15% fades
    rayColorOutput *= taper;
    rayMask *= taper;

    // Final blending
    vec3 finalColor = rayMask > 0.0 ? mix(envBg, rayColorOutput * raysColor, rayMask) : envBg;

    // Slight translucency
    float alpha = rayMask * 0.55;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// --- Helpers ---
const getAnchorAndDir = (origin: RaysOrigin, w: number, h: number) => {
  const outside = 0.2;
  const map: Record<
    RaysOrigin,
    { anchor: [number, number]; dir: [number, number] }
  > = {
    "top-left": { anchor: [0, -outside * h], dir: [0, 1] },
    "top-right": { anchor: [w, -outside * h], dir: [0, 1] },
    "top-center": { anchor: [0.5 * w, -outside * h], dir: [0, 1] },
    left: { anchor: [-outside * w, 0.5 * h], dir: [1, 0] },
    right: { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] },
    "bottom-left": { anchor: [0, (1 + outside) * h], dir: [0, -1] },
    "bottom-center": { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] },
    "bottom-right": { anchor: [w, (1 + outside) * h], dir: [0, -1] },
  };
  return map[origin] || map["top-center"];
};

const LightRays: React.FC<LightRaysProps> = ({
  raysOrigin = "top-center",
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const programRef = useRef<Program | null>(null);
  const requestRef = useRef<number>(null);

  const mousePos = useRef(new Vec2(0.5, 0.5));
  const smoothMouse = useRef(new Vec2(0.5, 0.5));
  const [isVisible, setIsVisible] = useState(true);

  // 1. Visibility Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.01 },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Initialization (Runs Once)
  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    const gl = renderer.gl;

    gl.canvas.style.display = "block";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    rendererRef.current = renderer;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec2() },
        rayPos: { value: new Vec2() },
        rayDir: { value: new Vec2() },
        raysColor: { value: new Color(raysColor) },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1 : 0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: new Vec2(0.5, 0.5) },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion },
      },
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });
    containerRef.current.appendChild(gl.canvas);

    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth: w, clientHeight: h } = containerRef.current;
      renderer.setSize(w, h);
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height);

      const { anchor, dir } = getAnchorAndDir(
        raysOrigin,
        gl.canvas.width,
        gl.canvas.height,
      );
      program.uniforms.rayPos.value.set(anchor[0], anchor[1]);
      program.uniforms.rayDir.value.set(dir[0], dir[1]);
    };

    const update = (t: number) => {
      // Always request the next frame so the loop stays alive
      requestRef.current = requestAnimationFrame(update);

      // Only perform GL operations if visible
      if (!isVisible || !programRef.current || !rendererRef.current) return;

      const program = programRef.current;
      const renderer = rendererRef.current;

      program.uniforms.iTime.value = t * 0.001;

      if (followMouse) {
        smoothMouse.current.lerp(mousePos.current, 0.08);
        program.uniforms.mousePos.value.copy(smoothMouse.current);
      }

      renderer.render({ scene: mesh });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // Initialization only depends on mounting
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3. Update Uniforms when props change (Reactive Layer)
  useEffect(() => {
    const program = programRef.current;
    if (!program) return;

    program.uniforms.raysColor.value.set(raysColor);
    program.uniforms.raysSpeed.value = raysSpeed;
    program.uniforms.lightSpread.value = lightSpread;
    program.uniforms.rayLength.value = rayLength;
    program.uniforms.pulsating.value = pulsating ? 1 : 0;
    program.uniforms.fadeDistance.value = fadeDistance;
    program.uniforms.saturation.value = saturation;
    program.uniforms.mouseInfluence.value = mouseInfluence;
    program.uniforms.noiseAmount.value = noiseAmount;
    program.uniforms.distortion.value = distortion;

    // Re-calculate anchor/dir if origin changes
    const canvas = rendererRef.current?.gl.canvas;
    if (canvas) {
      const { anchor, dir } = getAnchorAndDir(
        raysOrigin,
        canvas.width,
        canvas.height,
      );
      program.uniforms.rayPos.value.set(anchor[0], anchor[1]);
      program.uniforms.rayDir.value.set(dir[0], dir[1]);
    }
  }, [
    raysColor,
    raysSpeed,
    lightSpread,
    raysOrigin,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    mouseInfluence,
    noiseAmount,
    distortion,
  ]);

  // 4. Mouse Move Listener
  useEffect(() => {
    if (!followMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current.set(
        (e.clientX - rect.left) / rect.width,
        (e.clientY - rect.top) / rect.height,
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [followMouse]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full pointer-events-none z-10 overflow-hidden relative ${className}`.trim()}
    />
  );
};

export { LightRays };
