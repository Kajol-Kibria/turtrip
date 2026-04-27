'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Ambulance, ShieldAlert, MessageCircle, Clock, MapPin, Send } from 'lucide-react';
import StatusModal from '@/components/StatusModal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function EmergencySupport() {
  const [formType, setFormType] = useState('General');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusConfig, setStatusConfig] = useState({
    type: 'success',
    title: '',
    message: '',
  });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusConfig({
      type: formType === 'Immediate' ? 'warning' : 'success',
      title: formType === 'Immediate' ? 'Incident Received' : 'Ticket Submitted',
      message:
        formType === 'Immediate'
          ? 'Your emergency report has been prioritized. Our rapid response team is dispatching assistance and will contact you via WhatsApp and phone within 5 minutes. Please stay in a safe, visible location.'
          : "Your support request has been received. We've assigned a specialist to your case who will respond within 4 hours. You can track updates in your notification center.",
    });
    setShowStatusModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-brand-warm/30 pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6"
    >
      <StatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        type={statusConfig.type}
        title={statusConfig.title}
        message={statusConfig.message}
        actionLabel={formType === 'Immediate' ? "I'm Safe Now" : 'Back to Dashboard'}
        onAction={() =>
          formType === 'Immediate' ? setShowStatusModal(false) : router.push('/dashboard')
        }
      />

      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12 md:mb-20 text-brand-coral">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-coral/10 rounded-2xl md:rounded-[30px] flex items-center justify-center mx-auto mb-6 md:mb-8">
            <ShieldAlert className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-brand-earth mb-4 md:mb-6 leading-tight">Emergency & Rapid Response</h1>
          <p className="text-lg text-brand-earth/60 leading-relaxed max-w-2xl mx-auto">
            Your first line of defense is your local Guide. For platform-level emergencies or when
            your guide is unreachable, our rapid response team is available 24/7.
          </p>
        </header>

        <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[48px] shadow-xl border border-brand-coral/20 mb-8 md:mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShieldAlert className="w-32 h-32 text-brand-coral" />
          </div>
          <div className="relative z-10">
            <h2 className="font-serif text-3xl mb-4 text-brand-earth">
              Primary Response: Your Guide
            </h2>
            <p className="text-brand-earth/60 mb-8 max-w-2xl text-sm leading-relaxed">
              As per NaturTrip safety protocols, your assigned Guide is tasked with providing you
              with a <b>Local Emergency Contact Sheet</b> upon arrival. This includes the nearest
              police stations, hospitals, and specialized local rescue services relevant to your
              itinerary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/messages"
                className="bg-brand-earth text-white px-8 py-4 rounded-full font-bold text-sm shadow-lg hover:scale-[1.02] transition-all text-center"
              >
                Message My Guide
              </Link>
              <button className="bg-brand-warm text-brand-earth px-8 py-4 rounded-full font-bold text-sm hover:bg-brand-earth/5 transition-all text-center">
                View Guide Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-20">
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[32px] shadow-lg border border-brand-earth/5 text-center">
            <Phone className="w-6 h-6 md:w-8 md:h-8 text-brand-teal mx-auto mb-3 md:mb-4" />
            <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">Voice Support</h3>
            <p className="text-[10px] md:text-xs text-brand-earth/60 mb-1 md:mb-2">+255 000 000 000</p>
            <p className="text-[8px] md:text-[10px] text-brand-earth/30 uppercase font-black tracking-widest">
              East Africa Hub
            </p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[32px] shadow-lg border border-brand-earth/5 text-center">
            <Phone className="w-6 h-6 md:w-8 md:h-8 text-brand-teal mx-auto mb-3 md:mb-4" />
            <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">Voice Support</h3>
            <p className="text-[10px] md:text-xs text-brand-earth/60 mb-1 md:mb-2">+1 876 000 0000</p>
            <p className="text-[8px] md:text-[10px] text-brand-earth/30 uppercase font-black tracking-widest">
              Caribbean Hub
            </p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[32px] shadow-lg border border-brand-earth/5 text-center sm:col-span-2 md:col-span-1">
            <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-brand-teal mx-auto mb-3 md:mb-4" />
            <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">WhatsApp Rapid</h3>
            <p className="text-[10px] md:text-xs text-brand-earth/60 mb-1 md:mb-2">Live Chat Response</p>
            <p className="text-[8px] md:text-[10px] text-brand-earth/30 uppercase font-black tracking-widest">
              Global Dispatch
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-white p-8 rounded-[40px] shadow-sm border border-brand-earth/5">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-5 h-5 text-brand-teal" />
                <h2 className="font-serif text-xl">Response Times</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-brand-earth/40 font-bold uppercase">
                    Immediate Emergency
                  </span>
                  <span className="font-bold text-brand-coral">Under 5m</span>
                </div>
                <div className="flex justify-between items-center text-xs text-brand-earth/60">
                  <span className="font-medium">Booking Incidents</span>
                  <span className="font-bold">Under 30m</span>
                </div>
                <div className="flex justify-between items-center text-xs text-brand-earth/60">
                  <span className="font-medium">General Inquiries</span>
                  <span className="font-bold">Within 4h</span>
                </div>
              </div>
            </section>

            <section className="bg-brand-earth text-white p-6 md:p-8 rounded-3xl md:rounded-[40px] shadow-xl">
              <Ambulance className="w-6 h-6 md:w-8 md:h-8 text-brand-teal mb-3 md:mb-4" />
              <h2 className="font-serif text-lg md:text-xl mb-3 md:mb-4">Medical Assistance</h2>
              <p className="text-[10px] md:text-xs text-white/60 leading-relaxed italic">
                If you require immediate medical evacuation or hospital support, please use the{' '}
                <b>Panic Button</b> in your active booking view first. This automatically sends your
                GPS coordinates to local paramedics.
              </p>
            </section>
          </div>

          <div className="lg:col-span-8 bg-white p-6 md:p-10 rounded-3xl md:rounded-[48px] shadow-xl border border-brand-earth/5">
            <div className="flex items-center space-x-4 mb-10">
              <button
                onClick={() => setFormType('General')}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${formType === 'General' ? 'bg-brand-earth text-white' : 'bg-brand-earth/5 text-brand-earth/40'}`}
              >
                Support Ticket
              </button>
              <button
                onClick={() => setFormType('Immediate')}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${formType === 'Immediate' ? 'bg-brand-coral text-white shadow-lg shadow-brand-coral/20' : 'bg-brand-coral/5 text-brand-coral/40'}`}
              >
                Report Incident
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                    Booking ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="#TRP-12345"
                    className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                    Exact Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-earth/30" />
                    <input
                      type="text"
                      placeholder="e.g. Hotel Front or GPS Name"
                      className="w-full p-4 pl-11 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                  Describe the Situation
                </label>
                <textarea
                  className="w-full p-4 h-40 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                  placeholder={
                    formType === 'Immediate'
                      ? 'What is happening right now? Be specific.'
                      : 'How can we help you?'
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full flex items-center justify-center py-4 md:py-6 rounded-full font-bold text-base md:text-lg shadow-2xl transition-all ${formType === 'Immediate' ? 'bg-brand-coral text-white hover:scale-[1.02]' : 'bg-brand-earth text-white hover:bg-brand-earth/90'}`}
              >
                <Send className="w-5 h-5 mr-3" />{' '}
                {formType === 'Immediate' ? 'Send Emergency Alert' : 'Submit Support Ticket'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
