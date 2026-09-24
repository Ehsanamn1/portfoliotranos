export const locales=["en","fa","es","de"] as const;
export type Locale=typeof locales[number];

export const localeMeta:Record<Locale,{label:string;native:string;dir:"ltr"|"rtl"}>={
 en:{label:"English",native:"EN",dir:"ltr"},
 fa:{label:"فارسی",native:"FA",dir:"rtl"},
 es:{label:"Español",native:"ES",dir:"ltr"},
 de:{label:"Deutsch",native:"DE",dir:"ltr"}
};

const translations={
 en:{
  work:"Work",services:"Services",about:"About",insights:"Insights",contact:"Contact",talk:"Let's Talk",heroTitle:"Ideas into Digital Reality.",heroDescription:"Tranos is an independent digital studio building premium experiences, intelligent systems and visual identities for ambitious teams.",
  home:"Home",read:"Read",case:"View case",allWork:"All work",allInsights:"All insights",
  selectedWork:"Selected work",capabilities:"Capabilities",aboutTranos:"About Tranos",projectInquiry:"Project inquiry",
  startProject:"Start a project",exploreWork:"Explore selected work",whatThinking:"What we're thinking.",
  builtToStandOut:"Built to stand out.",oneStudio:"One studio.",manyDisciplines:"Many disciplines.",
  nextVersion:"Let's build the next version.",process:"Process",storyTitle:"Make it feel inevitable.",storyLead:"Good digital work is not about adding more. It is about removing the friction between an idea and the moment someone feels it.",insightsLead:"Notes on digital products, AI, brand systems and the ideas shaping how people experience technology.",secureAccess:"Secure admin access",control:"Control Center"
 },
 fa:{
  work:"نمونه‌کارها",services:"خدمات",about:"درباره ما",insights:"مجله",contact:"تماس",talk:"شروع گفتگو",heroTitle:"ایده‌ها را به واقعیت دیجیتال تبدیل می‌کنیم.",heroDescription:"ترانوس یک استودیوی مستقل دیجیتال است که تجربه‌های لوکس، سیستم‌های هوشمند و هویت‌های متمایز می‌سازد.",
  home:"خانه",read:"مطالعه",case:"مشاهده کیس",allWork:"همه نمونه‌کارها",allInsights:"همه مطالب",
  selectedWork:"نمونه‌کارهای منتخب",capabilities:"توانمندی‌ها",aboutTranos:"درباره ترانوس",projectInquiry:"درخواست پروژه",
  startProject:"شروع پروژه",exploreWork:"مشاهده نمونه‌کارها",whatThinking:"آنچه به آن فکر می‌کنیم.",
  builtToStandOut:"برای متمایز شدن ساخته شده.",oneStudio:"یک استودیو.",manyDisciplines:"چند تخصص.",
  nextVersion:"بیایید نسخه بعدی را بسازیم.",process:"فرآیند",storyTitle:"طوری بساز که بدیهی به نظر برسد.",storyLead:"کار دیجیتال خوب درباره‌ی اضافه‌کردن نیست؛ درباره‌ی حذف اصطکاک میان یک ایده و لحظه‌ای است که مخاطب آن را حس می‌کند.",insightsLead:"یادداشت‌هایی درباره محصولات دیجیتال، هوش مصنوعی، سیستم‌های برند و فرهنگ فناوری.",secureAccess:"دسترسی امن مدیریت",control:"پنل مدیریت"
 },
 es:{
  work:"Proyectos",services:"Servicios",about:"Nosotros",insights:"Ideas",contact:"Contacto",talk:"Hablemos",heroTitle:"Ideas convertidas en realidad digital.",heroDescription:"Tranos es un estudio digital independiente que crea experiencias premium, sistemas inteligentes e identidades visuales.",
  home:"Inicio",read:"Leer",case:"Ver caso",allWork:"Todos los proyectos",allInsights:"Todos los artículos",
  selectedWork:"Proyectos seleccionados",capabilities:"Capacidades",aboutTranos:"Sobre Tranos",projectInquiry:"Solicitud de proyecto",
  startProject:"Iniciar proyecto",exploreWork:"Explorar proyectos",whatThinking:"En qué estamos pensando.",
  builtToStandOut:"Hecho para destacar.",oneStudio:"Un estudio.",manyDisciplines:"Muchas disciplinas.",
  nextVersion:"Construyamos la próxima versión.",process:"Proceso",storyTitle:"Haz que se sienta inevitable.",storyLead:"El buen trabajo digital no consiste en añadir más, sino en eliminar la fricción entre una idea y el momento en que alguien la siente.",insightsLead:"Notas sobre productos digitales, IA, sistemas de marca y la cultura tecnológica.",secureAccess:"Acceso seguro",control:"Centro de control"
 },
 de:{
  work:"Projekte",services:"Leistungen",about:"Über uns",insights:"Insights",contact:"Kontakt",talk:"Lass uns reden",heroTitle:"Ideen werden digitale Realität.",heroDescription:"Tranos ist ein unabhängiges Digitalstudio für Premium-Erlebnisse, intelligente Systeme und visuelle Identitäten.",
  home:"Start",read:"Lesen",case:"Case ansehen",allWork:"Alle Projekte",allInsights:"Alle Insights",
  selectedWork:"Ausgewählte Projekte",capabilities:"Kompetenzen",aboutTranos:"Über Tranos",projectInquiry:"Projektanfrage",
  startProject:"Projekt starten",exploreWork:"Projekte ansehen",whatThinking:"Woran wir arbeiten.",
  builtToStandOut:"Entwickelt, um aufzufallen.",oneStudio:"Ein Studio.",manyDisciplines:"Viele Disziplinen.",
  nextVersion:"Bauen wir die nächste Version.",process:"Prozess",storyTitle:"Mach es unvermeidlich.",storyLead:"Gute digitale Arbeit bedeutet nicht mehr hinzuzufügen. Sie reduziert die Reibung zwischen einer Idee und dem Moment, in dem sie fühlbar wird.",insightsLead:"Notizen zu digitalen Produkten, KI, Markensystemen und der Kultur der Technologie.",secureAccess:"Sicherer Admin-Zugang",control:"Control Center"
 }
} as const;

export function t(locale:Locale,key:keyof typeof translations.en){
 return translations[locale][key]??translations.en[key];
}

export function isLocale(value:string):value is Locale{
 return locales.includes(value as Locale);
}

export async function getLocaleFromCookie(){
 try{
  const {cookies}=await import("next/headers");
  const locale=cookies().get("tranos-locale")?.value;
  return locale&&isLocale(locale)?locale:"en";
 }catch{return "en" as Locale;}
}
