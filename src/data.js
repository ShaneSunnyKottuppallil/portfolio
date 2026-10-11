export const profile = {
  name: 'Shane Sunny Kottuppallil',
  shortName: 'Shane',
  title: 'Associate DevOps Engineer',
  subtitle: 'Site Reliability Engineer (SRE)',
  location: 'Bengaluru, Karnataka, India',
  email: 'shanesunnyssk@gmail.com',
  phone: '+91 79073 75051',
  linkedin: 'https://www.linkedin.com/in/shanesunnyssk',
  github: 'https://github.com/ShaneSunnyKottuppallil',
  resume: '/Shane_Sunny_Kottuppallil_Resume.pdf',
  tagline:
    'I keep production calm. I build, automate and operate reliable cloud infrastructure for fintech-scale platforms.',
  about: [
    'I am a DevOps / SRE engineer who enjoys the operational craft: making deployments boring, incidents short, and infrastructure reproducible. Today I operate the production platform at Vegapay, a fintech serving multiple banking clients.',
    'My day moves between Kubernetes and ArgoCD, GitHub Actions pipelines, Terraform-managed infrastructure, and HashiCorp Vault. I like turning fragile, manual processes into automated, observable systems that other engineers can trust and build on.',
    'When I am not firefighting, I am tightening feedback loops: better dashboards, tighter access controls, and release workflows that fail safely instead of loudly.',
  ],
};

export const stats = [
  { num: 200, suffix: '+', label: 'On-call tickets resolved' },
  { num: 30, suffix: '', label: 'P0 + P1 incidents handled' },
  { num: 5, suffix: '+', label: 'Banking clients supported' },
  { num: 9, prefix: '#', label: 'Department rank (900+ cohort)' },
];

export const skills = [
  {
    group: 'Cloud & Infrastructure',
    icon: 'cloud',
    items: ['AWS (EC2, VPC, IAM, ALB, RDS)', 'S3 / ECR / EKS', 'Route 53 / API Gateway / CloudFront', 'Azure', 'Terraform', 'Ansible'],
  },
  {
    group: 'Containers & Orchestration',
    icon: 'container',
    items: ['Docker', 'Kubernetes', 'ArgoCD (GitOps)', 'Helm', 'OpenLens'],
  },
  {
    group: 'CI/CD & Automation',
    icon: 'pipeline',
    items: ['GitHub Actions', 'Jenkins', 'Git & branch governance', 'CODEOWNERS / PR policy', 'Shell scripting (Linux)', 'Nexus'],
  },
  {
    group: 'Observability & Incident Response',
    icon: 'chart',
    items: ['Prometheus', 'VictoriaMetrics', 'Grafana', 'Alertmanager', 'Kibana', 'Zenduty', 'Teleport'],
  },
  {
    group: 'Databases & Data',
    icon: 'database',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'ClickHouse', 'OpenSearch', 'ETL / data warehouse'],
  },
  {
    group: 'Security & Secrets',
    icon: 'shield',
    items: ['HashiCorp Vault', 'Teleport SSH/DB access', 'RBAC / least privilege', 'TLS / cert management'],
  },
];

