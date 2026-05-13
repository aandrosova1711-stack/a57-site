'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', password:'', password2:'', phone:'', companyName:'', objectAddress:'', consent: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) { toast.error('Необходимо дать согласие на обработку персональных данных'); return; }
    if (form.password !== form.password2) { toast.error('Пароли не совпадают'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const d = await res.json();
      if (res.ok) { toast.success('Аккаунт создан!'); router.push('/cabinet'); }
      else { toast.error(d.error); }
    } catch { toast.error('Ошибка сети'); }
    setLoading(false);
  };

  const F = (label: string, key: keyof typeof form, props: any = {}) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2F]" {...props}/>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7FC] px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <a href="/" className="text-3xl font-bold text-[#1B3A2F]" style={{fontFamily:'Manrope,sans-serif'}}>А-57</a>
          <p className="text-gray-500 mt-2 text-sm">Создать личный кабинет</p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-[#1B3A2F] mb-6" style={{fontFamily:'Manrope,sans-serif'}}>Регистрация</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {F('Имя *','firstName',{required:true,placeholder:'Иван'})}
              {F('Фамилия *','lastName',{required:true,placeholder:'Иванов'})}
            </div>
            {F('Email *','email',{required:true,type:'email',placeholder:'email@example.com'})}
            {F('Телефон','phone',{type:'tel',placeholder:'+7 (___) ___-__-__'})}
            {F('Название организации','companyName',{placeholder:'Кафе "Уют"'})}
            {F('Адрес объекта','objectAddress',{placeholder:'СПб, ул. Примерная, д. 1'})}
            <div className="grid sm:grid-cols-2 gap-4">
              {F('Пароль *','password',{required:true,type:'password',placeholder:'Минимум 8 символов'})}
              {F('Подтвердить пароль *','password2',{required:true,type:'password',placeholder:'Повторите пароль'})}
            </div>
            <div className="flex gap-2.5 items-start">
              <input type="checkbox" id="consent" checked={form.consent} onChange={e=>setForm({...form, consent: e.target.checked})}
                className="mt-0.5 accent-[#1B3A2F] flex-shrink-0" />
              <label htmlFor="consent" className="text-xs text-gray-500 leading-relaxed">
                Я даю <a href="/consent" target="_blank" className="text-[#2D6E5E] underline">согласие на обработку персональных данных</a> в соответствии с <a href="/privacy" target="_blank" className="text-[#2D6E5E] underline">Политикой обработки персональных данных</a>
              </label>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-[#1B3A2F] text-white font-semibold rounded-xl hover:bg-[#2D6E5E] transition-colors disabled:opacity-60">
              {loading ? 'Создаём аккаунт...' : 'Создать аккаунт'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            Уже есть аккаунт? <a href="/login" className="text-[#1B3A2F] font-semibold hover:underline">Войти</a>
          </div>
        </div>
      </div>
    </div>
  );
}
