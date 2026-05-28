import { useState, useEffect, useRef } from "react";

// ============================================================
//  RELAIS VILLA PASSERINI — Guida Digitale Ospiti
//  Dashboard bilingue IT/EN · mobile-first
//
//  >>> FOTO <<<
//  Le immagini qui sotto sono PLACEHOLDER. Sostituisci le stringhe
//  URL con i link reali delle tue foto (Lodgify / Booking / Airbnb).
//  Per copiarli: apri la galleria dell'alloggio sulla piattaforma,
//  tasto destro sulla foto > "Copia indirizzo immagine", incolla qui.
//  NON incollare immagini base64: appesantiscono il file e lo
//  rendono lento sul telefono degli ospiti.
// ============================================================

const IMG = {
  hero: "https://raw.githubusercontent.com/valerionenzi-ui/villa-passerini-assets/main/hero.jpg",
  pool: "https://raw.githubusercontent.com/valerionenzi-ui/villa-passerini-assets/main/Pool.png",
  courtyard: "https://raw.githubusercontent.com/valerionenzi-ui/villa-passerini-assets/main/courtyard.jpg",
  narciso: "https://raw.githubusercontent.com/valerionenzi-ui/villa-passerini-assets/main/Narciso.jpg",
  iris: "https://raw.githubusercontent.com/valerionenzi-ui/villa-passerini-assets/main/Iris.jpg",
  ginestra: "https://raw.githubusercontent.com/valerionenzi-ui/villa-passerini-assets/main/Ginestra.jpg",
  tulipano: "https://raw.githubusercontent.com/valerionenzi-ui/villa-passerini-assets/main/Tulipano.jpg",
  torretta: "https://raw.githubusercontent.com/valerionenzi-ui/villa-passerini-assets/main/Torretta.jpg",
};

const COLORS = {
  terracotta: "#C2703E",
  terracottaDark: "#9E5A2E",
  olive: "#6B7D3A",
  oliveLight: "#8FA04E",
  cream: "#FAF5EE",
  linen: "#F3EBE0",
  warmWhite: "#FEFCF9",
  charcoal: "#2D2A26",
  warmGray: "#8A857D",
  gold: "#C9A54E",
};

