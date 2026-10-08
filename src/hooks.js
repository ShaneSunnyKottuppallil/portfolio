import { useEffect, useRef, useState } from 'react';

/** Scroll progress 0..1 for the whole document (drives the top progress bar). */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return p;
}

/** Counts up to a target number once the element scrolls into view. */
export function useCountUp(target, duration = 1600) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return [ref, val];
}

/** Cycles through a list of phrases with a typewriter effect (self-driven). */
export function useTypewriter(phrases, { typeSpeed = 70, pause = 1500 } = {}) {
  const [text, setText] = useState('');
  const i = useRef(0);
  const j = useRef(0);
  const deleting = useRef(false);
  useEffect(() => {
    let timer;
    const step = () => {
      const full = phrases[i.current % phrases.length];
      if (!deleting.current) {
        j.current += 1;
        setText(full.slice(0, j.current));
        if (j.current === full.length) {
          deleting.current = true;
          timer = setTimeout(step, pause);
          return;
        }
      } else {
        j.current -= 1;
        setText(full.slice(0, j.current));
        if (j.current === 0) {
          deleting.current = false;
          i.current += 1;
        }
      }
      timer = setTimeout(step, deleting.current ? typeSpeed / 2 : typeSpeed);
    };
    timer = setTimeout(step, typeSpeed);
    return () => clearTimeout(timer);
  }, [phrases, typeSpeed, pause]);
  return text;
}

/** Returns true once the element has scrolled into view (fires once). */
export function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setSeen(true); });
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/** Decrypt/scramble reveal: scrambles then resolves to the final text once in view. */
export function useScramble(finalText, { speed = 38, trigger = true } = {}) {
  const [out, setOut] = useState(finalText);
  const started = useRef(false);
  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;
    const chars = '!<>-_\\/[]{}=+*^?#________';
    let frame = 0;
    const queue = finalText.split('').map((ch, i) => ({
      ch, start: Math.floor(Math.random() * 12) + i, end: Math.floor(Math.random() * 24) + i + 12,
    }));
    let raf;
    const run = () => {
      let output = '';
      let done = 0;
      for (const q of queue) {
        if (frame >= q.end) { output += q.ch; done++; }
        else if (frame >= q.start) { output += chars[Math.floor(Math.random() * chars.length)]; }
        else { output += ''; }
      }
      setOut(output);
      frame++;
      if (done < queue.length) raf = requestAnimationFrame(run);
      else setOut(finalText);
    };
    const t = setTimeout(() => { raf = requestAnimationFrame(run); }, 0);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [finalText, trigger, speed]);
  return out;
}

/** A gently fluctuating live metric value (for the "cluster status" widget). */
export function useLiveMetric(base, variance, decimals = 0, intervalMs = 1400) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      const next = base + (Math.random() * 2 - 1) * variance;
      setV(Number(next.toFixed(decimals)));
    }, intervalMs);
    return () => clearInterval(id);
  }, [base, variance, decimals, intervalMs]);
  return v;
}
