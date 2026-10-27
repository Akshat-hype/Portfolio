import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    if (reducedMotion.matches || !finePointer.matches) return undefined;

    const root = document.documentElement;
    const ring = ringRef.current;
    const dot = dotRef.current;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let frame;
    root.classList.add('custom-cursor-enabled');

    const move = event => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    };
    const animate = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = requestAnimationFrame(animate);
    };
    const updateHover = event => {
      const interactive = event.target.closest('a, button, input, textarea, select, [role="button"], .project-card');
      ring.classList.toggle('is-hovering', Boolean(interactive));
    };
    const click = () => {
      ring.classList.remove('is-clicking');
      void ring.offsetWidth;
      ring.classList.add('is-clicking');
    };
    const clearClick = () => ring.classList.remove('is-clicking');

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', updateHover);
    document.addEventListener('pointerdown', click);
    document.addEventListener('pointerup', clearClick);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', updateHover);
      document.removeEventListener('pointerdown', click);
      document.removeEventListener('pointerup', clearClick);
      root.classList.remove('custom-cursor-enabled');
    };
  }, []);

  return <div className="custom-cursor" aria-hidden="true"><span className="cursor-ring" ref={ringRef}/><span className="cursor-dot" ref={dotRef}/></div>;
}