const T = {
  it: {
    badge: "Relais · Maremma · dal 1838",
    heroTitle: ["Villa", "Passerini"],
    heroSub: "Dove storia, natura e ospitalità si incontrano. Benvenuti nel cuore della Maremma.",
    scroll: "Scopri il soggiorno",
    nav: ["Benvenuti", "Info utili", "Vivere la Villa", "Territorio", "Contatti"],
    welcomeTag: "Il luogo",
    welcomeTitle: "Benvenuti a Villa Passerini",
    welcomeDesc: "Benvenuti a Villa Passerini, un luogo dove il tempo sembra rallentare e ogni dettaglio racconta una storia.\n\nGli alloggi sono ricavati all'interno di strutture storiche, restaurate con attenzione per preservarne l'identità originaria. Qui potrete vivere un soggiorno semplice, autentico e rilassante, tra spazi verdi, piscina, tranquillità e il fascino di un luogo che conserva ancora il carattere delle sue origini.\n\nIl nostro desiderio è farvi sentire accolti, liberi di godervi la Villa e il territorio che la circonda.",
    storyTitle: "Una storia che inizia nel 1838",
    storyText: "Fondata dall'ingegnere Filippo Passerini ai piedi del poggio di Moscona, Villa Passerini sorge su preesistenze romane — antiche vasche termali — in prossimità dell'etrusca Roselle. Il restauro, eseguito sotto la tutela del Ministero dei Beni Culturali, ha preservato ogni dettaglio dell'identità originaria.",
    chips: ["Origini romane", "Restauro tutelato", "Dal 1838", "Maremma"],
    aptTitle: "I nostri alloggi",
    aptDesc: "Cinque appartamenti indipendenti, ricavati da strutture storiche e immersi nel verde della corte.",
    infoTag: "Pratico",
    infoTitle: "Informazioni utili",
    infoDesc: "Tutto quello che serve per un soggiorno senza pensieri.",
    rulesTag: "Convivenza",
    rulesTitle: "Vivere la Villa",
    rulesDesc: "Piccole attenzioni per rispettare il luogo e garantire a tutti un soggiorno piacevole.",
    territoryTag: "Dintorni",
    territoryTitle: "Scopri la Maremma Toscana",
    territoryDesc: "Un territorio ricco di perle da esplorare: dal mare più incontaminato dell'Argentario, al fascino storico ed esclusivo dei piccoli borghi delle Città del Tufo, per chi ama l'archeologia e la Storia.\n\nIl territorio offre esperienze diverse: giornate in spiaggia, passeggiate nella natura, visite culturali, borghi medievali, cantine, ristoranti tipici e percorsi dedicati a chi ama la storia e l'archeologia.",
    territoryTabs: ["Dove mangiare", "Borghi e cultura", "Attività", "Natura e mare"],
    territoryEatIntro: "La Maremma è una terra di sapori autentici: cucina semplice, prodotti locali, carne maremmana, olio, vino e piatti della tradizione. Ecco i nostri consigli personali.",
    territoryNote: "",
    contactTag: "Supporto",
    contactTitle: "Contatti e assistenza",
    contactDesc: "Siamo qui per voi, prima, durante e dopo il soggiorno.",
    contactBody: "Per qualsiasi necessità durante il vostro soggiorno, potete contattarci telefonicamente o scriverci via email. Saremo felici di aiutarvi con informazioni pratiche, consigli sul territorio o richieste legate alla permanenza in struttura.",
    contactCta: "Scrivici",
    callCta: "Chiama",
    farewell: "Vi auguriamo un soggiorno piacevole e rilassante a Villa Passerini. Che possiate godervi la quiete della Villa, la bellezza della Maremma e il fascino di un luogo ricco di storia.",
    footerText: "Roselle, Maremma · Toscana · Italia",
  },
  en: {
    badge: "Relais · Maremma · since 1838",
    heroTitle: ["Villa", "Passerini"],
    heroSub: "Where history, nature and hospitality come together. Welcome to the heart of Maremma.",
    scroll: "Discover your stay",
    nav: ["Welcome", "Useful Info", "Living the Villa", "Territory", "Contacts"],
    welcomeTag: "The place",
    welcomeTitle: "Welcome to Villa Passerini",
    welcomeDesc: "Welcome to Villa Passerini, a place where time seems to slow down and every detail tells a story.\n\nThe apartments are carved from historic structures, carefully restored to preserve their original identity. Here you can enjoy a simple, authentic and relaxing stay — among green spaces, a pool, peace and the charm of a place that still keeps the character of its origins.\n\nOur wish is to make you feel welcome, free to enjoy the Villa and the surrounding land.",
    storyTitle: "A story that begins in 1838",
    storyText: "Founded by engineer Filippo Passerini at the foot of Moscona hill, Villa Passerini rises on Roman remains — ancient thermal baths — near Etruscan Roselle. The restoration, carried out under the supervision of the Ministry of Cultural Heritage, preserved every detail of its original identity.",
    chips: ["Roman origins", "Protected restoration", "Since 1838", "Maremma"],
    aptTitle: "Our apartments",
    aptDesc: "Five independent apartments, carved from historic structures and surrounded by the green courtyard.",
    infoTag: "Practical",
    infoTitle: "Useful information",
    infoDesc: "Everything you need for a carefree stay.",
    rulesTag: "Living together",
    rulesTitle: "Living the Villa",
    rulesDesc: "Small considerations to respect the place and ensure a pleasant stay for everyone.",
    territoryTag: "Surroundings",
    territoryTitle: "Discover Tuscan Maremma",
    territoryDesc: "A land full of hidden gems waiting to be explored: from the pristine sea of Argentario, to the historic charm of the small villages of the Tufo Cities, for lovers of archaeology and history.\n\nThe area offers different experiences: beach days, nature walks, cultural visits, medieval villages, wineries, traditional restaurants and paths for those who love history and archaeology.",
    territoryTabs: ["Where to eat", "Villages & culture", "Activities", "Nature & sea"],
    territoryEatIntro: "Maremma is a land of authentic flavors: simple cooking, local produce, Maremman beef, olive oil, wine and traditional dishes. Here are our personal recommendations.",
    territoryNote: "",
    contactTag: "Support",
    contactTitle: "Contacts & assistance",
    contactDesc: "We're here for you, before, during and after your stay.",
    contactBody: "For any need during your stay, you can call us or write us an email. We'll be happy to help with practical information, recommendations about the area, or any request related to your stay.",
    contactCta: "Email us",
    callCta: "Call",
    farewell: "We wish you a pleasant and relaxing stay at Villa Passerini. May you enjoy the peace of the Villa, the beauty of Maremma, and the charm of a place rich in history.",
    footerText: "Roselle, Maremma · Tuscany · Italy",
  },
};

