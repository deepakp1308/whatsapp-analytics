import { RecommendationCard } from "@/components/cards/RecommendationCard";
import { insights } from "@/lib/mock/insights";

export function TabRecommendations() {
  const recs = insights.filter(
    (i) => i.group === "recommendations" || (i.recommendedAction && i.severity !== "healthy")
  );

  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="mc-h-section">Recommended actions</h2>
        <p className="mc-small mt-1">
          Ranked by estimated impact. One-click staging — we apply the change in a draft experiment you can review first.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {recs.map((r) => (
          <RecommendationCard key={r.id} insight={r} />
        ))}
      </div>
    </div>
  );
}
