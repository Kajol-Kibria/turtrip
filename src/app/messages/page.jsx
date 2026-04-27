'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import { MOCK_MESSAGES, MOCK_SPECIALISTS } from '@/mockData';
import Link from 'next/link';
export default function Messages() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const guide = MOCK_SPECIALISTS[0];

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      senderId: 'u1',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto h-screen md:h-[calc(100vh-80px)] flex flex-col bg-white md:border-x border-brand-earth/10 shadow-2xl pt-16 md:pt-0"
    >
      {/* Header */}
      <div className="p-4 border-b border-brand-earth/10 flex items-center justify-between bg-brand-warm/30">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="p-2 hover:bg-brand-earth/5 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="relative">
            <img src={guide.profilePhoto} className="w-10 h-10 rounded-full" alt="guide" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-brand-teal rounded-full border-2 border-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm">{guide.name}</h3>
            <p className="text-[10px] uppercase font-bold tracking-widest text-brand-teal">
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-brand-earth/5 rounded-full text-brand-earth/60">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-brand-earth/5 rounded-full text-brand-earth/60">
            <Video className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-brand-earth/5 rounded-full text-brand-earth/60">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-[#F8FAFF]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${msg.isMe ? 'bg-brand-earth text-white rounded-tr-none' : 'bg-white text-brand-earth rounded-tl-none'}`}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={`text-[9px] mt-1 text-right opacity-50 ${msg.isMe ? 'text-white' : 'text-brand-earth'}`}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-brand-earth/10 bg-white">
        <div className="flex items-center space-x-4 bg-brand-warm/30 p-2 rounded-2xl">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm"
          />

          <button
            onClick={handleSend}
            className="p-3 bg-brand-earth text-white rounded-xl shadow-lg hover:bg-brand-earth/90 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