const APARTMENTS = [
  { id: "torretta", name: "La Torretta", icon: "🏰", img: IMG.torretta,
    it: "Antico fortino medievale restaurato. Intimo e romantico, ideale per coppie.",
    en: "Restored medieval fortino. Intimate and romantic, ideal for couples." },
  { id: "ginestra", name: "La Ginestra", icon: "🌿", img: IMG.ginestra,
    it: "Immerso nel verde della corte, comfort e tranquillità assoluta.",
    en: "Surrounded by the green courtyard, comfort and absolute peace." },
  { id: "tulipano", name: "Il Tulipano", icon: "🌷", img: IMG.tulipano,
    it: "Luminoso e accogliente, perfetto per famiglie.",
    en: "Bright and welcoming, perfect for families." },
  { id: "iris", name: "L'Iris", icon: "💜", img: IMG.iris,
    it: "Eleganza e privacy nel cuore della villa.",
    en: "Elegance and privacy in the heart of the villa." },
  { id: "narciso", name: "Il Narciso", icon: "🌼", img: IMG.narciso,
    it: "Raffinatezza e contatto diretto con la natura.",
    en: "Refinement and direct contact with nature." },
];

const INFO = {
  it: [
    { icon: "🕐", title: "Check-in / Check-out", text: "Check-in: 15:00 – 20:00\nCheck-out: entro le 10:00\nArrivo dopo le 20:00: supplemento di €20.\nVi preghiamo di avvisarci in anticipo." },
    { icon: "📶", title: "Wi-Fi", text: "Rete disponibile in tutti gli alloggi.\nCredenziali consegnate all'arrivo." },
    { icon: "🅿️", title: "Parcheggio", text: "Parcheggio privato gratuito all'interno della proprietà." },
    { icon: "🏊", title: "Piscina", text: "Aperta tutti i giorni 10:00 – 19:00.\nDoccia obbligatoria prima dell'ingresso." },
    { icon: "❄️", title: "Clima", text: "Aria condizionata e riscaldamento in ogni alloggio." },
    { icon: "📺", title: "Servizi in alloggio", text: "TV · Asciugacapelli · Biancheria e asciugamani · Set cortesia." },
    { icon: "♻️", title: "Raccolta differenziata", text: "Isola ecologica nella corte: Plastica · Carta · Vetro · Organico · Indifferenziato." },
  ],
  en: [
    { icon: "🕐", title: "Check-in / Check-out", text: "Check-in: 3:00 – 8:00 PM\nCheck-out: by 10:00 AM\nArrival after 8:00 PM: €20 surcharge.\nPlease let us know in advance." },
    { icon: "📶", title: "Wi-Fi", text: "Available in all apartments.\nCredentials provided on arrival." },
    { icon: "🅿️", title: "Parking", text: "Free private parking within the property." },
    { icon: "🏊", title: "Pool", text: "Open daily 10:00 AM – 7:00 PM.\nShower required before entering." },
    { icon: "❄️", title: "Climate", text: "Air conditioning and heating in every apartment." },
    { icon: "📺", title: "In-apartment services", text: "TV · Hairdryer · Linen & towels · Courtesy set." },
    { icon: "♻️", title: "Recycling", text: "Eco-station in the courtyard: Plastic · Paper · Glass · Organic · General waste." },
  ],
};

