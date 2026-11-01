import Link from "next/link";

export function BrandMark() {
  return (
    <Link className="brand-mark" href="/" aria-label="GAYBKK Games home">
      <span className="brand-mark__symbol" aria-hidden="true">
        G
      </span>
      <span className="brand-mark__text">
        <strong>GAYBKK</strong>
        <small>GAMES</small>
      </span>
    </Link>
  );
}
