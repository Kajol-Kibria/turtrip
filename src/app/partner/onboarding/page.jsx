'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  MapPin,
  Truck,
  Users,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  Upload,
  Home as HomeIcon,
  Lock,
  Mail,
  KeyRound,
  Banknote,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import StatusModal from '@/components/StatusModal';

export default function PartnerOnboarding() {
  const navigate = useRouter();
  const [step, setStep] = useState(1);
  const [isLogin, setIsLogin] = useState(true);
  const [loginStep, setLoginStep] = useState(1); // 1: Email/Cat, 2: OTP
  const [partnerType, setPartnerType] = useState(null);
  const [payoutMethod, setPayoutMethod] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    // Stay specific
    stayType: 'Hotel',
    roomCount: '',
    // Driver specific
    vehicleType: 'Car',
    plateNumber: '',
    // Guide specific
    specialization: '',
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    category: 'Guide',
  });

  const [showStatus, setShowStatus] = useState(false);
  const [statusConfig, setStatusConfig] = useState({ type: 'success', title: '', message: '' });

  const triggerStatus = (type, title, message) => {
    setStatusConfig({ type, title, message });
    setShowStatus(true);
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => {
    if (isLogin && loginStep === 2) {
      setLoginStep(1);
    } else {
      setStep((s) => s - 1);
      setIsLogin(false);
      setLoginStep(1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length === 6) {
      triggerStatus(
        'success',
        'Access Granted',
        `Welcome back! You have successfully authenticated as a ${loginForm.category}. Redirecting to your dashboard...`
      );
      setTimeout(() => {
        if (loginForm.category === 'Guide') navigate('/guide/dashboard');
        else if (loginForm.category === 'Driver') navigate('/driver/dashboard');
        else if (loginForm.category === 'StayProvider') navigate('/stay-provider/dashboard');
      }, 1500);
    } else {
      triggerStatus(
        'failed',
        'Verification Error',
        'The OTP you entered is incomplete or incorrect. Please ensure you enter the full 6-digit code sent to your email.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-brand-warm/30 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="font-serif text-5xl text-brand-earth mb-4">
            {isLogin ? 'Partner Login' : 'Become a Partner'}
          </h1>
          <p className="text-brand-earth/60 text-lg">
            {isLogin
              ? 'Access your dashboard and manage your services.'
              : "Join the world's most authentic travel marketplace."}
          </p>

          <div className="mt-8 flex justify-center">
            <div className="bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-brand-earth/10 flex">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setStep(1);
                  setLoginStep(1);
                }}
                className={`px-8 py-2.5 rounded-full text-xs font-bold transition-all ${isLogin ? 'bg-brand-earth text-white shadow-lg' : 'text-brand-earth/60 hover:text-brand-earth'}`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setStep(1);
                  setLoginStep(1);
                }}
                className={`px-8 py-2.5 rounded-full text-xs font-bold transition-all ${!isLogin ? 'bg-brand-earth text-white shadow-lg' : 'text-brand-earth/60 hover:text-brand-earth'}`}
              >
                Register
              </button>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!isLogin ? (
            <motion.div key="register-flow">
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <PartnerTypeCard
                    title="Guide"
                    icon={<Users className="w-8 h-8" />}
                    desc="Lead unique experiences and share your local culture."
                    onClick={() => navigate('/guide/onboarding')}
                  />

                  <PartnerTypeCard
                    title="Driver"
                    icon={<Truck className="w-8 h-8" />}
                    desc="Provide safe, reliable transport for travelers."
                    onClick={() => navigate('/driver/onboarding')}
                  />

                  <PartnerTypeCard
                    title="Stay Provider"
                    icon={<HomeIcon className="w-8 h-8" />}
                    desc="Host travelers in your hotel, camp, or villa."
                    onClick={() => {
                      setPartnerType('StayProvider');
                      handleNext();
                    }}
                  />
                </div>
              )}

              {step === 2 && partnerType && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card rounded-[48px] p-8 md:p-12 shadow-2xl border border-brand-earth/5"
                >
                  <button
                    onClick={handleBack}
                    className="flex items-center text-sm font-bold text-brand-earth/40 hover:text-brand-earth mb-8"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Change Partner Type
                  </button>

                  <h2 className="font-serif text-3xl mb-8">{partnerType} Registration</h2>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        {partnerType === 'StayProvider' && (
                          <div>
                            <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                              Type of Stay
                            </label>
                            <select
                              value={formData.stayType}
                              onChange={(e) =>
                                setFormData({ ...formData, stayType: e.target.value })
                              }
                              className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm appearance-none bg-white"
                            >
                              <option>Hotel</option>
                              <option>Short Let</option>
                              <option>Camp</option>
                              <option>Villa</option>
                              <option>Apartment</option>
                            </select>
                          </div>
                        )}

                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                            Name of {partnerType === 'StayProvider' ? 'Stay' : 'Business/Self'}
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. West Park Hotels"
                            className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                            Address / Base Location
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-earth/20" />
                            <input
                              type="text"
                              placeholder="Street address, City"
                              className="w-full p-4 pl-12 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                              required
                              value={formData.address}
                              onChange={(e) =>
                                setFormData({ ...formData, address: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              placeholder="contact@example.com"
                              className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              placeholder="+234 ..."
                              className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        {partnerType === 'StayProvider' && (
                          <div>
                            <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                              Total Number of Rooms
                            </label>
                            <input
                              type="number"
                              placeholder="e.g. 25"
                              className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                              required
                              value={formData.roomCount}
                              onChange={(e) =>
                                setFormData({ ...formData, roomCount: e.target.value })
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-8 bg-brand-earth/5 rounded-[32px] border-2 border-dashed border-brand-earth/10">
                      <div className="flex flex-col items-center text-center">
                        <Upload className="w-10 h-10 text-brand-earth/20 mb-4" />
                        <h3 className="font-bold text-sm mb-1">Upload Required Certificate</h3>
                        <p className="text-[10px] text-brand-earth/40 uppercase tracking-widest mb-4">
                          PDF, JPG, PNG (Max 5MB)
                        </p>
                        <label className="bg-brand-earth text-white px-6 py-2 rounded-full text-xs font-bold cursor-pointer hover:bg-brand-earth/90 transition-all">
                          Choose File
                          <input type="file" className="hidden" />
                        </label>
                        <p className="mt-4 text-[9px] text-brand-earth/40 italic">
                          {partnerType === 'Guide' && 'Tourism board license or local certificate'}
                          {partnerType === 'Driver' &&
                            'Commercial driver license and vehicle insurance'}
                          {partnerType === 'StayProvider' &&
                            'Business registration or operating permit'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-6 bg-brand-teal/5 rounded-[32px] border border-brand-teal/10">
                      <Shield className="w-6 h-6 text-brand-teal shrink-0 mt-1" />
                      <div className="text-xs text-brand-earth/60 leading-relaxed">
                        <p className="font-bold text-brand-earth mb-1 uppercase tracking-widest">
                          Verification Process
                        </p>
                        By submitting, you agree to our partner vetting process. Our regional team
                        will contact you within 48 hours to schedule a verification
                        interview/inspection.
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-6 bg-brand-earth text-white rounded-full font-bold text-lg shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center"
                    >
                      Continue to Payout Details <ChevronRight className="w-6 h-6 ml-2" />
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 3 && partnerType && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card rounded-[48px] p-8 md:p-12 shadow-2xl border border-brand-earth/5"
                >
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-4 bg-brand-warm rounded-2xl text-brand-earth">
                      <Banknote className="w-8 h-8" />
                    </div>
                    <h2 className="font-serif text-3xl">Banking Details</h2>
                  </div>

                  <p className="text-sm text-brand-earth/60 mb-8">
                    Choose your preferred method for receiving payments for your{' '}
                    {partnerType === 'StayProvider'
                      ? 'stay'
                      : partnerType === 'Driver'
                        ? 'rides'
                        : 'tours'}
                    .
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    {[
                      { id: 'Mobile Money', label: 'Mobile Money' },
                      { id: 'Bank', label: 'Bank Transfer' },
                      { id: 'Wise', label: 'International' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPayoutMethod(method.id)}
                        className={`p-6 border-2 rounded-3xl text-left transition-all ${payoutMethod === method.id ? 'border-brand-teal bg-brand-teal/5' : 'border-brand-earth/5 hover:border-brand-earth/10'}`}
                      >
                        <p className="font-bold text-brand-earth">{method.label}</p>
                      </button>
                    ))}
                  </div>

                  {payoutMethod && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6 pt-6 border-t border-brand-earth/5 mb-12"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                            Account Holder Name
                          </label>
                          <input
                            type="text"
                            className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                            placeholder="e.g. West Park Hotels Ltd"
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
                          />
                        </div>
                        {payoutMethod === 'Bank' && (
                          <div>
                            <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                              Bank Name
                            </label>
                            <input
                              type="text"
                              className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-5 rounded-full font-bold text-brand-earth/40 hover:text-brand-earth border border-brand-earth/10"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        triggerStatus(
                          'success',
                          'Application Received',
                          `Thank you for joining as a ${partnerType}! Our regional team will review your application and documents. You will receive an update via email within 48 hours.`
                        );
                      }}
                      className={`flex-[2] bg-brand-teal text-white py-5 rounded-full font-bold flex items-center justify-center shadow-xl hover:bg-brand-teal/90 transition-all ${!payoutMethod ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      Complete Registration <CheckCircle className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="login-flow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="glass-card rounded-[48px] p-8 md:p-12 shadow-2xl border border-brand-earth/5">
                {loginStep === 1 ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-8">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-brand-earth/5 text-brand-earth rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8" />
                      </div>
                      <h2 className="font-serif text-3xl">Partner Access</h2>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                          Partner Category
                        </label>
                        <select
                          value={loginForm.category}
                          onChange={(e) => setLoginForm({ ...loginForm, category: e.target.value })}
                          className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm appearance-none bg-white font-bold"
                        >
                          <option value="Guide">Guide / Agency</option>
                          <option value="Driver">Driver / Fleet Owner</option>
                          <option value="StayProvider">Stay Provider</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-earth/20" />
                          <input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full p-4 pl-12 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                            required
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-5 bg-brand-earth text-white rounded-full font-bold text-lg shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center group"
                    >
                      Continue{' '}
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                ) : (
                  <div className="space-y-8">
                    <button
                      onClick={() => setLoginStep(1)}
                      className="flex items-center text-xs font-bold text-brand-earth/40 hover:text-brand-earth mb-4"
                    >
                      <ArrowLeft className="w-3 h-3 mr-2" /> Change Email
                    </button>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-brand-teal/5 text-brand-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <KeyRound className="w-8 h-8" />
                      </div>
                      <h2 className="font-serif text-3xl mb-2">Verify Identity</h2>
                      <p className="text-xs text-brand-earth/40">
                        We've sent a 6-digit code to{' '}
                        <span className="text-brand-earth font-bold">{loginForm.email}</span>
                      </p>
                    </div>

                    <div className="flex justify-between gap-2">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          className="w-12 h-16 text-center text-2xl font-bold bg-brand-earth/5 border border-brand-earth/10 rounded-2xl outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                        />
                      ))}
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={handleVerifyOtp}
                        className="w-full py-5 bg-brand-teal text-white rounded-full font-bold text-lg shadow-xl hover:scale-[1.02] transition-all"
                      >
                        Confirm Login
                      </button>
                      <button className="w-full text-xs font-bold text-brand-earth/40 hover:text-brand-earth transition-colors">
                        Resend Code in 0:59
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <StatusModal
        isOpen={showStatus}
        onClose={() => {
          setShowStatus(false);
          navigate('/');
        }}
        type={statusConfig.type}
        title={statusConfig.title}
        message={statusConfig.message}
        actionLabel="Back to Home"
      />
    </div>
  );
}

function PartnerTypeCard({ title, icon, desc, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass-card rounded-[48px] p-8 text-center border border-brand-earth/5 hover:border-brand-teal transition-all cursor-pointer shadow-xl group"
      onClick={onClick}
    >
      <div className="w-20 h-20 bg-brand-teal/5 text-brand-teal rounded-[32px] flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-teal group-hover:text-white transition-all shadow-sm">
        {icon}
      </div>
      <h3 className="font-serif text-2xl mb-4">{title}</h3>
      <p className="text-sm text-brand-earth/60 leading-relaxed mb-8">{desc}</p>
      <div className="w-10 h-10 bg-brand-earth/5 rounded-full flex items-center justify-center mx-auto text-brand-earth/40 group-hover:bg-brand-earth group-hover:text-white transition-all">
        <ChevronRight className="w-5 h-5" />
      </div>
    </motion.div>
  );
}
