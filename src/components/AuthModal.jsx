'use client';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Apple, ChevronLeft, Eye, EyeOff, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import StatusModal from './StatusModal';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [mode, setMode] = useState('signin');
  const [view, setView] = useState('options');
  const [showPassword, setShowPassword] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  if (!isAuthModalOpen && !showStatusModal) return null;

  const handleBack = () => {
    if (isForgotPassword) {
      setIsForgotPassword(false);
    } else {
      setView('options');
    }
  };

  return (
    <>
      <StatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        type="success"
        title="Link Sent!"
        message="A password reset link has been sent to your email address. Please check your inbox and spam folder."
        actionLabel="Back to Sign In"
        onAction={() => {
          setIsForgotPassword(false);
          setMode('signin');
        }}
      />

      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-earth/80 backdrop-blur-sm"
          >
            <div className="absolute inset-0" onClick={closeAuthModal} />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <button
                onClick={closeAuthModal}
                className="absolute top-6 right-6 p-2 bg-brand-earth/5 hover:bg-brand-earth/10 rounded-full transition-all z-10"
              >
                <X className="w-5 h-5 text-brand-earth/40" />
              </button>

              {(view === 'form' || isForgotPassword) && (
                <button
                  onClick={handleBack}
                  className="absolute top-6 left-6 p-2 bg-brand-earth/5 hover:bg-brand-earth/10 rounded-full transition-all z-10"
                >
                  <ChevronLeft className="w-5 h-5 text-brand-earth/40" />
                </button>
              )}

              <div className="p-10 pt-16">
                <div className="text-center mb-10 text-brand-earth">
                  <h2 className="font-serif text-3xl mb-2">
                    {isForgotPassword
                      ? 'Reset Password'
                      : mode === 'signin'
                        ? 'Welcome Back'
                        : 'Create Account'}
                  </h2>
                  <p className="text-sm opacity-60">
                    {isForgotPassword
                      ? "Enter your email address and we'll send you a link to reset your password."
                      : mode === 'signin'
                        ? 'Sign in to access your adventures and messages.'
                        : 'Join Manjaro to discover authentic local experiences.'}
                  </p>
                </div>

                {view === 'options' && !isForgotPassword ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => login('google')}
                      className="w-full flex items-center justify-center space-x-3 p-4 border border-brand-earth/10 rounded-2xl font-bold hover:bg-brand-earth/5 transition-all text-brand-earth"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 48 48">
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        />
                        <path
                          fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
                        />
                        <path
                          fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        />
                        <path fill="none" d="M0 0h48v48H0z" />
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <button
                      onClick={() => login('apple')}
                      className="w-full flex items-center justify-center space-x-3 p-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-900 transition-all"
                    >
                      <Apple className="w-5 h-5 fill-current" />
                      <span>Continue with Apple</span>
                    </button>

                    <div className="flex items-center my-6">
                      <div className="flex-1 h-[1px] bg-brand-earth/10" />
                      <span className="px-4 text-[10px] uppercase font-bold tracking-widest text-brand-earth/30">
                        OR
                      </span>
                      <div className="flex-1 h-[1px] bg-brand-earth/10" />
                    </div>

                    <button
                      onClick={() => setView('form')}
                      className="w-full flex items-center justify-center space-x-3 p-4 border border-brand-earth/10 rounded-2xl font-bold hover:bg-brand-earth/5 transition-all text-brand-earth"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Continue with Email</span>
                    </button>

                    <div className="pt-6 text-center">
                      <button
                        onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                        className="text-sm font-medium text-brand-teal hover:underline"
                      >
                        {mode === 'signin'
                          ? "Don't have an account? Sign Up"
                          : 'Already have an account? Sign In'}
                      </button>
                    </div>
                  </div>
                ) : isForgotPassword ? (
                  <form
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setShowStatusModal(true);
                      closeAuthModal();
                    }}
                  >
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-brand-earth text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-brand-earth/90 transition-all"
                    >
                      Send Reset Link
                    </button>
                  </form>
                ) : (
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      login('email');
                    }}
                  >
                    {mode === 'signup' && (
                      <>
                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-earth/30" />
                            <input
                              type="tel"
                              placeholder="+234 800 000 0000"
                              className="w-full p-4 pl-11 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                        required
                      />
                    </div>

                    <div className="relative">
                      <div className="flex justify-between items-center mb-2 ml-2">
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40">
                          Password
                        </label>
                        {mode === 'signin' && (
                          <button
                            type="button"
                            onClick={() => setIsForgotPassword(true)}
                            className="text-[10px] font-bold text-brand-teal uppercase tracking-widest hover:underline"
                          >
                            Forgot?
                          </button>
                        )}
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                        required
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-[38px] text-brand-earth/30 hover:text-brand-earth transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                      {mode === 'signup' && (
                        <p className="mt-2 text-[9px] text-brand-earth/40 italic px-2">
                          Password must be at least 8 characters long with a mix of letters, numbers
                          & symbols.
                        </p>
                      )}
                    </div>

                    {mode === 'signup' && (
                      <>
                        <div className="relative">
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2 ml-2">
                            Confirm Password
                          </label>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all text-sm"
                            required
                          />
                        </div>
                        <div className="flex items-start space-x-3 pt-2">
                          <input
                            type="checkbox"
                            id="terms"
                            className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-teal focus:ring-brand-teal"
                            required
                          />
                          <label
                            htmlFor="terms"
                            className="text-[10px] text-brand-earth/60 leading-relaxed"
                          >
                            I agree to Manjaro's{' '}
                            <span className="text-brand-teal underline">Terms of Service</span> and{' '}
                            <span className="text-brand-teal underline">Privacy Policy</span>.
                          </label>
                        </div>
                      </>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-brand-teal text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-brand-teal/90 transition-all mt-4"
                    >
                      {mode === 'signin' ? 'Sign In' : 'Create Account'}
                    </button>
                  </form>
                )}

                <p className="mt-12 text-[10px] text-brand-earth/40 italic text-center">
                  Protected by reCAPTCHA. Manjaro's standard security applies.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
