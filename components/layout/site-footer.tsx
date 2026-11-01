import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__top">
        <div>
          <BrandMark />
          <p>มินิเกมสำหรับผู้ใหญ่ สนุก เคารพขอบเขต และเป็นส่วนตัว</p>
        </div>
        <nav aria-label="ลิงก์ส่วนท้าย">
          <Link href="/games">เกมทั้งหมด</Link>
          <Link href="/#safety">ความปลอดภัย</Link>
          <a href="https://gaybkk.co" rel="noreferrer">
            gaybkk.co ↗
          </a>
        </nav>
      </div>
      <div className="shell site-footer__bottom">
        <p>© 2026 gaybkk.co · Proprietary</p>
        <p>สำหรับผู้มีอายุ 18 ปีขึ้นไป · ไม่มีสื่อโจ่งแจ้งใน Phase 1</p>
      </div>
    </footer>
  );
}
