'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search as SearchIcon,
  MapPin,
  Calendar,
  Star,
  Users,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_TRIPS } from '@/mockData';

export default function Search() {
  const [query, setQuery] = useState('');

  const filteredTrips = useMemo(() => {
    return MOCK_TRIPS.filter((trip) => {
      const matchQuery =
        trip.title.toLowerCase().includes(query.toLowerCase()) ||
        trip.location.city.toLowerCase().includes(query.toLowerCase());
      return matchQuery;
    });
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-brand-warm/30 pt-32 pb-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[40px] p-8 shadow-2xl border border-brand-earth/5 mb-12">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-1 w-full relative">
              <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-earth/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Where to? (e.g. Serengeti, Zanzibar...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-6 bg-brand-warm rounded-full border-none outline-none text-brand-earth font-medium placeholder:text-brand-earth/30 shadow-inner"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTrips.map((trip) => (
              <motion.div
                key={trip.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative"
              >
                <Link
                  href={`/trip/${trip.id}`}
                  className="block glass-card rounded-[48px] overflow-hidden hover:shadow-2xl transition-all duration-500 border border-brand-earth/5 h-full"
                >
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={trip.coverImage}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                      alt={trip.title}
                    />
                    <div className="absolute top-6 left-6 flex space-x-2">
                      <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-brand-earth shadow-sm">
                        {trip.experienceType}
                      </span>
                      {trip.isSponsored && (
                        <span className="bg-brand-saffron px-3 py-1.5 rounded-full text-[10px] font-bold text-white shadow-sm flex items-center">
                          <Sparkles className="w-3 h-3 mr-1" /> Sponsored
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-brand-earth/40 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20">
                        <p className="text-white text-xs font-bold flex items-center">
                          <MapPin className="w-3 h-3 mr-1" /> {trip.location.city}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-serif text-xl md:text-2xl group-hover:text-brand-teal transition-colors">
                        {trip.title}
                      </h3>
                      <div className="flex items-center text-brand-saffron font-bold text-xs">
                        <Star className="w-4 h-4 fill-current mr-1" /> {trip.rating}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-8 text-brand-earth/40">
                      <div className="flex items-center text-[10px] font-bold uppercase tracking-widest">
                        <Calendar className="w-3 h-3 mr-1" /> {trip.duration}
                      </div>
                      <div className="w-[4px] h-[4px] rounded-full bg-brand-earth/10" />
                      <div className="flex items-center text-[10px] font-bold uppercase tracking-widest">
                        <Users className="w-3 h-3 mr-1" /> {trip.groupType}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-brand-earth/5">
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-brand-earth/40">
                          Price from
                        </p>
                        <h4 className="text-xl md:text-2xl font-serif text-brand-earth">
                          ${trip.price.usd.toLocaleString()}
                        </h4>
                      </div>
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-warm rounded-full flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTrips.length === 0 && (
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-brand-warm rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-10 h-10 text-brand-earth/20" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl mb-2 text-brand-earth">
              No experiences found
            </h3>
            <p className="text-brand-earth/60 text-sm md:text-base">
              Try searching for something else.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
