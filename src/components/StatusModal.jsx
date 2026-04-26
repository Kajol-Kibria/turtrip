'use client';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, X, Info } from 'lucide-react';

const StatusModal = ({ isOpen, onClose, type, title, message, actionLabel, onAction }) => {
  const themes = {
    success: {
      icon: <CheckCircle2 className="w-10 h-10 text-brand-teal" />,
      bg: 'bg-brand-teal/10',
      button: 'bg-brand-earth hover:bg-brand-earth/90',
    },
    failed: {
      icon: <XCircle className="w-10 h-10 text-red-500" />,
      bg: 'bg-red-500/10',
      button: 'bg-brand-earth hover:bg-brand-earth/90',
    },
    warning: {
      icon: <AlertCircle className="w-10 h-10 text-brand-saffron" />,
      bg: 'bg-brand-saffron/10',
      button: 'bg-brand-earth hover:bg-brand-earth/90',
    },
    info: {
      icon: <Info className="w-10 h-10 text-blue-500" />,
      bg: 'bg-blue-500/10',
      button: 'bg-brand-earth hover:bg-brand-earth/90',
    },
  };

  const theme = themes[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-earth/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden p-8 text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-brand-warm transition-colors"
            >
              <X className="w-5 h-5 text-brand-earth/40" />
            </button>

            <div
              className={`mx-auto w-20 h-20 rounded-full ${theme.bg} flex items-center justify-center mb-6`}
            >
              {theme.icon}
            </div>

            <h2 className="font-serif text-3xl text-brand-earth mb-4">{title}</h2>
            <p className="text-brand-earth/60 mb-8 leading-relaxed">{message}</p>

            <div className="space-y-4">
              {actionLabel && (
                <button
                  onClick={() => {
                    onAction?.();
                    onClose();
                  }}
                  className={`w-full py-5 rounded-full text-white font-bold flex items-center justify-center transition-all shadow-lg ${theme.button}`}
                >
                  {actionLabel} <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              )}
              <button
                onClick={onClose}
                className="w-full py-4 text-brand-earth/40 font-bold hover:text-brand-earth transition-colors"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StatusModal;
