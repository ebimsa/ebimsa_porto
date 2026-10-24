export type ExperienceCategory = "work" | "leadership" | "teaching";

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
  isLatest?: boolean;
};

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    id: "exp-ta",
    index: "01",
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
    isLatest: true,
  },
  {
    id: "exp-pkl",
    index: "02",
    role: "Data Management Intern",
    roleId: "Magang Manajemen Data",
    organization: "Telkom Witel Kedaton",
    period: "Jun 2025 – Aug 2025",
    periodId: "Jun 2025 – Agu 2025",
    duration: "3 mos",
    durationId: "3 bln",
    category: "work",
    typeLabel: "Internship",
    typeLabelId: "Magang Industri",
    summary:
      "Maintained and audited customer network infrastructure records inside Telkom's internal operational systems.",
    summaryId:
      "Mengelola dan memvalidasi data infrastruktur jaringan pelanggan pada sistem manajemen internal Telkom.",
    details: [
      "Inputted customer network infrastructure data into the company's internal management systems.",
      "Validated and matched records to ensure the accuracy and integrity of operational data tracking.",
    ],
    detailsId: [
      "Menginput data infrastruktur jaringan pelanggan ke dalam sistem manajemen operasional internal perusahaan.",
      "Memvalidasi dan mencocokkan rekaman data untuk memastikan akurasi serta integritas pelacakan aset jaringan.",
    ],
    tags: ["Data Entry", "Data Integrity", "Network Infra", "Operational Audit"],
  },
  {
    id: "exp-bem",
    index: "03",
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
    index: "04",
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

