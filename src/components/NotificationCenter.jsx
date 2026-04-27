'use client';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  CreditCard,
  RefreshCcw,
  ArrowRight,
} from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../mockData';
import { useRouter } from 'next/navigation';
const NotificationCenter = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [notifications, setNotifications] = React.useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-brand-teal" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-brand-saffron" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-brand-teal" />;
      case 'update':
        return <RefreshCcw className="w-5 h-5 text-brand-teal" />;
      default:
        return <Info className="w-5 h-5 text-brand-earth/40" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-brand-earth/20 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl border-l border-brand-earth/5 overflow-hidden flex flex-col pt-20 md:pt-0"
          >
            <div className="p-8 border-b border-brand-earth/5 flex items-center justify-between bg-brand-warm/10">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-brand-teal flex items-center justify-center text-white">
                    <Bell className="w-4 h-4" />
                  </div>
                  <h2 className="font-serif text-2xl text-brand-earth">Notifications</h2>
                </div>
                {unreadCount > 0 ? (
                  <p className="text-[10px] text-brand-teal font-black uppercase tracking-widest">
                    {unreadCount} new updates today
                  </p>
                ) : (
                  <p className="text-[10px] text-brand-earth/40 font-bold uppercase tracking-widest">
                    You're all caught up
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={markAllAsRead}
                  className="p-2 rounded-full hover:bg-brand-teal/10 text-brand-teal transition-colors group"
                  title="Mark all as read"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-brand-earth/5 transition-colors"
                >
                  <X className="w-6 h-6 text-brand-earth/40" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4 bg-white">
              {notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <Bell className="w-12 h-12 mb-4" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative p-5 rounded-3xl border transition-all ${notification.isRead ? 'border-brand-earth/5 bg-brand-warm/10' : 'border-brand-teal/20 bg-brand-teal/[0.02] shadow-sm'}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    {!notification.isRead && (
                      <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-brand-teal" />
                    )}
                    <div className="flex gap-4">
                      <div
                        className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center ${notification.isRead ? 'bg-brand-earth/5' : 'bg-brand-teal/10'}`}
                      >
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-brand-earth truncate mb-0.5">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-brand-earth/60 mb-3 leading-relaxed">
                          {notification.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-medium text-brand-earth/30 uppercase tracking-wider">
                            {notification.timestamp}
                          </span>
                          {notification.actionLabel && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (notification.actionUrl) router.push(notification.actionUrl);
                              }}
                              className="flex items-center text-[10px] font-bold text-brand-teal uppercase tracking-widest hover:underline"
                            >
                              {notification.actionLabel} <ArrowRight className="ml-1 w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-6 bg-brand-warm/30 border-t border-brand-earth/5">
              <p className="text-[10px] text-center text-brand-earth/40 uppercase font-bold tracking-widest">
                Showing your latest updates
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;
