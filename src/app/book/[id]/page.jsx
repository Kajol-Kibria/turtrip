'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CreditCard,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  Car,
  Home,
  Sparkles,
  Heart,
  ArrowLeft,
  ShieldCheck,
  Info,
  ChevronLeft,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { MOCK_TRIPS, MOCK_DRIVERS, MOCK_SPECIALISTS } from '@/mockData';
import StatusModal from '@/components/StatusModal';

export default function BookingFlow() {
  const { id } = useParams();
  const router = useRouter();
  const location = usePathname();
  const trip = MOCK_TRIPS.find((t) => t.id === id) || MOCK_TRIPS[0];

  const [step, setStep] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [userSelectedDate, setUserSelectedDate] = useState('');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const guide = useMemo(() => {
    return MOCK_SPECIALISTS.find((g) => g.activeExperienceIds?.includes(trip.id));
  }, [trip]);

  const daysInMonth = useMemo(() => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(i);
    return days;
  }, [calendarDate]);

  const isDateBlocked = (day) => {
    if (!day || !guide || !guide.availability) return false;
    const dateStr = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return guide.availability.blockedDates.includes(dateStr);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const guests = params.get('guests');
    if (guests) setGuestCount(parseInt(guests));
  }, [location]);

  const [isWishlisted, setIsWishlisted] = useState(false);

  // Ride state
  const [pickup, setPickup] = useState('');
  const [pickupTime, setPickupTime] = useState('08:00');
  const [passengers, setPassengers] = useState(1);
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [selectedDriverIds, setSelectedDriverIds] = useState([]);
  const [dropoffType, setDropoffType] = useState('Experience');

  // Accommodation state
  const [selectedStays, setSelectedStays] = useState([]);
  const [stayImageIndices, setStayImageIndices] = useState({});
  const [activeGallery, setActiveGallery] = useState(null);

  const roomsNeeded = useMemo(() => Math.ceil(guestCount / 1.5), [guestCount]); // 1.5 travelers per room average
  const roomsSelected = useMemo(
    () => selectedStays.reduce((acc, curr) => acc + curr.rooms, 0),
    [selectedStays]
  );

  const totalCost = useMemo(() => {
    let total = trip.price.local * guestCount;
    const conversion = trip.price.local / trip.price.usd;

    if (selectedDriverIds.length > 0) {
      selectedDriverIds.forEach((driverId) => {
        const driver = MOCK_DRIVERS.find((d) => d.id === driverId);
        if (driver) {
          // Simple fixed price for mock
          total += 50000 * (guestCount > 4 ? 2 : 1) * (isRoundTrip ? 1.8 : 1);
        }
      });
    }

    selectedStays.forEach((item) => {
      const hotel = trip.accommodations?.find((h) => h.id === item.id);
      if (hotel) {
        total += hotel.pricePerNight * conversion * item.rooms;
      }
    });

    return total;
  }, [trip, guestCount, selectedDriverIds, selectedStays, isRoundTrip]);

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-brand-warm/30 pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6"
    >
      <AnimatePresence>
        {activeGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-earth/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setActiveGallery(null)}
              className="absolute top-10 right-10 z-[110] bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all"
            >
              <CheckCircle2 className="w-8 h-8 rotate-45" />{' '}
              {/* Use CheckCircle rotated for X looks ok, or just text */}
              <span className="sr-only">Close</span>
            </button>

            <div className="relative w-full max-w-5xl h-[70vh] px-6">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeGallery.index}
                  src={
                    trip.accommodations?.find((h) => h.id === activeGallery.hotelId)?.images[
                      activeGallery.index
                    ]
                  }
                  initial={{ opacity: 0, scale: 0.9, x: 100 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -100 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="w-full h-full object-contain rounded-[40px]"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    const hotel = trip.accommodations?.find((h) => h.id === activeGallery.hotelId);
                    if (!hotel) return;
                    if (info.offset.x > 100) {
                      // Prev
                      setActiveGallery({
                        ...activeGallery,
                        index:
                          (activeGallery.index - 1 + hotel.images.length) % hotel.images.length,
                      });
                    } else if (info.offset.x < -100) {
                      // Next
                      setActiveGallery({
                        ...activeGallery,
                        index: (activeGallery.index + 1) % hotel.images.length,
                      });
                    }
                  }}
                />
              </AnimatePresence>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const hotel = trip.accommodations?.find((h) => h.id === activeGallery.hotelId);
                  if (hotel)
                    setActiveGallery({
                      ...activeGallery,
                      index: (activeGallery.index - 1 + hotel.images.length) % hotel.images.length,
                    });
                }}
                className="absolute left-10 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const hotel = trip.accommodations?.find((h) => h.id === activeGallery.hotelId);
                  if (hotel)
                    setActiveGallery({
                      ...activeGallery,
                      index: (activeGallery.index + 1) % hotel.images.length,
                    });
                }}
                className="absolute right-10 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <div className="mt-12 flex space-x-3 overflow-x-auto p-4 no-scrollbar max-w-full">
              {trip.accommodations
                ?.find((h) => h.id === activeGallery.hotelId)
                ?.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGallery({ ...activeGallery, index: i })}
                    className={`w-20 h-20 rounded-2xl overflow-hidden transition-all shrink-0 border-2 ${i === activeGallery.index ? 'border-brand-teal scale-110 shadow-xl' : 'border-transparent opacity-40 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                  </button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <StatusModal
        isOpen={showPaymentSuccess}
        onClose={() => router.push('/dashboard')}
        type="success"
        title="Payment Successful!"
        message="Your adventure is now officially booked! We've sent the details to your email and notification center. Your guide and driver have been notified. Get ready for an unforgettable journey!"
        actionLabel="Go to My Bookings"
        onAction={() => router.push('/dashboard')}
      />

      <div className="max-w-6xl mx-auto">
        {/* Progress Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-6">
          <div>
            <Link
              href={`/trip/${trip.id}`}
              className="text-sm font-bold text-brand-earth/40 hover:text-brand-earth flex items-center mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Experience
            </Link>
            <h1 className="font-serif text-3xl">Booking: {trip.title}</h1>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold transition-all ${step >= s ? 'bg-brand-teal text-white shadow-lg' : 'bg-brand-earth/10 text-brand-earth/30'}`}
                >
                  {step > s ? (
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                  ) : s === 2 ? (
                    <Home className="w-3 h-3 md:w-4 md:h-4" />
                  ) : s === 3 ? (
                    <Car className="w-3 h-3 md:w-4 md:h-4" />
                  ) : (
                    s
                  )}
                </div>
                {s < 4 && (
                  <div
                    className={`w-4 md:w-8 h-0.5 md:h-1 mx-1 md:mx-2 rounded-full ${step > s ? 'bg-brand-teal' : 'bg-brand-earth/10'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Main Wizard Area */}
          <div className="lg:col-span-2 space-y-8">
            {step === 1 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="glass-card rounded-3xl md:rounded-[48px] p-6 md:p-12 shadow-xl border border-brand-earth/5"
              >
                <h2 className="font-serif text-3xl md:text-4xl mb-6 md:mb-8">Traveler Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 bg-brand-warm rounded-3xl">
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-4">
                      Number of Bookings
                    </label>
                    <div className="flex items-center justify-between bg-white p-1.5 md:p-2 rounded-2xl">
                      <button
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="w-10 h-10 md:w-12 md:h-12 bg-brand-warm rounded-xl font-bold"
                      >
                        -
                      </button>
                      <span className="text-lg md:text-xl font-bold">{guestCount}</span>
                      <button
                        onClick={() => setGuestCount(guestCount + 1)}
                        className="w-10 h-10 md:w-12 md:h-12 bg-brand-warm rounded-xl font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div
                    className="flex flex-col justify-center items-center p-6 border-2 border-dashed border-brand-earth/10 rounded-3xl hover:border-brand-teal transition-all cursor-pointer group"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart
                      className={`w-8 h-8 mb-2 transition-all ${isWishlisted ? 'fill-brand-coral text-brand-coral scale-110' : 'text-brand-earth/20 group-hover:text-brand-coral'}`}
                    />
                    <p className="text-xs font-bold text-brand-earth/40">
                      {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
                    </p>
                  </div>

                  {!trip.startDate && (
                    <div className="md:col-span-2 p-6 md:p-8 bg-brand-teal/5 border border-brand-teal/10 rounded-[32px] mt-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 md:w-6 md:h-6 text-brand-teal" />
                          <h3 className="font-serif text-xl md:text-2xl">Guide's Open Days</h3>
                        </div>
                        <div className="flex items-center space-x-3 bg-white p-1.5 md:p-2 rounded-full shadow-sm border border-brand-earth/5 self-end sm:self-auto">
                          <button
                            onClick={() =>
                              setCalendarDate(
                                new Date(calendarDate.setMonth(calendarDate.getMonth() - 1))
                              )
                            }
                          >
                            <ChevronLeft className="w-5 h-5 text-brand-earth/40 hover:text-brand-earth" />
                          </button>
                          <span className="text-xs font-bold min-w-[100px] text-center">
                            {calendarDate.toLocaleDateString('en-US', {
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                          <button
                            onClick={() =>
                              setCalendarDate(
                                new Date(calendarDate.setMonth(calendarDate.getMonth() + 1))
                              )
                            }
                          >
                            <ChevronRight className="w-5 h-5 text-brand-earth/40 hover:text-brand-earth" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1 md:gap-3 mb-6">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                          <div
                            key={d}
                            className="text-center text-[9px] md:text-[10px] uppercase font-black text-brand-earth/20 py-2"
                          >
                            {d}
                          </div>
                        ))}
                        {daysInMonth.map((day, idx) => {
                          const blocked = day ? isDateBlocked(day) : false;
                          const dateStr = day
                            ? `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                            : null;
                          const isSelected = userSelectedDate === dateStr;
                          const isPast =
                            day &&
                            new Date(
                              calendarDate.getFullYear(),
                              calendarDate.getMonth(),
                              day
                            ).getTime() < new Date().setHours(0, 0, 0, 0);

                          return (
                            <div
                              key={idx}
                              onClick={() =>
                                day && !blocked && !isPast && setUserSelectedDate(dateStr)
                              }
                              className={`aspect-square rounded-xl p-1 md:p-2 border transition-all flex items-center justify-center cursor-pointer text-xs font-bold ${
                                !day
                                  ? 'bg-transparent border-transparent'
                                  : isSelected
                                    ? 'bg-brand-teal text-white border-brand-teal shadow-lg scale-105'
                                    : blocked || isPast
                                      ? 'bg-brand-earth/5 border-transparent opacity-30 cursor-not-allowed'
                                      : 'bg-white border-brand-earth/5 hover:border-brand-teal hover:text-brand-teal'
                              }`}
                            >
                              {day}
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-[9px] font-bold text-brand-earth/40 uppercase tracking-widest pt-4 border-t border-brand-earth/5">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-brand-teal rounded-sm mr-2" /> Selected
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-white border border-brand-earth/10 rounded-sm mr-2" />{' '}
                          Open Date
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-brand-earth/10 rounded-sm mr-2 opacity-30" />{' '}
                          Busy/Blocked
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-12 space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-brand-teal/5 rounded-2xl border border-brand-teal/10">
                    <ShieldCheck className="w-6 h-6 text-brand-teal" />
                    <p className="text-xs text-brand-earth/60">
                      Your spot is held for 15 minutes. Complete the booking to confirm.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-12">
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto bg-brand-earth text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold flex items-center justify-center hover:bg-brand-earth/90 transition-all shadow-xl"
                  >
                    Next: Accommodation <ChevronRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-8"
              >
                <div className="glass-card rounded-3xl md:rounded-[48px] p-6 md:p-12 shadow-xl border border-brand-earth/5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
                    <div>
                      <h2 className="font-serif text-3xl md:text-4xl mb-2">Nearby Stays</h2>
                      <p className="text-sm text-brand-earth/60">
                        Enhance your trip with local accommodation.
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-xs font-bold text-brand-earth/40 uppercase tracking-widest">
                          Rooms Selection:
                        </span>
                        <span
                          className={`text-xs font-black p-2 rounded-lg ${roomsSelected >= roomsNeeded ? 'bg-brand-teal text-white' : 'bg-brand-warm text-brand-earth/40'}`}
                        >
                          {roomsSelected} / {roomsNeeded} ROOMS
                        </span>
                      </div>
                      <button
                        onClick={handleNext}
                        className="text-xs font-bold text-brand-earth/40 hover:text-brand-teal underline"
                      >
                        Skip stay selection
                      </button>
                    </div>
                  </div>

                  <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar scroll-smooth">
                    {trip.accommodations?.map((hotel) => {
                      const selected = selectedStays.find((s) => s.id === hotel.id);
                      const currentIdx = stayImageIndices[hotel.id] || 0;

                      const nextImage = (e) => {
                        e.stopPropagation();
                        setStayImageIndices({
                          ...stayImageIndices,
                          [hotel.id]: (currentIdx + 1) % hotel.images.length,
                        });
                      };

                      const prevImage = (e) => {
                        e.stopPropagation();
                        setStayImageIndices({
                          ...stayImageIndices,
                          [hotel.id]: (currentIdx - 1 + hotel.images.length) % hotel.images.length,
                        });
                      };

                      return (
                        <div
                          key={hotel.id}
                          className={`min-w-[320px] md:min-w-[400px] p-6 rounded-[40px] border-2 transition-all ${selected ? 'border-brand-teal bg-brand-teal/5 shadow-xl' : 'border-brand-earth/5 bg-white hover:border-brand-earth/10'}`}
                        >
                          <div
                            className="relative mb-6 group/img cursor-zoom-in"
                            onClick={() =>
                              setActiveGallery({ hotelId: hotel.id, index: currentIdx })
                            }
                          >
                            <div className="relative w-full h-48 rounded-[32px] overflow-hidden">
                              <AnimatePresence mode="wait">
                                <motion.img
                                  key={currentIdx}
                                  src={hotel.images[currentIdx]}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  className="w-full h-full object-cover"
                                  alt="hotel"
                                />
                              </AnimatePresence>

                              {hotel.images.length > 1 && (
                                <>
                                  <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                                  >
                                    <ChevronLeft className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                                  >
                                    <ChevronRight className="w-4 h-4" />
                                  </button>
                                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1">
                                    {hotel.images.map((_, i) => (
                                      <div
                                        key={i}
                                        className={`w-1.5 h-1.5 rounded-full ${i === currentIdx ? 'bg-white' : 'bg-white/40'}`}
                                      />
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-earth">
                              {hotel.type}
                            </div>
                            <div className="absolute top-4 right-4 bg-brand-saffron text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg flex items-center">
                              ★ {hotel.rating}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-xl">{hotel.name}</h4>
                              <div className="text-right">
                                <p className="text-lg font-serif text-brand-teal italic">
                                  ${hotel.pricePerNight}
                                </p>
                                <p className="text-[10px] text-brand-earth/40 uppercase font-bold tracking-widest">
                                  per night
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-brand-warm rounded-2xl">
                              <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-brand-earth/40" />
                                <span className="text-[10px] font-bold text-brand-earth/60 uppercase tracking-widest">
                                  {hotel.bedsLeft} Beds Left
                                </span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => {
                                    const existing = selectedStays.find((s) => s.id === hotel.id);
                                    if (existing && existing.rooms > 0) {
                                      if (existing.rooms === 1) {
                                        setSelectedStays(
                                          selectedStays.filter((s) => s.id !== hotel.id)
                                        );
                                      } else {
                                        setSelectedStays(
                                          selectedStays.map((s) =>
                                            s.id === hotel.id ? { ...s, rooms: s.rooms - 1 } : s
                                          )
                                        );
                                      }
                                    }
                                  }}
                                  className="w-8 h-8 rounded-full bg-white border border-brand-earth/10 flex items-center justify-center font-bold text-brand-earth hover:bg-brand-earth hover:text-white transition-all shadow-sm"
                                >
                                  -
                                </button>
                                <span className="font-bold text-sm w-4 text-center">
                                  {selected?.rooms || 0}
                                </span>
                                <button
                                  onClick={() => {
                                    const existing = selectedStays.find((s) => s.id === hotel.id);
                                    if (existing) {
                                      setSelectedStays(
                                        selectedStays.map((s) =>
                                          s.id === hotel.id ? { ...s, rooms: s.rooms + 1 } : s
                                        )
                                      );
                                    } else {
                                      setSelectedStays([
                                        ...selectedStays,
                                        { id: hotel.id, rooms: 1 },
                                      ]);
                                    }
                                  }}
                                  className="w-8 h-8 rounded-full bg-white border border-brand-earth/10 flex items-center justify-center font-bold text-brand-earth hover:bg-brand-earth hover:text-white transition-all shadow-sm"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            {selected && (
                              <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest text-center pt-2">
                                Selected Entry ✓
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-between mt-8 md:mt-12 gap-4">
                  <button
                    onClick={handleBack}
                    className="text-brand-earth/40 font-bold px-8 py-5 flex items-center hover:text-brand-earth"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto bg-brand-earth text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold flex items-center justify-center hover:bg-brand-earth/90 transition-all shadow-xl"
                  >
                    Next: Ride Booking <ChevronRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-8"
              >
                <div className="glass-card rounded-3xl md:rounded-[48px] p-6 md:p-12 shadow-xl border border-brand-earth/5">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-6 md:mb-8 gap-4">
                    <div>
                      <h2 className="font-serif text-3xl md:text-4xl mb-2">Ride Booking</h2>
                      <p className="text-sm text-brand-earth/60">
                        Verified local drivers for your journey.
                      </p>
                    </div>
                    <button
                      onClick={handleNext}
                      className="text-xs font-bold text-brand-earth/40 hover:text-brand-teal underline"
                    >
                      Skip this step
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                        Pickup Location
                      </label>
                      <input
                        type="text"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        placeholder="Hotel name or Airport..."
                        className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                        Pickup Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-earth/20" />
                        <input
                          type="time"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full p-4 pl-12 rounded-xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all font-bold text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                        Destination
                      </label>
                      <div className="flex flex-col gap-2">
                        <div className="flex bg-brand-warm p-1 rounded-xl">
                          <button
                            onClick={() => setDropoffType('Experience')}
                            className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${dropoffType === 'Experience' ? 'bg-white shadow-sm text-brand-teal' : 'text-brand-earth/40 hover:text-brand-earth'}`}
                          >
                            Trip
                          </button>
                          {selectedStays.length > 0 && (
                            <button
                              onClick={() => setDropoffType('Accommodation')}
                              className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${dropoffType === 'Accommodation' ? 'bg-white shadow-sm text-brand-teal' : 'text-brand-earth/40 hover:text-brand-earth'}`}
                            >
                              Stay
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          readOnly
                          value={
                            dropoffType === 'Experience'
                              ? trip.location.city
                              : trip.accommodations?.find((a) => a.id === selectedStays[0].id)
                                  ?.name || trip.location.city
                          }
                          className="w-full p-4 rounded-xl border border-brand-earth/10 bg-brand-warm/50 text-brand-earth/60 outline-none text-xs truncate"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                        Passengers
                      </label>
                      <div className="flex items-center space-x-4 bg-brand-warm p-2 rounded-xl">
                        <Users className="w-5 h-5 text-brand-earth/40 ml-2" />
                        <span className="font-bold">{guestCount} Guests</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-brand-earth/10 rounded-xl">
                      <span className="text-xs font-bold tracking-widest uppercase">
                        Round Trip
                      </span>
                      <button
                        onClick={() => setIsRoundTrip(!isRoundTrip)}
                        className={`w-12 h-6 rounded-full transition-all relative ${isRoundTrip ? 'bg-brand-teal' : 'bg-brand-earth/10'}`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isRoundTrip ? 'right-1' : 'left-1'}`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-brand-earth/40">
                      Available Drivers Near You
                    </h3>
                    <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar">
                      {MOCK_DRIVERS.map((driver) => {
                        const isSelected = selectedDriverIds.includes(driver.id);
                        return (
                          <div
                            key={driver.id}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedDriverIds(
                                  selectedDriverIds.filter((id) => id !== driver.id)
                                );
                              } else {
                                setSelectedDriverIds([...selectedDriverIds, driver.id]);
                              }
                            }}
                            className={`min-w-[320px] p-6 rounded-[32px] border-2 transition-all cursor-pointer relative ${isSelected ? 'border-brand-teal bg-brand-teal/5 shadow-lg' : 'border-brand-earth/5 bg-white hover:border-brand-earth/10'}`}
                          >
                            {isSelected && (
                              <div className="absolute top-4 right-4 bg-brand-teal text-white p-1 rounded-full shadow-lg z-10">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                            )}
                            <div className="flex gap-4 mb-4">
                              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-brand-warm shrink-0">
                                <img
                                  src={driver.vehicle.picture}
                                  alt={driver.vehicle.model}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className="font-bold text-sm">
                                    {driver.vehicle.make} {driver.vehicle.model}
                                  </h4>
                                  <div className="flex items-center text-brand-saffron font-bold text-[10px]">
                                    ★ {driver.rating}
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                  <span className="text-[9px] font-bold text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-full">
                                    {driver.vehicle.type}
                                  </span>
                                  <span className="text-[9px] font-medium text-brand-earth/40">
                                    {driver.vehicle.color}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <img
                                    src={driver.photo}
                                    className="w-5 h-5 rounded-full object-cover"
                                    alt="driver"
                                  />
                                  <p className="text-[10px] font-bold text-brand-earth/60">
                                    {driver.name}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-brand-earth/5">
                              <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-brand-earth/40 uppercase">
                                  Plate Number
                                </span>
                                <span className="text-[10px] font-mono text-brand-earth">
                                  {driver.vehicle.plateNumber}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] font-bold text-brand-earth/60">
                                  {trip.price.currency}{' '}
                                  {driver.settings.pricePerKm.toLocaleString()} / km
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-between mt-8 md:mt-12 gap-4">
                  <button
                    onClick={handleBack}
                    className="text-brand-earth/40 font-bold px-8 py-5 flex items-center hover:text-brand-earth"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto bg-brand-earth text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold flex items-center justify-center hover:bg-brand-earth/90 transition-all shadow-xl"
                  >
                    Next: Review Summary <ChevronRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-8"
              >
                <div className="glass-card rounded-3xl md:rounded-[48px] p-6 md:p-12 shadow-xl border border-brand-earth/5">
                  <h2 className="font-serif text-4xl mb-4 text-center">Summary</h2>
                  <p className="text-center text-sm text-brand-earth/60 mb-12">
                    Review your journey options before final payment.
                  </p>

                  <div className="space-y-6">
                    <div className="p-4 md:p-6 bg-brand-warm rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <Sparkles className="w-6 h-6 text-brand-teal" />
                        <div>
                          <h4 className="font-bold text-sm">Experience</h4>
                          <p className="text-xs text-brand-earth/60">
                            {trip.title} ({guestCount} guests)
                          </p>
                        </div>
                      </div>
                      <span className="font-bold">
                        {trip.price.currency} {(trip.price.local * guestCount).toLocaleString()}
                      </span>
                    </div>

                    {selectedDriverIds.length > 0 &&
                      selectedDriverIds.map((driverId) => {
                        const driver = MOCK_DRIVERS.find((d) => d.id === driverId);
                        return (
                          <div
                            key={driverId}
                            className="p-4 md:p-6 bg-brand-warm rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between border-l-4 border-brand-teal gap-4"
                          >
                            <div className="flex items-center space-x-4">
                              <Car className="w-6 h-6 text-brand-teal" />
                              <div>
                                <h4 className="font-bold text-sm">
                                  Private Ride: {driver?.vehicle.make}
                                </h4>
                                <p className="text-xs text-brand-earth/60">
                                  {driver?.name} • {isRoundTrip ? 'Round Trip' : 'One Way'}
                                  <br />
                                  <span className="opacity-60 italic text-[10px]">
                                    Drop-off:{' '}
                                    {dropoffType === 'Experience'
                                      ? 'Trip Location'
                                      : 'Accommodation'}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-brand-teal">
                              + Est. {trip.price.currency} 50,000
                            </span>
                          </div>
                        );
                      })}

                    {selectedStays.length > 0 &&
                      selectedStays.map((item) => {
                        const hotel = trip.accommodations?.find((h) => h.id === item.id);
                        const conversion = trip.price.local / trip.price.usd;
                        return (
                          <div
                            key={item.id}
                            className="p-4 md:p-6 bg-brand-warm rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between border-l-4 border-brand-coral gap-4"
                          >
                            <div className="flex items-center space-x-4">
                              <Home className="w-6 h-6 text-brand-coral" />
                              <div>
                                <h4 className="font-bold text-sm">Accommodation: {hotel?.name}</h4>
                                <p className="text-xs text-brand-earth/60">{item.rooms} Room(s)</p>
                              </div>
                            </div>
                            <span className="font-bold text-brand-coral">
                              + {trip.price.currency}{' '}
                              {(
                                (hotel?.pricePerNight || 0) *
                                conversion *
                                item.rooms
                              ).toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                  </div>

                  <div className="mt-12 p-6 md:p-8 bg-brand-earth text-white rounded-3xl">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-sm font-bold opacity-40 uppercase tracking-widest">
                        Total to Pay
                      </span>
                      <h3 className="font-serif text-4xl">
                        {trip.price.currency} {totalCost.toLocaleString()}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] opacity-40 uppercase font-bold tracking-widest mb-4">
                        Payment Method
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="flex items-center p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all group">
                          <CreditCard className="w-5 h-5 mr-3 text-brand-teal" />
                          <span className="text-xs font-bold">Card</span>
                        </button>
                        <button className="flex items-center p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all">
                          <Info className="w-5 h-5 mr-3 text-brand-coral" />
                          <span className="text-xs font-bold">Mobile Money</span>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowPaymentSuccess(true);
                      }}
                      className="w-full mt-10 bg-brand-teal text-white py-6 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-all"
                    >
                      Secure Payment & Launch
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar Summary Card */}
          <div className="space-y-6">
            <div className="glass-card rounded-3xl md:rounded-[40px] p-6 md:p-8 border border-brand-earth/5 overflow-hidden sticky top-32">
              <img
                src={trip.coverImage}
                className="w-full h-40 rounded-3xl object-cover mb-6"
                alt="trip"
              />
              <h3 className="font-serif text-xl mb-2">{trip.title}</h3>
              <div className="flex items-center text-xs text-brand-earth/60 mb-6">
                <MapPin className="w-3 h-3 mr-1" /> {trip.location.city}, {trip.location.country}
              </div>

              <div className="space-y-4 pt-6 border-t border-brand-earth/10">
                <div className="flex justify-between text-xs">
                  <span className="text-brand-earth/40 font-bold uppercase tracking-widest">
                    Guests
                  </span>
                  <span className="font-bold">{guestCount}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-brand-earth/40 font-bold uppercase tracking-widest">
                    Base Cost
                  </span>
                  <span className="font-bold">
                    {trip.price.currency} {(trip.price.local * guestCount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs pt-4 border-t border-brand-earth/5">
                  <span className="text-brand-earth font-bold uppercase tracking-widest">
                    Estimated Total
                  </span>
                  <span className="text-lg font-bold text-brand-teal">
                    {trip.price.currency} {totalCost.toLocaleString()}
                  </span>
                </div>
              </div>

              {(trip.startDate || userSelectedDate) && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mt-6 p-4 bg-brand-teal/10 rounded-2xl border border-brand-teal/20"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-teal">
                      Confirmed Date
                    </span>
                  </div>
                  <p className="font-serif text-xl italic text-brand-earth">
                    {new Date(trip.startDate || userSelectedDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </motion.div>
              )}
            </div>

            <div className="p-6 bg-brand-coral/5 rounded-3xl border border-brand-coral/10">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-brand-coral" />
                <div>
                  <h4 className="text-xs font-bold text-brand-earth mb-1">Escrow Guarantee</h4>
                  <p className="text-[10px] text-brand-earth/60">
                    Your funds are only released to the guide and driver after the experience is
                    successfully completed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
