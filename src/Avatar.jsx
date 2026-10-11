import React from 'react';

/**
 * AnimatedAvatar — a stylized, self-driven SVG portrait of Shane.
 * Pure SVG/CSS motion: self-drawing line intro, blinking eyes, gentle breathing,
 * a rotating tech halo, and a liquid-gradient aura. No images, no JS loop.
 */
export default function AnimatedAvatar() {
  return (
    <div className="avatar-wrap" aria-label="Animated illustration of Shane">
      {/* rotating tech halo */}
      <div className="avatar-halo" aria-hidden="true">
        {['⎈', '{ }', '$_', '</>', '∞', '⚙'].map((g, i) => (
          <span key={i} className="halo-node" style={{ '--i': i }}>{g}</span>
        ))}
      </div>

      <svg className="avatar-svg" viewBox="0 0 260 300" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="av-skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#caa07a" />
            <stop offset="1" stopColor="#9c7452" />
          </linearGradient>
          <linearGradient id="av-suit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a2f3e" />
            <stop offset="1" stopColor="#171a24" />
          </linearGradient>
          <linearGradient id="av-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e5e9f0" />
            <stop offset="0.5" stopColor="#9aa3b2" />
            <stop offset="1" stopColor="#cbd3e1" />
          </linearGradient>
          <radialGradient id="av-aura" cx="50%" cy="42%" r="60%">
            <stop offset="0" stopColor="#9aa3b2" stopOpacity="0.35" />
            <stop offset="1" stopColor="#9aa3b2" stopOpacity="0" />
          </radialGradient>
          <clipPath id="av-clip"><circle cx="130" cy="150" r="118" /></clipPath>
        </defs>

        {/* aura */}
        <circle cx="130" cy="135" r="120" fill="url(#av-aura)" className="av-breathe" />

        <g clipPath="url(#av-clip)">
          {/* backdrop */}
          <rect x="12" y="32" width="236" height="236" fill="#0d101b" />
          {/* subtle grid */}
          <g opacity="0.12" stroke="#5566aa" strokeWidth="0.6">
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h${i}`} x1="12" y1={32 + i * 24} x2="248" y2={32 + i * 24} />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`v${i}`} x1={12 + i * 24} y1="32" x2={12 + i * 24} y2="268" />
            ))}
          </g>

          {/* shoulders / blazer */}
          <path d="M40 300 Q40 232 92 214 L130 206 L168 214 Q220 232 220 300 Z" fill="url(#av-suit)" stroke="url(#av-stroke)" strokeWidth="1.5" />
          {/* lapels */}
          <path d="M118 210 L130 250 L112 236 Z" fill="#11141d" stroke="url(#av-stroke)" strokeWidth="1.2" />
          <path d="M142 210 L130 250 L148 236 Z" fill="#11141d" stroke="url(#av-stroke)" strokeWidth="1.2" />
          {/* shirt */}
          <path d="M122 206 L130 244 L138 206 Z" fill="#1b1f2b" />

          {/* neck */}
          <path d="M114 196 Q130 212 146 196 L146 170 L114 170 Z" fill="url(#av-skin)" />

          {/* head */}
          <g className="av-breathe-soft">
            <path d="M92 128 Q92 92 130 92 Q168 92 168 128 L168 150 Q168 190 130 192 Q92 190 92 150 Z" fill="url(#av-skin)" />
            {/* ears */}
            <circle cx="90" cy="150" r="8" fill="url(#av-skin)" />
            <circle cx="170" cy="150" r="8" fill="url(#av-skin)" />

            {/* hair — wavy, dark */}
            <path d="M86 132 Q82 86 130 82 Q178 86 174 132 Q172 112 158 104 Q168 116 160 122 Q150 100 130 100 Q110 100 100 122 Q92 116 102 104 Q88 112 86 132 Z" fill="#15161d" stroke="url(#av-stroke)" strokeWidth="1.2" />

            {/* eyebrows */}
            <path className="av-brow" d="M104 134 Q112 130 122 133" stroke="#15161d" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path className="av-brow" d="M138 133 Q148 130 156 134" stroke="#15161d" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* eyes (with blinking lids) */}
            <g>
              <ellipse cx="113" cy="144" rx="7" ry="4.5" fill="#fff" />
              <circle cx="114" cy="144" r="3" fill="#2a1d12" />
              <circle cx="115" cy="143" r="1" fill="#fff" />
              <rect className="av-lid" x="105" y="139" width="16" height="0" fill="url(#av-skin)" />
            </g>
            <g>
              <ellipse cx="147" cy="144" rx="7" ry="4.5" fill="#fff" />
              <circle cx="146" cy="144" r="3" fill="#2a1d12" />
              <circle cx="147" cy="143" r="1" fill="#fff" />
              <rect className="av-lid" x="139" y="139" width="16" height="0" fill="url(#av-skin)" />
            </g>

            {/* nose */}
            <path d="M130 146 L126 160 Q130 163 134 160 Z" fill="#9c7452" opacity="0.6" />

            {/* beard + mustache */}
            <path d="M100 158 Q104 196 130 200 Q156 196 160 158 Q156 172 146 176 Q138 184 130 184 Q122 184 114 176 Q104 172 100 158 Z" fill="#15161d" stroke="url(#av-stroke)" strokeWidth="1.1" />
            <path d="M118 164 Q130 170 142 164" stroke="#15161d" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* smile */}
            <path className="av-smile" d="M120 170 Q130 177 140 170" stroke="#3a2a1c" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        </g>

        {/* animated ring outline that draws itself */}
        <circle className="av-ring" cx="130" cy="150" r="118" fill="none" stroke="url(#av-stroke)" strokeWidth="2.5" />
      </svg>
    </div>
  );
}
