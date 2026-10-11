import React from 'react';

/**
 * Animated SVG "living diagrams" for projects. Pure CSS/SVG motion, self-driven.
 */

export function MonitoringArt() {
  // Prometheus (scrape) -> VictoriaMetrics (store) -> Grafana (dash) -> Slack/Zenduty (alert)
  // A live scrape pulse feeds a metrics graph, then fans out to alert channels.
  return (
    <svg className="proj-art" viewBox="0 0 400 180" role="img" aria-label="Observability stack: Prometheus scraping to VictoriaMetrics, Grafana dashboards and severity-based alerting">
      <defs>
        <linearGradient id="ma-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#cbd3e1" />
          <stop offset="0.5" stopColor="#e5e9f0" />
          <stop offset="1" stopColor="#9aa3b2" />
        </linearGradient>
        <linearGradient id="ma-graph" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e5e9f0" stopOpacity="0.5" />
          <stop offset="1" stopColor="#e5e9f0" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* backbone */}
      <path d="M44 54 H356" stroke="url(#ma-line)" strokeWidth="2" fill="none" opacity="0.45" strokeDasharray="4 5">
        <animate attributeName="stroke-dashoffset" from="18" to="0" dur="0.9s" repeatCount="indefinite" />
      </path>

      {/* targets being scraped (k8s + aws) */}
      <g className="da-pop">
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={30} cy={40 + k * 14} r="5" fill="none" stroke="#cbd3e1" strokeWidth="1.5">
            <animate attributeName="r" values="5;6.5;5" dur="1.6s" begin={`${k * 0.25}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <text x="30" y="92" textAnchor="middle" className="da-label">targets</text>
      </g>

      {/* Prometheus scrape ring */}
      <g className="da-pop" style={{ animationDelay: '.15s' }}>
        <circle cx="110" cy="54" r="20" fill="#111728" stroke="#cbd3e1" strokeWidth="1.5" />
        <circle cx="110" cy="54" r="12" fill="none" stroke="#cbd3e1" strokeWidth="1.5" opacity="0.7">
          <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0;0.9" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="110" cy="54" r="3.5" fill="#cbd3e1" />
        <text x="110" y="92" textAnchor="middle" className="da-label">Prometheus</text>
      </g>

      {/* VictoriaMetrics store with live graph */}
      <g className="da-pop" style={{ animationDelay: '.3s' }}>
        <rect x="176" y="34" width="56" height="40" rx="6" fill="#111728" stroke="#e5e9f0" strokeWidth="1.5" />
        <path d="M180 64 L188 56 L196 60 L204 48 L212 52 L220 42 L228 50 V70 H180 Z" fill="url(#ma-graph)" stroke="#e5e9f0" strokeWidth="1.3">
          <animate attributeName="d"
            values="M180 64 L188 56 L196 60 L204 48 L212 52 L220 42 L228 50 V70 H180 Z;
                    M180 60 L188 50 L196 56 L204 54 L212 44 L220 50 L228 46 V70 H180 Z;
                    M180 64 L188 56 L196 60 L204 48 L212 52 L220 42 L228 50 V70 H180 Z"
            dur="3s" repeatCount="indefinite" />
        </path>
        <text x="204" y="92" textAnchor="middle" className="da-label">VictoriaMetrics</text>
      </g>

      {/* Grafana dashboard */}
      <g className="da-pop" style={{ animationDelay: '.45s' }}>
        <rect x="256" y="38" width="34" height="32" rx="5" fill="#111728" stroke="#9aa3b2" strokeWidth="1.5" />
        {[20, 10, 26].map((h, k) => (
          <rect key={k} x={261 + k * 8} y={64 - h} width="5" height={h} rx="1" fill="#9aa3b2">
            <animate attributeName="height" values={`${h};${h * 0.4};${h}`} dur="1.8s" begin={`${k * 0.2}s`} repeatCount="indefinite" />
            <animate attributeName="y" values={`${64 - h};${64 - h * 0.4};${64 - h}`} dur="1.8s" begin={`${k * 0.2}s`} repeatCount="indefinite" />
          </rect>
        ))}
        <text x="273" y="92" textAnchor="middle" className="da-label">Grafana</text>
      </g>

      {/* alert fan-out: Slack (warn/crit) + Zenduty (page) */}
      <g>
        <path d="M290 54 C320 54 320 40 342 40" stroke="#e5e9f0" strokeWidth="1.3" fill="none" opacity="0.5" />
        <path d="M290 54 C320 54 320 68 342 68" stroke="#cbd3e1" strokeWidth="1.3" fill="none" opacity="0.5" />
        <g className="da-pop" style={{ animationDelay: '.6s' }}>
          <circle cx="356" cy="40" r="11" fill="#111728" stroke="#e5e9f0" strokeWidth="1.5" />
          <circle cx="356" cy="40" r="3" fill="#e5e9f0"><animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite" /></circle>
        </g>
        <g className="da-pop" style={{ animationDelay: '.72s' }}>
          <circle cx="356" cy="68" r="11" fill="#111728" stroke="#cbd3e1" strokeWidth="1.5" />
          <path d="M356 63 v6 M356 72 v0.5" stroke="#cbd3e1" strokeWidth="2" strokeLinecap="round">
            <animate attributeName="opacity" values="1;.2;1" dur="1s" repeatCount="indefinite" />
          </path>
        </g>
        <text x="356" y="92" textAnchor="middle" className="da-label">alerts</text>
      </g>

      {/* flowing scrape packet */}
      <circle r="3.5" fill="#fff">
        <animateMotion dur="2.6s" repeatCount="indefinite" path="M44 54 H356" />
        <animate attributeName="opacity" values="0;1;1;0" dur="2.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function DeployArt() {
  // CI/CD -> container -> k8s cluster -> cloud, with a packet flowing along the path
  return (
    <svg className="proj-art" viewBox="0 0 400 180" role="img" aria-label="CI/CD deployment pipeline to Kubernetes on AWS">
      <defs>
        <linearGradient id="da-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e5e9f0" />
          <stop offset="1" stopColor="#9aa3b2" />
        </linearGradient>
      </defs>

      {/* connecting path */}
      <path id="da-path" d="M60 90 H150 M250 90 H340" stroke="url(#da-line)" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M150 90 C190 90 210 90 250 90" stroke="url(#da-line)" strokeWidth="2" fill="none" opacity="0.5" strokeDasharray="4 5">
        <animate attributeName="stroke-dashoffset" from="18" to="0" dur="0.9s" repeatCount="indefinite" />
      </path>

      {/* git node */}
      <g className="da-pop">
        <circle cx="40" cy="90" r="22" fill="#111728" stroke="#e5e9f0" strokeWidth="1.5" />
        <path d="M31 90 l6 -6 M31 90 l6 6 M31 90 h12" stroke="#e5e9f0" strokeWidth="2" fill="none" />
        <text x="40" y="128" textAnchor="middle" className="da-label">git push</text>
      </g>

      {/* container (docker) */}
      <g className="da-pop" style={{ animationDelay: '.2s' }}>
        <rect x="128" y="70" width="44" height="40" rx="6" fill="#111728" stroke="#9aa3b2" strokeWidth="1.5" />
        <rect x="138" y="80" width="8" height="8" fill="#9aa3b2"><animate attributeName="opacity" values="1;.3;1" dur="1.8s" repeatCount="indefinite" /></rect>
        <rect x="150" y="80" width="8" height="8" fill="#9aa3b2" opacity=".6" />
        <rect x="138" y="92" width="20" height="8" fill="#9aa3b2" opacity=".4" />
        <text x="150" y="128" textAnchor="middle" className="da-label">build</text>
      </g>

      {/* k8s cluster of pods */}
      <g className="da-pop" style={{ animationDelay: '.4s' }}>
        <rect x="226" y="62" width="48" height="56" rx="8" fill="#111728" stroke="#e5e9f0" strokeWidth="1.5" />
        {[0,1,2,3].map((k) => (
          <circle key={k} cx={238 + (k%2)*24} cy={78 + Math.floor(k/2)*24} r="7" fill="none" stroke="#e5e9f0" strokeWidth="1.5">
            <animate attributeName="stroke-opacity" values="1;.3;1" dur="2s" begin={`${k*0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <text x="250" y="134" textAnchor="middle" className="da-label">k8s pods</text>
      </g>

      {/* cloud */}
      <g className="da-pop" style={{ animationDelay: '.6s' }}>
        <circle cx="365" cy="90" r="24" fill="#111728" stroke="#cbd3e1" strokeWidth="1.5" />
        <path d="M352 93 a7 7 0 0 1 7 -7 a9 9 0 0 1 17 2 a6 6 0 0 1 -1 12 h-20 a5 5 0 0 1 -3 -9 z" fill="#cbd3e1" opacity="0.8" />
        <text x="365" y="128" textAnchor="middle" className="da-label">AWS</text>
      </g>

      {/* flowing packet */}
      <circle r="4" fill="#fff">
        <animateMotion dur="2.6s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1"
          path="M60 90 H150 C190 90 210 90 250 90 H340" rotate="auto" />
        <animate attributeName="opacity" values="0;1;1;0" dur="2.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function PipelineArt() {
  // data source -> ETL (spark) -> store (S3) -> query (Athena) -> dashboard bars
  return (
    <svg className="proj-art" viewBox="0 0 400 180" role="img" aria-label="Big data ETL pipeline with analytics dashboard">
      <defs>
        <linearGradient id="pa-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#cbd3e1" />
          <stop offset="1" stopColor="#e5e9f0" />
        </linearGradient>
      </defs>

      <path d="M44 60 H356" stroke="url(#pa-line)" strokeWidth="2" fill="none" opacity="0.45" strokeDasharray="4 5">
        <animate attributeName="stroke-dashoffset" from="18" to="0" dur="0.9s" repeatCount="indefinite" />
      </path>

      {/* source stream */}
      <g>
        {[0,1,2].map((k) => (
          <rect key={k} x={24} y={48 + k*8} width="18" height="4" rx="2" fill="#cbd3e1">
            <animate attributeName="x" values="24;30;24" dur="1.6s" begin={`${k*0.2}s`} repeatCount="indefinite" />
          </rect>
        ))}
        <text x="33" y="92" textAnchor="middle" className="da-label">stream</text>
      </g>

      {/* spark ETL gear */}
      <g className="da-spin-wrap">
        <circle cx="130" cy="60" r="20" fill="#111728" stroke="#9aa3b2" strokeWidth="1.5" />
        <g className="da-spin" style={{ transformOrigin: '130px 60px' }}>
          {[0,60,120,180,240,300].map((deg) => (
            <rect key={deg} x="128" y="42" width="4" height="8" rx="1" fill="#9aa3b2" transform={`rotate(${deg} 130 60)`} />
          ))}
          <circle cx="130" cy="60" r="6" fill="none" stroke="#9aa3b2" strokeWidth="2" />
        </g>
        <text x="130" y="94" textAnchor="middle" className="da-label">PySpark</text>
      </g>

      {/* S3 store */}
      <g className="da-pop" style={{ animationDelay: '.3s' }}>
        <ellipse cx="220" cy="50" rx="20" ry="6" fill="#111728" stroke="#e5e9f0" strokeWidth="1.5" />
        <path d="M200 50 v16 a20 6 0 0 0 40 0 v-16" fill="#111728" stroke="#e5e9f0" strokeWidth="1.5" />
        <ellipse cx="220" cy="58" rx="20" ry="6" fill="none" stroke="#e5e9f0" strokeWidth="1" opacity="0.5" />
        <text x="220" y="94" textAnchor="middle" className="da-label">S3</text>
      </g>

      {/* Athena query */}
      <g className="da-pop" style={{ animationDelay: '.45s' }}>
        <rect x="286" y="44" width="34" height="32" rx="5" fill="#111728" stroke="#9aa3b2" strokeWidth="1.5" />
        <path d="M296 60 l4 4 l8 -10" stroke="#9aa3b2" strokeWidth="2" fill="none">
          <animate attributeName="opacity" values=".2;1;.2" dur="1.8s" repeatCount="indefinite" />
        </path>
        <text x="303" y="94" textAnchor="middle" className="da-label">Athena</text>
      </g>

      {/* dashboard bars */}
      <g transform="translate(342,40)">
        {[16,28,22,34].map((h, k) => (
          <rect key={k} x={k*9} y={40 - h} width="6" height={h} rx="1" fill="#e5e9f0">
            <animate attributeName="height" values={`${h};${h*0.5};${h}`} dur="1.8s" begin={`${k*0.2}s`} repeatCount="indefinite" />
            <animate attributeName="y" values={`${40-h};${40-h*0.5};${40-h}`} dur="1.8s" begin={`${k*0.2}s`} repeatCount="indefinite" />
          </rect>
        ))}
      </g>

      {/* flowing packet */}
      <circle r="4" fill="#fff">
        <animateMotion dur="2.8s" repeatCount="indefinite" path="M44 60 H356" />
        <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
