"use client";

import { useEffect, useId, useState } from "react";

let mermaidModule: Promise<typeof import("mermaid")> | undefined;

export function MermaidDiagram({ chart }: { chart: string }) {
  const reactId = useId();
  const [svg, setSvg] = useState<string>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      mermaidModule ??= import("mermaid");
      const { default: mermaid } = await mermaidModule;
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily: "Arial, Helvetica, sans-serif",
        themeVariables: {
          background: "#f5f4ef",
          primaryColor: "#f5f4ef",
          primaryTextColor: "#171717",
          primaryBorderColor: "#171717",
          lineColor: "#171717",
          secondaryColor: "#e8e6df",
          tertiaryColor: "#f5f4ef",
        },
      });
      const id = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
      const result = await mermaid.render(id, chart);
      if (!cancelled) setSvg(result.svg);
    };
    render().catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [chart, reactId]);

  if (failed) {
    return <pre className="mermaid-fallback"><code>{chart}</code></pre>;
  }
  return (
    <div
      className="mermaid-diagram"
      aria-label="Architecture diagram"
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    >
      {!svg ? "Rendering diagram…" : null}
    </div>
  );
}
