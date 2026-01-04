
import React, { useState } from 'react';
import { Patient, HistoryEntry } from '../types';

interface MedicalRecordsProps {
  patients: Patient[];
  onUpdate: (patient: Patient) => void;
  onAdd: (patient: Patient) => void;
}

const MedicalRecords: React.FC<MedicalRecordsProps> = ({ patients, onUpdate, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newEvolution, setNewEvolution] = useState({ type: 'CONSULTA' as HistoryEntry['type'], content: '' });
  
  const [newPatientForm, setNewPatientForm] = useState<Partial<Patient>>({
    name: '', email: '', phone: '', birthDate: '', notes: ''
  });

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const patient: Patient = {
      ...newPatientForm as Patient,
      id: Date.now().toString(),
      history: []
    };
    onAdd(patient);
    setIsAdding(false);
    setSelectedPatient(patient);
    setNewPatientForm({ name: '', email: '', phone: '', birthDate: '', notes: '' });
  };

  const handleAddEvolution = () => {
    if (!selectedPatient || !newEvolution.content.trim()) return;

    const entry: HistoryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      type: newEvolution.type,
      content: newEvolution.content
    };

    const updatedPatient = {
      ...selectedPatient,
      history: [entry, ...selectedPatient.history]
    };

    onUpdate(updatedPatient);
    setSelectedPatient(updatedPatient);
    setNewEvolution({ type: 'CONSULTA', content: '' });
  };

  const handleUpdatePatientField = (field: keyof Patient, value: string) => {
    if (!selectedPatient) return;
    const updated = { ...selectedPatient, [field]: value };
    onUpdate(updated);
    setSelectedPatient(updated);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      {/* Sidebar de Prontuários */}
      <div className={`w-full md:w-80 flex flex-col gap-4 sidebar-records ${selectedPatient || isAdding ? 'hidden md:flex' : 'flex'}`}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input 
              type="text"
              placeholder="Buscar prontuário..."
              className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-slate-900 shadow-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <svg className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button 
            onClick={() => { setIsAdding(true); setSelectedPatient(null); }}
            className="bg-slate-900 text-white p-3 rounded-2xl shadow-lg hover:scale-105 transition-transform no-print"
            title="Novo Paciente"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredPatients.map(p => (
            <button
              key={p.id}
              onClick={() => { setSelectedPatient(p); setIsAdding(false); }}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                selectedPatient?.id === p.id 
                ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${selectedPatient?.id === p.id ? 'bg-white/10' : 'bg-slate-100'}`}>
                  {p.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate">{p.name}</p>
                  <p className={`text-[10px] ${selectedPatient?.id === p.id ? 'text-slate-400' : 'text-slate-400'}`}>
                    ID: #{p.id.slice(-4)} • {p.history[0]?.date || 'Sem histórico'}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Área Principal (Formulário ou Prontuário) */}
      <div className="flex-1 h-full min-h-0 main-content-area">
        {isAdding ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 h-full overflow-y-auto animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b bg-slate-50 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-slate-900">Novo Prontuário</h3>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Admissão de Paciente</p>
              </div>
              <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors no-print">
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleAddPatient} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Nome Completo</label>
                  <input 
                    type="text" required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-slate-900"
                    placeholder="Nome do paciente"
                    value={newPatientForm.name}
                    onChange={e => setNewPatientForm({...newPatientForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Data de Nascimento</label>
                  <input 
                    type="date"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-slate-900"
                    value={newPatientForm.birthDate}
                    onChange={e => setNewPatientForm({...newPatientForm, birthDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Telefone / WhatsApp</label>
                  <input 
                    type="text" required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-slate-900"
                    placeholder="(00) 00000-0000"
                    value={newPatientForm.phone}
                    onChange={e => setNewPatientForm({...newPatientForm, phone: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">E-mail</label>
                  <input 
                    type="email"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-slate-900"
                    placeholder="exemplo@email.com"
                    value={newPatientForm.email}
                    onChange={e => setNewPatientForm({...newPatientForm, email: e.target.value})}
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-slate-200 hover:scale-[1.01] transition-all no-print"
              >
                Criar e Abrir Prontuário
              </button>
            </form>
          </div>
        ) : selectedPatient ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300 overflow-hidden medical-record-container">
            {/* Cabeçalho do Prontuário */}
            <div className="p-6 border-b flex items-center justify-between bg-slate-900 text-white medical-record-header">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedPatient(null)} className="md:hidden p-2 bg-white/10 rounded-lg no-print">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl font-black">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black">{selectedPatient.name}</h3>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">ID Médico: #{selectedPatient.id.slice(-6)}</p>
                </div>
              </div>
              <button 
                onClick={handlePrint}
                className="md:flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white border border-indigo-400 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-900/20 no-print"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Exportar Prontuário (PDF)
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="print-only-header text-center py-6">
                <h1 className="text-2xl font-black text-slate-900">Alpha Wolves - Relatório Clínico</h1>
                <p className="text-sm text-slate-500 uppercase tracking-widest">Documento Gerado em {new Date().toLocaleDateString('pt-BR')}</p>
              </div>

              {/* Seção de Informações Cadastrais Editáveis */}
              <div className="p-6 bg-slate-50 border-b border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Dados do Paciente
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Telefone</label>
                    <input 
                      className="w-full text-xs font-bold text-slate-700 bg-transparent border-none p-0 focus:ring-0"
                      value={selectedPatient.phone}
                      onChange={e => handleUpdatePatientField('phone', e.target.value)}
                    />
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Data de Nasc.</label>
                    <input 
                      type="date"
                      className="w-full text-xs font-bold text-slate-700 bg-transparent border-none p-0 focus:ring-0"
                      value={selectedPatient.birthDate}
                      onChange={e => handleUpdatePatientField('birthDate', e.target.value)}
                    />
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">E-mail</label>
                    <input 
                      className="w-full text-xs font-bold text-slate-700 bg-transparent border-none p-0 focus:ring-0"
                      value={selectedPatient.email}
                      onChange={e => handleUpdatePatientField('email', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Notas Clínicas */}
                <section className="space-y-4">
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-4 bg-indigo-500 rounded-full"></span>
                    Anamnese e Observações Gerais
                  </h4>
                  <textarea 
                    className="w-full h-32 bg-indigo-50/20 border border-indigo-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 resize-none transition-all"
                    placeholder="Histórico, Alergias, Medicações Contínuas..."
                    value={selectedPatient.notes}
                    onChange={(e) => handleUpdatePatientField('notes', e.target.value)}
                  />
                </section>

                {/* Histórico de Evolução */}
                <section className="space-y-6">
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-4 bg-emerald-500 rounded-full"></span>
                    Linha do Tempo de Evolução
                  </h4>

                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4 evolution-form no-print">
                    <div className="flex flex-wrap gap-2">
                      {(['CONSULTA', 'EXAME', 'PROCEDIMENTO', 'OBSERVAÇÃO'] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => setNewEvolution({...newEvolution, type})}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                            newEvolution.type === type ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <textarea 
                      className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-slate-900 h-32 resize-none"
                      placeholder="Descreva a evolução do atendimento..."
                      value={newEvolution.content}
                      onChange={(e) => setNewEvolution({...newEvolution, content: e.target.value})}
                    />
                    <button 
                      onClick={handleAddEvolution}
                      className="w-full bg-emerald-500 text-white py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 shadow-lg shadow-emerald-50"
                    >
                      Salvar Registro de Evolução
                    </button>
                  </div>

                  <div className="relative pl-6 border-l-2 border-slate-100 space-y-6">
                    {selectedPatient.history.length > 0 ? (
                      selectedPatient.history.map((entry) => (
                        <div key={entry.id} className="relative group">
                          <div className="absolute -left-[31px] top-2 w-3 h-3 rounded-full bg-slate-200 border-2 border-white group-hover:bg-indigo-500 transition-colors"></div>
                          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all history-entry-card">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[9px] font-black px-2.5 py-1 rounded-lg bg-slate-900 text-white uppercase tracking-widest">
                                {entry.type}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400">
                                {new Date(entry.date).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {entry.content}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Inicie o histórico deste paciente</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-200">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">Selecione ou Crie um Prontuário</h3>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">
              Gerencie a vida clínica de seus pacientes com total segurança e organização. Clique no botão "+" para admitir um novo paciente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
