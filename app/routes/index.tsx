import { useLoaderData } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';
import { searchFacetValues } from '~/providers/products/products'; // Add this import
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { LoaderArgs } from '@remix-run/server-runtime';
import { useTranslation } from 'react-i18next';
import HeroCarousel from '~/components/Home/HeroCarousel';
import AnimatedSection from '~/components/AnimatedSection/AnimatedSection';
import TestimonialsSection from '~/components/Home/TestimonialsSection';
import FilterSection from '~/components/Home/FilterSection';
import DiamondSelector from '~/components/Home/DiamondSelector';

export async function loader({ request }: LoaderArgs) {
  const [collections, facetValues] = await Promise.all([
    getCollections(request, { take: 20 }),
    searchFacetValues(
      {
        input: {
          groupByProduct: true,
        },
      },
      { request },
    ).then((result) => result.search.facetValues),
  ]);

  return {
    collections,
    facetValues,
  };
}

export default function Index() {
  const { collections, facetValues } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const headerImage = collections[0]?.featuredAsset?.preview;

  return (
    <>
      <HeroCarousel />
      <AnimatedSection delay={0.2}>
        <DiamondSelector />
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <FilterSection facetValues={facetValues} />
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <TestimonialsSection />
      </AnimatedSection>
    </>
  );
}
