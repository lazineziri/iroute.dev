import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { isValidElement } from "react";
import { MermaidDiagram } from "../../components/MermaidDiagram";
import { SiteHeader } from "../../components/SiteHeader";
import { docs, getDoc } from "../../../lib/docs";

type PageProps = { params: Promise<{ slug?: string[] }> };

export function generateStaticParams() {
  return docs.map(doc => ({ slug: doc.slug.split("/") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const doc = getDoc(slug.join("/") || "overview");
  return doc ? { title: doc.title, description: `${doc.title} documentation for iRoute.` } : {};
}

function rewriteHref(href?: string): string {
  if (!href) return "#";
  const direct: Record<string, string> = {
    "compatibility.md": "/docs/compatibility",
    "installation.md": "/docs/getting-started",
    "operations.md": "/docs/operations",
    "architecture.md": "/docs/architecture",
    "releasing.md": "/docs/releasing",
    "workstream-status.md": "/docs/roadmap",
    "../sdks/node/README.md": "/docs/sdk/node",
    "../sdks/python/README.md": "/docs/sdk/python",
    "../sdks/java/README.md": "/docs/sdk/java",
    "../sdks/php/README.md": "/docs/sdk/php",
    "../sdks/rust/README.md": "/docs/sdk/rust",
    "../src/iRoute.Sdk.DotNet/README.md": "/docs/sdk/dotnet",
  };
  if (direct[href]) return direct[href];
  if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return href;
  return `https://github.com/lazineziri/iRoute/blob/main/${href.replace(/^\.\//, "")}`;
}

export default async function DocumentationPage({ params }: PageProps) {
  const { slug = [] } = await params;
  const activeSlug = slug.join("/") || "overview";
  const doc = getDoc(activeSlug);
  if (!doc) notFound();
  const sections = [...new Set(docs.map(item => item.section))];

  return (
    <div className="site-shell">
      <SiteHeader />
      <div className="docs-layout">
        <nav className="docs-nav" aria-label="Documentation">
          {sections.map(section => (
            <div key={section}>
              <h2>{section}</h2>
              {docs.filter(item => item.section === section).map(item => (
                <Link
                  key={item.slug}
                  href={`/docs/${item.slug}`}
                  aria-current={item.slug === activeSlug ? "page" : undefined}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <main className="doc">
          <p className="source-note">Version 0.1.0-alpha.1 · canonical source: iRoute repository</p>
          <article>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => <a href={rewriteHref(href)}>{children}</a>,
                pre: ({ children }) => {
                  if (isValidElement(children)) {
                    const props = children.props as { className?: string; children?: unknown };
                    if (props.className === "language-mermaid") {
                      return <MermaidDiagram chart={String(props.children ?? "").trim()} />;
                    }
                  }
                  return <pre>{children}</pre>;
                },
              }}
            >
              {doc.markdown}
            </ReactMarkdown>
          </article>
        </main>
      </div>
      <footer><span>iRoute documentation</span><span>Apache-2.0</span></footer>
    </div>
  );
}
