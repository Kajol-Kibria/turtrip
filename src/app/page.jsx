'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  MapPin,
  Compass,
  Users,
  Calendar,
  ShieldCheck,
  CreditCard,
  HeartPulse,
  Video,
  Star,
  Clock,
  X,
  ChevronRight,
  BadgeCheck,
} from 'lucide-react';
import { MOCK_TRIPS, MOCK_SPECIALISTS } from '@/mockData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpType, setSelectedExpType] = useState('Experience Type');
  const [isSearching, setIsSearching] = useState(false);
  const [expandedTrip, setExpandedTrip] = useState(null);
  const [expandedSpecialist, setExpandedSpecialist] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [guestCount, setGuestCount] = useState(1);

  const sponsoredTrips = useMemo(() => MOCK_TRIPS.filter((t) => t.isSponsored), []);
  const otherTrips = useMemo(() => MOCK_TRIPS.filter((t) => !t.isSponsored), []);

  const totalCost = useMemo(() => {
    if (!expandedTrip) return 0;
    let total = expandedTrip.price.local * guestCount;
    const conversion = expandedTrip.price.local / expandedTrip.price.usd;

    if (selectedRide) {
      const unitsNeeded = Math.ceil(guestCount / selectedRide.capacity);
      total += selectedRide.price * unitsNeeded * conversion;
    }
    if (selectedHotel) {
      const roomsNeeded = Math.ceil(guestCount / selectedHotel.maxGuests);
      total += selectedHotel.pricePerNight * roomsNeeded * conversion;
    }
    return total;
  }, [expandedTrip, selectedRide, selectedHotel, guestCount]);

  const handleSearch = () => {
    router.push(
      `/search?q=${searchQuery}${selectedExpType !== 'Experience Type' ? `&type=${selectedExpType}` : ''}`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/safari/1920/1080"
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
            alt="Hero Background"
          />
        </div>

        <div className="relative z-10 w-full max-w-4xl px-6 text-center text-white">
          <h1 className="font-serif text-3xl md:text-5xl lg:text-7xl mb-4 md:mb-6 leading-tight">
            Find unforgettable experiences
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-12 opacity-90 max-w-2xl mx-auto">
            Discover authentic experiences around the world, with transparent itineraries from
            guides you can trust
          </p>

          <div className="bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-stretch gap-2">
            <div className="flex-1 flex items-center px-4 md:px-6 border-b md:border-b-0 md:border-r border-brand-earth/10">
              <MapPin className="text-brand-earth/40 w-5 h-5 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Where to next?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-full py-3 md:py-4 text-brand-earth outline-none font-medium text-sm md:text-base"
              />
            </div>
            <div className="flex-1 flex items-center px-4 md:px-6 border-b md:border-b-0 md:border-r border-brand-earth/10">
              <Compass className="text-brand-earth/40 w-5 h-5 mr-3 shrink-0" />
              <select
                value={selectedExpType}
                onChange={(e) => setSelectedExpType(e.target.value)}
                className="bg-transparent w-full py-3 md:py-4 text-brand-earth outline-none font-medium appearance-none text-sm md:text-base cursor-pointer"
              >
                <option>Experience Type</option>
                <option>Adventure</option>
                <option>Excursion</option>
                <option>Pilgrimage</option>
                <option>Research</option>
                <option>Educational</option>
                <option>Cultural</option>
                <option>Others</option>
              </select>
            </div>
            <button onClick={handleSearch} className="btn-primary !py-3 md:!py-4">
              <Search className="w-5 h-5 mr-2" />
              Search
            </button>
          </div>
        </div>
      </section>

      {isSearching && (
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl text-brand-earth">Search Results</h2>
            <button
              onClick={() => setIsSearching(false)}
              className="text-xs md:text-sm font-bold text-brand-coral flex items-center hover:underline transition-all"
            >
              <X className="w-4 h-4 mr-1" /> Clear Search
            </button>
          </div>

          {/* Sponsored Carousel Simulated */}
          <div className="mb-20">
            <h3 className="text-xs uppercase font-bold tracking-widest text-brand-earth/40 mb-6 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-brand-teal" /> Sponsored Adventures
            </h3>
            <div className="flex overflow-x-auto gap-8 pb-8 no-scrollbar scroll-smooth">
              {sponsoredTrips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => {
                    setExpandedTrip(trip);
                    setSelectedRide(null);
                    setSelectedHotel(null);
                  }}
                  className="min-w-[320px] md:min-w-[480px] glass-card rounded-[48px] overflow-hidden cursor-pointer hover:scale-[1.01] transition-all duration-300 border-2 border-brand-saffron/10 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={trip.coverImage}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                      alt={trip.title}
                    />
                    <div className="absolute top-6 right-6 bg-brand-saffron text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                      Featured
                    </div>
                  </div>
                  <div className="p-10">
                    <h4 className="text-3xl mb-2">{trip.title}</h4>
                    <p className="text-xs text-brand-earth/40 mb-3 font-bold uppercase tracking-widest">
                      {trip.location.city}, {trip.location.country}
                    </p>

                    {trip.startDate ? (
                      <div className="mb-6 p-4 bg-brand-teal/5 rounded-2xl border border-brand-teal/10 inline-block">
                        <div className="flex items-center space-x-2 text-brand-teal font-bold text-[9px] uppercase tracking-tighter mb-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(trip.startDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}{' '}
                            -{' '}
                            {trip.endDate
                              ? new Date(trip.endDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })
                              : ''}
                          </span>
                        </div>
                        {trip.bookingDeadline && (
                          <div className="flex items-center space-x-2 text-brand-coral font-bold text-[8px] uppercase tracking-tighter">
                            <Clock className="w-3 h-3" />
                            <span>
                              Deadline: {new Date(trip.bookingDeadline).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mb-6 p-4 bg-brand-teal/5 rounded-2xl border border-brand-teal/10 inline-block">
                        <div className="flex items-center space-x-2 text-brand-teal font-bold text-[9px] uppercase tracking-tighter">
                          <Calendar className="w-3 h-3" />
                          <span>Flexible Dates • Check Availability</span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="font-bold text-2xl text-brand-teal italic">
                        {trip.price.currency} {trip.price.local.toLocaleString()}
                      </span>
                      <button className="btn-primary !px-6 !py-3 !text-[10px] !uppercase">
                        Discover More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regular Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {otherTrips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => {
                  setExpandedTrip(trip);
                  setSelectedRide(null);
                  setSelectedHotel(null);
                }}
                className="glass-card rounded-[32px] md:rounded-[40px] overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
              >
                <div className="relative h-48">
                  <img
                    src={trip.coverImage}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    alt={trip.title}
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-serif text-xl mb-1">{trip.title}</h4>

                  {trip.startDate ? (
                    <div className="flex flex-col space-y-1 mb-3">
                      <div className="flex items-center space-x-2 text-brand-teal font-bold text-[8px] uppercase tracking-widest">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(trip.startDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}{' '}
                          -{' '}
                          {trip.endDate
                            ? new Date(trip.endDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })
                            : ''}
                        </span>
                      </div>
                      {trip.bookingDeadline && (
                        <div className="flex items-center space-x-2 text-brand-coral font-bold text-[7px] uppercase tracking-widest opacity-70">
                          <Clock className="w-3 h-3" />
                          <span>
                            Book by: {new Date(trip.bookingDeadline).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-brand-teal font-bold text-[8px] uppercase tracking-widest mb-3">
                      <Calendar className="w-3 h-3" />
                      <span>Flexible Dates</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm font-bold text-brand-earth/60">
                      {trip.price.currency} {trip.price.local.toLocaleString()}
                    </span>
                    <div className="flex items-center text-brand-saffron text-sm font-bold">
                      <Star className="w-3 h-3 fill-current mr-1" /> {trip.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Expanded Details Modal */}
      <AnimatePresence>
        {expandedTrip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 md:p-12 lg:p-24"
          >
            <div
              className="absolute inset-0 bg-brand-earth/80 backdrop-blur-md"
              onClick={() => setExpandedTrip(null)}
            />
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              className="relative w-full max-w-6xl bg-brand-warm rounded-3xl md:rounded-[50px] shadow-2xl overflow-y-auto max-h-[95vh] no-scrollbar flex flex-col md:flex-row"
            >
              <button
                onClick={() => setExpandedTrip(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-20 p-2 md:p-4 bg-white/20 md:bg-white/20 hover:bg-white/40 rounded-full text-white transition-all shadow-lg"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Sidebar Info */}
              <div className="md:w-1/3 bg-brand-earth text-white p-6 md:p-12">
                <h2 className="font-serif text-3xl md:text-4xl mb-6">
                  {expandedTrip.title}
                  {expandedTrip.startDate && (
                    <span className="block text-sm opacity-60 italic mt-2 font-sans">
                      ({expandedTrip.duration} •{' '}
                      {new Date(expandedTrip.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                      {expandedTrip.endDate &&
                        ` - ${new Date(expandedTrip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                      )
                    </span>
                  )}
                </h2>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">
                  Authentic local experience with verified guides. All inclusive of safety protocols
                  and local logistics.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-brand-teal" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-40">Location</p>
                      <p className="text-sm font-bold">
                        {expandedTrip.location.city}, {expandedTrip.location.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-brand-saffron" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-40">Duration</p>
                      <p className="text-sm font-bold">{expandedTrip.duration}</p>
                    </div>
                  </div>
                </div>

                {expandedTrip.startDate ? (
                  <div className="p-6 bg-white/10 rounded-3xl border border-white/10">
                    <div className="flex items-center space-x-3 mb-3">
                      <Calendar className="w-4 h-4 text-brand-teal" />
                      <p className="text-[10px] uppercase font-bold tracking-widest text-brand-teal">
                        Experience Date
                      </p>
                    </div>
                    <p className="font-serif text-xl italic leading-tight">
                      {new Date(expandedTrip.startDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      {expandedTrip.endDate &&
                        ` - ${new Date(expandedTrip.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
                    </p>
                  </div>
                ) : (
                  <div className="p-6 bg-white/10 rounded-3xl border border-white/10">
                    <div className="flex items-center space-x-3 mb-3">
                      <Calendar className="w-4 h-4 text-brand-teal" />
                      <p className="text-[10px] uppercase font-bold tracking-widest text-brand-teal">
                        Timing
                      </p>
                    </div>
                    <p className="font-serif text-xl italic leading-tight">Flexible / On-Demand</p>
                  </div>
                )}

                {expandedTrip.bookingDeadline && (
                  <div className="p-6 bg-brand-coral/20 rounded-3xl border border-brand-coral/30">
                    <div className="flex items-center space-x-3 mb-2">
                      <Clock className="w-4 h-4 text-brand-coral" />
                      <p className="text-[10px] uppercase font-bold tracking-widest text-brand-coral font-mono">
                        Booking Deadline
                      </p>
                    </div>
                    <p className="font-serif text-lg italic leading-tight">
                      Book by {new Date(expandedTrip.bookingDeadline).toLocaleDateString()}
                    </p>
                    <p className="text-[9px] opacity-40 mt-1 italic uppercase tracking-tighter">
                      Registration closes strictly at{' '}
                      {new Date(expandedTrip.bookingDeadline).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                )}

                {expandedTrip.requiredEquipment && expandedTrip.requiredEquipment.length > 0 && (
                  <div className="mt-8 p-6 bg-brand-saffron/5 rounded-3xl border border-brand-saffron/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <ShieldCheck className="w-4 h-4 text-brand-saffron" />
                      <p className="text-[10px] uppercase font-bold tracking-widest text-brand-saffron">
                        Essential Gear
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {expandedTrip.requiredEquipment.map((item, idx) => (
                        <li key={idx} className="flex items-center text-xs text-brand-earth/70">
                          <span className="w-1 h-1 bg-brand-saffron rounded-full mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-12 p-8 bg-white/10 rounded-3xl border border-white/10">
                  <p className="text-[10px] uppercase font-bold opacity-40 mb-4">
                    Number of Guests
                  </p>
                  <div className="flex items-center space-x-4 mb-8 bg-white/5 p-2 rounded-2xl">
                    <button
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white/20"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 bg-transparent text-center font-bold text-xl outline-none"
                    />

                    <button
                      onClick={() => setGuestCount(guestCount + 1)}
                      className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white/20"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-[10px] uppercase font-bold opacity-40 mb-2">
                    Total Sum to Pay
                  </p>
                  <p className="text-3xl md:text-4xl font-serif text-brand-teal">
                    {expandedTrip.price.currency} {totalCost.toLocaleString()}
                  </p>
                  <p className="text-[10px] opacity-40 mt-1">
                    Includes trip,{' '}
                    {selectedRide
                      ? `transport (${Math.ceil(guestCount / selectedRide.capacity)} vehicle)`
                      : 'no transport'}
                    ,{' '}
                    {selectedHotel
                      ? `stay (${Math.ceil(guestCount / selectedHotel.maxGuests)} rooms)`
                      : 'no stay'}
                  </p>
                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        openAuthModal(() => router.push(`/book/${expandedTrip.id}`));
                      } else {
                        router.push(`/book/${expandedTrip.id}`);
                      }
                    }}
                    className="w-full mt-6 bg-brand-teal text-white py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    Proceed to Booking
                  </button>
                </div>
              </div>

              {/* Robust Features: Rides & Accommodation */}
              <div className="flex-1 p-6 md:p-12 space-y-8 md:space-y-12 bg-[#F8FAFF]">
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-3xl">Local Rides Area</h3>
                    <div className="text-right">
                      <p className="text-xs font-bold text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full tracking-widest uppercase inline-block">
                        Verified Drivers
                      </p>
                      {selectedRide && (
                        <p className="text-[10px] text-brand-earth/40 mt-1 italic">
                          Need {Math.ceil(guestCount / selectedRide.capacity)} units for{' '}
                          {guestCount} guests
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {expandedTrip.rides?.map((ride) => (
                      <div
                        key={ride.id}
                        onClick={() => setSelectedRide(ride)}
                        className={`p-6 rounded-[32px] border-2 transition-all cursor-pointer shadow-sm ${selectedRide?.id === ride.id ? 'border-brand-teal bg-brand-teal/5' : 'border-brand-earth/5 bg-white hover:border-brand-earth/20'}`}
                      >
                        <div className="flex flex-col gap-4">
                          <div className="relative h-32 rounded-2xl overflow-hidden bg-brand-warm">
                            <img
                              src={ride.picture}
                              alt={ride.model}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 flex items-center bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-brand-saffron font-bold text-[10px]">
                              <Star className="w-3 h-3 fill-current mr-1" /> {ride.rating}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-sm">
                                {ride.make} {ride.model}
                              </h4>
                              <span className="text-[10px] font-bold text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-full">
                                {ride.type}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-3 gap-y-1">
                              <div className="flex items-center text-[10px] text-brand-earth/60 font-medium">
                                <Users className="w-3 h-3 mr-1" /> Max {ride.capacity}
                              </div>
                              <div className="flex items-center text-[10px] text-brand-earth/60 font-medium">
                                <BadgeCheck className="w-3 h-3 mr-1 text-brand-teal" /> {ride.color}
                              </div>
                              <div className="flex items-center text-[10px] text-brand-earth/40 font-mono">
                                {ride.plateNumber}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-brand-earth/5">
                            <div>
                              <p className="text-[9px] uppercase font-bold opacity-40">Price</p>
                              <p className="font-bold text-brand-earth">
                                {expandedTrip.price.currency} {ride.price.toLocaleString()}
                              </p>
                            </div>
                            <p className="text-[10px] text-brand-earth/60 font-medium">
                              {ride.driverName}
                            </p>
                          </div>
                        </div>
                      </div>
                    )) || (
                      <p className="text-xs text-brand-earth/40 italic">
                        No ride options available for this specific area yet.
                      </p>
                    )}
                  </div>
                </section>

                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-3xl">Nearby Stays</h3>
                    <div className="text-right">
                      <p className="text-xs font-bold text-brand-coral bg-brand-coral/10 px-3 py-1 rounded-full tracking-widest uppercase inline-block">
                        Handpicked Hotels
                      </p>
                      {selectedHotel && (
                        <p className="text-[10px] text-brand-earth/40 mt-1 italic">
                          Need {Math.ceil(guestCount / selectedHotel.maxGuests)} rooms for{' '}
                          {guestCount} guests
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {expandedTrip.accommodations?.map((hotel) => (
                      <div
                        key={hotel.id}
                        onClick={() => setSelectedHotel(hotel)}
                        className={`flex flex-col sm:flex-row gap-6 p-6 rounded-[32px] border-2 transition-all cursor-pointer ${selectedHotel?.id === hotel.id ? 'border-brand-teal bg-brand-teal/5' : 'border-brand-earth/5 bg-white hover:border-brand-earth/20'}`}
                      >
                        <img
                          src={hotel.images[0]}
                          className="w-full sm:w-32 h-32 rounded-2xl object-cover"
                          alt="hotel"
                        />
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold">
                              {hotel.name}{' '}
                              <span className="text-[10px] font-normal opacity-40 ml-2">
                                Max {hotel.maxGuests} guests/room
                              </span>
                            </h4>
                            <div className="flex items-center text-brand-saffron text-xs font-bold">
                              <Star className="w-3 h-3 fill-current mr-1" /> {hotel.rating} (
                              {hotel.reviews})
                            </div>
                          </div>
                          <p className="text-xs text-brand-earth/60 mb-4">
                            {hotel.type} • High speed wifi • Local breakfast
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-brand-teal">
                              {expandedTrip.price.currency} {hotel.pricePerNight.toLocaleString()}{' '}
                              <span className="text-[10px] opacity-40 font-normal">
                                / night / room
                              </span>
                            </span>
                            {selectedHotel?.id === hotel.id && (
                              <span className="text-[10px] text-brand-teal font-bold uppercase tracking-widest">
                                Selected ✓
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )) || (
                      <p className="text-xs text-brand-earth/40 italic">
                        No accommodation options listed in this immediate area yet.
                      </p>
                    )}
                  </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Specialist Modal */}
      <AnimatePresence>
        {expandedSpecialist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-12 md:p-24"
          >
            <div
              className="absolute inset-0 bg-brand-earth/80 backdrop-blur-md"
              onClick={() => setExpandedSpecialist(null)}
            />
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-brand-warm rounded-3xl md:rounded-[50px] shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar flex flex-col md:flex-row"
            >
              <button
                onClick={() => setExpandedSpecialist(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-20 p-2 bg-brand-earth/5 hover:bg-brand-earth/20 rounded-full transition-all shadow-lg"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="md:w-2/5 md:border-r border-brand-earth/10 p-6 md:p-12">
                <div className="relative mb-8">
                  <img
                    src={expandedSpecialist.profilePhoto}
                    className="pill-image w-full h-80 shadow-2xl object-cover"
                    alt="profile"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white p-4 rounded-full shadow-xl">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl mb-2">{expandedSpecialist.name}</h2>
                <p className="text-xs font-bold text-brand-teal uppercase tracking-widest mb-6">
                  Verified {expandedSpecialist.type}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/50 p-4 rounded-2xl border border-brand-earth/5">
                    <p className="text-[10px] uppercase font-bold text-brand-earth/40">Rating</p>
                    <p className="font-serif text-2xl flex items-center text-brand-saffron">
                      <Star className="w-4 h-4 fill-current mr-2" /> {expandedSpecialist.rating}
                    </p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-2xl border border-brand-earth/5">
                    <p className="text-[10px] uppercase font-bold text-brand-earth/40">
                      Success Rate
                    </p>
                    <p className="font-serif text-2xl">99.2%</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 md:p-12 space-y-8 md:space-y-12 bg-[#F8FAFF]">
                <section>
                  <h3 className="font-serif text-3xl mb-4">About Specialists</h3>
                  <p className="text-sm text-brand-earth/60 leading-relaxed italic">
                    {expandedSpecialist.description ||
                      'Passionate about providing authentic local experiences with a deep focus on cultural heritage and nature conservation.'}
                  </p>
                </section>

                <section>
                  <h3 className="font-serif text-3xl mb-6">Verified Guest Reviews</h3>
                  <div className="space-y-6">
                    {expandedSpecialist.reviews?.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-white p-6 rounded-3xl border border-brand-earth/5 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <img src={rev.userPhoto} className="w-8 h-8 rounded-full" alt="user" />
                            <div>
                              <h4 className="text-sm font-bold">{rev.userName}</h4>
                              <p className="text-[10px] text-brand-earth/40">{rev.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center text-brand-saffron">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-brand-earth/80 font-sans">{rev.comment}</p>
                      </div>
                    )) || <p className="text-xs text-brand-earth/40 italic">No reviews yet.</p>}
                  </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Section */}
      <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          <div className="flex flex-col items-center text-center p-6 bg-white/50 rounded-3xl border border-brand-earth/5">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal mb-4 md:mb-6">
              <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="font-serif text-xl md:text-2xl mb-3 md:mb-4">Verified Guides</h3>
            <p className="text-xs md:text-sm text-brand-earth/60">
              Every guide passes a rigorous background and certification check.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white/50 rounded-3xl border border-brand-earth/5">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-saffron/10 rounded-2xl flex items-center justify-center text-brand-saffron mb-4 md:mb-6">
              <CreditCard className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="font-serif text-xl md:text-2xl mb-3 md:mb-4">Escrow Payments</h3>
            <p className="text-xs md:text-sm text-brand-earth/60">
              Your payment is held securely and only released after the trip ends.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white/50 rounded-3xl border border-brand-earth/5 sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-coral/10 rounded-2xl flex items-center justify-center text-brand-coral mb-4 md:mb-6">
              <HeartPulse className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="font-serif text-xl md:text-2xl mb-3 md:mb-4">Emergency Support</h3>
            <p className="text-xs md:text-sm text-brand-earth/60">
              24/7 dedicated local emergency coordination and safety protocols.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="py-20 bg-brand-warm/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl mb-2 text-brand-earth">Featured Experiences</h2>
              <p className="text-brand-earth/50">
                Hand-picked adventures from our top-rated guides.
              </p>
            </div>
            <button className="text-sm font-bold text-brand-teal border-b-2 border-brand-teal pb-1">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_TRIPS.map((trip) => (
              <Link key={trip.id} href={`/trip/${trip.id}`} className="group">
                <div className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-brand-earth/5">
                  <div className="relative h-64">
                    <img
                      src={trip.coverImage}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={trip.title}
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-earth">
                      {trip.experienceType}
                    </div>
                    {trip.videoPreview && (
                      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur p-2 rounded-full text-white">
                        <Video className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-serif text-2xl text-brand-earth mb-1">{trip.title}</h4>
                        <div className="flex items-center text-xs text-brand-earth/40 uppercase tracking-wider font-bold">
                          <MapPin className="w-3 h-3 mr-1" />
                          {trip.location.city}, {trip.location.country}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-brand-teal font-serif text-2xl font-bold">
                          {trip.price.currency} {trip.price.local.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-brand-earth/40">
                          ≈ USD {trip.price.usd}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-earth/10">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-brand-earth/40 uppercase font-bold tracking-widest mb-1">
                          Duration
                        </span>
                        <span className="text-sm font-medium">{trip.duration}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-brand-earth/40 uppercase font-bold tracking-widest mb-1">
                          Type
                        </span>
                        <span className="text-sm font-medium">{trip.groupType}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center text-brand-saffron">
                          <Star className="w-3 h-3 fill-current mr-1" />
                          <span className="text-sm font-bold">{trip.rating}</span>
                        </div>
                        <span className="text-[10px] text-brand-earth/40 font-bold">
                          {trip.reviewCount} reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Guides Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl md:text-5xl mb-4 text-brand-earth">
              Our Verified Local Specialists
            </h2>
            <p className="text-brand-earth/60 text-base md:text-lg">
              We connect you directly with local experts who know every secret trail and hidden gem.
            </p>
          </div>
          <Link
            href="/guides"
            className="px-8 py-4 bg-brand-teal text-white rounded-full font-bold shadow-xl hover:bg-brand-teal/90 transition-all flex items-center group"
          >
            View all professional guides{' '}
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_SPECIALISTS.map((specialist) => (
            <Link
              key={specialist.id}
              href={`/guide/profile/${specialist.id}`}
              className="glass-card rounded-[40px] p-8 flex flex-col xl:flex-row gap-8 items-center xl:items-start relative group shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-brand-earth/5 hover:border-brand-teal/30"
            >
              <div className="relative shrink-0">
                <img
                  src={specialist.profilePhoto}
                  className="w-44 h-44 rounded-full shadow-2xl object-cover border-4 border-white"
                  alt={specialist.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 right-0 bg-brand-teal text-white p-2.5 rounded-full shadow-xl border-4 border-white">
                  <BadgeCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center text-center xl:text-left">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-4 gap-2">
                  <h4 className="font-serif text-3xl group-hover:text-brand-teal transition-colors">
                    {specialist.name}
                  </h4>
                  <div className="flex items-center justify-center xl:justify-end text-brand-saffron bg-brand-saffron/10 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span className="font-bold text-sm">{specialist.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-brand-earth/60 mb-6 italic line-clamp-2 leading-relaxed">
                  {specialist.description}
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-brand-earth/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-brand-earth/40 mb-1">
                      Experiences Led
                    </p>
                    <p className="font-serif text-xl">{specialist.completedTrips}+</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-brand-earth/40 mb-1">
                      Avg Response
                    </p>
                    <p className="font-serif text-xl">{specialist.responseTime}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Near You / Live Trips Section */}
      <section className="py-20 bg-brand-earth text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-brand-coral/20 text-brand-coral border border-brand-coral/30 text-xs font-bold tracking-widest uppercase mb-4">
                <span className="w-2 h-2 bg-brand-coral rounded-full mr-2 animate-pulse" />
                Live Now
              </div>
              <h2 className="font-serif text-3xl md:text-5xl mb-4">
                Experiences starting soon near you
              </h2>
              <p className="text-white/60 text-sm md:text-base">
                Last minute spots available in your current region. Don't miss out on the action!
              </p>
            </div>
          </div>

          <div className="flex overflow-x-auto pb-8 gap-8 no-scrollbar">
            {MOCK_TRIPS.slice(1, 4).map((trip, i) => (
              <Link
                key={trip.id}
                href={`/trip/${trip.id}`}
                className="min-w-[300px] md:min-w-[400px] bg-white/10 backdrop-blur rounded-[40px] p-6 border border-white/10 hover:bg-white/20 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h4 className="font-serif text-2xl mb-1">{trip.title}</h4>
                    <p className="text-xs text-white/50 font-bold uppercase tracking-widest flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Starts in {i === 0 ? '45:12' : i === 1 ? '1:20:00' : '2:15:00'}
                    </p>
                  </div>
                  <div className="bg-brand-teal text-[10px] font-bold uppercase px-3 py-1 rounded-full text-white">
                    {i + 2} Seats Left
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((u) => (
                      <img
                        key={u}
                        src={`https://picsum.photos/seed/user${u}/100/100`}
                        className="w-10 h-10 rounded-full border-2 border-brand-earth"
                        alt="user"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold backdrop-blur">
                      +5
                    </div>
                  </div>
                  <div className="text-2xl font-serif">
                    {trip.price.currency} {trip.price.local.toLocaleString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
