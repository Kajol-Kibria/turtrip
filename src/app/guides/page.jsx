'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  MapPin,
  Star,
  MessageSquare,
  ChevronRight,
  User as UserIcon,
  Filter,
  BadgeCheck,
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_SPECIALISTS, MOCK_TRIPS } from '@/mockData';

export default function GuidesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const filteredGuides = MOCK_SPECIALISTS.filter((guide) => {
    const matchesSearch =
      guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.specialization.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = selectedLocation === 'All' || guide.location.includes(selectedLocation);
    return matchesSearch && matchesLocation;
  });

  const locations = [
    'All',
    ...new Set(MOCK_SPECIALISTS.map((g) => g.location.split(', ')[1] || g.location)),
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brand-warm/30 pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="font-serif text-3xl md:text-5xl mb-4 text-brand-earth">Professional Local Guides</h1>
          <p className="text-brand-earth/60 max-w-2xl mx-auto">
            Connecting you with vetted specialists who know their terrain better than anyone else.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-earth/20 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or specialty (e.g. Safari)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 md:py-4 bg-white rounded-2xl border border-brand-earth/5 shadow-sm outline-none focus:border-brand-teal transition-all text-sm md:text-base"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-brand-earth/40" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-white px-4 md:px-6 py-3.5 md:py-4 rounded-2xl border border-brand-earth/5 shadow-sm outline-none text-sm font-bold w-full md:w-auto"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => (
            <motion.div
              key={guide.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-3xl md:rounded-[48px] overflow-hidden group border border-brand-earth/5 hover:border-brand-teal/30 transition-all hover:shadow-2xl"
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="relative">
                    <img
                      src={guide.profilePhoto}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                      alt={guide.name}
                    />
                    {guide.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-brand-teal text-white p-1 rounded-full border-2 border-white shadow-sm">
                        <BadgeCheck className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-brand-saffron font-bold text-sm mb-1">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      {guide.rating}
                    </div>
                    <p className="text-[10px] text-brand-earth/40 font-bold uppercase tracking-widest">
                      {guide.completedTrips} Trips Led
                    </p>
                    <p className="text-[10px] text-brand-teal font-bold uppercase tracking-widest mt-1">
                      Avg response: {guide.responseTime}
                    </p>
                  </div>
                </div>

                <h3 className="font-serif text-2xl mb-2 group-hover:text-brand-teal transition-colors">
                  {guide.name}
                </h3>
                <div className="flex items-center text-xs text-brand-earth/60 mb-4">
                  <MapPin className="w-3 h-3 mr-1" /> {guide.location}
                </div>

                <p className="text-sm text-brand-earth/60 line-clamp-3 mb-6 h-[60px] leading-relaxed">
                  {guide.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {guide.specialization.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-brand-warm rounded-full text-[10px] font-bold text-brand-earth uppercase tracking-widest"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-brand-earth/5 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase font-bold text-brand-earth/30 tracking-widest">
                      Active Experiences
                    </p>
                    <div className="flex -space-x-2">
                      {guide.activeExperienceIds?.map((id) => {
                        const trip = MOCK_TRIPS.find((t) => t.id === id);
                        if (!trip) return null;
                        return (
                          <motion.div
                            whileHover={{ y: -5, zIndex: 10 }}
                            key={id}
                            className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm"
                            title={trip.title}
                          >
                            <img
                              src={trip.coverImage}
                              className="w-full h-full object-cover"
                              alt="exp"
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      href="/messages"
                      className="p-4 bg-brand-warm rounded-2xl text-brand-earth hover:bg-brand-earth hover:text-white transition-all shadow-inner"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/guide/profile/${guide.id}`}
                      className="btn-primary !px-4 md:!px-6 !py-2.5 md:!py-3 !text-[10px] md:!text-[11px] !rounded-2xl flex-1 text-center justify-center flex items-center"
                    >
                      View Profile <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-brand-warm rounded-full flex items-center justify-center mx-auto mb-6">
              <UserIcon className="w-10 h-10 text-brand-earth/20" />
            </div>
            <h3 className="font-serif text-2xl mb-2">No guides found</h3>
            <p className="text-brand-earth/40 text-sm">
              Try adjusting your search terms or location filter.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
