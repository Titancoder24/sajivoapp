import { ProfessionalCard } from "@/components/sajivo/ProfessionalCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getPortfolioForProfessional, getProfessionals, getReviewsForProfessional } from "@/lib/server/repository";

export default async function PublicProPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const professional = (await getProfessionals()).find((item) => item.id === id) ?? (await getProfessionals())[0];
  const portfolio = await getPortfolioForProfessional(professional.id);
  const reviews = await getReviewsForProfessional(professional.id);
  return (
    <section className="page-shell py-14">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <ProfessionalCard professional={professional} />
        <div className="grid gap-4">
          <Card>
            <CardContent>
              <h1 className="font-display text-4xl">{professional.businessName ?? professional.fullName}</h1>
              <p className="mt-4 leading-7 text-[var(--rv-ink-2)]">{professional.bio}</p>
              <div className="mt-5 flex flex-wrap gap-2">{(professional.serviceAreas ?? []).map((area) => <Badge key={area}>{area}</Badge>)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2 className="font-display text-2xl">Portfolio</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {portfolio.map((item) => (
                  <div key={item.id} className="rounded-md bg-[var(--rv-bg)] p-4">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-[var(--rv-ink-2)]">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2 className="font-display text-2xl">Reviews</h2>
              <div className="mt-4 grid gap-3">
                {reviews.map((review) => <p key={review.id} className="rounded-md bg-[var(--rv-bg)] p-4 text-sm leading-6">{review.rating}/5 · {review.reviewText}</p>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
