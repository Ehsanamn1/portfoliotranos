"use client";

import { useRef } from "react";

export default function ThreeShowcase() {
  const ref=useRef<HTMLDivElement|null>(null);
  function move(event:React.PointerEvent<HTMLDivElement>){
    const el=ref.current;if(!el)return;
    const r=el.getBoundingClientRect();const x=(event.clientX-r.left)/r.width-.5;const y=(event.clientY-r.top)/r.height-.5;
    el.style.setProperty("--scene-x",String(x));el.style.setProperty("--scene-y",String(y));
  }
  function leave(){ref.current?.style.setProperty("--scene-x","0");ref.current?.style.setProperty("--scene-y","0");}
  return (
    <div className="tx-showcase-stage tx-reveal" ref={ref} onPointerMove={move} onPointerLeave={leave}>
      <div className="tx-showcase-grid"/><div className="tx-showcase-orb"><div className="tx-showcase-orb-core"/><div className="tx-showcase-orbit orbit-a"/><div className="tx-showcase-orbit orbit-b"/><div className="tx-showcase-orbit orbit-c"/></div>
      <div className="tx-showcase-label top">3D / INTERACTIVE / 01</div><div className="tx-showcase-label bottom">MOVE YOUR CURSOR</div>
      <div className="tx-showcase-caption"><span>AI SYSTEM / ABSTRACT NEURAL OBJECT</span><b>PARALLAX ACTIVE</b></div>
    </div>
  );
}
