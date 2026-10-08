import React, { useMemo } from 'react';

/**
 * Ambient drifting DevOps glyphs — self-animated, purely decorative.
 * Rises slowly from the bottom with gentle sway, like floating code dust.
 */
const GLYPHS = ['{ }', '</>', '$_', '⎈', '~/', 'λ', '::', '==>', 'yaml', 'k8s', '#!', '→', '∞', 'git', '.tf'];

export default function FloatingGlyphs({ count = 16 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        char: GLYPHS[i % GLYPHS.length],
        left: Math.random() * 100,
        size: 0.7 + Math.random() * 1.1,
        delay: -Math.random() * 22,
        dur: 18 + Math.random() * 20,
        drift: (Math.random() * 2 - 1) * 60,
      })),
    [count]
  );
  return (
    <div className="glyphs" aria-hidden="true">
      {items.map((g) => (
        <span
          key={g.id}
          className="glyph"
          style={{
            left: `${g.left}%`,
            fontSize: `${g.size}rem`,
            animationDelay: `${g.delay}s`,
            animationDuration: `${g.dur}s`,
            '--drift': `${g.drift}px`,
          }}
        >
          {g.char}
        </span>
      ))}
    </div>
  );
}
