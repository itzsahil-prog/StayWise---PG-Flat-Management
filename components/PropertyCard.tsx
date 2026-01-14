
import React from 'react';
import { Property } from '../types';
import { MapPin, Users, Wifi, Star } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onClick: (p: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <div 
      onClick={() => onClick(property)}
      className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-xl text-[10px] font-black text-slate-800 shadow-xl uppercase tracking-widest">
            {property.type}
          </span>
          <span className={`px-4 py-1.5 backdrop-blur-md rounded-xl text-[10px] font-black shadow-xl uppercase tracking-widest ${
            property.gender === 'Female' ? 'bg-pink-500/90 text-white' : 
            property.gender === 'Male' ? 'bg-blue-500/90 text-white' : 'bg-slate-800/90 text-white'
          }`}>
            {property.gender}
          </span>
        </div>
        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
           <p className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
             <MapPin size={12} /> View Location
           </p>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-black text-xl text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">{property.title}</h3>
          <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-black shadow-lg shadow-yellow-200/50">
            <Star size={12} fill="currentColor" />
            {property.rating}
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-sm mb-6 font-bold">
          <MapPin size={14} className="text-indigo-500" />
          {property.location}, {property.city}
        </div>

        <div className="flex items-center justify-between mb-8 mt-auto">
          <div className="flex flex-col">
             <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Starting at</span>
             <p className="text-2xl font-black text-slate-800">
               ₹{property.rent.toLocaleString()}<span className="text-slate-400 text-xs font-bold">/mo</span>
             </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                   <Users size={12} />
                </div>
              ))}
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{property.availability} Left</span>
          </div>
        </div>

        <button className="w-full py-5 bg-slate-50 text-slate-500 font-black rounded-3xl group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-indigo-100 transition-all uppercase tracking-widest text-xs">
          Explore Room Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