export const experience = [
  {
    role: 'Associate DevOps Engineer',
    company: 'Vegapay',
    meta: 'Fintech platform serving 5+ banking clients · Bengaluru, India',
    period: 'Sep 2026 - Present',
    tag: 'Full-time',
    note: 'Previously DevOps Engineer Intern (Mar 2026 - Sep 2026)',
    headline: 'On-call owner of a multi-tenant banking platform — kept prod calm across 5+ bank clients.',
    metrics: [
      { v: '200+', k: 'tickets resolved' },
      { v: '30', k: 'P0 + P1 handled' },
      { v: '~70%', k: 'less manual release work' },
    ],
    points: [
      'Operated DevOps on-call for a multi-tenant banking platform and resolved 200+ tickets (incl. 16 P0 and 14 P1 incidents) across sandbox, UAT, pre-prod and production for clients including SSFB, Unity, YBL and BOB.',
      'Built an end-to-end, Terraform-managed observability stack on Kubernetes using Prometheus, VictoriaMetrics, Grafana, Alertmanager, Zenduty and Slack for centralized monitoring and faster incident response.',
      'Designed CI/CD pipelines with GitHub Actions automating Docker image builds and deployments to Amazon ECR, cutting manual release effort by ~70% and standardizing Java 21 builds across clients.',
      'Managed GitOps deployments with ArgoCD on Amazon EKS; resolved pod crashloops, image-pull failures and sync issues, and tuned CronJobs and pod scaling for ETL and microservices.',
      'Implemented Git branch & PR governance (branch protection, CODEOWNERS, required reviewers, deployment restrictions), improving release reliability across repositories.',
      'Secured infrastructure with Vault secret injection and Teleport-based SSH/DB access, eliminating hardcoded credentials and reducing direct production exposure.',
    ],
  },
  {
    role: 'DevOps Engineer Intern',
    company: 'Fi.Money (epiFi)',
    meta: 'Bengaluru, India',
    period: 'Dec 2025 - Mar 2026',
    tag: 'Internship',
    headline: 'Made observability faster and upgrades safer for a high-scale fintech.',
    metrics: [
      { v: '~85%', k: 'faster log recovery' },
      { v: '0', k: 'downtime on upgrade' },
      { v: 'P0', k: 'incidents resolved' },
    ],
    points: [
      'Engineered an ephemeral OpenSearch restore system, cutting log-recovery time from ~3 hours to ~25 minutes (~85% improvement).',
      'Executed a zero-downtime Prometheus upgrade (v2.48 → v3.7.3) and resolved high memory usage, restoring monitoring reliability.',
      'Standardized CI/CD workflows with Jenkins + Terraform and automated infrastructure patching with Ansible, improving release consistency and uptime.',
      'Diagnosed and resolved P0 production incidents (disk exhaustion), improving system stability and availability.',
    ],
  },
  {
    role: 'DevOps Engineer Trainee',
    company: 'BridgeLabz Fellowship',
    meta: 'SRM Institute of Science and Technology',
    period: 'Aug 2025 - Dec 2025',
    tag: 'Fellowship',
    headline: 'Built production-grade AWS infra and CI/CD from the ground up.',
    metrics: [
      { v: '3-tier', k: 'AWS architecture' },
      { v: 'IaC', k: 'Terraform + Ansible' },
      { v: 'K8s', k: 'containerized CD' },
    ],
    points: [
      'Architected a 3-tier AWS infrastructure (VPC, EC2, ALB, RDS) simulating production-grade deployments, provisioned via Terraform + Ansible.',
      'Developed CI/CD pipelines using Jenkins, Docker and Kubernetes, enabling automated containerized deployments.',
    ],
  },
];

export const projects = [
  {
    name: 'Monitoring IaC — Multi-Tenant Observability Platform',
    art: 'monitoring',
    featured: true,
    repo: 'https://github.com/ShaneSunnyKottuppallil/monitoring-iac',
    blurb: 'A production-grade, fully automated observability platform for Kubernetes and AWS. The entire monitoring stack — scraping, long-term storage, dashboards and severity-based alerting — stands up with a single terraform apply, and new clients onboard by copying a template directory.',
    tech: ['Terraform', 'Prometheus', 'VictoriaMetrics', 'Grafana', 'ArgoCD', 'Karpenter', 'AWS EKS', 'IRSA', 'GitHub Actions', 'Slack', 'Zenduty'],
    points: [
      'Automated a complete stack — Prometheus scraping → VictoriaMetrics (30-day retention) → Grafana unified alerting — provisioned entirely with Terraform-managed Helm releases.',
      'Built multi-tenant onboarding: a new client goes live by copying a template directory, with alerts and dashboards deployed GitOps-style via ArgoCD Jobs — no Terraform knowledge required.',
      'Routed alerts by severity across infrastructure, Kubernetes and AWS signals — Slack for warnings/critical and Zenduty for on-call paging.',
      'Hardened the platform with IRSA (no static AWS keys), Secrets Manager, dedicated taint/tolerated ARM nodes via Karpenter, and a Retain StorageClass so metrics survive pod and namespace deletion.',
    ],
  },
  {
    name: 'FitnLive - AI Health Chat Platform',
    art: 'deploy',
    blurb: 'Containerized AI health chatbot deployed on Kubernetes with a full Jenkins CI/CD pipeline and AWS infrastructure provisioned as code.',
    tech: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'Node.js', 'MongoDB', 'MySQL'],
    points: [
      'Built and deployed a containerized health chatbot using Docker and Kubernetes.',
      'Implemented Jenkins CI/CD and provisioned AWS infrastructure using Terraform and Ansible.',
    ],
  },
  {
    name: 'Twitter Sentiment Analysis Data Pipeline',
    art: 'pipeline',
    blurb: 'End-to-end big-data analytics pipeline processing social data at scale and surfacing sentiment trends through dashboards.',
    tech: ['AWS S3', 'AWS Glue', 'AWS Athena', 'PySpark', 'Google Cloud'],
    points: [
      'Processed 100+ datasets using PySpark ETL workflows, storing structured output in AWS S3.',
      'Queried and analyzed data with AWS Athena, generating dashboards for sentiment trend visualization.',
    ],
  },
];

