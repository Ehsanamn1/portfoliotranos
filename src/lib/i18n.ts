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
  work:"Work",services:"Services",about:"About",insights:"Insights",contact:"Contact",talk:"Let's Talk",
  home:"Home",read:"Read",case:"View case",allWork:"All work",allInsights:"All insights",
  selectedWork:"Selected work",capabilities:"Capabilities",aboutTranos:"About Tranos",projectInquiry:"Project inquiry",
  startProject:"Start a project",exploreWork:"Explore selected work",whatThinking:"What we're thinking.",
  builtToStandOut:"Built to stand out.",oneStudio:"One studio.",manyDisciplines:"Many disciplines.",
  nextVersion:"Let's build the next version.",secureAccess:"Secure admin access",control:"Control Center"
 },
 fa:{
  work:"نمونه‌کارها",services:"خدمات",about:"درباره ما",insights:"مجله",contact:"تماس",talk:"شروع گفتگو",
  home:"خانه",read:"مطالعه",case:"مشاهده کیس",allWork:"همه نمونه‌کارها",allInsights:"همه مطالب",
  selectedWork:"نمونه‌کارهای منتخب",capabilities:"توانمندی‌ها",aboutTranos:"درباره ترانوس",projectInquiry:"درخواست پروژه",
  startProject:"شروع پروژه",exploreWork:"مشاهده نمونه‌کارها",whatThinking:"آنچه به آن فکر می‌کنیم.",
  builtToStandOut:"برای متمایز شدن ساخته شده.",oneStudio:"یک استودیو.",manyDisciplines:"چند تخصص.",
  nextVersion:"بیایید نسخه بعدی را بسازیم.",secureAccess:"دسترسی امن مدیریت",control:"پنل مدیریت"
 },
 es:{
  work:"Proyectos",services:"Servicios",about:"Nosotros",insights:"Ideas",contact:"Contacto",talk:"Hablemos",
  home:"Inicio",read:"Leer",case:"Ver caso",allWork:"Todos los proyectos",allInsights:"Todos los artículos",
  selectedWork:"Proyectos seleccionados",capabilities:"Capacidades",aboutTranos:"Sobre Tranos",projectInquiry:"Solicitud de proyecto",
  startProject:"Iniciar proyecto",exploreWork:"Explorar proyectos",whatThinking:"En qué estamos pensando.",
  builtToStandOut:"Hecho para destacar.",oneStudio:"Un estudio.",manyDisciplines:"Muchas disciplinas.",
  nextVersion:"Construyamos la próxima versión.",secureAccess:"Acceso seguro",control:"Centro de control"
 },
 de:{
  work:"Projekte",services:"Leistungen",about:"Über uns",insights:"Insights",contact:"Kontakt",talk:"Lass uns reden",
  home:"Start",read:"Lesen",case:"Case ansehen",allWork:"Alle Projekte",allInsights:"Alle Insights",
  selectedWork:"Ausgewählte Projekte",capabilities:"Kompetenzen",aboutTranos:"Über Tranos",projectInquiry:"Projektanfrage",
  startProject:"Projekt starten",exploreWork:"Projekte ansehen",whatThinking:"Woran wir arbeiten.",
  builtToStandOut:"Entwickelt, um aufzufallen.",oneStudio:"Ein Studio.",manyDisciplines:"Viele Disziplinen.",
  nextVersion:"Bauen wir die nächste Version.",secureAccess:"Sicherer Admin-Zugang",control:"Control Center"
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
