export type Project = {
  id: "saidata" | "doripay";
  title: string;
  tagline: string;
  taglineId: string;
  coverImage: string;
  category: "AI/ML" | "Systems & Cloud" | "Full Stack";
  tags: string[];
  overview: string;
  overviewId: string;
  problem: string;
  problemId: string;
  solution: string;
  solutionId: string;
  architecture: string;
  architectureId: string;
  techStack: string[];
  process: string;
  challenges: string;
  challengesId: string;
  lessons: string;
  lessonsId: string;
  results: string;
  resultsId: string;
  githubUrl: string;
  demoUrl: string;
  videoUrl?: string;
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "saidata",
    title: "Saidata",
    tagline: "Integrated administrative services hub and e-Government platform",
    taglineId: "Pusat layanan administrasi terpadu dan platform e-Government",
    coverImage: "/saidata.png",
    category: "Full Stack",
    tags: ["React 19", "Laravel 12", "Octane", "PostgreSQL", "CAS SSO"],
    overview:
      "An e-Government portal (e-ULT Unila) that automates administrative services, workflows, and document generation for all Lampung University divisions.",
    overviewId:
      "Portal e-Government (e-ULT Unila) yang mengotomasi layanan administrasi, alur kerja pengesahan, dan pembuatan dokumen untuk seluruh divisi di Universitas Lampung.",
    problem:
      "Administrative approvals were paper-heavy, slow, and impossible to track in real-time across siloed legacy academic databases.",
    problemId:
      "Persetujuan administrasi berbasis kertas, lambat, dan tidak bisa dilacak secara real-time di antara basis data akademik lama yang terpisah-pisah.",
    solution:
      "A dynamic multi-stage workflow engine with JSONB data, auto-generated Word/PDF documents with QR verification, and Telegram notifications for validators.",
    solutionId:
      "Mesin alur kerja bertahap dinamis dengan data JSONB, pembuatan dokumen Word/PDF otomatis dengan verifikasi QR, dan notifikasi Telegram untuk validator.",
    architecture:
      "React 19 client (Recharts/Quill), Laravel 12 + Laravel Octane (RoadRunner) backend, and a hybrid relational-document PostgreSQL schema integrated with CAS 2.0 SSO and a Node.js + Playwright sync service.",
    architectureId:
      "Klien React 19 (Recharts/Quill), backend Laravel 12 + Laravel Octane (RoadRunner), dan skema PostgreSQL hibrida relasional-dokumen yang terintegrasi dengan SSO CAS 2.0 serta layanan sinkronisasi Node.js + Playwright.",
    techStack: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Laravel 12",
      "Octane",
      "RoadRunner",
      "PostgreSQL",
      "CAS SSO",
      "Node.js",
      "Playwright",
    ],
    process:
      "Mapped complex organizational approval chains, built dynamic PDF generators with verification QR codes, and integrated SSO CAS 2.0 authentication.",
    challenges:
      "Syncing data across conflicting campus systems behind Cloudflare. Solved with a Node.js + Playwright microservice and GIN indexes on JSONB columns.",
    challengesId:
      "Sinkronisasi data antar sistem kampus yang saling berbeda di balik Cloudflare. Diatasi dengan microservice Node.js + Playwright dan GIN index pada kolom JSONB.",
    lessons:
      "Mastered stateful PHP architectures (Octane), CAS token single sign-on protocols, and indexing performance tuning on massive JSONB datasets.",
    lessonsId:
      "Menguasai arsitektur PHP stateful (Octane), protokol single sign-on CAS token, dan optimasi indeks pada dataset JSONB berukuran besar.",
    results:
      "TODO_ANGKA — Replace with verified metrics (e.g. number of campus divisions onboarded, service types automated, or JSONB query latency before vs. after GIN indexing).",
    resultsId:
      "TODO_ANGKA — Ganti dengan metrik terverifikasi (mis. jumlah unit/divisi kampus, jenis layanan yang diotomasi, atau perbandingan waktu query JSONB sebelum dan sesudah GIN index).",
    githubUrl: "https://github.com/enggalbima/saidata",
    demoUrl: "https://saidata.unila.ac.id",
    videoUrl: "/saidata.mp4",
  },
  {
    id: "doripay",
    title: "DoriPay",
    tagline: "PPOB billing and digital product payment platform",
    taglineId: "Platform pembayaran tagihan PPOB dan produk digital",
    coverImage: "/doripay.png",
    category: "Full Stack",
    tags: ["Go", "Fiber", "Svelte", "PostgreSQL", "Tripay", "Digiflazz"],
    overview:
      "A full-stack PPOB payment system designed for secure, automated online billing and digital product transactions (credit, data packages, electricity tokens).",
    overviewId:
      "Sistem pembayaran PPOB full-stack untuk transaksi tagihan dan produk digital otomatis (pulsa, paket data, token listrik) dengan idempotency dan row-level locking.",
    problem:
      "Concurrent wallet transactions can cause race conditions and double-spend on balance mutations during heavy customer traffic peaks.",
    problemId:
      "Transaksi dompet bersamaan dapat menyebabkan race condition dan double-spend pada mutasi saldo saat puncak trafik pelanggan.",
    solution:
      "Idempotent requests plus pessimistic row locking in PostgreSQL, structured with Clean Architecture in Go Fiber and integrated with Tripay and Digiflazz/Orkut APIs.",
    solutionId:
      "Request idempoten dan pessimistic row locking di PostgreSQL, dibangun dengan Clean Architecture pada Go Fiber serta terintegrasi dengan API Tripay dan Digiflazz/Orkut.",
    architecture:
      "Svelte client dashboard (Svelte Stores), Golang Fiber backend structured in Clean Architecture, PostgreSQL database with high-performance pgx driver, and asynchronous webhook reconciliation.",
    architectureId:
      "Dashboard klien Svelte (Svelte Stores), backend Golang Fiber dengan Clean Architecture, basis data PostgreSQL dengan driver pgx berkinerja tinggi, serta rekonsiliasi webhook asinkron.",
    techStack: [
      "Go",
      "Fiber",
      "Svelte",
      "PostgreSQL",
      "pgx",
      "Tripay",
      "Digiflazz",
      "Orkut",
    ],
    process:
      "Implemented ACID-compliant wallet mutation logic, mapped tiered pricing systems for agents, designed granular RBAC controls, and established reliable webhook callbacks.",
    challenges:
      "Preventing double-spend on instant deductions and handling gateway webhooks reliably. Mitigated by enforcing strict database row locks and request idempotency keys.",
    challengesId:
      "Mencegah double-spend pada pemotongan saldo instan dan menangani webhook gateway secara andal. Diatasi dengan mengunci baris database secara ketat dan validasi kunci idempotensi request.",
    lessons:
      "Gained deep knowledge in secure financial ledger engineering, Svelte stores state synchronization, and integrating external payment gateway API endpoints.",
    lessonsId:
      "Mendalami rekayasa buku besar finansial yang aman, sinkronisasi state Svelte stores, dan integrasi endpoint API payment gateway eksternal.",
    results:
      "TODO_ANGKA — Replace with local load-test or production metrics (e.g. 0 double-spend across N concurrent wallet deduction requests, or number of digital product SKUs supported).",
    resultsId:
      "TODO_ANGKA — Ganti dengan hasil tes beban lokal atau metrik produksi (mis. 0 double-spend pada N request pemotongan saldo paralel, atau jumlah produk digital yang didukung).",
    githubUrl: "https://github.com/enggalbima/doripay",
    demoUrl: "https://doripay.com",
    videoUrl: "/doripay.mp4",
  },
];

export function getProjectById(id: string): Project | undefined {
  return PROJECTS_DATA.find((p) => p.id === id);
}

