import type { PublicInsight } from "@/lib/public-data";

export default function InsightCard({insight,index=0}:{insight:PublicInsight;index?:number}){
  const style=insight.coverImageUrl?{backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.62)),url("${insight.coverImageUrl}")`}:undefined;
  const date=insight.publishedAt?new Intl.DateTimeFormat("en",{month:"short",year:"numeric"}).format(new Date(insight.publishedAt)):"Studio note";
  return <a className="tx-insight-card" href={`/insights/${insight.slug}/`}>
    <div className={`tx-insight-media tx-insight-media-${(index%3)+1}`} style={style}><span>{date}</span><b>Read ↗</b></div>
    <div className="tx-insight-copy"><h3>{insight.title}</h3><p>{insight.excerpt}</p></div>
  </a>;
}
