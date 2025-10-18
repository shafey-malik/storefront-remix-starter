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

const FilterSection = () => {
  const [caratRange, setCaratRange] = useState([1, 3]);
  const [priceRange, setPriceRange] = useState([5000, 50000]);
  const [filters, setFilters] = useState({
    cut: '',
    style: '',
    material: '',
    size: '',
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key: any, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      cut: '',
      style: '',
      material: '',
      size: '',
    });
    setCaratRange([1, 3]);
    setPriceRange([5000, 50000]);
  };

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
            {/* Diamond Cut Filter */}
            <div className="space-y-3">
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--primary))] block">
                Diamond Cut
              </label>
              <Select
                value={filters.cut}
                onValueChange={(value) => handleFilterChange('cut', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select cut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="round">Round Brilliant</SelectItem>
                  <SelectItem value="princess">Princess</SelectItem>
                  <SelectItem value="emerald">Emerald</SelectItem>
                  <SelectItem value="oval">Oval</SelectItem>
                  <SelectItem value="cushion">Cushion</SelectItem>
                  <SelectItem value="pear">Pear</SelectItem>
                  <SelectItem value="radiant">Radiant</SelectItem>
                  <SelectItem value="asscher">Asscher</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Design Style Filter */}
            <div className="space-y-3">
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--primary))] block">
                Design Style
              </label>
              <Select
                value={filters.style}
                onValueChange={(value) => handleFilterChange('style', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solitaire">Solitaire</SelectItem>
                  <SelectItem value="halo">Halo</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="pavé">Pavé</SelectItem>
                  <SelectItem value="three-stone">Three Stone</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ring Material Filter */}
            <div className="space-y-3">
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--primary))] block">
                Ring Material
              </label>
              <Select
                value={filters.material}
                onValueChange={(value) => handleFilterChange('material', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="platinum">Platinum</SelectItem>
                  <SelectItem value="white-gold">18K White Gold</SelectItem>
                  <SelectItem value="yellow-gold">18K Yellow Gold</SelectItem>
                  <SelectItem value="rose-gold">18K Rose Gold</SelectItem>
                  <SelectItem value="two-tone">Two-Tone</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ring Size Filter */}
            <div className="space-y-3">
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--primary))] block">
                Ring Size
              </label>
              <Select
                value={filters.size}
                onValueChange={(value) => handleFilterChange('size', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">Size 4</SelectItem>
                  <SelectItem value="4.5">Size 4.5</SelectItem>
                  <SelectItem value="5">Size 5</SelectItem>
                  <SelectItem value="5.5">Size 5.5</SelectItem>
                  <SelectItem value="6">Size 6</SelectItem>
                  <SelectItem value="6.5">Size 6.5</SelectItem>
                  <SelectItem value="7">Size 7</SelectItem>
                  <SelectItem value="7.5">Size 7.5</SelectItem>
                  <SelectItem value="8">Size 8</SelectItem>
                  <SelectItem value="8.5">Size 8.5</SelectItem>
                  <SelectItem value="9">Size 9</SelectItem>
                  <SelectItem value="custom">Custom Size</SelectItem>
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

          {/* Advanced Filters (Conditional) */}
          {showAdvanced && (
            <div className="mt-8 pt-8 border-t border-[hsl(var(--border))]">
              <h3 className="font-luxury-sans text-lg font-semibold text-[hsl(var(--primary))] mb-6">
                Advanced Filters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--primary))] block">
                    Diamond Color
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="d">D (Colorless)</SelectItem>
                      <SelectItem value="e">E</SelectItem>
                      <SelectItem value="f">F</SelectItem>
                      <SelectItem value="g">G (Near Colorless)</SelectItem>
                      <SelectItem value="h">H</SelectItem>
                      <SelectItem value="i">I</SelectItem>
                      <SelectItem value="j">J (Near Colorless)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--primary))] block">
                    Diamond Clarity
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select clarity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fl">FL (Flawless)</SelectItem>
                      <SelectItem value="if">
                        IF (Internally Flawless)
                      </SelectItem>
                      <SelectItem value="vvs1">
                        VVS1 (Very Very Slightly Included)
                      </SelectItem>
                      <SelectItem value="vvs2">VVS2</SelectItem>
                      <SelectItem value="vs1">
                        VS1 (Very Slightly Included)
                      </SelectItem>
                      <SelectItem value="vs2">VS2</SelectItem>
                      <SelectItem value="si1">
                        SI1 (Slightly Included)
                      </SelectItem>
                      <SelectItem value="si2">SI2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--primary))] block">
                    Certification
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select certification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gia">GIA</SelectItem>
                      <SelectItem value="ags">AGS</SelectItem>
                      <SelectItem value="igi">IGI</SelectItem>
                      <SelectItem value="hrd">HRD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-[hsl(var(--border))]">
            <Button className="btn-luxury flex-1">
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
