'use client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  MapPin,
  Clock,
  Users,
  Star,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  Video,
  ArrowLeft,
  Heart,
  Plus,
  Minus,
  Calendar,
} from 'lucide-react';
import { MOCK_TRIPS } from '@/mockData';
import { useState } from 'react';

export default function TripDetails() {
  const { id } = useParams();
  const router = useRouter();
  const trip = MOCK_TRIPS.find((t) => t.id === id) || MOCK_TRIPS[0];
  const [guestCount, setGuestCount] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-6 md:pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-5 md:pt-18 pb-6 md:pb-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-bold text-brand-earth/40 hover:text-brand-earth mb-6 md:mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Experiences
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {/* Media Section */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl">
              <img src={trip.coverImage} className="w-full h-full object-cover" alt={trip.title} />
              <button className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white/90 backdrop-blur px-4 md:px-6 py-2 md:py-3 rounded-full font-bold flex items-center text-xs md:text-sm">
                <Video className="w-4 h-4 mr-2" />
                Play Intro Video
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl md:rounded-2xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    src={`https://picsum.photos/seed/gallery${i}/400/400`}
                    className="w-full h-full object-cover"
                    alt="gallery"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-brand-teal/10 text-brand-teal px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Verified Local Experience
              </div>
              {trip.hasEmergencyPlan && (
                <div className="bg-brand-coral/10 text-brand-coral px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Emergency Plan Included
                </div>
              )}
            </div>

            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-6">
              {trip.title}
              {trip.startDate ? (
                <span className="block text-lg md:text-xl md:text-2xl text-brand-earth/40 mt-4 font-sans">
                  ({trip.duration} •{' '}
                  {new Date(trip.startDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  {trip.endDate &&
                    ` - ${new Date(trip.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
                  )
                </span>
              ) : (
                <span className="block text-lg md:text-xl md:text-2xl text-brand-earth/40 mt-4 font-sans">
                  ({trip.duration} • Flexible / On-Demand)
                </span>
              )}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-brand-earth/10">
              <div className="flex items-center text-brand-earth/60">
                <MapPin className="w-5 h-5 mr-2 text-brand-earth/30" />
                <span className="font-medium">
                  {trip.location.city}, {trip.location.country}
                </span>
              </div>
              <div className="flex items-center text-brand-earth/60">
                <Clock className="w-5 h-5 mr-2 text-brand-earth/30" />
                <span className="font-medium">{trip.duration}</span>
              </div>
              <div className="flex items-center text-brand-earth/60">
                <Users className="w-5 h-5 mr-2 text-brand-earth/30" />
                <span className="font-medium">{trip.groupType} Group</span>
              </div>
              <button 
                onClick={() => router.push(`/reviews/${trip.id}?type=trip`)}
                className="flex items-center cursor-pointer hover:opacity-70 transition-opacity"
              >
                <div className="flex items-center text-brand-saffron mr-2">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span className="font-bold">{trip.rating}</span>
                </div>
                <span className="text-sm text-brand-earth/40">({trip.reviewCount} reviews)</span>
              </button>
            </div>

            {/* Availability & Deadline Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {trip.startDate ? (
                <div className="p-6 bg-brand-teal/5 rounded-3xl border border-brand-teal/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar className="w-5 h-5 text-brand-teal" />
                    <p className="text-[10px] uppercase font-bold tracking-widest text-brand-teal">
                      Experience Date(s)
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-serif text-xl md:text-2xl text-brand-earth">
                      {new Date(trip.startDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      {trip.endDate &&
                        ` - ${new Date(trip.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
                    </p>
                    <p className="text-[10px] text-brand-earth/40 font-mono">
                      Starts at{' '}
                      {new Date(trip.startDate).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-brand-teal/5 rounded-3xl border border-brand-teal/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar className="w-5 h-5 text-brand-teal" />
                    <p className="text-[10px] uppercase font-bold tracking-widest text-brand-teal">
                      Timing
                    </p>
                  </div>
                  <p className="font-serif text-2xl text-brand-earth">Flexible Schedule</p>
                  <p className="text-[10px] text-brand-earth/40 mt-1">
                    Pick your preferred date during checkout.
                  </p>
                </div>
              )}
              {trip.bookingDeadline && (
                <div className="p-6 bg-brand-coral/5 rounded-3xl border border-brand-coral/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="w-5 h-5 text-brand-coral" />
                    <p className="text-[10px] uppercase font-bold tracking-widest text-brand-coral">
                      Booking Deadline
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-serif text-2xl text-brand-coral">
                      {new Date(trip.bookingDeadline).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-[10px] text-brand-earth/40 font-mono">
                      Must book by{' '}
                      {new Date(trip.bookingDeadline).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {trip.activities && trip.activities.length > 0 && (
              <div className="mb-12 p-6 md:p-8 bg-brand-teal/5 rounded-3xl md:rounded-[32px] border border-brand-teal/20">
                <div className="flex items-center space-x-3 mb-4 md:mb-6">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-brand-teal" />
                  <h3 className="font-serif text-2xl md:text-3xl">Planned Activities</h3>
                </div>
                <div className="space-y-4">
                  {trip.activities.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-2xl flex items-start space-x-4 border border-brand-earth/5"
                    >
                      <div className="w-8 h-8 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal font-bold text-xs shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-earth">{item.name}</h4>
                        <p className="text-xs text-brand-earth/60">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {trip.requiredEquipment && trip.requiredEquipment.length > 0 && (
              <div className="mb-12 p-6 md:p-8 bg-brand-saffron/5 rounded-3xl md:rounded-[32px] border border-brand-saffron/20">
                <div className="flex items-center space-x-3 mb-4 md:mb-6">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-brand-saffron" />
                  <h3 className="font-serif text-2xl md:text-3xl">Required Equipment</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {trip.requiredEquipment.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white px-4 py-2 rounded-xl text-sm font-bold text-brand-earth border border-brand-earth/10 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-brand-saffron rounded-full mr-2" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-12">
              <h3 className="font-serif text-2xl md:text-3xl mb-8">What we'll do</h3>
              <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-brand-earth/10">
                {[
                  {
                    time: '08:00 AM',
                    title: 'Local Market Arrival',
                    desc: 'Meet at the main square and start with authentic spice tea.',
                  },
                  {
                    time: '10:30 AM',
                    title: 'Hidden Waterfall Hike',
                    desc: 'A moderate stroll through lush rainforest to a private swim spot.',
                  },
                  {
                    time: '01:00 PM',
                    title: 'Traditional Home Lunch',
                    desc: 'Enjoy a meal prepared by Grandma Amina at her hilltop farm.',
                  },
                ].map((step, idx) => (
                  <div key={idx} className="relative pl-12">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-brand-teal border-4 border-brand-warm z-10" />
                    <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-1">
                      {step.time}
                    </p>
                    <h4 className="font-serif text-xl md:text-2xl mb-2">{step.title}</h4>
                    <p className="text-brand-earth/60 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-earth text-white rounded-3xl md:rounded-[32px] p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 md:gap-8 mb-8">
                <div>
                  <p className="text-xs opacity-50 uppercase tracking-widest font-bold mb-2">
                    Price for {guestCount} travelers
                  </p>
                  <div className="text-2xl md:text-3xl font-serif">
                    {trip.price.currency} {(trip.price.local * guestCount).toLocaleString()}
                  </div>
                  <p className="text-[10px] opacity-40">
                    ≈ USD {(trip.price.usd * guestCount).toLocaleString()} total
                  </p>
                </div>

                <div className="flex items-center space-x-4 bg-white/10 p-2 rounded-2xl self-start">
                  <button
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white/20"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-xl min-w-[2ch] text-center">{guestCount}</span>
                  <button
                    onClick={() => setGuestCount(guestCount + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white/20"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <Link
                  href={`/book/${trip.id}?guests=${guestCount}`}
                  className="flex-[3] bg-brand-teal hover:bg-brand-teal/90 text-white py-5 rounded-full font-bold transition-all shadow-xl flex items-center justify-center"
                >
                  Proceed<ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 rounded-full border-2 transition-all flex items-center justify-center ${isWishlisted ? 'bg-brand-coral border-brand-coral text-white' : 'border-white/10 hover:border-white/30 text-white'}`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
              <div className="flex items-center space-x-6 pt-6 border-t border-white/10">
                <div className="flex items-center text-xs opacity-60">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Fully Refundable (24h)
                </div>
                <div className="flex items-center text-xs opacity-60">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with Guide
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
