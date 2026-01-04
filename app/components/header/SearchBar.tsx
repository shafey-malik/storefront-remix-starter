import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar() {
  const { t } = useTranslation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Get initial query from URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URL(window.location.href).searchParams.get('q') ?? '';
      setSearchQuery(query);
    }
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    // Form submission is handled by Remix
    // You can add any additional logic here if needed
  };

  if (!showSearch) {
    return (
      <button
        onClick={() => setShowSearch(true)}
        className="p-2 hover:bg-[hsl(var(--platinum-dark))] rounded-lg transition-colors"
        aria-label={t('common.search')}
      >
        <Search className="w-5 h-5 text-[hsl(var(--lead-text))]" />
      </button>
    );
  }

  return (
    <Form
      method="get"
      action="/search"
      onSubmit={handleSearchSubmit}
      className="flex items-center space-x-1"
    >
      <input
        ref={searchInputRef}
        type="text"
        name="q"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t('common.search')}
        className="px-3 bg-[hsl(var(--card))] h-9 border border-[hsl(var(--secondary))] rounded-lg focus:outline-none focus:border-2 focus:border-[hsl(var(--secondary))] w-64"
        autoFocus
      />
      <button
        type="submit"
        className="p-2 hover:bg-[hsl(var(--platinum-dark))] rounded-lg transition-colors"
        aria-label={t('common.search')}
      >
        <Search className="w-5 h-5 text-[hsl(var(--secondary))]" />
      </button>
      <button
        type="button"
        onClick={() => setShowSearch(false)}
        className="p-2 hover:bg-[hsl(var(--platinum-dark))] rounded-lg transition-colors"
        aria-label={t('common.close')}
      >
        <X className="w-5 h-5 text-[hsl(var(--foreground))] " />
      </button>
    </Form>
  );
}
