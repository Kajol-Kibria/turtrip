'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, ArrowLeft, MoreVertical, Phone, Video, Image as ImageIcon, X, Maximize } from 'lucide-react';
import { MOCK_MESSAGES, MOCK_SPECIALISTS } from '../../mockData';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Messages() {
  const router = useRouter();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const guide = MOCK_SPECIALISTS[0];

  const handleSend = () => {
    if (!inputText.trim() && !selectedImage) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: 'u1',
      text: inputText,
      image: selectedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setMessages([...messages, newMessage]);
    setInputText('');
    setSelectedImage(null);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col bg-white border-x border-brand-earth/10 shadow-2xl"
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
            <p className="text-[10px] uppercase font-bold tracking-widest text-brand-teal">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-brand-earth/5 rounded-full text-brand-earth/60"><Phone className="w-4 h-4" /></button>
          <button className="p-2 hover:bg-brand-earth/5 rounded-full text-brand-earth/60"><Video className="w-4 h-4" /></button>
          <button className="p-2 hover:bg-brand-earth/5 rounded-full text-brand-earth/60"><MoreVertical className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFF]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${msg.isMe ? 'bg-brand-earth text-white rounded-tr-none' : 'bg-white text-brand-earth rounded-tl-none'}`}>
              {msg.image && (
                <div 
                  onClick={() => router.push(`/media-viewer?src=${encodeURIComponent(msg.image)}&sender=${encodeURIComponent(msg.isMe ? 'You' : guide.name)}&timestamp=${encodeURIComponent(msg.timestamp)}`)}
                  className="cursor-pointer hover:opacity-90 transition-opacity group relative"
                >
                  <img src={msg.image} alt="shared" className="rounded-xl mb-2 max-w-full h-auto shadow-md" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl flex items-center justify-center">
                    <Maximize className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                  </div>
                </div>
              )}
              {msg.text && <p className="text-sm">{msg.text}</p>}
              <p className={`text-[9px] mt-1 text-right opacity-50 ${msg.isMe ? 'text-white' : 'text-brand-earth'}`}>{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-brand-earth/10 bg-white">
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-4 relative w-24 h-24"
            >
              <img src={selectedImage} className="w-full h-full object-cover rounded-2xl shadow-lg border-2 border-brand-teal" alt="preview" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-brand-coral text-white p-1 rounded-full shadow-md"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center space-x-2 md:space-x-4 bg-brand-warm/30 p-1.5 md:p-2 rounded-2xl">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 md:p-3 text-brand-earth/40 hover:text-brand-teal transition-colors shrink-0"
          >
            <ImageIcon className="w-5 h-5 md:w-5 md:h-5" />
          </button>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..." 
            className="flex-1 bg-transparent border-none outline-none px-2 md:px-4 py-2 text-sm placeholder:text-xs md:placeholder:text-sm min-w-0"
          />
          <button 
            onClick={handleSend}
            className="p-2.5 md:p-3 bg-brand-earth text-white rounded-xl shadow-lg hover:bg-brand-earth/90 transition-all disabled:opacity-20 shrink-0"
            disabled={!inputText.trim() && !selectedImage}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}