const RULES = {
  it: [
    { icon: "🤫", title: "Silenzio e tranquillità", text: "Villa Passerini è un luogo pensato per il riposo e il relax. Vi chiediamo di rispettare la quiete della struttura, soprattutto nelle ore serali e notturne, evitando rumori eccessivi negli spazi comuni e all'interno degli alloggi." },
    { icon: "🏊‍♂️", title: "Uso della piscina", text: "La piscina è a disposizione degli ospiti negli orari indicati. È gradito fare la doccia prima dell'ingresso in acqua.\nPer la sicurezza e il comfort di tutti, vi chiediamo di non correre nell'area piscina, di sorvegliare sempre i bambini e di utilizzare gli spazi con attenzione." },
    { icon: "🐕", title: "Animali domestici", text: "Gli animali sono i benvenuti, purché educati e sempre sorvegliati. Vi chiediamo di segnalarne la presenza al momento della prenotazione.\nAll'esterno è obbligatorio l'uso del guinzaglio. I proprietari sono responsabili di eventuali danni e della raccolta delle deiezioni. Per motivi igienici, gli animali non sono ammessi in piscina." },
    { icon: "🚭", title: "Fumo", text: "Non è consentito fumare all'interno degli alloggi. È possibile fumare negli spazi esterni, avendo cura di non disturbare gli altri ospiti e di non lasciare mozziconi nella proprietà." },
  ],
  en: [
    { icon: "🤫", title: "Quiet and tranquility", text: "Villa Passerini is a place designed for rest and relaxation. We kindly ask you to respect the peace of the property, especially in the evening and at night, avoiding excessive noise in common areas and within the apartments." },
    { icon: "🏊‍♂️", title: "Using the pool", text: "The pool is available to guests during posted hours. A shower before entering the water is appreciated.\nFor everyone's safety and comfort, please do not run in the pool area, always supervise children, and use the space with care." },
    { icon: "🐕", title: "Pets", text: "Pets are welcome, provided they are well-behaved and always supervised. Please notify us at the time of booking.\nLeashes are required outdoors. Owners are responsible for any damage and for cleaning up after their animals. For hygiene reasons, pets are not allowed in the pool." },
    { icon: "🚭", title: "Smoking", text: "Smoking is not permitted inside the apartments. You may smoke in outdoor areas, taking care not to disturb other guests and not to leave cigarette butts on the property." },
  ],
};

