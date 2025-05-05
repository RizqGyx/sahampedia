import { BookOpen, GraduationCap, Users } from "lucide-react";

// Reference Page Dummy Data
export const journalSources = [
  {
    title:
      "Penerapan Metode Long Short Term Memory (LSTM) dalam Memprediksi Harga Saham PT Bank Central Asia",
    authors: "Abdul Rosyd, Ade Irma Purnamasari, Irfan Ali",
    journal: "Jurnal Mahasiswa Teknik Informatika",
    year: 2024,
    volume: "Vol. 8",
    url: "https://ejournal.itn.ac.id/index.php/jati/article/view/8440",
    description:
      "Penelitian yang membahas penerapan metode LSTM dalam prediksi harga saham BBCA.",
  },
  {
    title:
      "Pelatihan Pemanfaatan CMS untuk Pembuatan Website Bagi Orang Tua Siswa Sekolah Alam Tangerang",
    authors: "Achmad Aditya Ashadul Ushud, Ita Novita, Noni Juliasari",
    journal: "Jurnal Pengabdian Kepada Masyarakat TEKNO",
    year: 2021,
    volume: "Vol. 2, Hal. 20–25",
    url: "http://jurnal.iaii.or.id/index.php/JAMTEKNO",
    description:
      "Pelatihan penggunaan CMS sebagai alat bantu pembuatan website dalam kegiatan pengabdian masyarakat.",
  },
  {
    title:
      "Perbedaan Saham Blue Chip dan Non Blue Chip: Analisis Volume Perdagangan dan Return Saham atas Kebijakan Stock Split",
    authors: "Akhmad I. M., Damayanti C. R.",
    journal: "Jurnal Bisnis Strategi",
    year: 2021,
    volume: "Vol. 30, No. 2, Hal. 139–153",
    url: "https://doi.org/10.14710/jbs.30.2.139-153",
    description:
      "Analisis komparatif antara saham blue chip dan non-blue chip dalam konteks kebijakan stock split.",
  },
  {
    title:
      "Perancangan Website sebagai Media Informasi dan Peningkatan Citra pada SMK Dewi Sartika Tangerang",
    authors: "Andriyan W., Septiawan S., Aulya A.",
    journal: "Jurnal Teknologi Terpadu",
    year: 2020,
    volume: "Vol. 6, Hal. 79–88",
    url: "https://journal.nurulfikri.ac.id/index.php/JTT",
    description: "Studi mengenai desain website sebagai media promosi sekolah.",
  },
  {
    title: "Machine Learning untuk Pendidikan: Mengapa dan Bagaimana",
    authors: "Apit Fathurohman",
    journal: "Jurnal Informatika dan Teknologi Komputer (JITEK)",
    year: 2021,
    volume: "Vol. 1, No. 3, Hal. 57–62",
    url: "https://doi.org/10.55606/jitek.v1i3.306",
    description:
      "Pemanfaatan machine learning dalam sektor pendidikan serta pendekatan implementasinya.",
  },
  {
    title:
      "Perbandingan Algoritma Long Short-Term Memory dengan SVR pada Prediksi Harga Saham di Indonesia",
    authors: "Arfan A., Lussiana E. T. P.",
    journal: "Jurnal Pengkajian dan Penerapan Teknik Informatika",
    year: 2020,
    volume: "Vol. 13, No. 1, Hal. 33–43",
    url: "https://doi.org/10.33322/petir.v13i1.858",
    description:
      "Studi perbandingan algoritma LSTM dan SVR dalam prediksi saham.",
  },
  {
    title: "Konsep Dasar Natural Language Processing (NLP)",
    authors: "Ayumi V., Noprisson H., Utami M., Putra E. D., Purba M.",
    journal: "CV Jejak",
    year: 2023,
    volume: "-",
    url: "",
    description: "Buku pengantar mengenai konsep dasar dan implementasi NLP.",
  },
  {
    title:
      "Sistem Informasi Jasa Cuci Interior Rumah dan Mobil Menggunakan Metode User Acceptance Test",
    authors: "Bastari M. A., Darmansah D., Rakhmadani D. P.",
    journal: "JURIKOM (Jurnal Riset Komputer)",
    year: 2022,
    volume: "Vol. 9, No. 2, Hal. 305–315",
    url: "https://doi.org/10.33633/tc.v19i3.3498",
    description:
      "Perancangan sistem informasi berbasis UAT untuk layanan jasa kebersihan interior rumah dan mobil.",
  },
  {
    title: "Buku Ajar AI, Machine Learning & Deep Learning",
    authors: "Cholissodin I., Soebroto A.",
    journal: "Fakultas Ilmu Komputer, Universitas Brawijaya",
    year: 2019,
    volume: "-",
    url: "",
    description:
      "Buku ajar yang membahas teori dan penerapan AI, ML, dan DL untuk mahasiswa informatika.",
  },
  {
    title:
      "Kerangka Kerja Sistem Kecerdasan Buatan dalam Meningkatkan Kompetensi SDM Indonesia",
    authors: "Devianto Y., Dwiasnati S.",
    journal: "Jurnal Telekomunikasi dan Komputer",
    year: 2020,
    volume: "Vol. 10, No. 1, Hal. 19",
    url: "https://doi.org/10.22441/incomtech.v10i1.7460",
    description:
      "Penggunaan AI dalam meningkatkan kompetensi sumber daya manusia di Indonesia.",
  },
  {
    title:
      "Chatbot Development for an Interactive Academic Information Services using the Rasa Open Source Framework",
    authors: "Dirko G. S. Ruindungan, Agustinus Jacobus",
    journal: "Jurnal Teknik Elektro dan Komputer",
    year: 2021,
    volume: "Vol. 10",
    url: "https://ejournal.unsrat.ac.id/v3/index.php/elekdankom/article/view/31150",
    description:
      "Pengembangan chatbot menggunakan framework Rasa untuk layanan informasi akademik interaktif.",
  },
  {
    title:
      "Penerapan Machine Learning Untuk Prediksi Harga Saham PT. Telekomunikasi Indonesia Tbk Menggunakan Algoritma K-Nearest Neighbors",
    authors: "Fahrur Rozi, Mochammad Bagoes Satria Junianto",
    journal: "Jurnal Informatika MULTI",
    year: 2023,
    volume: "Vol. 1",
    url: "https://jurnal.publikasitecno.id/index.php/multi/index",
    description:
      "Studi penerapan K-NN dalam prediksi harga saham perusahaan telekomunikasi.",
  },
  {
    title:
      "Pengembangan Analisis Teknikal Untuk Trading Bursa Saham dengan Long Short Term Memory",
    authors: "Faris A. E. H., Arna F., Setiawardhana",
    journal: "Jurnal Media Informatika Budidarma",
    year: 2023,
    volume: "Vol. 7",
    url: "http://dx.doi.org/10.30865/mib.v7i3.6410",
    description:
      "Penggunaan LSTM dalam pengembangan analisis teknikal untuk trading saham.",
  },
  {
    title:
      "Pengujian pada Aplikasi Penggajian Pegawai dengan menggunakan Metode Blackbox",
    authors: "Febrian, V., Ramadhan, M. R., Faisal, M., Saifudin, A.",
    journal: "Jurnal Informatika Universitas Pamulang",
    year: 2020,
    volume: "Vol. 5, No. 1",
    url: "https://doi.org/10.32493/informatika.v5i1.4340",
    description:
      "Evaluasi aplikasi penggajian menggunakan metode black box testing.",
  },
  {
    title:
      "Prediksi Indeks Harga Produsen Pertanian Karet di Indonesia Menggunakan Metode LSTM",
    authors: "Firdaus, R., Mukhtar, H.",
    journal: "Jurnal Fasilkom",
    year: 2023,
    volume: "Vol. 13, No. 1",
    url: "https://doi.org/10.37859/jf.v13i01.4851",
    description:
      "Prediksi indeks harga produsen pertanian menggunakan algoritma LSTM.",
  },
  {
    title:
      "Aplikasi Chatbot untuk Layanan Informasi dan Akademik Kampus Berbasis Artificial Intelligence Markup Language (AIML)",
    authors: "Guntoro, G., Costaner, L., Lisnawita, L.",
    journal: "Digital Zone: Jurnal Teknologi Informasi dan Komunikasi",
    year: 2020,
    volume: "Vol. 11, No. 2",
    url: "https://doi.org/10.31849/digitalzone.v11i2.5049",
    description:
      "Pengembangan aplikasi chatbot berbasis AIML untuk layanan akademik kampus.",
  },
  {
    title:
      "Prediksi Kinerja Keuangan PT Astra International Tbk dengan Regresi Linear dan Exponential Smoothing",
    authors: "Herwanto, P., Marliani, N., Rosida, R.",
    journal: "Infotronik: Jurnal Teknologi Informasi dan Elektronika",
    year: 2023,
    volume: "Vol. 8, No. 1",
    url: "https://doi.org/10.32897/infotronik.2023.8.1.2734",
    description:
      "Prediksi keuangan perusahaan menggunakan regresi linear dan exponential smoothing.",
  },
  {
    title:
      "Pengujian Black Box pada Aplikasi Berita Online dengan Menggunakan Metode Boundary Value Analysis",
    authors: "Ijudin, A., Saifudin, A.",
    journal: "Jurnal Informatika Universitas Pamulang",
    year: 2020,
    volume: "Vol. 5, No. 1",
    url: "https://doi.org/10.32493/informatika.v5i1.3717",
    description:
      "Evaluasi aplikasi berita online menggunakan metode pengujian boundary value analysis.",
  },
  {
    title:
      "An Intelligent Chatbot System Based on Entity Extraction Using RASA NLU and Neural Network",
    authors: "Jiao, A.",
    journal: "Journal of Physics: Conference Series",
    year: 2020,
    volume: "Vol. 1487",
    url: "https://iopscience.iop.org/article/10.1088/1742-6596/1487/1/012014/meta",
    description:
      "Pengembangan chatbot cerdas menggunakan RASA NLU dan neural network untuk ekstraksi entitas.",
  },
  {
    title: "Siaran Pers Antusiasme Investor Muda Berinvestasi Terus Meningkat",
    authors: "KSEI",
    journal: "Ksei.co.id",
    year: 2023,
    volume: "-",
    url: "https://www.ksei.co.id/files/uploads/press_releases/press_file/id-id/232_berita_pers_antusiasme_investor_muda_berinvestasi_terus_meningkat_20231031134735.pdf.",
    description:
      "Siaran pers dari KSEI yang menyoroti peningkatan minat investasi di kalangan investor muda.",
  },
  {
    title: "Pengenalan Machine Learning dengan Python",
    authors: "Kurniawan, D.",
    journal: "Elex Media Komputindo",
    year: 2022,
    volume: "",
    url: "",
    description:
      "Buku pengantar tentang konsep dasar machine learning menggunakan bahasa pemrograman Python.",
  },
  {
    title: "Daftar Saham Blue Chip Dividen Besar 2024, Minat?",
    authors: "Merissa Chaca",
    journal: "Stockbit",
    year: 2024,
    volume: "",
    url: "https://snips.stockbit.com/investasi/daftar-saham-bluechip-dividen-besar-2024-minat",
    description:
      "Artikel yang membahas saham-saham blue chip yang memberikan dividen besar pada tahun 2024.",
  },
  {
    title:
      "Analisis Keputusan Investasi Saham dengan Pendekatan Price Earning Ratio (PER) pada PT Unilever Indonesia Tbk",
    authors: "Mustafa, A.",
    journal: "Universitas Negeri Makassar",
    year: 2020,
    volume: "",
    url: "https://eprints.unm.ac.id/",
    description:
      "Penelitian skripsi mengenai analisis investasi menggunakan rasio PER pada saham PT Unilever Indonesia Tbk.",
  },
  {
    title:
      "Siaran Pers Bersama: OJK dan BPS Umumkan Hasil Survei Nasional Literasi dan Inklusi Keuangan Tahun 2024",
    authors: "Otoritas Jasa Keuangan (OJK)",
    journal: "OJK",
    year: 2024,
    volume: "",
    url: "https://ojk.go.id/id/berita-dan-kegiatan/siaran-pers/Pages/OJK-dan-BPS-Umumkan-Hasil-Survei-Nasional-Literasi-dan-Inklusi-Keuangan-Tahun-2024.aspx",
    description:
      "Laporan hasil survei nasional mengenai literasi dan inklusi keuangan di Indonesia pada tahun 2024.",
  },
  {
    title:
      "Kriteria Pemilihan dan Analisis Perbandingan Framework Chatbot Populer untuk Implementasi di Perpustakaan",
    authors: "Permadi, I., Prayitno, H., & SE, C.",
    journal: "Jurnal Perpustakaan Universitas Airlangga",
    year: 2023,
    volume: "Vol. 13, No. 2",
    url: "https://doi.org/10.20473/jpua.v13i2.2023.94-103",
    description:
      "Studi literatur sistematis tentang perbandingan berbagai framework chatbot untuk kebutuhan perpustakaan.",
  },
  {
    title: "Artificial Intelligence",
    authors: "Repi, V. V. R. et al.",
    journal: "PT Penamuda Media",
    year: 2024,
    volume: "",
    url: "",
    description:
      "Buku yang menjelaskan berbagai konsep dan penerapan kecerdasan buatan dalam berbagai bidang.",
  },
  {
    title:
      "Implementasi Deep Learning Menggunakan Arsitektur Long Short Term Memory (LSTM) untuk Prediksi Curah Hujan Kota Malang",
    authors: "Rizki, M., Basuki, S., & Azhar, Y.",
    journal: "Jurnal Repositor",
    year: 2020,
    volume: "Vol. 2, No. 3",
    url: "https://doi.org/10.22219/repositor.v2i3.30499",
    description:
      "Penelitian penerapan LSTM dalam memprediksi curah hujan sebagai studi kasus di Kota Malang.",
  },
  {
    title: "Saham Perbankan RI Seksi di Mata Asing, Ini Alasannya",
    authors: "Romys Binekasri",
    journal: "CNBC Indonesia",
    year: 2023,
    volume: "",
    url: "https://www.cnbcindonesia.com/market/20230803173849-17-459960/saham-perbankanri-seksi-di-mata-asing-ini-alasannya",
    description:
      "Artikel yang membahas minat investor asing terhadap saham-saham perbankan di Indonesia.",
  },
  {
    title: "Artificial Intelligence: A Modern Approach (4th Edition)",
    authors: "Russell, S. J., & Norvig, P.",
    journal: "Prentice Hall",
    year: 2020,
    volume: "",
    url: "",
    description:
      "Buku referensi utama dalam bidang kecerdasan buatan yang membahas teori dan aplikasinya secara mendalam.",
  },
  {
    title:
      "Analisis Sentimen Kepuasan Pengguna Aplikasi Whatsapp Menggunakan Algoritma Naïve Bayes dan Support Vector Machine",
    authors: "Saepulrohman, A., Saepudin, S., & Gustian, D.",
    journal:
      "@is The Best: Accounting Information Systems and Information Technology Business Enterprise",
    year: 2021,
    volume: "Vol. 6, No. 2",
    url: "https://doi.org/10.34010/aisthebest.v6i2.4919",
    description:
      "Penelitian tentang analisis sentimen pengguna aplikasi WhatsApp menggunakan algoritma machine learning.",
  },
  {
    title:
      "Machine learning: Algorithms, real-world applications and research directions",
    authors: "Sarker, I. H.",
    journal: "SN Computer Science",
    year: 2021,
    volume: "2(3), 160",
    url: "https://doi.org/10.1007/s42979-021-00592-x",
    description:
      "Ulasan lengkap tentang algoritma machine learning, penerapan di dunia nyata, dan arah penelitian ke depan.",
  },
  {
    title:
      "A Stock Prediction System Using Teknikal Indicators with the LSTM Method",
    authors: "Saputra, R. A.",
    journal:
      "International Journal on Information and Communication Technology (IJoICT)",
    year: 2023,
    volume: "9(1), 27–43",
    url: "https://doi.org/10.21108/ijoict.v9i1.713",
    description:
      "Penelitian tentang prediksi harga saham menggunakan indikator teknikal dengan metode LSTM.",
  },
  {
    title: "Fintech Chatbot Using Natural Language",
    authors: "Shastry M, Nagasuhas",
    journal: "SSRN",
    year: 2023,
    volume: "-",
    url: "http://dx.doi.org/10.2139/ssrn.4461827",
    description:
      "Implementasi chatbot fintech berbasis pemrosesan bahasa alami.",
  },
  {
    title:
      "Sistem Tanya Jawab Konsultasi Shalat Berbasis RASA Natural Language Understanding (NLU)",
    authors: "Sholahuddin, M. R., & Atqiya, F.",
    journal: "Jurnal Pendidikan Multimedia (Edsence)",
    year: 2021,
    volume: "3(2), 93-102",
    url: "https://doi.org/10.17509/edsence.v3i2.38732",
    description:
      "Sistem chatbot berbasis RASA untuk menjawab konsultasi keagamaan.",
  },
  {
    title:
      "Model Pemeringkatan Risk dan Return Saham Blue Chip yang Terdaftar pada LQ45 Bursa Efek Indonesia",
    authors: "Soebrati, N. W., Rahmiyati, N., & Ratnawati, T.",
    journal: "JEB17: Jurnal Ekonomi dan Bisnis",
    year: 2019,
    volume: "Maret, 4",
    url: "https://jurnal.untagsby.ac.id/index.php/JEB17/article/view/2414",
    description: "Pemeringkatan risiko dan return pada saham blue chip LQ45.",
  },
  {
    title:
      "Perbandingan Algoritma Linear Regression, LSTM, dan GRU dalam Memprediksi Harga Saham dengan Model Time Series",
    authors: "Sofi, K., Sunge, A. S., Riady, S. R., & Kamalia, A. Z.",
    journal: "PROSIDING SEMINASTIKA",
    year: 2021,
    volume: "3(1), 39-46",
    url: "https://doi.org/10.47002/seminastika.v3i1.275",
    description:
      "Analisis komparatif algoritma prediksi harga saham berbasis time series.",
  },
  {
    title: "Investasi Saham",
    authors: "Suratna, S., Widjanarko, H., & Wibawa, T.",
    journal: "-",
    year: 2020,
    volume: "-",
    url: "http://eprints.upnyk.ac.id/id/eprint/27577",
    description: "Buku referensi dasar mengenai investasi saham di Indonesia.",
  },
  {
    title: "Prediksi Harga Saham menggunakan Metode Recurrent Neural Network",
    authors: "Suyudi, M. A. D., Djamal, E. C., & Maspupah, A.",
    journal: "Seminar Nasional Aplikasi Teknologi Informasi (SNATI)",
    year: 2019,
    volume: "-",
    url: "https://doi.org/10.47065/josyc.v4i4.4014",
    description:
      "Penerapan RNN untuk memprediksi harga saham berbasis data historis.",
  },
  {
    title: "Mengenal Algoritma Long Short Term Memory (LSTM)",
    authors: "Trivusi",
    journal: "trivusi.web.id",
    year: 2022,
    volume: "-",
    url: "https://www.trivusi.web.id/2022/07/algoritmalstm.html",
    description: "Penjelasan algoritma LSTM secara praktis dan aplikatif.",
  },
  {
    title:
      "Analisis Keamanan Sistem Pembelajaran Online Menggunakan Metode ISSAF pada Website Universitas XYZ",
    authors: "Wardhana, A. W., & Seta, H. B.",
    journal: "Jurnal Informatik",
    year: 2021,
    volume: "3",
    url: "https://doi.org/10.52958/iftk.v17i3.3653",
    description:
      "Studi analisis keamanan sistem e-learning dengan pendekatan ISSAF.",
  },
  {
    title:
      "Deep Learning – Prediksi dan Resiko Investasi Enam Saham Bank di Indonesia",
    authors: "Widanti, Nurdina, Surawan, Tri, Agusta, & Harini",
    journal: "Jurnal Teknologi",
    year: 2022,
    volume: "10(1), 60-71",
    url: "http://jurnalftijayabaya.ac.id/index.php/JTek",
    description:
      "Prediksi dan risiko investasi saham bank menggunakan pendekatan deep learning.",
  },
  {
    title: "Deep Learning: Teori, Contoh Perhitungan, dan Implementasi",
    authors: "Yudistira, E. N., & Kom, S.",
    journal: "Deepublish Digital (CV BUDI UTAMA)",
    year: 2024,
    volume: "-",
    url: "-",
    description:
      "Buku referensi pembelajaran deep learning dengan contoh dan implementasi.",
  },
];

