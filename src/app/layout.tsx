import type { Metadata } from "next";
import "./globals.css";

const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||"https://portfoliotranos.wandering-wedelia-b71.workers.dev";

export const metadata:Metadata={
  metadataBase:new URL(siteUrl),
  title:{default:"Tranos Studio — Digital / AI / Creative",template:"%s | Tranos Studio"},
  description:"Tranos Studio builds premium digital products, AI systems, brand identities and cinematic digital experiences.",
  applicationName:"Tranos Studio",
  keywords:["Tranos","AI studio","digital studio","creative technology","digital products","branding","3D motion"],
  icons:{icon:"/favicon.svg"},
  openGraph:{title:"Tranos Studio — Digital / AI / Creative",description:"Premium digital products, intelligent systems and visual identities.",type:"website",url:siteUrl,siteName:"Tranos Studio"},
  twitter:{card:"summary_large_image",title:"Tranos Studio — Digital / AI / Creative",description:"Premium digital products, intelligent systems and visual identities."}
};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body>{children}</body></html>;
}
