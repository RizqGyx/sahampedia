// import React, { useEffect, useState } from "react";
// import { useToast } from "@/hooks/use-toast";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { motion } from "framer-motion";

// export const ImplementationNav = () => {
//   const { toast } = useToast();
//   const [activeSection, setActiveSection] = useState("architecture");

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = [
//         "architecture",
//         "data-sources",
//         "analysis-methods",
//         "chatbot",
//         "tools",
//       ];

//       for (const section of sections) {
//         const element = document.getElementById(section);
//         if (!element) continue;

//         const rect = element.getBoundingClientRect();
//         // Adjust the threshold to account for the header height
//         if (rect.top <= 150 && rect.bottom >= 150) {
//           setActiveSection(section);
//           break;
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       // Offset for the header
//       const offset = 100;
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });
//     } else {
//       toast({
//         title: "Bagian tidak ditemukan",
//         description: "Maaf, bagian yang Anda cari tidak dapat ditemukan",
//         variant: "destructive",
//       });
//     }
//   };

//   const NavItem = ({ id, label }) => (
//     <motion.li
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{
//         duration: 0.5,
//         delay:
//           id === "architecture"
//             ? 0.1
//             : id === "data-sources"
//             ? 0.2
//             : id === "analysis-methods"
//             ? 0.3
//             : id === "chatbot"
//             ? 0.4
//             : 0.5,
//       }}
//     >
//       <button
//         onClick={() => scrollToSection(id)}
//         className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
//           activeSection === id
//             ? "bg-gradient-to-r from-blue-50 to-violet-50 text-violet-600 font-medium border-l-2 border-violet-500"
//             : "text-blue-600 hover:bg-blue-50"
//         }`}
//       >
//         {label}
//       </button>
//     </motion.li>
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white rounded-lg shadow-md p-5 sticky top-24"
//     >
//       <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
//         Daftar Isi
//       </h3>
//       <ScrollArea className="h-[calc(100vh-250px)] pr-3">
//         <ul className="space-y-2">
//           <NavItem id="architecture" label="Arsitektur Teknis" />
//           <NavItem id="data-sources" label="Sumber Data" />
//           <NavItem id="analysis-methods" label="Metode Analisis" />
//           <NavItem id="chatbot" label="Implementasi Chatbot" />
//           <NavItem id="tools" label="Alat & Teknologi" />
//         </ul>
//       </ScrollArea>
//     </motion.div>
//   );
// };