// Course Page Dummy Data - Sementara
export const mockCourseData = {
  title: "Saham Bluechip",
  description:
    "Belajar lengkap tentang saham bluechip, analisis, strategi, dan prediksi menggunakan LSTM.",
  modules: [
    {
      id: "module-1",
      title: "Dasar-dasar Pasar Saham",
      lessons: [
        {
          id: "lesson-1-1",
          title: "Pengantar",
          content: [
            {
              type: "text",
              value:
                "Sebelum benar-benar terjun ke dunia investasi saham, ada satu hal penting yang harus Anda pahami terlebih dahulu: fundamental dari pasar saham itu sendiri. Sama seperti Anda tidak mungkin membangun rumah tanpa memahami pondasinya, begitu pula Anda tidak akan bisa menjadi investor cerdas tanpa memahami dasar-dasarnya.",
            },
            {
              type: "image",
              src: "Icon.png",
              alt: "Saham Bluechip",
              caption: "Gambar 1. Saham Bluechip",
            },
            {
              type: "text",
              value:
                "Modul ini akan menjadi pijakan awal bagi Anda untuk mengenal apa itu saham, bagaimana cara kerja pasar saham, jenis-jenis saham yang tersedia, hingga mengenal lebih dekat jenis saham yang sering disebut-sebut para investor: saham bluechip.",
            },
          ],
        },
        {
          id: "lesson-1-2",
          title: "Apa Itu Saham?",
          content: [
            {
              type: "video",
              youtubeId: "uGzToPCX8nU",
              title: "Apa Itu Saham?",
            },
            {
              type: "text",
              value:
                "Apakah Anda pernah mendengar seseorang berkata, “Saya punya saham di perusahaan X”? Nah, itu artinya dia memiliki bagian kepemilikan atas perusahaan tersebut.",
            },
            {
              type: "text",
              value:
                "Saham adalah surat berharga yang menjadi bukti kepemilikan seseorang atas suatu perusahaan. Jika Anda membeli saham, artinya Anda telah membeli sebagian kecil dari perusahaan tersebut dan menjadi pemiliknya, meski hanya sebagian kecil.",
            },
            {
              type: "text",
              value:
                "Bayangkan jika Anda membeli saham PT Bank Central Asia (BBCA), maka secara tidak langsung Anda menjadi salah satu dari jutaan pemilik bank tersebut. Keren, kan?",
            },
            {
              type: "text",
              value:
                "Tidak hanya itu, sebagai pemilik saham, Anda juga berhak atas keuntungan perusahaan dalam bentuk dividen, serta berpotensi mendapat keuntungan dari kenaikan harga saham (capital gain). Di sisi lain, tentu saja, ada juga risiko penurunan harga saham.",
            },
            {
              type: "conclusion",
              value:
                "Dengan memiliki saham, Anda bukan sekadar menabung, tapi menanam modal untuk masa depan.",
            },
          ],
        },
        {
          id: "lesson-1-3",
          title: "Cara Kerja Pasar Saham",
          content: [
            {
              type: "video",
              youtubeId: "MXj1oSUEVv8",
              title: "Cara Kerja Pasar Saham",
            },
            {
              type: "text",
              value:
                "Sekarang Anda mungkin bertanya: “Kalau saya ingin beli saham, ke mana saya harus pergi?",
            },
            {
              type: "text",
              value: "” Jawabannya: ke pasar saham. ”",
            },
            {
              type: "text",
              value:
                "Pasar saham adalah tempat di mana penjual dan pembeli saham bertemu—seperti pasar tradisional, tapi semuanya digital. Di Indonesia, transaksi saham dilakukan melalui Bursa Efek Indonesia (BEI) dan difasilitasi oleh perusahaan sekuritas (broker).",
            },
            {
              type: "text",
              value:
                "Harga saham tidak ditentukan secara acak. Harga saham ditentukan oleh mekanisme penawaran dan permintaan. Jika banyak orang ingin membeli saham perusahaan A, harganya akan naik. Sebaliknya, jika banyak yang ingin menjual, harganya akan turun.",
            },
            {
              type: "conclusion",
              value:
                "Di pasar saham, emosi, berita, dan ekspektasi bisa mempengaruhi harga saham lebih cepat dari hitungan detik.",
            },
          ],
        },
        {
          id: "lesson-1-4",
          title: "Jenis-jenis Saham",
          content: [
            {
              type: "video",
              youtubeId: "S31nuJMUXp8",
              title: "Jenis - Jenis Saham",
            },
            {
              type: "text",
              value:
                "Sama seperti kendaraan ada yang motor, mobil, hingga truk, saham pun memiliki jenis-jenis tertentu. Dua jenis yang paling umum adalah:",
            },
            {
              type: "text",
              value:
                "1. Saham Biasa (Common Stock): Jenis saham yang paling sering dibeli oleh investor. Dengan membeli saham ini, Anda berhak untuk mendapatkan dividen dan memiliki hak suara dalam Rapat Umum Pemegang Saham (RUPS), di mana keputusan penting perusahaan dibuat. Sebagai pemegang saham biasa, Anda turut berperan dalam mengendalikan arah perusahaan melalui voting di RUPS, yang mencakup keputusan besar seperti pemilihan dewan direksi dan kebijakan korporasi lainnya.",
            },
            {
              type: "text",
              value:
                "2. Saham Preferen (Preferred Stock): Jenis saham yang memberikan hak istimewa dibandingkan saham biasa, terutama dalam hal dividen dan prioritas pembagian aset saat terjadi likuidasi perusahaan. Pemegang saham preferen mendapatkan dividen tetap yang lebih tinggi dan memiliki prioritas untuk menerima pembayaran terlebih dahulu sebelum pemegang saham biasa, namun umumnya tidak memiliki hak suara dalam Rapat Umum Pemegang Saham (RUPS).",
            },
            {
              type: "text",
              value:
                "Dari kedua jenis ini, ada satu istilah yang sering muncul di berita ekonomi: saham bluechip.",
            },
            {
              type: "text",
              value:
                "3. Saham Atas Unuk (Bearer Stock): Jenis saham yang tidak terdaftar atas nama pemiliknya, melainkan dipegang oleh siapa saja yang memiliki fisik saham tersebut. Artinya, siapapun yang memegang Bearer Stock tersebut dianggap sebagai pemiliknya, tanpa perlu tercatat dalam daftar pemegang saham perusahaan. Hal ini memberikan kemudahan dalam perpindahan kepemilikan, karena saham ini dapat dipindahkan secara langsung hanya dengan menyerahkan sahamnya.",
            },
            {
              type: "text",
              value:
                "4. Saham Terdaftar (Registered Stock): Jenis saham yang kepemilikannya tercatat di daftar pemegang saham perusahaan. Dengan demikian, perusahaan tahu siapa pemilik saham dan dapat mengirimkan dividen atau pemberitahuan lainnya langsung kepada pemegang saham yang terdaftar. Registered Stock memberikan perlindungan yang lebih baik bagi investor, karena setiap perubahan kepemilikan harus tercatat resmi.",
            },
          ],
        },
        {
          id: "lesson-1-5",
          title: "Apa Itu Saham Bluechip?",
          content: [
            {
              type: "video",
              youtubeId: "mSRBo-DmXB4",
              title: "Apa Itu Saham Bluechip?",
            },
            {
              type: "text",
              value:
                "Saham bluechip adalah saham dari perusahaan besar, stabil, dan punya rekam jejak yang terbukti kuat dalam menghasilkan keuntungan. Mereka adalah pemain utama di industrinya, sering kali menjadi pemimpin pasar, dan memiliki performa finansial yang solid.",
            },
            {
              type: "text",
              value: `Saham bluechip adalah saham dari perusahaan besar, stabil, dan punya rekam jejak yang terbukti kuat dalam menghasilkan keuntungan. Mereka adalah pemain utama di industrinya, sering kali menjadi pemimpin pasar, dan memiliki performa finansial yang solid.`,
            },
            {
              type: "text",
              value: `Ciri-ciri saham bluechip: 🟣Kapitalisasi pasar besar. 🟣Likuiditas tinggi (mudah diperjualbelikan). 🟣Membayar dividen secara konsisten. 🟣Perusahaan dikenal dan diakui luas.`,
            },
            {
              type: "text",
              value: `Contoh saham bluechip di Indonesia: 🟣BBCA (Bank Central Asia) 🟣BMRI (Bank Mandiri) 🟣BBRI (Bank Rakyat Indonesia) 🟣BBNI (Bank Negara Indonesia)`,
            },
            {
              type: "text",
              value: `Jika Anda baru pertama kali berinvestasi saham, maka saham-saham ini bisa menjadi titik awal yang aman dan menjanjikan.`,
            },
          ],
        },
      ],
    },
    {
      id: "module-2",
      title: "Analisis Fundamental",
      lessons: [
        {
          id: "lesson-2-1",
          title: "Membaca Laporan Keuangan",
          content: [
            {
              type: "text",
              value:
                "Memahami laporan keuangan seperti neraca, laporan laba rugi, dan arus kas sangat penting dalam menilai kesehatan keuangan perusahaan.",
            },
          ],
        },
        {
          id: "lesson-2-2",
          title: "Rasio Keuangan Penting",
          content: [
            {
              type: "text",
              value:
                "PER, PBV, ROE, dan DER adalah beberapa rasio keuangan penting untuk menganalisis valuasi dan profitabilitas perusahaan.",
            },
          ],
        },
        {
          id: "lesson-2-3",
          title: "Analisis Industri dan Makroekonomi",
          content: [
            {
              type: "text",
              value:
                "Faktor-faktor ekonomi seperti inflasi, suku bunga, dan pertumbuhan ekonomi memengaruhi kinerja saham dan industri.",
            },
          ],
        },
        {
          id: "lesson-2-4",
          title: "Studi Kasus: BBCA",
          content: [
            {
              type: "text",
              value:
                "Analisis mendalam tentang PT Bank Central Asia Tbk (BBCA) menggunakan pendekatan fundamental.",
            },
          ],
        },
      ],
    },
    {
      id: "module-3",
      title: "Analisis Teknikal",
      lessons: [
        {
          id: "lesson-3-1",
          title: "Dasar Grafik Saham",
          content: [
            {
              type: "text",
              value:
                "Grafik saham menunjukkan pergerakan harga suatu saham dalam rentang waktu tertentu dan merupakan dasar dari analisis teknikal.",
            },
          ],
        },
        {
          id: "lesson-3-2",
          title: "Indikator Teknikal",
          content: [
            {
              type: "text",
              value:
                "Indikator seperti MA, RSI, dan MACD membantu mengidentifikasi tren dan momentum harga saham.",
            },
          ],
        },
        {
          id: "lesson-3-3",
          title: "Support, Resistance, dan Trendline",
          content: [
            {
              type: "text",
              value:
                "Support adalah level harga bawah, resistance adalah level harga atas, dan trendline menunjukkan arah pergerakan harga.",
            },
          ],
        },
        {
          id: "lesson-3-4",
          title: "Pola Candlestick Penting",
          content: [
            {
              type: "text",
              value:
                "Pola candlestick seperti doji, engulfing, dan hammer memberikan sinyal pembalikan atau kelanjutan tren.",
            },
          ],
        },
      ],
    },
    {
      id: "module-4",
      title: "Strategi Investasi Saham Bluechip",
      lessons: [
        {
          id: "lesson-4-1",
          title: "Investasi Jangka Panjang vs Pendek",
          content: [
            {
              type: "text",
              value:
                "Strategi jangka panjang biasanya lebih stabil, sementara jangka pendek cenderung spekulatif dan berisiko tinggi.",
            },
          ],
        },
        {
          id: "lesson-4-2",
          title: "Value Investing",
          content: [
            {
              type: "text",
              value:
                "Value investing mencari saham yang diperdagangkan di bawah nilai intrinsiknya dan berpotensi memberikan keuntungan jangka panjang.",
            },
          ],
        },
        {
          id: "lesson-4-3",
          title: "Dollar Cost Averaging",
          content: [
            {
              type: "text",
              value:
                "Metode investasi dengan membeli saham secara rutin dalam jumlah tetap untuk mengurangi risiko fluktuasi harga.",
            },
          ],
        },
        {
          id: "lesson-4-4",
          title: "Manajemen Risiko dan Psikologi Investor",
          content: [
            {
              type: "text",
              value:
                "Kedisiplinan dan manajemen risiko sangat penting dalam menghindari keputusan emosional yang merugikan.",
            },
          ],
        },
      ],
    },
    {
      id: "module-5",
      title: "Teknologi dalam Prediksi Saham",
      lessons: [
        {
          id: "lesson-5-1",
          title: "Pengenalan Machine Learning",
          content: [
            {
              type: "text",
              value:
                "Machine learning memungkinkan komputer mempelajari pola dari data untuk membuat prediksi, termasuk dalam dunia saham.",
            },
          ],
        },
        {
          id: "lesson-5-2",
          title: "Apa Itu LSTM",
          content: [
            {
              type: "text",
              value:
                "LSTM adalah tipe RNN yang efektif untuk data urutan seperti harga saham historis karena mampu mengingat informasi jangka panjang.",
            },
          ],
        },
        {
          id: "lesson-5-3",
          title: "Membangun Model LSTM",
          content: [
            {
              type: "text",
              value:
                "Langkah-langkah membangun model LSTM mencakup persiapan data, desain arsitektur, pelatihan model, dan evaluasi hasil.",
            },
          ],
        },
        {
          id: "lesson-5-4",
          title: "Evaluasi Model dan Interpretasi",
          content: [
            {
              type: "text",
              value:
                "Gunakan metrik seperti MAE, RMSE, dan visualisasi prediksi untuk menilai keakuratan model LSTM.",
            },
          ],
        },
      ],
    },
    {
      id: "module-6",
      title: "Studi Kasus Saham Bluechip Indonesia",
      lessons: [
        {
          id: "lesson-6-1",
          title: "Profil Emiten Bluechip",
          content: [
            {
              type: "text",
              value:
                "Membahas profil BBCA, BBRI, BMRI, dan BBNI sebagai contoh saham bluechip di sektor perbankan Indonesia.",
            },
          ],
        },
        {
          id: "lesson-6-2",
          title: "Simulasi Investasi",
          content: [
            {
              type: "text",
              value:
                "Simulasi hasil investasi pada saham bluechip dengan berbagai strategi dalam jangka waktu berbeda.",
            },
          ],
        },
        {
          id: "lesson-6-3",
          title: "Prediksi Harga Saham dengan LSTM",
          content: [
            {
              type: "text",
              value:
                "Contoh penerapan model LSTM untuk memprediksi harga saham BBCA dan lainnya secara live.",
            },
          ],
        },
      ],
    },
    {
      id: "module-7",
      title: "Sumber dan Tools",
      lessons: [
        {
          id: "lesson-7-1",
          title: "Platform Cek Harga dan Berita",
          content: [
            {
              type: "text",
              value:
                "Gunakan RTI Business, Investing.com, dan situs IDX untuk memantau harga dan berita saham.",
            },
          ],
        },
        {
          id: "lesson-7-2",
          title: "Tools Gratis untuk Analisis",
          content: [
            {
              type: "text",
              value:
                "Gunakan Google Colab dan Python untuk membangun model prediksi saham secara gratis.",
            },
          ],
        },
      ],
    },
  ],
};
