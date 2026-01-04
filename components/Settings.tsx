
import React, { useState, useRef } from 'react';
import { AppSettings } from '../types';

interface SettingsProps {
  settings: AppSettings;
  onUpdate: (s: AppSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onUpdate }) => {
  const [temp, setTemp] = useState(settings);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(temp);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTemp({ ...temp, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b bg-slate-900 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Configurações Alpha</h3>
            <p className="text-sm text-slate-400">Personalize a identidade do seu consultório.</p>
          </div>
          <div className="text-right">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">v2.0 Stable</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Profile Header Edit */}
          <div className="flex flex-col items-center gap-4 pb-4 border-b border-slate-50">
            <div className="relative group">
              <img 
                src={temp.profileImage} 
                className="w-24 h-24 rounded-3xl object-cover shadow-xl border-4 border-white group-hover:opacity-75 transition-opacity cursor-pointer" 
                alt="Avatar Preview"
                onClick={() => fileInputRef.current?.click()}
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="bg-slate-900/60 backdrop-blur-sm text-white p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
              </button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-slate-800">{temp.doctorName || 'Profissional'}</h4>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">{temp.professionalRole || 'Administrador'}</p>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-indigo-500 font-bold mt-2 hover:underline"
              >
                Trocar Foto de Perfil
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Nome do Consultório</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                  value={temp.clinicName}
                  onChange={e => setTemp({...temp, clinicName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Seu Nome (Ex: Dr. Silva)</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                  value={temp.doctorName}
                  onChange={e => setTemp({...temp, doctorName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Cargo ou Função</label>
                <input 
                  type="text" 
                  placeholder="Administrador, Médica Titular, etc."
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                  value={temp.professionalRole}
                  onChange={e => setTemp({...temp, professionalRole: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2">Canais de Atendimento</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">WhatsApp Business</label>
                  <input 
                    type="text" 
                    placeholder="5511999999999"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                    value={temp.whatsapp}
                    onChange={e => setTemp({...temp, whatsapp: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Instagram (sem @)</label>
                  <input 
                    type="text" 
                    placeholder="alphawolves"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                    value={temp.instagram}
                    onChange={e => setTemp({...temp, instagram: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg text-sm uppercase tracking-widest ${
                saved ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-slate-900 text-white shadow-slate-200 hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {saved ? '✓ Configurações Aplicadas!' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
