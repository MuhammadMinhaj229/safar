import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandMark } from "../components/brand-mark";
import { SiteFooter } from "../components/site/site-footer";
import { useWorkspaceSettings } from "../hooks/use-workspace-settings";
import { defaultSections, fetchPublishedContent } from "../lib/cms";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — SAFAR N MANZIL" },
      { name: "description", content: "Terms of Service for SAFAR N MANZIL" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { settings } = useWorkspaceSettings();
  const brandName = settings.branding.name || "SAFAR N MANZIL";
  
  const fallback = defaultSections();
  const { data: sections = fallback } = useQuery({
    queryKey: ["cms-published"],
    queryFn: fetchPublishedContent,
    initialData: fallback,
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4">
          <Link to="/" className="min-w-0">
            <BrandMark name={brandName} style="lockup" compact />
          </Link>
          <nav className="ml-auto flex items-center gap-7">
            <Link to="/" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">Back to Home</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-12">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">Terms of Service</h1>
          <p className="mt-2 text-muted-foreground">Last Updated: August 2026</p>

          <div className="prose prose-neutral mt-8 max-w-none text-foreground">
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing and using the services of <strong>SAFAR N MANZIL</strong>, you accept and agree to be bound by the terms and provision of this agreement. Our services are primarily accessed and coordinated via WhatsApp.</p>

            <h3>2. Description of Services</h3>
            <p><strong>SAFAR N MANZIL</strong> is an assistance coordination service. We assist individuals traveling to or living in the Gulf by coordinating services such as packing materials, local transportation, family grocery delivery, and providing guidance on documentation.</p>

            <h3>3. Role and Limitation of Liability</h3>
            <p><strong>SAFAR N MANZIL</strong> acts as an assistant and coordinator. We are not a government entity, embassy, or airline. While we assist with visa form guidance and flight ticket coordination, the ultimate approval of visas, entry to countries, and airline operations are entirely at the discretion of the respective authorities and airlines. <strong>SAFAR N MANZIL</strong> shall not be held liable for visa rejections, flight cancellations, or customs issues.</p>

            <h3>4. Payments and Fees</h3>
            <p>All service fees, product costs (such as boxes or food), and third-party fees (like cab fares) will be clearly communicated to you upfront via WhatsApp before any service is rendered. There are no hidden fees.</p>

            <h3>5. Contact</h3>
            <p>For any inquiries regarding these terms, please contact us on WhatsApp at +91 7207071874.</p>
          </div>
        </div>
      </main>

      <SiteFooter footer={sections.footer || {}} contact={sections.contact || {}} brandName={brandName} />
    </div>
  );
}
