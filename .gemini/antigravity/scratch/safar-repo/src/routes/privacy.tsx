import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandMark } from "../components/brand-mark";
import { SiteFooter } from "../components/site/site-footer";
import { useWorkspaceSettings } from "../hooks/use-workspace-settings";
import { defaultSections, fetchPublishedContent } from "../lib/cms";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SAFAR N MANZIL" },
      { name: "description", content: "Privacy Policy for SAFAR N MANZIL" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground">Last Updated: August 2026</p>

          <div className="prose prose-neutral mt-8 max-w-none text-foreground">
            <h3>1. Introduction</h3>
            <p>Welcome to <strong>SAFAR N MANZIL</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you use our website and services, and tell you about your privacy rights.</p>

            <h3>2. Data We Collect</h3>
            <p>When you interact with us via WhatsApp or our request builder, we may collect your phone number, name, location, and the specific details regarding the assistance you require (such as travel plans, packing needs, or family assistance requirements).</p>

            <h3>3. How We Use Your Data</h3>
            <p>We use your information exclusively to provide the Gulf-assistance services you request. This includes communicating with you, coordinating with our trusted local partners (such as cab drivers or delivery personnel), and improving our customer service.</p>

            <h3>4. Data Sharing</h3>
            <p>We do not sell your personal data. We may share necessary details (such as a pickup address or phone number) with verified third-party service providers (like taxi drivers or delivery partners) solely for the purpose of fulfilling your direct requests.</p>

            <h3>5. Contact Us</h3>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us via our official WhatsApp number: +91 7207071874.</p>
          </div>
        </div>
      </main>

      <SiteFooter footer={sections.footer || {}} contact={sections.contact || {}} brandName={brandName} />
    </div>
  );
}
