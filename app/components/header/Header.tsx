import { Link, useLoaderData } from '@remix-run/react';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { useRootLoader } from '~/utils/use-root-loader';
import { useScrollingUp } from '~/utils/use-scrolling-up';
import { classNames } from '~/utils/class-names';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Header({
  onCartIconClick,
  cartQuantity,
}: {
  onCartIconClick: () => void;
  cartQuantity: number;
}) {
  const data = useRootLoader();
  const isSignedIn = !!data.activeCustomer.activeCustomer?.id;
  const isScrollingUp = useScrollingUp();
  const { t } = useTranslation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setShowSearch(false);
    setSearchQuery('');
  };

  // Diamond shop specific categories
  const engagementCategories = {
    'By Shape': ['Round', 'Princess', 'Emerald', 'Oval', 'Cushion', 'Pear'],
    'By Setting': ['Solitaire', 'Halo', 'Three Stone', 'Vintage', 'Modern'],
    'By Metal': ['Platinum', 'White Gold', 'Yellow Gold', 'Rose Gold'],
  };

  const weddingCategories = {
    "Women's": [
      'Classic Bands',
      'Diamond Bands',
      'Eternity Rings',
      'Curved Bands',
    ],
    "Men's": [
      'Classic Bands',
      'Diamond Bands',
      'Modern Bands',
      'Textured Bands',
    ],
    Sets: ['Matching Sets', 'Bridal Sets', 'Custom Sets'],
  };

  return (
    <header className="w-full bg-[hsl(var(--card))] shadow-[var(--shadow-card)] sticky top-0 z-50">
      {/* Main Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Header main row */}
          <div className="relative flex items-center justify-between">
            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center space-x-1">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-[hsl(var(--secondary))]" />
              </button>

              {/* Logo — centered on desktop, inline on mobile */}
              {/* Logo — centered on desktop, inline on mobile */}
              <Link
                to="/"
                className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3"
              >
                <h1 className="text-nowrap font-luxury-serif text-3xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Ever & Always
                </h1>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop Search (keep existing logic) */}
              <div className="hidden lg:flex items-center space-x-2">
                {showSearch ? (
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="text"
                      placeholder="Search diamonds, collections..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-3 py-2 border border-[hsl(var(--secondary))] rounded-lg  focus:[hsl(var(--secondary))] focus:border-transparent w-64"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Search className="w-5 h-5 text-[hsl(var(--secondary))]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSearch(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-700" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setShowSearch(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Search className="w-5 h-5 text-[hsl(var(--secondary))]" />
                  </button>
                )}
              </div>

              {/* Profile */}
              <Link
                to={isSignedIn ? '/account' : '/sign-in'}
                className=" hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="w-5 h-5 text-[hsl(var(--secondary))]" />
              </Link>

              {/* Cart */}
              <button
                onClick={onCartIconClick}
                className=" hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5 text-[hsl(var(--secondary))]" />
                {cartQuantity > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                    {cartQuantity}
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Field - Shown below title in mobile mode */}
          <div className="md:hidden  mt-1">
            <form
              onSubmit={handleSearch}
              className="relative flex items-center"
            >
              <Input
                type="text"
                placeholder="Search our collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full pl-4 pr-12 py-2 font-luxury-sans text-sm 
                border border-[hsl(var(--primary/50%))] rounded-lg
                focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary)/50%)]
                focus-visible:ring-offset-2 focus-visible:border-transparent
                bg-[hsl(var(--card))] shadow-sm"
              />
              <Button
                variant="ghost"
                size="lg"
                type="submit"
                className="absolute right-1 h-7 w-7 p-0 rounded-full
            hover:bg-[hsl(var(--primary)/8%)] 
            focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary)/30%)]"
              >
                <Search className="w-[15px] h-[15px] text-[hsl(var(--secondary))]" />
                {/* Changed from text-primary to text-secondary */}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Secondary Header - Navigation */}
      <div className="hidden md:block border-t border-[hsl(var(--border))] bg-[hsl(var(--surface-luxury))]">
        {' '}
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-center space-x-8">
            {/* Engagement Rings Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('engagement')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center rounded-md bg-[hsl(var(--card))] hover:rounded-b-none space-x-4 px-2 py-1.5 text-gray-700 hover:text-gray-900 font-medium transition-colors">
                <span>Engagement Rings</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>

              {activeDropdown === 'engagement' && (
                <div className="absolute top-full left-0 w-96 bg-[hsl(var(--card))] shadow-2xl border border-gray-200 rounded-lg z-50 rounded-tl-none">
                  <div className="p-6 grid grid-cols-2 gap-6">
                    {Object.entries(engagementCategories).map(
                      ([category, items]) => (
                        <div key={category}>
                          <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                            {category}
                          </h3>
                          <div className="space-y-2">
                            {items.map((item) => (
                              <Link
                                key={item}
                                to={`/collections/engagement-${item
                                  .toLowerCase()
                                  .replace(' ', '-')}`}
                                className="block text-sm text-gray-600 hover:text-gray-900 py-1 transition-colors"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Wedding Rings Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('wedding')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center rounded-md bg-[hsl(var(--card))] hover:rounded-b-none space-x-4 px-2 py-1.5 text-gray-700 hover:text-gray-900 font-medium transition-colors">
                <span>Wedding Rings</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>

              {activeDropdown === 'wedding' && (
                <div className="absolute top-full left-0 w-96 bg-[hsl(var(--card))] shadow-2xl border border-gray-200 rounded-lg z-50 rounded-tl-none">
                  <div className="p-6 grid grid-cols-2 gap-6">
                    {Object.entries(weddingCategories).map(
                      ([category, items]) => (
                        <div key={category}>
                          <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                            {category}
                          </h3>
                          <div className="space-y-2">
                            {items.map((item) => (
                              <Link
                                key={item}
                                to={`/collections/wedding-${item
                                  .toLowerCase()
                                  .replace(' ', '-')}`}
                                className="block text-sm text-gray-600 hover:text-gray-900 py-1 transition-colors"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Collections */}
            {/* {data.collections.map((collection) => (
              <Link
                key={collection.id}
                to={'/collections/' + collection.slug}
                prefetch="intent"
                className="py-4 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                {collection.name}
              </Link>
            ))} */}

            {/* Custom Jewelry */}
            <Link
              to="/custom"
              className="py-4 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Custom Jewelry
            </Link>

            {/* About */}
            <Link
              to="/about"
              className="py-4 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              About Us
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  className="flex items-center "
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">E&A</span>
                  </div> */}
                  <h1 className="font-luxury-serif text-2xl font-bold text-gray-900 leading-tight">
                    Ever & Always
                  </h1>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className=" hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </form>

              <nav className="space-y-1">
                <div className="font-semibold text-gray-900 px-4 py-2 text-sm uppercase tracking-wide">
                  Shop Categories
                </div>

                {/* Engagement Rings Mobile */}
                <div className="border rounded-lg">
                  <div className="px-4 py-3 font-medium text-gray-900">
                    Engagement Rings
                  </div>
                  <div className="px-4 pb-3 space-y-2">
                    <div className="text-sm text-gray-600 font-medium">
                      By Shape
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {engagementCategories['By Shape']
                        .slice(0, 4)
                        .map((shape) => (
                          <Link
                            key={shape}
                            to={`/collections/engagement-${shape
                              .toLowerCase()
                              .replace(' ', '-')}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm text-gray-600 hover:text-gray-900 py-1"
                          >
                            {shape}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Wedding Rings Mobile */}
                <div className="border rounded-lg">
                  <div className="px-4 py-3 font-medium text-gray-900">
                    Wedding Rings
                  </div>
                  <div className="px-4 pb-3 space-y-2">
                    <div className="text-sm text-gray-600 font-medium">
                      Women's
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {weddingCategories["Women's"].slice(0, 4).map((item) => (
                        <Link
                          key={item}
                          to={`/collections/wedding-${item
                            .toLowerCase()
                            .replace(' ', '-')}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-sm text-gray-600 hover:text-gray-900 py-1"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Other Collections */}
                {data.collections.map((collection) => (
                  <Link
                    key={collection.id}
                    to={'/collections/' + collection.slug}
                    prefetch="intent"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                  >
                    {collection.name}
                  </Link>
                ))}

                <Link
                  to="/custom"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Custom Jewelry
                </Link>

                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  About Us
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
