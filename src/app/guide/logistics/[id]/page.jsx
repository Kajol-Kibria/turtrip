'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, DollarSign, ShieldCheck, AlertCircle, Send, CheckCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_BOOKINGS, MOCK_TRIPS } from '@/mockData';
import StatusModal from '@/components/StatusModal';

export default function LogisticsRequest() {
  const { id } = useParams();
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  
  const booking = MOCK_BOOKINGS.find(b => b.id === id);
  const trip = MOCK_TRIPS.find(t => t.id === booking?.tripId);
  
  if (!booking || !trip) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-serif mb-4">Booking not found</h2>
        <button onClick={() => router.push('/guide/dashboard')} className="text-brand-teal font-bold underline">Return to Dashboard</button>
      </div>
    );
  }

  const totalFunds = booking.totalPaid;
  const maxAllowed = totalFunds * 0.5;
  const currentAmount = parseFloat(amount) || 0;
  const isOverLimit = currentAmount > maxAllowed;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOverLimit || !purpose.trim()) return;
    setShowStatus(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-6 py-6 md:py-12 text-brand-earth"
    >
      <button 
        onClick={() => router.push('/guide/dashboard')}
        className="flex items-center text-sm font-bold opacity-60 hover:opacity-100 transition-opacity mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </button>

      <div className="glass-card rounded-3xl md:rounded-[48px] p-6 md:p-10 shadow-2xl relative overflow-hidden mb-8">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-brand-teal/10 text-brand-teal text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Logicstics Management</span>
            <span className="text-[10px] text-brand-earth/40 font-bold uppercase tracking-widest italic">Request #{id}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl my-6">{trip.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-brand-earth text-white rounded-[40px] shadow-xl">
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-2">Total Participants Funds</p>
              <h2 className="text-2xl md:text-4xl font-serif mb-2">{booking.currency} {totalFunds.toLocaleString()}</h2>
              <p className="text-xs opacity-60 leading-relaxed font-sans mt-4">
                Total amount paid by all participants for this experience. You can request up to 50% for logistics management.
              </p>
            </div>
            
            <div className="p-8 bg-brand-warm rounded-[40px] border border-brand-earth/5">
              <p className="text-[10px] uppercase tracking-widest font-bold text-brand-earth/40 mb-2">Maximum Requestable</p>
              <h2 className="text-2xl md:text-4xl font-serif text-brand-teal">{booking.currency} {maxAllowed.toLocaleString()}</h2>
              <div className="flex items-center mt-4 text-[10px] font-bold text-brand-earth/60 uppercase tracking-widest">
                < ShieldCheck className="w-3 h-3 mr-1 text-brand-teal" /> 50% Limit Applied
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 px-2">Amount to Request ({booking.currency})</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className={`w-full p-6 bg-brand-warm rounded-3xl border-2 outline-none text-xl font-bold transition-all ${isOverLimit ? 'border-brand-coral' : 'border-transparent focus:border-brand-teal/30'}`}
                />
                {isOverLimit && (
                  <div className="flex items-center text-brand-coral text-[10px] font-bold mt-2 px-4 uppercase tracking-widest animate-pulse">
                    <AlertCircle className="w-3 h-3 mr-1" /> Amount exceeds 50% limit (Max: {booking.currency} {maxAllowed.toLocaleString()})
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 px-2">Logistics Purpose & Breakdown</label>
              <textarea 
                placeholder="Describe what these funds will be used for (e.g. advance payment for drivers, permits, supplies...)"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full h-40 p-6 bg-brand-warm border-2 border-transparent focus:border-brand-teal/30 rounded-[32px] outline-none text-sm placeholder:text-brand-earth/30 leading-relaxed font-sans resize-none transition-all"
              />
            </div>

            <div className="p-6 bg-brand-teal/5 rounded-3xl border border-brand-teal/10 flex items-start space-x-4">
              <div className="p-2 bg-brand-teal/20 rounded-xl">
                 <ShieldCheck className="w-5 h-5 text-brand-teal" />
              </div>
              <p className="text-xs text-brand-earth/60 leading-relaxed font-medium mt-1">
                Requests are subject to Manjaro admin review. Approved funds are usually disbursed within 24 hours to your linked payout method.
              </p>
            </div>

            <button 
              type="submit"
              disabled={isOverLimit || !amount || !purpose.trim()}
              className="w-full py-6 bg-brand-earth text-white rounded-full font-bold text-sm shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 disabled:scale-100 flex items-center justify-center group"
            >
              <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Submit for Admin Review
            </button>
          </form>
        </div>
        <DollarSign className="absolute -bottom-10 -right-10 w-64 h-64 opacity-[0.03] text-brand-earth" />
      </div>

      <StatusModal 
        isOpen={showStatus}
        onClose={() => router.push('/guide/dashboard')}
        type="success"
        title="Request Submitted"
        message="Your logistics fund request has been successfully submitted for review. Our compliance team will notify you once it's approved and processed."
      />
    </motion.div>
  );
}