'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  MessageSquare,
  DollarSign,
  Plus,
  ChevronRight,
  Star,
  Clock,
  AlertCircle,
  CheckCircle,
  Send,
  RotateCcw,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MOCK_PRIVATE_REQUESTS, MOCK_TRIPS } from '@/mockData';
import ChatList from '@/components/ChatList';
import StatusModal from '@/components/StatusModal';

export default function GuideDashboard() {
  const navigate = useRouter();
  const [activeTab, setActiveTab] = useState('pending');
  const [privateRequests, setPrivateRequests] = useState(MOCK_PRIVATE_REQUESTS);
  const [selectedPR, setSelectedPR] = useState(null);
  const [isMakingOffer, setIsMakingOffer] = useState(false);
  const [showReviewUserModal, setShowReviewUserModal] = useState(false);
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [offerBreakdown, setOfferBreakdown] = useState([
    { service: 'Professional Guide Fee', cost: 150000 },
  ]);

  const [showStatus, setShowStatus] = useState(false);
  const [statusConfig, setStatusConfig] = useState({ type: 'success', title: '', message: '' });

  const triggerStatus = (type, title, message) => {
    setStatusConfig({ type, title, message });
    setShowStatus(true);
  };

  const currentPR = privateRequests.find((r) => r.id === selectedPR);

  const handleSendOffer = () => {
    const total = offerBreakdown.reduce((sum, item) => sum + item.cost, 0);
    triggerStatus(
      'success',
      'Offer Dispatched',
      `Your custom offer for "${currentPR?.title}" has been successfully sent to the traveler. Total: TZS ${total.toLocaleString()}`
    );
    setPrivateRequests(
      privateRequests.map((r) =>
        r.id === selectedPR
          ? {
              ...r,
              status: 'Offered',
              offer: { totalCost: total, currency: 'TZS', breakdown: offerBreakdown },
            }
          : r
      )
    );
    setIsMakingOffer(false);
    setSelectedPR(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8 text-brand-earth">
        <div>
          <h1 className="font-serif text-5xl mb-2">Guide Dashboard</h1>
          <p className="text-brand-earth/60">Manage your experiences and track your earnings.</p>
        </div>
        <Link
          href="/guide/create"
          className="bg-brand-teal text-white px-8 py-4 rounded-full font-bold flex items-center shadow-xl hover:bg-brand-teal/90 transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Experience
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-brand-earth text-white rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-2">
                Available Balance
              </p>
              <h2 className="text-4xl font-serif mb-4">TSh 1,240,000</h2>
              <div className="flex gap-2">
                <div className="flex items-center text-xs text-brand-teal font-bold bg-brand-teal/20 px-3 py-1 rounded-full w-fit">
                  <Clock className="w-3 h-3 mr-1" />
                  TSh 450k Pending
                </div>
                <button
                  onClick={() =>
                    triggerStatus(
                      'success',
                      'Request Submitted',
                      'Your payout request has been sent to our finance team for review. You will receive a notification once the funds are processed (usually within 24-48 hours).'
                    )
                  }
                  className="flex items-center text-[10px] bg-brand-teal text-white px-3 py-1 rounded-full font-bold hover:bg-brand-teal/80 transition-all"
                >
                  Request Payout
                </button>
              </div>
            </div>
            <DollarSign className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10" />
          </div>

          <div className="glass-card rounded-[40px] p-8 text-brand-earth">
            <h4 className="font-serif text-2xl mb-6">Overview</h4>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-brand-earth/40">Total Trips</span>
                <span className="text-xl font-serif">452</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-brand-earth/40">Rating</span>
                <div className="flex items-center text-brand-saffron">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span className="text-xl font-serif">4.95</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-brand-earth/40">Response Rate</span>
                <span className="text-xl font-serif">98%</span>
              </div>
            </div>
          </div>

          <div className="bg-brand-coral/10 text-brand-coral p-6 rounded-3xl flex items-start space-x-4 border border-brand-coral/20">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p className="text-xs font-bold leading-relaxed">
              Your certification expires in 12 days. Please upload new documents to stay verified.
            </p>
          </div>
        </div>

        {/* Bookings & Messages */}
        <div className="lg:col-span-3 space-y-8 text-brand-earth">
          <div className="flex space-x-8 border-b border-brand-earth/10">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 text-sm font-bold relative transition-all ${activeTab === 'pending' ? 'text-brand-earth' : 'text-brand-earth/40'}`}
            >
              Bookings
              {activeTab === 'pending' && (
                <motion.div
                  layoutId="gt"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-earth"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('private')}
              className={`py-4 text-sm font-bold relative transition-all ${activeTab === 'private' ? 'text-brand-earth' : 'text-brand-earth/40'}`}
            >
              Private Requests
              {activeTab === 'private' && (
                <motion.div
                  layoutId="gt"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-earth"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`py-4 text-sm font-bold relative transition-all ${activeTab === 'active' ? 'text-brand-earth' : 'text-brand-earth/40'}`}
            >
              My Experiences
              {activeTab === 'active' && (
                <motion.div
                  layoutId="gt"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-earth"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 text-sm font-bold relative transition-all ${activeTab === 'messages' ? 'text-brand-earth' : 'text-brand-earth/40'}`}
            >
              Message Center
              {activeTab === 'messages' && (
                <motion.div
                  layoutId="gt"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-earth"
                />
              )}
            </button>
          </div>

          {activeTab === 'pending' && (
            <section className="space-y-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="glass-card rounded-[40px] p-8 border border-brand-earth/5 hover:border-brand-teal/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-serif text-2xl">Serengeti Migration Safari</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${i === 1 ? 'bg-brand-teal/10 text-brand-teal' : 'bg-brand-earth/10 text-brand-earth'}`}
                        >
                          {i === 1 ? 'Public Group' : 'Private Group'}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-brand-earth/60 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" /> June 12, 2026
                        </div>
                        <div className="flex items-center text-brand-coral font-bold">
                          <Clock className="w-3 h-3 mr-1" /> Deadline: June 5
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="flex -space-x-3 mb-2">
                        {[1, 2, 3, 4, 5].map((p) => (
                          <img
                            key={p}
                            src={`https://picsum.photos/seed/p${p + i}/100/100`}
                            className="w-10 h-10 rounded-full border-2 border-white"
                            alt="participant"
                          />
                        ))}
                        <Link
                          href={`/guide/participants/b${i}`}
                          className="w-10 h-10 rounded-full border-2 border-white bg-brand-warm flex items-center justify-center text-[10px] font-bold hover:bg-brand-earth hover:text-white transition-all"
                        >
                          +6
                        </Link>
                      </div>
                      <p className="text-[10px] font-bold text-brand-earth/40 uppercase tracking-widest">
                        11 Participants Total
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-brand-earth/5">
                    <div className="flex space-x-2">
                      <button className="px-6 py-2 bg-brand-warm text-brand-earth rounded-full text-xs font-bold hover:bg-brand-earth hover:text-white transition-all flex items-center">
                        <MessageSquare className="w-3 h-3 mr-2" /> Chat with Group
                      </button>
                      <button className="px-6 py-2 bg-brand-teal text-white rounded-full text-xs font-bold shadow-lg hover:bg-brand-teal/90 transition-all">
                        Manage Logistics
                      </button>
                      <button
                        onClick={() =>
                          triggerStatus(
                            'success',
                            'Experience Completed',
                            'Session marked as complete. Funds will be released once participants verify.'
                          )
                        }
                        className="px-6 py-2 border border-brand-teal text-brand-teal rounded-full text-[10px] font-bold uppercase transition-all hover:bg-brand-teal hover:text-white"
                      >
                        Complete
                      </button>
                    </div>
                    <span className="text-xs font-bold text-brand-earth/40 uppercase tracking-widest italic">
                      Booking Active
                    </span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {activeTab === 'private' && (
            <section className="space-y-4">
              {privateRequests.map((req) => (
                <div
                  key={req.id}
                  className="glass-card rounded-[40px] p-8 border border-brand-earth/5 hover:border-brand-teal/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-8 mb-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-brand-warm rounded-2xl flex items-center justify-center text-brand-earth/20 font-serif text-3xl">
                        P
                      </div>
                      <div>
                        <h4 className="font-serif text-2xl">{req.title}</h4>
                        <p className="text-[10px] text-brand-earth/40 font-bold uppercase tracking-widest">
                          Requested on {req.requestedDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          req.status === 'Pending'
                            ? 'bg-amber-100 text-amber-700'
                            : req.status === 'Offered'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-brand-earth/60 mb-8 max-w-2xl leading-relaxed">
                    {req.description}
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 bg-brand-warm/30 rounded-2xl text-center">
                      <p className="text-[9px] font-bold text-brand-earth/30 uppercase tracking-widest mb-1">
                        Participants
                      </p>
                      <p className="text-sm font-bold">{req.participants}</p>
                    </div>
                    <div className="p-4 bg-brand-warm/30 rounded-2xl text-center">
                      <p className="text-[9px] font-bold text-brand-earth/30 uppercase tracking-widest mb-1">
                        Stay
                      </p>
                      <p className="text-[10px] font-bold truncate">
                        {req.accommodationType || 'None'}
                      </p>
                    </div>
                    <div className="p-4 bg-brand-warm/30 rounded-2xl text-center">
                      <p className="text-[9px] font-bold text-brand-earth/30 uppercase tracking-widest mb-1">
                        Ride
                      </p>
                      <p className="text-[10px] font-bold truncate">
                        {req.transportType || 'None'}
                      </p>
                    </div>
                    <div className="p-4 bg-brand-warm/30 rounded-2xl text-center">
                      <p className="text-[9px] font-bold text-brand-earth/30 uppercase tracking-widest mb-1">
                        Food
                      </p>
                      <p className="text-sm font-bold">{req.foodInclusive ? 'Yes' : 'No'}</p>
                    </div>
                  </div>

                  {req.status === 'Pending' && (
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          setPrivateRequests(privateRequests.filter((r) => r.id !== req.id))
                        }
                        className="flex-1 py-4 border border-brand-earth/10 rounded-full text-xs font-bold hover:bg-brand-coral hover:text-white transition-all"
                      >
                        Reject Request
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPR(req.id);
                          setIsMakingOffer(true);
                        }}
                        className="flex-[2] bg-brand-teal text-white py-4 rounded-full font-bold text-xs shadow-lg hover:bg-brand-teal/90 transition-all"
                      >
                        Send Custom Offer
                      </button>
                    </div>
                  )}

                  {req.status === 'Offered' && (
                    <div className="p-6 bg-brand-teal/5 border border-brand-teal/20 rounded-3xl flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <CheckCircle className="w-5 h-5 text-brand-teal" />
                        <p className="text-sm font-bold">
                          Offer Sent: {req.offer?.currency} {req.offer?.totalCost.toLocaleString()}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-brand-earth/40 italic">
                        Awaiting traveler...
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {activeTab === 'active' && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_TRIPS.filter((t) => !t.id.includes('old')).map((trip) => (
                <div
                  key={trip.id}
                  className="glass-card rounded-[40px] overflow-hidden group border border-brand-earth/5"
                >
                  <div className="relative h-40">
                    <img
                      src={trip.coverImage}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="exp"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="font-serif text-xl">{trip.title}</h4>
                      <div className="flex items-center space-x-2">
                        <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                          Status: Active
                        </p>
                        {trip.startDate && (
                          <span className="text-[8px] bg-brand-teal/40 text-black px-2 py-0.5 rounded-full backdrop-blur-md font-bold">
                            Starts: {new Date(trip.startDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex justify-between items-center bg-white">
                    <div className="flex space-x-4 items-center">
                      <div>
                        <p className="text-[10px] text-brand-earth/40 uppercase font-bold tracking-widest mb-1">
                          Slots Left
                        </p>
                        <p className="font-serif text-2xl text-brand-teal">8 of 12</p>
                      </div>
                      <button
                        onClick={() => navigate(`/guide/edit/${trip.id}`)}
                        className="px-4 py-1.5 text-[10px] font-bold text-brand-earth border border-brand-earth/10 rounded-full hover:bg-brand-earth hover:text-white transition-all ml-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          triggerStatus('success', 'Trip Finalized', 'Trip marked as complete.')
                        }
                        className="px-4 py-1.5 text-[10px] font-bold bg-brand-teal text-white rounded-full ml-2"
                      >
                        Finalize
                      </button>
                    </div>
                    <Link
                      href={`/trip/${trip.id}`}
                      className="p-4 bg-brand-earth/5 rounded-full hover:bg-brand-earth hover:text-white transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </section>
          )}

          {activeTab === 'history' && (
            <section className="space-y-6">
              <div className="p-6 bg-brand-warm/30 rounded-3xl border border-brand-earth/5">
                <p className="text-xs text-brand-earth/60 leading-relaxed font-medium">
                  These are your previous experiences that have either expired or were completed.
                  You can <strong>relaunch</strong> them to quickly create new bookings for upcoming
                  dates.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_TRIPS.filter((t) => t.id.includes('old')).map((trip) => (
                  <div
                    key={trip.id}
                    className="glass-card rounded-[40px] overflow-hidden group border border-brand-earth/5 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <div className="relative h-40 grayscale group-hover:grayscale-0 transition-all duration-500">
                      <img src={trip.coverImage} className="w-full h-full object-cover" alt="exp" />
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="font-serif text-xl">{trip.title}</h4>
                        <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 font-mono">
                          Last Run: {trip.startTime}
                        </p>
                      </div>
                    </div>
                    <div className="p-6 flex justify-between items-center bg-white">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-white bg-brand-warm flex items-center justify-center text-[10px] font-bold"
                          >
                            {String.fromCharCode(64 + i)}
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-earth text-white flex items-center justify-center text-[10px] font-bold">
                          +12
                        </div>
                      </div>
                      <button
                        onClick={() => navigate('/guide/create', { state: { relaunchData: trip } })}
                        className="flex items-center px-6 py-3 bg-brand-teal text-white rounded-full text-xs font-bold shadow-lg hover:scale-105 transition-all"
                      >
                        <RotateCcw className="w-3 h-3 mr-2" /> Relaunch
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'completed' && (
            <section className="space-y-8">
              <div className="bg-brand-warm/30 p-6 rounded-3xl border border-brand-earth/5">
                <h4 className="font-serif text-xl mb-2 italic">Feedback & Ratings</h4>
                <p className="text-xs text-brand-earth/60">
                  Manage reviews from travelers and rate your guests to build trust.
                </p>
              </div>

              <div className="space-y-6">
                <h5 className="text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 px-2">
                  Recent Reviews from Travelers
                </h5>
                {[1].map((i) => (
                  <div
                    key={i}
                    className="glass-card rounded-[40px] p-8 border border-brand-earth/5"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://picsum.photos/seed/user1/100/100"
                          className="w-12 h-12 rounded-full"
                          alt="traveler"
                        />
                        <div>
                          <h6 className="font-bold">Pelu Yusuf</h6>
                          <p className="text-[10px] text-brand-earth/40">
                            Zanzibar Safari • 2 days ago
                          </p>
                        </div>
                      </div>
                      <div className="flex text-brand-saffron">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-brand-earth italic mb-6 leading-relaxed">
                      "Kofi was an incredible guide! Knowledgable, patient, and knew all the best
                      hidden spots for photos. Highly recommended."
                    </p>

                    <button
                      onClick={() => {
                        setSelectedReview({ id: 'rev1', travelerName: 'Pelu Yusuf' });
                        setShowReplyModal(true);
                      }}
                      className="text-[10px] font-bold uppercase tracking-widest text-brand-teal hover:underline flex items-center"
                    >
                      <MessageSquare className="w-3 h-3 mr-2" /> Reply to Review
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h5 className="text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 px-2">
                  Rate Your Travelers
                </h5>
                {[1].map((i) => (
                  <div
                    key={i}
                    className="glass-card rounded-[40px] p-6 flex items-center justify-between border border-brand-earth/5"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src="https://picsum.photos/seed/user2/100/100"
                        className="w-12 h-12 rounded-full"
                        alt="traveler"
                      />
                      <div>
                        <h6 className="font-bold">Jane Smith</h6>
                        <p className="text-[10px] text-brand-earth/40">
                          Kilimanjaro Trek • Fully Funded
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTraveler({ id: 'u2', name: 'Jane Smith' });
                        setShowReviewUserModal(true);
                      }}
                      className="px-6 py-2 bg-brand-earth text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg"
                    >
                      Rate Traveler
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'messages' && (
            <section className="max-w-2xl bg-white rounded-[40px] p-8 border border-brand-earth/5 shadow-xl">
              <ChatList />
            </section>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showReviewUserModal && selectedTraveler && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-brand-earth/80 backdrop-blur-sm"
              onClick={() => setShowReviewUserModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl"
            >
              <h3 className="font-serif text-3xl mb-4 text-brand-earth">
                Rate {selectedTraveler.name}
              </h3>
              <p className="text-sm text-brand-earth/60 mb-8 font-sans">
                Share your experience with this traveler to help other providers. How were they as a
                guest?
              </p>

              <div className="flex justify-center space-x-2 mb-8">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    className="text-brand-saffron p-1 hover:scale-110 transition-transform"
                  >
                    <Star className="w-8 h-8 fill-current" />
                  </button>
                ))}
              </div>

              <textarea
                placeholder="He was respectful, on time for meetings, and followed all safety guidelines..."
                className="w-full h-32 p-4 bg-brand-warm rounded-3xl border-none outline-none text-brand-earth text-sm placeholder:text-brand-earth/30 mb-8 resize-none"
              />

              <div className="flex gap-4">
                <button
                  onClick={() => setShowReviewUserModal(false)}
                  className="flex-1 py-4 border border-brand-earth/10 rounded-full font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    triggerStatus(
                      'success',
                      'Review Submitted',
                      `Thank you for sharing your feedback on ${selectedTraveler.name}. This helps our community maintain high standards.`
                    );
                    setShowReviewUserModal(false);
                  }}
                  className="flex-[2] py-4 bg-brand-teal text-white rounded-full font-bold text-xs shadow-xl"
                >
                  Submit Rating
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showReplyModal && selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-brand-earth/80 backdrop-blur-sm"
              onClick={() => setShowReplyModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl"
            >
              <h3 className="font-serif text-3xl mb-4 text-brand-earth">
                Reply to {selectedReview.travelerName}
              </h3>
              <textarea
                placeholder="Thank you so much! It was a pleasure showing you around..."
                className="w-full h-32 p-4 bg-brand-warm rounded-3xl border-none outline-none text-brand-earth text-sm placeholder:text-brand-earth/30 mb-8 resize-none"
              />

              <div className="flex gap-4">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="flex-1 py-4 border border-brand-earth/10 rounded-full font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    triggerStatus(
                      'success',
                      'Reply Sent',
                      "Your response to the traveler's review has been posted successfully."
                    );
                    setShowReplyModal(false);
                  }}
                  className="flex-[2] py-4 bg-brand-teal text-white rounded-full font-bold text-xs shadow-xl"
                >
                  Send Reply
                </button>
              </div>
            </motion.div>
          </div>
        )}
        {isMakingOffer && currentPR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 text-brand-earth"
          >
            <div
              className="absolute inset-0 bg-brand-earth/60 backdrop-blur-sm"
              onClick={() => setIsMakingOffer(false)}
            />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[48px] p-10 shadow-2xl"
            >
              <div className="mb-8 text-center">
                <h2 className="font-serif text-3xl italic">Send Cost Offer</h2>
                <p className="text-sm text-brand-earth/40">
                  Break down the prices for {currentPR.title}
                </p>
              </div>

              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                {offerBreakdown.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <input
                      className="flex-[2] p-4 bg-brand-warm rounded-2xl text-xs font-bold outline-none"
                      value={item.service}
                      onChange={(e) => {
                        const nb = [...offerBreakdown];
                        nb[idx].service = e.target.value;
                        setOfferBreakdown(nb);
                      }}
                    />
                    <input
                      type="number"
                      className="flex-1 p-4 bg-brand-warm rounded-2xl text-xs font-bold outline-none"
                      value={item.cost}
                      onChange={(e) => {
                        const nb = [...offerBreakdown];
                        nb[idx].cost = parseInt(e.target.value) || 0;
                        setOfferBreakdown(nb);
                      }}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setOfferBreakdown([...offerBreakdown, { service: '', cost: 0 }])}
                className="w-full text-center py-2 text-[10px] uppercase font-bold text-brand-teal hover:underline mb-8"
              >
                + Add Line
              </button>

              <div className="p-6 bg-brand-earth text-white rounded-3xl mb-8 flex justify-between items-center font-serif text-xl italic">
                <span className="opacity-60 text-sm">Total:</span>
                <span>TZS {offerBreakdown.reduce((s, i) => s + i.cost, 0).toLocaleString()}</span>
              </div>

              <button
                onClick={handleSendOffer}
                className="w-full bg-brand-teal text-white py-5 rounded-full font-bold shadow-xl flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" /> Send Offer
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
