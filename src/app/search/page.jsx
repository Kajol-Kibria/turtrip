'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Clock,
  Star,
  Heart,
  ArrowRight,
  Grid,
  List as ListIcon,
  Filter,
  Search,
  X,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MOCK_TRIPS, MOCK_SPECIALISTS } from '@/mockData';

export default function SearchResults() {
  const location = usePathname();
  const router = useRouter();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('q') || '';

  const [view, setView] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    experienceType: initialCategory,
    guideType: 'All',
    priceRange: [0, 5000000],
    activities: [],
    mode: 'All',
    keyword: initialSearch,
  });

  const experienceTypes = [
    'All',
    'Adventure',
    'Excursion',
    'Pilgrimage',
    'Research',
    'Educational',
    'Cultural',
    'Others',
  ];
  const activities = [
    'Hiking',
    'Safari',
    'Camping',
    'Swimming',
    'Beach',
    'Zoo Visit',
    'Diving',
    'Photography',
    'City Tour',
    'Nightlife',
    'Museum',
  ];
  const guideTypes = ['All', 'Individual', 'Agency'];
  const modes = ['All', 'Open Registration', 'On Demand Request'];

  const filteredTrips = useMemo(() => {
    return MOCK_TRIPS.filter((trip) => {
      const matchKeyword =
        activeFilters.keyword === '' ||
        trip.title.toLowerCase().includes(activeFilters.keyword.toLowerCase()) ||
        trip.location.city.toLowerCase().includes(activeFilters.keyword.toLowerCase());

      const matchType =
        activeFilters.experienceType === 'All' ||
        trip.experienceType === activeFilters.experienceType;
      const matchPrice =
        trip.price.local >= activeFilters.priceRange[0] &&
        trip.price.local <= activeFilters.priceRange[1];

      const guide = MOCK_SPECIALISTS.find((g) => g.specialization.includes(trip.experienceType));
      const matchGuide =
        activeFilters.guideType === 'All' || (guide && guide.type === activeFilters.guideType);

      // Since MOCK_TRIPS doesn't have activities field, we'll simulate or skip if empty
      // In real app, we'd check if trip.activities includes any count from activeFilters.activities
      const matchActivities = activeFilters.activities.length === 0 || true; // Simulation

      // Similarly for mode
      const matchMode = activeFilters.mode === 'All' || true; // Simulation

      return matchKeyword && matchType && matchPrice && matchGuide && matchActivities && matchMode;
    });
  }, [activeFilters]);

  const clearFilters = () => {
    setActiveFilters({
      experienceType: 'All',
      guideType: 'All',
      priceRange: [0, 5000000],
      activities: [],
      mode: 'All',
      keyword: '',
    });
  };

  return (
    <div className="min-h-screen bg-brand-warm/30 pt-5 md:pt-18 pb-12 md:pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h1 className="font-serif text-3xl md:text-5xl mb-3 md:mb-4 text-brand-earth leading-tight">
            Explore Adventures
          </h1>
          <p className="text-brand-earth/60 font-medium text-sm md:text-base">
            Found {filteredTrips.length} experiences matching your search.
          </p>
        </div>

        <div className="flex flex-row items-center justify-between gap-4 mb-8">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center space-x-2 px-4 py-2.5 bg-white border border-brand-earth/10 rounded-full text-brand-earth text-xs font-bold shadow-sm"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <div className="flex bg-white rounded-full p-1 border border-brand-earth/10 ml-auto">
            <button
              onClick={() => setView('grid')}
              className={`p-1.5 md:p-2 rounded-full transition-all ${view === 'grid' ? 'bg-brand-earth text-white' : 'text-brand-earth/30'}`}
            >
              <Grid className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1.5 md:p-2 rounded-full transition-all ${view === 'list' ? 'bg-brand-earth text-white' : 'text-brand-earth/30'}`}
            >
              <ListIcon className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 md:gap-12">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block space-y-10">
            <div className="glass-card rounded-[40px] p-8 space-y-10 border border-brand-earth/5">
              {/* Keyword Search */}
              <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 block ml-2">
                  Keyword Search
                </label>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-earth/40" />
                  <input
                    type="text"
                    placeholder="Search by title or city..."
                    value={activeFilters.keyword}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, keyword: e.target.value })
                    }
                    className="w-full pl-14 pr-6 py-4 bg-brand-warm/30 rounded-2xl border-none outline-none text-sm font-medium focus:ring-1 ring-brand-teal"
                  />
                </div>
              </div>

              {/* Experience Type */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl pl-2">Type</h3>
                <div className="grid grid-cols-1 gap-2">
                  {experienceTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveFilters({ ...activeFilters, experienceType: t })}
                      className={`flex items-center justify-between px-6 py-3 rounded-2xl text-xs font-bold transition-all ${activeFilters.experienceType === t ? 'bg-brand-earth text-white shadow-lg' : 'bg-white text-brand-earth/60 hover:bg-brand-warm/50 border border-brand-earth/5'}`}
                    >
                      {t}
                      {activeFilters.experienceType === t && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guide specialist */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl pl-2">Guide specialist</h3>
                <div className="flex bg-brand-warm/30 p-1 rounded-2xl">
                  {guideTypes.map((gt) => (
                    <button
                      key={gt}
                      onClick={() => setActiveFilters({ ...activeFilters, guideType: gt })}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeFilters.guideType === gt ? 'bg-white shadow-sm text-brand-teal' : 'text-brand-earth/40 hover:text-brand-earth'}`}
                    >
                      {gt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-4">
                <div className="flex justify-between items-end pl-2 pr-2">
                  <h3 className="font-serif text-xl">Budget</h3>
                  <span className="text-[10px] font-bold text-brand-teal">
                    Max: {activeFilters.priceRange[1].toLocaleString()} TSh
                  </span>
                </div>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="50000"
                    value={activeFilters.priceRange[1]}
                    onChange={(e) =>
                      setActiveFilters({
                        ...activeFilters,
                        priceRange: [0, parseInt(e.target.value)],
                      })
                    }
                    className="w-full accent-brand-teal"
                  />

                  <div className="flex justify-between mt-2 text-[8px] font-bold text-brand-earth/30 uppercase tracking-widest">
                    <span>Min: 0</span>
                    <span>Max: 10M</span>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl pl-2">Activities</h3>
                <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {activities.map((act) => (
                    <label
                      key={act}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-brand-warm/30 cursor-pointer group transition-all"
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${activeFilters.activities.includes(act) ? 'bg-brand-teal border-brand-teal' : 'bg-white border-brand-earth/10 group-hover:border-brand-teal/50'}`}
                      >
                        {activeFilters.activities.includes(act) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={activeFilters.activities.includes(act)}
                          onChange={(e) => {
                            const newActs = e.target.checked
                              ? [...activeFilters.activities, act]
                              : activeFilters.activities.filter((a) => a !== act);
                            setActiveFilters({ ...activeFilters, activities: newActs });
                          }}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold ${activeFilters.activities.includes(act) ? 'text-brand-earth' : 'text-brand-earth/60'}`}
                      >
                        {act}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl pl-2">Mode</h3>
                <div className="space-y-2">
                  {modes.map((m) => (
                    <label
                      key={m}
                      className={`flex items-center space-x-3 px-6 py-3 rounded-2xl cursor-pointer transition-all border ${activeFilters.mode === m ? 'bg-brand-warm/50 border-brand-teal text-brand-teal' : 'bg-white border-brand-earth/5 text-brand-earth/60'}`}
                    >
                      <input
                        type="radio"
                        name="mode"
                        className="accent-brand-teal"
                        checked={activeFilters.mode === m}
                        onChange={() => setActiveFilters({ ...activeFilters, mode: m })}
                      />

                      <span className="text-xs font-bold">{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="w-full py-4 text-[10px] font-bold uppercase tracking-widest text-brand-earth/40 hover:text-brand-coral transition-all"
              >
                Clear all filters
              </button>
            </div>
          </aside>

          {/* Results Main Content */}
          <main>
            <div
              className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'space-y-8'}
            >
              {filteredTrips.map((trip) => (
                <Link
                  key={trip.id}
                  href={`/trip/${trip.id}`}
                  className={`glass-card rounded-3xl md:rounded-[40px] overflow-hidden hover:shadow-2xl transition-all border border-brand-earth/5 group ${view === 'list' ? 'flex flex-col sm:flex-row' : ''}`}
                >
                  <div
                    className={`relative ${view === 'list' ? 'sm:w-1/3 min-w-[280px] h-[300px] sm:h-auto' : 'h-[300px]'}`}
                  >
                    <img
                      src={trip.coverImage}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                      alt={trip.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="absolute top-4 md:top-6 right-4 md:right-6 p-2 md:p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-brand-coral transition-all"
                    >
                      <Heart className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <div className="absolute bottom-6 left-6 flex space-x-2">
                      <span className="bg-brand-teal/80 backdrop-blur-md text-white text-[10px] font-bold uppercase py-1 px-3 rounded-full tracking-widest">
                        {trip.experienceType}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/reviews/${trip.id}`);
                        }}
                        className="flex items-center space-x-1 text-brand-saffron mb-3 hover:scale-105 transition-transform"
                      >
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-bold text-brand-earth">{trip.rating}</span>
                        <span className="text-sm text-brand-earth/40">({trip.reviewCount})</span>
                      </button>
                      <h3 className="font-serif text-xl md:text-2xl text-brand-earth group-hover:text-brand-teal transition-colors mb-2 leading-tight">
                        {trip.title}
                      </h3>
                      <div className="flex items-center text-brand-earth/60 text-xs md:text-sm font-medium space-x-4 mb-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-brand-teal" /> {trip.location.city}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-brand-teal" /> {trip.duration}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-brand-earth/5 mt-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-brand-earth/40 tracking-widest leading-none mb-1">
                          From
                        </span>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-xl md:text-2xl font-serif text-brand-earth italic">
                            TSh {trip.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-warm rounded-full flex items-center justify-center group-hover:bg-brand-earth group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {filteredTrips.length === 0 && (
                <div className="col-span-full py-20 text-center glass-card rounded-[40px] border-dashed border-brand-earth/20 border-2">
                  <div className="w-20 h-20 bg-brand-warm rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-brand-earth/20" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl mb-4 text-brand-earth">
                    No match found
                  </h3>
                  <p className="text-brand-earth/60 text-sm md:text-base max-w-sm mx-auto mb-10 leading-relaxed">
                    We couldn't find any adventures matching your current filters. Try adjusting
                    your preferences or searching for something else.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-brand-earth text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-brand-teal transition-all"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="absolute inset-0 bg-brand-earth/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-2xl md:text-3xl">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 rounded-full hover:bg-brand-warm"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-brand-earth" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-12 custom-scrollbar">
                {/* Re-use desktop filter sections here if needed, or similar structure */}
                {/* Keyword */}
                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-brand-earth/40">
                    Keyword Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-earth/40" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={activeFilters.keyword}
                      onChange={(e) =>
                        setActiveFilters({ ...activeFilters, keyword: e.target.value })
                      }
                      className="w-full pl-14 pr-6 py-4 bg-brand-warm/30 rounded-2xl border-none outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-4">
                  <h4 className="font-serif text-xl">Budget</h4>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="50000"
                    value={activeFilters.priceRange[1]}
                    onChange={(e) =>
                      setActiveFilters({
                        ...activeFilters,
                        priceRange: [0, parseInt(e.target.value)],
                      })
                    }
                    className="w-full accent-brand-teal"
                  />

                  <div className="text-[10px] font-bold text-brand-teal text-right">
                    Max: {activeFilters.priceRange[1].toLocaleString()} TSh
                  </div>
                </div>

                {/* Type */}
                <div className="space-y-4">
                  <h4 className="font-serif text-xl">Experience Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {experienceTypes.map((t) => (
                      <button
                        key={t}
                        onClick={() => setActiveFilters({ ...activeFilters, experienceType: t })}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${activeFilters.experienceType === t ? 'bg-brand-teal text-white border-brand-teal' : 'bg-white text-brand-earth/60 border-brand-earth/10'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-10 border-t border-brand-earth/10 flex gap-4">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-4 text-xs font-bold text-brand-earth/40"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-[2] py-4 bg-brand-earth text-white rounded-full font-bold shadow-lg"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
