import { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  Mail,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Card } from '~/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Slider } from '~/components/ui/slider';
import { Button } from '~/components/ui/button';

interface CustomProps {
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

interface SubmissionState {
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

export default function Custom({ facetValues }: CustomProps) {
  const [priceRange, setPriceRange] = useState([1000, 50000]);
  const [email, setEmail] = useState('');
  const [submission, setSubmission] = useState<SubmissionState>({
    isLoading: false,
    success: false,
    error: null,
  });
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

  const handleSubmitSelections = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setSubmission({
        isLoading: false,
        success: false,
        error: 'Please enter a valid email address',
      });
      return;
    }

    // Validate at least one facet is selected
    const hasSelection = Object.values(selectedFacets).some((v) => v);
    if (!hasSelection) {
      setSubmission({
        isLoading: false,
        success: false,
        error: 'Please select at least one option',
      });
      return;
    }

    setSubmission({ isLoading: true, success: false, error: null });

    try {
      // Map selected facet IDs to their names and values
      const facetDetails = Object.entries(selectedFacets)
        .filter(([_, valueId]) => valueId)
        .map(([facetType, valueId]) => {
          const facetGroup = facetGroups[facetType] || [];
          const selectedValue = facetGroup.find((f) => f.id === valueId);
          return {
            facetName: facetType.charAt(0).toUpperCase() + facetType.slice(1),
            selectedValue: selectedValue?.name || 'Unknown',
          };
        });

      const response = await fetch('/api/facet-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          selectedFacets,
          facetDetails,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send selections');
      }

      setSubmission({
        isLoading: false,
        success: true,
        error: null,
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail('');
        setSubmission({
          isLoading: false,
          success: false,
          error: null,
        });
      }, 3000);
    } catch (error) {
      setSubmission({
        isLoading: false,
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to send selections. Please try again.',
      });
    }
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
          <h2 className="font-luxury-serif text-4xl lg:text-5xl font-bold text-[hsl(var(--foreground))]">
            Make Your Perfect Ring
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] font-luxury-sans text-lg max-w-2xl mx-auto">
            Customize your ring by selecting the perfect combination of
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
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--foreground))] block">
                Diamond Shape
              </label>
              <Select
                value={selectedFacets.shape}
                onValueChange={(value) => handleFilterChange('shape', value)}
              >
                <SelectTrigger className="w-full bg-[hsl(var(--card))]">
                  <SelectValue placeholder="Select shape" />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(var(--card))]">
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
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--foreground))] block">
                Setting Style
              </label>
              <Select
                value={selectedFacets.setting}
                onValueChange={(value) => handleFilterChange('setting', value)}
              >
                <SelectTrigger className="w-full bg-[hsl(var(--card))]">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(var(--card))]">
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
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--foreground))] block">
                Ring Material
              </label>
              <Select
                value={selectedFacets.metal}
                onValueChange={(value) => handleFilterChange('metal', value)}
              >
                <SelectTrigger className="w-full bg-[hsl(var(--card))]">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(var(--card))]">
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
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--foreground))] block">
                Ring Size
              </label>
              <Select
                value={selectedFacets.size}
                onValueChange={(value) => handleFilterChange('size', value)}
              >
                <SelectTrigger className="w-full bg-[hsl(var(--card))]">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(var(--card))]">
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
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--foreground))] block">
                Carat
              </label>
              <Select
                value={selectedFacets.carat}
                onValueChange={(value) => handleFilterChange('carat', value)}
              >
                <SelectTrigger className="w-full bg-[hsl(var(--card))]">
                  <SelectValue placeholder="Select Carat" />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(var(--card))]">
                  {caratFacets.map((facet) => (
                    <SelectItem key={facet.id} value={facet.id}>
                      {facet.name} ({facet.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Email Input Section */}
          <div className="mt-8 pt-8 border-t border-[hsl(var(--border))]">
            <div className="max-w-2xl mx-auto space-y-4">
              <label className="font-luxury-sans text-sm font-semibold text-[hsl(var(--foreground))]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submission.isLoading}
                className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                We'll send your ring customization selections to this email
              </p>
            </div>
          </div>

          {/* Success Message */}
          {submission.success && (
            <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">Success!</p>
                <p className="text-sm text-green-800">
                  Your ring selections have been sent to {email}
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submission.error && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Error</p>
                <p className="text-sm text-red-800">{submission.error}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-[hsl(var(--border))]">
            <Button
              className="btn-luxury hover:text-[hsl(var(--primary))] flex-1"
              onClick={handleSubmitSelections}
              disabled={submission.isLoading}
            >
              <Mail className="w-5 h-5 mr-2" />
              {submission.isLoading ? 'Sending...' : 'Send My Selection'}
            </Button>
            <Button
              className="btn-luxury hover:text-[hsl(var(--primary))] flex-1"
              onClick={navigateToSearch}
              disabled={submission.isLoading}
            >
              <Search className="w-5 h-5 mr-2" />
              Search Rings
            </Button>
            <Button
              variant="ghost"
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
              onClick={resetFilters}
              disabled={submission.isLoading}
            >
              <X className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
