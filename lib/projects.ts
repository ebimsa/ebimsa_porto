export type Project = {
  id: "saidata" | "doripay" | "rasi" | "resqnet";
  title: string;
  tagline: string;
  taglineId: string;
  coverImage: string;
  category: "AI/ML" | "Systems & Cloud" | "Full Stack" | "Frontend";
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
  {
    id: "rasi",
    title: "RASI",
    tagline: "Indonesian stock market research & analytics web application",
    taglineId: "Aplikasi web riset dan analisis saham Indonesia",
    coverImage: "/rasi.png",
    category: "Frontend",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Unit Testing"],
    overview:
      "Built for Sectors App Hackathon Indonesia (Sep – Oct 2026), RASI (Riset Saham Indonesia) is a structured stock research platform guiding investors through intraday risk signals, broker accumulation, market radar, and AI synthesis.",
    overviewId:
      "Dikembangkan untuk Sectors App Hackathon Indonesia (Sep – Okt 2026), RASI (Riset Saham Indonesia) adalah platform riset saham terstruktur yang memandu investor melalui evaluasi sinyal risiko intraday, akumulasi broker, radar pasar, dan sintesis AI.",
    problem:
      "Retail investors often struggle with fragmented market terminals that overwhelm users with raw tickers instead of structured, actionable risk and fund-flow insights.",
    problemId:
      "Investor ritel sering kesulitan menghadapi terminal pasar yang terfragmentasi dan penuh angka mentah tanpa alur riset yang terstruktur terkait metrik risiko maupun pergerakan dana.",
    solution:
      "Designed and engineered a 4-stage research UI in Next.js, TypeScript, and Tailwind CSS with an adaptive light/dark design system, interactive animated components, and concise visualization of risk metrics, volume spikes, and market fund flows.",
    solutionId:
      "Merancang dan membangun antarmuka riset 4 tahap berbasis Next.js, TypeScript, dan Tailwind CSS dengan design system adaptif (light/dark mode), komponen animasi interaktif, serta penyajian ringkas metrik risiko, lonjakan volume, dan aliran dana pasar.",
    architecture:
      "Next.js App Router frontend written in strict TypeScript, styled with Tailwind CSS adaptive tokens, interactive motion components, and verified via automated unit tests.",
    architectureId:
      "Frontend Next.js App Router dengan TypeScript yang ketat, styling berbasis token adaptif Tailwind CSS, komponen animasi interaktif, serta teruji melalui unit test otomatis.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Unit Testing",
    ],
    process:
      "Built an adaptive design system, structured 4-stage stock exploration flows, interactive charts for volume spikes and fund flows, and unit tests for UI/metric logic.",
    challenges:
      "Presenting dense financial metrics (broker accumulation, intraday risk, volume spikes) concisely without visual clutter across light and dark modes.",
    challengesId:
      "Menyajikan metrik finansial yang padat (akumulasi broker, risiko intraday, lonjakan volume) secara ringkas dan mudah dipahami pada mode terang maupun gelap.",
    lessons:
      "Strengthened frontend architecture discipline with strict TypeScript, adaptive design systems, and automated unit testing for financial data presentation.",
    lessonsId:
      "Memperdalam arsitektur frontend menggunakan TypeScript, perancangan design system adaptif, serta pengujian unit otomatis untuk penyajian data finansial.",
    results:
      "Shipped a complete, responsive 4-stage stock research web application for Sectors App Hackathon Indonesia with adaptive light/dark UI and unit-tested metric components.",
    resultsId:
      "Berhasil meluncurkan aplikasi web riset saham 4 tahap yang responsif untuk Sectors App Hackathon Indonesia lengkap dengan UI adaptif light/dark dan komponen metrik teruji unit test.",
    githubUrl: "https://github.com/ebimsa",
    demoUrl: "https://rasisaham.vercel.app/",
  },
  {
    id: "resqnet",
    title: "ResQ-NET",
    tagline: "Tactical LoRa mesh & passive WiFi sniffing system for off-grid SAR operations",
    taglineId: "Sistem komunikasi taktis LoRa Mesh & Passive WiFi Sniffing untuk operasi SAR di area blank spot",
    coverImage: "/resqnet.png",
    category: "Systems & Cloud",
    tags: ["ESP32", "LoRa Mesh", "WiFi Sniffing", "Binary Protocol", "Command Center"],
    overview:
      "Favorite Award winner at PIMNAS 39 (2026) in PKM-KC 2. ResQ-NET is an independent tactical communication system combining LoRa Mesh Networking and Passive WiFi Sniffing to locate victims and coordinate Search and Rescue (SAR) teams in network blackout areas.",
    overviewId:
      "Peraih Juara Favorit PIMNAS ke-39 Tahun 2026 kategori PKM-KC 2 (Karsa Cipta). ResQ-NET adalah sistem komunikasi taktis mandiri berbasis LoRa Mesh Network dan Passive WiFi Sniffing untuk melacak lokasi korban serta mengoordinasikan tim SAR di area blank spot.",
    problem:
      "During natural disasters or remote SAR missions, cellular BTS infrastructure frequently collapses, leaving field teams and trapped victims completely disconnected from command posts.",
    problemId:
      "Saat bencana alam atau misi SAR di wilayah terpencil, infrastruktur BTS seluler sering terputus total sehingga tim lapangan dan korban tidak dapat terhubung ke posko komando.",
    solution:
      "Engineered compact binary communication protocols, ESP32 device-to-device LoRa multi-hop mesh integration, and a real-time Dashboard Command Center that monitors victim detections and SAR team coordinates completely offline.",
    solutionId:
      "Mengembangkan protokol komunikasi biner yang efisien, integrasi komunikasi multi-hop antarperangkat ESP32 berbasis LoRa Mesh, serta Dashboard Command Center untuk memantau lokasi korban dan tim SAR secara real-time tanpa koneksi internet.",
    architecture:
      "Field ESP32 nodes perform passive WiFi probe sniffing and relay telemetry across multi-hop 433 MHz LoRa Mesh links to a Gateway node connected via serial to the local Command Center Dashboard.",
    architectureId:
      "Node lapangan ESP32 melakukan passive WiFi sniffing dan meneruskan telemetri melalui jaringan LoRa Mesh 433 MHz multi-hop menuju Gateway yang terhubung ke Dashboard Command Center secara lokal tanpa internet.",
    techStack: [
      "ESP32",
      "LoRa Mesh",
      "Passive WiFi Sniffing",
      "Binary Protocol",
      "Command Center",
      "Next.js",
      "TypeScript",
    ],
    process:
      "Designed compact binary packet framing for low-bandwidth LoRa links, implemented ESP32 mesh relay integration, and built the real-time Command Center monitoring dashboard.",
    challenges:
      "Transmitting reliable location and telemetry payloads over bandwidth-constrained LoRa radio hops while maintaining real-time command visibility completely off-grid.",
    challengesId:
      "Mengirimkan payload lokasi dan telemetri secara andal melalui hop radio LoRa berbandwidth terbatas sambil menjaga pemantauan real-time di posko tanpa akses internet.",
    lessons:
      "Gained hands-on experience bridging embedded ESP32 binary protocols with real-time command center dashboards for mission-critical humanitarian operations.",
    lessonsId:
      "Mendalami integrasi protokol biner perangkat keras ESP32 dengan dashboard pemantauan real-time untuk misi kemanusiaan yang kritis.",
    results:
      "Awarded Juara Favorit (Favorite Award) at the 39th National Student Scientific Week (PIMNAS 2026) under PKM-KC 2 by Belmawa, Ditjen Dikti, Kemdiktisaintek.",
    resultsId:
      "Meraih penghargaan Juara Favorit pada Pekan Ilmiah Mahasiswa Nasional (PIMNAS) ke-39 Tahun 2026 kategori PKM-KC 2 oleh Belmawa, Ditjen Dikti, Kemdiktisaintek.",
    githubUrl: "https://github.com/ebimsa",
    demoUrl: "https://resq-net.online/",
  },
];

export function getProjectById(id: string): Project | undefined {
  return PROJECTS_DATA.find((p) => p.id === id);
}

