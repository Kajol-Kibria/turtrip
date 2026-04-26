'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  MapPin,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Users,
  CheckCircle2,
  AlertTriangle,
  Send,
  Home,
  Truck,
  Coffee,
  BadgeCheck,
  X as XIcon,
  Plus as PlusIcon,
} from 'lucide-react';
import { MOCK_SPECIALISTS, MOCK_TRIPS } from '@/mockData';

import StatusModal from '@/components/StatusModal';

export default function GuideProfile() {
  const { id } = useParams();
  const guide = MOCK_SPECIALISTS.find((g) => g.id === id) || MOCK_SPECIALISTS[0];
  const activeTrips = MOCK_TRIPS.filter((t) => guide.activeExperienceIds?.includes(t.id));

  // Calendar logic
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const [showStatus, setShowStatus] = useState(false);
  const [statusConfig, setStatusConfig] = useState({ type: 'success', title: '', message: '' });

  const triggerStatus = (type, title, message) => {
    setStatusConfig({ type, title, message });
    setShowStatus(true);
  };

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(i);
    return days;
  }, [currentDate]);

  const isDateBlocked = (day) => {
    if (!day) return false;
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return guide.availability?.blockedDates.includes(dateStr);
  };

  const hasTripOnDate = (day) => {
    if (!day) return false;
    // For demo purposes, let's say Kofi has a fixed trip on the 12th
    return day === 12 && guide.id === 'g1';
  };

  const handleDateClick = (day) => {
    if (!day) return;

    // Past dates check
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      triggerStatus(
        'failed',
        'Date Unavailable',
        'Experiences cannot be requested for past dates. Please select a future date to begin your adventure.'
      );
      return;
    }

    if (isDateBlocked(day) || hasTripOnDate(day)) {
      triggerStatus(
        'failed',
        'Date Fully Booked',
        'This specific date is currently unavailable or blocked. Please select an open date on the calendar for your private request.'
      );
      return;
    }

    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setShowRequestModal(true);
  };

  // Form State
  const [requestForm, setRequestForm] = useState({
    title: '',
    type: 'Safari',
    location: guide.location,
    description: '',
    participants: 1,
    durationDays: 1,
    accommodation: 'None',
    transport: 'None',
    food: false,
  });

  const handleSubmitRequest = () => {
    triggerStatus(
      'success',
      'Request Dispatched',
      `Your private request has been successfully sent to ${guide.name}! You will receive a notification as soon as they review your inquiry and prepare a custom offer.`
    );
    setShowRequestModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-brand-warm/10 pt-32 pb-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <Link
          href="/guides"
          className="inline-flex items-center text-sm font-bold text-brand-earth/40 hover:text-brand-earth mb-12"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to All Guides
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card rounded-[48px] p-10 text-center border border-brand-earth/5">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src={guide.profilePhoto}
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-2xl"
                  alt={guide.name}
                />
                <div className="absolute -bottom-1 -right-1 bg-brand-teal text-white p-2 rounded-full border-2 border-white shadow-lg">
                  <BadgeCheck className="w-4 h-4" />
                </div>
              </div>

              <h1 className="font-serif text-3xl mb-2">{guide.name}</h1>
              <div className="flex items-center justify-center text-xs text-brand-earth/40 mb-6">
                <MapPin className="w-3 h-3 mr-1" /> {guide.location}
              </div>

              <div className="grid grid-cols-3 gap-4 border-y border-brand-earth/5 py-6 mb-8">
                <div>
                  <p className="text-[9px] uppercase font-bold text-brand-earth/30 mb-1">Rating</p>
                  <p className="font-serif text-xl text-brand-saffron flex items-center justify-center">
                    <Star className="w-4 h-4 fill-current mr-1" /> {guide.rating}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-brand-earth/30 mb-1">Exp.</p>
                  <p className="font-serif text-xl">{guide.completedTrips}+</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-brand-earth/30 mb-1">Reply</p>
                  <p className="font-serif text-xl">{guide.responseTime}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/messages"
                  className="flex-1 bg-brand-warm text-brand-earth py-4 rounded-2xl font-bold text-sm flex items-center justify-center hover:bg-brand-earth/5 transition-all"
                >
                  <MessageSquare className="w-4 h-4 mr-2" /> Quick Chat
                </Link>
                <button className="flex-1 bg-brand-earth text-white py-4 rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-xl">
                  Share
                </button>
              </div>
            </div>

            <div className="glass-card rounded-[40px] p-8 space-y-6">
              <h3 className="font-serif text-2xl">About</h3>
              <p className="text-sm text-brand-earth/60 leading-relaxed border-l-4 border-brand-teal/20 pl-4">
                "{guide.description}"
              </p>
              <div className="space-y-4">
                <p className="text-[10px] uppercase font-bold tracking-widest text-brand-earth/40">
                  Verified Credentials
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-xs text-brand-earth/80">
                    <CheckCircle2 className="w-4 h-4 mr-3 text-brand-teal" /> National Guide License
                  </div>
                  <div className="flex items-center text-xs text-brand-earth/80">
                    <CheckCircle2 className="w-4 h-4 mr-3 text-brand-teal" /> Wilderness First Aid
                    Cert.
                  </div>
                  <div className="flex items-center text-xs text-brand-earth/80">
                    <CheckCircle2 className="w-4 h-4 mr-3 text-brand-teal" /> Public Liability
                    Insurance
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Experience Calendar */}
            <section className="glass-card rounded-[48px] p-10 border border-brand-earth/5 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-serif text-3xl mb-1 text-brand-earth">
                    Availability & Custom Requests
                  </h2>
                  <p className="text-xs text-brand-earth/40 font-bold uppercase tracking-widest">
                    Select an open date to request a private experience
                  </p>
                </div>
                <div className="flex items-center space-x-4 bg-brand-warm rounded-full px-4 py-2 border border-brand-earth/5">
                  <button
                    onClick={() =>
                      setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
                    }
                  >
                    <ChevronLeft className="w-5 h-5 text-brand-earth/40 hover:text-brand-earth" />
                  </button>
                  <span className="text-sm font-bold min-w-[120px] text-center">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))
                    }
                  >
                    <ChevronRight className="w-5 h-5 text-brand-earth/40 hover:text-brand-earth" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 md:gap-4 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <div
                    key={d}
                    className="text-center text-[10px] uppercase font-black text-brand-earth/20 tracking-tighter md:tracking-widest py-4"
                  >
                    {d}
                  </div>
                ))}
                {daysInMonth.map((day, idx) => {
                  const tripOnDate = day ? hasTripOnDate(day) : false;
                  const blocked = day ? isDateBlocked(day) : false;

                  return (
                    <div
                      key={idx}
                      onClick={() => day && handleDateClick(day)}
                      className={`aspect-square md:h-24 rounded-2xl md:rounded-3xl p-2 md:p-4 border transition-all flex flex-col justify-between cursor-pointer ${
                        !day
                          ? 'bg-transparent border-transparent'
                          : tripOnDate
                            ? 'bg-brand-teal/10 border-brand-teal/30 ring-1 ring-brand-teal'
                            : blocked
                              ? 'bg-brand-earth/5 border-brand-earth/5 opacity-50 grayscale'
                              : 'bg-white border-brand-earth/5 hover:border-brand-teal hover:shadow-lg'
                      }`}
                    >
                      {day && (
                        <>
                          <span
                            className={`text-xs md:text-sm font-bold ${tripOnDate ? 'text-brand-teal' : blocked ? 'text-brand-earth/20' : 'text-brand-earth'}`}
                          >
                            {day}
                          </span>
                          {tripOnDate && (
                            <div className="hidden md:block text-[8px] bg-brand-teal text-white p-1 rounded font-bold uppercase truncate">
                              Active Group Trip
                            </div>
                          )}
                          {blocked && (
                            <div className="hidden md:block text-[8px] text-brand-earth/40 font-bold uppercase">
                              Blocked
                            </div>
                          )}
                          {!blocked && !tripOnDate && day && (
                            <div className="hidden md:flex items-center justify-center h-full opacity-0 group-hover:opacity-100">
                              <PlusIcon className="w-5 h-5 text-brand-teal" />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-brand-earth/5">
                <div className="flex items-center text-[10px] font-bold text-brand-earth/40 uppercase tracking-widest">
                  <div className="w-3 h-3 bg-white border border-brand-earth/10 rounded mr-2" />{' '}
                  Open For Requests
                </div>
                <div className="flex items-center text-[10px] font-bold text-brand-earth/40 uppercase tracking-widest">
                  <div className="w-3 h-3 bg-brand-teal/20 border border-brand-teal/30 rounded mr-2" />{' '}
                  Leading Group Experience
                </div>
                <div className="flex items-center text-[10px] font-bold text-brand-earth/40 uppercase tracking-widest">
                  <div className="w-3 h-3 bg-brand-earth/10 rounded mr-2" /> Fully Blocked
                </div>
              </div>
            </section>

            {/* Active Group Experiences */}
            <section className="space-y-8">
              <h2 className="font-serif text-3xl">Official Group Experiences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {activeTrips.map((trip) => (
                  <Link
                    key={trip.id}
                    href={`/trip/${trip.id}`}
                    className="glass-card rounded-[40px] overflow-hidden group shadow-lg hover:shadow-2xl transition-all border border-brand-earth/5"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={trip.coverImage}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={trip.title}
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-brand-earth shadow-sm">
                        {trip.experienceType}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-serif text-xl mb-2">{trip.title}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-teal font-bold text-sm">{trip.duration}</span>
                        <span className="text-xs font-bold text-brand-earth/40">
                          From {trip.price.currency} {trip.price.local.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      <AnimatePresence>
        {showRequestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div
              className="absolute inset-0 bg-brand-earth/60 backdrop-blur-sm"
              onClick={() => setShowRequestModal(false)}
            />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[48px] p-10 md:p-16 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="font-serif text-4xl mb-2">Request Private Experience</h2>
                  <p className="text-sm text-brand-earth/40 font-bold uppercase tracking-widest">
                    For {new Date(selectedDate).toLocaleDateString('en-US', { dateStyle: 'long' })}
                  </p>
                </div>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="p-4 bg-brand-warm rounded-2xl"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                      Experience Title
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all"
                      placeholder="e.g. Intimate Mountain Hike"
                      value={requestForm.title}
                      onChange={(e) => setRequestForm({ ...requestForm, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                        Type
                      </label>
                      <select
                        className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none bg-white font-bold text-xs"
                        value={requestForm.type}
                        onChange={(e) => setRequestForm({ ...requestForm, type: e.target.value })}
                      >
                        <option>Safari</option>
                        <option>Hiking</option>
                        <option>Cultural</option>
                        <option>Beach</option>
                        <option>Adventure</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                        Duration (Days)
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all font-bold text-xs"
                        value={requestForm.durationDays}
                        onChange={(e) =>
                          setRequestForm({
                            ...requestForm,
                            durationDays: parseInt(e.target.value) || 1,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none"
                      value={requestForm.location}
                      onChange={(e) => setRequestForm({ ...requestForm, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                      Description & Goals
                    </label>
                    <textarea
                      className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none h-32 focus:border-brand-teal"
                      placeholder="Describe what you want to experience..."
                      value={requestForm.description}
                      onChange={(e) =>
                        setRequestForm({ ...requestForm, description: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="p-6 bg-brand-warm/30 rounded-[32px] space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-brand-earth/40" />
                        <span className="text-xs font-bold">Participants</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            setRequestForm({
                              ...requestForm,
                              participants: Math.max(1, requestForm.participants - 1),
                            })
                          }
                          className="w-8 h-8 rounded-full border border-brand-earth/10 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="font-bold">{requestForm.participants}</span>
                        <button
                          onClick={() =>
                            setRequestForm({
                              ...requestForm,
                              participants: requestForm.participants + 1,
                            })
                          }
                          className="w-8 h-8 rounded-full border border-brand-earth/10 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="h-[1px] bg-brand-earth/5" />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Home className="w-5 h-5 text-brand-earth/40" />
                          <span className="text-xs font-bold">Accommodation Needed?</span>
                        </div>
                        <select
                          className="p-2 border rounded-xl text-[10px] font-bold"
                          value={requestForm.accommodation}
                          onChange={(e) =>
                            setRequestForm({ ...requestForm, accommodation: e.target.value })
                          }
                        >
                          <option>None</option>
                          <option>Budget Camp</option>
                          <option>Mid-range Hotel</option>
                          <option>Luxury Lodge</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Truck className="w-5 h-5 text-brand-earth/40" />
                          <span className="text-xs font-bold">Transportation Support?</span>
                        </div>
                        <select
                          className="p-2 border rounded-xl text-[10px] font-bold"
                          value={requestForm.transport}
                          onChange={(e) =>
                            setRequestForm({ ...requestForm, transport: e.target.value })
                          }
                        >
                          <option>None</option>
                          <option>Private SUV</option>
                          <option>Shared Van</option>
                          <option>Sea/Boat Transfer</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Coffee className="w-5 h-5 text-brand-earth/40" />
                          <span className="text-xs font-bold">Food Inclusive?</span>
                        </div>
                        <button
                          onClick={() =>
                            setRequestForm({ ...requestForm, food: !requestForm.food })
                          }
                          className={`w-10 h-6 rounded-full transition-all relative ${requestForm.food ? 'bg-brand-teal' : 'bg-brand-earth/20'}`}
                        >
                          <div
                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${requestForm.food ? 'right-0.5' : 'left-0.5'}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-brand-teal bg-brand-teal/5 rounded-[32px]">
                    <div className="flex items-start space-x-3 text-brand-teal">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <p className="text-[10px] font-bold uppercase leading-relaxed">
                        Your request is non-binding. Guide will review and send a custom price offer
                        which you can then accept or negotiate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmitRequest}
                className="w-full bg-brand-earth text-white py-6 rounded-full font-bold text-xl shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center"
              >
                <Send className="w-6 h-6 mr-3" /> Send Request to {guide.name}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <StatusModal
        isOpen={showStatus}
        onClose={() => setShowStatus(false)}
        type={statusConfig.type}
        title={statusConfig.title}
        message={statusConfig.message}
      />
    </motion.div>
  );
}

function Plus({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function X({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
