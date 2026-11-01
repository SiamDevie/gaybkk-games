import type { ContentRating } from "@/types/game";

const ratingLabels: Record<ContentRating, string> = {
  SPICY: "🌶 Spicy",
  HOT: "🔥 Hot",
  XXX: "18+ Restricted",
  AFTER_DARK: "☾ After Dark",
};

export function RatingBadge({ rating }: { rating: ContentRating }) {
  return (
    <span className={`rating-badge rating-badge--${rating.toLowerCase()}`}>
      {ratingLabels[rating]}
    </span>
  );
}
