import { BarChart3, MessageSquare, LineChart } from "lucide-react";

// Course Page for Level
export const levels = ["Semua", "Pemula", "Menengah", "Lanjutan"];

// Navbar For Prediksi Option
export const prediksiOptions = [
  { label: "BBCA", path: "/prediction/bbca" },
  { label: "BBNI", path: "/prediction/bbni" },
  { label: "BBRI", path: "/prediction/bbri" },
  { label: "BMRI", path: "/prediction/bmri" },
];

export const stockDescriptions = {
  bbca: "PT Bank Central Asia Tbk (BBCA) adalah perusahaan yang bergerak di bidang perbankan dan merupakan bank terbesar di Indonesia dilihat dari nilai kapitalisasi pasar.",
  bbni: "PT Bank Negara Indonesia Tbk (BBNI) adalah sebuah institusi bank milik pemerintah, yang merupakan bank komersial tertua dalam sejarah Indonesia.",
  bbri: "PT Bank Rakyat Indonesia Tbk (BBRI) adalah salah satu bank milik pemerintah terbesar di Indonesia yang fokus pada segmen mikro, kecil, dan menengah.",
  bmri: "PT Bank Mandiri Tbk (BMRI) adalah bank terbesar di Indonesia dalam hal aset, pinjaman, dan deposit, yang didirikan pada 2 Oktober 1998.",
  default:
    "Perusahaan blue chip yang terdaftar di Bursa Efek Indonesia dengan kinerja keuangan yang stabil dan kapitalisasi pasar yang besar.",
};

// Home Page For Main Feature
export const featureWeb = [
  {
    icon: BarChart3,
    title: "Analisis Blue Chip",
    description:
      "Pelajari dan analisis saham blue chip Indonesia melalui modul pembelajaran interaktif dan terstruktur.",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0,
  },
  {
    icon: MessageSquare,
    title: "RASA Chatbot",
    description:
      "Dapatkan informasi saham dan jawaban pertanyaan investasi dari chatbot cerdas berbasis RASA.",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2,
  },
  {
    icon: LineChart,
    title: "Prediksi Pasar",
    description:
      "Prediksi harga pasar saham blue chip dengan model machine learning canggih.",
    gradient: "from-green-500 to-teal-500",
    delay: 0.4,
  },
];
