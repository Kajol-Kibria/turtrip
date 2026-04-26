'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle,
  Truck,
  Home as HomeIcon,
  Users,
  Info,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  AlertTriangle,
  X,
  Camera,
  CheckCircle2,
} from 'lucide-react';
import { MOCK_BOOKINGS, MOCK_TRIPS } from '@/mockData';

export default function MyBookingDetails() {
  const { id } = useParams();
  const booking = MOCK_BOOKINGS.find((b) => b.id === id) || MOCK_BOOKINGS[0];
  const trip = MOCK_TRIPS.find((t) => t.id === booking.tripId) || MOCK_TRIPS[0];

  const [activeTab, setActiveTab] = useState('overview');
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [isSubmittingDispute, setIsSubmittingDispute] = useState(false);
  const [disputeStep, setDisputeStep] = useState('form');

  const handleDisputeSubmit = (e) => {
    e.preventDefault();
    setIsSubmittingDispute(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmittingDispute(false);
      setDisputeStep('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-warm/30 pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-earth/40 hover:text-brand-earth mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            {/* Header Header */}
            <div className="glass-card rounded-[48px] p-8 md:p-12 border border-brand-earth/5 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />

              <div className="relative">
                <div className="flex items-center space-x-3 mb-6">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      booking.status === 'Active'
                        ? 'bg-brand-teal text-white'
                        : 'bg-brand-earth/10 text-brand-earth'
                    }`}
                  >
                    {booking.status} Adventure
                  </span>
                  <span className="text-xs font-medium text-brand-earth/40 flex items-center">
                    <CreditCard className="w-3 h-3 mr-1" />
                    ID: {booking.id}
                  </span>
                </div>

                <h1 className="font-serif text-4xl mb-4 text-brand-earth leading-tight">
                  {trip.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-sm text-brand-earth/60">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-brand-teal" />
                    {booking.startDate} — {booking.endDate}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-brand-teal" />
                    {trip.location.city}, {trip.location.country}
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-brand-earth/10 w-fit">
              {['overview', 'itinerary', 'logistics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-2.5 rounded-full text-xs font-bold transition-all capitalize ${
                    activeTab === tab
                      ? 'bg-brand-earth text-white shadow-lg'
                      : 'text-brand-earth/60 hover:text-brand-earth'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card rounded-[40px] p-8 border border-white/50">
                      <h3 className="font-serif text-xl mb-6">Payment Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-xs text-brand-earth/40 uppercase tracking-widest font-bold">
                            Base Price
                          </span>
                          <span className="font-bold text-brand-earth">
                            {booking.currency} {(booking.totalPaid * 0.8).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="text-xs text-brand-earth/40 uppercase tracking-widest font-bold">
                            Services & Fees
                          </span>
                          <span className="font-bold text-brand-earth">
                            {booking.currency} {(booking.totalPaid * 0.2).toLocaleString()}
                          </span>
                        </div>
                        <div className="pt-4 border-t border-brand-earth/10 flex justify-between items-end">
                          <span className="font-serif text-lg">Total Paid</span>
                          <span className="font-bold text-2xl text-brand-teal">
                            {booking.currency} {booking.totalPaid.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="mt-8 p-4 bg-brand-teal/5 rounded-2xl border border-brand-teal/10 flex items-start space-x-3">
                        <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                        <p className="text-[10px] text-brand-earth/60 leading-relaxed font-medium">
                          Secure Payment via Manjaro Escrow. Funds are released to providers only
                          after your confirmation of service fulfillment.
                        </p>
                      </div>
                    </div>

                    <div className="glass-card rounded-[40px] p-8 border border-white/50">
                      <h3 className="font-serif text-xl mb-6">Experience Highlights</h3>
                      <div className="space-y-4">
                        {trip.requiredEquipment?.map((item, i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <CheckCircle className="w-4 h-4 text-brand-teal" />
                            <span className="text-sm text-brand-earth/70 font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'itinerary' && (
                <motion.div
                  key="itinerary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-[40px] p-8 border border-white/50"
                >
                  <h3 className="font-serif text-2xl mb-8 text-brand-earth">Daily Itinerary</h3>
                  <div className="space-y-12">
                    {trip.itinerary?.map((item, i) => (
                      <div key={i} className="flex relative">
                        <div className="w-12 flex flex-col items-center mr-6">
                          <div className="w-10 h-10 rounded-2xl bg-brand-earth text-white flex items-center justify-center font-bold text-sm shadow-lg z-10">
                            0{i + 1}
                          </div>
                          {i !== (trip.itinerary?.length || 0) - 1 && (
                            <div className="flex-1 w-px bg-brand-earth/10 my-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-10">
                          <h4 className="font-bold text-brand-earth mb-3 uppercase tracking-widest text-[11px]">
                            Day {i + 1} Adventure
                          </h4>
                          <p className="text-sm text-brand-earth/70 leading-relaxed font-medium">
                            {item}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'logistics' && (
                <motion.div
                  key="logistics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Fulfillment Status */}
                  <div className="glass-card rounded-[40px] p-8 border border-white/50">
                    <h3 className="font-serif text-2xl mb-8">Service Partners</h3>
                    <div className="space-y-6">
                      {booking.fulfillment.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-6 bg-white/40 rounded-3xl border border-brand-earth/5"
                        >
                          <div className="flex items-center space-x-6">
                            <div
                              className={`p-4 rounded-2xl bg-white shadow-sm ${f.isFulfilled ? 'text-brand-teal' : 'text-brand-earth/40'}`}
                            >
                              {f.service === 'Ride' && <Truck className="w-6 h-6" />}
                              {f.service === 'Stay' && <HomeIcon className="w-6 h-6" />}
                              {f.service === 'Experience' && <Users className="w-6 h-6" />}
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-earth/40 mb-1">
                                {f.service} Provider
                              </p>
                              <h4 className="font-bold text-brand-earth">{f.providerName}</h4>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            {f.isFulfilled && (
                              <span className="flex items-center text-[10px] font-bold text-brand-teal uppercase tracking-widest bg-brand-teal/5 px-3 py-1 rounded-full">
                                <CheckCircle className="w-3 h-3 mr-1" /> Ready
                              </span>
                            )}
                            <Link
                              href={`/messages?userId=${f.providerId}`}
                              className="p-3 bg-brand-earth text-white rounded-xl shadow-lg hover:scale-105 transition-all"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Actions */}
          <div className="lg:w-80 space-y-6">
            <div className="glass-card rounded-[48px] p-8 border border-brand-earth/10 sticky top-32 bg-brand-earth/5 backdrop-blur-xl shadow-2xl">
              <h3 className="font-serif text-2xl mb-8 text-brand-earth">Quick Actions</h3>

              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-5 bg-white rounded-3xl border border-brand-earth/5 hover:border-brand-teal group transition-all text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-teal/5 text-brand-teal rounded-xl flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand-earth">Safety Plan</p>
                      <p className="text-[10px] text-brand-earth/40">View Emergency Doc</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-brand-earth/20 group-hover:text-brand-teal group-hover:translate-x-1 transition-all" />
                </button>

                <button className="w-full flex items-center justify-between p-5 bg-white rounded-3xl border border-brand-earth/5 hover:border-brand-teal group transition-all text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-earth/5 text-brand-earth rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand-earth">Modify Booking</p>
                      <p className="text-[10px] text-brand-earth/40">Request date change</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-brand-earth/20 group-hover:text-brand-teal group-hover:translate-x-1 transition-all" />
                </button>

                {booking.status === 'Active' && (
                  <button
                    onClick={() => {
                      setDisputeStep('form');
                      setShowDisputeModal(true);
                    }}
                    className="w-full flex items-center justify-between p-5 bg-white rounded-3xl border border-brand-earth/5 hover:border-brand-coral group transition-all text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-brand-coral/5 text-brand-coral rounded-xl flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-earth">Raise Dispute</p>
                        <p className="text-[10px] text-brand-earth/40">Report issue with trip</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-brand-earth/20 group-hover:text-brand-coral group-hover:translate-x-1 transition-all" />
                  </button>
                )}

                <div className="pt-8 border-t border-brand-earth/10 mt-8">
                  <h4 className="text-[10px] font-bold text-brand-earth/40 uppercase tracking-widest mb-4">
                    Support
                  </h4>
                  <Link
                    href="/support"
                    className="flex items-center space-x-2 text-xs font-bold text-brand-earth hover:text-brand-teal transition-colors"
                  >
                    <Info className="w-4 h-4" />
                    <span>Open Support Ticket</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dispute Modal */}
      <AnimatePresence>
        {showDisputeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDisputeModal(false)}
              className="absolute inset-0 bg-brand-earth/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setShowDisputeModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-brand-earth/5 text-brand-earth/40 hover:text-brand-earth transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8 md:p-10">
                {disputeStep === 'form' ? (
                  <>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-brand-coral/10 text-brand-coral rounded-2xl flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl">Raise Dispute</h3>
                        <p className="text-xs text-brand-earth/40">
                          Report a problem with your ongoing adventure
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleDisputeSubmit} className="space-y-6">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-3 ml-2">
                          Reason for Dispute
                        </label>
                        <textarea
                          required
                          value={disputeReason}
                          onChange={(e) => setDisputeReason(e.target.value)}
                          className="w-full p-5 rounded-3xl border border-brand-earth/10 outline-none focus:border-brand-coral h-40 text-sm bg-brand-warm/10 resize-none"
                          placeholder="Please provide detailed information about the issue you are experiencing..."
                        ></textarea>
                      </div>

                      <div className="p-6 bg-brand-warm/20 rounded-3xl border border-dashed border-brand-earth/20 text-center group hover:border-brand-teal transition-all cursor-pointer">
                        <input type="file" className="hidden" id="dispute-evidence" multiple />
                        <label htmlFor="dispute-evidence" className="cursor-pointer block">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                            <Camera className="w-6 h-6 text-brand-teal" />
                          </div>
                          <p className="text-xs font-bold text-brand-earth">Upload Evidence</p>
                          <p className="text-[10px] text-brand-earth/40 mt-1">
                            Pictures or screenshots (Optional)
                          </p>
                        </label>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowDisputeModal(false)}
                          className="flex-1 py-4 rounded-full font-bold text-brand-earth/40 hover:text-brand-earth transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!disputeReason || isSubmittingDispute}
                          className="flex-[2] bg-brand-coral text-white py-4 rounded-full font-bold shadow-xl hover:bg-brand-coral/90 transition-all disabled:opacity-50 flex items-center justify-center"
                        >
                          {isSubmittingDispute ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              Submit for Review <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-serif text-3xl mb-4">Dispute Submitted</h3>
                    <p className="text-sm text-brand-earth/60 max-w-xs mx-auto leading-relaxed mb-8">
                      Your report has been submitted to our safety team. We will review the details
                      and get back to you within 2-4 hours.
                    </p>
                    <button
                      onClick={() => setShowDisputeModal(false)}
                      className="w-full bg-brand-earth text-white py-4 rounded-full font-bold shadow-lg"
                    >
                      Understood
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
