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
              value: "Selamat datang di pintu gerbang dunia investasi!",
            },
            {
              type: "text",
              value:
                "Sebelum Anda bisa menjadi investor yang bijak, Anda harus bisa berbicara dalam bahasa saham.",
            },
            {
              type: "note",
              value: "“Saya ambil posisi di BBCA 2 lot di harga 8.500.“",
            },
            {
              type: "text",
              value:
                "Tanpa memahami istilah seperti lot, BBCA, atau harga 8.500, Anda akan merasa asing dan bingung, seolah-olah ikut dalam percakapan tapi tidak tahu apa yang sedang dibicarakan.",
            },
            {
              type: "text",
              value:
                "Fundamental dari pasar saham, sama seperti Anda tidak mungkin membangun rumah tanpa memahami pondasinya, begitu pula Anda tidak akan bisa menjadi investor cerdas tanpa memahami dasar-dasarnya.",
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
                "Modul ini akan menjadi pijakan awal bagi Anda untuk mengenal apa itu saham, hingga mengenal lebih dekat jenis saham yang sering disebut-sebut para investor: saham bluechip.",
            },
          ],
        },
        {
          id: "lesson-1-2",
          title: "Dasar Saham",
          content: [
            {
              type: "video",
              youtubeId: "uGzToPCX8nU",
              title: "Apa Itu Saham?",
            },
            {
              type: "subtitle",
              value: "Apa itu Saham?",
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
                "Dengan memiliki saham, Anda bukan sekadar menabung, tapi menanam modal untuk masa depan. Memiliki saham = ikut menikmati manisnya laba, dan pahitnya risiko.",
            },
          ],
        },
        {
          id: "lesson-1-3",
          title: "Lot dan Ticker — Dasar dari Segalanya",
          content: [
            {
              type: "image",
              src: "Stockticker.jpg",
              alt: "Stock Ticker",
              caption: "Gambar 2. Stock Ticker",
            },
            {
              type: "subtitle",
              value: "Apa itu Lot?",
            },
            {
              type: "text",
              value:
                "Di bursa Indonesia, saham diperjualbelikan dalam satuan lot, bukan lembar.",
            },
            {
              type: "note",
              value: "👉 1 lot = 100 lembar saham.",
            },
            {
              type: "list",
              value:
                "Harga saham BBCA = Rp9.000 \nMaka 1 lot BBCA = 100 x 9.000 = Rp900.000",
              list: "ul",
            },
            {
              type: "text",
              value:
                "Mulai terasa ringan, kan? Dulu mungkin butuh jutaan untuk beli saham, sekarang cukup ratusan ribu.",
            },
            {
              type: "subtitle",
              value: "Apa itu Ticker atau Kode Saham?",
            },
            {
              type: "text",
              value:
                "Setiap saham punya kode unik, biasanya terdiri dari 4 huruf kapital.",
            },
            {
              type: "list",
              value:
                "BBCA = Bank Central Asia \nBBRI = Bank Rakyat Indonesia \nBMRI = Bank Mandiri \nBBNI = Bank Negara Indonesia",
              list: "ul",
            },
            {
              type: "text",
              value: "Kode ini penting karena:",
            },
            {
              type: "list",
              value:
                "Digunakan dalam pencarian di aplikasi trading \nDitampilkan dalam grafik, laporan, berita, dan analisis",
              list: "ul",
            },
            {
              type: "note",
              value:
                "Hafalkan kode saham bluechip sejak awal, karena Anda akan sering menjumpainya.",
            },
          ],
        },
        {
          id: "lesson-1-4",
          title: "Istilah Transaksi Saham — Beli, Jual, & Harga",
          content: [
            {
              type: "image",
              src: "JualbeliSaham.jpg",
              alt: "Jual Beli Saham",
              caption: "Gambar 3. Jual Beli Saham",
            },
            {
              type: "subtitle",
              value: "Harga Beli dan Jual (Bid & Offer)",
            },
            {
              type: "text",
              value:
                "Dalam sistem perdagangan saham, harga selalu bergerak naik-turun.",
            },
            {
              type: "text",
              value: "Ada dua istilah penting:",
            },
            {
              type: "list",
              value:
                "Bid = harga beli tertinggi yang ditawarkan oleh investor \nOffer = harga jual terendah yang diminta oleh investor",
            },
            {
              type: "text",
              value: "Contoh:",
            },
            {
              type: "list",
              value:
                "Investor A ingin beli BBCA di Rp8.900 (bid) \nInvestor B ingin jual BBCA di Rp8.950 (offer)",
            },
            {
              type: "text",
              value:
                "Transaksi hanya terjadi kalau kedua pihak sepakat. Di sinilah hukum pasar bekerja.",
            },
            {
              type: "subtitle",
              value: "Antri di Order Book",
            },
            {
              type: "text",
              value:
                "Order Book adalah daftar antrean pembelian dan penjualan.",
            },
            {
              type: "text",
              value: "Investor pemula sering heran:",
            },
            {
              type: "note",
              value: "“Kok sudah saya klik beli, tapi nggak langsung dapat?“",
            },
            {
              type: "text",
              value:
                "Jawabannya: karena Anda mengantri. Kalau tidak pas dengan harga jual yang tersedia, maka harus menunggu.",
            },
            {
              type: "text",
              value:
                "Dan semakin tinggi permintaan, semakin cepat antrian bergerak.",
            },
            {
              type: "subtitle",
              value: "Fee Transaksi",
            },
            {
              type: "text",
              value: "Setiap kali Anda beli/jual saham, ada biaya transaksi:",
            },
            {
              type: "list",
              value:
                "Fee beli: sekitar 0.1% s.d 0.15% \nFee jual: sekitar 0.2% s.d 0.3% (sudah termasuk pajak final 0.1%)",
            },
            {
              type: "text",
              value: "Contoh:",
            },
            {
              type: "list",
              value:
                "Anda beli saham Rp1.000.000 dengan fee 0.15%, maka total jadi Rp1.001.500 \nAnda jual Rp1.100.000, maka hasil bersih Anda jadi ±Rp1.096.700",
            },
            {
              type: "note",
              value:
                "Jangan lupa hitung fee agar tidak salah perhitungan profit.",
            },
          ],
        },
        {
          id: "lesson-1-5",
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
                "Pasar saham adalah tempat di mana penjual dan pembeli saham bertemu seperti pasar tradisional, tapi semuanya digital. Di Indonesia, transaksi saham dilakukan melalui Bursa Efek Indonesia (BEI) dan difasilitasi oleh perusahaan sekuritas (broker).",
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
          id: "lesson-1-6",
          title: "Dividen, Capital Gain, dan Risiko",
          content: [
            {
              type: "image",
              src: "Profit.jpg",
              alt: "Keuntungan",
              caption: "Gambar 4. Keuntungan",
            },
            {
              type: "subtitle",
              value: "Dividen",
            },
            {
              type: "text",
              value:
                "Dividen adalah bagian keuntungan perusahaan yang dibagikan ke pemegang saham.",
            },
            {
              type: "text",
              value: "Ada dua bentuk:",
            },
            {
              type: "list",
              value:
                "Dividen tunai: uang langsung ke rekening RDN Anda \nDividen saham: tambahan lembar saham ke portofolio",
              list: "ul",
            },
            {
              type: "text",
              value:
                "Tapi tidak semua perusahaan membagikan dividen. Biasanya hanya perusahaan yang sudah stabil dan untung besar—inilah mengapa saham bluechip sering dicari.",
            },
            {
              type: "subtitle",
              value: "Capital Gain",
            },
            {
              type: "text",
              value:
                "Capital gain adalah selisih antara harga jual dan beli saham.",
            },
            {
              type: "text",
              value: "Contoh:",
            },
            {
              type: "list",
              value: "Beli BBCA di Rp8.500 \nJual BBCA di Rp9.000",
              list: "ul",
            },
            {
              type: "note",
              value: "Capital gain = Rp500 per lembar x 100 = Rp50.000",
            },
            {
              type: "text",
              value:
                "Tapi jangan lupa, bisa juga rugi (capital loss) kalau harga turun saat Anda jual.",
            },
            {
              type: "subtitle",
              value: "Risiko Investasi Saham",
            },
            {
              type: "text",
              value: "Setiap peluang datang dengan risiko:",
            },
            {
              type: "list",
              value:
                "Harga turun karena kondisi pasar, emiten, atau global \nEmiten bangkrut \nEmosi pribadi (takut, serakah, panik)",
              list: "ul",
            },
            {
              type: "conclusion",
              value:
                "Prinsip utama: jangan beli saham hanya karena ikut-ikutan.",
            },
          ],
        },
        {
          id: "lesson-1-7",
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
              type: "list",
              value:
                "Saham Biasa (Common Stock): Jenis saham yang paling sering dibeli oleh investor. Dengan membeli saham ini, Anda berhak untuk mendapatkan dividen dan memiliki hak suara dalam Rapat Umum Pemegang Saham (RUPS), di mana keputusan penting perusahaan dibuat. Sebagai pemegang saham biasa, Anda turut berperan dalam mengendalikan arah perusahaan melalui voting di RUPS, yang mencakup keputusan besar seperti pemilihan dewan direksi dan kebijakan korporasi lainnya.",
              list: "ul",
            },
            {
              type: "list",
              value:
                "Saham Preferen (Preferred Stock): Jenis saham yang memberikan hak istimewa dibandingkan saham biasa, terutama dalam hal dividen dan prioritas pembagian aset saat terjadi likuidasi perusahaan. Pemegang saham preferen mendapatkan dividen tetap yang lebih tinggi dan memiliki prioritas untuk menerima pembayaran terlebih dahulu sebelum pemegang saham biasa, namun umumnya tidak memiliki hak suara dalam Rapat Umum Pemegang Saham (RUPS).",
              list: "ul",
            },
            {
              type: "text",
              value:
                "Dari kedua jenis ini, ada satu istilah yang sering muncul di berita ekonomi: saham bluechip.",
            },
            {
              type: "list",
              value:
                "Saham Atas Unuk (Bearer Stock): Jenis saham yang tidak terdaftar atas nama pemiliknya, melainkan dipegang oleh siapa saja yang memiliki fisik saham tersebut. Artinya, siapapun yang memegang Bearer Stock tersebut dianggap sebagai pemiliknya, tanpa perlu tercatat dalam daftar pemegang saham perusahaan. Hal ini memberikan kemudahan dalam perpindahan kepemilikan, karena saham ini dapat dipindahkan secara langsung hanya dengan menyerahkan sahamnya.",
              list: "ul",
            },
            {
              type: "list",
              value:
                "Saham Terdaftar (Registered Stock): Jenis saham yang kepemilikannya tercatat di daftar pemegang saham perusahaan. Dengan demikian, perusahaan tahu siapa pemilik saham dan dapat mengirimkan dividen atau pemberitahuan lainnya langsung kepada pemegang saham yang terdaftar. Registered Stock memberikan perlindungan yang lebih baik bagi investor, karena setiap perubahan kepemilikan harus tercatat resmi.",
              list: "ul",
            },
          ],
        },
        {
          id: "lesson-1-8",
          title: "Aksi Korporasi & Istilah Lanjutan",
          content: [
            {
              type: "image",
              src: "CorporateAction.jpg",
              alt: "Corporate Action",
              caption: "Gambar 5. Corporate Action",
            },
            {
              type: "subtitle",
              value: "Corporate Actions",
            },
            {
              type: "text",
              value:
                "Perusahaan bisa melakukan tindakan khusus yang berdampak langsung ke Anda, sebagai investor:",
            },
            {
              type: "list",
              value:
                "Right Issue, Kesempatan beli saham baru dengan harga diskon, khusus untuk pemegang saham lama. \nStock split, memecah harga agar lebih terjangkau. \nReverse split, menggabungkan lembar saham agar harga naik. \nWaran & Obligasi Konversi, Hak membeli saham di masa depan dengan harga tertentu. \nDelisting, Saham dikeluarkan dari bursa, biasanya karena pailit atau alasan bisnis. Hati-hati jika ini terjadi!",
              list: "ol",
            },
            {
              type: "subtitle",
              value: "Saham Bluechip",
            },
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
              value: `Ciri-ciri saham bluechip:`,
            },
            {
              type: "list",
              value: `Kapitalisasi pasar besar. \nLikuiditas tinggi (mudah diperjualbelikan). \nMembayar dividen secara konsisten. \nPerusahaan dikenal dan diakui luas.`,
              list: "ul",
            },
            {
              type: "text",
              value: `Contoh saham bluechip di Indonesia:`,
            },
            {
              type: "list",
              value: `BBCA (Bank Central Asia) \nBMRI (Bank Mandiri) \nBBRI (Bank Rakyat Indonesia) \nBBNI (Bank Negara Indonesia)`,
              list: "ol",
            },
            {
              type: "text",
              value: `Jika Anda baru pertama kali berinvestasi saham, maka saham-saham ini bisa menjadi titik awal yang aman dan menjanjikan.`,
            },
          ],
        },
        {
          id: "lesson-1-9",
          title: "Penutup",
          content: [
            {
              type: "text",
              value: "Modul ini adalah fondasi. Sekarang Anda:",
            },
            {
              type: "list",
              value:
                "Tidak asing lagi dengan istilah saham \nBisa membaca order book dan tahu arti 1 lot \nPaham bahwa saham bukan hanya angka—tapi bagian dari perusahaan nyata \nSiap melangkah ke modul berikutnya!",
              list: "ul",
            },
          ],
        },
      ],
    },
    {
      id: "module-2",
      title: "Memulai Investasi Saham - Langkah Nyata Menjadi Investor",
      lessons: [
        {
          id: "lesson-2-0",
          title: "Pengantar",
          content: [
            {
              type: "text",
              value:
                "Sekarang Anda telah memahami pondasi dasar tentang apa itu saham dan bagaimana pasar saham bekerja. Di modul ini, kita akan melangkah lebih jauh: bagaimana cara Anda benar-benar memulai investasi saham. Banyak calon investor berhenti di teori, padahal langkah pertama itulah yang paling menentukan.",
            },
            {
              type: "image",
              src: "Analyze.jpg",
              alt: "Analisis Saham",
              caption: "Gambar 2. Analisis Saham",
            },
            {
              type: "text",
              value: `Jika Anda sudah sampai di sini, artinya Anda tidak hanya ingin “tahu” tentang saham - Anda siap bertindak.`,
            },
            {
              type: "note",
              value: `Di dunia investasi, tidak ada hasil tanpa tindakan.`,
            },
            {
              type: "text",
              value: `Di Modul ini, kita akan bahas cara konkret memulai investasi saham. Dari persyaratan administratif, cara membuka akun, mengisi dana, memilih saham pertama, sampai strategi agar langkah awal Anda tidak berujung kekecewaan.`,
            },
            {
              type: "text",
              value: `Modul ini adalah jembatan dari “belajar” ke “berinvestasi”. Siapkan diri Anda — dunia investasi siap Anda jelajahi!`,
            },
          ],
        },
        {
          id: "lesson-2-1",
          title: "Syarat & Persiapan Sebelum Investasi",
          content: [
            {
              type: "text",
              value:
                "Mungkin Anda bertanya-tanya, “Saya harus punya berapa banyak uang dulu untuk mulai investasi?”",
            },
            {
              type: "text",
              value: `Tenang. Zaman sudah berubah. Jika dulu butuh jutaan rupiah untuk membeli saham, kini Anda bisa mulai hanya dengan Rp100.000 saja.`,
            },
            {
              type: "image",
              src: "Requirement.jpg",
              alt: "Persyaratan",
              caption: "Gambar 3. Persyaratan",
            },
            {
              type: "text",
              value: `Namun sebelum klik “Beli”, pastikan Anda sudah memenuhi beberapa hal penting:`,
            },
            {
              type: "list",
              value: `Mendaftar di perusahaan sekuritas resmi, mereka akan menjadi perantara Anda di pasar saham. \nLangkah demi langkah membuka rekening di perusahaan sekuritas. \nUsia minimal 17 tahun dengan KTP atau paspor yang masih berlaku. \nMemiliki rekening bank pribadi (untuk transaksi keluar-masuk dana). \nMembuka Rekening Dana Nasabah(RDN), rekening khusus di bawah pengawasan Bursa Efek. \nDownload aplikasi trading dan login akun Anda.`,
            },
            {
              type: "text",
              value: `Tidak kalah penting: Anda juga perlu mental yang siap belajar dan tidak mudah panik. Investasi bukan jalan pintas menjadi kaya, melainkan proses cerdas membangun masa depan.`,
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
