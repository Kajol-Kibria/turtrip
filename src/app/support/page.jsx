'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, ShieldAlert, LifeBuoy, ChevronRight, Send, Plus, Search, Filter, AlertCircle, CheckCircle2, Clock, Image as ImageIcon, X, Maximize } from 'lucide-react';
import { MOCK_TICKETS, MOCK_MESSAGES } from '@/mockData';
import StatusModal from '@/components/StatusModal';
import { useRouter } from 'next/navigation';

export default function Support() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [statusConfig, setStatusConfig] = useState({
    type: 'success',
    title: '',
    message: ''
  });

  const selectedTicket = MOCK_TICKETS.find(t => t.id === selectedTicketId);

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

  const handleSubmitTicket = () => {
    setShowNewTicketModal(false);
    setStatusConfig({
      type: 'success',
      title: 'Request Submitted!',
      message: 'Your support ticket has been successfully created. Our team will review your submission and get back to you via the notification center and your dashboard within 24 hours.'
    });
    setShowStatusModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-brand-warm/30 pt-32 pb-20 px-6"
    >
      <StatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        type={statusConfig.type}
        title={statusConfig.title}
        message={statusConfig.message}
        actionLabel="View All Tickets"
        onAction={() => setActiveTab('tickets')}
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="font-serif text-5xl mb-4 text-brand-earth">Support Center</h1>
            <p className="text-brand-earth/60">Manage your inquiries, disputes, and live support chats.</p>
          </div>

          <div className="flex bg-white p-1.5 rounded-full shadow-lg border border-brand-earth/5">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all flex items-center ${activeTab === 'tickets' ? 'bg-brand-earth text-white shadow-md' : 'text-brand-earth/40 hover:text-brand-earth'}`}
            >
              <LifeBuoy className="w-4 h-4 mr-2" /> My Tickets
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all flex items-center ${activeTab === 'chat' ? 'bg-brand-earth text-white shadow-md' : 'text-brand-earth/40 hover:text-brand-earth'}`}
            >
              <MessageSquare className="w-4 h-4 mr-2" /> Live Support
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main List Area */}
          <div className="lg:col-span-8">
            {activeTab === 'tickets' ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-earth/20 w-4 h-4" />
                    <input type="text" placeholder="Search tickets..." className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-brand-earth/5 outline-none text-sm shadow-sm" />
                  </div>
                  <button
                    onClick={() => setShowNewTicketModal(true)}
                    className="ml-4 bg-brand-teal text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center shadow-lg hover:scale-105 transition-all"
                  >
                    <Plus className="w-4 h-4 mr-2" /> New Ticket
                  </button>
                </div>

                <div className="space-y-3">
                  {MOCK_TICKETS.map(ticket => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className={`p-6 rounded-[32px] bg-white border border-brand-earth/5 shadow-sm cursor-pointer hover:shadow-md transition-all group ${selectedTicketId === ticket.id ? 'ring-2 ring-brand-earth' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-xl ${ticket.isDispute ? 'bg-brand-coral/10 text-brand-coral' : 'bg-brand-teal/10 text-brand-teal'}`}>
                            {ticket.isDispute ? <ShieldAlert className="w-5 h-5" /> : <LifeBuoy className="w-5 h-5" />}
                          </div>
                          <div>
                            <h3 className="font-bold text-brand-earth group-hover:text-brand-teal transition-colors">{ticket.subject}</h3>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-brand-earth/30">ID: {ticket.id} • {ticket.category}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                            ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700'
                          }`}>
                          {ticket.status}
                        </div>
                      </div>
                      <p className="text-sm text-brand-earth/60 line-clamp-1 mb-4">{ticket.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-brand-earth/5">
                        <span className="text-[10px] text-brand-earth/40 font-bold">Updated {ticket.updatedAt}</span>
                        <ChevronRight className="w-4 h-4 text-brand-earth/20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-[48px] h-[600px] flex flex-col overflow-hidden shadow-2xl border border-brand-earth/5 bg-white">
                <div className="p-6 border-b border-brand-earth/5 bg-brand-warm/30 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-teal rounded-full flex items-center justify-center text-white font-bold italic">A</div>
                    <div>
                      <h3 className="font-bold text-sm">Manjaro Support Agent</h3>
                      <p className="text-[10px] text-brand-teal font-bold animate-pulse uppercase tracking-widest">Always Online</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-[#F8FAFF] no-scrollbar">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-4 rounded-3xl text-sm ${msg.isMe ? 'bg-brand-earth text-white rounded-br-none' : 'bg-white text-brand-earth border border-brand-earth/5 rounded-bl-none shadow-sm'}`}>
                        {msg.image && (
                          <div
                            onClick={() =>
                              router.push(
                                `/media-viewer?src=${encodeURIComponent(msg.image)}&sender=${encodeURIComponent(msg.isMe ? 'You' : 'Manjaro Support')}&timestamp=${encodeURIComponent(msg.timestamp)}`
                              )
                            }
                            className="cursor-pointer hover:opacity-90 transition-opacity group relative"
                          >
                            <img src={msg.image} alt="shared" className="rounded-xl mb-2 max-w-full h-auto shadow-md" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl flex items-center justify-center">
                              <Maximize className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        )}
                        {msg.text && <p>{msg.text}</p>}
                        <p className={`text-[9px] mt-1 opacity-40 ${msg.isMe ? 'text-right' : 'text-left'}`}>{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-white border-t border-brand-earth/5">
                  <AnimatePresence>
                    {selectedImage && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mb-4 relative w-20 h-20"
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
                  <div className="flex items-center space-x-4 bg-brand-warm rounded-2xl p-2 pl-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-brand-earth/40 hover:text-brand-teal transition-colors"
                    >
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <input type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent border-none outline-none text-sm font-medium" />
                    <button onClick={handleSend}
                      disabled={!inputText.trim() && !selectedImage}
                      className="bg-brand-earth text-white p-4 rounded-xl shadow-lg hover:scale-105 transition-all">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-4">
            {selectedTicket ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-[40px] p-8 border border-brand-earth/5 sticky top-32">
                <h2 className="font-serif text-2xl mb-6">{selectedTicket.subject}</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-4 h-4 text-brand-teal mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-brand-earth/40 tracking-widest mb-1">Status</p>
                      <p className="text-sm font-bold">{selectedTicket.status}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase font-bold text-brand-earth/40 tracking-widest mb-2">Description</p>
                    <p className="text-sm text-brand-earth/70 leading-relaxed bg-brand-warm/50 p-4 rounded-2xl">{selectedTicket.description}</p>
                  </div>

                  {selectedTicket.isDispute && (
                    <div className="p-4 bg-brand-coral/5 border border-brand-coral/10 rounded-2xl">
                      <div className="flex items-center space-x-2 text-brand-coral mb-2">
                        <ShieldAlert className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Active Dispute</span>
                      </div>
                      <p className="text-[10px] text-brand-earth/60">A Manjaro investigator is manually reviewing this transaction.</p>
                    </div>
                  )}

                  <div className="pt-6 border-t border-brand-earth/10">
                    <button className="w-full py-4 rounded-full border-2 border-brand-earth/10 font-bold text-sm hover:border-brand-earth transition-all">
                      Add Observation
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="glass-card rounded-[40px] p-12 border border-brand-earth/5 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-20 h-20 bg-brand-warm rounded-full flex items-center justify-center text-brand-earth/20 mb-6">
                  <Clock className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl mb-2">Ticket Details</h3>
                <p className="text-sm text-brand-earth/40">Select a ticket from the list to view history and updates.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      <AnimatePresence>
        {showNewTicketModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-brand-earth/60 backdrop-blur-sm" onClick={() => setShowNewTicketModal(false)} />
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative w-full max-w-lg bg-white rounded-[40px] p-8 md:p-12 shadow-2xl">
              <h2 className="font-serif text-3xl mb-8">Raise an Issue</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">Issue Category</label>
                  <select className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none bg-white">
                    <option>Booking Issue</option>
                    <option>Payment Dispute</option>
                    <option>Driver Conduct</option>
                    <option>App Technical Problem</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">Subject</label>
                  <input type="text" className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none" placeholder="Brief summary of the problem" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-earth/40 mb-2">Detailed Description</label>
                  <textarea className="w-full p-4 rounded-xl border border-brand-earth/10 outline-none h-32" placeholder="Tell us exactly what happened..."></textarea>
                </div>

                <div className="flex gap-4 pt-6">
                  <button onClick={() => setShowNewTicketModal(false)} className="flex-1 py-4 font-bold text-brand-earth/40 hover:text-brand-earth transition-all">Cancel</button>
                  <button onClick={handleSubmitTicket} className="flex-[2] bg-brand-earth text-white py-4 rounded-full font-bold shadow-xl">Submit Ticket</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}