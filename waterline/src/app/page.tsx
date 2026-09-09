import { SiteNav, SiteFooter } from "@/components/site";
import {
  Hero,
  Thesis,
  SystemSection,
  Method,
  Capabilities,
  Sectors,
  Pricing,
  Faq,
  ClosingCta,
} from "@/components/marketing";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <Thesis />
        <SystemSection />
        <Method />
        <Capabilities />
        <Sectors />
        <Pricing />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
