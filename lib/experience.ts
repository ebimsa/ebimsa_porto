export type ExperienceCategory = "work" | "leadership" | "teaching" | "achievement";

export type ExperiencePhoto = {
  src: string;
  captionEn: string;
  captionId: string;
};

export type ExperienceEntry = {
  id: string;
  index: string;
  role: string;
  roleId: string;
  organization: string;
  period: string;
  periodId: string;
  duration: string;
  durationId: string;
  category: ExperienceCategory;
  typeLabel: string;
  typeLabelId: string;
  summary: string;
  summaryId: string;
  details: string[];
  detailsId: string[];
  tags: string[];
  photos?: ExperiencePhoto[];
  link?: {
    url: string;
    labelEn: string;
    labelId: string;
  };
  isLatest?: boolean;
};

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    id: "exp-pimnas",
    index: "01",
    role: "Favorite Award – PIMNAS 39 (PKM-KC 2)",
    roleId: "Juara Favorit PIMNAS ke-39 (PKM-KC 2)",
    organization: "Belmawa, Ditjen Dikti, Kemdiktisaintek",
    period: "Nov 2026",
    periodId: "Nov 2026",
    duration: "National",
    durationId: "Nasional",
    category: "achievement",
    typeLabel: "Award & Achievement",
    typeLabelId: "Penghargaan",
    summary:
      "Awarded Favorite Award at the 39th National Student Scientific Week (PIMNAS 2026) for ResQ-NET, an off-grid LoRa Mesh & Passive WiFi Sniffing SAR system.",
    summaryId:
      "Meraih Juara Favorit pada Pekan Ilmiah Mahasiswa Nasional (PIMNAS) ke-39 melalui karya ResQ-NET untuk operasi SAR di area blank spot.",
    details: [
      "Received the Favorite Award at PIMNAS 39 for \"ResQ-NET: An Independent Tactical Communication System Based on LoRa Mesh Network and Passive WiFi Sniffing for Search and Rescue Operations in Network Blackout Areas\".",
      "Served as Software Developer, developing binary communication protocols, ESP32 device-to-device communication integration, and a Dashboard Command Center for real-time monitoring without internet connectivity.",
    ],
    detailsId: [
      "Meraih Juara Favorit pada PIMNAS ke-39 melalui karya \"ResQ-NET: Sistem Komunikasi Taktis Mandiri Berbasis LoRa Mesh Network dan Passive WiFi Sniffing untuk Operasi SAR di Area Blank Spot\".",
      "Berperan sebagai pengembang perangkat lunak: mengembangkan protokol komunikasi biner, integrasi komunikasi antarperangkat ESP32, serta Dashboard Command Center untuk pemantauan lokasi korban dan tim SAR secara real-time tanpa koneksi internet.",
    ],
    tags: ["ResQ-NET", "LoRa Mesh", "ESP32", "Command Center"],
    photos: [
      {
        src: "/pimnas-1.jpg",
        captionEn: "Universitas Lampung Delegation — Favorite Award PKM-KC 2 at PIMNAS 39",
        captionId: "Tim Universitas Lampung — Juara Favorit PKM-KC 2 pada PIMNAS ke-39",
      },
      {
        src: "/pimnas-2.jpg",
        captionEn: "Closing Ceremony & Awarding Stage — PIMNAS 39 (2026)",
        captionId: "Panggung Closing Ceremony & Awarding — PIMNAS ke-39 Tahun 2026",
      },
    ],
    link: {
      url: "https://resq-net.online/",
      labelEn: "Visit ResQ-NET",
      labelId: "Kunjungi ResQ-NET",
    },
    isLatest: true,
  },
  {
    id: "exp-ta",
    index: "02",
    role: "Teaching Assistant",
    roleId: "Asisten Dosen",
    organization: "Universitas Lampung",
    period: "Feb 2026 – Jun 2026",
    periodId: "Feb 2026 – Jun 2026",
    duration: "5 mos",
    durationId: "5 bln",
    category: "teaching",
    typeLabel: "Teaching Assistant",
    typeLabelId: "Asisten Dosen",
    summary:
      "Guided laboratory practicum sessions in Systems Analysis & Design and Mobile Application Technology (Android).",
    summaryId:
      "Membimbing praktikum laboratorium mata kuliah Analisis & Desain Sistem serta Teknologi Aplikasi Mobile (Android).",
    details: [
      "Managed laboratory practicum sessions for Systems Analysis & Design and Mobile Application Technology courses.",
      "Mentored undergraduate students in Android application development and systems modeling, and resolved technical troubleshooting issues.",
      "Evaluated student assignments, provided constructive feedback on software design, and created learning materials.",
    ],
    detailsId: [
      "Mengelola sesi praktikum laboratorium untuk mata kuliah Analisis & Desain Sistem serta Teknologi Aplikasi Mobile.",
      "Membimbing mahasiswa dalam pengembangan aplikasi Android dan pemodelan sistem, serta membantu pemecahan masalah teknis.",
      "Mengevaluasi tugas praktikum, memberikan umpan balik terstruktur pada perancangan perangkat lunak, dan menyusun materi modul.",
    ],
    tags: ["Systems Analysis", "Mobile Apps", "Android", "Troubleshooting"],
  },
  {
    id: "exp-pkl",
    index: "03",
    role: "Data Management Intern",
    roleId: "Magang Manajemen Data",
    organization: "Telkom Insfrastruktur Indonesia",
    period: "Jun 2025 – Aug 2025",
    periodId: "Jun 2025 – Agu 2025",
    duration: "3 mos",
    durationId: "3 bln",
    category: "work",
    typeLabel: "Internship",
    typeLabelId: "Praktik Kerja Lapangan (PKL)",
    summary:
      "Built a daily reporting system for operational activity monitoring and validated customer network infrastructure data in internal systems.",
    summaryId:
      "Membangun sistem pelaporan harian untuk pemantauan aktivitas operasional serta memvalidasi data infrastruktur jaringan pelanggan pada sistem internal.",
    details: [
      "Developed a daily reporting system to help the division record, manage, and monitor operational activities.",
      "Entered and validated customer network infrastructure data in the internal system to ensure operational data accuracy.",
    ],
    detailsId: [
      "Membangun sistem pelaporan harian untuk membantu divisi dalam mencatat, mengelola, dan memantau aktivitas operasional.",
      "Menginput dan memvalidasi data infrastruktur jaringan pelanggan ke dalam sistem internal untuk memastikan keakuratan data operasional.",
    ],
    tags: ["Reporting System", "Data Management", "Network Infra", "Data Integrity"],
  },
  {
    id: "exp-bem",
    index: "04",
    role: "Head of Media & Information",
    roleId: "Kepala Dinas Media & Informasi",
    organization: "BEM FMIPA Unila",
    period: "Mar 2025 – Dec 2025",
    periodId: "Mar 2025 – Des 2025",
    duration: "10 mos",
    durationId: "10 bln",
    category: "leadership",
    typeLabel: "Leadership",
    typeLabelId: "Kepemimpinan Organisasi",
    summary:
      "Led the creative media division in executing faculty-wide digital communication, branding, and publication workflows.",
    summaryId:
      "Memimpin divisi kreatif dalam merancang strategi komunikasi digital, identitas visual, dan alur publikasi fakultas.",
    details: [
      "Led a creative team in designing and executing digital communication and branding strategies for the organization.",
      "Managed social media publications and coordinated cross-departmental efforts to promote organization programs and build a strong online presence.",
    ],
    detailsId: [
      "Memimpin tim kreatif dalam merancang dan mengeksekusi strategi komunikasi digital serta pencitraan organisasi.",
      "Mengelola publikasi media sosial dan mengoordinasikan kolaborasi lintas dinas untuk memublikasikan program kerja secara konsisten.",
    ],
    tags: ["Creative Direction", "Digital Strategy", "Social Media", "Branding"],
  },
  {
    id: "exp-himakom",
    index: "05",
    role: "Secretary of Media & Information",
    roleId: "Sekretaris Divisi Media & Informasi",
    organization: "HIMAKOM Unila",
    period: "Mar 2024 – Dec 2024",
    periodId: "Mar 2024 – Des 2024",
    duration: "10 mos",
    durationId: "10 bln",
    category: "leadership",
    typeLabel: "Leadership",
    typeLabelId: "Kepemimpinan Organisasi",
    summary:
      "Coordinated division administration, documentation archives, and digital content publication schedules.",
    summaryId:
      "Mengoordinasikan administrasi divisi, pengarsipan dokumentasi, serta penjadwalan publikasi konten digital.",
    details: [
      "Managed administrative supporting tasks, organization correspondence, and comprehensive documentation to ensure seamless division operations.",
      "Coordinated internal communications within the division and assisted in planning digital content publication workflows.",
    ],
    detailsId: [
      "Mengelola administrasi divisi, persuratan organisasi, dan dokumentasi kegiatan untuk mendukung kelancaran operasional.",
      "Mengoordinasikan komunikasi internal divisi serta membantu perencanaan jadwal publikasi konten digital.",
    ],
    tags: ["Administration", "Documentation", "Communication", "Content Planning"],
  },
];

