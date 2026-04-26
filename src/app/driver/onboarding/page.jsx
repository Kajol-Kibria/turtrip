'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Car,
  Upload,
  ChevronRight,
  User as UserIcon,
  FileText,
  Camera,
  CheckCircle2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import StatusModal from '@/components/StatusModal';

export default function DriverOnboarding() {
  const navigate = useRouter();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState(null);
  const [vehicleData, setVehicleData] = useState({
    type: 'Safari Van (4x4)',
    make: '',
    model: '',
    color: '',
    plateNumber: '',
    maxPassengers: '',
    ownershipType: 'Individual',
  });

  const handleComplete = () => {
    setShowSuccess(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-brand-warm/30 pt-32 pb-20 px-6"
    >
      <StatusModal
        isOpen={showSuccess}
        onClose={() => navigate('/driver/dashboard')}
        type="success"
        title="Application Submitted!"
        message="Your driver onboarding request has been successfully submitted. Our team will review your documents within 24-48 hours. You will receive a notification once your profile is approved."
        actionLabel="Go to Dashboard"
        onAction={() => navigate('/driver/dashboard')}
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-brand-teal/10 text-brand-teal border border-brand-teal/20 text-[10px] font-bold tracking-widest uppercase mb-4">
            Become a Partner
          </div>
          <h1 className="font-serif text-5xl mb-4 text-brand-earth">Driver Onboarding</h1>
          <p className="text-brand-earth/60">
            Join the Manjaro network and start earning by guiding travelers across local trails.
          </p>
        </div>

        <div className="flex items-center justify-between mb-12 max-w-md mx-auto">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-brand-teal text-white shadow-lg' : 'bg-brand-earth/10 text-brand-earth/30'}`}
              >
                {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`w-12 h-1 mx-2 rounded-full ${step > s ? 'bg-brand-teal' : 'bg-brand-earth/10'}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="glass-card rounded-[48px] p-8 md:p-12 shadow-2xl border border-brand-earth/5 bg-white">
          {step === 1 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-4 bg-brand-warm rounded-2xl text-brand-earth">
                  <UserIcon className="w-8 h-8" />
                </div>
                <h2 className="font-serif text-3xl">Personal Identity (KYC)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                    Government ID Number
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                    placeholder="e.g. 19900101-XXXX-XXXX"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none"
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-brand-earth/10 rounded-3xl p-12 text-center hover:border-brand-teal transition-all cursor-pointer group">
                <Camera className="w-10 h-10 mx-auto text-brand-earth/20 mb-4 group-hover:text-brand-teal" />
                <p className="font-bold text-brand-earth/60 mb-2">
                  Upload Passport or National ID Photo
                </p>
                <p className="text-[10px] text-brand-earth/30 uppercase tracking-widest">
                  Clear JPG or PNG under 5MB
                </p>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-brand-earth text-white py-5 rounded-full font-bold flex items-center justify-center shadow-xl hover:bg-brand-earth/90 transition-all"
              >
                Continue to Vehicle Details <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-4 bg-brand-warm rounded-2xl text-brand-earth">
                  <Car className="w-8 h-8" />
                </div>
                <h2 className="font-serif text-3xl">Vehicle Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                    Vehicle Type
                  </label>
                  <select
                    value={vehicleData.type}
                    onChange={(e) => setVehicleData({ ...vehicleData, type: e.target.value })}
                    className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none bg-white text-sm"
                  >
                    <option>Safari Van (4x4)</option>
                    <option>Sedan / Saloon</option>
                    <option>SUV</option>
                    <option>Minibus</option>
                    <option>Coach / Bus</option>
                    <option>Boat / Sea Craft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                    Make
                  </label>
                  <input
                    type="text"
                    value={vehicleData.make}
                    onChange={(e) => setVehicleData({ ...vehicleData, make: e.target.value })}
                    className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none text-sm"
                    placeholder="e.g. Toyota"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                    Model
                  </label>
                  <input
                    type="text"
                    value={vehicleData.model}
                    onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                    className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none text-sm"
                    placeholder="e.g. Land Cruiser"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                    Vehicle Color
                  </label>
                  <input
                    type="text"
                    value={vehicleData.color}
                    onChange={(e) => setVehicleData({ ...vehicleData, color: e.target.value })}
                    className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none text-sm"
                    placeholder="e.g. White"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                    Plate Number
                  </label>
                  <input
                    type="text"
                    value={vehicleData.plateNumber}
                    onChange={(e) =>
                      setVehicleData({ ...vehicleData, plateNumber: e.target.value })
                    }
                    className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none text-sm"
                    placeholder="T 123 ABC"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                    Max Passengers
                  </label>
                  <input
                    type="number"
                    value={vehicleData.maxPassengers}
                    onChange={(e) =>
                      setVehicleData({ ...vehicleData, maxPassengers: e.target.value })
                    }
                    className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none text-sm"
                    placeholder="8"
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-brand-earth/10 rounded-3xl p-8 text-center hover:border-brand-teal transition-all cursor-pointer group">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Camera className="w-8 h-8 text-brand-earth/20 group-hover:text-brand-teal" />
                  <Car className="w-8 h-8 text-brand-earth/20 group-hover:text-brand-teal" />
                </div>
                <p className="font-bold text-brand-earth/60 mb-1 text-sm">Vehicle Picture</p>
                <p className="text-[10px] text-brand-earth/30 uppercase tracking-widest">
                  A clear side view photo of your vehicle
                </p>
              </div>

              <div className="p-6 bg-brand-warm rounded-3xl border border-brand-earth/5">
                <h4 className="font-bold text-sm mb-4">Ownership Type</h4>
                <div className="flex gap-4">
                  <button
                    onClick={() => setVehicleData({ ...vehicleData, ownershipType: 'Individual' })}
                    className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs transition-all ${vehicleData.ownershipType === 'Individual' ? 'border-brand-earth bg-brand-earth text-white' : 'border-brand-earth/10 hover:border-brand-earth/30 text-brand-earth/60'}`}
                  >
                    Individual
                  </button>
                  <button
                    onClick={() => setVehicleData({ ...vehicleData, ownershipType: 'Fleet Owned' })}
                    className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs transition-all ${vehicleData.ownershipType === 'Fleet Owned' ? 'border-brand-earth bg-brand-earth text-white' : 'border-brand-earth/10 hover:border-brand-earth/30 text-brand-earth/60'}`}
                  >
                    Fleet Owned
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-5 rounded-full font-bold text-brand-earth/40 hover:text-brand-earth border border-brand-earth/10"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-[2] bg-brand-earth text-white py-5 rounded-full font-bold flex items-center justify-center shadow-xl"
                >
                  Next: Licensing <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-4 bg-brand-warm rounded-2xl text-brand-earth">
                  <FileText className="w-8 h-8" />
                </div>
                <h2 className="font-serif text-3xl">License & Permits</h2>
              </div>

              <div className="space-y-6">
                <div className="p-6 border border-brand-earth/10 rounded-3xl flex items-center justify-between hover:border-brand-teal transition-all group cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-warm rounded-xl flex items-center justify-center">
                      <Upload className="w-6 h-6 text-brand-earth/40 group-hover:text-brand-teal" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Driving License</h4>
                      <p className="text-[10px] text-brand-earth/30 uppercase tracking-widest">
                        Front & Back scan
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-brand-earth/10" />
                </div>

                <div className="p-6 border border-brand-earth/10 rounded-3xl flex items-center justify-between hover:border-brand-teal transition-all group cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-warm rounded-xl flex items-center justify-center">
                      <Upload className="w-6 h-6 text-brand-earth/40 group-hover:text-brand-teal" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Vehicle Insurance</h4>
                      <p className="text-[10px] text-brand-earth/30 uppercase tracking-widest">
                        Valid comprehensive cover
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-brand-earth/10" />
                </div>

                <div className="p-6 border border-brand-earth/10 rounded-3xl flex items-center justify-between hover:border-brand-teal transition-all group cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-warm rounded-xl flex items-center justify-center">
                      <Upload className="w-6 h-6 text-brand-earth/40 group-hover:text-brand-teal" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Tour Operator Permit</h4>
                      <p className="text-[10px] text-brand-earth/30 uppercase tracking-widest">
                        Local authority permit
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-brand-earth/10" />
                </div>
              </div>

              <div className="p-6 bg-brand-teal/5 rounded-3xl border border-brand-teal/10 flex items-start space-x-3">
                <ShieldCheck className="w-6 h-6 text-brand-teal shrink-0" />
                <p className="text-xs text-brand-earth/60">
                  I verify that all documents provided are valid and I agree to the{' '}
                  <span className="text-brand-teal font-bold underline cursor-pointer">
                    Manjaro Partner Agreement
                  </span>
                  .
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-5 rounded-full font-bold text-brand-earth/40 hover:text-brand-earth border border-brand-earth/10 text-sm"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-[2] bg-brand-earth text-white py-5 rounded-full font-bold flex items-center justify-center shadow-xl text-sm"
                >
                  Next: Payout Details <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-4 bg-brand-warm rounded-2xl text-brand-earth">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl">Payout Details</h2>
              </div>

              <p className="text-sm text-brand-earth/60">
                Choose your preferred method for receiving your payouts.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Mobile Money', 'Bank', 'Wise'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPayoutMethod(method)}
                    className={`p-6 rounded-[32px] border-2 text-left transition-all ${payoutMethod === method ? 'border-brand-teal bg-brand-teal/5' : 'border-brand-earth/5 hover:border-brand-earth/10'}`}
                  >
                    <h4 className="font-bold text-brand-earth mb-1 text-sm">{method}</h4>
                  </button>
                ))}
              </div>

              {payoutMethod && (
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="p-8 bg-brand-warm rounded-[32px] space-y-6 text-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                        Account Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none"
                        placeholder="Full legal name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                        {payoutMethod === 'Mobile Money' ? 'Phone Number' : 'Account Number'}
                      </label>
                      <input
                        type="text"
                        className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none"
                      />
                    </div>
                    {payoutMethod === 'Bank' && (
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-5 rounded-full font-bold text-brand-earth/40 hover:text-brand-earth border border-brand-earth/10 text-sm"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={!payoutMethod}
                  className={`flex-[2] bg-brand-teal text-white py-4 md:py-5 rounded-full font-bold flex items-center justify-center shadow-xl transition-all ${!payoutMethod ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-105'} text-xs md:text-sm`}
                >
                  Submit Final Application <CheckCircle2 className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
