'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wallet,
  Calendar,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Home as HomeIcon,
  Clock,
  Camera,
  Users,
  LayoutGrid,
  Star,
  Image as ImageIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import ChatList from '@/components/ChatList';
import StatusModal from '@/components/StatusModal';

const MOCK_RESERVATIONS = [
  {
    id: 'res1',
    stayId: 's1',
    roomId: 'rm1',
    guestName: 'John Doe',
    checkIn: '2026-06-12',
    checkOut: '2026-06-15',
    status: 'Confirmed',
    totalPrice: 450000,
    currency: 'TZS',
  },
  {
    id: 'res2',
    stayId: 's1',
    roomId: 'rm2',
    guestName: 'Sarah Jenkins',
    checkIn: '2026-06-14',
    checkOut: '2026-06-16',
    status: 'Pending',
    totalPrice: 120000,
    currency: 'USD',
  },
];

const MOCK_ROOMS = [
  {
    id: 'rm1',
    tier: 'Luxury',
    pictures: [
      'https://picsum.photos/seed/room1/400/300',
      'https://picsum.photos/seed/room1b/400/300',
    ],
    beds: 2,
    price: 150000,
    currency: 'TZS',
    isAvailable: true,
  },
  {
    id: 'rm2',
    tier: 'Standard',
    pictures: ['https://picsum.photos/seed/room2/400/300'],
    beds: 1,
    price: 60,
    currency: 'USD',
    isAvailable: false,
  },
];

