
import React, { useState } from 'react';
import { Mail, Lock, User, Github, ArrowRight, ShieldCheck, Zap, Phone, UserPlus, Home, FileText, Camera, CheckCircle, Info, ChevronLeft, Briefcase } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

type OnboardingStep = 'ROLE' | 'BASIC' | 'IDENTITY' | 'OWNER_DETAILS' | 'AGREEMENT';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<OnboardingStep>('ROLE');
  const [role, setRole] = useState<UserRole>(UserRole.RENTER);
  const [loading, setLoading] = useState(false);
  const [agreedToCommission, setAgreedToCommission] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    age: '',
    aadhar: '',
    pan: '',
    license: '',
    family: '',
    propLocation: '',
    propName: ''
  });

  const handleNext = () => {
    if (step === 'ROLE') setStep('BASIC');
    else if (step === 'BASIC') setStep('IDENTITY');
    else if (step === 'IDENTITY') {
      if (role === UserRole.OWNER) setStep('OWNER_DETAILS');
      else onLogin(role);
    }
    else if (step === 'OWNER_DETAILS') setStep('AGREEMENT');
  };

  const handleBack = () => {
    if (step === 'BASIC') setStep('ROLE');
    else if (step === 'IDENTITY') setStep('BASIC');
    else if (step === 'OWNER_DETAILS') setStep('IDENTITY');
    else if (step === 'AGREEMENT') setStep('OWNER_DETAILS');
  };

  const finalizeOnboarding = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(role);
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 'ROLE':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-white text-center mb-8">Select Your Persona</h2>
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => { setRole(UserRole.RENTER); handleNext(); }}
                className="group relative bg-slate-800/50 hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/50 p-8 rounded-[2rem] text-left transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <UserPlus size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">Renter</h3>
                    <p className="text-slate-400 text-sm">Find your next home with ease</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => { setRole(UserRole.OWNER); handleNext(); }}
                className="group relative bg-slate-800/50 hover:bg-emerald-600/20 border border-white/5 hover:border-emerald-500/50 p-8 rounded-[2rem] text-left transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <Home size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">Owner / Manager</h3>
                    <p className="text-slate-400 text-sm">Manage properties and tenants</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        );

      case 'BASIC':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-black text-white mb-6">Create Account</h2>
            <div className="relative group">
              <User className="absolute left-5 top-5 text-slate-500 group-focus-within:text-indigo-400" size={20} />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="relative group">
              <Mail className="absolute left-5 top-5 text-slate-500 group-focus-within:text-indigo-400" size={20} />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="relative group">
              <Phone className="absolute left-5 top-5 text-slate-500 group-focus-within:text-indigo-400" size={20} />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-5 top-5 text-slate-500 group-focus-within:text-indigo-400" size={20} />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>
        );

      case 'IDENTITY':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="text-indigo-400" size={24} />
              <h2 className="text-2xl font-black text-white">Identity Verification</h2>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Identification Proofs (Optional)</p>
            <div className="grid grid-cols-1 gap-3">
              <input 
                type="text" 
                placeholder="Aadhar Number" 
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-5 px-6 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                value={formData.aadhar}
                onChange={e => setFormData({...formData, aadhar: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="PAN Number" 
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-5 px-6 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                value={formData.pan}
                onChange={e => setFormData({...formData, pan: e.target.value})}
              />
              {role === UserRole.OWNER && (
                <input 
                  type="text" 
                  placeholder="Driving License Number" 
                  className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-5 px-6 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                  value={formData.license}
                  onChange={e => setFormData({...formData, license: e.target.value})}
                />
              )}
            </div>
          </div>
        );

      case 'OWNER_DETAILS':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500 overflow-y-auto max-h-[60vh] pr-2 no-scrollbar">
            <h2 className="text-2xl font-black text-white mb-6">Professional Details</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-4">Owner Age</label>
                <input 
                  type="number" 
                  placeholder="e.g. 45" 
                  className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-5 px-6 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                  value={formData.age}
                  onChange={e => setFormData({...formData, age: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-4">About Family</label>
                <textarea 
                  placeholder="Tell us a bit about your family background..." 
                  className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-5 px-6 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm min-h-[100px]"
                  value={formData.family}
                  onChange={e => setFormData({...formData, family: e.target.value})}
                />
              </div>

              <div className="h-px bg-white/5 my-4"></div>

              <h3 className="text-lg font-bold text-white mb-2">Property First Listing</h3>
              <input 
                type="text" 
                placeholder="PG or Flat Name" 
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-5 px-6 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                value={formData.propName}
                onChange={e => setFormData({...formData, propName: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Exact Location (Area, City)" 
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-5 px-6 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                value={formData.propLocation}
                onChange={e => setFormData({...formData, propLocation: e.target.value})}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/50 transition-all">
                  <Camera className="text-slate-500 mb-2" size={24} />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Property Images</span>
                </div>
                <div className="bg-slate-800/50 border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/50 transition-all">
                  <FileText className="text-slate-500 mb-2" size={24} />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Stamp Paper</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'AGREEMENT':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Briefcase size={40} />
            </div>
            <h2 className="text-2xl font-black text-white text-center">Revenue Agreement</h2>
            <div className="bg-slate-800/50 p-8 rounded-[2.5rem] border border-white/5 space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed">
                By joining StayWise as a Partner Owner, you acknowledge and agree to our standard service commission:
              </p>
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-emerald-400 font-black uppercase tracking-widest">Platform Fee</p>
                  <p className="text-3xl font-black text-white">10.0%</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 font-bold">Of monthly collected rent</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">This fee covers platform maintenance, marketing of your property, automated payment processing, and 24/7 premium support for your tenants.</p>
            </div>
            <label className="flex items-center gap-4 group cursor-pointer">
              <div 
                onClick={() => setAgreedToCommission(!agreedToCommission)}
                className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${agreedToCommission ? 'bg-indigo-600 border-indigo-600' : 'bg-slate-800 border-white/10'}`}
              >
                {agreedToCommission && <CheckCircle size={14} className="text-white" />}
              </div>
              <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">I accept the 10% rent commission agreement.</span>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[150px] rounded-full"></div>

      <div className="w-full max-w-xl bg-slate-900/50 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-10 md:p-14 shadow-2xl relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <Zap size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tighter leading-none">StayWise</h1>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Identity Engine</p>
            </div>
          </div>
          {step !== 'ROLE' && (
            <button onClick={handleBack} className="text-slate-500 hover:text-white transition-colors">
              <ChevronLeft size={24} />
            </button>
          )}
        </div>

        {renderStep()}

        <div className="mt-10 space-y-6">
          {step !== 'ROLE' && (
            <button 
              onClick={step === 'AGREEMENT' ? finalizeOnboarding : handleNext}
              disabled={loading || (step === 'AGREEMENT' && !agreedToCommission)}
              className="w-full bg-white text-slate-950 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 group disabled:opacity-30"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
              ) : (
                <>
                  {step === 'AGREEMENT' ? 'Initialize Partnership' : 'Continue Verification'}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          )}

          {step === 'ROLE' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 w-full">
                <div className="h-px bg-white/10 flex-1"></div>
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Social Integration</span>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>
              
              <button 
                onClick={() => onLogin(UserRole.RENTER)}
                className="w-full bg-slate-800 hover:bg-slate-700 py-5 rounded-[2rem] border border-white/5 flex items-center justify-center gap-4 transition-all"
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-slate-900 font-black text-xs">G</div>
                <span className="text-white text-[10px] font-black uppercase tracking-widest">Sign in with Google</span>
              </button>
            </div>
          )}

          <div className="text-center">
             <button className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">
               Already have an account? Sign In
             </button>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-indigo-400/20">
           <ShieldCheck size={14} />
           <span className="text-[9px] font-black uppercase tracking-[0.2em]">AES-256 Cloud Encryption Protocol</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
