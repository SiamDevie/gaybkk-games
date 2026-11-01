import Link from "next/link";
import { GameCard } from "@/components/games/game-card";
import { GAME_REGISTRY } from "@/games/registry";

const featuredGames = GAME_REGISTRY.slice(0, 3);

export const instant = false;

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__orb hero__orb--pink" aria-hidden="true" />
        <div className="hero__orb hero__orb--blue" aria-hidden="true" />
        <div className="shell hero__inner">
          <div className="hero__copy">
            <p className="eyebrow"><span /> PLAY BOLD · STAY FABULOUS</p>
            <h1>คืนนี้<br /><span>เล่นอะไรดี?</span></h1>
            <p className="hero__lead">
              มินิเกมสายปาร์ตี้ ควิซ และเรื่องราวสำหรับผู้ใหญ่
              ออกแบบให้เล่นง่ายบนมือถือ สนุกโดยไม่ก้าวข้ามขอบเขตของใคร
            </p>
            <div className="hero__actions">
              <Link className="button button--primary" href="/games">
                สำรวจทั้ง 11 เกม <span aria-hidden="true">→</span>
              </Link>
              <a className="button button--ghost" href="#safety">หลักการของเรา</a>
            </div>
            <div className="hero__notes" aria-label="คุณสมบัติแพลตฟอร์ม">
              <span>◉ Mobile-first</span><span>◉ Consent matters</span><span>◉ No explicit media</span>
            </div>
          </div>
          <div className="hero-console" aria-label="ตัวอย่างหมวดเกม">
            <div className="hero-console__top"><span>LIVE CATALOG</span><span>11 TITLES</span></div>
            <div className="hero-console__number">18+</div>
            <p>YOUR NIGHT.<br />YOUR RULES.</p>
            <div className="hero-console__tags"><span>QUIZ</span><span>PARTY</span><span>STORY</span></div>
            <div className="hero-console__scan" />
          </div>
        </div>
      </section>

      <section className="section section--catalog">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow">FIRST DROP</p><h2>เกมเด่นที่กำลังปรุง</h2></div>
            <Link href="/games">ดูเกมทั้งหมด <span aria-hidden="true">→</span></Link>
          </div>
          <div className="featured-grid">
            {featuredGames.map((game) => <GameCard key={game.id} game={game} featured />)}
          </div>
        </div>
      </section>

      <section className="section safety" id="safety">
        <div className="shell safety__grid">
          <div className="safety__intro">
            <p className="eyebrow">PLAY SAFE · PLAY YOUR WAY</p>
            <h2>ปาร์ตี้ที่ดี<br />ต้องมีพื้นที่ให้เลือก</h2>
            <p>ทุกเกมในอนาคตจะยึดหลักความยินยอม ความเป็นส่วนตัว และการออกจากสถานการณ์ที่ไม่สบายใจได้เสมอ</p>
          </div>
          <div className="principle-list">
            <article><span>01</span><div><h3>Skip ได้จริง</h3><p>ข้ามคำถามหรือภารกิจได้โดยไม่เสียสิทธิ์และไม่ต้องอธิบาย</p></div></article>
            <article><span>02</span><div><h3>ข้อมูลส่วนตัวไม่ใช่คะแนน</h3><p>คำตอบเชิงความชอบและเรื่องส่วนตัวจะไม่ขึ้นโปรไฟล์สาธารณะโดยปริยาย</p></div></article>
            <article><span>03</span><div><h3>18+ ไม่ใช่ทางลัด</h3><p>Age Gate นี้เป็นเพียง UX เบื้องต้น สื่อจำกัดสิทธิ์ต้องมีระบบตรวจสอบฝั่งเซิร์ฟเวอร์ก่อน</p></div></article>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="shell final-cta__inner">
          <p className="eyebrow">THE LOBBY IS OPEN</p>
          <h2>11 ideas. One fabulous playground.</h2>
          <p>ดูรายละเอียด ระดับเนื้อหา และสถานะการพัฒนาของทุกเกมได้ใน Lobby</p>
          <Link className="button button--primary" href="/games">เข้าสู่ Games Lobby →</Link>
        </div>
      </section>
    </>
  );
}
