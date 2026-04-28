'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Camera,
  ChevronRight,
  CheckCircle,
  Globe,
  ShieldCheck,
  Sparkles,
  Home,
  Truck,
  Coffee,
  List,
  AlertTriangle,
  Info,
  Plus,
  X,
  Calendar,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { MOCK_TRIPS } from '@/mockData';
import StatusModal from '@/components/StatusModal';

export default function CreateExperience() {
  const { id } = useParams();
  const router = useRouter();
  const location = usePathname();
  const [step, setStep] = useState(1);
  const [isPromoted, setIsPromoted] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [statusConfig, setStatusConfig] = useState({ type: 'success', title: '', message: '' });

  const triggerStatus = (type, title, message) => {
    setStatusConfig({ type, title, message });
    setShowStatus(true);
  };

  // States for details
  const [title, setTitle] = useState('');
  const [cityLocation, setCityLocation] = useState('');
  const [description, setDescription] = useState('');
  const currentExperienceTypes = [
    'Adventure',
    'Excursion',
    'Pilgrimage',
    'Research',
    'Educational',
    'Cultural',
    'Others',
  ];
  const [experienceType, setExperienceType] = useState('Adventure');
  const [foodPackages, setFoodPackages] = useState([
    { id: '1', name: 'Standard Breakfast', price: 0, isIncluded: true },
  ]);
  const [activities, setActivities] = useState([
    { id: '1', name: 'City Walk', description: 'Explore local markets' },
  ]);
  const [itinerary, setItinerary] = useState(['Day 1: Arrival and orientation']);

  const [groupType, setGroupType] = useState('Individual Travelers');
  const [duration, setDuration] = useState('5 Days');
  const [difficulty, setDifficulty] = useState('Moderate');
  const [bookingCutoffDays, setBookingCutoffDays] = useState(2);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('18:00');
  const [bookingDeadlineDate, setBookingDeadlineDate] = useState('');
  const [bookingDeadlineTime, setBookingDeadlineTime] = useState('23:59');
  const [isSpecificDate, setIsSpecificDate] = useState(true);
  const [requiredEquipment, setRequiredEquipment] = useState(['Hiking Boots', 'Water Bottle']);
  const [transportMeans, setTransportMeans] = useState('Road');
  const [emergencyProviders, setEmergencyProviders] = useState([
    { id: '1', name: '', sector: 'Health', email: '', phone: '' },
  ]);

  useEffect(() => {
    if (id) {
      const trip = MOCK_TRIPS.find((t) => t.id === id);
      if (trip) {
        setTitle(trip.title);
        setCityLocation(`${trip.location.city}, ${trip.location.country}`);
        setDescription(trip.description || '');
        setExperienceType(trip.experienceType);
        setGroupType(trip.groupType);
        setDuration(trip.duration);
        setDifficulty(trip.difficulty);
        setRequiredEquipment(trip.requiredEquipment || []);
        if (trip.startDate) {
          const sd = new Date(trip.startDate);
          setStartDate(sd.toISOString().split('T')[0]);
          setStartTime(sd.toTimeString().split(' ')[0].substring(0, 5));
          setIsSpecificDate(true);
        } else {
          setIsSpecificDate(false);
        }
        if (trip.endDate) {
          const ed = new Date(trip.endDate);
          setEndDate(ed.toISOString().split('T')[0]);
          setEndTime(ed.toTimeString().split(' ')[0].substring(0, 5));
        }
        if (trip.bookingDeadline) {
          const bd = new Date(trip.bookingDeadline);
          setBookingDeadlineDate(bd.toISOString().split('T')[0]);
          setBookingDeadlineTime(bd.toTimeString().split(' ')[0].substring(0, 5));
        }
        if (trip.transportMeans) {
          setTransportMeans(trip.transportMeans);
        }
      }
    }
  }, [id]);

  const handlePublish = () => {
    triggerStatus(
      'success',
      id ? 'Update Successful' : 'Listing Published',
      id
        ? 'Your experience has been updated and remains live on the platform.'
        : 'Your experience has been successfully submitted for review. Our curation team will check the details and notify you once it goes live (usually within 12-24 hours).'
    );
  };

  const addFoodPackage = () => {
    setFoodPackages([
      ...foodPackages,
      { id: Date.now().toString(), name: '', price: 0, isIncluded: false },
    ]);
  };

  const addActivity = () => {
    setActivities([...activities, { id: Date.now().toString(), name: '', description: '' }]);
  };

  const addItineraryDay = () => {
    setItinerary([...itinerary, `Day ${itinerary.length + 1}: `]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-6 py-5 md:py-18"
    >
      <div className="text-center mb-16">
        <h1 className="font-serif text-3xl md:text-5xl mb-4 text-brand-earth">
          {id ? 'Edit Experience' : 'Create New Experience'}
        </h1>
        <p className="text-brand-earth/60">
          {id
            ? 'Update your listing details and schedule.'
            : 'Upload your unique tour or activity for travelers to discover.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        {['Basics', 'Inclusions', 'Pricing', 'Review'].map((s, idx) => (
          <div key={s} className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step > idx ? 'bg-brand-teal text-white' : step === idx + 1 ? 'bg-brand-earth text-white' : 'bg-brand-earth/10 text-brand-earth/30'}`}
            >
              {step > idx + 1 ? '✓' : idx + 1}
            </div>
            <span
              className={`text-[10px] uppercase font-bold tracking-widest ${step === idx + 1 ? 'text-brand-earth' : 'text-brand-earth/30'}`}
            >
              {s}
            </span>
            {idx < 3 && <div className="hidden md:block h-[1px] flex-1 bg-brand-earth/10" />}
          </div>
        ))}
      </div>

      <div className="glass-card rounded-3xl md:rounded-[40px] p-6 md:p-8">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h2 className="font-serif text-3xl">Experience Basics</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Experience Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                  placeholder="e.g. 5-Day Serengeti Migration Safari"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                    Location (City, Country)
                  </label>
                  <input
                    type="text"
                    value={cityLocation}
                    onChange={(e) => setCityLocation(e.target.value)}
                    className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                    placeholder="e.g. Arusha, Tanzania"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                    Experience Type
                  </label>
                  <select
                    value={experienceType}
                    onChange={(e) => setExperienceType(e.target.value)}
                    className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none appearance-none bg-white"
                  >
                    {currentExperienceTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Detailed Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none h-32"
                  placeholder="Tell travelers what makes this experience special..."
                ></textarea>
              </div>

              <div className="p-4 md:p-8 bg-brand-warm rounded-2xl md:rounded-[40px] border border-brand-earth/5">
                <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between mb-4 md:mb-8">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-brand-teal" />
                    <h3 className="font-serif text-2xl">Experience Timing</h3>
                  </div>
                  <div className="flex bg-white p-1 rounded-full border border-brand-earth/10">
                    <button
                      onClick={() => setIsSpecificDate(true)}
                      className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${isSpecificDate ? 'bg-brand-earth text-white' : 'text-brand-earth/40 hover:text-brand-earth'}`}
                    >
                      Fixed Date
                    </button>
                    <button
                      onClick={() => setIsSpecificDate(false)}
                      className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${!isSpecificDate ? 'bg-brand-earth text-white' : 'text-brand-earth/40 hover:text-brand-earth'}`}
                    >
                      Flexible/On-Demand
                    </button>
                  </div>
                </div>

                {isSpecificDate ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 flex items-center space-x-2 text-brand-earth mb-2">
                      <h3 className="font-serif text-xl underline decoration-brand-teal/30 underline-offset-8">
                        Experience Schedule
                      </h3>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 font-mono">
                        Start Date & Time
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="p-4 rounded-xl border border-brand-earth/10 outline-none text-sm bg-white"
                        />

                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="p-4 rounded-xl border border-brand-earth/10 outline-none text-sm bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 font-mono">
                        End Date & Time (Optional)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="p-4 rounded-xl border border-brand-earth/10 outline-none text-sm bg-white"
                        />

                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="p-4 rounded-xl border border-brand-earth/10 outline-none text-sm bg-white"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 pt-4 border-t border-brand-earth/10">
                      <div className="flex items-center space-x-2 text-brand-earth mb-6">
                        <Clock className="w-5 h-5 text-brand-coral" />
                        <h3 className="font-serif text-xl underline decoration-brand-coral/30 underline-offset-8">
                          Booking Deadline
                        </h3>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 font-mono">
                          Cut-off Date & Time
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="date"
                              value={bookingDeadlineDate}
                              onChange={(e) => setBookingDeadlineDate(e.target.value)}
                              className="p-4 rounded-xl border border-brand-earth/10 outline-none text-sm bg-white font-bold text-brand-coral"
                            />

                            <input
                              type="time"
                              value={bookingDeadlineTime}
                              onChange={(e) => setBookingDeadlineTime(e.target.value)}
                              className="p-4 rounded-xl border border-brand-earth/10 outline-none text-sm bg-white font-bold text-brand-coral"
                            />
                          </div>
                          <div className="p-4 bg-brand-coral/5 rounded-2xl flex items-start space-x-3">
                            <AlertTriangle className="w-4 h-4 text-brand-coral shrink-0 mt-0.5" />
                            <p className="text-[10px] text-brand-earth/60 leading-relaxed italic">
                              Once this deadline passes, you will no longer receive new bookings.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 bg-brand-teal/5 rounded-[32px] border border-brand-teal/20 text-center">
                    <Globe className="w-12 h-12 mx-auto text-brand-teal mb-4" />
                    <h4 className="font-serif text-xl mb-2">Open For Bookings</h4>
                    <p className="text-sm text-brand-earth/60 max-w-md mx-auto">
                      This experience will always be active. Travelers will choose their preferred
                      dates from your availability calendar during checkout.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Experience Itinerary (Step-by-step)
                </label>
                <div className="space-y-3">
                  {itinerary.map((item, idx) => (
                    <div key={idx} className="flex space-x-3">
                      <span className="w-8 h-8 rounded-full bg-brand-warm flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newIt = [...itinerary];
                          newIt[idx] = e.target.value;
                          setItinerary(newIt);
                        }}
                        className="flex-1 bg-transparent border-b border-brand-earth/10 outline-none text-sm py-1"
                      />
                    </div>
                  ))}
                  <button
                    onClick={addItineraryDay}
                    className="flex items-center text-[10px] font-bold text-brand-teal uppercase tracking-widest hover:opacity-70"
                  >
                    <Plus className="w-3 h-3 mr-1" /> Add Day
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Cover & Gallery Photos
                </label>
                <div className="border-2 border-dashed border-brand-earth/10 rounded-3xl p-12 text-center hover:border-brand-teal transition-all cursor-pointer group">
                  <Camera className="w-10 h-10 mx-auto text-brand-earth/20 mb-4 group-hover:text-brand-teal" />
                  <p className="text-sm font-bold text-brand-earth/40">
                    Upload high-quality experience photos (Min 3)
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-brand-earth text-white py-5 rounded-full font-bold flex items-center justify-center hover:bg-brand-earth/90 transition-all"
            >
              Next: Inclusions & Activities <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <h2 className="font-serif text-3xl">What's Included?</h2>

            {/* Accommodation */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 text-brand-earth">
                <Home className="w-6 h-6" />
                <h3 className="font-serif text-2xl">Accommodation</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                    Accommodation Type
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                    placeholder="e.g. Luxury Tent / Boutique Hotel"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <button className="w-10 h-10 rounded-full border border-brand-earth/10 flex items-center justify-center text-brand-teal">
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-brand-earth/40">
                    Upload Accommodation Pictures
                  </span>
                </div>
              </div>
            </section>

            {/* Transport */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 text-brand-earth">
                <Truck className="w-6 h-6" />
                <h3 className="font-serif text-2xl">Transport</h3>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Transport Means
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Flight', 'Road', 'Sea', 'Mixed'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTransportMeans(t)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        transportMeans === t
                          ? 'bg-brand-earth text-white border-brand-earth'
                          : 'border-brand-earth/10 text-brand-earth hover:bg-brand-earth/5'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Food */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 text-brand-earth">
                <Coffee className="w-6 h-6" />
                <h3 className="font-serif text-2xl">Food & Snacks</h3>
              </div>
              <div className="space-y-4">
                {foodPackages.map((pkg, idx) => (
                  <div
                    key={pkg.id}
                    className="p-4 bg-brand-warm rounded-2xl flex flex-wrap items-center space-x-4"
                  >
                    <input
                      type="text"
                      placeholder="Package name"
                      className="flex-1 bg-transparent text-sm font-bold outline-none"
                      defaultValue={pkg.name}
                    />
                    <input
                      type="number"
                      placeholder="Extra Cost"
                      className="w-32 bg-transparent text-sm outline-none"
                    />
                    <button className="text-brand-coral">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addFoodPackage}
                  className="flex items-center text-[10px] font-bold text-brand-teal uppercase tracking-widest"
                >
                  <Plus className="w-3 h-3 mr-1" /> Add Food Package
                </button>
              </div>
            </section>

            {/* Activities */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 text-brand-earth">
                <List className="w-6 h-6" />
                <h3 className="font-serif text-2xl">Trip Activities</h3>
              </div>
              <div className="space-y-4">
                {activities.map((act, i) => (
                  <div
                    key={act.id}
                    className="p-6 border border-brand-earth/10 rounded-2xl relative"
                  >
                    <button
                      onClick={() => setActivities(activities.filter((a) => a.id !== act.id))}
                      className="absolute top-4 right-4 text-brand-earth/20 hover:text-brand-coral"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <input
                      type="text"
                      placeholder="Activity name"
                      className="w-full mb-2 font-bold outline-none bg-transparent"
                    />
                    <textarea
                      placeholder="Briefly describe the activity..."
                      className="w-full text-xs bg-transparent outline-none h-16"
                    ></textarea>
                  </div>
                ))}
                <button
                  onClick={addActivity}
                  className="flex items-center text-[10px] font-bold text-brand-teal uppercase tracking-widest"
                >
                  <Plus className="w-3 h-3 mr-1" /> Add Activity
                </button>
              </div>
            </section>

            {/* Required Equipment */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 text-brand-earth">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="font-serif text-2xl">Required Equipment</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {requiredEquipment.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-brand-earth/5 px-4 py-2 rounded-xl text-xs font-bold text-brand-earth border border-brand-earth/10"
                  >
                    {item}
                    <button
                      onClick={() =>
                        setRequiredEquipment(requiredEquipment.filter((_, i) => i !== idx))
                      }
                      className="ml-2 hover:text-brand-coral"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Add item..."
                    className="bg-transparent border-b border-brand-earth/10 outline-none text-xs py-2 w-32 focus:w-48 transition-all"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = e.target.value.trim();
                        if (val) {
                          setRequiredEquipment([...requiredEquipment, val]);
                          e.target.value = '';
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </section>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-brand-earth/10 py-5 rounded-full font-bold hover:bg-brand-earth/5 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-[2] bg-brand-earth text-white py-5 rounded-full font-bold flex items-center justify-center hover:bg-brand-earth/90 transition-all"
              >
                Next: Pricing <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h2 className="font-serif text-3xl">Pricing & Targeting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Price (Local Currency)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                    placeholder="0.00"
                  />
                  <span className="absolute right-4 top-4 font-bold text-brand-earth/40">TZS</span>
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Target Group Type
                </label>
                <select
                  value={groupType}
                  onChange={(e) => setGroupType(e.target.value)}
                  className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none bg-white"
                >
                  <option>Individual Travelers</option>
                  <option>Private Groups (Families/Schools)</option>
                  <option>Shared (Mixed Travelers)</option>
                  <option>Couples Only</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                  placeholder="e.g. 5 Days"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none bg-white"
                >
                  <option>Easy</option>
                  <option>Moderate</option>
                  <option>Challenging</option>
                  <option>Expert</option>
                </select>
              </div>
              <div className="md:col-span-1">
                <div className="p-6 bg-brand-warm rounded-3xl border border-brand-earth/5">
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-4">
                    Logistics Preparation Time
                  </label>
                  <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
                    <input
                      type="range"
                      min="0"
                      max="7"
                      step="1"
                      value={bookingCutoffDays}
                      onChange={(e) => setBookingCutoffDays(parseInt(e.target.value))}
                      className="flex-1 w-full accent-brand-teal"
                    />

                    <div className="bg-white px-4 py-2 rounded-xl border border-brand-earth/10 text-center min-w-[120px]">
                      <span className="text-xl font-serif text-brand-teal italic">
                        {bookingCutoffDays}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-brand-earth/40 ml-2">
                        Days Before
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-[10px] text-brand-earth/50">
                    Stop accepting bookings {bookingCutoffDays} days before the experience start
                    date to allow for logistics preparation.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-brand-teal/5 rounded-2xl border border-brand-teal/10">
              <div className="flex items-start space-x-4">
                <Globe className="w-6 h-6 text-brand-teal" />
                <div>
                  <h4 className="font-bold text-brand-earth mb-1 text-sm">Currency Protection</h4>
                  <p className="text-xs text-brand-earth/60">
                    We automatically convert your local price to USD for global travelers using
                    real-time interbank rates.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-brand-earth/10 py-5 rounded-full font-bold hover:bg-brand-earth/5 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-[2] bg-brand-earth text-white py-5 rounded-full font-bold flex items-center justify-center hover:bg-brand-earth/90 transition-all"
              >
                Next: Review & Launch <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h2 className="font-serif text-3xl mb-8 text-brand-earth">Safety & Disclaimers</h2>
              <div className="space-y-6">
                <div>
                  <label className="flex items-center space-x-3 text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                    <AlertTriangle className="w-4 h-4 text-brand-coral" />
                    Cautions for Travelers
                  </label>
                  <textarea
                    className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none h-24 text-sm"
                    placeholder="e.g. Low oxygen levels at summit, carry warm clothing..."
                  ></textarea>
                </div>
                <div>
                  <label className="flex items-center space-x-3 text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                    <Info className="w-4 h-4 text-brand-earth" />
                    Disclaimers
                  </label>
                  <textarea
                    className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none h-24 text-sm"
                    placeholder="e.g. Weather may affect itinerary timing..."
                  ></textarea>
                </div>

                {/* Emergency Support Providers */}
                <div className="pt-8 border-t border-brand-earth/10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <ShieldCheck className="w-6 h-6 text-brand-teal" />
                      <h3 className="font-serif text-2xl">Emergency Support Providers</h3>
                    </div>
                    <button
                      onClick={() =>
                        setEmergencyProviders([
                          ...emergencyProviders,
                          {
                            id: Date.now().toString(),
                            name: '',
                            sector: 'Health',
                            email: '',
                            phone: '',
                          },
                        ])
                      }
                      className="flex items-center text-[10px] font-bold text-brand-teal uppercase tracking-widest"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Provider
                    </button>
                  </div>

                  <p className="text-xs text-brand-earth/60 mb-6 italic">
                    These organizations will receive instant alerts (SMS/Email) and emergency calls
                    if a traveler uses the{' '}
                    <span className="font-bold text-brand-coral">Panic Button</span> during your
                    adventure. Showcase and verify your safety provisions.
                  </p>

                  <div className="space-y-4">
                    {emergencyProviders.map((provider, idx) => (
                      <div
                        key={provider.id}
                        className="p-6 bg-brand-warm rounded-3xl border border-brand-earth/5 relative"
                      >
                        {emergencyProviders.length > 1 && (
                          <button
                            onClick={() =>
                              setEmergencyProviders(
                                emergencyProviders.filter((p) => p.id !== provider.id)
                              )
                            }
                            className="absolute top-4 right-4 text-brand-earth/20 hover:text-brand-coral"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[8px] uppercase font-bold tracking-widest text-brand-earth/40 mb-1 ml-2">
                              Organization Name
                            </label>
                            <input
                              type="text"
                              value={provider.name}
                              onChange={(e) => {
                                const newP = [...emergencyProviders];
                                newP[idx].name = e.target.value;
                                setEmergencyProviders(newP);
                              }}
                              className="w-full p-3 rounded-xl border border-brand-earth/10 outline-none text-sm bg-white"
                              placeholder="e.g. Arusha Med Center"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase font-bold tracking-widest text-brand-earth/40 mb-1 ml-2">
                              Sector
                            </label>
                            <select
                              value={provider.sector}
                              onChange={(e) => {
                                const newP = [...emergencyProviders];
                                newP[idx].sector = e.target.value;
                                setEmergencyProviders(newP);
                              }}
                              className="w-full p-3 rounded-xl border border-brand-earth/10 outline-none text-sm bg-white"
                            >
                              <option>Health</option>
                              <option>Security</option>
                              <option>Rescue</option>
                              <option>Insurance</option>
                              <option>Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase font-bold tracking-widest text-brand-earth/40 mb-1 ml-2">
                              Emergency Email
                            </label>
                            <input
                              type="email"
                              value={provider.email}
                              onChange={(e) => {
                                const newP = [...emergencyProviders];
                                newP[idx].email = e.target.value;
                                setEmergencyProviders(newP);
                              }}
                              className="w-full p-3 rounded-xl border border-brand-earth/10 outline-none text-sm bg-white"
                              placeholder="emergency@org.com"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase font-bold tracking-widest text-brand-earth/40 mb-1 ml-2">
                              Emergency Phone
                            </label>
                            <input
                              type="tel"
                              value={provider.phone}
                              onChange={(e) => {
                                const newP = [...emergencyProviders];
                                newP[idx].phone = e.target.value;
                                setEmergencyProviders(newP);
                              }}
                              className="w-full p-3 rounded-xl border border-brand-earth/10 outline-none text-sm bg-white"
                              placeholder="+255..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[1px] bg-brand-earth/10" />

            {/* Promotion Section */}
            <div className="space-y-6">
              <div className="text-center">
                <Sparkles className="w-12 h-12 mx-auto text-brand-saffron mb-4" />
                <h3 className="font-serif text-2xl">Boost Your Experience</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => setIsPromoted(false)}
                  className={`p-6 border-2 rounded-[32px] text-left transition-all ${!isPromoted ? 'border-brand-earth bg-brand-earth text-white shadow-xl' : 'border-brand-earth/10 hover:border-brand-earth/30'}`}
                >
                  <h4 className="font-serif text-xl mb-2">Regular</h4>
                  <p className="font-bold text-[10px]">FREE</p>
                </button>

                <button
                  onClick={() => setIsPromoted(true)}
                  className={`p-6 border-2 rounded-[32px] text-left transition-all relative overflow-hidden ${isPromoted ? 'border-brand-saffron bg-brand-saffron text-white shadow-xl' : 'border-brand-saffron/10 hover:border-brand-saffron/30'}`}
                >
                  <h4 className="font-serif text-xl mb-2 italic">Sponsored</h4>
                  <p className="font-bold text-[10px]">TSh 50,000 / Week</p>
                </button>
              </div>
            </div>

            <button
              onClick={handlePublish}
              className="w-full bg-brand-teal text-white py-6 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-all flex items-center justify-center"
            >
              <CheckCircle className="w-6 h-6 mr-3" />
              {id ? 'Update Experience Listing' : 'Launch Experience Now'}
            </button>
          </motion.div>
        )}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/guide/dashboard"
          className="text-sm font-bold text-brand-earth/40 hover:text-brand-earth transition-colors"
        >
          Cancel and return to Dashboard
        </Link>
      </div>

      <StatusModal
        isOpen={showStatus}
        onClose={() => {
          setShowStatus(false);
          router.push('/guide/dashboard');
        }}
        type={statusConfig.type}
        title={statusConfig.title}
        message={statusConfig.message}
        actionLabel="Go to Dashboard"
      />
    </motion.div>
  );
}
