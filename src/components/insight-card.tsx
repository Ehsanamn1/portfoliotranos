import type { PublicInsight } from "@/lib/public-data";

export default function InsightCard({insight,index=0}:{insight:PublicInsight;index?:number}){
 const image=insight.coverImageUrl||["/insights/ai-products.svg","/insights/minimalism.svg","/insights/digital-brand.svg"][index%3];
 const date=insight.publishedAt?new Intl.DateTimeFormat("en",{month:"short",year:"numeric"}).format(new Date(insight.publishedAt)):"Studio note";
 return <a className="tx-insight-card" href={`/insights/${insight.slug}/`}>
  <div className={`tx-insight-media tx-insight-media-${(index%3)+1}`} style={{backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.62)),url("${image}")`}}><span>{date}</span><b>Read ↗</b></div>
  <div className="tx-insight-copy"><h3>{insight.title}</h3><p>{insight.excerpt}</p></div>
 </a>;
}
