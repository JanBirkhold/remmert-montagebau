import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { RegionPageLayout } from "@/components/RegionPageLayout";
import { getRegionBySlug, REGION_PAGES } from "@/lib/content/regions";
import { createBreadcrumbSchema } from "@/lib/schema";
import { createRegionMetadata } from "@/lib/seo";

type RegionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return REGION_PAGES.map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) return {};

  return createRegionMetadata(region.slug, region.title, region.metaDescription);
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) notFound();

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: region.title, path: `/regionen/${region.slug}` },
        ])}
      />
      <RegionPageLayout region={region} />
    </>
  );
}
