import React, { useState } from 'react';
import { ThemeProps } from '../types';
import { Search, CupSoda, Flower2, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PastelTheme({ senaraiGuru, carian, setCarian, tukarStatus, statistik, kadarBayaran }: ThemeProps) {
  const [paparBelumBayar, setPaparBelumBayar] = useState(false);
  const guruDitapis = senaraiGuru.filter(guru => guru.nama.toLowerCase().includes(carian.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50/50 to-orange-50 font-serif text-slate-800 p-4 md:p-8 selection:bg-rose-200 selection:text-rose-900">
      <div className="max-w-5xl mx-auto">
        
        {/* Soft Header */}
        <div className="text-center py-10 mb-8 relative">
          <Flower2 className="mx-auto w-12 h-12 text-rose-400 mb-4 drop-shadow-sm" strokeWidth={1.5} />
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3 text-rose-950">
            Kutipan Hi-Tea 2026
          </h1>
          <p className="text-rose-700/80 text-lg font-sans flex items-center justify-center gap-2">
            <CupSoda className="w-5 h-5"/>
            Rebung Chef Ismail • 13 Jun 2026 • RM{kadarBayaran}/pax
          </p>
        </div>

        {/* Colorful Minimalist Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 font-sans relative z-10">
          <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 backdrop-blur-sm rounded-3xl p-6 text-center shadow-sm border border-orange-200/50 hover:shadow-md transition-shadow">
            <p className="text-orange-700 text-xs font-bold tracking-widest uppercase mb-2">Terkumpul</p>
            <p className="text-3xl font-bold text-orange-950 text-wrap break-words">RM {statistik.jumlahKutipan}</p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-100/80 to-teal-100/80 backdrop-blur-sm rounded-3xl p-6 text-center shadow-sm border border-teal-200/50 hover:shadow-md transition-shadow">
            <p className="text-teal-700 text-xs font-bold tracking-widest uppercase mb-2 flex items-center justify-center gap-1">Tunai <span className="opacity-70 font-semibold tracking-normal">({statistik.bilTunai})</span></p>
            <p className="text-3xl font-bold text-teal-950 text-wrap break-words">RM {statistik.jumlahTunai}</p>
          </div>

          <div className="bg-gradient-to-br from-sky-100/80 to-blue-100/80 backdrop-blur-sm rounded-3xl p-6 text-center shadow-sm border border-blue-200/50 hover:shadow-md transition-shadow">
            <p className="text-blue-700 text-xs font-bold tracking-widest uppercase mb-2 flex items-center justify-center gap-1">Bank-in <span className="opacity-70 font-semibold tracking-normal">({statistik.bilBankIn})</span></p>
            <p className="text-3xl font-bold text-blue-950 text-wrap break-words">RM {statistik.jumlahBankIn}</p>
          </div>

          <button 
            onClick={() => setPaparBelumBayar(!paparBelumBayar)}
            className={`bg-gradient-to-br from-rose-100/80 to-pink-100/80 backdrop-blur-sm rounded-3xl p-6 text-center shadow-sm border ${paparBelumBayar ? 'border-rose-400 ring-4 ring-rose-200/50 scale-105' : 'border-pink-200/50'} hover:shadow-md transition-all cursor-pointer flex flex-col justify-center items-center group`}
          >
            <p className="text-rose-700 text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-1">
              Belum Bayar 
              {paparBelumBayar ? <ChevronUp className="w-3 h-3 text-rose-500" /> : <ChevronDown className="w-3 h-3 text-rose-500 group-hover:translate-y-0.5 transition-transform" />}
            </p>
            <p className="text-3xl font-bold text-rose-950">{statistik.belumBayar} <span className="text-lg font-medium text-rose-700/60">/ {senaraiGuru.length}</span></p>
          </button>
        </div>

        {/* Senarai Belum Bayar Dashboard */}
        <AnimatePresence>
          {paparBelumBayar && statistik.belumBayar > 0 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-10 font-sans relative z-10 overflow-hidden"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 md:p-6 shadow-md border border-rose-200/60 relative overflow-hidden mt-2">
                <div className="absolute -top-10 -right-10 p-4 opacity-5 pointer-events-none">
                  <Clock className="w-48 h-48 text-rose-900" />
                </div>
                <h2 className="text-rose-900 font-bold text-lg mb-4 flex items-center gap-2 relative z-10">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  Senarai Belum Bayar ({statistik.belumBayar} Guru)
                </h2>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {senaraiGuru.filter(g => g.status === 'Belum Bayar').map(guru => (
                    <span key={guru.id} className="bg-rose-50 px-3 py-1.5 rounded-xl text-xs md:text-sm font-semibold text-rose-800 border border-rose-200 shadow-sm hover:bg-rose-100 hover:border-rose-300 transition-colors cursor-default">
                      {guru.nama}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search */}
        <div className="flex justify-center mb-10 font-sans relative z-10">
          <div className="relative w-full max-w-md shadow-sm rounded-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
            <input 
              type="text" 
              placeholder="Cari guru yang dihormati..." 
              value={carian}
              onChange={(e) => setCarian(e.target.value)}
              className="w-full bg-white/70 backdrop-blur-md border border-white/40 rounded-full py-3.5 pl-12 pr-6 text-slate-700 focus:outline-none focus:ring-4 focus:ring-rose-200/50 transition-all font-medium placeholder:text-rose-300/80"
            />
          </div>
        </div>

        {/* Elegant List */}
        <div className="space-y-3 font-sans relative z-10">
          {guruDitapis.map((guru, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03, ease: "easeOut" }}
              key={guru.id}
              className="bg-white/80 backdrop-blur-md rounded-[1.25rem] p-4 md:p-5 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] border border-white/60 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-rose-200 transition-all hover:bg-white"
            >
              <div className="flex items-start gap-3 w-full md:w-auto">
                <span className="text-rose-300/70 font-serif italic text-lg w-6 shrink-0 mt-0.5">{index + 1}</span>
                <span className="font-semibold text-slate-700 pt-0.5 leading-snug break-words">{guru.nama}</span>
              </div>

              <div className="flex items-center gap-1.5 w-full md:w-auto bg-slate-50/60 p-1.5 rounded-full justify-center md:justify-end border border-slate-100">
                <StatusToggle 
                  active={guru.status === 'Tunai'} 
                  onClick={() => tukarStatus(guru.id, 'Tunai')}
                  activeClass="bg-emerald-400 text-white shadow-md shadow-emerald-200/50"
                  label="Tunai"
                />
                <StatusToggle 
                  active={guru.status === 'Bank-in'} 
                  onClick={() => tukarStatus(guru.id, 'Bank-in')}
                  activeClass="bg-blue-400 text-white shadow-md shadow-blue-200/50"
                  label="Bank-in"
                />
                <StatusToggle 
                  active={guru.status === 'Belum Bayar'} 
                  onClick={() => tukarStatus(guru.id, 'Belum Bayar')}
                  activeClass="bg-rose-400 text-white shadow-md shadow-rose-200/50"
                  label={<Clock className="w-4 h-4 mx-2" />}
                />
              </div>
            </motion.div>
          ))}
          {guruDitapis.length === 0 && (
             <div className="py-20 text-center text-rose-300 font-medium">
               Tiada carian yang menepati.
             </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

function StatusToggle({ active, onClick, activeClass, label }: { active: boolean, onClick: () => void, activeClass: string, label: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center ${
        active 
          ? `${activeClass} scale-100` 
          : 'text-slate-400 hover:bg-slate-100/80 hover:text-slate-600 scale-95 hover:scale-100'
      }`}
    >
      {label}
    </button>
  );
}
