'use client';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { PlusCircle, LogOut, ClipboardList, Calendar, User, X, Upload, Paperclip, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const STATUS_MAP: Record<string,{label:string,color:string,icon:any}> = {
  sent: { label:'Отправлено', color:'bg-blue-100 text-blue-700', icon: <Clock size={12}/> },
  in_progress: { label:'В работе', color:'bg-amber-100 text-amber-700', icon: <AlertCircle size={12}/> },
  done: { label:'Выполнено', color:'bg-green-100 text-green-700', icon: <CheckCircle size={12}/> },
};
const PRIORITY_MAP: Record<string,string> = { normal:'Обычный', urgent:'Срочный', emergency:'Аварийный' };
const PRIORITY_COLOR: Record<string,string> = { normal:'bg-gray-100 text-gray-600', urgent:'bg-orange-100 text-orange-700', emergency:'bg-red-100 text-red-700' };

export default function CabinetPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState<'requests'|'regulations'>('requests');
  const [requests, setRequests] = useState<any[]>([]);
  const [regulations, setRegulations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [selectedReg, setSelectedReg] = useState<any>(null);
  const [newReq, setNewReq] = useState({ type:'Электрика', description:'', priority:'normal' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me').then(r=>r.json()).then(d=>{
      if (!d.user) { router.push('/login'); return; }
      setUser(d.user);
    });
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [rReqs, rRegs] = await Promise.all([
      fetch('/api/requests').then(r=>r.json()),
      fetch('/api/regulations').then(r=>r.json()),
    ]);
    setRequests(rReqs.requests || []);
    setRegulations(rRegs.regulations || []);
    setLoading(false);
  }, []);

  useEffect(() => { if (user) loadData(); }, [user]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method:'POST' });
    router.push('/');
  };

  const submitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/requests', {
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(newReq),
    });
    if (res.ok) {
      toast.success('Заявка создана!');
      setShowNewRequest(false);
      setNewReq({ type:'Электрика', description:'', priority:'normal' });
      loadData();
    } else { const d = await res.json(); toast.error(d.error); }
  };

  const uploadFile = async (file: File, requestId: string) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('context', `requests/${requestId}`);
    const res = await fetch('/api/upload', { method:'POST', body:fd });
    const data = await res.json();
    if (res.ok) {
      await fetch(`/api/requests/${requestId}`, {
        method:'PATCH', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ addFileClient:{ url:data.url, originalName:data.originalName, mimeType:data.mimeType } }),
      });
      toast.success('Файл прикреплён');
      loadData();
    } else { toast.error('Ошибка загрузки'); }
    setUploading(false);
  };

  const byStatus = (s: string) => requests.filter(r=>r.status===s);

  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-[#1B3A2F] text-white flex flex-col z-40 hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <div className="text-xl font-bold" style={{fontFamily:'Manrope,sans-serif'}}>А-57</div>
          <div className="text-white/60 text-xs mt-1">Личный кабинет</div>
        </div>
        <div className="p-4 flex-1">
          <div className="mb-6">
            <div className="text-white/40 text-xs uppercase tracking-widest mb-3 px-2">Меню</div>
            {[
              { key:'requests' as const, label:'Мои заявки', icon:<ClipboardList size={18}/> },
              { key:'regulations' as const, label:'Регламенты', icon:<Calendar size={18}/> },
            ].map(item=>(
              <button key={item.key} onClick={()=>setTab(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 ${tab===item.key?'bg-white/15 text-white':'text-white/70 hover:text-white hover:bg-white/10'}`}>
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <div className="text-sm font-medium">{user?.firstName} {user?.lastName}</div>
              <div className="text-white/50 text-xs">{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 text-sm transition-all">
            <LogOut size={16}/> Выйти
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex">
          {[
            { key:'requests' as const, label:'Заявки', icon:<ClipboardList size={20}/> },
            { key:'regulations' as const, label:'Регламенты', icon:<Calendar size={20}/> },
          ].map(item=>(
            <button key={item.key} onClick={()=>setTab(item.key)}
              className={`flex-1 flex flex-col items-center py-3 gap-1 text-xs font-medium ${tab===item.key?'text-[#1B3A2F]':'text-gray-400'}`}>
              {item.icon} {item.label}
            </button>
          ))}
          <button onClick={handleLogout} className="flex-1 flex flex-col items-center py-3 gap-1 text-xs font-medium text-gray-400">
            <LogOut size={20}/> Выйти
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="md:ml-64 pb-20 md:pb-0">
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="font-semibold text-[#1B3A2F]">Добро пожаловать, {user?.firstName}!</div>
            <div className="text-sm text-gray-500">Личный кабинет клиента</div>
          </div>
          {tab === 'requests' && (
            <button onClick={()=>setShowNewRequest(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B3A2F] text-white text-sm font-semibold rounded-xl hover:bg-[#2D6E5E] transition-colors">
              <PlusCircle size={16}/> Новая заявка
            </button>
          )}
        </div>

        <div className="p-6">
          {/* REQUESTS TAB */}
          {tab === 'requests' && (
            <div>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[{s:'sent',label:'Отправлено'},{s:'in_progress',label:'В работе'},{s:'done',label:'Выполнено'}].map(col=>(
                  <div key={col.s}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_MAP[col.s].color}`}>{col.label}</span>
                      <span className="text-gray-400 text-sm">({byStatus(col.s).length})</span>
                    </div>
                    <div className="space-y-3">
                      {loading ? (
                        [1,2].map(i=><div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse"/>)
                      ) : byStatus(col.s).length === 0 ? (
                        <div className="bg-white rounded-xl p-4 text-center text-sm text-gray-400 border border-dashed border-gray-200">Нет заявок</div>
                      ) : byStatus(col.s).map(req=>(
                        <div key={req._id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 cursor-pointer hover:shadow-md transition-shadow" onClick={()=>setSelectedRequest(req)}>
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-xs font-bold text-gray-400">#{req.number}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PRIORITY_COLOR[req.priority]}`}>{PRIORITY_MAP[req.priority]}</span>
                          </div>
                          <div className="font-semibold text-sm text-[#1B3A2F] mb-1">{req.type}</div>
                          <div className="text-xs text-gray-500 line-clamp-2">{req.description}</div>
                          <div className="text-xs text-gray-400 mt-2">{new Date(req.createdAt).toLocaleDateString('ru')}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REGULATIONS TAB */}
          {tab === 'regulations' && (
            <div>
              <h2 className="text-lg font-bold text-[#1B3A2F] mb-4">Регламентные работы</h2>
              {loading ? (
                <div className="space-y-3">{[1,2,3].map(i=><div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse"/>)}</div>
              ) : regulations.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <Calendar size={48} className="mx-auto mb-4 opacity-30"/>
                  <p>Регламентных работ пока нет</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {regulations.map(reg=>(
                    <div key={reg._id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-50 cursor-pointer hover:shadow-md transition-shadow" onClick={()=>setSelectedReg(reg)}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">Выполнено</span>
                            <span className="font-semibold text-sm text-[#1B3A2F]">{reg.type}</span>
                          </div>
                          <div className="text-xs text-gray-500">{new Date(reg.date).toLocaleDateString('ru',{day:'numeric',month:'long',year:'numeric'})}</div>
                          {reg.engineer && <div className="text-xs text-gray-400 mt-1">Инженер: {reg.engineer}</div>}
                        </div>
                        <div className="text-xs text-[#1B3A2F] font-medium">{reg.files?.length||0} файлов</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* NEW REQUEST MODAL */}
      {showNewRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-[#1B3A2F] text-lg">Новая заявка</h2>
              <button onClick={()=>setShowNewRequest(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <form onSubmit={submitRequest} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Тип работы</label>
                <select value={newReq.type} onChange={e=>setNewReq({...newReq,type:e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F] bg-white">
                  {['Электрика','Водоснабжение','Вентиляция','Плотницкие работы','Аварийная','Другое'].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Приоритет</label>
                <select value={newReq.priority} onChange={e=>setNewReq({...newReq,priority:e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F] bg-white">
                  <option value="normal">Обычный</option>
                  <option value="urgent">Срочный</option>
                  <option value="emergency">Аварийный</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Описание *</label>
                <textarea required rows={4} value={newReq.description} onChange={e=>setNewReq({...newReq,description:e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F] resize-none"
                  placeholder="Опишите проблему подробно..."/>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={()=>setShowNewRequest(false)}
                  className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50">
                  Отмена
                </button>
                <button type="submit" className="flex-1 py-3 bg-[#1B3A2F] text-white rounded-xl text-sm font-semibold hover:bg-[#2D6E5E]">
                  Создать заявку
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REQUEST DETAIL MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
              <div>
                <h2 className="font-bold text-[#1B3A2F] text-lg">Заявка #{selectedRequest.number}</h2>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_MAP[selectedRequest.status]?.color}`}>
                  {STATUS_MAP[selectedRequest.status]?.label}
                </span>
              </div>
              <button onClick={()=>setSelectedRequest(null)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-400">Тип:</span> <span className="font-medium">{selectedRequest.type}</span></div>
                <div><span className="text-gray-400">Приоритет:</span> <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PRIORITY_COLOR[selectedRequest.priority]}`}>{PRIORITY_MAP[selectedRequest.priority]}</span></div>
                <div><span className="text-gray-400">Создана:</span> <span className="font-medium">{new Date(selectedRequest.createdAt).toLocaleDateString('ru')}</span></div>
                {selectedRequest.assignedTo && <div><span className="text-gray-400">Мастер:</span> <span className="font-medium">{selectedRequest.assignedTo}</span></div>}
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Описание</div>
                <div className="text-sm bg-gray-50 rounded-xl p-4">{selectedRequest.description}</div>
              </div>
              
              {/* Files */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-3">Прикреплённые файлы</div>
                {(selectedRequest.files||[]).length === 0 ? (
                  <div className="text-sm text-gray-400">Нет файлов</div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {(selectedRequest.files||[]).map((f:any,i:number)=>(
                      f.mimeType?.startsWith('image/') ? (
                        <a key={i} href={f.url} target="_blank" className="block">
                          <img src={f.url} alt={f.originalName} className="w-full h-24 object-cover rounded-lg"/>
                          <div className="text-xs text-gray-400 mt-1 truncate">{f.uploadedBy==='admin'?'👨‍🔧 ':''}{f.originalName}</div>
                        </a>
                      ) : (
                        <a key={i} href={f.url} target="_blank" className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100">
                          <Paperclip size={20} className="text-gray-400 mb-1"/>
                          <div className="text-xs text-gray-600 truncate w-full">{f.originalName}</div>
                        </a>
                      )
                    ))}
                  </div>
                )}
                <label className="mt-3 inline-flex items-center gap-2 text-sm text-[#1B3A2F] font-medium cursor-pointer hover:underline">
                  <Upload size={14}/> Прикрепить файл
                  <input type="file" className="hidden" accept="image/*,video/*"
                    onChange={e=>{ const f=e.target.files?.[0]; if(f) uploadFile(f, selectedRequest._id); }}/>
                </label>
              </div>

              {/* Status history */}
              {(selectedRequest.statusHistory||[]).length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-3">История статусов</div>
                  <div className="space-y-2">
                    {selectedRequest.statusHistory.map((h:any,i:number)=>(
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_MAP[h.status]?.color}`}>{STATUS_MAP[h.status]?.label}</span>
                        <span className="text-gray-400">{new Date(h.timestamp).toLocaleDateString('ru',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REGULATION DETAIL MODAL */}
      {selectedReg && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="font-bold text-[#1B3A2F] text-lg">{selectedReg.type}</h2>
              <button onClick={()=>setSelectedReg(null)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><span className="text-gray-400">Дата:</span> <span className="font-medium">{new Date(selectedReg.date).toLocaleDateString('ru',{day:'numeric',month:'long',year:'numeric'})}</span></div>
                {selectedReg.engineer && <div><span className="text-gray-400">Инженер:</span> <span className="font-medium">{selectedReg.engineer}</span></div>}
              </div>
              <div>
                <div className="text-gray-400 mb-2">Общие выводы</div>
                <div className="bg-gray-50 rounded-xl p-4 leading-relaxed whitespace-pre-wrap">{selectedReg.conclusions}</div>
              </div>
              {(selectedReg.files||[]).length > 0 && (
                <div>
                  <div className="text-gray-400 mb-2">Прикреплённые файлы</div>
                  <div className="space-y-2">
                    {selectedReg.files.map((f:any,i:number)=>(
                      <a key={i} href={f.url} target="_blank" download={f.originalName}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100">
                        <Paperclip size={16} className="text-gray-400"/>
                        <span className="text-[#1B3A2F] font-medium">{f.originalName}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
