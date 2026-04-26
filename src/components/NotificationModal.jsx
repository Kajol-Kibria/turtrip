'use client';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const NotificationModal = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  actionText = 'Understood',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-earth/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-[40px] shadow-2xl overflow-hidden p-8 md:p-10 text-center"
          >
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                type === 'success' ? 'bg-brand-teal/10 text-brand-teal' : 'bg-red-100 text-red-500'
              }`}
            >
              {type === 'success' ? (
                <CheckCircle2 className="w-10 h-10" />
              ) : (
                <AlertCircle className="w-10 h-10" />
              )}
            </div>

            <h3 className="font-serif text-3xl mb-4 text-brand-earth">{title}</h3>
            <p className="text-sm text-brand-earth/60 max-w-xs mx-auto leading-relaxed mb-8">
              {message}
            </p>

            <button
              onClick={onClose}
              className="w-full bg-brand-earth text-white py-4 rounded-full font-bold shadow-lg hover:bg-brand-earth/90 transition-all"
            >
              {actionText}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
