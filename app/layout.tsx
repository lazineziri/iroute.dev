import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://iroute.dev"),
  title: {
    default: "iRoute — task-aware AI execution",
    template: "%s · iRoute",
  },
  description:
    "Open-source, self-hosted task-aware AI execution with durable workers, deterministic routing and thin SDK clients.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "iRoute — task-aware AI execution",
    description:
      "Run the router. Install the client. Durable, observable AI execution without sending every task to the largest model.",
    url: "https://iroute.dev",
    siteName: "iRoute",
    type: "website",
    images: [{ url: "/og.png", width: 1659, height: 948, alt: "iRoute — Run the router. Install the client." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "iRoute — task-aware AI execution",
    description: "Run the router. Install the client.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
