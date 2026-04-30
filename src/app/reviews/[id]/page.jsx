"use client";
import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, MessageSquare, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { MOCK_SPECIALISTS, MOCK_TRIPS, MOCK_DRIVERS } from '@/mockData';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

export default function Reviews() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const entityId = params.id;
  const type = searchParams.get('type') || 'guide';

  let entityInfo = {
    name: '',
    photo: '',
    role: '',
    rating: 0,
    reviewCount: 0,
    reviews: []
  };

  // Resolve entity based on type and ID
  if (type === 'guide') {
    const guide = MOCK_SPECIALISTS.find(g => g.id === entityId);
    if (guide) {
      entityInfo = {
        name: guide.name,
        photo: guide.profilePhoto,
        role: guide.type === 'Agency' ? 'Agency' : 'Guide',
        rating: guide.rating,
        reviewCount: guide.completedTrips,
        reviews: guide.reviews || []
      };
    }
  } else if (type === 'trip' || type === 'experience') {
    const trip = MOCK_TRIPS.find(t => t.id === entityId);
    if (trip) {
      entityInfo = {
        name: trip.title,
        photo: trip.coverImage,
        role: 'Experience',
        rating: trip.rating,
        reviewCount: trip.reviewCount,
        reviews: [
          {
            id: 'tr1',
            userName: 'Michael S.',
            userPhoto: 'https://picsum.photos/seed/u8/100/100',
            rating: 5,
            comment: 'This was the highlight of my trip. Perfectly organized!',
            date: 'March 15, 2026',
            timestamp: 1742032800000,
            reply: {
              text: 'We are so happy you enjoyed it Michael!',
              authorName: 'Manjaro Team',
              authorPhoto: 'https://picsum.photos/seed/logo/200/200',
              authorRole: 'Admin',
              date: 'March 16, 2026',
              timestamp: 1742119200000
            }
          }
        ]
      };
    }
  } else if (type === 'stay') {
    const allStays = MOCK_TRIPS.flatMap(t => t.accommodations || []);
    const stay = allStays.find(s => s.id === entityId);
    if (stay) {
      entityInfo = {
        name: stay.name,
        photo: stay.images?.[0] || '',
        role: 'Accommodation',
        rating: stay.rating,
        reviewCount: stay.reviews || 0,
        reviews: [
          {
            id: 'st1',
            userName: 'Elena V.',
            userPhoto: 'https://picsum.photos/seed/u9/100/100',
            rating: 5,
            comment: 'Incredible stay! The view from my room was breathtaking and the service was top-notch.',
            date: 'April 5, 2026',
            timestamp: 1743858000000
          }
        ]
      };
    }
  } else if (type === 'driver') {
    const driver = MOCK_DRIVERS.find(d => d.id === entityId);
    if (driver) {
      entityInfo = {
        name: driver.name,
        photo: driver.photo,
        role: 'Driver',
        rating: driver.rating,
        reviewCount: driver.completedTrips || 0,
        reviews: driver.reviews || []
      };
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-brand-warm/30 pt-6 md:pt-18 pb-12 md:pb-20 px-4 md:px-6"
    >
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-xs md:text-sm font-bold opacity-60 hover:opacity-100 transition-opacity mb-6 md:mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        {/* Profile Header */}
        <div className="glass-card rounded-3xl md:rounded-[48px] p-6 md:p-10 mb-8 md:mb-12 flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-brand-earth/5">
          <div className="relative">
            {entityInfo.photo && (
              <img 
                src={entityInfo.photo} 
                alt={entityInfo.name} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-2xl" 
              />
            )}
            <div className="absolute -bottom-2 -right-2 bg-brand-teal text-white p-2 rounded-full shadow-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
              <h1 className="font-serif text-2xl md:text-4xl text-brand-earth">{entityInfo.name}</h1>
              <span className="px-3 py-1 bg-brand-earth/10 text-brand-earth text-[10px] font-black uppercase tracking-widest rounded-full">
                {entityInfo.role}
              </span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-6 text-brand-earth/60">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-brand-saffron fill-brand-saffron mr-1.5" />
                <span className="font-bold text-brand-earth">{entityInfo.rating}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1.5" />
                <span className="font-medium">{entityInfo.reviewCount} Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6 md:space-y-8">
          <h2 className="font-serif text-xl md:text-2xl px-4">All Reviews</h2>
          
          {entityInfo.reviews.length > 0 ? (
            entityInfo.reviews.map((review) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="glass-card rounded-3xl md:rounded-[40px] p-5 md:p-8 border border-brand-earth/5 hover:border-brand-teal/20 transition-all">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
                    <div className="flex items-center space-x-4">
                      <img src={review.userPhoto} className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-md shadow-brand-earth/10" alt={review.userName} />
                      <div>
                        <h4 className="font-bold text-sm md:text-base text-brand-earth">{review.userName}</h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] md:text-[10px] uppercase font-black tracking-widest text-brand-earth/40">
                          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {review.date}</span>
                          {review.timestamp && <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {typeof review.timestamp === 'number' ? new Date(review.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : review.timestamp}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-brand-saffron fill-brand-saffron' : 'text-brand-earth/10'}`} />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-base text-brand-earth/70 leading-relaxed font-sans font-medium">
                    {review.comment}
                  </p>

                  {/* Reply Block */}
                  {review.reply && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mt-6 md:mt-8 ml-4 md:ml-8 p-4 md:p-6 bg-brand-warm/50 rounded-2xl md:rounded-[32px] border-l-4 border-brand-teal relative"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <img src={review.reply.authorPhoto} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white shadow-sm" alt="author" />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                             <h5 className="text-[10px] md:text-xs font-bold text-brand-earth">{review.reply.authorName}</h5>
                             <span className="text-[7px] md:text-[8px] px-2 py-0.5 bg-brand-teal/10 text-brand-teal rounded-full font-black uppercase tracking-tighter">{review.reply.authorRole}</span>
                          </div>
                          <p className="text-[7px] md:text-[8px] text-brand-earth/40 font-bold uppercase tracking-widest mt-0.5">
                            {review.reply.date} • {typeof review.reply.timestamp === 'number' ? new Date(review.reply.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : review.reply.timestamp}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-brand-earth/60 leading-relaxed italic">
                        "{review.reply.text}"
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 opacity-40">
              <MessageSquare className="w-12 h-12 mx-auto mb-4" />
              <p className="font-medium">No reviews yet for this {type}.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}