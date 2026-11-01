import Link from "next/link";

type StatePanelProps = {
  icon: string;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function StatePanel({
  icon,
  title,
  description,
  actionHref,
  actionLabel,
}: StatePanelProps) {
  return (
    <section className="state-panel">
      <span className="state-panel__icon" aria-hidden="true">
        {icon}
      </span>
      <h1>{title}</h1>
      <p>{description}</p>
      {actionHref && actionLabel ? (
        <Link className="button button--primary" href={actionHref}>
          {actionLabel}
        </Link>
      ) : null}
    </section>
  );
}
