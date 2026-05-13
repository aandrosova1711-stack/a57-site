'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Zap, Droplets, Wind, Hammer, Shield, Clock, FileCheck, CheckCircle, Menu, X, Star, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { year: 'Год 1', revenue: 14.4 },
  { year: 'Год 2', revenue: 26.4 },
  { year: 'Год 3', revenue: 38.4 },
  { year: 'Год 4', revenue: 48 },
  { year: 'Год 5', revenue: 57.6 },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', objectAddress: '',
    objectArea: '', objectType: 'Кафе/ресторан', description: '', consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) { toast.error('Необходимо согласие на обработку данных'); return; }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
        setFormData({ name: '', phone: '', email: '', objectAddress: '', objectArea: '', objectType: 'Кафе/ресторан', description: '', consent: false });
      } else { const d = await res.json(); toast.error(d.error || 'Ошибка'); }
    } catch { toast.error('Ошибка сети'); }
    setSubmitting(false);
  };

  const inp = "width:100%;border:1px solid #e5e7eb;border-radius:12px;padding:12px 16px;font-size:14px;outline:none;box-sizing:border-box;";

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid #f0f0f0', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif' }}>А-57</span>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <a href="#services" style={{ color: '#555', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Услуги</a>
            <a href="#market" style={{ color: '#555', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Рынок</a>
            <a href="#team" style={{ color: '#555', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Команда</a>
            <a href="#contact" style={{ color: '#555', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Контакты</a>
            <a href="#contact" style={{ padding: '8px 16px', border: '1.5px solid #1B3A2F', borderRadius: 10, color: '#1B3A2F', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Заявка</a>
            <a href="/login" style={{ padding: '8px 16px', background: '#1B3A2F', borderRadius: 10, color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Личный кабинет</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0f2318 0%, #1B3A2F 55%, #2D6E5E 100%)', paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ color: '#fff' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: 999, fontSize: 13, marginBottom: 24, color: 'rgba(255,255,255,0.85)' }}>
              ★ Стадия MVP · Красносельский район СПб
            </div>
            <h1 style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '0 0 16px', fontFamily: 'Manrope, sans-serif' }}>
              А-57<br /><span style={{ color: '#6ee7b7' }}>Эксплуатация</span>
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 24, lineHeight: 1.6 }}>
              Комплексное обслуживание инженерных систем и зданий для малого бизнеса
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
              {['Александр', 'a-57service@mail.ru', 'a-57.рф'].map(t => (
                <span key={t} style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', background: '#fff', color: '#1B3A2F', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: 15, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                Оставить заявку →
              </a>
              <a href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', border: '2px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: 12, fontWeight: 600, textDecoration: 'none', fontSize: 15 }}>
                Личный кабинет
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { title: 'Выезд 2–4 часа', text: 'Гарантированное время реакции на аварийные заявки' },
              { title: 'Единая точка', text: 'Один подрядчик для всех инженерных систем' },
              { title: 'Акт и фотоотчёт', text: 'Отчёт «до/после» по каждому выезду' },
            ].map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.18)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6ee7b7', fontSize: 18, flexShrink: 0 }}>✦</div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>{c.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ padding: '80px 24px', background: '#F8F7FC' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6B4FA0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>01 / Проблема</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', margin: 0 }}>Актуальность и востребованность</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { title: 'В чём суть проблемы?', text: 'Владельцы кафе, салонов и офисов вынуждены сами решать технические проблемы и искать отдельных специалистов под каждую поломку: электрика, сантехника, вентиляционщика, плотника.' },
              { title: 'Какова цена проблемы?', text: 'Поиск специалиста отнимает время и может не решить проблему, а технические неисправности грозят недовольством клиентов или полным простоем бизнеса.' },
              { title: 'Почему актуально сейчас?', text: 'В условиях роста расходов и падения спроса бизнес ищет экономию: плановое обслуживание сокращает будущие издержки на срочные работы.' },
            ].map((c, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 32, borderLeft: '4px solid #6B4FA0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 style={{ color: '#6B4FA0', fontSize: 16, fontWeight: 700, marginBottom: 16, marginTop: 0 }}>{c.title}</h3>
                <p style={{ color: '#555', lineHeight: 1.7, margin: 0, fontSize: 15 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#2D6E5E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>02 / Решение</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', margin: 0 }}>Предлагаемое решение</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { n: '01', title: 'Абонентский договор', text: 'Фиксированная ежемесячная плата по площади объекта; без скрытых наценок за срочность.' },
                { n: '02', title: 'Плановый обход', text: 'Раз в месяц — электрика, ВК, ОВК, плотницкие; журнал работ и контрольные точки.' },
                { n: '03', title: 'Аварийные заявки', text: 'Круглосуточный приём через личный кабинет или диспетчера, регистрация и маршрутизация.' },
                { n: '04', title: 'Выезд 2–4 часа', text: 'Гарантированное время реакции на любую аварийную ситуацию.' },
                { n: '05', title: 'Акт и фотоотчёт', text: 'По каждому выезду — акт работ, фото «до/после», рекомендации по эксплуатации.' },
                { n: '06', title: 'Единая ответственность', text: 'Один подрядчик — один регламент — одна точка ответственности.' },
              ].map(c => (
                <div key={c.n} style={{ background: '#F8F7FC', borderRadius: 14, padding: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#2D6E5E', marginBottom: 8 }}>{c.n}</div>
                  <div style={{ fontWeight: 600, color: '#1B3A2F', marginBottom: 8, fontSize: 15 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{c.text}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#1B3A2F', borderRadius: 20, padding: 32, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#6ee7b7', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Формула ценности</div>
              <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0, color: 'rgba(255,255,255,0.9)' }}>
                Комплексное обслуживание инженерных систем помогает владельцу бизнеса достичь <strong>бесперебойной работы</strong> без аварийных простоев, за счёт <strong>единой точки ответственности</strong> и времени реакции <strong>2–4 часа</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: '80px 24px', background: '#F8F7FC' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6B4FA0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>03 / Продукт</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', margin: 0 }}>Что входит в обслуживание</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 32 }}>
            <div style={{ background: '#fff', borderRadius: 20, padding: 40, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1B3A2F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 28 }}>Базовый перечень услуг</div>
              {[
                { icon: '⚡', title: 'Электроснабжение', text: 'Проверка щитов, автоматов, УЗО, розеточных групп, освещения. Замеры на нагрев и максимальные токи.' },
                { icon: '💧', title: 'Водоснабжение и водоотведение', text: 'Проверка кранов, смесителей, гибких подводок, сифонов и подключённого оборудования.' },
                { icon: '🌀', title: 'Вентиляция и кондиционирование', text: 'Чистка фильтров, осмотр вытяжек и дренажа кондиционеров, проверка автоматики.' },
                { icon: '🔨', title: 'Мелкие плотницкие работы', text: 'Ремонт дверей, мебели, доводчиков, плинтусов и мелких конструкций.' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 3 ? 24 : 0, paddingBottom: i < 3 ? 24 : 0, borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none' }}>
                  <div style={{ fontSize: 22, flexShrink: 0, width: 40, textAlign: 'center' }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1B3A2F', marginBottom: 6 }}>{s.title}</div>
                    <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{s.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#1B3A2F', borderRadius: 20, padding: 32, color: '#fff' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6ee7b7', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Тариф</div>
                <div style={{ fontSize: 48, fontWeight: 800, marginBottom: 4 }}>500 ₽</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>от … за м² в месяц · абонентская плата</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#1B3A2F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Личный кабинет</div>
                {['Заявки онлайн', 'История работ', 'Фото «до/после»', 'Статусы заявок', 'Регламентные работы'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 14, color: '#444' }}>
                    <span style={{ color: '#2D6E5E', fontWeight: 700 }}>✓</span> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET */}
      <section id="market" style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#2D6E5E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>07 / Рынок</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', margin: 0 }}>TAM / SAM / SOM</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 56 }}>
            {[
              { label: 'TAM', value: '9,6 млрд ₽/год', formula: '20 000 объектов × 80 м² × 500 ₽ × 12', desc: 'Все малые коммерческие помещения СПб', bg: '#1B3A2F' },
              { label: 'SAM', value: '480 млн ₽/год', formula: '1 000 объектов × 80 м² × 500 ₽ × 12', desc: 'Красносельский и соседние районы', bg: '#2D6E5E' },
              { label: 'SOM', value: '48 млн ₽/год', formula: '100 объектов × 80 м² × 500 ₽ × 12', desc: 'Реалистичная доля проекта', bg: '#3E8B6F' },
            ].map(m => (
              <div key={m.label} style={{ background: m.bg, borderRadius: 20, padding: 32, color: '#fff' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{m.label}</div>
                <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>{m.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{m.formula}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontStyle: 'italic' }}>{m.desc}</div>
              </div>
            ))}
          </div>

          {/* COMPETITION */}
          <div style={{ background: '#F8F7FC', borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #eee' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#6B4FA0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>08 / Конкуренция</div>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', margin: 0 }}>Конкурентные преимущества</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: 13, color: '#999', fontWeight: 600 }}>Параметр</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', background: '#1B3A2F', color: '#fff', fontSize: 13, fontWeight: 700 }}>А-57</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: 12, color: '#888', fontWeight: 500 }}>Одиночные мастера</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: 12, color: '#888', fontWeight: 500 }}>Управляющие компании</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: 12, color: '#888', fontWeight: 500 }}>Сервисные подрядчики</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Единый договор по всем системам', true, false, 'partial', true],
                  ['Плановые чек-листы и регламент ТО', true, false, 'partial', true],
                  ['Личный кабинет и диспетчеризация', true, false, 'partial', true],
                  ['Фотоотчёт и история работ', true, false, false, 'partial'],
                  ['Фокус на малом бизнесе 50–200 м²', true, true, false, false],
                ].map(([param, ...vals], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', borderTop: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '14px 24px', fontSize: 14, color: '#444' }}>{param as string}</td>
                    {vals.map((v, j) => (
                      <td key={j} style={{ padding: '14px 20px', textAlign: 'center', background: j === 0 ? 'rgba(27,58,47,0.04)' : undefined, fontSize: 18, fontWeight: 700 }}>
                        {v === true ? <span style={{ color: '#16a34a' }}>✓</span> : v === false ? <span style={{ color: '#dc2626' }}>✗</span> : <span style={{ color: '#d97706' }}>~</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: '12px 24px', background: '#f5f5f5', fontSize: 12, color: '#aaa', borderTop: '1px solid #eee' }}>
              ✓ — реализовано системно · ~ — частично · ✗ — отсутствует
            </div>
          </div>
        </div>
      </section>

      {/* FINANCIALS */}
      <section style={{ padding: '80px 24px', background: '#F8F7FC' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6B4FA0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>12 / Финансы</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', margin: 0 }}>Прогноз на 1–5 лет</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
            <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontWeight: 600, color: '#1B3A2F', marginBottom: 24 }}>Прогноз выручки, млн ₽</div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={revenueData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: any) => [`${v} млн ₽`, 'Выручка']} />
                  <Bar dataKey="revenue" fill="#1B3A2F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { year: '1 год', geo: 'Красносельский район', obj: 30, rev: '14,4 млн ₽', team: 'Руководитель, инженер, диспетчер, 2–3 мастера' },
                { year: '2 год', geo: '+ 1 соседний район', obj: 55, rev: '26,4 млн ₽', team: 'Увеличение мастеров, дополнительный инженер' },
                { year: '3 год', geo: '3 района СПб', obj: 80, rev: '38,4 млн ₽', team: 'Увеличение мастеров, специалист по продажам' },
                { year: '4 год', geo: '5 районов СПб', obj: 100, rev: '48 млн ₽', team: 'Стандартизированные процессы' },
                { year: '5 год', geo: 'Все районы СПб', obj: 120, rev: '57,6 млн ₽', team: 'Открытие филиалов' },
              ].map((r, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ textAlign: 'center', flexShrink: 0, width: 52 }}>
                    <div style={{ fontSize: 11, color: '#aaa' }}>{r.year}</div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: '#1B3A2F', lineHeight: 1 }}>{r.obj}</div>
                    <div style={{ fontSize: 11, color: '#aaa' }}>объектов</div>
                  </div>
                  <div style={{ borderLeft: '1px solid #f0f0f0', paddingLeft: 16 }}>
                    <div style={{ fontWeight: 600, color: '#1B3A2F', fontSize: 14 }}>{r.rev} · {r.geo}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{r.team}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#2D6E5E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>11 / Команда</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', margin: 0 }}>Почему именно мы?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ background: '#F8F7FC', borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1B3A2F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>Обо мне</div>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 72, height: 72, background: '#1B3A2F', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, fontWeight: 700, flexShrink: 0 }}>А</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#1B3A2F', fontSize: 18, marginBottom: 4 }}>Александр</div>
                  <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>Главный инженер больницы, Санкт-Петербург</div>
                  <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, margin: 0 }}>Начинал с электромонтажа ещё во время учёбы. Работал энергетиком в больнице, стал начальником коммунальной службы. Уже почти 10 лет — главный инженер больницы в Санкт-Петербурге.</p>
                </div>
              </div>
            </div>
            <div style={{ background: '#F8F7FC', borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1B3A2F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>О команде</div>
              <p style={{ color: '#555', lineHeight: 1.7, marginBottom: 24, fontSize: 14 }}>Создание команды специалистов 24/7 не станет новой задачей. За время работы сложились знакомства с профессионалами различного профиля, готовыми работать на общий результат.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {['Электрик', 'Сантехник', 'Вентиляционщик', 'Плотник', 'Диспетчер', 'Инженер'].map(r => (
                  <div key={r} style={{ background: '#fff', borderRadius: 10, padding: '10px 8px', textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#1B3A2F', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>{r}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT */}
      <section style={{ padding: '80px 24px', background: '#1B3A2F', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6ee7b7', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>13 / Запрос</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, fontFamily: 'Manrope, sans-serif', margin: 0 }}>На что нужны инвестиции</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 72, fontWeight: 800, marginBottom: 8 }}>1 млн ₽</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>Запрос на грантовое финансирование</div>
              {['Срок запуска MVP — 3 месяца', 'Набор пилотной базы клиентов в Красносельском районе', 'Стандартизация регламентов и чек-листов', 'Подтверждение юнит-экономики на реальных объектах'].map(t => (
                <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                  <span style={{ color: '#6ee7b7', flexShrink: 0, fontWeight: 700 }}>✓</span>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 32 }}>
              {[
                { label: 'Инструмент и оборудование', amount: '280 тыс. ₽', pct: '28%' },
                { label: 'Сайт, личный кабинет, CRM', amount: '150 тыс. ₽', pct: '15%' },
                { label: 'Маркетинг и продажи', amount: '300 тыс. ₽', pct: '30%' },
                { label: 'Фонд оплаты труда', amount: '270 тыс. ₽', pct: '27%' },
              ].map((r, i) => (
                <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  <div style={{ flex: 1, fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{r.label}</div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{r.amount}</div>
                  <div style={{ width: 40, textAlign: 'right', color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{r.pct}</div>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 16, borderTop: '2px solid rgba(255,255,255,0.2)' }}>
                <div style={{ flex: 1, fontWeight: 700 }}>ИТОГО</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>1,0 млн ₽</div>
                <div style={{ width: 40, textAlign: 'right', fontWeight: 700 }}>100%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" style={{ padding: '80px 24px', background: '#F8F7FC' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6B4FA0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Связаться</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', margin: '0 0 12px' }}>Оставить заявку</h2>
            <p style={{ color: '#888', margin: 0 }}>Заполните форму — свяжемся в течение часа</p>
          </div>
          <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 20, padding: 40, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>Имя *</label>
                <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} placeholder="Ваше имя" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>Телефон *</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} placeholder="+7 (___) ___-__-__" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} placeholder="email@example.com" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>Площадь, м²</label>
                <input type="number" value={formData.objectArea} onChange={e => setFormData({ ...formData, objectArea: e.target.value })} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} placeholder="80" />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>Адрес объекта *</label>
              <input required value={formData.objectAddress} onChange={e => setFormData({ ...formData, objectAddress: e.target.value })} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} placeholder="Санкт-Петербург, ул. Примерная, д. 1" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>Тип объекта</label>
              <select value={formData.objectType} onChange={e => setFormData({ ...formData, objectType: e.target.value })} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none', background: '#fff', boxSizing: 'border-box' }}>
                {['Кафе/ресторан', 'Салон красоты', 'Офис', 'Лаборатория/клиника', 'Другое'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>Описание запроса *</label>
              <textarea required rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} placeholder="Опишите вашу задачу или проблему..." />
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 24 }}>
              <input type="checkbox" id="consent" checked={formData.consent} onChange={e => setFormData({ ...formData, consent: e.target.checked })} style={{ marginTop: 2, accentColor: '#1B3A2F', flexShrink: 0 }} />
              <label htmlFor="consent" style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>
                Я даю <a href="/consent" target="_blank" style={{ color: '#2D6E5E', textDecoration: 'underline' }}>согласие на обработку персональных данных</a> в соответствии с <a href="/privacy" target="_blank" style={{ color: '#2D6E5E', textDecoration: 'underline' }}>Политикой обработки персональных данных</a>
              </label>
            </div>
            <button type="submit" disabled={submitting} style={{ width: '100%', padding: '16px', background: '#1B3A2F', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
              {submitting ? 'Отправляем...' : 'Отправить заявку'}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1B3A2F', color: '#fff', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Manrope, sans-serif' }}>А-57</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Обслуживание инженерных систем и зданий</div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="mailto:a-57service@mail.ru" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>a-57service@mail.ru</a>
            <a href="https://a-57.рф" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>a-57.рф</a>
            <a href="/login" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>Личный кабинет</a>
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, width: '100%' }}>
            <a href="/privacy" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13 }}>Политика конфиденциальности</a>
            <a href="/consent" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13 }}>Согласие на обработку ПДн</a>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>© 2025 А-57 Эксплуатация · Санкт-Петербург</div>
        </div>
      </footer>
    </div>
  );
}
