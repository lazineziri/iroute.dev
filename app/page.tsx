import Link from "next/link";
import { SiteHeader } from "./components/SiteHeader";

const sdks = [
  [".NET", "dotnet add package iRoute.Sdk --version 0.1.0-alpha.1", "dotnet"],
  ["Node.js", "npm install @iroute/sdk@0.1.0-alpha.1", "node"],
  ["Python", "pip install --pre iroute==0.1.0a1", "python"],
  ["Java", "dev.iroute:iroute-sdk:0.1.0-alpha.1", "java"],
  ["PHP", "composer require iroute/sdk:0.1.0-alpha.1", "php"],
  ["Rust", "cargo add iroute-sdk@0.1.0-alpha.1", "rust"],
] as const;

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="hero">
          <p className="eyebrow">Open-source · experimental alpha</p>
          <h1>Run the router.<br />Install the client.</h1>
          <p className="hero-copy">
            iRoute is a self-hosted execution runtime for task-aware AI systems.
            It resolves trusted state first, routes only unresolved work, and
            keeps execution durable and observable.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/docs/getting-started">Start locally</Link>
            <Link className="button" href="/docs/sdk">Choose an SDK</Link>
          </div>
        </section>

        <section className="boundary" aria-labelledby="boundary-title">
          <div><p className="section-number">01</p><h2 id="boundary-title">One runtime, thin clients</h2></div>
          <div className="boundary-flow" aria-label="iRoute deployment flow">
            <div><strong>Your application</strong><span>installs one SDK</span></div>
            <span aria-hidden="true">→</span>
            <div><strong>iRoute API</strong><span>runs in Docker</span></div>
            <span aria-hidden="true">→</span>
            <div><strong>Worker + database</strong><span>executes durable work</span></div>
          </div>
          <p className="section-copy">
            The packages do not embed a second router. They serialize the public
            HTTP contract, handle execution operations and SSE replay, and call
            the server you operate.
          </p>
        </section>

        <section className="quickstart" aria-labelledby="quickstart-title">
          <div><p className="section-number">02</p><h2 id="quickstart-title">Local in two commands</h2></div>
          <pre><code>{`docker compose -f deploy/compose.sqlite.yaml up --build --wait
curl --fail http://localhost:8080/health/ready`}</code></pre>
          <p className="section-copy">
            This starts the API and execution worker with durable SQLite storage.
            The deterministic development gateway requires no provider key.
          </p>
        </section>

        <section className="sdk-section" aria-labelledby="sdk-title">
          <div><p className="section-number">03</p><h2 id="sdk-title">Six thin clients</h2></div>
          <div className="sdk-list">
            {sdks.map(([name, command, slug]) => (
              <Link href={`/docs/sdk/${slug}`} className="sdk-row" key={slug}>
                <strong>{name}</strong><code>{command}</code><span aria-hidden="true">Read guide →</span>
              </Link>
            ))}
          </div>
          <p className="section-copy">
            These are the public registry coordinates. Publication is being
            bootstrapped registry by registry; every guide also contains a
            source installation path that works before its registry release.
          </p>
        </section>

        <section className="status" aria-labelledby="status-title">
          <div><p className="section-number">04</p><h2 id="status-title">Honest alpha</h2></div>
          <div>
            <p>
              The public alpha includes durable workers, circuit breaking,
              provider fallback, observability, contracts, deployment assets
              and six conformance-tested clients.
            </p>
            <p>
              This is not a production claim. There is no SLA. Reference
              connectors are not production integrations, and sustained load,
              failover and operational validation remain release gates.
            </p>
            <Link href="/docs/overview">Read the complete project overview →</Link>
          </div>
        </section>
      </main>
      <footer><span>iRoute · Apache-2.0</span><span>0.1.0-alpha.1</span></footer>
    </div>
  );
}
