import architecture from "../content/architecture.md?raw";
import compatibility from "../content/compatibility.md?raw";
import deployment from "../content/deployment.md?raw";
import evaluation from "../content/evaluation.md?raw";
import gettingStarted from "../content/getting-started.md?raw";
import operations from "../content/operations.md?raw";
import overview from "../content/overview.md?raw";
import releasing from "../content/releasing.md?raw";
import roadmap from "../content/roadmap.md?raw";
import security from "../content/security.md?raw";
import sdkIndex from "../content/sdk/index.md?raw";
import dotnet from "../content/sdk/dotnet.md?raw";
import java from "../content/sdk/java.md?raw";
import node from "../content/sdk/node.md?raw";
import php from "../content/sdk/php.md?raw";
import python from "../content/sdk/python.md?raw";
import rust from "../content/sdk/rust.md?raw";

export type Doc = { slug: string; title: string; section: string; markdown: string };

export const docs: Doc[] = [
  { slug: "overview", title: "Overview", section: "Project", markdown: overview },
  { slug: "getting-started", title: "Getting started", section: "Project", markdown: gettingStarted },
  { slug: "architecture", title: "Architecture", section: "Project", markdown: architecture },
  { slug: "deployment", title: "Deployment", section: "Operate", markdown: deployment },
  { slug: "operations", title: "Operations", section: "Operate", markdown: operations },
  { slug: "security", title: "Security", section: "Operate", markdown: security },
  { slug: "compatibility", title: "Compatibility", section: "Maintain", markdown: compatibility },
  { slug: "releasing", title: "Releasing", section: "Maintain", markdown: releasing },
  { slug: "evaluation", title: "Evaluation", section: "Maintain", markdown: evaluation },
  { slug: "roadmap", title: "Workstream status", section: "Maintain", markdown: roadmap },
  { slug: "sdk", title: "SDK overview", section: "SDKs", markdown: sdkIndex },
  { slug: "sdk/dotnet", title: ".NET SDK", section: "SDKs", markdown: dotnet },
  { slug: "sdk/node", title: "Node.js SDK", section: "SDKs", markdown: node },
  { slug: "sdk/python", title: "Python SDK", section: "SDKs", markdown: python },
  { slug: "sdk/java", title: "Java SDK", section: "SDKs", markdown: java },
  { slug: "sdk/php", title: "PHP SDK", section: "SDKs", markdown: php },
  { slug: "sdk/rust", title: "Rust SDK", section: "SDKs", markdown: rust },
];

export function getDoc(slug: string): Doc | undefined {
  return docs.find(doc => doc.slug === slug);
}
