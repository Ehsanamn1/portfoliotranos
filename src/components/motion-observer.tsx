"use client";

import { useEffect } from "react";

export default function MotionObserver() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".tx-reveal"));
    if (reduce.matches) {
      elements.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    elements.forEach((el, index) => {
      el.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
