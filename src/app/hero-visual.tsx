"use client";

import { useEffect, useRef } from "react";

type Point = {
  angle: number;
  radius: number;
  depth: number;
  speed: number;
  size: number;
};

export function HeroVisual() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const orbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const points: Point[] = Array.from({ length: 58 }, (_, index) => ({
      angle: (index / 58) * Math.PI * 2 + Math.sin(index * 1.91) * 0.25,
      radius: 80 + ((index * 41) % 190),
      depth: 0.28 + ((index * 17) % 72) / 100,
      speed: 0.00012 + ((index * 13) % 9) * 0.000018,
      size: 0.6 + ((index * 11) % 12) / 12
    }));

    let animation = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let lastTime = 0;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      lastTime = time;
      ctx.clearRect(0, 0, width, height);

      pointer.current.x += (pointer.current.targetX - pointer.current.x) * 0.06;
      pointer.current.y += (pointer.current.targetY - pointer.current.y) * 0.06;

      if (orbRef.current) {
        orbRef.current.style.setProperty("--orb-x", pointer.current.x.toString());
        orbRef.current.style.setProperty("--orb-y", pointer.current.y.toString());
      }

      const cx = width * 0.51 + pointer.current.x * 14;
      const cy = height * 0.49 + pointer.current.y * 12;
      const maxRadius = Math.min(width, height) * 0.5;

      const atmosphere = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius);
      atmosphere.addColorStop(0, "rgba(123,97,255,.15)");
      atmosphere.addColorStop(.38, "rgba(57,214,207,.035)");
      atmosphere.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = atmosphere;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = "rgba(255,255,255,.18)";
      ctx.lineWidth = 1;
      const grid = 58;
      for (let x = -grid; x < width + grid; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x + pointer.current.x * 8, 0);
        ctx.lineTo(x + pointer.current.x * 2, height);
        ctx.stroke();
      }
      for (let y = -grid; y < height + grid; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y + pointer.current.y * 6);
        ctx.lineTo(width, y + pointer.current.y * 2);
        ctx.stroke();
      }
      ctx.restore();

      const positions = points.map((point, index) => {
        const drift = time * point.speed + index * 0.31;
        const depthRadius = point.radius * (.66 + point.depth * .46);
        return {
          x: cx + Math.cos(point.angle + drift) * depthRadius,
          y: cy + Math.sin(point.angle + drift * 1.16) * depthRadius * .74,
          size: point.size * (.72 + point.depth * .6)
        };
      });

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < positions.length; i++) {
        const a = positions[i];
        for (let j = i + 1; j < positions.length; j++) {
          const b = positions[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 68) {
            ctx.strokeStyle = `rgba(123,97,255,${Math.max(0, .095 - distance / 900)})`;
            ctx.lineWidth = .6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(244,242,238,.5)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * .00005);
      [0.7, 0.88, 1.02].forEach((scale, index) => {
        ctx.save();
        ctx.rotate(index * .85);
        ctx.strokeStyle =
          index === 1 ? "rgba(215,181,116,.5)" :
          index === 2 ? "rgba(57,214,207,.28)" :
          "rgba(123,97,255,.42)";
        ctx.lineWidth = 1;
        ctx.setLineDash(index === 1 ? [8, 11] : [2, 9]);
        ctx.beginPath();
        ctx.ellipse(
          0, 0,
          maxRadius * scale * .45,
          maxRadius * scale * .16,
          index * .55,
          0,
          Math.PI * 2
        );
        ctx.stroke();
        ctx.restore();
      });
      ctx.restore();

      const pulse = 1 + Math.sin(time * .0012) * .03;
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100 * pulse);
      core.addColorStop(0, "rgba(215,203,255,.5)");
      core.addColorStop(.18, "rgba(123,97,255,.26)");
      core.addColorStop(.55, "rgba(57,214,207,.05)");
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, 100 * pulse, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = (time: number) => {
      draw(time);
      if (!reduceMotion.matches) animation = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: globalThis.PointerEvent) => {
      const rect = root.getBoundingClientRect();
      pointer.current.targetX = (event.clientX - rect.left) / rect.width - .5;
      pointer.current.targetY = (event.clientY - rect.top) / rect.height - .5;
    };
    const onPointerLeave = () => {
      pointer.current.targetX = 0;
      pointer.current.targetY = 0;
    };

    resize();
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);

    if (reduceMotion.matches) draw(0);
    else animation = requestAnimationFrame(tick);

    const onMotionChange = () => {
      cancelAnimationFrame(animation);
      if (reduceMotion.matches) draw(lastTime);
      else animation = requestAnimationFrame(tick);
    };

    reduceMotion.addEventListener?.("change", onMotionChange);

    return () => {
      cancelAnimationFrame(animation);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
      reduceMotion.removeEventListener?.("change", onMotionChange);
    };
  }, []);

  return (
    <div className="heroVisual" ref={rootRef} aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="visualScan" />
      <div className="visualVignette" />
      <div className="aiOrb" ref={orbRef}>
        <div className="orbAtmosphere" />
        <div className="orbRing orbRingA" />
        <div className="orbRing orbRingB" />
        <div className="orbRing orbRingC" />
        <div className="orbSphere">
          <span className="orbHighlight" />
          <span className="orbCore" />
          <span className="orbCorePulse" />
        </div>
      </div>
      <div className="visualMeta visualMetaTop">
        <span>TR / 01</span>
        <span>CREATIVE ENGINE</span>
      </div>
      <div className="visualMeta visualMetaBottom">
        <span>AI / ACTIVE</span>
        <span>PARALLAX / 03</span>
      </div>
      <div className="visualAxis axisX" />
      <div className="visualAxis axisY" />
    </div>
  );
}
