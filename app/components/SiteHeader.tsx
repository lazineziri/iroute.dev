import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/">iRoute</Link>
      <nav className="site-nav" aria-label="Primary navigation">
        <Link href="/docs/getting-started">Get started</Link>
        <Link href="/docs/sdk">SDKs</Link>
        <Link href="/docs/architecture">Architecture</Link>
        <a href="https://github.com/lazineziri/iRoute">GitHub</a>
      </nav>
    </header>
  );
}
