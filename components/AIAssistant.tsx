
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, X, Zap } from 'lucide-react';
import { getSmartRecommendations } from '../services/gemini';
import { MOCK_PROPERTIES } from '../mockData';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: 'Hi! I am StayWise AI. Looking for a modern PG or a spacious flat? Describe your needs (e.g., "Budget PG in Indiranagar with AC") and I will instantly scan our listings for you!'}
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    try {
      const botResponse = await getSmartRecommendations(userText, MOCK_PROPERTIES);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having a bit of trouble connecting to the property database. Try checking our filters instead!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 md:bottom-12 md:right-12 w-16 h-16 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white rounded-3xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <Zap size={28} className="group-hover:animate-pulse" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-28 md:right-12 md:w-[400px] md:h-[600px] bg-white md:rounded-[3rem] shadow-2xl flex flex-col z-50 overflow-hidden border border-indigo-100 animate-in slide-in-from-bottom-10 duration-500">
          <div className="p-8 bg-indigo-600 text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot size={24} />
              </div>
              <div>
                <span className="font-black text-lg block leading-none">StayWise AI</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Property Expert</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-300"></span>
                  </div>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Searching...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.02)]">
            <div className="flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Find a flat in HSR Layout..."
                className="flex-1 px-6 py-4 bg-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400 transition-all"
                disabled={isTyping}
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100"
              >
                <Send size={22} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