// Auto-scrolling marquee of the DevOps stack (text pills, self-driven motion).
export const marquee = [
  'Kubernetes', 'ArgoCD', 'Docker', 'Terraform', 'GitHub Actions', 'Jenkins',
  'HashiCorp Vault', 'Prometheus', 'Grafana', 'AWS', 'Ansible', 'Helm',
  'VictoriaMetrics', 'Teleport', 'PostgreSQL', 'Redis', 'ClickHouse', 'Zenduty',
];

export const education = [
  {
    degree: 'B.Tech, Computer Science Engineering (Cloud Computing)',
    school: 'SRM Institute of Science and Technology',
    location: 'Tamil Nadu, India',
    period: 'Sep 2022 - May 2026',
    highlights: [
      'GPA 9.49 / 10',
      'Department Topper among 900+ students',
      'Awarded a ₹61,250 Performance Scholarship',
    ],
  },
];

export const certifications = [
  { name: 'AWS Certified Cloud Practitioner', short: 'Cloud Practitioner', issuer: 'Amazon Web Services', abbr: 'AWS', icon: 'cloud', accent: '#e5e9f0', featured: true },
  { name: 'GitHub Foundations', short: 'GitHub Foundations', issuer: 'GitHub', abbr: 'GH', icon: 'git', accent: '#9aa3b2', featured: true },
  { name: 'Cloud Computing', short: 'Cloud Computing', issuer: 'NPTEL', abbr: 'N', icon: 'server', accent: '#e5e9f0' },
  { name: 'Database Systems', short: 'Database Systems', issuer: 'NPTEL', abbr: 'N', icon: 'database', accent: '#e5e9f0' },
  { name: 'Computer Architecture', short: 'Computer Architecture', issuer: 'NPTEL', abbr: 'N', icon: 'chart', accent: '#e5e9f0' },
  { name: 'HTML, CSS & JavaScript for Web Developers', short: 'Web Development', issuer: 'Coursera', abbr: 'C', icon: 'terminal', accent: '#9aa3b2' },
  { name: 'Introduction to Databases', short: 'Intro to Databases', issuer: 'Coursera', abbr: 'C', icon: 'database', accent: '#9aa3b2' },
];

export const achievements = [
  {
    metric: '~70%',
    title: 'Leaner releases',
    text: 'Automated GitHub Actions pipelines removed most of the manual effort from building and shipping microservices.',
  },
  {
    metric: '~85%',
    title: 'Faster recovery',
    text: 'An ephemeral OpenSearch restore system took log recovery from hours to minutes during investigations.',
  },
  {
    metric: '0',
    title: 'Downtime upgrades',
    text: 'Migrated a live Prometheus stack across a major version with no monitoring blackout and no alert gaps.',
  },
  {
    metric: '#9',
    title: 'Department Rank',
    text: 'Ranked 9th in a 900+ student cohort and earned a merit performance scholarship.',
  },
];

// Rotating commands for the hero's live terminal (self-typing loop).
export const terminalScript = [
  { cmd: 'kubectl get pods -A | grep -v Running', out: 'No resources found — all healthy', ok: true },
  { cmd: 'argocd app sync prod', out: '✓ Synced  ·  Healthy', ok: true },
  { cmd: 'terraform apply -auto-approve', out: 'Apply complete! 42 added, 0 destroyed', ok: true },
  { cmd: 'helm upgrade monitoring ./stack', out: 'Release "monitoring" upgraded', ok: true },
  { cmd: 'vault kv get secret/prod/db', out: '**** rotated · lease 32m', ok: true },
];

// "How I handle an incident" — animated response flow.
export const incidentFlow = [
  { icon: 'bell', label: 'Alert fires', note: 'Zenduty pages, Slack lights up' },
  { icon: 'activity', label: 'Triage', note: 'Dashboards + logs pinpoint blast radius' },
  { icon: 'zap', label: 'Mitigate', note: 'Rollback, scale, or failover fast' },
  { icon: 'check', label: 'Resolve', note: 'Verify green, write the postmortem' },
];


