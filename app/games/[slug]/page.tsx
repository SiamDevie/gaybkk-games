import Link from "next/link";
import { notFound } from "next/navigation";
import { RatingBadge } from "@/components/games/rating-badge";
import { GAME_REGISTRY, getGameBySlug } from "@/games/registry";
import { ACCESS_POLICIES } from "@/lib/content/access-policies";

type GamePageProps = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return GAME_REGISTRY.map((game) => ({ slug: game.slug }));
}

export default async function GameDetailPage({ params }: GamePageProps) {
  const game = getGameBySlug((await params).slug);
  if (!game) notFound();
  const policy = ACCESS_POLICIES[game.accessPolicyId];

  return (
    <div className={`game-detail game-detail--${game.accent}`}>
      <div className="shell game-detail__shell">
        <Link className="back-link" href="/games">← กลับ Games Lobby</Link>
        <section className="game-detail__hero">
          <div className="game-detail__icon" aria-hidden="true">{game.icon}</div>
          <div><div className="game-detail__meta"><RatingBadge rating={game.contentRating} /><span className="status status--coming-soon">เร็ว ๆ นี้</span></div><h1>{game.title}</h1><p className="game-detail__kicker">{game.kicker}</p><p className="game-detail__description">{game.description}</p></div>
        </section>
        <div className="game-detail__grid">
          <section className="detail-panel"><p className="eyebrow">GAME INFO</p><dl>
            <div><dt>โหมด</dt><dd>{game.modes.map((mode) => mode === "solo" ? "Solo" : "Party Local").join(" · ")}</dd></div>
            <div><dt>ผู้เล่น</dt><dd>{game.minPlayers}{game.maxPlayers > game.minPlayers ? `–${game.maxPlayers}` : ""} คน</dd></div>
            <div><dt>กติกา</dt><dd>{game.rulesVersion}</dd></div><div><dt>Leaderboard</dt><dd>ยังไม่เปิดใช้งาน</dd></div>
          </dl></section>
          <section className="detail-panel"><p className="eyebrow">CONTENT & ACCESS</p><h2>รู้ก่อนเล่น</h2><ul>{game.contentWarnings.map((warning) => <li key={warning}>{warning}</li>)}</ul><p className="policy-note">{policy.description}</p></section>
        </div>
        <section className="coming-soon-panel"><span aria-hidden="true">✦</span><div><p className="eyebrow">IN DEVELOPMENT</p><h2>เกมนี้ยังไม่เปิดให้เล่น</h2><p>Phase 1 เตรียมโครงสร้างและข้อมูลเกมเท่านั้น ยังไม่มีระบบเล่น คะแนน หรือ Firebase session</p></div><Link className="button button--secondary" href="/games">ดูเกมอื่น</Link></section>
      </div>
    </div>
  );
}
