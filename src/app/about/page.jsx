"use client";
import { motion } from 'motion/react';
import { Globe, Heart, ShieldCheck, Sparkles, Map } from 'lucide-react';

export default function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-brand-warm/30 pt-5 md:pt-18 pb-12 md:pb-20 px-4 md:px-6"
    >
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-20">
          <h1 className="font-serif text-3xl md:text-5xl text-brand-earth mb-4 md:mb-6">
            Connecting Worlds, <br className="hidden md:block" />
            One Story at a Time.
          </h1>
          <p className="text-lg text-brand-earth/60 leading-relaxed">
            Manjaro is a marketplace for authentic local experiences across Africa and the
            Caribbean.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
          <div className="space-y-4 md:space-y-6">
            <h2 className="font-serif text-3xl">Our Mission</h2>
            <p className="text-brand-earth/70 text-sm md:text-base leading-relaxed">
              We believe that travel is more than visiting landmarks; it's about the people you meet
              and the stories you share. Manjaro was founded to bridge the gap between curious
              global travelers and local specialists who know their homes better than any guidebook.
            </p>
            <p className="text-brand-earth/70 text-sm md:text-base leading-relaxed">
              By empowering local guides and drivers with technology, we ensure that tourism revenue
              stays within the communities being visited, creating a sustainable and equitable
              travel ecosystem.
            </p>
          </div>
          <div className="bg-brand-earth/5 p-8 rounded-3xl md:rounded-[40px] border border-brand-earth/10 flex items-center justify-center aspect-square md:aspect-auto">
            <Globe className="w-32 h-32 text-brand-earth/20 animate-pulse" />
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          <div className="p-6 md:p-8 bg-white rounded-3xl md:rounded-[32px] shadow-xl border border-brand-earth/5 text-center">
            <div className="w-12 h-12 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6 text-brand-teal" />
            </div>
            <h3 className="font-bold mb-2">Verified Experts</h3>
            <p className="text-xs text-brand-earth/60 leading-relaxed">
              Every guide and driver is vetted for safety and quality.
            </p>
          </div>
          <div className="p-8 bg-white rounded-[32px] shadow-xl border border-brand-earth/5 text-center">
            <div className="w-12 h-12 bg-brand-coral/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-brand-coral" />
            </div>
            <h3 className="font-bold mb-2">Local Impact</h3>
            <p className="text-xs text-brand-earth/60 leading-relaxed">
              Direct support to local economies and communities.
            </p>
          </div>
          <div className="p-8 bg-white rounded-[32px] shadow-xl border border-brand-earth/5 text-center">
            <div className="w-12 h-12 bg-brand-earth/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-brand-earth" />
            </div>
            <h3 className="font-bold mb-2">Pure Authenticity</h3>
            <p className="text-xs text-brand-earth/60 leading-relaxed">
              Off-the-beaten-path tours you won't find anywhere else.
            </p>
          </div>
        </div>

        <section className="bg-brand-earth text-white p-8 md:p-16 rounded-[40px] md:rounded-[50px] shadow-2xl relative overflow-hidden">
          <Map className="absolute -bottom-20 -right-20 w-80 h-80 opacity-5" />
          <h2 className="font-serif text-4xl mb-8 relative z-10">Why Africa & The Caribbean?</h2>
          <p className="text-lg text-white/70 leading-relaxed mb-8 relative z-10">
            These regions hold some of the world's most vibrant cultures and stunning landscapes,
            yet they are often misrepresented or simplified in mainstream travel. We want to show
            you the real deal—the hidden waterfalls, the family-run spice markets, and the ancient
            drumming traditions.
          </p>
          <div className="flex flex-wrap gap-4 relative z-10">
            <div className="bg-white/10 px-6 py-2 rounded-full text-sm font-bold border border-white/10">
              Tanzania
            </div>
            <div className="bg-white/10 px-6 py-2 rounded-full text-sm font-bold border border-white/10">
              Jamaica
            </div>
            <div className="bg-white/10 px-6 py-2 rounded-full text-sm font-bold border border-white/10">
              Ghana
            </div>
            <div className="bg-white/10 px-6 py-2 rounded-full text-sm font-bold border border-white/10">
              Kenya
            </div>
            <div className="bg-white/10 px-6 py-2 rounded-full text-sm font-bold border border-white/10">
              Nigeria
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
