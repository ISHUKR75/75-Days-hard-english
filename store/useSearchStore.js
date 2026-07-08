/**
 * Search Store - Global search state for topics, vocabulary, and lessons
 * Uses Zustand (session state, no persistence needed)
 */

import { create } from 'zustand';

const useSearchStore = create((set, get) => ({
  // ─── Search State ─────────────────────────────────────────────
  /** Current search query string */
  query: '',
  /** Search results array */
  results: [],
  /** Whether a search request is in progress */
  isLoading: false,
  /** Any error that occurred during search */
  error: null,
  /** Whether the search panel/modal is open */
  isOpen: false,

  // ─── Filters ─────────────────────────────────────────────────
  filters: {
    /** Filter by content type: 'all' | 'topic' | 'lesson' | 'word' | 'quiz' */
    type: 'all',
    /** Filter by CEFR level: null or 'A0'|'A1'|'A2'|'B1'|'B2'|'C1'|'C2' */
    cefrLevel: null,
    /** Filter by difficulty: null or difficulty id */
    difficulty: null,
    /** Filter by topic type: null or topic type id */
    topicType: null,
  },

  /** Recent search queries (last 10) */
  recentSearches: [],
  /** Search suggestions shown before typing */
  suggestions: [],

  // ─── Actions ──────────────────────────────────────────────────

  /** Set the query string */
  setQuery: (query) => set({ query }),

  /** Set search results */
  setResults: (results) => set({ results, isLoading: false, error: null }),

  /** Set loading state */
  setLoading: (isLoading) => set({ isLoading }),

  /** Set error state */
  setError: (error) => set({ error, isLoading: false }),

  /** Open the search panel */
  openSearch: () => set({ isOpen: true }),

  /** Close the search panel and optionally clear query */
  closeSearch: (clearQuery = false) =>
    set({ isOpen: false, ...(clearQuery ? { query: '', results: [] } : {}) }),

  /** Toggle search panel visibility */
  toggleSearch: () => set((state) => ({ isOpen: !state.isOpen })),

  /** Update a single filter */
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  /** Reset all filters to defaults */
  resetFilters: () =>
    set({
      filters: { type: 'all', cefrLevel: null, difficulty: null, topicType: null },
    }),

  /** Add a query to recent searches (max 10) */
  addRecentSearch: (query) => {
    if (!query || query.trim().length < 2) return;
    set((state) => {
      const cleaned = query.trim();
      const existing = state.recentSearches.filter((q) => q !== cleaned);
      return { recentSearches: [cleaned, ...existing].slice(0, 10) };
    });
  },

  /** Remove a query from recent searches */
  removeRecentSearch: (query) =>
    set((state) => ({
      recentSearches: state.recentSearches.filter((q) => q !== query),
    })),

  /** Clear all recent searches */
  clearRecentSearches: () => set({ recentSearches: [] }),

  /** Set autocomplete suggestions */
  setSuggestions: (suggestions) => set({ suggestions }),

  /** Clear current search completely */
  clearSearch: () =>
    set({
      query: '',
      results: [],
      isLoading: false,
      error: null,
      suggestions: [],
    }),

  /** Get filtered results based on active filters */
  getFilteredResults: () => {
    const { results, filters } = get();
    return results.filter((r) => {
      if (filters.type !== 'all' && r.type !== filters.type) return false;
      if (filters.cefrLevel && r.cefrLevel !== filters.cefrLevel) return false;
      if (filters.difficulty && r.difficulty !== filters.difficulty) return false;
      if (filters.topicType && r.topicType !== filters.topicType) return false;
      return true;
    });
  },
}));

export default useSearchStore;
