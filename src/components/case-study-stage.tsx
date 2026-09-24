"use client";

import { PointerEvent, useRef, type CSSProperties } from "react";

export default function CaseStudyStage({title,category,imageUrl}:{title:string;category:string;imageUrl?:string|null}){
 const ref=useRef<HTMLDivElement|null>(null);
 function move(event:PointerEvent<HTMLDivElement>){
  const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();
  const x=(event.clientX-r.left)/r.width-.5;const y=(event.clientY-r.top)/r.height-.5;
  el.style.setProperty("--rx",`${y*-7}deg`);el.style.setProperty("--ry",`${x*9}deg`);el.style.setProperty("--mx",`${x*24}px`);el.style.setProperty("--my",`${y*18}px`);
 }
 function leave(){ref.current?.style.setProperty("--rx","0deg");ref.current?.style.setProperty("--ry","0deg");ref.current?.style.setProperty("--mx","0px");ref.current?.style.setProperty("--my","0px");}
 const image=imageUrl||"/work/"+title.toLowerCase().replace(/[^a-z0-9]+/g,"-")+".svg";
 return <div className="case-stage" ref={ref} onPointerMove={move} onPointerLeave={leave}>
  <div className="case-stage-grid"/>
  <div className="case-stage-glow"/>
  <div className="case-browser" style={{"--image":`url(${image})`} as CSSProperties}>
   <div className="case-browser-top"><span/><span/><span/><b>TR / CASE STUDY</b></div>
   <div className="case-browser-screen">
    <div className="case-screen-image"/>
    <div className="case-screen-copy"><small>{category}</small><strong>{title}</strong><i/><em>Design / AI / Engineering</em></div>
   </div>
  </div>
  <div className="case-float case-float-a">01 / SYSTEM</div>
  <div className="case-float case-float-b">INTERACTION / 03D</div>
  <div className="case-float case-float-c">TRANOS / 2026</div>
  <div className="case-depth-layer"/>
 </div>;
}
