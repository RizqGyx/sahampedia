import React from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TabTitle } from "@/lib/generalFunction";

const Reference = () => {
  TabTitle("SahamPedia | Reference");

  const journalSources = [
    {
      title: "Prediksi Harga Saham Menggunakan LSTM",
      authors: "Ahmad Rizki, Budi Santoso",
      journal: "Jurnal Informatika dan Sistem Informasi",
      year: 2023,
      volume: "Vol. 15, No. 2",
      url: "https://example.com/journal1",
      description:
        "Penelitian tentang penggunaan Long Short-Term Memory (LSTM) untuk memprediksi harga saham blue chip Indonesia.",
    },
    {
      title: "Analisis Fundamental Saham Blue Chip Indonesia",
      authors: "Siti Nurhaliza, Joko Widodo",
      journal: "Jurnal Ekonomi dan Bisnis",
      year: 2022,
      volume: "Vol. 8, No. 3",
      url: "https://example.com/journal2",
      description:
        "Studi komprehensif tentang analisis fundamental saham-saham blue chip di Bursa Efek Indonesia.",
    },
    {
      title: "Penerapan Chatbot AI dalam Konsultasi Investasi Saham",
      authors: "Dimas Prayoga, Ratna Dewi",
      journal: "Jurnal Kecerdasan Buatan Indonesia",
      year: 2023,
      volume: "Vol. 4, No. 1",
      url: "https://example.com/journal3",
      description:
        "Penelitian tentang pengembangan dan implementasi chatbot AI untuk konsultasi investasi saham.",
    },
    {
      title: "Perbandingan Metode Machine Learning untuk Prediksi Saham",
      authors: "Eka Putra, Dewi Fortuna",
      journal: "Jurnal Ilmu Komputer",
      year: 2022,
      volume: "Vol. 12, No. 4",
      url: "https://example.com/journal4",
      description:
        "Studi komparatif tentang berbagai metode machine learning dalam memprediksi harga saham.",
    },
    {
      title: "Analisis Teknikal Saham BBCA dan BBRI",
      authors: "Surya Darma, Indra Kusuma",
      journal: "Jurnal Pasar Modal Indonesia",
      year: 2023,
      volume: "Vol. 7, No. 2",
      url: "https://example.com/journal5",
      description:
        "Analisis mendalam tentang pola teknikal pada saham BBCA dan BBRI selama periode 2020-2023.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">
            Referensi Jurnal dan Sumber
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Halaman ini berisi daftar referensi jurnal dan sumber yang digunakan
            dalam pengembangan platform SahamPedia Insight Hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {journalSources.map((journal, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle className="text-xl">{journal.title}</CardTitle>
                <CardDescription>
                  {journal.authors} ({journal.year})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-gray-600">{journal.description}</p>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <Link className="h-4 w-4 mr-1" />
                  <span>
                    {journal.journal}, {journal.volume}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  asChild
                >
                  <a
                    href={journal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Lihat Jurnal
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Reference;
