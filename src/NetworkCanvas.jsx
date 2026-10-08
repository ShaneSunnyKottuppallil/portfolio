import React, { useEffect, useRef } from 'react';

/**
 * Self-animating "infrastructure mesh": nodes drift continuously and link up
 * when close, with data pulses travelling along the links. No mouse input.
 */
export default function NetworkCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let raf = 0;
    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const colors = ['#2dd4bf', '#a855f7', '#fb7185'];
    let nodes = [];
    let pulses = [];

    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(64, Math.round((W * H) / 24000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.8 + 1,
        c: colors[(Math.random() * colors.length) | 0],
      }));
    };

    const DIST = 150;

    const spawnPulse = () => {
      // pick two near nodes and send a pulse between them
      if (nodes.length < 2) return;
      const a = (Math.random() * nodes.length) | 0;
      let b = -1, best = DIST;
      for (let k = 0; k < nodes.length; k++) {
        if (k === a) continue;
        const d = Math.hypot(nodes[a].x - nodes[k].x, nodes[a].y - nodes[k].y);
        if (d < best) { best = d; b = k; }
      }
      if (b >= 0) pulses.push({ a, b, t: 0, c: nodes[a].c });
    };

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // move nodes
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < DIST) {
            const o = (1 - d / DIST) * 0.16;
            ctx.strokeStyle = `rgba(150,170,255,${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.c;
        ctx.globalAlpha = 0.55;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // pulses travelling along links
      pulses = pulses.filter((p) => p.t <= 1 && nodes[p.a] && nodes[p.b]);
      for (const p of pulses) {
        p.t += 0.02;
        const x = nodes[p.a].x + (nodes[p.b].x - nodes[p.a].x) * p.t;
        const y = nodes[p.a].y + (nodes[p.b].y - nodes[p.a].y) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.c;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      frame++;
      if (frame % 26 === 0 && pulses.length < 14) spawnPulse();

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    if (!reduced) {
      draw();
    } else {
      draw(); cancelAnimationFrame(raf); // single static frame
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="network-canvas" aria-hidden="true" />;
}
