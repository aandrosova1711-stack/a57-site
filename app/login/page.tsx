'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const d = await res.json();
      if (res.ok) {
        toast.success(`Добро пожаловать, ${d.firstName}!`);
        if (d.role === 'admin') router.push('/admin');
        else router.push('/cabinet');
      } else { toast.error(d.error); }
    } catch { toast.error('Ошибка сети'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7FC] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="text-3xl font-bold text-[#1B3A2F]" style={{fontFamily:'Manrope,sans-serif'}}>А-57</a>
          <p className="text-gray-500 mt-2 text-sm">Эксплуатация — личный кабинет</p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-[#1B3A2F] mb-6" style={{fontFamily:'Manrope,sans-serif'}}>Войти</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F]" placeholder="email@example.com"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
              <input required type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F]" placeholder="••••••••"/>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-[#1B3A2F] text-white font-semibold rounded-xl hover:bg-[#2D6E5E] transition-colors disabled:opacity-60">
              {loading ? 'Входим...' : 'Войти'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            Нет аккаунта?{' '}
            <a href="/register" className="text-[#1B3A2F] font-semibold hover:underline">Зарегистрироваться</a>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-xl text-xs text-gray-400">
            <div className="font-semibold mb-1">Демо-доступ:</div>
            <div>Клиент: demo@client.ru / Client123!</div>
            <div>Админ: admin@a-57.ru / Admin123!</div>
          </div>
        </div>
        <div className="text-center mt-6"><a href="/" className="text-sm text-gray-400 hover:text-gray-600">← На главную</a></div>
      </div>
    </div>
  );
}
