import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold">{siteConfig.name}</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">{siteConfig.tagline}.</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link
            href="/privacidade/"
            prefetch={false}
            className="transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Privacidade
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className="transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {siteConfig.email}
          </a>
          <span>
            © {year} {siteConfig.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
