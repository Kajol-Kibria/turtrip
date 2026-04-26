'use client';
import React from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  CreditCard,
  RefreshCcw,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '@/mockData';
import { useRouter } from 'next/navigation';
const Notifications = () => {
  const navigate = useRouter();
  const [notifications, setNotifications] = React.useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-brand-warm/30 pt-32 pb-20 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-teal flex items-center justify-center text-white shadow-lg shadow-brand-teal/20">
                <Bell className="w-6 h-6" />
              </div>
              <h1 className="font-serif text-4xl text-brand-earth">Notifications</h1>
            </div>
            <p className="text-brand-earth/60">
              Stay updated with your bookings, messages, and account status.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-6 py-3 bg-white border border-brand-earth/10 rounded-full text-xs font-bold text-brand-teal uppercase tracking-widest hover:shadow-md transition-all"
            >
              Mark all as read ({unreadCount})
            </button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-[40px] p-20 text-center border border-brand-earth/5">
              <div className="w-20 h-20 bg-brand-warm/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="w-10 h-10 text-brand-earth/20" />
              </div>
              <h3 className="font-serif text-2xl text-brand-earth mb-2">All Quiet Here</h3>
              <p className="text-brand-earth/60">You don't have any notifications at the moment.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative p-6 rounded-[32px] border transition-all cursor-pointer group ${notification.isRead ? 'border-brand-earth/5 bg-white' : 'border-brand-teal/20 bg-brand-teal/[0.02] shadow-sm ring-1 ring-brand-teal/5'}`}
                onClick={() => markAsRead(notification.id)}
              >
                {!notification.isRead && (
                  <div className="absolute top-8 right-8 w-2.5 h-2.5 rounded-full bg-brand-teal ring-4 ring-brand-teal/10" />
                )}

                <div className="flex gap-6">
                  <div
                    className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${notification.isRead ? 'bg-brand-warm/50 text-brand-earth/40' : 'bg-brand-teal/10 text-brand-teal'}`}
                  >
                    {getTypeIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-bold text-lg text-brand-earth truncate pr-8">
                        {notification.title}
                      </h4>
                      <span className="text-[10px] font-bold text-brand-earth/30 uppercase tracking-widest pt-1">
                        {notification.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-brand-earth/60 mb-4 leading-relaxed max-w-2xl">
                      {notification.description}
                    </p>

                    <div className="flex items-center gap-4">
                      {notification.actionLabel && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (notification.actionUrl) navigate(notification.actionUrl);
                          }}
                          className="flex items-center text-xs font-bold text-brand-teal uppercase tracking-widest hover:underline"
                        >
                          {notification.actionLabel} <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 ml-auto p-2 text-red-500/40 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Notifications;
