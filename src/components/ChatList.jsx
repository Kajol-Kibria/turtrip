"use client";
import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Clock, ChevronRight } from 'lucide-react';

import { MOCK_CHAT_PREVIEWS } from '../mockData';
import Link from 'next/link';
export default function ChatList({ onSelectChat }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl text-brand-earth">Recent Messages</h3>
        <span className="bg-brand-teal/10 text-brand-teal text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {MOCK_CHAT_PREVIEWS.length} Active
        </span>
      </div>

      <div className="space-y-3">
        {MOCK_CHAT_PREVIEWS.map((chat) => (
          <Link key={chat.id} href={`/messages?chatId=${chat.id}`} className="block">
            <motion.div
              whileHover={{ x: 4 }}
              className="bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-brand-earth/5 hover:border-brand-teal/30 hover:bg-white transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={chat.participantPhoto}
                    alt={chat.participantName}
                    className="w-12 h-12 rounded-2xl object-cover shadow-sm"
                  />

                  {chat.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-teal text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-brand-earth truncate">
                      {chat.participantName}
                    </h4>
                    <span className="text-[10px] text-brand-earth/40 font-medium flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-brand-earth/60 truncate leading-relaxed">
                    {chat.lastMessage}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-brand-earth/5 flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {MOCK_CHAT_PREVIEWS.length === 0 && (
        <div className="text-center py-12 bg-white/30 rounded-[32px] border-2 border-dashed border-brand-earth/10">
          <MessageSquare className="w-10 h-10 text-brand-earth/20 mx-auto mb-4" />
          <p className="text-sm font-medium text-brand-earth/40">No messages yet</p>
        </div>
      )}

      <Link
        href="/messages"
        className="block mt-6 text-center text-[10px] font-bold uppercase tracking-widest text-brand-earth/40 hover:text-brand-teal transition-colors"
      >
        View All Conversations
      </Link>
    </div>
  );
}
