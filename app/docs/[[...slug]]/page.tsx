import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { isValidElement } from "react";
import { posix } from "node:path";
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

const sourceRoutes = new Map(docs.map(doc => [doc.sourcePath, `/docs/${doc.slug}`]));

function rewriteHref(href: string | undefined, sourcePath: string): string {
  if (!href) return "#";
  if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return href;

  const [, pathPart, suffix] = href.match(/^([^?#]*)(.*)$/) ?? [];
  const target = posix.normalize(posix.join(posix.dirname(sourcePath), pathPart));
  const route = sourceRoutes.get(target);
  if (route) return `${route}${suffix}`;

  const kind = posix.extname(target) ? "blob" : "tree";
  return `https://github.com/lazineziri/iRoute/${kind}/main/${target}${suffix}`;
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
          <p className="source-note">Version 0.1.0-alpha.2 · canonical source: iRoute repository</p>
          <article>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => <a href={rewriteHref(href, doc.sourcePath)}>{children}</a>,
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
