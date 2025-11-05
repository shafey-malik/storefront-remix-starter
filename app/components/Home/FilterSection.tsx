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
  const [caratRange, setCaratRange] = useState([1, 3]);
  const [priceRange, setPriceRange] = useState([5000, 50000]);
  const [selectedFacets, setSelectedFacets] = useState<Record<string, string>>({
    shape: '',
    setting: '',
    metal: '',
    size: '',
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

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
    });
    setCaratRange([1, 3]);
    setPriceRange([5000, 50000]);
  };

  const navigateToSearch = () => {
    const params = new URLSearchParams();

    // Add selected facet values
    Object.values(selectedFacets).forEach((facetValueId) => {
      if (facetValueId) {
        params.append('fvid', facetValueId);
      }
    });

    // Navigate to search page with filters
    window.location.href = `/search?${params.toString()}`;
  };

  // Get available facet values
  const shapeFacets = facetGroups['shape'] || [];
  const settingFacets = facetGroups['setting'] || [];
  const metalFacets = facetGroups['metal'] || [];
  const sizeFacets = facetGroups['size'] || [];

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

        <Card className="card-luxury p-8 max-w-6xl mx-auto">
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
          </div>

          {/* Range Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-[hsl(var(--border))]">
            {/* Carat Weight Range */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--primary))]">
                  Carat Weight
                </label>
                <span className="font-luxury-sans text-sm text-[hsl(var(--muted-foreground))]">
                  {caratRange[0]} - {caratRange[1]} ct
                </span>
              </div>
              <Slider
                value={caratRange}
                onValueChange={setCaratRange}
                max={5}
                min={0.5}
                step={0.1}
                className="w-full relative"
              />
              <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] font-luxury-sans">
                <span>0.5 ct</span>
                <span>5.0 ct</span>
              </div>
            </div>

            {/* Price Range */}
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
                min={1000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] font-luxury-sans">
                <span>$1,000</span>
                <span>$100,000+</span>
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
              variant="outline"
              className="px-8 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              {showAdvanced ? 'Hide Advanced' : 'Advanced Filters'}
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