const TERRITORY = {
  it: [
    [ // Dove mangiare
      { name: "Il Tagliapasta", desc: "Il nostro preferito. Pasta fatta in casa, tortelli maremmani e pappardelle al cinghiale nel cuore di Grosseto. Cucina semplice, autentica, ottima qualità-prezzo. Prenotare consigliato." },
      { name: "La Parolaccia", desc: "Dal 1918, quattro generazioni di cucina maremmana verace a Roselle — a pochi minuti dalla Villa. Pasta fatta in casa, ambiente familiare e una delle trattorie storiche della zona." },
      { name: "La Terra di Nello", desc: "Osteria rurale a Castiglione della Pescaia con un'anima tutta maremmana. Carne a km zero, Chianina, Fiorentina al fuoco e una carta vini con oltre 250 etichette. Per serate speciali." },
    ],
    [ // Borghi e cultura
      { name: "Pitigliano", desc: "Il borgo scolpito nel tufo, sospeso su una rupe — soprannominato 'la piccola Gerusalemme' per la sua storia ebraica. (~1h)" },
      { name: "Magliano in Toscana", desc: "Mura medicee intatte e ulivi secolari. Un balcone silenzioso sulla Maremma. (~25 min)" },
      { name: "Castiglione della Pescaia", desc: "Borgo medievale sul promontorio, mare e ristoranti di pesce. (~35 min)" },
      { name: "Montemassi", desc: "Il castello dei Pannocchieschi e un panorama che spazia fino al mare. (~30 min)" },
      { name: "Siena", desc: "Piazza del Campo e l'eleganza gotica. A circa 1 ora di auto." },
      { name: "Area Archeologica di Roselle", desc: "Antica città etrusco-romana a pochi minuti dalla villa." },
      { name: "Pienza", desc: "La città ideale del Rinascimento, capitale del Pecorino Toscano DOP. Patrimonio UNESCO nel cuore della Val d'Orcia. (~1h 30 min)" },
      { name: "Montalcino", desc: "Borgo medievale arroccato tra i vigneti, patria del Brunello: uno dei grandi rossi d'Italia. La Fortezza domina il panorama. (~1h)" },
    ],
    [ // Attività
      { name: "Terme di Saturnia", desc: "Le cascate termali naturali di Saturnia sono tra i luoghi più iconici della Maremma. Acqua sulfurea a 37°C, vasche naturali accessibili gratuitamente h24. Un'esperienza da non perdere. (~45 min)" },
      { name: "Cantina Le Mortelle — Antinori", desc: "La tenuta Le Mortelle di Antinori nell'entroterra di Castiglione della Pescaia. Degustazioni tra macchia mediterranea e vigneti affacciati sul mare. (~40 min)" },
      { name: "Giardino dei Tarocchi", desc: "Il giardino scultoreo di Niki de Saint Phalle: 22 sculture monumentali ispirate ai Tarocchi, rivestite di mosaici e specchi colorati. Meta gettonatissima — prenotare in anticipo. (~45 min)" },
      { name: "Acqua Village", desc: "Il parco acquatico di Cecina: scivoli, piscine e attrazioni per tutte le età. La scelta ideale per le famiglie con bambini. (~1h)" },
    ],
    [ // Natura e mare
      { name: "Parco della Maremma", desc: "Sentieri, natura e fauna selvatica in una delle aree protette più belle d'Italia." },
      { name: "Cala Violina", desc: "Una delle spiagge più belle d'Italia: sabbia bianchissima e acqua turchese nel Parco delle Colline Metallifere. Accessibile a piedi (~15 min dal parcheggio). (~55 min)" },
      { name: "La Feniglia", desc: "Pineta protetta e spiaggia di sabbia bianca tra la laguna di Orbetello e il mare aperto. Si percorre in bici o a piedi tra i pini. (~55 min)" },
      { name: "Castiglione della Pescaia", desc: "Borgo marinaro molto frequentato in estate, con una lunga spiaggia sabbiosa, locali e vita notturna nel centro storico. (~35 min)" },
      { name: "Singita — Argentario", desc: "Il beach club d'atmosfera sull'Argentario: lettini, cocktail e una vista da sogno sul Tirreno. Una pausa chic in riva al mare. (~1h)" },
      { name: "Porto Ercole e Porto Santo Stefano", desc: "I due borghi marinari dell'Argentario: barche, ristoranti di pesce e tramonti sul Tirreno. Porto Santo Stefano è la partenza per le isole del Giglio e di Giannutri. (~1h)" },
    ],
  ],
  en: [
    [
      { name: "Il Tagliapasta", desc: "Our favourite. Handmade pasta, Maremman tortelli and pappardelle with wild boar in the heart of Grosseto. Simple, authentic cuisine at great value. Booking recommended." },
      { name: "La Parolaccia", desc: "Since 1918, four generations of genuine Maremman cooking in Roselle — minutes from the Villa. Handmade pasta, a family atmosphere and one of the area's historic trattorias." },
      { name: "La Terra di Nello", desc: "A rural osteria in Castiglione della Pescaia with a true Maremman soul. Zero-kilometre beef, Chianina tartare, Florentine steak and a wine list of over 250 labels. For special evenings." },
    ],
    [
      { name: "Pitigliano", desc: "A village carved from tufa stone, perched on a cliff — known as 'little Jerusalem' for its Jewish heritage. (~1h)" },
      { name: "Magliano in Toscana", desc: "Intact Medici walls and ancient olive trees. A quiet balcony over Maremma. (~25 min)" },
      { name: "Castiglione della Pescaia", desc: "Medieval village on the promontory, with sea and seafood restaurants. (~35 min)" },
      { name: "Montemassi", desc: "The Pannocchieschi castle and panoramic views stretching to the sea. (~30 min)" },
      { name: "Siena", desc: "Piazza del Campo and gothic elegance. About 1 hour drive." },
      { name: "Roselle Archaeological Area", desc: "Ancient Etruscan-Roman city, minutes from the villa." },
      { name: "Pienza", desc: "The ideal Renaissance city and home of Pecorino Toscano DOP. A UNESCO World Heritage site in the heart of Val d'Orcia. (~1h 30 min)" },
      { name: "Montalcino", desc: "A medieval hilltop village among vineyards, home of Brunello di Montalcino — one of Italy's great reds. The Fortezza commands sweeping views. (~1h)" },
    ],
    [
      { name: "Terme di Saturnia", desc: "Saturnia's natural thermal waterfalls are among Maremma's most iconic spots. Sulphurous water at 37°C, free natural pools open 24/7. A must-do experience. (~45 min)" },
      { name: "Le Mortelle — Antinori", desc: "Antinori's Le Mortelle estate inland from Castiglione della Pescaia. Wine tastings among Mediterranean scrub and vineyards overlooking the sea. (~40 min)" },
      { name: "Giardino dei Tarocchi", desc: "Niki de Saint Phalle's sculpture garden: 22 monumental Tarot-inspired figures clad in mosaics and mirrors. Hugely popular — book ahead. (~45 min)" },
      { name: "Acqua Village", desc: "Cecina's large water park: slides, pools and attractions for all ages. The perfect family day out. (~1h)" },
    ],
    [
      { name: "Maremma Park", desc: "Trails, nature and wildlife in one of Italy's most beautiful protected areas." },
      { name: "Cala Violina", desc: "One of Italy's most beautiful beaches: fine white sand and turquoise water in the Metalliferous Hills Park. Accessible on foot (~15 min from the car park). (~55 min)" },
      { name: "La Feniglia", desc: "A protected pine forest and white sand beach between the Orbetello lagoon and the open sea. Best enjoyed on foot or by bike under the pines. (~55 min)" },
      { name: "Castiglione della Pescaia", desc: "A much-loved seaside village with a long sandy beach, lively bars and nightlife in its medieval centre. (~35 min)" },
      { name: "Singita — Argentario", desc: "The stylish beach club on Argentario: sun loungers, cocktails and dream views over the Tyrrhenian Sea. A chic stop for a day at the sea. (~1h)" },
      { name: "Porto Ercole & Porto Santo Stefano", desc: "The two seafront villages of Argentario: fishing boats, seafood restaurants and sunsets over the sea. Porto Santo Stefano is the gateway to Giglio and Giannutri islands. (~1h)" },
    ],
  ],
};