export default function StayProviderDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('reservations');
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [rooms, setRooms] = useState(MOCK_ROOMS);
  const [reservations] = useState(MOCK_RESERVATIONS);
  const [showReviewUserModal, setShowReviewUserModal] = useState(false);
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [checkoutTime, setCheckoutTime] = useState('12:00 PM');

  const [showStatus, setShowStatus] = useState(false);
  const [statusConfig, setStatusConfig] = useState({ type: 'success', title: '', message: '' });

  const triggerStatus = (type, title, message) => {
    setStatusConfig({ type, title, message });
    setShowStatus(true);
  };

  const [newRoom, setNewRoom] = useState({
    tier: 'Standard',
    beds: 1,
    price: 0,
    currency: 'USD',
    isAvailable: true,
  });

  const handleAddRoom = (e) => {
    e.preventDefault();
    const room = {
      ...newRoom,
      id: 'rm' + (rooms.length + 1),
      pictures:
        selectedPhotos.length > 0
          ? selectedPhotos
          : ['https://picsum.photos/seed/room' + Date.now() + '/400/300'],
    };
    setRooms([...rooms, room]);
    setShowAddRoom(false);
    setSelectedPhotos([]);
    triggerStatus(
      'success',
      'Room Created',
      `Excellent! Your new ${room.tier} room has been successfully added to your inventory and is now live for bookings.`
    );
  };

  const simulatePhotoUpload = () => {
    const newPhoto = `https://picsum.photos/seed/room${Date.now()}/400/300`;
    setSelectedPhotos([...selectedPhotos, newPhoto]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="2xl:max-w-7xl mx-auto px-4 md:px-6 pt-5 md:pt-18 pb-12 md:pb-20"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 text-brand-earth">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 space-y-8">
          <div className="text-center lg:text-left">
            <div className="relative inline-block mb-4">
              <img
                src="https://picsum.photos/seed/stay/200/200"
                className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl object-cover"
                alt="profile"
              />
              <div className="absolute -bottom-1 -right-1 bg-brand-teal text-white p-2 rounded-xl border-2 border-white">
                <HomeIcon className="w-4 h-4" />
              </div>
            </div>
            <h2 className="font-serif text-3xl">West Park Hotels</h2>
            <p className="text-xs text-brand-earth/40 font-bold uppercase tracking-widest mt-1">
              Lagos, Nigeria
            </p>
            <button 
              onClick={() => router.push(`/reviews/1`)}
              className="flex items-center justify-center md:justify-start space-x-1 text-brand-saffron mt-2 hover:scale-105 transition-transform w-full"
            >
               <Star className="w-3 h-3 fill-current" />
               <span className="text-xs font-bold text-brand-earth">4.8 (124 reviews)</span>
            </button>
          </div>

          <nav className="flex overflow-x-auto lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 pb-4 lg:pb-0 no-scrollbar">
            <TabButton
              active={activeTab === 'reservations'}
              icon={<Calendar className="w-4 h-4" />}
              label="Reservations"
              onClick={() => setActiveTab('reservations')}
            />
            <TabButton
              active={activeTab === 'rooms'}
              icon={<LayoutGrid className="w-4 h-4" />}
              label="My Rooms"
              onClick={() => setActiveTab('rooms')}
            />
            <TabButton
              active={activeTab === 'wallet'}
              icon={<Wallet className="w-4 h-4" />}
              label="Wallet"
              onClick={() => setActiveTab('wallet')}
            />
            <TabButton
              active={activeTab === 'calendar'}
              icon={<Calendar className="w-4 h-4" />}
              label="Availability Calendar"
              onClick={() => setActiveTab('calendar')}
            />
            <TabButton
              active={activeTab === 'reviews'}
              icon={<Star className="w-4 h-4" />}
              label="Guest Reviews & Ratings"
              onClick={() => setActiveTab('reviews')}
            />
            <TabButton
              active={activeTab === 'messages'}
              icon={<MessageSquare className="w-4 h-4" />}
              label="Message Center"
              onClick={() => setActiveTab('messages')}
            />
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-12">
          {activeTab === 'reservations' && (
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-3xl">Reservations</h3>
                <span className="text-xs font-bold text-brand-earth/40 uppercase tracking-widest">
                  {reservations.length} Bookings
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {reservations.map((res) => (
                  <div
                    key={res.id}
                    className="glass-card rounded-3xl md:rounded-[40px] p-6 md:p-8 border border-brand-earth/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6"
                  >
                    <div className="flex items-center space-x-4 md:space-x-6">
                      <div className="p-3 md:p-4 bg-brand-warm rounded-2xl md:rounded-3xl">
                        <Users className="w-6 h-6 md:w-8 md:h-8 text-brand-earth/30" />
                      </div>
                      <div>
                        <h4 className="font-serif text-xl md:text-2xl">{res.guestName}</h4>
                        <p className="text-[10px] text-brand-earth/40 font-bold uppercase tracking-widest">
                          {res.checkIn} to {res.checkOut}
                        </p>
                        {res.status === 'Confirmed' && (
                          <button
                            onClick={() =>
                              triggerStatus(
                                'success',
                                'Stay Completed',
                                `Thank you for hosting ${res.guestName}. The stay has been marked as complete and funds will be released to your wallet.`
                              )
                            }
                            className="mt-4 w-full py-2 bg-brand-teal text-white rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-brand-teal/90 transition-all shadow-md"
                          >
                            Mark as Complete
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="text-left md:text-right mt-2 md:mt-0 w-full md:w-auto">
                      <div className="text-lg md:text-xl font-serif text-brand-teal italic mb-2">
                        {res.currency} {res.totalPrice.toLocaleString()}
                      </div>
                      <span
                        className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${res.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}
                      >
                        {res.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'rooms' && (
            <section className="space-y-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-serif text-3xl">My Rooms</h3>
                </div>
                <div className="flex items-center gap-4 bg-brand-warm rounded-full px-6 py-2 border border-brand-earth/10">
                  <div className="flex items-center gap-2 pr-4 border-r border-brand-earth/10">
                    <Clock className="w-4 h-4 text-brand-earth/40" />
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">
                        Checkout
                      </span>
                      <select
                        value={checkoutTime}
                        onChange={(e) => {
                          setCheckoutTime(e.target.value);
                          triggerStatus(
                            'success',
                            'Settings Updated',
                            `Global checkout time set to ${e.target.value}. All room listings will reflect this.`
                          );
                        }}
                        className="bg-transparent text-xs font-bold outline-none cursor-pointer"
                      >
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddRoom(true)}
                    className="w-full md:w-auto bg-brand-earth text-white px-6 py-3 rounded-full text-xs font-bold flex items-center justify-center hover:bg-brand-earth/90 transition-all shadow-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Create New Room
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="glass-card rounded-[48px] overflow-hidden border border-brand-earth/5 group shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className="relative h-48">
                      <img
                        src={room.pictures[0]}
                        className="w-full h-full object-cover"
                        alt="room"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase italic border shadow-sm text-brand-earth">
                        {room.tier}
                      </div>
                      {room.pictures.length > 1 && (
                        <div className="absolute bottom-4 right-4 bg-brand-earth/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center">
                          <ImageIcon className="w-3 h-3 mr-1" /> {room.pictures.length} Photos
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <p className="text-[10px] text-brand-earth/40 font-bold uppercase tracking-widest mb-1">
                            {room.beds} Bed(s)
                          </p>
                          <h4 className="font-serif text-xl">
                            {room.currency} {room.price.toLocaleString()}{' '}
                            <span className="text-xs font-sans opacity-40 italic">/ night</span>
                          </h4>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-3 bg-brand-warm rounded-full text-brand-earth/60 hover:text-brand-earth transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-3 bg-brand-coral/10 rounded-full text-brand-coral hover:bg-brand-coral hover:text-white transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div
                        className={`text-center py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest ${room.isAvailable ? 'bg-brand-teal/10 text-brand-teal' : 'bg-brand-earth/5 text-brand-earth/30'}`}
                      >
                        {room.isAvailable ? 'Available for Booking' : 'Fully Occupied'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'wallet' && (
            <section className="space-y-8 md:space-y-12">
              <div className="bg-brand-earth text-white p-8 md:p-12 rounded-3xl md:rounded-[60px] relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2 md:mb-4">
                    Account Balance
                  </p>
                  <h3 className="font-serif text-4xl md:text-6xl mb-8 md:mb-12">USD 14,250.00</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="bg-brand-teal text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl"
                      onClick={() =>
                        triggerStatus(
                          'success',
                          'Request Dispatched',
                          'Your payout request has been successfully submitted to our financial department. You will receive a confirmation once the funds have been processed (typically 24-48 hours).'
                        )
                      }
                    >
                      Request Payout
                    </button>
                    <button className="bg-white/10 text-white px-8 py-4 rounded-full font-bold text-sm border border-white/20 hover:bg-white/20 transition-all">
                      Withdraw History
                    </button>
                  </div>
                </div>
                <Wallet className="absolute -bottom-20 -right-20 w-80 h-80 opacity-5" />
              </div>

              <div className="space-y-6">
                <h4 className="font-serif text-2xl px-2">Recent Payouts</h4>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="glass-card rounded-3xl md:rounded-[32px] p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-brand-earth/5"
                  >
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-warm rounded-xl md:rounded-2xl flex items-center justify-center font-bold text-brand-earth/40 text-xs md:text-base">
                        #{i}
                      </div>
                      <div>
                        <p className="text-sm font-bold">Payout Ref: STM-923{i}</p>
                        <p className="text-[10px] text-brand-earth/40 font-bold uppercase tracking-widest">
                          April {10 + i}, 2026
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-lg text-brand-teal">+$1,500.00</p>
                      <p className="text-[9px] text-green-600 font-bold uppercase">Settled</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'calendar' && (
            <section className="glass-card rounded-3xl md:rounded-[48px] w-full lg:max-w-[calc(100vw-400px)] p-4 md:p-8 lg:p-12 border border-brand-earth/5 shadow-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-6">
                <div>
                  <h3 className="font-serif text-3xl mb-2">Availability Calendar</h3>
                  <p className="text-xs text-brand-earth/40 font-bold uppercase tracking-widest">
                    July 2026 • Management View
                  </p>
                </div>
                <div className="flex overflow-x-auto bg-brand-warm rounded-full p-1 border border-brand-earth/5 no-scrollbar">
                  {['Standard', 'Luxury', 'All'].map((t) => (
                    <button
                      key={t}
                      className={`px-4 md:px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${t === 'All' ? 'bg-brand-earth text-white shadow-lg' : 'text-brand-earth/40 hover:text-brand-earth'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto pb-4">
                <table className="w-full min-w-max border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 md:p-4 text-left font-serif text-sm md:text-lg border-b border-brand-earth/10 sticky left-0 bg-white z-20 w-32 md:w-40 lg:w-48">
                        Room Tier
                      </th>
                      {[...Array(14)].map((_, i) => (
                        <th key={i} className="p-2 md:p-4 border-b border-brand-earth/10 min-w-[50px] md:min-w-[60px]">
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] uppercase font-bold text-brand-earth/40">
                              Jul
                            </span>
                            <span className="text-sm font-bold">{12 + i}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room) => (
                      <tr key={room.id} className="group hover:bg-brand-warm/20 transition-all">
                        <td className="p-2 md:p-4 border-b border-brand-earth/5 sticky left-0 bg-white/80 backdrop-blur-md z-10 group-hover:bg-brand-warm/30 transition-all">
                          <div className="flex items-center space-x-2 md:space-x-3">
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-brand-earth/5 flex items-center justify-center">
                              <HomeIcon className="w-3 h-3 md:w-4 md:h-4 text-brand-earth/30" />
                            </div>
                            <div>
                              <p className="text-xs md:text-sm font-bold">{room.tier}</p>
                              <p className="hidden md:block text-[9px] text-brand-earth/40 font-bold uppercase">
                                ID: {room.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        {[...Array(14)].map((_, i) => {
                          const isBooked = Math.random() > 0.7; // Simulating some bookings
                          return (
                            <td key={i} className="p-1 border-b border-brand-earth/5 relative h-16 md:h-20">
                              {isBooked ? (
                                <div
                                  className={`h-full w-full rounded-xl flex flex-col justify-center px-2 cursor-pointer transition-all border shadow-sm ${i % 4 === 0
                                    ? 'bg-brand-teal/10 border-brand-teal/20 text-brand-teal'
                                    : 'bg-brand-earth/5 border-brand-earth/10 text-brand-earth/40'
                                    }`}
                                >
                                  <span className="text-[8px] font-bold uppercase truncate">
                                    Booked
                                  </span>
                                  <span className="text-[9px] font-serif truncate">
                                    Res-{123 + i}
                                  </span>
                                </div>
                              ) : (
                                <div className="h-full w-full rounded-xl bg-transparent hover:bg-brand-teal/5 cursor-pointer flex items-center justify-center group/cell transition-all">
                                  <Plus className="w-4 h-4 text-brand-earth/0 group-hover/cell:text-brand-earth/20 transition-all" />
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 items-center pt-8 border-t border-brand-earth/5">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-brand-teal" />
                  <span className="text-[10px] font-bold text-brand-earth/60 uppercase tracking-widest">
                    Active Booking
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-brand-earth/20" />
                  <span className="text-[10px] font-bold text-brand-earth/60 uppercase tracking-widest">
                    Blocked / Maintenance
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full border border-dashed border-brand-earth/20" />
                  <span className="text-[10px] font-bold text-brand-earth/60 uppercase tracking-widest">
                    Empty / Available
                  </span>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'reviews' && (
            <section className="space-y-12">
              <div className="bg-brand-warm/30 p-10 rounded-[60px] border border-brand-earth/5">
                <h3 className="font-serif text-3xl mb-4 italic">Guest Insights</h3>
                <p className="text-sm text-brand-earth/60 max-w-lg">
                  Build relationships with your guests by responding to their feedback and rating
                  their stay at West Park Hotels.
                </p>
              </div>

              <div className="space-y-8">
                <h4 className="font-serif text-2xl px-2">Traveler Reviews</h4>
                {[1].map((i) => (
                  <div
                    key={i}
                    className="glass-card rounded-3xl md:rounded-[40px] p-6 md:p-8 border border-brand-earth/5"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 md:mb-6 gap-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://picsum.photos/seed/user1/100/100"
                          className="w-12 h-12 rounded-full"
                          alt="guest"
                        />
                        <div>
                          <h6 className="font-bold">John Doe</h6>
                          <p className="text-[10px] text-brand-earth/40 uppercase font-bold tracking-widest leading-loose">
                            Luxury Suite • June 12-15
                          </p>
                        </div>
                      </div>
                      <div className="flex text-brand-saffron">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm italic mb-8 leading-relaxed">
                      "The room was pristine and the hospitality was unmatched. Loved the local
                      touches in the decor."
                    </p>
                    <button
                      onClick={() => {
                        setSelectedReview({ id: 'rev1', travelerName: 'John Doe' });
                        setShowReplyModal(true);
                      }}
                      className="text-[10px] font-bold uppercase tracking-widest text-brand-teal hover:underline flex items-center"
                    >
                      <MessageSquare className="w-3 h-3 mr-2" /> Reply to Guest
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-8">
                <h4 className="font-serif text-2xl px-2">Rate Your Guests</h4>
                {[1].map((i) => (
                  <div
                    key={i}
                    className="glass-card rounded-3xl md:rounded-[40px] p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border border-brand-earth/5 hover:border-brand-teal/20 transition-all gap-4"
                  >
                    <div className="flex items-center space-x-4 md:space-x-6">
                      <img
                        src="https://picsum.photos/seed/user2/100/100"
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                        alt="guest"
                      />
                      <div>
                        <h6 className="font-bold text-base md:text-lg">Sarah Jenkins</h6>
                        <p className="text-[10px] text-brand-earth/40 uppercase font-bold tracking-widest">
                          Standard Room • Checkout Today
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTraveler({ id: 'u2', name: 'Sarah Jenkins' });
                        setShowReviewUserModal(true);
                      }}
                      className="px-8 py-3 bg-brand-earth text-white rounded-full text-xs font-bold shadow-xl hover:bg-brand-teal transition-all"
                    >
                      Rate Guest
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'messages' && <ChatList />}
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
              className="relative bg-white rounded-[48px] p-12 max-w-md w-full shadow-2xl"
            >
              <h3 className="font-serif text-4xl mb-4 italic">Rate Guest</h3>
              <p className="text-sm opacity-60 mb-8">
                How was {selectedTraveler.name}'s stay? Your feedback helps maintain a great
                community.
              </p>

              <div className="flex justify-center space-x-2 mb-10">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-10 h-10 text-brand-saffron fill-current cursor-pointer hover:scale-110 transition-transform"
                  />
                ))}
              </div>

              <textarea
                placeholder="Guest was clean, respectful of house rules, and checked out on time..."
                className="w-full h-40 p-6 bg-brand-warm rounded-[32px] border-none outline-none text-sm mb-10 resize-none shadow-inner"
              />

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowReviewUserModal(false)}
                  className="py-5 border border-brand-earth/10 rounded-full font-bold text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    triggerStatus(
                      'success',
                      'Guest Rated',
                      `Thank you for rating ${selectedTraveler.name}. Your feedback is invaluable to our provider community.`
                    );
                    setShowReviewUserModal(false);
                  }}
                  className="py-5 bg-brand-teal text-white rounded-full font-bold text-xs shadow-xl uppercase tracking-widest"
                >
                  Confirm Rating
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
              className="relative bg-white rounded-[48px] p-12 max-w-md w-full shadow-2xl text-brand-earth"
            >
              <h3 className="font-serif text-4xl mb-4 italic">Reply to Guest</h3>
              <p className="text-sm opacity-60 mb-8">
                Send a nice message to {selectedReview.travelerName}.
              </p>

              <textarea
                placeholder="Thank you for staying with us! We hope to see you again soon..."
                className="w-full h-40 p-6 bg-brand-warm rounded-[32px] border-none outline-none text-sm mb-10 resize-none shadow-inner"
              />

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="py-5 border border-brand-earth/10 rounded-full font-bold text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    triggerStatus(
                      'success',
                      'Reply Published',
                      'Your response has been successfully posted. Guests appreciate the engagement!'
                    );
                    setShowReplyModal(false);
                  }}
                  className="py-5 bg-brand-teal text-white rounded-full font-bold text-xs shadow-xl uppercase tracking-widest"
                >
                  Send Reply
                </button>
              </div>
            </motion.div>
          </div>
        )}
        {showAddRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 text-brand-earth">
            <div
              className="absolute inset-0 bg-brand-earth/80 backdrop-blur-sm"
              onClick={() => setShowAddRoom(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-[48px] p-10 max-w-xl w-full shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <h3 className="font-serif text-3xl mb-8">Create New Room</h3>
              <form onSubmit={handleAddRoom} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                      Room Tier
                    </label>
                    <select
                      className="w-full p-4 rounded-2xl bg-brand-warm border-none outline-none text-sm appearance-none"
                      value={newRoom.tier}
                      onChange={(e) => setNewRoom({ ...newRoom, tier: e.target.value })}
                    >
                      <option>Standard</option>
                      <option>Studio</option>
                      <option>Luxury</option>
                      <option>Penthouse</option>
                      <option>Suite</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                      Number of Beds
                    </label>
                    <input
                      type="number"
                      className="w-full p-4 rounded-2xl bg-brand-warm border-none outline-none text-sm"
                      value={newRoom.beds}
                      onChange={(e) => setNewRoom({ ...newRoom, beds: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                      Price per Night
                    </label>
                    <input
                      type="number"
                      className="w-full p-4 rounded-2xl bg-brand-warm border-none outline-none text-sm font-bold"
                      value={newRoom.price}
                      onChange={(e) => setNewRoom({ ...newRoom, price: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                      Currency
                    </label>
                    <select
                      className="w-full p-4 rounded-2xl bg-brand-warm border-none outline-none text-sm appearance-none"
                      value={newRoom.currency}
                      onChange={(e) => setNewRoom({ ...newRoom, currency: e.target.value })}
                    >
                      <option>USD</option>
                      <option>TZS</option>
                      <option>JMD</option>
                      <option>GHS</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div
                    onClick={simulatePhotoUpload}
                    className="p-8 border-2 border-dashed border-brand-earth/10 rounded-[32px] text-center cursor-pointer hover:bg-brand-warm/50 transition-all"
                  >
                    <Camera className="w-8 h-8 text-brand-earth/10 mx-auto mb-4" />
                    <p className="text-[10px] uppercase font-bold tracking-widest text-brand-earth/40">
                      Upload Room Pictures (Multiple)
                    </p>
                  </div>

                  {selectedPhotos.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {selectedPhotos.map((p, idx) => (
                        <div
                          key={idx}
                          className="relative w-20 h-20 rounded-xl overflow-hidden group"
                        >
                          <img src={p} className="w-full h-full object-cover" alt="preview" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                            <Trash2
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPhotos(selectedPhotos.filter((_, i) => i !== idx));
                              }}
                              className="w-4 h-4 text-white cursor-pointer"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddRoom(false);
                      setSelectedPhotos([]);
                    }}
                    className="flex-1 py-4 border border-brand-earth/10 font-bold rounded-full text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] py-4 bg-brand-teal text-white font-bold rounded-full text-xs shadow-xl"
                  >
                    Create Room
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
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

function TabButton({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-2 md:space-x-3 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${active ? 'bg-brand-earth text-white' : 'hover:bg-brand-earth/5 text-brand-earth/60'}`}
    >
      <div className={active ? 'text-brand-teal' : ''}>{icon}</div>
      <span className="truncate">{label}</span>
    </button>
  );
}
