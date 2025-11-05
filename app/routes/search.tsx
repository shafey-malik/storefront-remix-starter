import { useLoaderData, useSubmit } from '@remix-run/react';
import { useRef, useState } from 'react';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import { filteredSearchLoaderFromPagination } from '~/utils/filtered-search-loader';
import { FiltersButton } from '~/components/FiltersButton';
import { ValidatedForm } from 'remix-validated-form';
import { withZod } from '@remix-validated-form/with-zod';
import { paginationValidationSchema } from '~/utils/pagination';
import { FilterableProductGrid } from '~/components/products/FilterableProductGrid';
import { useTranslation } from 'react-i18next';
import { Slider } from '~/components/ui/slider';
import { Button } from '~/components/ui/button';

const paginationLimitMinimumDefault = 25;
const allowedPaginationLimits = new Set<number>([
  paginationLimitMinimumDefault,
  50,
  100,
]);
const validator = withZod(paginationValidationSchema(allowedPaginationLimits));

export const { filteredSearchLoader: loader } =
  filteredSearchLoaderFromPagination(
    allowedPaginationLimits,
    paginationLimitMinimumDefault,
  );
export default function Search() {
  const loaderData = useLoaderData<Awaited<typeof loader>>();
  const {
    result,
    resultWithoutFacetValueFilters,
    term,
    facetValueIds,
    priceRange,
  } = loaderData;
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState([
    priceRange.min / 100,
    priceRange.max / 100,
  ]); // Convert cents to dollars
  const facetValuesTracker = useRef(new FacetFilterTracker());
  facetValuesTracker.current.update(
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
  );
  const submit = useSubmit();
  const { t } = useTranslation();

  const handlePriceChange = (values: number[]) => {
    setLocalPriceRange(values);
  };

  // const applyPriceFilter = () => {
  //   const formData = new FormData();

  //   // Add existing facet filters
  //   facetValueIds.forEach(id => formData.append('fvid', id));

  //   // Add price range (convert dollars to cents)
  //   formData.append('minPrice', (localPriceRange[0] ).toString());
  //   formData.append('maxPrice', (localPriceRange[1] ).toString());

  //   // Add existing pagination
  //   formData.append('limit', loaderData.appliedPaginationLimit.toString());
  //   formData.append('page', '1'); // Reset to page 1 when applying new filters

  //   submit(formData, { preventScrollReset: true });
  // };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {term
            ? `${t('common.resultsFor')} "${term}"`
            : t('common.allResults')}
        </h2>

        <FiltersButton
          filterCount={facetValueIds.length}
          onClick={() => setMobileFiltersOpen(true)}
        />
      </div>

      {/* Price Range Slider */}

      <ValidatedForm
        validator={validator}
        method="get"
        onChange={(e) => submit(e.currentTarget, { preventScrollReset: true })}
      >
        <FilterableProductGrid
          allowedPaginationLimits={allowedPaginationLimits}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          {...loaderData}
        />
        {/* price filter */}
        {/* <div className="mb-6 p-6 bg-white border border-gray-200 rounded-lg">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-luxury-sans text-sm font-semibold text-gray-900">
                Price Range
              </label>
              <span className="font-luxury-sans text-sm text-gray-600">
                ${localPriceRange[0].toLocaleString()} - ${localPriceRange[1].toLocaleString()}
              </span>
            </div>
            <Slider
              value={localPriceRange}
              onValueChange={handlePriceChange}
       max={100000}
                  min={0}
                  step={100}
                  className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 font-luxury-sans">
              <span>$0</span>
              <span>$100,000+</span>
            </div>
            <Button 
              onClick={applyPriceFilter}
              className="w-full mt-2"
            >
              Apply Price Filter
            </Button>
          </div>
        </div>
      </div> */}
      </ValidatedForm>
    </div>
  );
}
