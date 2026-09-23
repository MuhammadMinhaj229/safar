import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandMark } from "../components/brand-mark";
import { SiteFooter } from "../components/site/site-footer";
import { useWorkspaceSettings } from "../hooks/use-workspace-settings";
import { defaultSections, fetchPublishedContent, type SectionContent } from "../lib/cms";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — SAFAR N MANZIL" },
      { name: "description", content: "See what our customers have to say about SAFAR N MANZIL" },
    ],
  }),
  component: ReviewsPage,
});

function list<T>(content: SectionContent, key: string): T[] {
  const value = content[key];
  return Array.isArray(value) ? (value as T[]) : [];
}

function ReviewsPage() {
  const { settings } = useWorkspaceSettings();
  const brandName = settings.branding.name || "SAFAR N MANZIL";
  
  const fallback = defaultSections();
  const { data: sections = fallback } = useQuery({
    queryKey: ["cms-published"],
    queryFn: fetchPublishedContent,
    initialData: fallback,
  });

  const testimonials = sections['testimonials'] ?? {};
  const items = list<{ quote?: string; author?: string; location?: string }>(testimonials, "items");

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

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-16">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            What Our Customers Say
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Real stories and experiences from the people we've helped settle, travel, and thrive in the Gulf.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <h3 className="text-lg font-semibold text-foreground">No reviews yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">Check back soon to read customer experiences!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, idx) => {
              const initial = item.author ? item.author.charAt(0).toUpperCase() : "C";
              return (
                <div key={idx} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="flex gap-1 text-primary mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-6 font-medium italic text-foreground leading-relaxed text-lg">"{item.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary">
                      {initial}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.author || "Happy Customer"}</p>
                      {item.location && <p className="text-sm font-medium text-muted-foreground">{item.location}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <SiteFooter footer={sections.footer || {}} contact={sections.contact || {}} brandName={brandName} />
    </div>
  );
}
