'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Save, User, Bell, Shield, Globe, Camera } from 'lucide-react';

import StatusModal from '@/components/StatusModal';

export default function Settings() {
  const [formData, setFormData] = useState({
    name: 'Pelu Yusuf',
    email: 'yusuf@naturtrip.com',
    bio: 'Travel enthusiast exploring the hidden gems of Africa.',
    country: 'Nigeria',
    currency: 'NGN',
    newsletter: true,
  });

  const [saving, setSaving] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [statusConfig, setStatusConfig] = useState({ type: 'success', title: '', message: '' });

  const triggerStatus = (type, title, message) => {
    setStatusConfig({ type, title, message });
    setShowStatus(true);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      triggerStatus(
        'success',
        'Changes Saved',
        'Your profile settings and preferences have been successfully updated across NaturTrip.'
      );
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 md:px-6 pt-5 md:pt-18 pb-12 md:pb-20"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4">
        <h1 className="font-serif text-3xl md:text-5xl text-brand-earth">Settings</h1>
        <button
          onClick={handleSave}
          className="w-full md:w-auto flex items-center justify-center space-x-2 bg-brand-teal text-white px-8 py-3.5 md:py-4 rounded-full font-bold shadow-xl hover:bg-brand-teal/90 transition-all disabled:opacity-50"
          disabled={saving}
        >
          <Save className="w-5 h-5" />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Left Nav */}
        <div className="flex overflow-x-auto md:flex-col space-x-2 md:space-x-0 md:space-y-2 pb-4 md:pb-0 no-scrollbar">
          {[
            { name: 'Profile', icon: User },
            { name: 'Notifications', icon: Bell },
            { name: 'Security', icon: Shield },
            { name: 'Localization', icon: Globe },
          ].map((item, idx) => (
            <button
              key={item.name}
              className={`shrink-0 md:w-full flex items-center space-x-2 md:space-x-3 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold transition-all ${idx === 0 ? 'bg-brand-earth text-white' : 'bg-brand-warm/30 hover:bg-brand-earth/5 text-brand-earth/60'}`}
            >
              <item.icon className="w-4 h-4 md:w-5 md:h-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Form area */}
        <div className="md:col-span-2 space-y-12">
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 text-center sm:text-left">
              <div className="relative group">
                <img
                  src="https://picsum.photos/seed/user1/200/200"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-xl"
                  alt="profile"
                />
                <button className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <Camera className="text-white w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
              <div className="pt-2">
                <h3 className="font-serif text-xl md:text-2xl">Profile Picture</h3>
                <p className="text-[10px] md:text-xs text-brand-earth/40 mt-1">PNG or JPG. Recommended 800x800px.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none bg-brand-warm/30 opacity-60"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Personal Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none focus:border-brand-teal transition-all h-32"
                />
              </div>
            </div>
          </section>

          <section className="pt-12 border-t border-brand-earth/10">
            <h3 className="font-serif text-2xl mb-8">Localization & Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Preferred Country
                </label>
                <select
                  className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none appearance-none bg-white"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                >
                  <option>Nigeria</option>
                  <option>Tanzania</option>
                  <option>Jamaica</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">
                  Primary Currency
                </label>
                <select
                  className="w-full p-4 rounded-2xl border border-brand-earth/10 outline-none appearance-none bg-white"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                >
                  <option>NGN (₦)</option>
                  <option>TZS (TSh)</option>
                  <option>USD ($)</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>

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
