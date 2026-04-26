'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  LogOut,
  Settings,
  MessageSquare,
  Shield,
  Car,
  LayoutGrid,
  Home as HomeIcon,
  Users,
  Bell,
  Mountain,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import NotificationCenter from './NotificationCenter';
import { MOCK_NOTIFICATIONS } from '../mockData';

const COUNTRIES = []; // Placeholder or just remove

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  const unreadNotifications = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;

  return (
    <nav className="sticky top-0 z-50 bg-brand-warm/90 backdrop-blur-md border-b border-brand-earth/10">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 font-serif text-3xl font-bold text-brand-earth tracking-tighter hover:opacity-80 transition-opacity"
        >
          <Mountain className="w-8 h-8 text-brand-teal" />
          <span>Manjaro</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium hover:text-brand-teal transition-colors">
            Home
          </Link>
          <Link
            href="/guides"
            className="text-sm font-medium hover:text-brand-teal transition-colors"
          >
            Find a Guide
          </Link>
          <Link
            href="/partner/onboarding"
            className="text-sm font-bold text-brand-teal bg-brand-teal/10 px-4 py-2 rounded-full hover:bg-brand-teal hover:text-white transition-all"
          >
            Become a Partner
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-6">
              {/* Notification Link */}
              <Link
                href="/notifications"
                className="relative p-2.5 bg-white border border-brand-earth/10 rounded-full hover:shadow-md transition-all cursor-pointer group"
              >
                <Bell className="w-5 h-5 text-brand-earth group-hover:text-brand-teal transition-colors" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full text-[8px] font-bold text-white flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Link>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-1 pl-3 bg-white border border-brand-earth/10 rounded-full hover:shadow-md transition-all cursor-pointer"
                >
                  <span className="text-xs font-bold">{user?.name.split(' ')[0]}</span>
                  <img
                    src={user?.profilePhoto || 'https://picsum.photos/seed/user/100/100'}
                    className="w-8 h-8 rounded-full border border-brand-earth/5"
                    alt="profile"
                  />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-brand-earth/10 overflow-hidden py-2"
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-3 text-sm hover:bg-brand-warm transition-colors"
                      >
                        <LayoutGrid className="w-4 h-4 mr-3 opacity-40 text-brand-earth" /> My
                        Dashboard
                      </Link>

                      {user?.role === 'StayProvider' && (
                        <Link
                          href="/stay-provider/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center px-4 py-3 text-sm hover:bg-brand-warm transition-colors"
                        >
                          <HomeIcon className="w-4 h-4 mr-3 opacity-40 text-brand-teal" /> Stay
                          Provider Dashboard
                        </Link>
                      )}

                      {user?.role === 'Guide' && (
                        <Link
                          href="/guide/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center px-4 py-3 text-sm hover:bg-brand-warm transition-colors text-brand-teal"
                        >
                          <Users className="w-4 h-4 mr-3 opacity-40" /> Guide Dashboard
                        </Link>
                      )}

                      {user?.role === 'Driver' && (
                        <Link
                          href="/driver/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center px-4 py-3 text-sm hover:bg-brand-warm transition-colors text-brand-teal"
                        >
                          <Car className="w-4 h-4 mr-3 opacity-40" /> Driver Dashboard
                        </Link>
                      )}

                      <Link
                        href="/messages"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-3 text-sm hover:bg-brand-warm transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 mr-3 opacity-40" /> Messages
                      </Link>
                      <Link
                        href="/support"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-3 text-sm hover:bg-brand-warm transition-colors"
                      >
                        <Shield className="w-4 h-4 mr-3 opacity-40" /> Support & Disputes
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-3 text-sm hover:bg-brand-warm transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-3 opacity-40" /> Settings
                      </Link>
                      <div className="h-[1px] bg-brand-earth/5 my-1" />
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center px-4 py-3 text-sm text-brand-coral hover:bg-brand-coral/5 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-3 opacity-40" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal()}
              className="px-6 py-2 bg-brand-earth text-white rounded-full text-sm font-bold shadow-md hover:bg-brand-earth/90 transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          {isAuthenticated && (
            <Link href="/notifications" className="relative p-2 text-brand-earth">
              <Bell className="w-6 h-6" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 border-2 border-brand-warm rounded-full" />
              )}
            </Link>
          )}
          <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-brand-warm border-t border-brand-earth/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-xl font-serif">
                Home
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-serif"
                  >
                    My Dashboard
                  </Link>
                  {user?.role === 'Guide' && (
                    <Link
                      href="/guide/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-bold text-brand-teal pl-4"
                    >
                      Guide Dashboard
                    </Link>
                  )}
                  {user?.role === 'Driver' && (
                    <Link
                      href="/driver/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-bold text-brand-teal pl-4"
                    >
                      Driver Dashboard
                    </Link>
                  )}
                  <Link
                    href="/dashboard?tab=wishlist"
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-serif"
                  >
                    Wishlist
                  </Link>
                  <Link
                    href="/messages"
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-serif text-brand-coral"
                  >
                    Messages
                  </Link>
                  <Link
                    href="/support"
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-serif"
                  >
                    Support & Disputes
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-serif"
                  >
                    Settings
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    openAuthModal();
                    setIsOpen(false);
                  }}
                  className="text-left text-xl font-serif text-brand-earth"
                >
                  Sign In to Manjaro
                </button>
              )}
              <Link
                href="/partner/onboarding"
                onClick={() => setIsOpen(false)}
                className="text-xl font-serif text-brand-teal"
              >
                Become a Partner
              </Link>
              {isAuthenticated && (
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-left text-xl font-serif text-brand-coral pt-4 border-t border-brand-earth/10"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
