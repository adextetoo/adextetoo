import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/theme";

const display = Instrument_Serif({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const ui = Inter({
  variable: "--ff-ui",
  subsets: ["latin"],
  display: "swap",
});

const code = JetBrains_Mono({
  variable: "--ff-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Waterline — the brand system platform for institutions",
    template: "%s · Waterline",
  },
  description:
    "Most brand work stops at the logo. Waterline builds the eighty per cent underneath it — strategy, positioning, voice and governance — then makes the visible twenty per cent provably consistent across every faculty, site and department.",
  keywords: [
    "brand strategy",
    "visual identity",
    "brand governance",
    "institutional branding",
    "design system",
    "brand architecture",
  ],
  openGraph: {
    title: "Waterline — the brand system platform for institutions",
    description:
      "A brand is an iceberg. Waterline builds the eighty per cent below the surface, then governs the twenty per cent above it.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060c14" },
    { media: "(prefers-color-scheme: light)", color: "#f6f4f0" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables go on <html> rather than <body>: globals.css builds
    // its stacks at :root, and a var() pointing at an undefined property
    // invalidates the whole declaration.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${ui.variable} ${code.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-lg focus:bg-signal focus:px-4 focus:py-2 focus:text-signal-ink focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
