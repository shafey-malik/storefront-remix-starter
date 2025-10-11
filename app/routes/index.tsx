import { useLoaderData } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';
import { CollectionCard } from '~/components/collections/CollectionCard';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { LoaderArgs } from '@remix-run/server-runtime';
import { useTranslation } from 'react-i18next';
import HeroCarousel from '~/components/Home/HeroCarousel';
import AnimatedSection from '~/components/AnimatedSection/AnimatedSection';
import TestimonialsSection from '~/components/Home/TestimonialsSection';
import FilterSection from '~/components/Home/FilterSection';
import DiamondSelector from '~/components/Home/DiamondSelector';

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(request, { take: 20 });
  return {
    collections,
  };
}

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const headerImage = collections[0]?.featuredAsset?.preview;

  return (
    <>
      <HeroCarousel />
      <AnimatedSection delay={0.2}>
        <DiamondSelector />
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <FilterSection />
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <TestimonialsSection />
      </AnimatedSection>
    </>
  );
}
