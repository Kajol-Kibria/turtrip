'use client';
import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import { Download, X, ArrowLeft, Maximize, Share2, Info } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function MediaViewerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const src = searchParams.get('src') || null;
  const sender = searchParams.get('sender') || 'Unknown User';
  const timestamp = searchParams.get('timestamp') || '';

  if (!src) {
    return (
      <div className="min-h-screen bg-brand-earth flex flex-col items-center justify-center p-6 text-white text-center">
        <h2 className="text-2xl font-serif mb-4">No Media Selected</h2>
        <button onClick={() => router.back()} className="px-8 py-3 bg-white/10 rounded-full font-bold">Return to Chat</button>
      </div>
    );
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `manjaro-shared-photo-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-brand-earth/95 backdrop-blur-2xl flex flex-col text-white overscroll-none overflow-hidden">
      {/* Dynamic Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="p-6 md:p-8 flex items-center justify-between relative z-50 bg-gradient-to-b from-black/40 to-transparent"
      >
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => router.back()}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="hidden md:block">
            <h1 className="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-1">Shared by</h1>
            <p className="font-serif text-lg">{sender || 'Unknown User'}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={handleDownload}
            className="px-6 py-3 bg-brand-teal text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-teal/20 hover:scale-105 active:scale-95 transition-all flex items-center"
          >
            <Download className="w-4 h-4 mr-2" /> Download JPG
          </button>
          <button 
            onClick={() => router.back()}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Main Image View */}
      <div className="flex-1 relative flex items-center justify-center p-4 md:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative max-w-full max-h-full group"
        >
          <img 
            src={src} 
            alt="Shared media" 
            className="max-w-full max-h-[80vh] object-contain rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10"
          />
          
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white/60 flex items-center">
               <Info className="w-3 h-3 mr-2" /> {timestamp || 'Shared recently'}
            </div>
          </div>
        </motion.div>

        {/* Cinematic Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img src={src} className="w-full h-full object-cover opacity-10 scale-150 blur-3xl" alt="blur" />
        </div>
      </div>

      {/* Bottom Actions for Mobile */}
      <div className="md:hidden p-6 grid grid-cols-2 gap-4 border-t border-white/5">
        <button className="flex items-center justify-center p-4 bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest">
          <Share2 className="w-4 h-4 mr-2" /> Share
        </button>
        <button className="flex items-center justify-center p-4 bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest">
          <Maximize className="w-4 h-4 mr-2" /> Preview
        </button>
      </div>
    </div>
  );
}

export default function MediaViewer() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-earth flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
        <p className="text-sm opacity-60">Loading media...</p>
      </div>
    }>
      <MediaViewerContent />
    </Suspense>
  );
}