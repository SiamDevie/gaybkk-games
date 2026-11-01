import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";

const navigation = [
  { href: "/", label: "หน้าแรก" },
  { href: "/games", label: "เกมทั้งหมด" },
  { href: "/#safety", label: "เล่นอย่างสบายใจ" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label="เมนูหลัก">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <span className="header-status" aria-label="เกมทั้งหมดกำลังพัฒนา">
            <span aria-hidden="true" /> Phase 1
          </span>
          <details className="mobile-menu">
            <summary aria-label="เปิดเมนู">
              <span />
              <span />
              <span />
            </summary>
            <nav aria-label="เมนูมือถือ">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
