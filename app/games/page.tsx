import type { Metadata } from "next";
import Link from "next/link";
import { GameCard } from "@/components/games/game-card";
import { StatePanel } from "@/components/ui/state-panel";
import { GAME_REGISTRY } from "@/games/registry";

export const metadata: Metadata = {
  title: "Games Lobby",
  description: "สำรวจเกมปาร์ตี้ ควิซ และเรื่องราวทั้ง 11 เกมของ GAYBKK GAMES",
};

export const instant = false;

const ratingFilters = ["ALL", "SPICY", "HOT", "AFTER_DARK"] as const;
const statusFilters = ["all", "available", "coming-soon"] as const;

type GamesPageProps = { searchParams: Promise<{ rating?: string; status?: string }> };

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const params = await searchParams;
  const rating = ratingFilters.includes(params.rating as (typeof ratingFilters)[number])
    ? (params.rating as (typeof ratingFilters)[number]) : "ALL";
  const status = statusFilters.includes(params.status as (typeof statusFilters)[number])
    ? (params.status as (typeof statusFilters)[number]) : "all";
  const games = GAME_REGISTRY.filter((game) =>
    (rating === "ALL" || game.contentRating === rating) &&
    (status === "all" || game.status === status),
  );

  return (
    <div className="lobby-page">
      <section className="lobby-hero">
        <div className="shell">
          <p className="eyebrow">CHOOSE YOUR CHAOS</p>
          <h1>Games Lobby</h1>
          <p>เลือกอารมณ์ของคืนนี้ ทั้งควิซ ปาร์ตี้ และเรื่องเล่า—ทุกเกมยังอยู่ระหว่างการพัฒนา</p>
          <div className="lobby-count"><strong>{GAME_REGISTRY.length}</strong><span>เกมใน<br />Launch Catalog</span></div>
        </div>
      </section>
      <section className="shell lobby-content" aria-labelledby="game-list-title">
        <div className="filter-bar">
          <div><span className="filter-label">ระดับเนื้อหา</span><div className="filter-options">
            {ratingFilters.map((value) => <Link key={value} className={rating === value ? "active" : ""} href={`/games?rating=${value}&status=${status}`} aria-current={rating === value ? "page" : undefined}>{value === "ALL" ? "ทั้งหมด" : value.replace("_", " ")}</Link>)}
          </div></div>
          <div><span className="filter-label">สถานะ</span><div className="filter-options">
            {statusFilters.map((value) => <Link key={value} className={status === value ? "active" : ""} href={`/games?rating=${rating}&status=${value}`} aria-current={status === value ? "page" : undefined}>{value === "all" ? "ทั้งหมด" : value === "available" ? "พร้อมเล่น" : "เร็ว ๆ นี้"}</Link>)}
          </div></div>
        </div>
        <div className="results-heading"><h2 id="game-list-title">พบ {games.length} เกม</h2><p>Rating เป็นข้อมูลเนื้อหา ไม่ใช่สิทธิ์ในการเข้าถึง</p></div>
        {games.length > 0 ? <div className="games-grid">{games.map((game) => <GameCard key={game.id} game={game} />)}</div> :
          <StatePanel icon="◇" title="ยังไม่มีเกมในตัวกรองนี้" description="เกมทั้ง 11 เกมยังอยู่ระหว่างการพัฒนา ลองเลือกสถานะหรือระดับเนื้อหาอื่น" actionHref="/games" actionLabel="ล้างตัวกรอง" />}
      </section>
    </div>
  );
}
