"use client";
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Eye, CheckCircle2, AlertTriangle, LifeBuoy } from 'lucide-react';

export default function Safety() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-brand-warm/30 pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6"
    >
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12 md:mb-20">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-teal/10 rounded-2xl md:rounded-[30px] flex items-center justify-center mx-auto mb-6 md:mb-8">
            <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-brand-teal" />
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-brand-earth mb-4 md:mb-6 leading-tight">Trust is our foundation.</h1>
          <p className="text-base md:text-lg text-brand-earth/60 leading-relaxed max-w-2xl mx-auto">
            Your safety is our absolute priority. We've built robust systems to ensure every journey
            is secure, from the first click to the final destination.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <section className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] shadow-xl border border-brand-earth/5">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-brand-earth/5 rounded-2xl">
                <CheckCircle2 className="w-6 h-6 text-brand-earth" />
              </div>
              <h2 className="font-serif text-xl md:text-2xl">Verified Specialists</h2>
            </div>
            <p className="text-sm text-brand-earth/70 leading-relaxed mb-6">
              Every guide and driver on Manjaro undergoes a rigorous multi-step verification
              process:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start text-xs text-brand-earth/60">
                <span className="w-1.5 h-1.5 bg-brand-teal rounded-full mt-1.5 mr-3 shrink-0" />
                <span>
                  Background checks and identity verification through official national registries.
                </span>
              </li>
              <li className="flex items-start text-xs text-brand-earth/60">
                <span className="w-1.5 h-1.5 bg-brand-teal rounded-full mt-1.5 mr-3 shrink-0" />
                <span>
                  Technical certification checks (e.g., Guide Licenses, Wilderness First Aid).
                </span>
              </li>
              <li className="flex items-start text-xs text-brand-earth/60">
                <span className="w-1.5 h-1.5 bg-brand-teal rounded-full mt-1.5 mr-3 shrink-0" />
                <span>In-person or video interview vetting by Manjaro regional teams.</span>
              </li>
            </ul>
          </section>

          <section className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] shadow-xl border border-brand-earth/5">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-brand-coral/5 rounded-2xl">
                <Lock className="w-6 h-6 text-brand-coral" />
              </div>
              <h2 className="font-serif text-xl md:text-2xl">Secure Payments</h2>
            </div>
            <p className="text-sm text-brand-earth/70 leading-relaxed mb-6">
              We use an Escrow-based payment system to protect both travelers and local providers:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start text-xs text-brand-earth/60">
                <span className="w-1.5 h-1.5 bg-brand-coral rounded-full mt-1.5 mr-3 shrink-0" />
                <span>
                  Your funds are held securely by Manjaro until the experience is complete.
                </span>
              </li>
              <li className="flex items-start text-xs text-brand-earth/60">
                <span className="w-1.5 h-1.5 bg-brand-coral rounded-full mt-1.5 mr-3 shrink-0" />
                <span>
                  Payments are only released to specialists 24-48 hours after successful trip
                  conclusion.
                </span>
              </li>
              <li className="flex items-start text-xs text-brand-earth/60">
                <span className="w-1.5 h-1.5 bg-brand-coral rounded-full mt-1.5 mr-3 shrink-0" />
                <span>Strict anti-fraud monitoring handles all digital transactions.</span>
              </li>
            </ul>
          </section>

          <section className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] shadow-xl border border-brand-earth/5">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-brand-teal/5 rounded-2xl">
                <Eye className="w-6 h-6 text-brand-teal" />
              </div>
              <h2 className="font-serif text-xl md:text-2xl">Trip Tracking</h2>
            </div>
            <p className="text-sm text-brand-earth/70 leading-relaxed mb-6">
              We monitor your journey in real-time through our integrated GPS and communication
              systems:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start text-xs text-brand-earth/60">
                <span className="w-1.5 h-1.5 bg-brand-teal rounded-full mt-1.5 mr-3 shrink-0" />
                <span>Share your live trip status with trusted friends or family at any time.</span>
              </li>
              <li className="flex items-start text-xs text-brand-earth/60">
                <span className="w-1.5 h-1.5 bg-brand-teal rounded-full mt-1.5 mr-3 shrink-0" />
                <span>
                  Emergency "Panic Button" in the app alerts our 24/7 support team immediately.
                </span>
              </li>
              <li className="flex items-start text-xs text-brand-earth/60">
                <span className="w-1.5 h-1.5 bg-brand-teal rounded-full mt-1.5 mr-3 shrink-0" />
                <span>Automated check-ins for high-adventure experiences in remote areas.</span>
              </li>
            </ul>
          </section>

          <section className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] shadow-xl border border-brand-earth/5">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-brand-saffron/5 rounded-2xl">
                <LifeBuoy className="w-6 h-6 text-brand-saffron" />
              </div>
              <h2 className="font-serif text-xl md:text-2xl">Physical Wellness</h2>
            </div>
            <p className="text-sm text-brand-earth/70 leading-relaxed mb-6">
              Guidelines and support for physical safety during outdoor activities:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start text-xs text-brand-earth/60">
                <span className="w-1.5 h-1.5 bg-brand-saffron rounded-full mt-1.5 mr-3 shrink-0" />
                <span>
                  Mandatory safety equipment list provided for every hiking and adventure trip.
                </span>
              </li>
              <li className="flex items-start text-xs text-brand-earth/60">
                <span className="w-1.5 h-1.5 bg-brand-saffron rounded-full mt-1.5 mr-3 shrink-0" />
                <span>
                  Weather-contingency planning: Guides have the authority to pivot itineraries for
                  safety.
                </span>
              </li>
              <li className="flex items-start text-xs text-brand-earth/60">
                <span className="w-1.5 h-1.5 bg-brand-saffron rounded-full mt-1.5 mr-3 shrink-0" />
                <span>Network coverage status indicated for every trip in detail view.</span>
              </li>
            </ul>
          </section>
        </div>

        <div className="bg-brand-coral/10 p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-brand-coral/20">
          <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
            <AlertTriangle className="w-8 h-8 text-brand-coral shrink-0" />
            <div>
              <h3 className="font-serif text-xl md:text-2xl mb-2 text-brand-earth">Dispute Resolution</h3>
              <p className="text-xs md:text-sm text-brand-earth/70 leading-relaxed">
                If an experience does not meet the specified safety or quality standards, you can
                open a dispute immediately within the app. Our resolution specialists will mediate
                between you and the guide based on documented itinerary and chat history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
