import { BarChart3, MessageSquare, LineChart } from "lucide-react";

// Course Page for Level
export const levels = ["Semua", "Pemula", "Menengah", "Lanjutan"];

// Navbar For Prediksi Option
export const prediksiOptions = [
  { label: "BBCA", path: "/prediction/BBCA" },
  { label: "BBNI", path: "/prediction/BBNI" },
  { label: "BBRI", path: "/prediction/BBRI" },
  { label: "BMRI", path: "/prediction/BMRI" },
];

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
