'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MessageSquare, UserX, Send, Mail } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import StatusModal from '@/components/StatusModal';

const MOCK_PARTICIPANTS = [
  {
    id: 'u1',
    name: 'John Doe',
    photo: 'https://picsum.photos/seed/u1/100/100',
    email: 'john@example.com',
  },
  {
    id: 'u2',
    name: 'Sarah Jenkins',
    photo: 'https://picsum.photos/seed/u2/100/100',
    email: 'sarah@example.com',
  },
  {
    id: 'u3',
    name: 'Emma Omollo',
    photo: 'https://picsum.photos/seed/u3/100/100',
    email: 'emma@example.com',
  },
  {
    id: 'u4',
    name: 'Mark Ochieng',
    photo: 'https://picsum.photos/seed/u4/100/100',
    email: 'mark@example.com',
  },
  {
    id: 'u5',
    name: 'Zuberi Bakari',
    photo: 'https://picsum.photos/seed/u5/100/100',
    email: 'zuberi@example.com',
  },
  {
    id: 'u6',
    name: 'Pelu Yusuf',
    photo: 'https://picsum.photos/seed/u6/100/100',
    email: 'pelu@example.com',
  },
  {
    id: 'u7',
    name: 'Kofi Mensah',
    photo: 'https://picsum.photos/seed/u7/100/100',
    email: 'kofi@example.com',
  },
  {
    id: 'u8',
    name: 'Grace Adama',
    photo: 'https://picsum.photos/seed/u8/100/100',
    email: 'grace@example.com',
  },
];

export default function ParticipantList() {
  const { bookingId } = useParams();
  const [participants, setParticipants] = useState(MOCK_PARTICIPANTS);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const [showStatus, setShowStatus] = useState(false);
  const [statusConfig, setStatusConfig] = useState({ type: 'success', title: '', message: '' });

  const triggerStatus = (type, title, message) => {
    setStatusConfig({ type, title, message });
    setShowStatus(true);
  };

  const handleRemove = (id) => {
    // Note: Standard JS confirm is used here for simplicity as a full confirmation modal isn't requested,
    // but we replace the success/error with StatusModal.
    if (confirm('Are you sure you want to remove this participant? They will be fully refunded.')) {
      setParticipants(participants.filter((p) => p.id !== id));
      triggerStatus(
        'success',
        'Participant Removed',
        'The participant has been successfully removed from this booking. A full refund has been initiated to their original payment method.'
      );
    }
  };

  const handleBroadcast = () => {
    if (!broadcastMessage.trim()) return;
    triggerStatus(
      'success',
      'Information Broadcasted',
      `Your message has been successfully broadcasted to all ${participants.length} participants in this booking. They will receive it in their personal notification feeds.`
    );
    setBroadcastMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-6 py-12 text-brand-earth"
    >
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center space-x-6">
          <Link
            href="/guide/dashboard"
            className="p-3 bg-brand-warm rounded-full hover:bg-brand-earth hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-serif text-4xl mb-1">Booking Participants</h1>
            <p className="text-brand-earth/60">
              Managing participants for Serengeti Migration Safari (ID: {bookingId})
            </p>
          </div>
        </div>
        <div className="bg-brand-teal/10 text-brand-teal px-6 py-3 rounded-full font-bold text-sm">
          {participants.length} Total Participants
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Participants List */}
        <div className="lg:col-span-2 space-y-4">
          {participants.map((p) => (
            <div
              key={p.id}
              className="glass-card rounded-3xl p-6 flex items-center justify-between border border-brand-earth/5 hover:border-brand-teal/20 transition-all"
            >
              <div className="flex items-center space-x-4">
                <img src={p.photo} className="w-12 h-12 rounded-full" alt={p.name} />
                <div>
                  <h4 className="font-bold">{p.name}</h4>
                  <p className="text-[10px] text-brand-earth/40 uppercase tracking-widest">
                    {p.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-3 bg-brand-warm text-brand-earth rounded-full hover:bg-brand-teal hover:text-white transition-all">
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleRemove(p.id)}
                  className="p-3 bg-brand-warm text-brand-coral rounded-full hover:bg-brand-coral hover:text-white transition-all"
                >
                  <UserX className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Broadcast Box */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-[40px] p-8 border border-brand-earth/5 sticky top-32">
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="w-6 h-6 text-brand-teal" />
              <h3 className="font-serif text-2xl italic">Broadcast Info</h3>
            </div>
            <p className="text-xs text-brand-earth/60 mb-8 leading-relaxed">
              Send an important update to all participants in this booking. They will receive it in
              their personal chat.
            </p>
            <textarea
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="Important: Meeting point changed to Gate 2..."
              className="w-full h-40 p-4 bg-brand-warm rounded-2xl border-none outline-none text-sm mb-6 resize-none shadow-inner"
            />

            <button
              onClick={handleBroadcast}
              className="w-full bg-brand-earth text-white py-4 rounded-full font-bold flex items-center justify-center shadow-xl hover:bg-brand-teal transition-all"
            >
              <Send className="w-4 h-4 mr-2" />
              Broadast Message
            </button>
          </div>
        </div>
      </div>

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
