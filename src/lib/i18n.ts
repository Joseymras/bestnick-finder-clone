// Country-targeted nickname pages. Each locale ships its own metadata, copy and
// FAQ so the page can rank in local search results instead of relying on
// machine translation of the English page at request time.

export interface Locale {
  /** URL slug, e.g. /nicknames/es */
  code: string;
  /** hreflang value written into <link rel="alternate"> */
  hreflang: string;
  /** Language name in English */
  label: string;
  /** Language name for native speakers */
  native: string;
  dir: "ltr" | "rtl";
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: { h2: string; body: string }[];
  faqs: { q: string; a: string }[];
  labels: {
    generate: string;
    styleIt: string;
    results: string;
    trending: string;
    input: string;
  };
}

export const LOCALES: Locale[] = [
  {
    code: "es",
    hreflang: "es",
    label: "Spanish",
    native: "Español",
    dir: "ltr",
    title: "Generador de Nicks y Nombres Estilosos — BestNickFinder",
    description:
      "Crea nicks y nombres estilosos gratis con letras raras y símbolos para Free Fire, TikTok, Instagram y Discord. Copia y usa en segundos.",
    h1: "Generador de nicks y nombres estilosos",
    intro:
      "Escribe tu nombre o pulsa generar para obtener nicks originales al instante. Convierte cualquier texto en letras raras, añade símbolos y copia el resultado con un clic para Free Fire, TikTok, Instagram, Discord o Roblox.",
    sections: [
      {
        h2: "Cómo crear un nick que se recuerde",
        body: "Un buen nick es corto, fácil de pronunciar y no se parece al de nadie más. Empieza con una palabra que te represente, añade una segunda palabra corta y prueba variantes con puntos, guiones bajos o símbolos decorativos. Genera varias opciones, marca las que te gusten y expórtalas para decidir con calma antes de reservar el nombre en tus plataformas.",
      },
      {
        h2: "Nicks para juegos y redes sociales",
        body: "Cada plataforma tiene reglas distintas: Free Fire y PUBG aceptan símbolos decorativos, Instagram y TikTok solo admiten letras, números, puntos y guiones bajos, y Discord permite letras raras en el nombre visible. Prueba el nick antes de pagar una tarjeta de cambio de nombre y guarda dos alternativas por si la primera ya está ocupada.",
      },
    ],
    faqs: [
      {
        q: "¿Es gratis el generador de nicks?",
        a: "Sí. Todas las herramientas son gratuitas, sin registro y funcionan directamente en el navegador.",
      },
      {
        q: "¿Puedo usar letras raras en Free Fire?",
        a: "Sí. Copia el resultado del generador de letras y pégalo en el campo de nombre del juego. Si el juego lo rechaza, prueba un estilo con menos símbolos.",
      },
      {
        q: "¿Los nicks son únicos?",
        a: "Se generan combinando miles de palabras y símbolos, así que casi siempre obtendrás algo libre. Comprueba la disponibilidad en la plataforma antes de reservarlo.",
      },
    ],
    labels: {
      generate: "Generar nicks",
      styleIt: "Estiliza tu nombre",
      results: "Resultados",
      trending: "Tendencias",
      input: "Escribe tu nombre",
    },
  },
  {
    code: "pt",
    hreflang: "pt",
    label: "Portuguese",
    native: "Português",
    dir: "ltr",
    title: "Gerador de Nicks e Nomes Estilizados — BestNickFinder",
    description:
      "Gere nicks e nomes estilizados grátis com letras diferentes e símbolos para Free Fire, TikTok, Instagram e Discord. Copie e use na hora.",
    h1: "Gerador de nicks e nomes estilizados",
    intro:
      "Digite seu nome ou clique em gerar para receber nicks originais na hora. Transforme qualquer texto em letras diferentes, adicione símbolos e copie com um clique para Free Fire, TikTok, Instagram, Discord ou Roblox.",
    sections: [
      {
        h2: "Como escolher um nick marcante",
        body: "Nicks memoráveis são curtos, fáceis de falar em voz alta e não dependem de números aleatórios. Comece por uma palavra que combine com o seu estilo de jogo, acrescente uma segunda palavra curta e teste variações com ponto, underline ou símbolos. Marque os favoritos e exporte a lista antes de mudar o nome nas suas contas.",
      },
      {
        h2: "Nicks para jogos e redes sociais",
        body: "O Free Fire e o PUBG aceitam símbolos decorativos; Instagram e TikTok aceitam apenas letras, números, pontos e underline. No Discord você pode usar letras estilizadas no apelido do servidor. Tenha sempre uma segunda opção pronta, porque nomes populares costumam já estar em uso.",
      },
    ],
    faqs: [
      {
        q: "O gerador de nicks é gratuito?",
        a: "Sim, todas as ferramentas são gratuitas, sem cadastro, e funcionam no próprio navegador.",
      },
      {
        q: "Posso usar letras diferentes no Free Fire?",
        a: "Sim. Copie o texto estilizado e cole no campo de nome do jogo. Se não for aceito, escolha um estilo com menos símbolos.",
      },
      {
        q: "Consigo salvar minha lista de nicks?",
        a: "Sim. Selecione os nicks que gostou e exporte como texto, PNG ou SVG para decidir depois.",
      },
    ],
    labels: {
      generate: "Gerar nicks",
      styleIt: "Estilize seu nome",
      results: "Resultados",
      trending: "Em alta",
      input: "Digite seu nome",
    },
  },
  {
    code: "hi",
    hreflang: "hi",
    label: "Hindi",
    native: "हिन्दी",
    dir: "ltr",
    title: "निकनेम जेनरेटर और स्टाइलिश नाम मेकर — BestNickFinder",
    description:
      "फ्री फायर, इंस्टाग्राम, टिकटॉक और डिस्कॉर्ड के लिए स्टाइलिश नाम और निकनेम बनाएं। मुफ्त, बिना साइन-अप, एक क्लिक में कॉपी करें।",
    h1: "निकनेम जेनरेटर और स्टाइलिश नाम मेकर",
    intro:
      "अपना नाम लिखें या जेनरेट दबाएं और तुरंत नए निकनेम पाएं। किसी भी टेक्स्ट को स्टाइलिश फॉन्ट में बदलें, सिंबल जोड़ें और Free Fire, TikTok, Instagram, Discord या Roblox के लिए एक क्लिक में कॉपी करें।",
    sections: [
      {
        h2: "अच्छा निकनेम कैसे चुनें",
        body: "छोटा, बोलने में आसान और आपकी पहचान से जुड़ा नाम सबसे अच्छा चलता है। पहले एक ऐसा शब्द चुनें जो आपके गेमिंग स्टाइल को दिखाए, फिर दूसरा छोटा शब्द जोड़ें और डॉट, अंडरस्कोर या सिंबल के साथ वेरिएंट आज़माएं। पसंद के नाम टिक करके लिस्ट एक्सपोर्ट कर लें।",
      },
      {
        h2: "गेम और सोशल मीडिया के लिए नाम",
        body: "Free Fire और PUBG में सजावटी सिंबल चलते हैं, पर Instagram और TikTok सिर्फ अक्षर, अंक, डॉट और अंडरस्कोर स्वीकार करते हैं। नाम बदलने का कार्ड खर्च करने से पहले नाम टेस्ट करें और एक बैकअप विकल्प तैयार रखें।",
      },
    ],
    faqs: [
      {
        q: "क्या यह निकनेम जेनरेटर मुफ्त है?",
        a: "हाँ, सभी टूल पूरी तरह मुफ्त हैं, साइन-अप की जरूरत नहीं और सब कुछ ब्राउज़र में चलता है।",
      },
      {
        q: "क्या Free Fire में स्टाइलिश फॉन्ट काम करते हैं?",
        a: "हाँ। स्टाइल किया हुआ नाम कॉपी करके गेम के नाम फ़ील्ड में पेस्ट करें। अगर स्वीकार न हो तो कम सिंबल वाला स्टाइल चुनें।",
      },
      {
        q: "क्या मैं अपनी पसंद के नाम सेव कर सकता हूँ?",
        a: "हाँ। पसंदीदा नाम चुनें और उन्हें टेक्स्ट, PNG या SVG के रूप में डाउनलोड करें।",
      },
    ],
    labels: {
      generate: "निकनेम बनाएं",
      styleIt: "नाम स्टाइल करें",
      results: "परिणाम",
      trending: "ट्रेंडिंग",
      input: "अपना नाम लिखें",
    },
  },
  {
    code: "id",
    hreflang: "id",
    label: "Indonesian",
    native: "Bahasa Indonesia",
    dir: "ltr",
    title: "Generator Nickname & Nama Keren — BestNickFinder",
    description:
      "Buat nickname dan nama keren gratis dengan huruf unik serta simbol untuk Free Fire, TikTok, Instagram, dan Discord. Salin dalam sekali klik.",
    h1: "Generator nickname dan nama keren",
    intro:
      "Tulis namamu atau tekan generate untuk mendapatkan nickname baru seketika. Ubah teks apa pun menjadi huruf unik, tambahkan simbol, lalu salin sekali klik untuk Free Fire, TikTok, Instagram, Discord, atau Roblox.",
    sections: [
      {
        h2: "Cara memilih nickname yang gampang diingat",
        body: "Nickname terbaik itu singkat, mudah diucapkan, dan tidak bergantung pada angka acak. Mulai dari satu kata yang mewakili gaya bermainmu, tambahkan satu kata pendek lagi, lalu coba variasi dengan titik, garis bawah, atau simbol. Centang favoritmu dan ekspor daftarnya sebelum mengganti nama akun.",
      },
      {
        h2: "Nickname untuk game dan media sosial",
        body: "Free Fire dan PUBG menerima simbol dekoratif, sedangkan Instagram dan TikTok hanya menerima huruf, angka, titik, dan garis bawah. Siapkan satu nama cadangan karena nama populer biasanya sudah dipakai orang lain.",
      },
    ],
    faqs: [
      {
        q: "Apakah generator ini gratis?",
        a: "Ya, semua alat gratis, tanpa pendaftaran, dan berjalan langsung di browser.",
      },
      {
        q: "Bisakah huruf unik dipakai di Free Fire?",
        a: "Bisa. Salin hasilnya dan tempel di kolom nama dalam game. Jika ditolak, pilih gaya dengan lebih sedikit simbol.",
      },
      {
        q: "Bisakah saya menyimpan daftar nickname?",
        a: "Bisa. Pilih nickname favorit lalu unduh sebagai teks, PNG, atau SVG.",
      },
    ],
    labels: {
      generate: "Buat nickname",
      styleIt: "Gaya namamu",
      results: "Hasil",
      trending: "Sedang tren",
      input: "Tulis namamu",
    },
  },
  {
    code: "ar",
    hreflang: "ar",
    label: "Arabic",
    native: "العربية",
    dir: "rtl",
    title: "مولد أسماء وألقاب مزخرفة — BestNickFinder",
    description:
      "أنشئ أسماء وألقاب مزخرفة مجانًا بحروف وزخرفة ورموز لفري فاير وإنستغرام وتيك توك وديسكورد، وانسخها بضغطة واحدة.",
    h1: "مولد أسماء وألقاب مزخرفة",
    intro:
      "اكتب اسمك أو اضغط على زر التوليد للحصول على ألقاب جديدة فورًا. حوّل أي نص إلى حروف مزخرفة، أضف الرموز، وانسخ النتيجة بضغطة واحدة لاستخدامها في فري فاير وتيك توك وإنستغرام وديسكورد وروبلوكس.",
    sections: [
      {
        h2: "كيف تختار لقبًا يسهل تذكره",
        body: "أفضل الألقاب قصيرة وسهلة النطق ولا تعتمد على أرقام عشوائية. ابدأ بكلمة تعبر عن أسلوبك، أضف كلمة قصيرة ثانية، ثم جرّب صيغًا مختلفة بالنقطة أو الشرطة السفلية أو الرموز الزخرفية. حدّد ما يعجبك وصدّر القائمة قبل تغيير الاسم في حساباتك.",
      },
      {
        h2: "ألقاب للألعاب ووسائل التواصل",
        body: "تقبل فري فاير وببجي الرموز الزخرفية، أما إنستغرام وتيك توك فتقبل الحروف والأرقام والنقطة والشرطة السفلية فقط. اختبر الاسم قبل استخدام بطاقة تغيير الاسم، واحتفظ ببديل جاهز لأن الأسماء الشائعة غالبًا محجوزة.",
      },
    ],
    faqs: [
      {
        q: "هل الأداة مجانية؟",
        a: "نعم، جميع الأدوات مجانية بدون تسجيل وتعمل داخل المتصفح مباشرة.",
      },
      {
        q: "هل تعمل الحروف المزخرفة في فري فاير؟",
        a: "نعم. انسخ النص المزخرف والصقه في خانة الاسم داخل اللعبة، وإذا رُفض فاختر نمطًا بزخرفة أقل.",
      },
      {
        q: "هل يمكنني حفظ الألقاب المفضلة؟",
        a: "نعم. حدّد الألقاب التي تعجبك ونزّلها كنص أو صورة PNG أو SVG.",
      },
    ],
    labels: {
      generate: "توليد الألقاب",
      styleIt: "زخرفة الاسم",
      results: "النتائج",
      trending: "الأكثر رواجًا",
      input: "اكتب اسمك",
    },
  },
  {
    code: "fr",
    hreflang: "fr",
    label: "French",
    native: "Français",
    dir: "ltr",
    title: "Générateur de Pseudos et Noms Stylés — BestNickFinder",
    description:
      "Créez gratuitement des pseudos et noms stylés avec des lettres spéciales et des symboles pour Free Fire, Instagram, TikTok et Discord.",
    h1: "Générateur de pseudos et noms stylés",
    intro:
      "Saisissez votre nom ou lancez le générateur pour obtenir des pseudos originaux immédiatement. Transformez n'importe quel texte en lettres stylées, ajoutez des symboles et copiez le résultat en un clic pour Free Fire, TikTok, Instagram, Discord ou Roblox.",
    sections: [
      {
        h2: "Comment choisir un pseudo mémorable",
        body: "Un bon pseudo est court, facile à prononcer et ne repose pas sur des chiffres au hasard. Partez d'un mot qui reflète votre style de jeu, ajoutez un second mot court, puis testez des variantes avec un point, un tiret bas ou des symboles décoratifs. Cochez vos préférés et exportez la liste avant de changer de nom.",
      },
      {
        h2: "Pseudos pour les jeux et les réseaux sociaux",
        body: "Free Fire et PUBG acceptent les symboles décoratifs, tandis qu'Instagram et TikTok n'acceptent que lettres, chiffres, points et tirets bas. Prévoyez toujours une seconde option : les pseudos populaires sont souvent déjà pris.",
      },
    ],
    faqs: [
      {
        q: "Le générateur est-il gratuit ?",
        a: "Oui, tous les outils sont gratuits, sans inscription, et fonctionnent directement dans le navigateur.",
      },
      {
        q: "Les lettres stylées fonctionnent-elles sur Free Fire ?",
        a: "Oui. Copiez le texte stylé et collez-le dans le champ du nom. S'il est refusé, choisissez un style avec moins de symboles.",
      },
      {
        q: "Puis-je enregistrer mes pseudos favoris ?",
        a: "Oui. Sélectionnez vos pseudos puis téléchargez-les en texte, PNG ou SVG.",
      },
    ],
    labels: {
      generate: "Générer des pseudos",
      styleIt: "Stylisez votre nom",
      results: "Résultats",
      trending: "Tendances",
      input: "Saisissez votre nom",
    },
  },
  {
    code: "de",
    hreflang: "de",
    label: "German",
    native: "Deutsch",
    dir: "ltr",
    title: "Nickname-Generator & Stylische Namen — BestNickFinder",
    description:
      "Erstelle kostenlos Nicknames und stylische Namen mit besonderen Schriftarten und Symbolen für Free Fire, Instagram, TikTok und Discord.",
    h1: "Nickname-Generator und stylische Namen",
    intro:
      "Gib deinen Namen ein oder klicke auf Generieren, um sofort neue Nicknames zu erhalten. Verwandle Text in besondere Schriftzeichen, füge Symbole hinzu und kopiere das Ergebnis mit einem Klick für Free Fire, TikTok, Instagram, Discord oder Roblox.",
    sections: [
      {
        h2: "So findest du einen einprägsamen Namen",
        body: "Gute Nicknames sind kurz, leicht auszusprechen und brauchen keine Zufallszahlen. Beginne mit einem Wort, das zu deinem Spielstil passt, ergänze ein zweites kurzes Wort und teste Varianten mit Punkt, Unterstrich oder dekorativen Symbolen. Markiere deine Favoriten und exportiere die Liste, bevor du deine Accounts umbenennst.",
      },
      {
        h2: "Namen für Spiele und Social Media",
        body: "Free Fire und PUBG erlauben dekorative Symbole, Instagram und TikTok nur Buchstaben, Zahlen, Punkte und Unterstriche. Halte immer eine Zweitwahl bereit, da beliebte Namen meist schon vergeben sind.",
      },
    ],
    faqs: [
      {
        q: "Ist der Generator kostenlos?",
        a: "Ja, alle Werkzeuge sind kostenlos, ohne Anmeldung und laufen direkt im Browser.",
      },
      {
        q: "Funktionieren Sonderschriften in Free Fire?",
        a: "Ja. Kopiere den stylischen Text und füge ihn im Namensfeld ein. Wird er abgelehnt, nimm einen Stil mit weniger Symbolen.",
      },
      {
        q: "Kann ich meine Favoriten speichern?",
        a: "Ja. Wähle deine Favoriten aus und lade sie als Text, PNG oder SVG herunter.",
      },
    ],
    labels: {
      generate: "Nicknames generieren",
      styleIt: "Namen stylen",
      results: "Ergebnisse",
      trending: "Beliebt",
      input: "Gib deinen Namen ein",
    },
  },
  {
    code: "tr",
    hreflang: "tr",
    label: "Turkish",
    native: "Türkçe",
    dir: "ltr",
    title: "Nick Bulucu ve Şekilli Yazı Üretici — BestNickFinder",
    description:
      "Free Fire, Instagram, TikTok ve Discord için ücretsiz nick ve şekilli isimler oluştur. Sembollerle süsle, tek tıkla kopyala.",
    h1: "Nick bulucu ve şekilli isim üretici",
    intro:
      "Adını yaz ya da üret düğmesine bas, anında yeni nickler al. Herhangi bir yazıyı şekilli harflere çevir, sembol ekle ve Free Fire, TikTok, Instagram, Discord veya Roblox için tek tıkla kopyala.",
    sections: [
      {
        h2: "Akılda kalan nick nasıl seçilir",
        body: "İyi bir nick kısadır, kolay söylenir ve rastgele sayılara ihtiyaç duymaz. Oyun tarzını yansıtan bir kelimeyle başla, kısa bir kelime daha ekle, ardından nokta, alt çizgi veya süsleme sembolleriyle varyasyonları dene. Beğendiklerini işaretleyip listeyi dışa aktar.",
      },
      {
        h2: "Oyunlar ve sosyal medya için nickler",
        body: "Free Fire ve PUBG süsleme sembollerini kabul eder; Instagram ve TikTok yalnızca harf, sayı, nokta ve alt çizgiye izin verir. Popüler isimler genelde alınmış olduğu için her zaman bir yedek seçenek hazırla.",
      },
    ],
    faqs: [
      {
        q: "Araç ücretsiz mi?",
        a: "Evet, tüm araçlar ücretsizdir, kayıt gerekmez ve doğrudan tarayıcıda çalışır.",
      },
      {
        q: "Şekilli harfler Free Fire'da çalışıyor mu?",
        a: "Evet. Şekilli metni kopyalayıp oyunun isim alanına yapıştır. Kabul edilmezse daha az sembollü bir stil seç.",
      },
      {
        q: "Beğendiğim nickleri kaydedebilir miyim?",
        a: "Evet. Seçtiklerini metin, PNG veya SVG olarak indirebilirsin.",
      },
    ],
    labels: {
      generate: "Nick üret",
      styleIt: "İsmini süsle",
      results: "Sonuçlar",
      trending: "Trendler",
      input: "Adını yaz",
    },
  },
  {
    code: "ru",
    hreflang: "ru",
    label: "Russian",
    native: "Русский",
    dir: "ltr",
    title: "Генератор ников и красивых имён — BestNickFinder",
    description:
      "Создавайте ники и красивые имена бесплатно: необычные шрифты и символы для Free Fire, Instagram, TikTok и Discord. Копирование в один клик.",
    h1: "Генератор ников и красивых имён",
    intro:
      "Введите имя или нажмите «Сгенерировать», чтобы получить новые ники мгновенно. Превратите любой текст в необычные буквы, добавьте символы и скопируйте результат одним щелчком для Free Fire, TikTok, Instagram, Discord или Roblox.",
    sections: [
      {
        h2: "Как выбрать запоминающийся ник",
        body: "Хороший ник короткий, легко произносится и не держится на случайных цифрах. Начните со слова, которое отражает ваш стиль игры, добавьте второе короткое слово и попробуйте варианты с точкой, подчёркиванием или декоративными символами. Отметьте понравившиеся и выгрузите список перед сменой имени.",
      },
      {
        h2: "Ники для игр и соцсетей",
        body: "Free Fire и PUBG принимают декоративные символы, а Instagram и TikTok — только буквы, цифры, точки и подчёркивания. Держите наготове второй вариант: популярные ники часто уже заняты.",
      },
    ],
    faqs: [
      {
        q: "Генератор бесплатный?",
        a: "Да, все инструменты бесплатны, без регистрации и работают прямо в браузере.",
      },
      {
        q: "Работают ли необычные шрифты в Free Fire?",
        a: "Да. Скопируйте стилизованный текст и вставьте в поле имени. Если игра его не принимает, выберите стиль с меньшим числом символов.",
      },
      {
        q: "Можно ли сохранить понравившиеся ники?",
        a: "Да. Отметьте ники и скачайте их в виде текста, PNG или SVG.",
      },
    ],
    labels: {
      generate: "Сгенерировать ники",
      styleIt: "Украсить имя",
      results: "Результаты",
      trending: "В тренде",
      input: "Введите имя",
    },
  },
  {
    code: "vi",
    hreflang: "vi",
    label: "Vietnamese",
    native: "Tiếng Việt",
    dir: "ltr",
    title: "Tạo Nickname & Tên Kiểu Đẹp — BestNickFinder",
    description:
      "Tạo nickname và tên kiểu miễn phí với font chữ đặc biệt và ký tự đặc biệt cho Free Fire, Instagram, TikTok và Discord. Sao chép một lần nhấn.",
    h1: "Tạo nickname và tên kiểu đẹp",
    intro:
      "Nhập tên của bạn hoặc bấm tạo để có nickname mới ngay lập tức. Chuyển mọi văn bản thành font chữ đặc biệt, thêm ký tự trang trí và sao chép một lần nhấn để dùng cho Free Fire, TikTok, Instagram, Discord hay Roblox.",
    sections: [
      {
        h2: "Cách chọn nickname dễ nhớ",
        body: "Nickname hay thì ngắn, dễ đọc và không phụ thuộc vào số ngẫu nhiên. Hãy bắt đầu bằng một từ thể hiện phong cách chơi của bạn, thêm một từ ngắn nữa, rồi thử các biến thể với dấu chấm, dấu gạch dưới hoặc ký tự trang trí. Tích chọn tên yêu thích và xuất danh sách trước khi đổi tên tài khoản.",
      },
      {
        h2: "Nickname cho game và mạng xã hội",
        body: "Free Fire và PUBG cho phép ký tự trang trí, còn Instagram và TikTok chỉ nhận chữ, số, dấu chấm và gạch dưới. Luôn chuẩn bị một lựa chọn dự phòng vì các tên phổ biến thường đã có người dùng.",
      },
    ],
    faqs: [
      {
        q: "Công cụ có miễn phí không?",
        a: "Có. Mọi công cụ đều miễn phí, không cần đăng ký và chạy ngay trên trình duyệt.",
      },
      {
        q: "Font chữ đặc biệt có dùng được trong Free Fire?",
        a: "Được. Sao chép văn bản đã tạo kiểu rồi dán vào ô tên trong game. Nếu bị từ chối, hãy chọn kiểu ít ký tự trang trí hơn.",
      },
      {
        q: "Tôi có thể lưu danh sách nickname không?",
        a: "Có. Chọn các nickname bạn thích rồi tải về dạng văn bản, PNG hoặc SVG.",
      },
    ],
    labels: {
      generate: "Tạo nickname",
      styleIt: "Tạo kiểu cho tên",
      results: "Kết quả",
      trending: "Đang thịnh hành",
      input: "Nhập tên của bạn",
    },
  },
];

export const LOCALE_MAP: Record<string, Locale> = Object.fromEntries(
  LOCALES.map((l) => [l.code, l]),
);