const CONTACT = {
  phone: "+39 347 437 5700",
  email: "info@relaisvillapasserini.it",
};

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Section({ id, children }) {
  const [ref, visible] = useReveal();
  return (
    <section
      id={id}
      ref={ref}
      style={{
        padding: "64px 22px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity .7s ease, transform .7s ease",
      }}
    >
      {children}
    </section>
  );
}

function Tag({ children }) {
  return (
    <span style={{
      display: "inline-block", fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
      color: COLORS.terracotta, fontWeight: 600, marginBottom: 12,
    }}>{children}</span>
  );
}

function Title({ children }) {
  return (
    <h2 style={{
      fontFamily: "'Playfair Display', serif", fontSize: 30, lineHeight: 1.15,
      color: COLORS.charcoal, margin: "0 0 12px", fontWeight: 700,
    }}>{children}</h2>
  );
}

function Lead({ children }) {
  return <p style={{ color: COLORS.warmGray, fontSize: 16, lineHeight: 1.6, margin: "0 0 28px" }}>{children}</p>;
}

export default function App() {
  const [lang, setLang] = useState("it");
  const [openRule, setOpenRule] = useState(null);
  const [tab, setTab] = useState(0);
  const t = T[lang];

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif", background: COLORS.cream,
      color: COLORS.charcoal, minHeight: "100vh", maxWidth: 480, margin: "0 auto",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; }
        button { cursor: pointer; font-family: inherit; border: none; }
      `}</style>

      {/* Lang toggle */}
      <div style={{ position: "fixed", top: 14, right: 14, zIndex: 50, display: "flex", gap: 4,
        background: "rgba(255,255,255,.9)", borderRadius: 20, padding: 4, backdropFilter: "blur(8px)",
        boxShadow: "0 2px 12px rgba(0,0,0,.12)", maxWidth: 480 }}>
        {["it", "en"].map((l) => (
          <button key={l} onClick={() => setLang(l)} style={{
            padding: "6px 14px", borderRadius: 16, fontSize: 13, fontWeight: 600,
            background: lang === l ? COLORS.terracotta : "transparent",
            color: lang === l ? "#fff" : COLORS.warmGray,
          }}>{l.toUpperCase()}</button>
        ))}
      </div>

      {/* HERO */}
      <div style={{
        position: "relative", height: "78vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "0 22px 48px", color: "#fff", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(180deg, rgba(45,42,38,.25) 0%, rgba(45,42,38,.75) 100%), url(${IMG.hero}) center/cover, ${COLORS.terracottaDark}`,
        }} />
        <div style={{ position: "relative" }}>
          <span style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", opacity: .9 }}>{t.badge}</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, lineHeight: 1, margin: "10px 0 14px", fontWeight: 700 }}>
            {t.heroTitle[0]}<br /><span style={{ fontStyle: "italic", color: COLORS.gold }}>{t.heroTitle[1]}</span>
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.55, opacity: .95, maxWidth: 340, margin: "0 0 24px" }}>{t.heroSub}</p>
          <button onClick={() => scrollTo("welcome")} style={{
            background: "rgba(255,255,255,.16)", color: "#fff", padding: "12px 22px",
            borderRadius: 26, fontSize: 14, fontWeight: 600, backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,.35)",
          }}>{t.scroll} ↓</button>
        </div>
      </div>

      {/* Sticky nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 40, background: "rgba(250,245,238,.92)",
        backdropFilter: "blur(10px)", display: "flex", gap: 6, overflowX: "auto",
        padding: "12px 14px", borderBottom: `1px solid ${COLORS.linen}`,
      }}>
        {["welcome", "info", "rules", "territory", "contact"].map((id, i) => (
          <button key={id} onClick={() => scrollTo(id)} style={{
            whiteSpace: "nowrap", padding: "8px 14px", borderRadius: 18, fontSize: 13,
            fontWeight: 600, background: "#fff", color: COLORS.charcoal,
            border: `1px solid ${COLORS.linen}`,
          }}>{t.nav[i]}</button>
        ))}
      </nav>

      {/* WELCOME + STORY + APARTMENTS */}
      <Section id="welcome">
        <Tag>{t.welcomeTag}</Tag>
        <Title>{t.welcomeTitle}</Title>
        <div style={{ marginBottom: 28 }}>
          {t.welcomeDesc.split("\n\n").map((para, i) => (
            <p key={i} style={{ color: COLORS.warmGray, fontSize: 16, lineHeight: 1.65, margin: "0 0 14px" }}>{para}</p>
          ))}
        </div>

        <div style={{ background: COLORS.warmWhite, borderRadius: 18, padding: 24, border: `1px solid ${COLORS.linen}`, marginBottom: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, margin: "0 0 12px", color: COLORS.terracottaDark }}>{t.storyTitle}</h3>
          <p style={{ color: COLORS.warmGray, fontSize: 15, lineHeight: 1.65, margin: "0 0 16px" }}>{t.storyText}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {t.chips.map((c) => (
              <span key={c} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 14, background: COLORS.linen, color: COLORS.olive, fontWeight: 600 }}>{c}</span>
            ))}
          </div>
        </div>

        {/* Mini gallery: piscina + corte */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
          <div style={{
            height: 140, borderRadius: 14, overflow: "hidden",
            backgroundImage: `url(${IMG.pool})`, backgroundSize: "cover", backgroundPosition: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,.08)",
          }} />
          <div style={{
            height: 140, borderRadius: 14, overflow: "hidden",
            backgroundImage: `url(${IMG.courtyard})`, backgroundSize: "cover", backgroundPosition: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,.08)",
          }} />
        </div>

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, margin: "0 0 6px" }}>{t.aptTitle}</h3>
        <p style={{ color: COLORS.warmGray, fontSize: 14, lineHeight: 1.55, margin: "0 0 18px" }}>{t.aptDesc}</p>
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8, margin: "0 -22px", padding: "0 22px 8px" }}>
          {APARTMENTS.map((a) => (
            <div key={a.id} style={{
              minWidth: 220, background: COLORS.warmWhite, borderRadius: 16,
              border: `1px solid ${COLORS.linen}`, overflow: "hidden",
            }}>
              <div style={{ height: 120, background: `linear-gradient(135deg, ${COLORS.oliveLight}, ${COLORS.olive})`, backgroundImage: `url(${a.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ padding: 16 }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, margin: "0 0 6px" }}>{a.name}</h4>
                <p style={{ color: COLORS.warmGray, fontSize: 13.5, lineHeight: 1.5, margin: 0 }}>{a[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* INFO */}
      <Section id="info">
        <Tag>{t.infoTag}</Tag>
        <Title>{t.infoTitle}</Title>
        <Lead>{t.infoDesc}</Lead>
        <div style={{ display: "grid", gap: 12 }}>
          {INFO[lang].map((it) => (
            <div key={it.title} style={{ background: COLORS.warmWhite, borderRadius: 14, padding: 18, border: `1px solid ${COLORS.linen}`, display: "flex", gap: 14 }}>
              <span style={{ fontSize: 26 }}>{it.icon}</span>
              <div>
                <h4 style={{ margin: "0 0 4px", fontSize: 15.5, fontWeight: 600 }}>{it.title}</h4>
                <p style={{ margin: 0, color: COLORS.warmGray, fontSize: 14, lineHeight: 1.55, whiteSpace: "pre-line" }}>{it.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* RULES (accordion) */}
      <Section id="rules">
        <Tag>{t.rulesTag}</Tag>
        <Title>{t.rulesTitle}</Title>
        <Lead>{t.rulesDesc}</Lead>
        <div style={{ display: "grid", gap: 10 }}>
          {RULES[lang].map((r, i) => (
            <div key={r.title} style={{ background: COLORS.warmWhite, borderRadius: 14, border: `1px solid ${COLORS.linen}`, overflow: "hidden" }}>
              <button onClick={() => setOpenRule(openRule === i ? null : i)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12, padding: 16,
                background: "transparent", textAlign: "left",
              }}>
                <span style={{ fontSize: 22 }}>{r.icon}</span>
                <span style={{ flex: 1, fontSize: 15.5, fontWeight: 600 }}>{r.title}</span>
                <span style={{ transform: openRule === i ? "rotate(180deg)" : "none", transition: "transform .3s", color: COLORS.terracotta }}>▾</span>
              </button>
              <div style={{ maxHeight: openRule === i ? 400 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
                <p style={{ margin: 0, padding: "0 16px 16px 52px", color: COLORS.warmGray, fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-line" }}>{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TERRITORY (tabs) */}
      <Section id="territory">
        <Tag>{t.territoryTag}</Tag>
        <Title>{t.territoryTitle}</Title>
        <div style={{ marginBottom: 24 }}>
          {t.territoryDesc.split("\n\n").map((para, i) => (
            <p key={i} style={{ color: COLORS.warmGray, fontSize: 16, lineHeight: 1.65, margin: "0 0 12px" }}>{para}</p>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
          {t.territoryTabs.map((tb, i) => (
            <button key={tb} onClick={() => setTab(i)} style={{
              flex: 1, padding: "10px 8px", borderRadius: 12, fontSize: 12.5, fontWeight: 600,
              background: tab === i ? COLORS.olive : "#fff", color: tab === i ? "#fff" : COLORS.charcoal,
              border: `1px solid ${tab === i ? COLORS.olive : COLORS.linen}`,
            }}>{tb}</button>
          ))}
        </div>
        {tab === 0 && (
          <p style={{ color: COLORS.warmGray, fontSize: 14, lineHeight: 1.6, margin: "0 0 16px", fontStyle: "italic" }}>{t.territoryEatIntro}</p>
        )}
        <div style={{ display: "grid", gap: 12 }}>
          {TERRITORY[lang][tab].map((p) => (
            <div key={p.name} style={{ background: COLORS.warmWhite, borderRadius: 14, padding: 18, border: `1px solid ${COLORS.linen}` }}>
              <h4 style={{ margin: "0 0 5px", fontSize: 16, fontWeight: 600, color: COLORS.terracottaDark }}>{p.name}</h4>
              <p style={{ margin: 0, color: COLORS.warmGray, fontSize: 14, lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </div>
        {t.territoryNote && (
          <p style={{ marginTop: 16, fontSize: 12.5, color: COLORS.terracotta, fontStyle: "italic" }}>{t.territoryNote}</p>
        )}
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <Tag>{t.contactTag}</Tag>
        <Title>{t.contactTitle}</Title>
        <Lead>{t.contactDesc}</Lead>
        <p style={{ color: COLORS.warmGray, fontSize: 15, lineHeight: 1.65, margin: "0 0 24px" }}>{t.contactBody}</p>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.terracotta}, ${COLORS.terracottaDark})`, borderRadius: 18, padding: 28, color: "#fff", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>📞</div>
          <p style={{ margin: "0 0 20px", fontSize: 15, lineHeight: 1.5, opacity: .95 }}>{CONTACT.phone}<br />{CONTACT.email}</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} style={{ background: "#fff", color: COLORS.terracottaDark, padding: "11px 22px", borderRadius: 24, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{t.callCta}</a>
            <a href={`mailto:${CONTACT.email}`} style={{ background: "rgba(255,255,255,.18)", color: "#fff", padding: "11px 22px", borderRadius: 24, fontSize: 14, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.4)" }}>{t.contactCta}</a>
          </div>
        </div>
      </Section>

      {/* FAREWELL */}
      <div style={{ padding: "16px 22px 48px", textAlign: "center" }}>
        <div style={{ width: 40, height: 1, background: COLORS.gold, margin: "0 auto 24px" }} />
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.7, color: COLORS.terracottaDark, margin: 0, maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>{t.farewell}</p>
      </div>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "32px 22px 48px", borderTop: `1px solid ${COLORS.linen}` }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, margin: "0 0 4px", color: COLORS.charcoal }}>Relais Villa Passerini</p>
        <p style={{ margin: 0, fontSize: 13, color: COLORS.warmGray }}>{t.footerText}</p>
      </footer>
    </div>
  );
}
