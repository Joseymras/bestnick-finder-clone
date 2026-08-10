import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Interface language for the site chrome (navigation, footer, tool controls).
 * Content pages keep their own hand-written copy — this only translates the UI
 * so visitors from any country can use the tools comfortably.
 */
export type UiLang =
  | "en"
  | "es"
  | "pt"
  | "hi"
  | "id"
  | "ar"
  | "fr"
  | "de"
  | "tr"
  | "ru"
  | "vi";

export interface UiStrings {
  native: string;
  dir: "ltr" | "rtl";
  nameIdeas: string;
  languages: string;
  allTools: string;
  tools: string;
  popularGenerators: string;
  site: string;
  guides: string;
  home: string;
  interfaceLanguage: string;
  generate: string;
  firstLetters: string;
  firstLettersHint: string;
  results: string;
  selected: string;
  selectAll: string;
  clear: string;
  copy: string;
  copied: string;
  vote: string;
  upvote: string;
  downvote: string;
  exportHint: string;
}

export const UI: Record<UiLang, UiStrings> = {
  en: {
    native: "English",
    dir: "ltr",
    nameIdeas: "Name ideas",
    languages: "Languages",
    allTools: "All tools",
    tools: "Tools",
    popularGenerators: "Popular generators",
    site: "Site",
    guides: "Guides",
    home: "Home",
    interfaceLanguage: "Interface language",
    generate: "Generate",
    firstLetters: "First letters (optional)",
    firstLettersHint: "e.g. Ar",
    results: "results",
    selected: "selected",
    selectAll: "Select all",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    vote: "Vote",
    upvote: "Upvote this nickname",
    downvote: "Downvote this nickname",
    exportHint:
      "Tick the names you like, then copy, download or share only your selection. With nothing ticked, exports include every result.",
  },
  es: {
    native: "Español",
    dir: "ltr",
    nameIdeas: "Ideas de nombres",
    languages: "Idiomas",
    allTools: "Todas las herramientas",
    tools: "Herramientas",
    popularGenerators: "Generadores populares",
    site: "Sitio",
    guides: "Guías",
    home: "Inicio",
    interfaceLanguage: "Idioma de la interfaz",
    generate: "Generar",
    firstLetters: "Primeras letras (opcional)",
    firstLettersHint: "ej. Ar",
    results: "resultados",
    selected: "seleccionados",
    selectAll: "Seleccionar todo",
    clear: "Limpiar",
    copy: "Copiar",
    copied: "Copiado",
    vote: "Votar",
    upvote: "Votar a favor",
    downvote: "Votar en contra",
    exportHint:
      "Marca los nombres que te gusten y copia, descarga o comparte solo tu selección. Sin marcar nada, se exportan todos los resultados.",
  },
  pt: {
    native: "Português",
    dir: "ltr",
    nameIdeas: "Ideias de nomes",
    languages: "Idiomas",
    allTools: "Todas as ferramentas",
    tools: "Ferramentas",
    popularGenerators: "Geradores populares",
    site: "Site",
    guides: "Guias",
    home: "Início",
    interfaceLanguage: "Idioma da interface",
    generate: "Gerar",
    firstLetters: "Primeiras letras (opcional)",
    firstLettersHint: "ex. Ar",
    results: "resultados",
    selected: "selecionados",
    selectAll: "Selecionar tudo",
    clear: "Limpar",
    copy: "Copiar",
    copied: "Copiado",
    vote: "Votar",
    upvote: "Votar a favor",
    downvote: "Votar contra",
    exportHint:
      "Marque os nomes que gostar e copie, baixe ou compartilhe apenas a sua seleção. Sem nada marcado, tudo é exportado.",
  },
  hi: {
    native: "हिन्दी",
    dir: "ltr",
    nameIdeas: "नाम आइडिया",
    languages: "भाषाएँ",
    allTools: "सभी टूल",
    tools: "टूल",
    popularGenerators: "लोकप्रिय जेनरेटर",
    site: "साइट",
    guides: "गाइड",
    home: "होम",
    interfaceLanguage: "इंटरफ़ेस भाषा",
    generate: "बनाएँ",
    firstLetters: "पहले अक्षर (वैकल्पिक)",
    firstLettersHint: "जैसे Ar",
    results: "परिणाम",
    selected: "चुने गए",
    selectAll: "सभी चुनें",
    clear: "हटाएँ",
    copy: "कॉपी",
    copied: "कॉपी हो गया",
    vote: "वोट",
    upvote: "अपवोट करें",
    downvote: "डाउनवोट करें",
    exportHint:
      "पसंदीदा नाम चुनें और केवल उन्हीं को कॉपी, डाउनलोड या शेयर करें। कुछ न चुनने पर सभी परिणाम निर्यात होते हैं।",
  },
  id: {
    native: "Bahasa Indonesia",
    dir: "ltr",
    nameIdeas: "Ide nama",
    languages: "Bahasa",
    allTools: "Semua alat",
    tools: "Alat",
    popularGenerators: "Generator populer",
    site: "Situs",
    guides: "Panduan",
    home: "Beranda",
    interfaceLanguage: "Bahasa antarmuka",
    generate: "Buat",
    firstLetters: "Huruf awal (opsional)",
    firstLettersHint: "mis. Ar",
    results: "hasil",
    selected: "dipilih",
    selectAll: "Pilih semua",
    clear: "Hapus",
    copy: "Salin",
    copied: "Tersalin",
    vote: "Vote",
    upvote: "Beri suara positif",
    downvote: "Beri suara negatif",
    exportHint:
      "Centang nama favoritmu, lalu salin, unduh, atau bagikan hanya pilihanmu. Tanpa centang, semua hasil diekspor.",
  },
  ar: {
    native: "العربية",
    dir: "rtl",
    nameIdeas: "أفكار أسماء",
    languages: "اللغات",
    allTools: "كل الأدوات",
    tools: "الأدوات",
    popularGenerators: "المولدات الشائعة",
    site: "الموقع",
    guides: "أدلة",
    home: "الرئيسية",
    interfaceLanguage: "لغة الواجهة",
    generate: "توليد",
    firstLetters: "الأحرف الأولى (اختياري)",
    firstLettersHint: "مثال Ar",
    results: "نتيجة",
    selected: "محدد",
    selectAll: "تحديد الكل",
    clear: "مسح",
    copy: "نسخ",
    copied: "تم النسخ",
    vote: "تصويت",
    upvote: "تصويت إيجابي",
    downvote: "تصويت سلبي",
    exportHint:
      "اختر الأسماء التي تعجبك ثم انسخ أو نزّل أو شارك ما اخترته فقط. بدون تحديد، يتم تصدير كل النتائج.",
  },
  fr: {
    native: "Français",
    dir: "ltr",
    nameIdeas: "Idées de noms",
    languages: "Langues",
    allTools: "Tous les outils",
    tools: "Outils",
    popularGenerators: "Générateurs populaires",
    site: "Site",
    guides: "Guides",
    home: "Accueil",
    interfaceLanguage: "Langue de l'interface",
    generate: "Générer",
    firstLetters: "Premières lettres (facultatif)",
    firstLettersHint: "ex. Ar",
    results: "résultats",
    selected: "sélectionnés",
    selectAll: "Tout sélectionner",
    clear: "Effacer",
    copy: "Copier",
    copied: "Copié",
    vote: "Voter",
    upvote: "Voter pour",
    downvote: "Voter contre",
    exportHint:
      "Cochez les noms qui vous plaisent, puis copiez, téléchargez ou partagez uniquement votre sélection. Sans coche, tout est exporté.",
  },
  de: {
    native: "Deutsch",
    dir: "ltr",
    nameIdeas: "Namensideen",
    languages: "Sprachen",
    allTools: "Alle Tools",
    tools: "Tools",
    popularGenerators: "Beliebte Generatoren",
    site: "Seite",
    guides: "Ratgeber",
    home: "Start",
    interfaceLanguage: "Sprache der Oberfläche",
    generate: "Generieren",
    firstLetters: "Anfangsbuchstaben (optional)",
    firstLettersHint: "z. B. Ar",
    results: "Ergebnisse",
    selected: "ausgewählt",
    selectAll: "Alle auswählen",
    clear: "Zurücksetzen",
    copy: "Kopieren",
    copied: "Kopiert",
    vote: "Abstimmen",
    upvote: "Positiv bewerten",
    downvote: "Negativ bewerten",
    exportHint:
      "Markiere deine Favoriten und kopiere, lade oder teile nur die Auswahl. Ohne Markierung werden alle Ergebnisse exportiert.",
  },
  tr: {
    native: "Türkçe",
    dir: "ltr",
    nameIdeas: "İsim fikirleri",
    languages: "Diller",
    allTools: "Tüm araçlar",
    tools: "Araçlar",
    popularGenerators: "Popüler üreteçler",
    site: "Site",
    guides: "Rehberler",
    home: "Ana sayfa",
    interfaceLanguage: "Arayüz dili",
    generate: "Oluştur",
    firstLetters: "İlk harfler (isteğe bağlı)",
    firstLettersHint: "örn. Ar",
    results: "sonuç",
    selected: "seçildi",
    selectAll: "Tümünü seç",
    clear: "Temizle",
    copy: "Kopyala",
    copied: "Kopyalandı",
    vote: "Oy ver",
    upvote: "Beğen",
    downvote: "Beğenme",
    exportHint:
      "Beğendiğin isimleri işaretle, sonra yalnızca seçimini kopyala, indir veya paylaş. İşaret yoksa tüm sonuçlar aktarılır.",
  },
  ru: {
    native: "Русский",
    dir: "ltr",
    nameIdeas: "Идеи имён",
    languages: "Языки",
    allTools: "Все инструменты",
    tools: "Инструменты",
    popularGenerators: "Популярные генераторы",
    site: "Сайт",
    guides: "Гайды",
    home: "Главная",
    interfaceLanguage: "Язык интерфейса",
    generate: "Сгенерировать",
    firstLetters: "Первые буквы (необязательно)",
    firstLettersHint: "напр. Ar",
    results: "результатов",
    selected: "выбрано",
    selectAll: "Выбрать все",
    clear: "Сбросить",
    copy: "Копировать",
    copied: "Скопировано",
    vote: "Голосовать",
    upvote: "Голос за",
    downvote: "Голос против",
    exportHint:
      "Отметьте понравившиеся имена и копируйте, скачивайте или делитесь только выбранным. Без отметок экспортируются все результаты.",
  },
  vi: {
    native: "Tiếng Việt",
    dir: "ltr",
    nameIdeas: "Ý tưởng tên",
    languages: "Ngôn ngữ",
    allTools: "Tất cả công cụ",
    tools: "Công cụ",
    popularGenerators: "Trình tạo phổ biến",
    site: "Trang",
    guides: "Hướng dẫn",
    home: "Trang chủ",
    interfaceLanguage: "Ngôn ngữ giao diện",
    generate: "Tạo tên",
    firstLetters: "Chữ cái đầu (tùy chọn)",
    firstLettersHint: "vd. Ar",
    results: "kết quả",
    selected: "đã chọn",
    selectAll: "Chọn tất cả",
    clear: "Bỏ chọn",
    copy: "Sao chép",
    copied: "Đã sao chép",
    vote: "Bình chọn",
    upvote: "Bình chọn thích",
    downvote: "Bình chọn không thích",
    exportHint:
      "Tích những tên bạn thích rồi sao chép, tải hoặc chia sẻ riêng phần đã chọn. Không tích gì thì xuất toàn bộ kết quả.",
  },
};

export const UI_LANGS = Object.keys(UI) as UiLang[];

const STORAGE_KEY = "bnf_ui_lang";

interface Ctx {
  lang: UiLang;
  setLang: (l: UiLang) => void;
  t: UiStrings;
}

const UiLangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: UI.en });

export function UiLangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<UiLang>("en");

  // Read the saved choice after hydration so SSR markup stays stable.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as UiLang | null;
    if (saved && saved in UI) {
      setLang(saved);
      return;
    }
    const nav = window.navigator.language?.slice(0, 2) as UiLang | undefined;
    if (nav && nav in UI) setLang(nav);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      t: UI[lang],
      setLang: (l) => {
        setLang(l);
        try {
          window.localStorage.setItem(STORAGE_KEY, l);
        } catch {
          /* private mode — keep the in-memory choice */
        }
      },
    }),
    [lang],
  );

  return <UiLangContext.Provider value={value}>{children}</UiLangContext.Provider>;
}

/** Interface strings + current language for the site chrome and tool controls. */
export function useUiLang() {
  return useContext(UiLangContext);
}
