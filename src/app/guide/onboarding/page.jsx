'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Camera,
  Video,
  Upload,
  ChevronRight,
  IdCard,
  Banknote,
  Briefcase,
  ShieldCheck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import StatusModal from '@/components/StatusModal';

export default function GuideOnboarding() {
  const [step, setStep] = useState(0); // Step 0 for type selection
  const [specialistType, setSpecialistType] = useState('Individual');
  const [payoutMethod, setPayoutMethod] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const navigate = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-6 py-20"
    >
      <StatusModal
        isOpen={showStatusModal}
        onClose={() => navigate('/guide/dashboard')}
        type="success"
        title="Application Submitted!"
        message="Your application for Manjaro Specialist verification has been received. Our compliance team will review your documents and intro video within 48-72 hours. You'll receive a notification and email once your profile is live!"
        actionLabel="Go to Specialist Dashboard"
        onAction={() => navigate('/guide/dashboard')}
      />

      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl mb-4 text-brand-earth">Become a Verified Specialist</h1>
        <p className="text-brand-earth/60">
          Join the elite network of independent guides and travel agencies across Africa and the
          Caribbean.
        </p>
      </div>

      {step > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {['Profile', 'Identity', 'Media', 'Withdrawal'].map((s, idx) => (
            <div key={s} className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step > idx ? 'bg-brand-teal text-white' : step === idx + 1 ? 'bg-brand-earth text-white' : 'bg-brand-earth/10 text-brand-earth/30'}`}
              >
                {step > idx + 1 ? '✓' : idx + 1}
              </div>
              <span
                className={`text-[10px] uppercase font-bold tracking-widest ${step === idx + 1 ? 'text-brand-earth' : 'text-brand-earth/30'}`}
              >
                {s}
              </span>
              {idx < 3 && <div className="hidden md:block h-[1px] flex-1 bg-brand-earth/10" />}
            </div>
          ))}
        </div>
      )}

      <div className="glass-card rounded-[40px] p-8 md:p-12">
        {step === 0 && (
          <div className="space-y-12">
            <h2 className="font-serif text-4xl text-center mb-12 text-brand-earth">
              How would you like to register?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button
                onClick={() => {
                  setSpecialistType('Individual');
                  setStep(1);
                }}
                className="group p-10 border-2 border-brand-earth/5 rounded-[40px] text-left hover:border-brand-teal hover:bg-brand-teal/5 transition-all"
              >
                <div className="w-16 h-16 bg-brand-earth/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-teal/10">
                  <IdCard className="w-8 h-8 text-brand-earth group-hover:text-brand-teal" />
                </div>
                <h3 className="font-serif text-3xl mb-2">Independent Specialist</h3>
                <p className="text-sm text-brand-earth/60">
                  I am a solo guide working directly with travelers.
                </p>
              </button>

              <button
                onClick={() => {
                  setSpecialistType('Agency');
                  setStep(1);
                }}
                className="group p-10 border-2 border-brand-earth/5 rounded-[40px] text-left hover:border-brand-teal hover:bg-brand-teal/5 transition-all"
              >
                <div className="w-16 h-16 bg-brand-earth/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-teal/10">
                  <Camera className="w-8 h-8 text-brand-earth group-hover:text-brand-teal" />
                </div>
                <h3 className="font-serif text-3xl mb-2">Travel Agency</h3>
                <p className="text-sm text-brand-earth/60">
                  I represent a network of guides and travel specialists.
                </p>
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl">
              {specialistType === 'Agency' ? 'Agency Profile' : 'Personal Information'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  {specialistType === 'Agency' ? 'Agency Name' : 'Full Name'}
                </label>
                <input
                  type="text"
                  className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                  placeholder={
                    specialistType === 'Agency'
                      ? 'e.g. Serengeti Tours Ltd.'
                      : 'Enter your full name'
                  }
                />
              </div>
              {specialistType === 'Agency' && (
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                    Number of Guides
                  </label>
                  <input
                    type="number"
                    className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                    placeholder="How many guides in your network?"
                  />
                </div>
              )}
              <div className={specialistType === 'Agency' ? '' : 'md:col-span-1'}>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Specialization
                </label>
                <select className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none appearance-none bg-white">
                  <option>Safari Specialist</option>
                  <option>Cultural Expert</option>
                  <option>Hiking Guide</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                  placeholder="e.g. 5"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Bio
                </label>
                <textarea
                  className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none h-32"
                  placeholder="Tell travelers what makes your experiences special..."
                ></textarea>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-brand-earth text-white py-5 rounded-full font-bold flex items-center justify-center hover:bg-brand-earth/90 transition-all"
            >
              Save & Continue <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 text-center">
            {specialistType === 'Agency' ? (
              <Briefcase className="w-20 h-20 mx-auto text-brand-teal" />
            ) : (
              <IdCard className="w-20 h-20 mx-auto text-brand-teal" />
            )}
            <h2 className="font-serif text-3xl">
              {specialistType === 'Agency' ? 'Business Registration' : 'Identity Verification'}
            </h2>
            <p className="text-sm text-brand-earth/60">
              {specialistType === 'Agency'
                ? 'Upload your official Certificate of Incorporation or Business Permit.'
                : "Upload a clear photo of your government-issued ID (Passport, National ID, or Driver's License)."}
            </p>

            <div className="border-2 border-dashed border-brand-earth/10 rounded-3xl p-12 hover:border-brand-teal transition-colors cursor-pointer group">
              <Upload className="w-10 h-10 mx-auto text-brand-earth/20 group-hover:text-brand-teal mb-4" />
              <p className="text-sm font-bold text-brand-earth/40">
                Drop your file here or click to browse
              </p>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full bg-brand-earth text-white py-5 rounded-full font-bold flex items-center justify-center hover:bg-brand-earth/90 transition-all mt-8"
            >
              {specialistType === 'Agency' ? 'Submit Documents' : 'Verify Identity'}{' '}
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl">
              {specialistType === 'Agency' ? 'Agency Media' : 'Media & Intro'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-xs font-bold text-brand-earth/60 uppercase tracking-widest">
                  {specialistType === 'Agency' ? 'Agency Intro Video' : 'Personal Intro Video'}
                </p>
                <div className="aspect-video bg-brand-earth/5 rounded-[32px] flex flex-col items-center justify-center text-brand-earth/20 border-2 border-dashed border-brand-earth/10">
                  <Video className="w-8 h-8 mb-2" />
                  <span className="text-xs font-bold">Upload Video</span>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold text-brand-earth/60 uppercase tracking-widest">
                  {specialistType === 'Agency' ? 'Travel Licenses' : 'Certification Upload'}
                </p>
                <div className="aspect-video bg-brand-earth/5 rounded-[32px] flex flex-col items-center justify-center text-brand-earth/20 border-2 border-dashed border-brand-earth/10">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-xs font-bold">Professional Documents</span>
                </div>
              </div>
            </div>
            {specialistType === 'Agency' && (
              <div className="bg-brand-warm/30 p-8 rounded-3xl border border-brand-earth/5">
                <h4 className="font-serif text-xl mb-4 text-brand-earth">
                  Individual Guide Management
                </h4>
                <p className="text-sm text-brand-earth/60 mb-6 font-sans">
                  As an agency, you can manage multiple guides. You will be able to add and verify
                  your sub-guides individually after your agency account is approved.
                </p>
                <div className="flex items-center text-xs font-bold text-brand-teal uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 mr-2" /> Agency-Level Verification Enabled
                </div>
              </div>
            )}
            <button
              onClick={() => setStep(4)}
              className="w-full bg-brand-earth text-white py-5 rounded-full font-bold flex items-center justify-center hover:bg-brand-earth/90 transition-all mt-8"
            >
              Almost Done <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl">Banking Details</h2>
            <div className="bg-brand-teal/5 p-6 rounded-2xl flex items-start space-x-4 mb-4 text-brand-earth">
              <Banknote className="w-6 h-6 text-brand-teal mt-1" />
              <p className="text-sm text-brand-teal font-medium">
                Choose your preferred payout method to enable automated disbursements after trip
                completions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'Mobile Money', label: 'Mobile Money', sub: 'MPESA, MTN, etc' },
                { id: 'Bank', label: 'Bank Transfer', sub: 'Local Accounts' },
                { id: 'Wise', label: 'International', sub: 'Wise / Airwallex' },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPayoutMethod(method.id)}
                  className={`p-6 border-2 rounded-3xl text-left transition-all ${payoutMethod === method.id ? 'border-brand-teal bg-brand-teal/5' : 'border-brand-earth/5 hover:border-brand-earth/10'}`}
                >
                  <p className="font-bold text-brand-earth">{method.label}</p>
                  <p className="text-[10px] text-brand-earth/40 uppercase font-bold tracking-widest">
                    {method.sub}
                  </p>
                </button>
              ))}
            </div>

            {payoutMethod && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-6 border-t border-brand-earth/5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                      {payoutMethod === 'Mobile Money'
                        ? 'Phone Number'
                        : payoutMethod === 'Bank'
                          ? 'Account Number'
                          : 'Email Address'}
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                      placeholder={
                        payoutMethod === 'Mobile Money'
                          ? '+255...'
                          : payoutMethod === 'Bank'
                            ? '000000000'
                            : 'email@wise.com'
                      }
                    />
                  </div>
                  {payoutMethod === 'Bank' && (
                    <>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                          placeholder="e.g. CRDB Bank"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                          Branch / Swift Code
                        </label>
                        <input
                          type="text"
                          className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                          placeholder="e.g. CRDBTZTZ"
                        />
                      </div>
                    </>
                  )}
                  {payoutMethod === 'Mobile Money' && (
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                        Service Provider
                      </label>
                      <select className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none text-sm bg-white">
                        <option>MPESA</option>
                        <option>MTN MoMo</option>
                        <option>Airtel Money</option>
                        <option>Tigo Pesa</option>
                      </select>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <button
              onClick={() => setShowStatusModal(true)}
              className={`block w-full mt-12 bg-brand-earth text-white py-5 rounded-full font-bold text-center hover:bg-brand-earth/90 transition-all ${!payoutMethod ? 'opacity-50 pointer-events-none' : ''}`}
            >
              Complete Onboarding & Verify Account
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
