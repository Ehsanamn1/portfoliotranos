import type { PublicInsight } from "@/lib/public-data";

export default function InsightCard({ insight, index = 0 }: { insight: PublicInsight; index?: number }) {
  const image =
    insight.coverImageUrl ||
    ["/insights/ai-products.svg", "/insights/minimalism.svg", "/insights/digital-brand.svg"][index % 3];
  const date = insight.publishedAt
    ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(insight.publishedAt))
    : "Studio note";

  return (
    <a className="tx-insight-card" href={`/insights/${insight.slug}/`}>
      <div
        className={`tx-insight-media tx-insight-media-${(index % 3) + 1}`}
        style={{
          backgroundImage:
            `linear-gradient(180deg, rgba(5,5,6,.02), rgba(5,5,6,.86)), url("${image}")`
        }}
      >
        <span>{date}</span>
        <b>Read ↗</b>
      </div>
      <div className="tx-insight-copy">
        <span>TR / NOTE {String(index + 1).padStart(2, "0")}</span>
        <h3>{insight.title}</h3>
        <p>{insight.excerpt}</p>
      </div>
    </a>
  );
}
