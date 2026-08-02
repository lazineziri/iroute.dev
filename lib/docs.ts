import architecture from "../content/architecture.md?raw";
import compatibility from "../content/compatibility.md?raw";
import deployment from "../content/deployment.md?raw";
import evaluation from "../content/evaluation.md?raw";
import gettingStarted from "../content/getting-started.md?raw";
import operations from "../content/operations.md?raw";
import overview from "../content/overview.md?raw";
import packages from "../content/packages.md?raw";
import releasing from "../content/releasing.md?raw";
import security from "../content/security.md?raw";
import sdkIndex from "../content/sdk/index.md?raw";
import dotnet from "../content/sdk/dotnet.md?raw";
import java from "../content/sdk/java.md?raw";
import node from "../content/sdk/node.md?raw";
import php from "../content/sdk/php.md?raw";
import python from "../content/sdk/python.md?raw";
import rust from "../content/sdk/rust.md?raw";

export type Doc = {
  slug: string;
  title: string;
  section: string;
  sourcePath: string;
  markdown: string;
};

export const docs: Doc[] = [
  { slug: "overview", title: "Overview", section: "Project", sourcePath: "README.md", markdown: overview },
  { slug: "getting-started", title: "Getting started", section: "Project", sourcePath: "docs/installation.md", markdown: gettingStarted },
  { slug: "architecture", title: "Architecture", section: "Project", sourcePath: "docs/architecture.md", markdown: architecture },
  { slug: "deployment", title: "Deployment", section: "Operate", sourcePath: "deploy/README.md", markdown: deployment },
  { slug: "operations", title: "Operations", section: "Operate", sourcePath: "docs/operations.md", markdown: operations },
  { slug: "security", title: "Security", section: "Operate", sourcePath: "SECURITY.md", markdown: security },
  { slug: "compatibility", title: "Compatibility", section: "Maintain", sourcePath: "docs/compatibility.md", markdown: compatibility },
  { slug: "releasing", title: "Releasing", section: "Maintain", sourcePath: "docs/releasing.md", markdown: releasing },
  { slug: "packages", title: "Package publishing", section: "Maintain", sourcePath: "docs/package-publishing.md", markdown: packages },
  { slug: "evaluation", title: "Evaluation", section: "Maintain", sourcePath: "eval/README.md", markdown: evaluation },
  { slug: "sdk", title: "SDK overview", section: "SDKs", sourcePath: "docs/sdk-usage.md", markdown: sdkIndex },
  { slug: "sdk/dotnet", title: ".NET SDK", section: "SDKs", sourcePath: "src/iRoute.Sdk.DotNet/README.md", markdown: dotnet },
  { slug: "sdk/node", title: "Node.js SDK", section: "SDKs", sourcePath: "sdks/node/README.md", markdown: node },
  { slug: "sdk/python", title: "Python SDK", section: "SDKs", sourcePath: "sdks/python/README.md", markdown: python },
  { slug: "sdk/java", title: "Java SDK", section: "SDKs", sourcePath: "sdks/java/README.md", markdown: java },
  { slug: "sdk/php", title: "PHP SDK", section: "SDKs", sourcePath: "sdks/php/README.md", markdown: php },
  { slug: "sdk/rust", title: "Rust SDK", section: "SDKs", sourcePath: "sdks/rust/README.md", markdown: rust },
];

export function getDoc(slug: string): Doc | undefined {
  return docs.find(doc => doc.slug === slug);
}
