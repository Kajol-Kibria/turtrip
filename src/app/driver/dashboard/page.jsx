'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car,
  DollarSign,
  Clock,
  CheckCircle,
  Eye,
  EyeOff,
  Star,
  Wallet,
  MessageSquare,
} from 'lucide-react';
import { MOCK_RIDE_REQUESTS } from '@/mockData';

import ChatList from '@/components/ChatList';
import StatusModal from '@/components/StatusModal';

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [requests, setRequests] = useState(MOCK_RIDE_REQUESTS);
  const [activeTab, setActiveTab] = useState('requests');
  const [pricing, setPricing] = useState({ perKm: 1200, waitingFee: 5000, acceptsRoundTrip: true });
  const [payoutDetails, setPayoutDetails] = useState({
    accountName: 'Zuberi Bakari',
    accountNumber: '2456789012',
    bankName: 'CRDB Bank',
  });
  const [showReviewUserModal, setShowReviewUserModal] = useState(false);
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const [showStatus, setShowStatus] = useState(false);
  const [statusConfig, setStatusConfig] = useState({ type: 'success', title: '', message: '' });

  const triggerStatus = (type, title, message) => {
    setStatusConfig({ type, title, message });
    setShowStatus(true);
  };

  const [vehicle, setVehicle] = useState({
    type: 'Safari Van',
    make: 'Toyota',
    model: 'Land Cruiser',
    color: 'White',
    plateNumber: 'TZ 123 ABC',
    picture:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400',
    maxPassengers: 8,
    status: 'Approved',
  });
  const [vehicleEdit, setVehicleEdit] = useState({ ...vehicle });
  const [isEditingVehicle, setIsEditingVehicle] = useState(false);

  const handleVehicleUpdate = () => {
    setVehicle({ ...vehicle, status: 'Pending Review' });
    setIsEditingVehicle(false);
    triggerStatus(
      'success',
      'Update Submitted',
      'Your vehicle change request has been successfully submitted for administrative review. You will be notified once the details are verified.'
    );
  };

  const handleAcceptRide = (id) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: 'Accepted' } : r)));
    triggerStatus(
      'success',
      'Ride Accepted',
      'You have successfully accepted the ride. The passenger has been notified of your status.'
    );
  };

  const handleCompleteRide = (id) => {
    setRequests(requests.filter((r) => r.id !== id));
    triggerStatus(
      'success',
      'Ride Completed',
      'Excellent work! The trip has been marked as complete, and your earnings have been scheduled for payout.'
    );
  };

  const handleTransferRide = (id) => {
    setRequests(requests.filter((r) => r.id !== id));
    triggerStatus(
      'success',
      'Ride Transferred',
      'The ride request has been transferred to the nearest available driver. The passenger has been notified.'
    );
  };

  const stats = [
    { label: 'Today Earnings', value: 'TSh 125,000', icon: DollarSign },
    { label: 'Completed Rides', value: '124', icon: CheckCircle },
    { label: 'Rating', value: '4.92', icon: Star },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 text-brand-earth">
        <div>
          <h1 className="font-serif text-3xl md:text-5xl mb-2">Driver Dashboard</h1>
          <p className="text-sm md:text-base text-brand-earth/60">
            Manage your trips, vehicle, and earnings.
          </p>
        </div>

        <div className="flex items-center space-x-4 bg-white p-2 rounded-full shadow-lg border border-brand-earth/5">
          <span
            className={`text-[10px] uppercase font-bold tracking-widest pl-4 ${isOnline ? 'text-brand-teal' : 'text-brand-earth/40'}`}
          >
            {isOnline ? 'You are Online' : 'You are Offline'}
          </span>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`p-4 rounded-full transition-all ${isOnline ? 'bg-brand-teal text-white shadow-brand-teal/20' : 'bg-brand-earth/10 text-brand-earth/40'}`}
          >
            {isOnline ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Quick Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-brand-earth text-white rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-2">
                Total Wallet
              </p>
              <h2 className="text-4xl font-serif mb-4">TSh 452,000</h2>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    triggerStatus(
                      'success',
                      'Payout Requested',
                      'Your payout request has been sent to our finance team for review. You will receive a notification once the funds are processed.'
                    )
                  }
                  className="text-xs font-bold bg-white text-brand-earth px-4 py-2 rounded-full hover:bg-white/80 transition-all shadow-lg"
                >
                  Request Payout
                </button>
                <button className="text-[10px] font-bold bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all">
                  Withdraw History
                </button>
              </div>
            </div>
            <Wallet className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10" />
          </div>

          <div className="space-y-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass-card rounded-3xl p-6 flex items-center justify-between border border-brand-earth/5"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-brand-warm text-brand-earth">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-brand-earth/40">{stat.label}</span>
                </div>
                <span className="font-serif text-xl">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-brand-teal/5 rounded-[40px] border border-brand-teal/10">
            <h4 className="text-sm font-bold text-brand-earth mb-4">Vehicle Health</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60 text-brand-earth">Status</span>
                <span className="font-bold text-brand-teal">Verified</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60 text-brand-earth">Last Service</span>
                <span className="font-bold text-brand-earth">12 Days Ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex border-b border-brand-earth/10 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-8 py-4 text-sm font-bold transition-all relative ${activeTab === 'requests' ? 'text-brand-earth' : 'text-brand-earth/40 hover:text-brand-earth'}`}
            >
              Ride Requests
              {activeTab === 'requests' && (
                <motion.div
                  layoutId="tab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-earth"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-8 py-4 text-sm font-bold transition-all relative ${activeTab === 'history' ? 'text-brand-earth' : 'text-brand-earth/40 hover:text-brand-earth'}`}
            >
              Ride History
              {activeTab === 'history' && (
                <motion.div
                  layoutId="tab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-earth"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-8 py-4 text-sm font-bold transition-all relative ${activeTab === 'messages' ? 'text-brand-earth' : 'text-brand-earth/40 hover:text-brand-earth'}`}
            >
              Message Center
              {activeTab === 'messages' && (
                <motion.div
                  layoutId="tab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-earth"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-8 py-4 text-sm font-bold transition-all relative ${activeTab === 'settings' ? 'text-brand-earth' : 'text-brand-earth/40 hover:text-brand-earth'}`}
            >
              Trip Settings
              {activeTab === 'settings' && (
                <motion.div
                  layoutId="tab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-earth"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-8 py-4 text-sm font-bold transition-all relative ${activeTab === 'completed' ? 'text-brand-earth' : 'text-brand-earth/40 hover:text-brand-earth'}`}
            >
              Completed
              {activeTab === 'completed' && (
                <motion.div
                  layoutId="tab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-earth"
                />
              )}
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === 'requests' && (
              <>
                {!isOnline ? (
                  <div className="p-12 text-center rounded-[40px] border-2 border-dashed border-brand-earth/10">
                    <EyeOff className="w-12 h-12 mx-auto text-brand-earth/20 mb-4" />
                    <h3 className="font-serif text-2xl mb-2 text-brand-earth">You are Offline</h3>
                    <p className="text-sm text-brand-earth/60 max-w-xs mx-auto">
                      Toggle online to start receiving ride requests in your area.
                    </p>
                  </div>
                ) : (
                  requests.map((req) => (
                    <div
                      key={req.id}
                      className="glass-card rounded-[40px] p-8 border border-brand-earth/5 hover:border-brand-teal/30 transition-all group"
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-8">
                        <div className="space-y-6 flex-1 text-brand-earth">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-warm">
                              <img src={`https://picsum.photos/seed/${req.id}/100/100`} alt="pax" />
                            </div>
                            <div>
                              <h4 className="font-bold">{req.passengerName}</h4>
                              <div className="flex items-center space-x-2">
                                <p className="text-[10px] text-brand-teal uppercase font-bold tracking-widest">
                                  {req.paxCount} Passengers
                                </p>
                                <span
                                  className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${req.isRoundTrip ? 'bg-brand-teal/10 text-brand-teal' : 'bg-brand-earth/5 text-brand-earth/40'}`}
                                >
                                  {req.isRoundTrip ? 'Round Trip' : 'One Way'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4 relative">
                            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-brand-earth/5" />
                            <div className="flex items-start space-x-4 relative">
                              <div className="w-4 h-4 rounded-full border-2 border-brand-teal bg-white z-10 mt-1" />
                              <div>
                                <p className="text-[10px] uppercase font-bold opacity-40">
                                  Pickup • {req.time || '10:00 AM'}
                                </p>
                                <p className="text-sm font-bold">{req.pickupLocation}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4 relative">
                              <div className="w-4 h-4 rounded-full border-2 border-brand-coral bg-white z-10 mt-1" />
                              <div>
                                <p className="text-[10px] uppercase font-bold opacity-40">
                                  Drop-off
                                </p>
                                <p className="text-sm font-bold">{req.destination}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="md:w-64 flex flex-col justify-between border-l border-brand-earth/5 pl-8 text-brand-earth">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[10px] uppercase font-bold opacity-40 mb-1">
                                Fare
                              </p>
                              <h2 className="text-2xl font-serif text-brand-earth">
                                {req.currency} {req.price.toLocaleString()}
                              </h2>
                            </div>
                            <button className="p-3 bg-brand-warm text-brand-earth rounded-full hover:bg-brand-teal hover:text-white transition-all">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-3 mt-8">
                            {req.status === 'Pending' ? (
                              <>
                                <button
                                  onClick={() => handleAcceptRide(req.id)}
                                  className="w-full py-4 bg-brand-teal text-white rounded-full text-xs font-bold shadow-xl hover:bg-brand-teal/90 transition-all flex items-center justify-center"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" /> Accept Ride
                                </button>
                                <button
                                  onClick={() => handleTransferRide(req.id)}
                                  className="w-full py-4 bg-brand-earth text-white rounded-full text-xs font-bold shadow-xl hover:bg-brand-coral transition-all"
                                >
                                  Transfer Request
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleCompleteRide(req.id)}
                                  className="w-full py-4 bg-brand-teal text-white rounded-full text-xs font-bold shadow-xl hover:bg-brand-teal/90 transition-all flex items-center justify-center"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" /> Mark as Complete
                                </button>
                                <button
                                  onClick={() => handleTransferRide(req.id)}
                                  className="w-full py-4 bg-brand-earth text-white rounded-full text-xs font-bold shadow-xl hover:bg-brand-coral transition-all"
                                >
                                  Transfer Ride
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="glass-card rounded-[32px] p-6 flex flex-col sm:flex-row items-center justify-between border border-brand-earth/5 opacity-70 hover:opacity-100 transition-all text-brand-earth"
                  >
                    <div className="flex items-center space-x-6">
                      <img
                        src={`https://picsum.photos/seed/hist${i}/100/100`}
                        className="w-12 h-12 rounded-full"
                        alt="cust"
                      />
                      <div>
                        <h4 className="font-bold text-sm">Completed Ride • April {20 - i}, 2026</h4>
                        <p className="text-xs text-brand-earth/40">
                          From Arusha Center to Serengeti Lodge
                        </p>
                      </div>
                    </div>
                    <div className="text-right mt-4 sm:mt-0">
                      <p className="font-serif text-xl text-brand-teal">+TSh 65,000</p>
                      <div className="flex items-center text-[10px] font-bold text-brand-earth/40 uppercase tracking-widest justify-end">
                        <Star className="w-3 h-3 fill-current text-brand-saffron mr-1" /> 5.0 Rating
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'messages' && <ChatList />}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div className="glass-card rounded-[40px] p-10 space-y-10 border border-brand-earth/5 text-brand-earth">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <h3 className="font-serif text-2xl">Pricing Strategy</h3>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                          Price Per Kilometer (TSh)
                        </label>
                        <input
                          type="number"
                          value={pricing.perKm}
                          onChange={(e) =>
                            setPricing({ ...pricing, perKm: parseInt(e.target.value) })
                          }
                          className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                          Waiting Fee (TSh / Hour)
                        </label>
                        <input
                          type="number"
                          value={pricing.waitingFee}
                          onChange={(e) =>
                            setPricing({ ...pricing, waitingFee: parseInt(e.target.value) })
                          }
                          className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="font-serif text-2xl">Ride Preferences</h3>
                      <div className="flex items-center justify-between p-6 bg-brand-warm rounded-3xl border border-brand-earth/5">
                        <div>
                          <p className="font-bold text-sm">Accept Round Trips</p>
                          <p className="text-[10px] text-brand-earth/40">
                            Enable this to receive return-trip requests
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setPricing({ ...pricing, acceptsRoundTrip: !pricing.acceptsRoundTrip })
                          }
                          className={`w-14 h-8 rounded-full transition-all relative ${pricing.acceptsRoundTrip ? 'bg-brand-teal' : 'bg-brand-earth/20'}`}
                        >
                          <div
                            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${pricing.acceptsRoundTrip ? 'right-1' : 'left-1'}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Settings */}
                <div className="glass-card rounded-[40px] p-10 space-y-10 border border-brand-earth/5 text-brand-earth">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Car className="w-6 h-6 text-brand-teal" />
                      <h3 className="font-serif text-2xl">Vehicle Details</h3>
                    </div>
                    {!isEditingVehicle && vehicle.status === 'Approved' && (
                      <button
                        onClick={() => setIsEditingVehicle(true)}
                        className="text-xs font-bold text-brand-teal hover:underline"
                      >
                        Request Change
                      </button>
                    )}
                    {vehicle.status === 'Pending Review' && (
                      <div className="flex items-center px-4 py-1.5 bg-brand-saffron/10 text-brand-saffron rounded-full text-[10px] font-bold uppercase tracking-widest border border-brand-saffron/20">
                        <Clock className="w-3 h-3 mr-2" /> Pending Review
                      </div>
                    )}
                  </div>

                  {!isEditingVehicle ? (
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="w-full md:w-64 h-48 rounded-[32px] overflow-hidden bg-brand-warm border border-brand-earth/10">
                        <img
                          src={vehicle.picture}
                          alt="vehicle"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                          { label: 'Type', value: vehicle.type },
                          { label: 'Make', value: vehicle.make },
                          { label: 'Model', value: vehicle.model },
                          { label: 'Color', value: vehicle.color },
                          { label: 'Plate Number', value: vehicle.plateNumber },
                          { label: 'Capacity', value: `${vehicle.maxPassengers} Pass.` },
                        ].map((item, idx) => (
                          <div key={idx}>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-1">
                              {item.label}
                            </p>
                            <p className="font-bold text-sm">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                            Vehicle Type
                          </label>
                          <select
                            value={vehicleEdit.type}
                            onChange={(e) =>
                              setVehicleEdit({ ...vehicleEdit, type: e.target.value })
                            }
                            className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none bg-white"
                          >
                            <option>Safari Van (4x4)</option>
                            <option>Sedan / Saloon</option>
                            <option>SUV</option>
                            <option>Minibus</option>
                            <option>Coach / Bus</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                            Make
                          </label>
                          <input
                            type="text"
                            value={vehicleEdit.make}
                            onChange={(e) =>
                              setVehicleEdit({ ...vehicleEdit, make: e.target.value })
                            }
                            className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                            Model
                          </label>
                          <input
                            type="text"
                            value={vehicleEdit.model}
                            onChange={(e) =>
                              setVehicleEdit({ ...vehicleEdit, model: e.target.value })
                            }
                            className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                            Color
                          </label>
                          <input
                            type="text"
                            value={vehicleEdit.color}
                            onChange={(e) =>
                              setVehicleEdit({ ...vehicleEdit, color: e.target.value })
                            }
                            className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                            Plate Number
                          </label>
                          <input
                            type="text"
                            value={vehicleEdit.plateNumber}
                            onChange={(e) =>
                              setVehicleEdit({ ...vehicleEdit, plateNumber: e.target.value })
                            }
                            className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setIsEditingVehicle(false)}
                          className="flex-1 py-4 border border-brand-earth/10 rounded-full font-bold text-xs uppercase tracking-widest"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleVehicleUpdate}
                          className="flex-[2] py-4 bg-brand-earth text-white rounded-full font-bold text-xs shadow-xl uppercase tracking-widest"
                        >
                          Submit Change Request
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="glass-card rounded-[40px] p-10 space-y-10 border border-brand-earth/5 text-brand-earth">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-6 h-6 text-brand-teal" />
                    <h3 className="font-serif text-2xl">Payout Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                        Account Name (Immutable)
                      </label>
                      <input
                        type="text"
                        value={payoutDetails.accountName}
                        readOnly
                        className="w-full p-4 rounded-xl border border-brand-earth/10 bg-brand-earth/5 outline-none cursor-not-allowed opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        value={payoutDetails.bankName}
                        onChange={(e) =>
                          setPayoutDetails({ ...payoutDetails, bankName: e.target.value })
                        }
                        className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={payoutDetails.accountNumber}
                        onChange={(e) =>
                          setPayoutDetails({ ...payoutDetails, accountNumber: e.target.value })
                        }
                        className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-brand-teal/5 rounded-2xl border border-brand-teal/10 flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-brand-teal mt-0.5" />
                    <p className="text-[10px] text-brand-earth/60 italic">
                      Updated payout details will be reviewed by admin before becoming active.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        triggerStatus(
                          'success',
                          'Update Received',
                          'Your updated payout details have been submitted for admin verification. This process usually takes 24 hours.'
                        )
                      }
                      className="btn-primary px-12 !py-4 shadow-xl text-white"
                    >
                      Update and Submit for Review
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'completed' && (
              <section className="space-y-8">
                <div className="bg-brand-warm/30 p-6 rounded-3xl border border-brand-earth/5 text-brand-earth">
                  <h4 className="font-serif text-xl mb-2 italic">Passenger Feedback</h4>
                  <p className="text-xs text-brand-earth/60">
                    See what guests said about your ride and rate them back.
                  </p>
                </div>

                <div className="space-y-6">
                  <h5 className="text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 px-2 text-brand-earth">
                    Traveler Reviews
                  </h5>
                  {[1].map((i) => (
                    <div
                      key={i}
                      className="glass-card rounded-[40px] p-8 border border-brand-earth/5 text-brand-earth"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src="https://picsum.photos/seed/user1/100/100"
                            className="w-12 h-12 rounded-full"
                            alt="pax"
                          />
                          <div>
                            <h6 className="font-bold">Pelu Yusuf</h6>
                            <p className="text-[10px] text-brand-earth/40">City Ride • Yesterday</p>
                          </div>
                        </div>
                        <div className="flex text-brand-saffron">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-brand-earth italic mb-6 leading-relaxed">
                        "Great driver! Very punctual and clean car. Helped with all my heavy
                        luggage."
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
                  <h5 className="text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 px-2 text-brand-earth">
                    Rate Your Passengers
                  </h5>
                  {[1].map((i) => (
                    <div
                      key={i}
                      className="glass-card rounded-[40px] p-6 flex items-center justify-between border border-brand-earth/5 text-brand-earth"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://picsum.photos/seed/user3/100/100"
                          className="w-12 h-12 rounded-full"
                          alt="pax"
                        />
                        <div>
                          <h6 className="font-bold">Emma Watson</h6>
                          <p className="text-[10px] text-brand-earth/40">
                            Airport Drop-off • Fully Funded
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedTraveler({ id: 'u3', name: 'Emma Watson' });
                          setShowReviewUserModal(true);
                        }}
                        className="px-6 py-2 bg-brand-earth text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg"
                      >
                        Rate Passenger
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showReviewUserModal && selectedTraveler && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 text-brand-earth">
            <div
              className="absolute inset-0 bg-brand-earth/80 backdrop-blur-sm"
              onClick={() => setShowReviewUserModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl"
            >
              <h3 className="font-serif text-3xl mb-4 italic text-brand-earth">Rate Guest</h3>
              <p className="text-sm text-brand-earth/60 mb-8">
                How was {selectedTraveler.name}'s ride?
              </p>
              <div className="flex justify-center space-x-2 mb-8">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-8 h-8 text-brand-saffron fill-current cursor-pointer hover:scale-110 transition-transform"
                  />
                ))}
              </div>
              <textarea
                placeholder="Passenger was friendly and prepared..."
                className="w-full h-32 p-4 bg-brand-warm rounded-3xl border-none outline-none text-brand-earth text-sm mb-8 resize-none"
              />

              <div className="flex gap-4">
                <button
                  onClick={() => setShowReviewUserModal(false)}
                  className="flex-1 py-4 border border-brand-earth/10 rounded-full font-bold text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    triggerStatus(
                      'success',
                      'Passenger Rated',
                      `Thank you for rating ${selectedTraveler.name}. Your feedback helps maintain a safe community.`
                    );
                    setShowReviewUserModal(false);
                  }}
                  className="flex-[2] py-4 bg-brand-teal text-white rounded-full font-bold text-xs shadow-xl uppercase tracking-widest"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showReplyModal && selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 text-brand-earth">
            <div
              className="absolute inset-0 bg-brand-earth/80 backdrop-blur-sm"
              onClick={() => setShowReplyModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl"
            >
              <h3 className="font-serif text-3xl mb-4 italic text-brand-earth">
                Reply to {selectedReview.travelerName}
              </h3>
              <textarea
                placeholder="Thank you for your feedback..."
                className="w-full h-32 p-4 bg-brand-warm rounded-3xl border-none outline-none text-brand-earth text-sm mb-8 resize-none"
              />

              <div className="flex gap-4">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="flex-1 py-4 border border-brand-earth/10 rounded-full font-bold text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    triggerStatus(
                      'success',
                      'Reply Posted',
                      'Your reply to the passenger review has been successfully posted.'
                    );
                    setShowReplyModal(false);
                  }}
                  className="flex-[2] py-4 bg-brand-teal text-white rounded-full font-bold text-xs shadow-xl uppercase tracking-widest"
                >
                  Send Reply
                </button>
              </div>
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
