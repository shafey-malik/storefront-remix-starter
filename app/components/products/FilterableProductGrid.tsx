import FacetFilterControls from '~/components/facet-filter/FacetFilterControls';
import { ProductCard } from '~/components/products/ProductCard';
import {
  translatePaginationFrom,
  translatePaginationTo,
} from '~/utils/pagination';
import { Pagination } from '~/components/Pagination';
import { NoResultsHint } from '~/components/products/NoResultsHint';
import { useRef } from 'react';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import { filteredSearchLoaderFromPagination } from '~/utils/filtered-search-loader';
import { useTranslation } from 'react-i18next';
export function FilterableProductGrid({
  result,
  resultWithoutFacetValueFilters,
  facetValueIds,
  appliedPaginationPage,
  appliedPaginationLimit,
  allowedPaginationLimits,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  priceRange = { min: 0, max: 100000 }, // This will now come from loader
}: Awaited<
  ReturnType<
    ReturnType<
      typeof filteredSearchLoaderFromPagination
    >['filteredSearchLoader']
  >
> & {
  allowedPaginationLimits: Set<number>;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (arg0: boolean) => void;
}) {
  const { t } = useTranslation();
  const facetValuesTracker = useRef(new FacetFilterTracker());
  facetValuesTracker.current.update(
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
  );

  // Filter products by price range
  // Filter products by price range
  // Filter products by price range
  const filteredProducts = result.items.filter((product) => {
    const priceWithTax = product.priceWithTax as any;

    if (priceWithTax.value !== undefined) {
      // Single price: $50 → 5000 cents
      const priceInDollars = priceWithTax.value / 100;
      return (
        priceInDollars >= priceRange.min && priceInDollars <= priceRange.max
      );
    } else {
      // Price range: $50-$200 → min: 5000 cents, max: 20000 cents
      const minPriceInDollars = priceWithTax.min / 100;
      const maxPriceInDollars = priceWithTax.max / 100;

      // Show product if ANY price in its range matches our filter range
      // This means the price ranges overlap
      return (
        minPriceInDollars <= priceRange.max &&
        maxPriceInDollars >= priceRange.min
      );
    }
  });

  const isPriceFilterActive = priceRange.min > 0 || priceRange.max < 100000;

  return (
    <div className="mt-6 grid sm:grid-cols-5 gap-x-4">
      <FacetFilterControls
        facetFilterTracker={facetValuesTracker.current}
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      />
      {filteredProducts.length > 0 ? (
        <div className="sm:col-span-5 lg:col-span-4 space-y-6">
          {isPriceFilterActive && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                Showing {filteredProducts.length} products filtered by price: $
                {priceRange.min} - ${priceRange.max}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((item) => (
              <ProductCard key={item.productId} {...item} />
            ))}
          </div>

          <div className="flex flex-row justify-between items-center gap-4">
            <span className="self-start text-gray-500 text-sm mt-2">
              {t('product.showing')}{' '}
              {translatePaginationFrom(
                appliedPaginationPage,
                appliedPaginationLimit,
              )}{' '}
              {t('product.to')}{' '}
              {translatePaginationTo(
                appliedPaginationPage,
                appliedPaginationLimit,
                filteredProducts.length,
              )}
            </span>
            <Pagination
              appliedPaginationLimit={appliedPaginationLimit}
              allowedPaginationLimits={allowedPaginationLimits}
              totalItems={result.totalItems}
              appliedPaginationPage={appliedPaginationPage}
            />
          </div>
        </div>
      ) : (
        <NoResultsHint
          facetFilterTracker={facetValuesTracker.current}
          className={'sm:col-span-4 sm:p-4'}
        />
      )}
    </div>
  );
}
