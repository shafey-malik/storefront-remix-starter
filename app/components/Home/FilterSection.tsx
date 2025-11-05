import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Card } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';

interface FilterSectionProps {
  facetValues: Array<{
    count: number;
    facetValue: {
      id: string;
      name: string;
      facet: {
        id: string;
        name: string;
      };
    };
  }>;
}

const FilterSection = ({ facetValues }: FilterSectionProps) => {
  const [priceRange, setPriceRange] = useState([1000, 50000]);
  const [selectedFacets, setSelectedFacets] = useState<Record<string, string>>({
    shape: '',
    setting: '',
    metal: '',
    size: '',
  });

  // Group facets by type
  const facetGroups =
    facetValues?.reduce((groups, { facetValue, count }) => {
      const facetName = facetValue.facet.name.toLowerCase();
      if (!groups[facetName]) groups[facetName] = [];
      groups[facetName].push({ ...facetValue, count });
      return groups;
    }, {} as Record<string, any[]>) || {};

  const handleFilterChange = (facetType: string, facetValueId: string) => {
    setSelectedFacets((prev) => ({
      ...prev,
      [facetType]: facetValueId === prev[facetType] ? '' : facetValueId,
    }));
  };

  const resetFilters = () => {
    setSelectedFacets({
      shape: '',
      setting: '',
      metal: '',
      size: '',
      carat: '',
    });
    setPriceRange([1000, 50000]);
  };

  const navigateToSearch = () => {
    const params = new URLSearchParams();

    // Add selected facet values
    Object.values(selectedFacets).forEach((facetValueId) => {
      if (facetValueId) {
        params.append('fvid', facetValueId);
      }
    });

    // Convert dollar prices to cents for Vendure
    params.append('minPrice', priceRange[0].toString());
    params.append('maxPrice', priceRange[1].toString());

    window.location.href = `/search?${params.toString()}`;
  };

  // Get available facet values
  const shapeFacets = facetGroups['shape'] || [];
  const settingFacets = facetGroups['setting'] || [];
  const metalFacets = facetGroups['metal'] || [];
  const sizeFacets = facetGroups['size'] || [];
  const caratFacets = facetGroups['carat'] || [];

  return (
    <section className="py-20 bg-[hsl(var(--background))]">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-luxury-serif text-4xl lg:text-5xl font-bold text-[hsl(var(--primary))]">
            Find Your Perfect Ring
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] font-luxury-sans text-lg max-w-2xl mx-auto">
            Use our advanced filters to discover the diamond ring that matches
            your vision and budget.
          </p>
        </div>

        <Card
          className="card-luxury p-8 max-w-6xl mx-auto min-h-[600px]"
          style={{
            marginTop: '-10px' /* This causes jumping */,
            padding: '2rem' /* This causes jumping */,
            transform: 'translateY(-5px)' /* This might be intentional */,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Shape Filter - Dynamic */}
            <div className="space-y-3">
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--primary))] block">
                Diamond Shape
              </label>
              <Select
                value={selectedFacets.shape}
                onValueChange={(value) => handleFilterChange('shape', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select shape" />
                </SelectTrigger>
                <SelectContent>
                  {shapeFacets.map((facet) => (
                    <SelectItem key={facet.id} value={facet.id}>
                      {facet.name} ({facet.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Setting Filter - Dynamic */}
            <div className="space-y-3">
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--primary))] block">
                Setting Style
              </label>
              <Select
                value={selectedFacets.setting}
                onValueChange={(value) => handleFilterChange('setting', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {settingFacets.map((facet) => (
                    <SelectItem key={facet.id} value={facet.id}>
                      {facet.name} ({facet.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Metal Filter - Dynamic */}
            <div className="space-y-3">
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--primary))] block">
                Ring Material
              </label>
              <Select
                value={selectedFacets.metal}
                onValueChange={(value) => handleFilterChange('metal', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  {metalFacets.map((facet) => (
                    <SelectItem key={facet.id} value={facet.id}>
                      {facet.name} ({facet.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Size Filter - Dynamic */}
            <div className="space-y-3">
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--primary))] block">
                Ring Size
              </label>
              <Select
                value={selectedFacets.size}
                onValueChange={(value) => handleFilterChange('size', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {sizeFacets.map((facet) => (
                    <SelectItem key={facet.id} value={facet.id}>
                      {facet.name} ({facet.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Carat Filter - Dynamic */}
            <div className="space-y-3">
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--primary))] block">
                Carat
              </label>
              <Select
                value={selectedFacets.carat}
                onValueChange={(value) => handleFilterChange('carat', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Carat" />
                </SelectTrigger>
                <SelectContent>
                  {caratFacets.map((facet) => (
                    <SelectItem key={facet.id} value={facet.id}>
                      {facet.name} ({facet.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price Range Slider Only */}
          <div className="mt-8 pt-8 border-t border-[hsl(var(--border))]">
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--primary))]">
                    Price Range
                  </label>
                  <span className="font-luxury-sans text-sm text-[hsl(var(--muted-foreground))]">
                    ${priceRange[0].toLocaleString()} - $
                    {priceRange[1].toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] font-luxury-sans">
                  <span>$0</span>
                  <span>$100,000+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-[hsl(var(--border))]">
            <Button className="btn-luxury flex-1" onClick={navigateToSearch}>
              <Search className="w-5 h-5 mr-2" />
              Search Rings
            </Button>
            <Button
              variant="ghost"
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
              onClick={resetFilters}
            >
              <X className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FilterSection;
