'use client';
import { motion, AnimatePresence } from 'motion/react';

import {
  MOCK_TRIPS,
  MOCK_PRIVATE_REQUESTS,
  MOCK_SPECIALISTS,
  MOCK_BOOKINGS,
  MOCK_WISHLIST,
} from '@/mockData';
import {
  Calendar,
  MapPin,
  MessageSquare,
  Heart,
  Clock,
  CheckCircle,
  DollarSign,
  X,
  ChevronRight,
  Users,
  Truck,
  Home as HomeIcon,
  ShieldAlert,
  Sparkles,
  Activity,
  Star,
  ChevronDown,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import ChatList from '@/components/ChatList';
import StatusModal from '@/components/StatusModal';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get('tab') || 'trips';
  const [activeDashTab, setActiveDashTab] = useState(initialTab);
  const [requests, setRequests] = useState(MOCK_PRIVATE_REQUESTS);
  const [wishlist, setWishlist] = useState(MOCK_WISHLIST);
  const [showNegotiateModal, setShowNegotiateModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [negotiationMessage, setNegotiationMessage] = useState('');
  const [isCompleting, setIsCompleting] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showBookingDetails, setShowBookingDetails] = useState(false);

  // Independent Partner Management State
  const activeBooking = MOCK_BOOKINGS.find((b) => b.status === 'Active');
  const [fulfillmentStates, setFulfillmentStates] = useState(
    activeBooking?.fulfillment.map((f) => ({
      service: f.service,
      isCompleted: f.isFulfilled || false,
      isDisputed: false,
      fundsReleased: false,
      providerName: f.providerName,
      providerId: f.providerId,
    })) || []
  );

  const [activePartnerToReview, setActivePartnerToReview] = useState(null);
  const [activePartnerToDispute, setActivePartnerToDispute] = useState(null);
  const [disputeMessage, setDisputeMessage] = useState('');
  const [cancelType, setCancelType] = useState(null);

  // Status Modal State
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  });

  const triggerStatus = (type, title, message) => {
    setStatusModal({ isOpen: true, type, title, message });
  };

  const activeTrip = activeBooking ? MOCK_TRIPS.find((t) => t.id === activeBooking.tripId) : null;

  const handlePartnerAction = (service, action) => {
    setFulfillmentStates((prev) =>
      prev.map((f) => {
        if (f.service === service) {
          if (action === 'complete') {
            setActivePartnerToReview(f);
            setShowReviewModal(true);
            // Don't mark as completed here yet, do it in submitReview
            return f;
          }
          if (action === 'dispute') {
            setActivePartnerToDispute(f);
            setShowDisputeModal(true);
            return f;
          }
          if (action === 'release') {
            triggerStatus(
              'success',
              'Funds Released',
              `Your payment has been successfully disbursed to ${f.providerName} (${f.service}).`
            );
            return { ...f, fundsReleased: true };
          }
        }
        return f;
      })
    );
  };

  const submitReview = (rating, comment) => {
    if (!activePartnerToReview) return;
    setFulfillmentStates((prev) =>
      prev.map((f) =>
        f.service === activePartnerToReview.service ? { ...f, isCompleted: true, rating } : f
      )
    );
    setShowReviewModal(false);
    setActivePartnerToReview(null);
    triggerStatus(
      'success',
      'Review Submitted',
      'Thank you for your feedback! Funds for this service are now authorized for release.'
    );
  };

  const submitDispute = () => {
    if (!activePartnerToDispute) return;
    setFulfillmentStates((prev) =>
      prev.map((f) =>
        f.service === activePartnerToDispute.service ? { ...f, isDisputed: true } : f
      )
    );
    setShowDisputeModal(false);
    setActivePartnerToDispute(null);
    triggerStatus(
      'success',
      'Dispute Raised',
      'Our team will review the case and get back to you within 24 hours. The escrow funds for this service are now locked.'
    );
  };

  const handleCancelBooking = (type) => {
    setCancelType(type);
    setShowCancelModal(true);
  };

  const confirmCancellation = () => {
    triggerStatus(
      'success',
      'Booking Cancelled',
      `${cancelType === 'All' ? 'Your entire journey' : 'Your ' + cancelType + ' booking'} has been successfully cancelled. Relevant partners have been notified.`
    );
    setShowCancelModal(false);
  };

  const handleAction = (id, action) => {
    if (action === 'Negotiate') {
      const r = requests.find((req) => req.id === id);
      if (r) {
        setSelectedRequest(r);
        setNegotiationMessage('');
        setShowNegotiateModal(true);
      }
      return;
    }

    triggerStatus(
      'success',
      `${action} Successful`,
      `You have successfully ${action.toLowerCase()}ed the offer for ${requests.find((r) => r.id === id)?.title}.`
    );
    if (action === 'Accept') {
      setRequests(requests.map((r) => (r.id === id ? { ...r, status: 'Confirmed' } : r)));
    } else {
      setRequests(requests.filter((r) => r.id !== id));
    }
  };

  const submitNegotiation = () => {
    if (!selectedRequest) return;
    setRequests(
      requests.map((r) =>
        r.id === selectedRequest.id
          ? { ...r, status: 'Pending', statusNote: 'Negotiating: ' + negotiationMessage }
          : r
      )
    );
    setShowNegotiateModal(false);
    setSelectedRequest(null);
    triggerStatus(
      'success',
      'Negotiation Sent',
      'Your counter-offer/negotiation message has been sent to the guide.'
    );
  };

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['trips', 'private', 'messages', 'wishlist', 'settings'].includes(tab)) {
      setActiveDashTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveDashTab(tab);
    router.push(`?tab=${tab}`);
  };

  const wishlistTrips = wishlist.map((item) => {
    const trip = MOCK_TRIPS.find((t) => t.id === item.tripId);
    return { ...trip, expiryDate: item.expiryDate };
  });

  const removeFromWishlist = (tripId) => {
    setWishlist(wishlist.filter((item) => item.tripId !== tripId));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 md:px-6 pt-5 md:pt-18 pb-12 md:pb-20"
    >
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 space-y-6 md:space-y-8">
          <div className="flex flex-row lg:flex-col items-center lg:items-start text-left gap-4 lg:gap-0">
            <div className="relative inline-block lg:mb-4">
              <img
                src="https://picsum.photos/seed/user1/200/200"
                className="w-20 h-20 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-xl"
                alt="profile"
              />
              <div className="absolute bottom-1 right-1 w-4 h-4 lg:w-6 lg:h-6 bg-brand-teal rounded-full border-2 border-white" />
            </div>
            <div>
              <h2 className="font-serif text-2xl lg:text-3xl text-brand-earth leading-tight">Pelu Yusuf</h2>
              <p className="text-[10px] text-brand-earth/40 font-bold uppercase tracking-widest mt-1">
                Lagos, Nigeria
              </p>
            </div>
          </div>

          <nav className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4">
            <button
              onClick={() => handleTabChange('trips')}
              className={`block w-full text-left px-4 lg:px-6 py-3 rounded-xl text-xs lg:text-sm font-bold transition-all ${activeDashTab === 'trips' ? 'bg-brand-earth text-white' : 'text-brand-earth/60 hover:bg-brand-earth/5'}`}
            >
              My Trips
            </button>
            <button
              onClick={() => handleTabChange('private')}
              className={`block w-full text-left px-4 lg:px-6 py-3 rounded-xl text-xs lg:text-sm font-bold transition-all ${activeDashTab === 'private' ? 'bg-brand-earth text-white' : 'text-brand-earth/60 hover:bg-brand-earth/5'}`}
            >
              Private Requests
            </button>
            <button
              onClick={() => handleTabChange('messages')}
              className={`block w-full text-left px-4 lg:px-6 py-3 rounded-xl text-xs lg:text-sm font-bold transition-all ${activeDashTab === 'messages' ? 'bg-brand-earth text-white' : 'text-brand-earth/60 hover:bg-brand-earth/5'}`}
            >
              Messages
            </button>
            <button
              onClick={() => handleTabChange('wishlist')}
              className={`block w-full text-left px-4 lg:px-6 py-3 rounded-xl text-xs lg:text-sm font-bold transition-all ${activeDashTab === 'wishlist' ? 'bg-brand-earth text-white' : 'text-brand-earth/60 hover:bg-brand-earth/5'}`}
            >
              Wishlist
            </button>
            <button
              onClick={() => handleTabChange('settings')}
              className={`block w-full text-left px-4 lg:px-6 py-3 rounded-xl text-xs lg:text-sm font-bold transition-all ${activeDashTab === 'settings' ? 'bg-brand-earth text-white' : 'text-brand-earth/60 hover:bg-brand-earth/5'}`}
            >
              Settings
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-12">
          {activeDashTab === 'trips' ? (
            <>
              {/* Ongoing Adventure Section */}
              {activeBooking && activeTrip && (
                <section>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-brand-teal/10 rounded-lg">
                      <Activity className="w-5 h-5 text-brand-teal" />
                    </div>
                    <h3 className="font-serif text-3xl text-brand-earth">Ongoing Adventure</h3>
                  </div>

                  <div className="glass-card rounded-3xl md:rounded-[48px] p-6 md:p-12 border-2 border-brand-teal/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full -mr-16 -mt-16 blur-2xl" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
                      <div className="space-y-6 text-brand-earth">
                        <div>
                          <h4 className="font-serif text-3xl md:text-4xl mb-2">{activeTrip.title}</h4>
                          <p className="text-xs md:text-sm text-brand-earth/60 font-medium">
                            Landed at {activeBooking.startDate} • Kilimanjaro Region
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h5 className="text-[10px] font-bold uppercase tracking-widest text-brand-earth/40">
                            Fulfillment Status & Independent Actions
                          </h5>
                          <div className="grid gap-3">
                            {fulfillmentStates.map((f, i) => (
                              <div
                                key={i}
                                className={`p-5 rounded-3xl border transition-all ${f.isDisputed ? 'border-red-200 bg-red-50' : 'bg-white/50 border-brand-earth/5'}`}
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center space-x-3">
                                    <div
                                      className={`p-2 rounded-lg ${f.isCompleted ? 'bg-brand-teal/10 text-brand-teal' : 'bg-brand-earth/5 text-brand-earth/20'}`}
                                    >
                                      {f.service === 'Ride' && <Truck className="w-4 h-4" />}
                                      {f.service === 'Stay' && <HomeIcon className="w-4 h-4" />}
                                      {f.service === 'Experience' && (
                                        <Sparkles className="w-4 h-4" />
                                      )}
                                    </div>
                                    <div>
                                      <span className="text-sm font-bold block">{f.service}</span>
                                      <span className="text-[10px] text-brand-earth/40">
                                        {f.providerName}
                                      </span>
                                    </div>
                                  </div>
                                  {f.isCompleted ? (
                                    <div className="flex items-center text-brand-teal text-[10px] font-bold uppercase tracking-widest">
                                      <CheckCircle className="w-4 h-4 mr-1" /> Completed
                                    </div>
                                  ) : f.isDisputed ? (
                                    <div className="flex items-center text-red-500 text-[10px] font-bold uppercase tracking-widest">
                                      <ShieldAlert className="w-4 h-4 mr-1" /> Disputed
                                    </div>
                                  ) : (
                                    <div className="flex items-center text-amber-500 text-[10px] font-bold uppercase tracking-widest">
                                      <Clock className="w-4 h-4 mr-1" /> Ongoing
                                    </div>
                                  )}
                                </div>

                                {!f.fundsReleased && (
                                  <div className="flex gap-2 pt-2 border-t border-brand-earth/5">
                                    {!f.isCompleted && !f.isDisputed && (
                                      <>
                                        <button
                                          onClick={() => handlePartnerAction(f.service, 'complete')}
                                          className="flex-1 py-2 bg-brand-teal/10 text-brand-teal rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-teal hover:text-white transition-all"
                                        >
                                          Mark Complete
                                        </button>
                                        <button
                                          onClick={() => handlePartnerAction(f.service, 'dispute')}
                                          className="flex-1 py-2 bg-red-100 text-red-500 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                                        >
                                          Raise Dispute
                                        </button>
                                      </>
                                    )}
                                    {f.isCompleted && !f.fundsReleased && (
                                      <button
                                        onClick={() => handlePartnerAction(f.service, 'release')}
                                        className="w-full py-2 bg-brand-earth text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-teal transition-all flex items-center justify-center"
                                      >
                                        <DollarSign className="w-3 h-3 mr-1" /> Release Funds
                                      </button>
                                    )}
                                    {f.isDisputed && (
                                      <button
                                        className="w-full py-2 bg-brand-earth/5 text-brand-earth/40 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-not-allowed italic"
                                        disabled
                                      >
                                        Escrow Funds Locked (In Review)
                                      </button>
                                    )}
                                  </div>
                                )}
                                {f.fundsReleased && (
                                  <div className="py-2 text-center bg-brand-teal/5 rounded-full text-[10px] font-bold text-brand-teal uppercase tracking-widest">
                                    Funds Released
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between text-brand-earth">
                        <div className="p-8 bg-brand-teal/5 rounded-[40px] border border-brand-teal/10 mb-8">
                          <div className="flex items-center space-x-3 mb-4">
                            <DollarSign className="w-6 h-6 text-brand-teal" />
                            <h5 className="font-bold text-brand-earth">Escrow Protection Active</h5>
                          </div>
                          <p className="text-xs text-brand-earth/60 leading-relaxed">
                            Your payment is held securely in escrow. Mark the adventure as complete
                            once you are satisfied with all services to disburse funds.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                triggerStatus(
                                  'failed',
                                  'Panic Alert Sent',
                                  'CRITICAL: Tracking active. Nearby security and local authorities have been notified of your location.'
                                )
                              }
                              className="flex-1 py-4 bg-brand-coral/10 text-brand-coral border border-brand-coral/20 rounded-full font-bold text-sm hover:bg-brand-coral hover:text-white transition-all flex items-center justify-center"
                            >
                              <ShieldAlert className="w-4 h-4 mr-2" /> Panic
                            </button>
                            <Link
                              href={`/booking-details/${activeBooking.id}`}
                              className="flex-[2] py-4 bg-brand-earth text-white rounded-full font-bold text-sm shadow-xl flex items-center justify-center group"
                            >
                              Trip Dashboard{' '}
                              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all" />
                            </Link>
                          </div>
                          <button
                            onClick={() =>
                              triggerStatus(
                                'info',
                                'Completion Process',
                                'To complete the adventure and release funds, please mark each individual service (Ride, Stay, Experience) as complete in the sections below. This ensures all partners are verified independently.'
                              )
                            }
                            className="w-full py-4 border-2 border-brand-teal text-brand-teal bg-white rounded-full font-bold text-sm hover:bg-brand-teal hover:text-white transition-all shadow-sm"
                          >
                            How to Complete Adventure
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Upcoming Section */}
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-serif text-3xl text-brand-earth">Upcoming Adventures</h3>
                  <span className="text-xs font-bold text-brand-earth/40 uppercase tracking-widest">
                    1 Booking
                  </span>
                </div>

                <div className="glass-card rounded-3xl md:rounded-[40px] p-6 md:p-8 flex flex-col items-stretch text-brand-earth">
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <img
                      src={MOCK_TRIPS[1].coverImage}
                      className="w-full md:w-48 h-48 rounded-[32px] object-cover"
                      alt="trip"
                    />
                    <div className="flex-1 w-full">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                        <div>
                          <h4 className="font-serif text-2xl mb-1">{MOCK_TRIPS[1].title}</h4>
                          <div className="flex items-center text-xs text-brand-earth/40">
                            <MapPin className="w-3 h-3 mr-1" />
                            {MOCK_TRIPS[1].location.city}, {MOCK_TRIPS[1].location.country}
                          </div>
                        </div>
                        <div className="bg-brand-teal text-white text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full self-start">
                          Confirmed
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-brand-earth/10">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-brand-earth/40 uppercase font-bold tracking-widest mb-1 font-sans">
                            Date
                          </span>
                          <div className="flex items-center text-sm font-medium">
                            <Calendar className="w-3 h-3 mr-2 opacity-30" />
                            June 12, 2026
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-brand-earth/40 uppercase font-bold tracking-widest mb-1">
                              Guide
                            </span>
                            <div className="flex items-center text-sm font-medium">
                              <img
                                src={MOCK_SPECIALISTS[0].profilePhoto}
                                className="w-5 h-5 rounded-full mr-2"
                                alt="guide"
                              />
                              Kofi Mensah
                            </div>
                          </div>
                          <button className="p-3 bg-brand-teal/10 text-brand-teal rounded-full hover:bg-brand-teal hover:text-white transition-all">
                            <MessageSquare className="w-5 h-5" />
                          </button>
                        </div>
                        <div className=''>
                          <button
                            onClick={() => setShowBookingDetails(!showBookingDetails)}
                            className="w-full sm:w-auto flex items-center justify-center md:justify-start gap-2 px-6 py-3 bg-brand-earth text-white rounded-full text-sm font-bold shadow-lg"
                          >
                            Booking Details{' '}
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${showBookingDetails ? 'rotate-180' : ''}`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {showBookingDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6 pt-6 border-t border-brand-earth/5 ">
                          <div className="space-y-4">
                            <span className="text-[10px] text-brand-earth/40 uppercase font-bold tracking-widest font-sans">
                              Accommodation
                            </span>
                            <div className="p-4 bg-brand-warm rounded-2xl border border-brand-earth/5">
                              <p className="text-sm font-bold">Serengeti Luxury Camp</p>
                              <p className="text-[10px] opacity-60 mb-3">2 Rooms • Deluxe Suite</p>
                              <button
                                onClick={() => handleCancelBooking('Stay')}
                                className="w-full py-2 bg-red-100 text-red-500 rounded-lg text-[8px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                              >
                                Cancel Stay
                              </button>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <span className="text-[10px] text-brand-earth/40 uppercase font-bold tracking-widest font-sans">
                              Transport
                            </span>
                            <div className="p-4 bg-brand-warm rounded-2xl border border-brand-earth/5">
                              <p className="text-sm font-bold text-brand-teal">Zuberi Bakari</p>
                              <p className="text-[10px] opacity-60 mb-3">
                                Land Cruiser • Round Trip
                              </p>
                              <button
                                onClick={() => handleCancelBooking('Ride')}
                                className="w-full py-2 bg-red-100 text-red-500 rounded-lg text-[8px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                              >
                                Cancel Ride
                              </button>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <span className="text-[10px] text-brand-earth/40 uppercase font-bold tracking-widest font-sans">
                              Experience
                            </span>
                            <div className="p-4 bg-brand-warm rounded-2xl border border-brand-earth/5">
                              <p className="text-sm font-bold">Kilimanjaro Trek</p>
                              <p className="text-[10px] opacity-60 mb-3">5 Days • Full Board</p>
                              <button
                                onClick={() => handleCancelBooking('Experience')}
                                className="w-full py-2 bg-red-100 text-red-500 rounded-lg text-[8px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                              >
                                Cancel Experience
                              </button>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <span className="text-[10px] text-brand-earth/40 uppercase font-bold tracking-widest font-sans">
                              Trip Control
                            </span>
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => handleCancelBooking('All')}
                                className="w-full py-3 border border-red-500 text-red-500 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                              >
                                Cancel Entire Trip
                              </button>
                              {/* <button className="w-full py-3 bg-brand-earth text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-teal transition-all">
                                Modify Dates
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>

              {/* Past Trips / History */}
              <section>
                <h3 className="font-serif text-3xl mb-8 text-brand-earth">Travel History</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-brand-earth">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-6 p-4 rounded-3xl bg-brand-warm/30 border border-brand-earth/5 hover:border-brand-earth/20 transition-all cursor-pointer"
                    >
                      <img
                        src={`https://picsum.photos/seed/past${i}/200/200`}
                        className="pill-image w-20 h-24"
                        alt="past trip"
                      />
                      <div>
                        <h4 className="font-serif text-lg">Zanzibar Spice Tour</h4>
                        <p className="text-xs text-brand-earth/40 mb-2">Nov 2025</p>
                        <div className="flex items-center text-brand-saffron">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span key={s} className="w-2 h-2 rounded-full bg-current mr-1" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : activeDashTab === 'private' ? (
            <section className="space-y-8 text-brand-earth">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-3xl">Private Experience Requests</h3>
                <span className="text-xs font-bold text-brand-earth/40 uppercase tracking-widest">
                  {requests.length} Requests
                </span>
              </div>

              <div className="space-y-6 text-brand-earth">
                {requests.map((req) => {
                  const guide = MOCK_SPECIALISTS.find((g) => g.id === req.guideId);
                  return (
                    <div
                      key={req.id}
                      className="glass-card rounded-[40px] p-8 border border-brand-earth/5 hover:shadow-xl transition-all"
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                        <div className="flex items-center space-x-6">
                          <div className="relative">
                            <img
                              src={guide?.profilePhoto}
                              className="w-16 h-16 rounded-full object-cover"
                              alt="guide"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-brand-teal text-white p-1 rounded-full border-2 border-white">
                              <CheckCircle className="w-3 h-3" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-serif text-2xl mb-1">{req.title}</h4>
                            <p className="text-[10px] text-brand-earth/40 font-bold uppercase tracking-widest">
                              With {guide?.name} • {req.requestedDate}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`self-start px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${req.status === 'Pending'
                              ? 'bg-amber-100 text-amber-700'
                              : req.status === 'Offered'
                                ? 'bg-brand-teal text-white'
                                : 'bg-green-100 text-green-700'
                            }`}
                        >
                          {req.status === 'Offered' ? 'Offer Received' : req.status}
                        </span>
                      </div>

                      {req.status === 'Offered' && req.offer && (
                        <div className="bg-brand-warm/30 rounded-3xl p-8 mb-8 border-2 border-brand-teal/10">
                          <div className="flex items-center justify-between mb-6">
                            <h5 className="font-serif text-xl">Guide's Custom Offer</h5>
                            <div className="text-2xl font-serif text-brand-teal">
                              {req.offer.currency} {req.offer.totalCost.toLocaleString()}
                            </div>
                          </div>
                          <div className="space-y-3 mb-6">
                            {req.offer.breakdown.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between text-xs font-bold text-brand-earth/60"
                              >
                                <span>{item.service}</span>
                                <span>
                                  {req.offer?.currency} {item.cost.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-4">
                            <button
                              onClick={() => handleAction(req.id, 'Negotiate')}
                              className="btn-secondary !flex-1 !py-3 !text-xs"
                            >
                              Negotiate
                            </button>
                            <button
                              onClick={() => handleAction(req.id, 'Decline')}
                              className="btn-secondary !flex-1 !py-3 !text-xs !text-brand-coral !border-brand-coral/20"
                            >
                              Decline Offer
                            </button>
                            <button
                              onClick={() => handleAction(req.id, 'Accept')}
                              className="btn-primary !flex-[2] !py-3 !text-xs shadow-lg shadow-brand-teal/20"
                            >
                              Accept & Confirm
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-brand-earth/40">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-xs font-medium">
                            <MapPin className="w-3 h-3 mr-1" /> {req.location}
                          </div>
                          <div className="flex items-center text-xs font-medium">
                            <Users className="w-3 h-3 mr-1" /> {req.participants} Travelers
                          </div>
                        </div>
                        <button className="text-[10px] font-bold uppercase tracking-widest hover:text-brand-earth transition-colors flex items-center">
                          View Message History <ChevronRight className="w-3 h-3 ml-1" />
                        </button>
                      </div>

                      {req.statusNote && (
                        <div className="mt-4 p-4 bg-brand-warm rounded-2xl border border-brand-earth/5 text-xs text-brand-earth/60">
                          {req.statusNote}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ) : activeDashTab === 'messages' ? (
            <section className="max-w-2xl">
              <ChatList />
            </section>
          ) : activeDashTab === 'wishlist' ? (
            <section className="space-y-8 text-brand-earth">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-3xl">My Wishlist</h3>
                <div className="bg-brand-saffron/10 text-brand-saffron px-4 py-2 rounded-xl flex items-center text-xs">
                  <Heart className="w-4 h-4 mr-2 fill-current" />
                  <span className="font-bold">{wishlist.length} Saved</span>
                </div>
              </div>

              <p className="text-sm text-brand-earth/60">
                Experiences you've saved for later. Book before they expire!
              </p>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {wishlistTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="glass-card rounded-[40px] overflow-hidden flex flex-col sm:flex-row border border-brand-earth/5 hover:shadow-xl transition-all group"
                  >
                    <div className="sm:w-48 h-48 sm:h-auto relative shrink-0">
                      <img
                        src={trip.coverImage}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={trip.title}
                      />
                      <div className="absolute top-4 left-4 bg-brand-coral text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center shadow-lg">
                        <Clock className="w-3 h-3 mr-1" />
                        Expires: {trip.expiryDate}
                      </div>
                    </div>
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-serif text-xl mb-1">{trip.title}</h4>
                          <div className="flex items-center text-[10px] text-brand-earth/40 font-bold uppercase tracking-widest">
                            <MapPin className="w-3 h-3 mr-1" />
                            {trip.location.city}, {trip.location.country}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromWishlist(trip.id)}
                          className="p-2 text-brand-coral/40 hover:text-brand-coral hover:bg-brand-coral/5 rounded-full transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-earth/5">
                        <div className="text-lg font-serif text-brand-teal">
                          {trip.price.currency} {trip.price.local.toLocaleString()}
                        </div>
                        <Link
                          href={`/trip/${trip.id}`}
                          className="bg-brand-earth text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-earth/90 transition-all"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {wishlist.length === 0 && (
                  <div className="col-span-full py-20 text-center bg-brand-warm/30 rounded-[40px] border border-dashed border-brand-earth/10">
                    <Heart className="w-12 h-12 text-brand-earth/10 mx-auto mb-4" />
                    <p className="text-sm font-bold text-brand-earth/40">Your wishlist is empty</p>
                    <Link
                      href="/search"
                      className="text-brand-teal text-xs font-bold mt-4 inline-block hover:underline"
                    >
                      Explore Experiences
                    </Link>
                  </div>
                )}
              </div>
            </section>
          ) : (
            <section className="max-w-3xl space-y-12">
              <div className="space-y-8">
                <h3 className="font-serif text-3xl text-brand-earth">Settings</h3>

                {/* Notifications */}
                <div className="glass-card rounded-[40px] p-8 space-y-6 border border-brand-earth/5 text-brand-earth">
                  <div className="flex items-center space-x-3 mb-2">
                    <Activity className="w-5 h-5 text-brand-teal" />
                    <h4 className="font-bold text-xl">Notifications</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-brand-warm/30 rounded-2xl border border-brand-earth/5">
                      <div>
                        <p className="font-bold text-sm">Push Notifications</p>
                        <p className="text-[10px] text-brand-earth/40">
                          Real-time alerts for booking updates and messages
                        </p>
                      </div>
                      <button className="w-12 h-6 bg-brand-teal rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-brand-warm/30 rounded-2xl border border-brand-earth/5">
                      <div>
                        <p className="font-bold text-sm">Email Notifications</p>
                        <p className="text-[10px] text-brand-earth/40">
                          Receive invoices, itineraries, and reports via email
                        </p>
                      </div>
                      <button className="w-12 h-6 bg-brand-earth/10 rounded-full relative">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="glass-card rounded-[40px] p-8 space-y-6 border border-brand-earth/5 text-brand-earth">
                  <div className="flex items-center space-x-3 mb-2">
                    <ShieldAlert className="w-5 h-5 text-brand-teal" />
                    <h4 className="font-bold text-xl">Security</h4>
                  </div>
                  <div className="p-6 bg-brand-warm/30 rounded-2xl border border-brand-earth/5">
                    <p className="text-sm font-bold mb-4">Password Management</p>
                    <button
                      onClick={() =>
                        triggerStatus(
                          'success',
                          'Reset Link Sent',
                          'A secure password reset link has been dispatched to your registered email address.'
                        )
                      }
                      className="px-6 py-2 bg-brand-earth text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-brand-coral transition-all"
                    >
                      Request Password Reset
                    </button>
                  </div>
                </div>

                {/* Localization */}
                <div className="glass-card rounded-[40px] p-8 space-y-6 border border-brand-earth/5 text-brand-earth">
                  <div className="flex items-center space-x-3 mb-2">
                    <MapPin className="w-5 h-5 text-brand-teal" />
                    <h4 className="font-bold text-xl">Localization</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                        Home Country
                      </label>
                      <select className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none text-sm bg-white">
                        <option>Nigeria</option>
                        <option>Tanzania</option>
                        <option>Kenya</option>
                        <option>South Africa</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                        Preferred Currency
                      </label>
                      <select className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none text-sm bg-white">
                        <option>TZS (TSh)</option>
                        <option>USD ($)</option>
                        <option>NGN (₦)</option>
                        <option>KES (KSh)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showReviewModal && activePartnerToReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-brand-earth/80 backdrop-blur-sm"
              onClick={() => setShowReviewModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-[40px] p-8 max-w-lg w-full shadow-2xl text-brand-earth"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-serif text-3xl mb-1">Rate Partner</h3>
                  <p className="text-sm text-brand-earth/60">
                    Share your experience with {activePartnerToReview.providerName}
                  </p>
                </div>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-2 hover:bg-brand-warm rounded-full"
                >
                  <X className="w-6 h-6 text-brand-earth/40" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onClick={() => setReviews([{ ...reviews[0], rating: s }])}
                      className={`p-2 transition-all ${(reviews[0]?.rating || 5) >= s ? 'text-brand-saffron scale-125' : 'text-brand-earth/10'}`}
                    >
                      <Star
                        className={`w-8 h-8 ${(reviews[0]?.rating || 5) >= s ? 'fill-current' : ''}`}
                      />
                    </button>
                  ))}
                </div>

                <textarea
                  placeholder={`Write your review for ${activePartnerToReview.providerName}...`}
                  className="w-full h-32 p-4 bg-brand-warm rounded-2xl border-none outline-none text-brand-earth text-sm placeholder:text-brand-earth/30 resize-none shadow-inner"
                />

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 py-4 border border-brand-earth/10 text-brand-earth font-bold rounded-full text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => submitReview(reviews[0]?.rating || 5, '')}
                    className="flex-[2] py-4 bg-brand-teal text-white font-bold rounded-full text-sm shadow-xl shadow-brand-teal/20"
                  >
                    Submit & Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {showDisputeModal && activePartnerToDispute && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-brand-earth/80 backdrop-blur-sm"
              onClick={() => setShowDisputeModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-[40px] p-8 max-w-lg w-full shadow-2xl text-brand-earth"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-100 rounded-2xl text-red-500">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-3xl mb-1">Raise Dispute</h3>
                  <p className="text-sm text-brand-earth/60">
                    Partner: {activePartnerToDispute.providerName}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-xs text-brand-earth/60 leading-relaxed bg-brand-warm p-4 rounded-xl border border-brand-earth/5">
                  Raising a dispute will lock the escrow funds for this specific partner. Our local
                  support team will intervene to investigate the claim. Please provide clear details
                  below.
                </p>

                <textarea
                  value={disputeMessage}
                  onChange={(e) => setDisputeMessage(e.target.value)}
                  placeholder="Describe the issue in detail (e.g., service not provided, safety concern, quality issue)..."
                  className="w-full h-32 p-4 bg-brand-warm rounded-2xl border-none outline-none text-brand-earth text-sm placeholder:text-brand-earth/30 resize-none"
                />

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDisputeModal(false)}
                    className="flex-1 py-4 border border-brand-earth/10 text-brand-earth font-bold rounded-full text-sm"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={submitDispute}
                    disabled={!disputeMessage.trim()}
                    className="flex-[2] py-4 bg-red-500 text-white font-bold rounded-full text-sm shadow-xl shadow-red-500/20 disabled:opacity-50"
                  >
                    Confirm Dispute
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {showCancelModal && cancelType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-brand-earth/80 backdrop-blur-sm"
              onClick={() => setShowCancelModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-[40px] p-8 max-w-lg w-full shadow-2xl text-brand-earth"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-100 rounded-2xl text-red-500">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-3xl mb-1">Confirm Cancellation</h3>
                  <p className="text-sm text-brand-earth/60">Target: {cancelType} Booking</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-brand-warm rounded-3xl border border-brand-earth/5">
                  <h4 className="font-bold mb-2">Cancellation Policy</h4>
                  <p className="text-[10px] text-brand-earth/60 leading-relaxed uppercase tracking-wider">
                    • Full refund if cancelled 7 days before arrival.
                    <br />
                    • 50% refund if cancelled 48 hours before arrival.
                    <br />• No refund if cancelled less than 24 hours before arrival.
                  </p>
                </div>

                <p className="text-sm text-brand-earth/60">
                  Are you sure you want to cancel your {cancelType.toLowerCase()}? This action
                  cannot be undone and relevant partners will be notified immediately.
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 py-4 border border-brand-earth/10 text-brand-earth font-bold rounded-full text-sm"
                  >
                    Keep Booking
                  </button>
                  <button
                    onClick={confirmCancellation}
                    className="flex-[2] py-4 bg-red-500 text-white font-bold rounded-full text-sm shadow-xl shadow-red-500/20"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {showNegotiateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 text-brand-earth">
            <div
              className="absolute inset-0 bg-brand-earth/80 backdrop-blur-sm"
              onClick={() => setShowNegotiateModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-[40px] p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="font-serif text-2xl mb-4">Negotiate Offer</h3>
              <p className="text-sm text-brand-earth/60 mb-6 font-sans">
                Send a message to the guide explaining your desired changes or counter-offer.
              </p>

              <textarea
                value={negotiationMessage}
                onChange={(e) => setNegotiationMessage(e.target.value)}
                placeholder="I was hoping for a slightly lower price..."
                className="w-full h-32 p-4 bg-brand-warm rounded-2xl border-none outline-none text-brand-earth text-sm placeholder:text-brand-earth/30 mb-6 resize-none"
              />

              <div className="flex gap-4">
                <button
                  onClick={() => setShowNegotiateModal(false)}
                  className="flex-1 py-3 border border-brand-earth/10 text-brand-earth font-bold rounded-full text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={submitNegotiation}
                  className="flex-[2] py-3 bg-brand-teal text-white font-bold rounded-full text-xs shadow-lg"
                >
                  Send Negotiation Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={() => setStatusModal({ ...statusModal, isOpen: false })}
        type={statusModal.type}
        title={statusModal.title}
        message={statusModal.message}
        actionLabel="Understood"
      />
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
