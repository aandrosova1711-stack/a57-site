'use client';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ClipboardList, Calendar, Users, LogOut, X, PlusCircle, CheckCircle, Clock, AlertCircle, Upload, Paperclip } from 'lucide-react';

const STATUS_MAP: Record<string,{label:string,color:string}> = {
  sent: { label:'Отправлено', color:'bg-blue-100 text-blue-700' },
  in_progress: { label:'В работе', color:'bg-amber-100 text-amber-700' },
  done: { label:'Выполнено', color:'bg-green-100 text-green-700' },
};
const PRIORITY_COLOR: Record<string,string> = { normal:'bg-gray-100 text-gray-600', urgent:'bg-orange-100 text-orange-700', emergency:'bg-red-100 text-red-700' };
const PRIORITY_MAP: Record<string,string> = { normal:'Обычный', urgent:'Срочный', emergency:'Аварийный' };

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState<'requests'|'regulations'|'clients'>('requests');
  const [requests, setRequests] = useState<any[]>([]);
  const [regulations, setRegulations] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showNewReg, setShowNewReg] = useState(false);
  const [showNewReq, setShowNewReq] = useState(false);
  const [newReg, setNewReg] = useState({ userId:'', date:'', type:'Электрика', engineer:'', conclusions:'' });
  const [newReq, setNewReq] = useState({ targetUserId:'', type:'Электрика', description:'', priority:'normal' });
  const [filterStatus, setFilterStatus] = useState('all');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me').then(r=>r.json()).then(d=>{
      if (!d.user || d.user.role !== 'admin') { router.push('/login'); return; }
      setUser(d.user);
    });
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [rReqs, rRegs, rClients] = await Promise.all([
      fetch('/api/requests').then(r=>r.json()),
      fetch('/api/regulations').then(r=>r.json()),
      fetch('/api/users').then(r=>r.json()),
    ]);
    setRequests(rReqs.requests || []);
    setRegulations(rRegs.regulations || []);
    setClients(rClients.users || []);
    setLoading(false);
  }, []);

  useEffect(() => { if (user) loadData(); }, [user]);

  const handleLogout = async () => { await fetch('/api/auth/logout',{method:'POST'}); router.push('/'); };

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/requests/${id}`, {
      method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({status}),
    });
    if (res.ok) {
      toast.success('Статус обновлён');
      const updated = await res.json();
      setRequests(prev=>prev.map(r=>r._id===id?updated.request:r));
      if (selectedRequest?._id===id) setSelectedRequest(updated.request);
    }
  };

  const updateField = async (id: string, field: string, value: string) => {
    const res = await fetch(`/api/requests/${id}`, {
      method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({[field]:value}),
    });
    if (res.ok) {
      const updated = await res.json();
      setRequests(prev=>prev.map(r=>r._id===id?updated.request:r));
      if (selectedRequest?._id===id) setSelectedRequest(updated.request);
    }
  };

  const uploadFileToRequest = async (file: File, requestId: string) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('context', `requests/${requestId}`);
    const res = await fetch('/api/upload', {method:'POST',body:fd});
    const data = await res.json();
    if (res.ok) {
      await fetch(`/api/requests/${requestId}`, {
        method:'PATCH', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({addFile:{url:data.url,originalName:data.originalName,mimeType:data.mimeType}}),
      });
      toast.success('Файл добавлен'); loadData();
    }
    setUploading(false);
  };

  const submitRegulation = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/regulations', {
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(newReg),
    });
    if (res.ok) {
      toast.success('Регламент добавлен'); setShowNewReg(false);
      setNewReg({userId:'',date:'',type:'Электрика',engineer:'',conclusions:''}); loadData();
    } else { const d=await res.json(); toast.error(d.error); }
  };

  const submitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/requests', {
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(newReq),
    });
    if (res.ok) { toast.success('Заявка создана'); setShowNewReq(false); loadData(); }
    else { const d=await res.json(); toast.error(d.error); }
  };

  const filtered = filterStatus==='all' ? requests : requests.filter(r=>r.status===filterStatus);
  const stats = { total:requests.length, in_progress:requests.filter(r=>r.status==='in_progress').length, done:requests.filter(r=>r.status==='done').length };

  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-[#1B3A2F] text-white flex flex-col z-40 hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <div className="text-xl font-bold" style={{fontFamily:'Manrope,sans-serif'}}>А-57</div>
          <div className="text-white/60 text-xs mt-1">Панель администратора</div>
        </div>
        <div className="p-4 flex-1">
          {[
            {key:'requests' as const,label:'Все заявки',icon:<ClipboardList size={18}/>,count:requests.length},
            {key:'regulations' as const,label:'Регламенты',icon:<Calendar size={18}/>,count:regulations.length},
            {key:'clients' as const,label:'Клиенты',icon:<Users size={18}/>,count:clients.length},
          ].map(item=>(
            <button key={item.key} onClick={()=>setTab(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 ${tab===item.key?'bg-white/15 text-white':'text-white/70 hover:text-white hover:bg-white/10'}`}>
              {item.icon} <span className="flex-1 text-left">{item.label}</span>
              <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">{item.count}</span>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="px-2 mb-3 text-xs text-white/60">{user?.firstName} · Администратор</div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 text-sm">
            <LogOut size={16}/> Выйти
          </button>
        </div>
      </div>

      <div className="md:ml-64">
        {/* HEADER */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="font-semibold text-[#1B3A2F]">
            {tab==='requests'?'Управление заявками':tab==='regulations'?'Регламентные работы':'Клиенты'}
          </div>
          <div className="flex gap-2">
            {tab==='requests' && (
              <button onClick={()=>setShowNewReq(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B3A2F] text-white text-sm font-semibold rounded-xl hover:bg-[#2D6E5E]">
                <PlusCircle size={16}/> Новая заявка
              </button>
            )}
            {tab==='regulations' && (
              <button onClick={()=>setShowNewReg(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B3A2F] text-white text-sm font-semibold rounded-xl hover:bg-[#2D6E5E]">
                <PlusCircle size={16}/> Добавить регламент
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* STATS */}
          {tab==='requests' && (
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                {label:'Всего заявок',value:stats.total,color:'text-[#1B3A2F]'},
                {label:'В работе',value:stats.in_progress,color:'text-amber-600'},
                {label:'Выполнено',value:stats.done,color:'text-green-600'},
              ].map(s=>(
                <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">{s.label}</div>
                  <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* REQUESTS */}
          {tab==='requests' && (
            <div>
              <div className="flex gap-2 mb-4 flex-wrap">
                {[['all','Все'],['sent','Отправлено'],['in_progress','В работе'],['done','Выполнено']].map(([v,l])=>(
                  <button key={v} onClick={()=>setFilterStatus(v)}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${filterStatus===v?'bg-[#1B3A2F] text-white':'bg-white text-gray-600 hover:bg-gray-50'}`}>
                    {l}
                  </button>
                ))}
              </div>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-gray-100 text-xs text-gray-400 uppercase">
                    <th className="p-4 text-left">№</th>
                    <th className="p-4 text-left">Клиент</th>
                    <th className="p-4 text-left">Тип</th>
                    <th className="p-4 text-left">Дата</th>
                    <th className="p-4 text-left">Статус</th>
                    <th className="p-4 text-left">Приоритет</th>
                    <th className="p-4"></th>
                  </tr></thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={7} className="p-8 text-center text-gray-400">Загрузка...</td></tr>
                    ) : filtered.map((req,i)=>(
                      <tr key={req._id} className={`border-b border-gray-50 hover:bg-gray-50/50 ${i%2===0?'':''}`}>
                        <td className="p-4 text-sm font-bold text-gray-400">#{req.number}</td>
                        <td className="p-4 text-sm font-medium text-[#1B3A2F]">{req.clientName}</td>
                        <td className="p-4 text-sm text-gray-600">{req.type}</td>
                        <td className="p-4 text-xs text-gray-400">{new Date(req.createdAt).toLocaleDateString('ru')}</td>
                        <td className="p-4"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_MAP[req.status]?.color}`}>{STATUS_MAP[req.status]?.label}</span></td>
                        <td className="p-4"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PRIORITY_COLOR[req.priority]}`}>{PRIORITY_MAP[req.priority]}</span></td>
                        <td className="p-4"><button onClick={()=>setSelectedRequest(req)} className="text-[#1B3A2F] text-sm font-medium hover:underline">Открыть</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REGULATIONS */}
          {tab==='regulations' && (
            <div className="space-y-3">
              {loading ? [1,2,3].map(i=><div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse"/>) :
              regulations.length===0 ? <div className="text-center py-16 text-gray-400"><Calendar size={48} className="mx-auto mb-4 opacity-30"/><p>Регламентов пока нет</p></div> :
              regulations.map(reg=>(
                <div key={reg._id} className="bg-white rounded-xl p-5 shadow-sm flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">Выполнено</span>
                      <span className="font-semibold text-sm text-[#1B3A2F]">{reg.type}</span>
                    </div>
                    <div className="text-xs text-gray-500">{new Date(reg.date).toLocaleDateString('ru',{day:'numeric',month:'long',year:'numeric'})}</div>
                    {reg.engineer && <div className="text-xs text-gray-400 mt-1">Инженер: {reg.engineer}</div>}
                    <div className="text-xs text-gray-500 mt-2 line-clamp-2">{reg.conclusions}</div>
                  </div>
                  <div className="text-xs text-gray-400 shrink-0 ml-4">{reg.files?.length||0} файлов</div>
                </div>
              ))}
            </div>
          )}

          {/* CLIENTS */}
          {tab==='clients' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead><tr className="border-b border-gray-100 text-xs text-gray-400 uppercase">
                  <th className="p-4 text-left">Имя</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Телефон</th>
                  <th className="p-4 text-left">Организация</th>
                  <th className="p-4 text-left">Адрес</th>
                  <th className="p-4 text-left">Регистрация</th>
                </tr></thead>
                <tbody>
                  {clients.map((c,i)=>(
                    <tr key={c._id} className="border-b border-gray-50">
                      <td className="p-4 text-sm font-medium">{c.firstName} {c.lastName}</td>
                      <td className="p-4 text-sm text-gray-600">{c.email}</td>
                      <td className="p-4 text-sm text-gray-600">{c.phone||'—'}</td>
                      <td className="p-4 text-sm text-gray-600">{c.companyName||'—'}</td>
                      <td className="p-4 text-sm text-gray-600">{c.objectAddress||'—'}</td>
                      <td className="p-4 text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString('ru')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* REQUEST DETAIL MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
              <div>
                <h2 className="font-bold text-[#1B3A2F] text-lg">Заявка #{selectedRequest.number}</h2>
                <div className="text-sm text-gray-500">{selectedRequest.clientName}</div>
              </div>
              <button onClick={()=>setSelectedRequest(null)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Статус</label>
                <select value={selectedRequest.status} onChange={e=>updateStatus(selectedRequest._id, e.target.value)}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B3A2F] bg-white">
                  <option value="sent">Отправлено</option>
                  <option value="in_progress">В работе</option>
                  <option value="done">Выполнено</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Назначить мастера</label>
                <input defaultValue={selectedRequest.assignedTo||''}
                  onBlur={e=>updateField(selectedRequest._id,'assignedTo',e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B3A2F]"
                  placeholder="Имя мастера"/>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-400">Тип:</span> <strong>{selectedRequest.type}</strong></div>
                <div><span className="text-gray-400">Приоритет:</span> <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PRIORITY_COLOR[selectedRequest.priority]}`}>{PRIORITY_MAP[selectedRequest.priority]}</span></div>
                <div><span className="text-gray-400">Дата:</span> <strong>{new Date(selectedRequest.createdAt).toLocaleDateString('ru')}</strong></div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Описание</div>
                <div className="bg-gray-50 rounded-xl p-4 text-sm">{selectedRequest.description}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Внутренние заметки</div>
                <textarea rows={3} defaultValue={selectedRequest.adminNotes||''}
                  onBlur={e=>updateField(selectedRequest._id,'adminNotes',e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F] resize-none"
                  placeholder="Заметки для команды (не видны клиенту)..."/>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Файлы</div>
                {(selectedRequest.files||[]).length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {selectedRequest.files.map((f:any,i:number)=>(
                      f.mimeType?.startsWith('image/') ? (
                        <a key={i} href={f.url} target="_blank">
                          <img src={f.url} alt={f.originalName} className="w-full h-20 object-cover rounded-lg"/>
                          <div className="text-xs text-gray-400 mt-1 truncate">{f.uploadedBy==='admin'?'👨‍🔧 ':''}{f.originalName}</div>
                        </a>
                      ) : (
                        <a key={i} href={f.url} target="_blank" className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100">
                          <Paperclip size={16} className="text-gray-400 mb-1"/>
                          <div className="text-xs text-gray-600 truncate w-full">{f.originalName}</div>
                        </a>
                      )
                    ))}
                  </div>
                )}
                <label className="inline-flex items-center gap-2 text-sm text-[#1B3A2F] font-medium cursor-pointer hover:underline">
                  <Upload size={14}/> {uploading?'Загружаем...':'Добавить фото/документ'}
                  <input type="file" className="hidden" accept="image/*,video/*,.pdf,.doc,.docx"
                    onChange={e=>{ const f=e.target.files?.[0]; if(f) uploadFileToRequest(f, selectedRequest._id); }}/>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW REGULATION MODAL */}
      {showNewReg && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-[#1B3A2F] text-lg">Добавить регламент</h2>
              <button onClick={()=>setShowNewReg(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <form onSubmit={submitRegulation} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Клиент *</label>
                <select required value={newReg.userId} onChange={e=>setNewReg({...newReg,userId:e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F] bg-white">
                  <option value="">Выберите клиента</option>
                  {clients.map(c=><option key={c._id} value={c._id}>{c.firstName} {c.lastName} — {c.companyName||c.email}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Дата проведения *</label>
                <input required type="datetime-local" value={newReg.date} onChange={e=>setNewReg({...newReg,date:e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F]"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Тип регламента</label>
                <select value={newReg.type} onChange={e=>setNewReg({...newReg,type:e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F] bg-white">
                  {['Электрика','Водоснабжение','Вентиляция','Плотницкие работы','Комплексный'].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Инженер/мастер</label>
                <input value={newReg.engineer} onChange={e=>setNewReg({...newReg,engineer:e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F]" placeholder="Имя мастера"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Общие выводы *</label>
                <textarea required rows={5} value={newReg.conclusions} onChange={e=>setNewReg({...newReg,conclusions:e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F] resize-none"
                  placeholder="Опишите выполненные работы и состояние систем..."/>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={()=>setShowNewReg(false)} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50">Отмена</button>
                <button type="submit" className="flex-1 py-3 bg-[#1B3A2F] text-white rounded-xl text-sm font-semibold hover:bg-[#2D6E5E]">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW REQUEST (ADMIN) MODAL */}
      {showNewReq && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-[#1B3A2F] text-lg">Создать заявку</h2>
              <button onClick={()=>setShowNewReq(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <form onSubmit={submitRequest} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Клиент</label>
                <select value={newReq.targetUserId} onChange={e=>setNewReq({...newReq,targetUserId:e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F] bg-white">
                  <option value="">Без привязки к клиенту</option>
                  {clients.map(c=><option key={c._id} value={c._id}>{c.firstName} {c.lastName}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Тип работы</label>
                <select value={newReq.type} onChange={e=>setNewReq({...newReq,type:e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F] bg-white">
                  {['Электрика','Водоснабжение','Вентиляция','Плотницкие работы','Аварийная','Другое'].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Описание *</label>
                <textarea required rows={4} value={newReq.description} onChange={e=>setNewReq({...newReq,description:e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F] resize-none" placeholder="Описание работ..."/>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={()=>setShowNewReq(false)} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium">Отмена</button>
                <button type="submit" className="flex-1 py-3 bg-[#1B3A2F] text-white rounded-xl text-sm font-semibold hover:bg-[#2D6E5E]">Создать</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
