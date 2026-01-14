
import React, { useState, useEffect, useMemo } from 'react';
import { UserRole, Property, Booking, Payment, MaintenanceRequest, PropertyType, Room } from './types';
import { currentUser, MOCK_PROPERTIES } from './mockData';
import Navbar from './components/Navbar';
import PropertyCard from './components/PropertyCard';
import AIAssistant from './components/AIAssistant';
import Login from './components/Login';
import Room3DViewer from './components/Room3DViewer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Search, MapPin, Filter, Calendar, CreditCard, Wrench, 
  CheckCircle, Clock, AlertCircle, Plus, ChevronRight, 
  LayoutDashboard, Settings, UserCircle, Briefcase, 
  Users, ShieldCheck, X, Star, MessageSquare, Bell,
  Home, IndianRupee, Map, Layers
} from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.RENTER);
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyFilter, setPropertyFilter] = useState<PropertyType | 'All'>('All');
  const [show3D, setShow3D] = useState(false);
  
  const [renterBookings] = useState<Booking[]>([
    {
      id: 'b_1',
      propertyId: 'p_1',
      propertyName: 'Luxury Zen PG',
      renterId: 'user_1',
      status: 'CONFIRMED',
      checkInDate: '2024-10-01',
      amount: 15000,
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=400'
    }
  ]);

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = propertyFilter === 'All' || p.type === propertyFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, propertyFilter]);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setActiveTab(newRole === UserRole.RENTER ? 'explore' : 'dashboard');
  };

  const handleLogin = (userRole: UserRole) => {
    setRole(userRole);
    setIsLoggedIn(true);
    setActiveTab(userRole === UserRole.RENTER ? 'explore' : 'dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderRenterExplore = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="relative h-[50vh] md:h-[65vh] rounded-[4rem] overflow-hidden shadow-2xl border-b border-white/10">
        <img 
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover brightness-50" 
          alt="Banner" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-8">
          <div className="bg-indigo-600/30 backdrop-blur-xl px-6 py-2 rounded-full border border-indigo-400/30 text-indigo-100 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
            Premium Living Experiences
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] drop-shadow-2xl">
            Live The <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Wise Way.</span>
          </h1>
          <p className="text-slate-200 text-lg md:text-2xl max-w-3xl font-medium opacity-90">
            Curated selection of India's most modern PGs & shared apartments. Verified, automated, and smart.
          </p>
          <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md p-3 rounded-[2.5rem] shadow-2xl flex items-center gap-3 group focus-within:ring-8 focus-within:ring-indigo-500/10 transition-all">
            <div className="flex-1 flex items-center gap-4 px-6">
              <Search className="text-indigo-600" size={28} />
              <input 
                type="text" 
                placeholder="Where should we take you? (e.g. Koramangala)"
                className="w-full py-5 outline-none text-slate-800 bg-transparent text-xl font-bold placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="hidden md:flex items-center gap-2 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-[2rem] hover:bg-indigo-600 hover:scale-[1.02] transition-all shadow-xl shadow-slate-900/10">
              Locate Now
            </button>
          </div>
        </div>
      </div>

      <section className="px-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Featured Collection</span>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">StayWise Picks</h2>
          </div>
          <div className="flex bg-slate-100 p-2 rounded-3xl w-fit">
            {(['All', 'PG', 'Flat'] as const).map(type => (
              <button 
                key={type} 
                onClick={() => setPropertyFilter(type)}
                className={`px-10 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  propertyFilter === type 
                  ? 'bg-white text-slate-900 shadow-xl' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pb-24">
            {filteredProperties.map(p => (
              <PropertyCard key={p.id} property={p} onClick={setSelectedProperty} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center space-y-6">
            <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center mx-auto text-slate-300">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Zero matches found</h3>
            <p className="text-slate-400 font-bold">Refine your location or try a different property type.</p>
          </div>
        )}
      </section>
    </div>
  );

  const renderDashboard = () => {
    if (role === UserRole.RENTER) {
      return (
        <div className="space-y-10 pb-20 animate-in fade-in duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-10">
            <div>
              <div className="flex items-center gap-3 text-indigo-600 font-black mb-2">
                <LayoutDashboard size={20} />
                <span className="text-[10px] uppercase tracking-[0.3em]">Resident Portal v2.0</span>
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter">My Active Living</h1>
              <p className="text-slate-400 text-lg font-medium">Currently at {renterBookings[0].propertyName}</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-indigo-600 transition-all">
                Submit Payment
              </button>
              <button className="flex-1 md:flex-none bg-white text-slate-900 border border-slate-200 px-8 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all">
                Get Support
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col gap-6 group hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle size={32} />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Status Matrix</p>
                <p className="text-3xl font-black text-slate-900 tracking-tight">Fully Paid</p>
                <p className="text-sm text-slate-500 mt-2 font-medium">No arrears for Oct '24</p>
              </div>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col gap-6 group hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar size={32} />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Timeline</p>
                <p className="text-3xl font-black text-slate-900 tracking-tight">Nov 5th</p>
                <p className="text-sm text-indigo-600 font-black mt-2">Next Renewal Due</p>
              </div>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col gap-6 group hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock size={32} />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Maintenance</p>
                <p className="text-3xl font-black text-slate-900 tracking-tight">0 Pending</p>
                <p className="text-sm text-slate-500 mt-2 font-medium">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (role === UserRole.OWNER) {
      return (
        <div className="space-y-10 pb-20 animate-in fade-in duration-500">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-10">
            <div>
              <div className="flex items-center gap-3 text-emerald-600 font-black mb-2">
                <Briefcase size={20} />
                <span className="text-[10px] uppercase tracking-[0.3em]">Owner Partner Terminal</span>
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Property Portfolio</h1>
              <p className="text-slate-400 text-lg font-medium">Welcome back, verified partner.</p>
            </div>
            <button className="bg-emerald-600 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-emerald-700 transition-all">
              Add New Listing
            </button>
          </div>
          <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm text-center space-y-4">
             <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto">
                <CheckCircle size={40} />
             </div>
             <h2 className="text-3xl font-black text-slate-900">Portfolio Initialized</h2>
             <p className="text-slate-500 max-w-lg mx-auto">Your first property is being reviewed by our compliance team. You'll receive a notification once it's live on the StayWise network.</p>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderPropertyDetail = () => {
    if (!selectedProperty) return null;
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-end md:items-center justify-center p-0 md:p-6">
        <div className="bg-white w-full max-w-7xl h-[95vh] md:h-auto md:max-h-[92vh] md:rounded-[4rem] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in slide-in-from-bottom-20 zoom-in-95 duration-700">
          
          {/* Visual Side */}
          <div className="w-full md:w-[55%] h-[40vh] md:h-auto relative bg-slate-900">
             {!show3D ? (
                <img src={selectedProperty.images[0]} className="w-full h-full object-cover transition-all duration-700" />
             ) : (
                <div className="w-full h-full flex items-center justify-center p-12">
                   <Room3DViewer 
                    rooms={selectedProperty.rooms || []} 
                    onSelect={setSelectedRoom}
                    selectedRoom={selectedRoom}
                   />
                </div>
             )}
             
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
             
             <div className="absolute top-10 left-10 flex gap-4">
                <button 
                  onClick={() => setSelectedProperty(null)}
                  className="w-14 h-14 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all"
                >
                  <X size={28} />
                </button>
             </div>

             <div className="absolute top-10 right-10">
                <button 
                  onClick={() => setShow3D(!show3D)}
                  className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all ${
                    show3D ? 'bg-indigo-600 text-white' : 'bg-white/10 backdrop-blur-xl text-white border border-white/20'
                  }`}
                >
                  {show3D ? <Home size={16} /> : <Layers size={16} />}
                  {show3D ? 'Photo View' : '3D Room Selector'}
                </button>
             </div>

             <div className="absolute bottom-12 left-12 text-white max-w-lg">
                <div className="flex gap-2 mb-4">
                   <span className="px-5 py-2 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Premium Verify</span>
                   <span className="px-5 py-2 bg-white/20 backdrop-blur-xl rounded-xl text-[10px] font-black uppercase tracking-widest">{selectedProperty.type}</span>
                </div>
                <h2 className="text-6xl font-black tracking-tighter leading-none mb-4">{selectedProperty.title}</h2>
                <p className="text-lg font-medium opacity-80 flex items-center gap-2">
                   <MapPin size={20} className="text-indigo-400" />
                   {selectedProperty.location}, {selectedProperty.city}
                </p>
             </div>
          </div>
          
          {/* Detail Side */}
          <div className="flex-1 p-12 md:p-16 overflow-y-auto no-scrollbar flex flex-col bg-white">
            <div className="flex justify-between items-end mb-12 border-b border-slate-50 pb-12">
               <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Monthly Subscription</p>
                  <div className="flex items-end gap-2">
                     <p className="text-6xl font-black text-slate-900 tracking-tight leading-none">₹{selectedProperty.rent.toLocaleString()}</p>
                     <span className="text-slate-400 font-bold mb-1">/mo</span>
                  </div>
               </div>
               <div className="text-right">
                  <div className="flex items-center gap-1.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < Math.floor(selectedProperty.rating) ? "#fbbf24" : "none"} className={i < Math.floor(selectedProperty.rating) ? "text-yellow-400" : "text-slate-200"} />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Global Rating: {selectedProperty.rating}/5.0</p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-12">
               <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                  <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">Property Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.amenities.map(a => (
                      <span key={a} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700">{a}</span>
                    ))}
                  </div>
               </div>
               <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                  <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">Stay Rules</h4>
                  <div className="space-y-3">
                    {selectedProperty.rules.map(r => (
                      <div key={r} className="flex items-center gap-2 text-slate-600 font-medium text-xs">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                        {r}
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            <div className="mb-12">
               <h4 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Space Philosophy</h4>
               <p className="text-slate-500 text-xl font-medium leading-relaxed">{selectedProperty.description}</p>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-6 pt-12 border-t border-slate-50">
               <button className="py-7 bg-slate-100 text-slate-900 font-black rounded-3xl uppercase tracking-widest text-xs hover:bg-slate-200 transition-all">
                 Schedule Tour
               </button>
               <button className="py-7 bg-slate-900 text-white font-black rounded-3xl uppercase tracking-widest text-xs shadow-2xl shadow-slate-900/10 hover:bg-indigo-600 transition-all">
                 {selectedRoom ? `Book ${selectedRoom.name}` : 'Initialize Booking'}
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-inter antialiased overflow-x-hidden">
      <Navbar 
        user={currentUser} 
        onRoleChange={handleRoleChange} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <main className="flex-1 w-full max-w-[90rem] mx-auto px-8 pt-6 md:pt-32 pb-36 md:pb-16">
        {activeTab === 'explore' && renderRenterExplore()}
        {activeTab === 'dashboard' && renderDashboard()}
        
        {activeTab === 'messages' && (
          <div className="h-[75vh] flex items-center justify-center bg-white rounded-[4rem] border border-slate-100 shadow-sm flex-col space-y-10 p-16 animate-in zoom-in duration-700">
             <div className="w-40 h-40 bg-indigo-50 text-indigo-600 rounded-[3rem] flex items-center justify-center shadow-inner">
                <MessageSquare size={64} />
             </div>
             <div className="text-center max-w-xl">
               <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-none">Smart Messenger</h2>
               <p className="text-slate-400 text-xl font-medium">Encrypted P2P connection with property owners. Real-time updates on visits and payments.</p>
             </div>
             <button className="px-14 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-slate-900/20 hover:scale-105 transition-all">
               Initialize Communication
             </button>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right-10 duration-700 pb-20">
             <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-10">
               <h1 className="text-6xl font-black text-slate-900 tracking-tighter">System Log</h1>
               <button className="text-[10px] font-black uppercase tracking-widest bg-white px-8 py-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-all">Clear All</button>
             </div>
             {[
               { title: 'Payment Confirmed', body: 'Rental subscription for Oct successful.', icon: <CheckCircle className="text-emerald-500" /> },
               { title: 'New Amenity Added', body: 'Zen PG now features rooftop gym access.', icon: <Plus className="text-indigo-500" /> },
               { title: 'Verification Completed', body: 'Your identity documents were approved by Admin.', icon: <ShieldCheck className="text-blue-500" /> }
             ].map((n, i) => (
               <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 flex gap-8 items-start hover:border-indigo-100 transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-white transition-all shadow-sm">
                     {n.icon}
                  </div>
                  <div>
                     <h3 className="text-2xl font-black text-slate-900 mb-2">{n.title}</h3>
                     <p className="text-slate-400 text-lg font-medium">{n.body}</p>
                  </div>
               </div>
             ))}
          </div>
        )}
      </main>

      <AIAssistant />
      {renderPropertyDetail()}

      {/* Mode Status */}
      <div className="fixed top-32 right-12 z-[50] hidden md:block">
        <div className="px-6 py-3 bg-white/80 backdrop-blur-2xl border border-white rounded-full shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-10 duration-1000">
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Environment</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{role} NODE</span>
        </div>
      </div>
    </div>
  );
};

export default App;
