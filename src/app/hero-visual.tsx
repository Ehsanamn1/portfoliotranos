"use client";

import { PointerEvent, useEffect, useRef } from "react";

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

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const points: Point[] = Array.from({ length: 84 }, (_, index) => {
      const angle = (index / 84) * Math.PI * 2 + Math.sin(index * 1.91) * 0.25;
      return {
        angle,
        radius: 78 + ((index * 37) % 185),
        depth: 0.28 + ((index * 17) % 72) / 100,
        speed: 0.00016 + ((index * 13) % 9) * 0.000018,
        size: 0.7 + ((index * 11) % 12) / 10
      };
    });

    let frame = 0;
    let animation = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

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
      ctx.clearRect(0, 0, width, height);

      pointer.current.x += (pointer.current.targetX - pointer.current.x) * 0.055;
      pointer.current.y += (pointer.current.targetY - pointer.current.y) * 0.055;
      if (orbRef.current) {
        orbRef.current.style.setProperty("--orb-x", pointer.current.x.toString());
        orbRef.current.style.setProperty("--orb-y", pointer.current.y.toString());
      }

      const px = pointer.current.x * 18;
      const py = pointer.current.y * 14;
      const cx = width * 0.52 + px;
      const cy = height * 0.48 + py;
      const maxRadius = Math.min(width, height) * 0.48;

      const atmosphere = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius);
      atmosphere.addColorStop(0, "rgba(118,89,255,0.14)");
      atmosphere.addColorStop(0.38, "rgba(45,212,206,0.035)");
      atmosphere.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = atmosphere;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalAlpha = 0.13;
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      ctx.lineWidth = 1;
      const grid = 64;
      const skewX = pointer.current.x * 9;
      const skewY = pointer.current.y * 7;

      for (let x = -grid; x < width + grid; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x + skewX, 0);
        ctx.lineTo(x + skewX * 0.3, height);
        ctx.stroke();
      }

      for (let y = -grid; y < height + grid; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y + skewY);
        ctx.lineTo(width, y + skewY * 0.45);
        ctx.stroke();
      }
      ctx.restore();

      const positions = points.map((point, index) => {
        const drift = time * point.speed + index * 0.31;
        const depthRadius = point.radius * (0.65 + point.depth * 0.5);
        return {
          x: cx + Math.cos(point.angle + drift) * depthRadius,
          y: cy + Math.sin(point.angle + drift * 1.18) * depthRadius * 0.76,
          size: point.size * (0.7 + point.depth * 0.6)
        };
      });

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < positions.length; i++) {
        const a = positions[i];
        for (let j = i + 1; j < positions.length; j++) {
          const b = positions[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 74) {
            ctx.strokeStyle = `rgba(118,89,255,${Math.max(0, 0.11 - distance / 900)})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(244,242,238,0.48)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.00006);
      [0.68, 0.86, 1.02].forEach((scale, index) => {
        ctx.save();
        ctx.rotate(index * 0.9);
        ctx.strokeStyle = index === 1 ? "rgba(213,176,108,0.52)" : "rgba(118,89,255,0.46)";
        ctx.lineWidth = 1;
        ctx.setLineDash(index === 1 ? [7, 10] : [2, 9]);
        ctx.beginPath();
        ctx.ellipse(0, 0, maxRadius * scale * 0.46, maxRadius * scale * 0.17, index * 0.55, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });
      ctx.restore();

      ctx.save();
      const pulse = 1 + Math.sin(time * 0.0012) * 0.03;
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90 * pulse);
      core.addColorStop(0, "rgba(210,196,255,0.5)");
      core.addColorStop(0.2, "rgba(118,89,255,0.25)");
      core.addColorStop(0.56, "rgba(45,212,206,0.06)");
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, 90 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const tick = (time: number) => {
      draw(time);
      if (!media.matches) animation = requestAnimationFrame(tick);
    };

    const onResize = () => resize();
    const onPointerMove = (event: globalThis.PointerEvent) => {
      const rect = root.getBoundingClientRect();
      pointer.current.targetX = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.current.targetY = (event.clientY - rect.top) / rect.height - 0.5;
    };
    const onPointerLeave = () => {
      pointer.current.targetX = 0;
      pointer.current.targetY = 0;
    };

    resize();
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);

    if (media.matches) {
      draw(0);
    } else {
      animation = requestAnimationFrame(tick);
    }

    const onMotionChange = () => {
      cancelAnimationFrame(animation);
      if (media.matches) {
        draw(frame);
      } else {
        animation = requestAnimationFrame(tick);
      }
    };

    media.addEventListener?.("change", onMotionChange);

    return () => {
      cancelAnimationFrame(animation);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      media.removeEventListener?.("change", onMotionChange);
    };
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current.targetX = (event.clientX - rect.left) / rect.width - 0.5;
    pointer.current.targetY = (event.clientY - rect.top) / rect.height - 0.5;
  }

  return (
    <div
      className="heroVisual"
      ref={rootRef}
      onPointerMove={handlePointerMove}
      aria-hidden="true"
    >
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
        <span>PARALLAX 03D</span>
      </div>
      <div className="visualAxis axisX" />
      <div className="visualAxis axisY" />
    </div>
  );
}
