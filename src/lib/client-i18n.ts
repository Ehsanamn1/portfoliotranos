import { isLocale, type Locale } from "@/lib/i18n";

export function getStoredLocaleLabel():Locale{
 if(typeof window==="undefined")return "en";
 const value=localStorage.getItem("tranos-locale")||document.documentElement.lang||"en";
 return isLocale(value)?value:"en";
}
