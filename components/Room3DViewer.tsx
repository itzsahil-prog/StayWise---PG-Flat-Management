
import React, { useState } from 'react';
import { Room } from '../types';
import { Info, CheckCircle2, XCircle } from 'lucide-react';

interface Room3DViewerProps {
  rooms: Room[];
  onSelect: (room: Room) => void;
  selectedRoom: Room | null;
}

const Room3DViewer: React.FC<Room3DViewerProps> = ({ rooms, onSelect, selectedRoom }) => {
  return (
    <div className="w-full bg-slate-900 rounded-[2.5rem] p-8 overflow-hidden relative border border-white/10">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h3 className="text-white text-xl font-black">Interactive Floor Plan</h3>
          <p className="text-slate-400 text-sm">Select a room to see layout details</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
            <span className="text-xs text-slate-300 font-bold">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
            <span className="text-xs text-slate-300 font-bold">Occupied</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* 3D Isometric View */}
        <div className="relative w-full max-w-[400px] h-[300px] perspective-[1000px] flex items-center justify-center">
          <div 
            className="relative w-64 h-64 transition-transform duration-1000"
            style={{ 
              transform: 'rotateX(55deg) rotateZ(-45deg)', 
              transformStyle: 'preserve-3d' 
            }}
          >
            {rooms.map((room, idx) => {
              const isSelected = selectedRoom?.id === room.id;
              const x = (idx % 2) * 120;
              const y = Math.floor(idx / 2) * 120;

              return (
                <div
                  key={room.id}
                  onClick={() => room.isAvailable && onSelect(room)}
                  className={`absolute w-28 h-28 border-2 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-1 shadow-2xl ${
                    room.isAvailable 
                    ? isSelected ? 'bg-indigo-600 border-white z-10 scale-110' : 'bg-slate-800/80 border-indigo-500/30 hover:bg-indigo-500/40' 
                    : 'bg-slate-900 border-slate-700 opacity-50 cursor-not-allowed'
                  }`}
                  style={{ 
                    transform: `translate3d(${x}px, ${y}px, ${isSelected ? '30px' : '0px'})`,
                    boxShadow: isSelected ? '0 30px 60px -12px rgba(99, 102, 241, 0.5)' : 'none'
                  }}
                >
                  <span className={`text-[8px] font-black uppercase tracking-widest ${isSelected ? 'text-white' : 'text-slate-500'}`}>Room {idx + 1}</span>
                  {room.isAvailable ? (
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white text-indigo-600' : 'bg-indigo-500/20 text-indigo-400'}`}>
                      <Info size={14} />
                    </div>
                  ) : (
                    <XCircle size={14} className="text-slate-600" />
                  )}
                  {isSelected && (
                     <div className="absolute -top-1 -right-1">
                        <CheckCircle2 size={16} className="text-white fill-indigo-600" />
                     </div>
                  )}
                </div>
              );
            })}
            {/* Floor Base */}
            <div 
              className="absolute -inset-4 bg-slate-800/20 border border-white/5 -z-10 rounded-xl"
              style={{ transform: 'translate3d(0, 0, -5px)' }}
            ></div>
          </div>
        </div>

        {/* Room Details Panel */}
        <div className="flex-1 w-full bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 animate-in slide-in-from-right-4">
          {selectedRoom ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-2xl font-black text-white">{selectedRoom.name}</h4>
                  <p className="text-indigo-400 font-bold text-sm uppercase tracking-widest">{selectedRoom.type} Occupancy</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-white">₹{(selectedRoom.priceExtra > 0 ? '+' : '') + selectedRoom.priceExtra}</p>
                  <p className="text-[10px] text-slate-500 font-black uppercase">Addon Price</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                   <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Dimensions</p>
                   <p className="text-white font-bold">{selectedRoom.dimensions}</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                   <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Privacy</p>
                   <p className="text-white font-bold">High</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-slate-500 font-black uppercase mb-3 tracking-widest">Key Features</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRoom.features.map(f => (
                    <span key={f} className="px-3 py-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg text-xs font-bold">{f}</span>
                  ))}
                </div>
              </div>

              <button className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5">
                Confirm Selection
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center text-slate-500">
                <Info size={32} />
              </div>
              <div>
                <p className="text-white font-bold">No Room Selected</p>
                <p className="text-slate-500 text-sm max-w-[200px]">Click on a floor tile to explore room specific details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room3DViewer;
