
import React from 'react';
import { View, AppSettings } from '../types';
import { ICONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
  settings: AppSettings;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange, settings }) => {
  const navItems = [
    { id: View.DASHBOARD, label: 'Início', desktopLabel: 'Dashboard', icon: ICONS.Dashboard },
    { id: View.PATIENTS, label: 'Pacientes', desktopLabel: 'Pacientes', icon: ICONS.Patients },
    { id: View.PRONTUARIOS, label: 'Clínica', desktopLabel: 'Prontuários', icon: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { id: View.AGENDA, label: 'Agenda', desktopLabel: 'Agenda', icon: ICONS.Agenda },
    { id: View.FINANCES, label: 'Grana', desktopLabel: 'Financeiro', icon: ICONS.Finances },
    { id: View.SECRETARY, label: 'Rubia IA', desktopLabel: 'Secretária IA', icon: ICONS.Secretary },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 alpha-gradient text-white flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-slate-900 font-bold text-xl">α</span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight truncate w-32">{settings.clinicName}</h1>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Consultório</p>
          </div>
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id
                  ? 'bg-white/10 text-white font-medium shadow-inner'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon("w-5 h-5")}
              {item.desktopLabel}
            </button>
          ))}
          
          <div className="pt-8 pb-2 px-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Canais & Config</p>
          </div>
          <div className="px-2 space-y-1">
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" className="flex items-center gap-3 px-4 py-2 text-xs text-slate-400 hover:text-emerald-400 hover:bg-white/5 rounded-lg transition-all">
              {ICONS.WhatsApp("w-4 h-4")} WhatsApp
            </a>
            <a href={`https://instagram.com/${settings.instagram}`} target="_blank" className="flex items-center gap-3 px-4 py-2 text-xs text-slate-400 hover:text-pink-400 hover:bg-white/5 rounded-lg transition-all">
              {ICONS.Instagram("w-4 h-4")} Instagram
            </a>
            <button onClick={() => onViewChange(View.SETTINGS)} className={`w-full flex items-center gap-3 px-4 py-2 text-xs rounded-lg transition-all ${currentView === View.SETTINGS ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
              Configurações
            </button>
          </div>

          <div className="mt-8 px-4 py-4 bg-white/5 rounded-2xl mx-2 border border-white/5">
            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-2">Alpha Ecosystem</p>
            <p className="text-[10px] text-slate-400 leading-relaxed mb-1">
              Desenvolvido por <span className="text-white font-medium">Karony Rubia Custodio dos anjos & Alpha Wolves</span>
            </p>
            <p className="text-[10px] text-slate-500 mb-3">Versão 2.0</p>
            <div className="pt-2 border-t border-white/5 flex flex-col gap-1">
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">Suporte Técnico</span>
              <a href="tel:18991362185" className="text-[10px] text-cyan-400 font-bold hover:underline">18 99136-2185</a>
            </div>
          </div>
        </nav>

        <div className="p-6 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <img src={settings.profileImage} className="rounded-full w-8 h-8 object-cover border border-white/10" alt="Perfil" />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{settings.doctorName}</p>
              <p className="text-xs text-slate-400 truncate">{settings.professionalRole}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative pb-16 md:pb-0">
        <header className="flex md:hidden h-16 bg-white border-b px-4 items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 alpha-gradient rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">α</span>
            </div>
            <h1 className="font-bold text-slate-800 tracking-tight truncate w-32">{settings.clinicName}</h1>
          </div>
          <button onClick={() => onViewChange(View.SETTINGS)} className="flex items-center gap-2">
            <div className="text-right hidden xs:block">
              <p className="text-[10px] font-bold text-slate-900 leading-none">{settings.doctorName}</p>
              <p className="text-[8px] text-slate-400 uppercase tracking-tighter">{settings.professionalRole}</p>
            </div>
            <img src={settings.profileImage} className="rounded-full w-8 h-8 border border-slate-200 object-cover" alt="User" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          
          {/* Main Content Footer for mobile and general visibility */}
          <footer className="mt-12 py-8 border-t border-slate-200 flex flex-col items-center text-center gap-2 no-print">
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Alpha Wolves Ecosystem</p>
            <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed">
              Desenvolvido por <span className="text-slate-900 font-bold">Karony Rubia Custodio dos anjos & Alpha Wolves</span>
            </p>
            <p className="text-[10px] text-slate-400 font-bold">Versão 2.0</p>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">Suporte Técnico</span>
              <a href="tel:18991362185" className="text-sm text-indigo-600 font-black hover:underline transition-all">18 99136-2185</a>
            </div>
          </footer>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-around px-2 z-50">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                currentView === item.id ? 'text-slate-900' : 'text-slate-400'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${currentView === item.id ? 'bg-slate-100' : ''}`}>
                {item.icon("w-6 h-6")}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
