import Link from "next/link";
import { RatingBadge } from "@/components/games/rating-badge";
import type { GameDefinition } from "@/types/game";

export function GameCard({ game, featured = false }: { game: GameDefinition; featured?: boolean }) {
  return (
    <article className={`game-card game-card--${game.accent}${featured ? " game-card--featured" : ""}`}>
      <div className="game-card__art" aria-hidden="true">
        <span>{game.icon}</span>
        <i />
      </div>
      <div className="game-card__body">
        <div className="game-card__meta">
          <RatingBadge rating={game.contentRating} />
          <span className={`status status--${game.status}`}>
            {game.status === "available" ? "พร้อมเล่น" : "เร็ว ๆ นี้"}
          </span>
        </div>
        <h3>{game.title}</h3>
        <p className="game-card__kicker">{game.kicker}</p>
        <p>{game.description}</p>
        <div className="game-card__footer">
          <span>
            {game.modes.includes("party-local") ? "Party" : "Solo"} · {game.minPlayers}
            {game.maxPlayers > game.minPlayers ? `–${game.maxPlayers}` : ""} คน
          </span>
          <Link href={`/games/${game.slug}`} aria-label={`ดูรายละเอียด ${game.title}`}>
            ดูรายละเอียด <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
