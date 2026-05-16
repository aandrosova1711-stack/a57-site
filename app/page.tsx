'use client';
import { useState } from 'react';
import { toast } from 'sonner';

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

  const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #e5e7eb', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none', boxSizing: 'border-box' };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid #f0f0f0', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <a href="/" style={{ fontSize: 24, fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', textDecoration: 'none' }}>А-57</a>
          <div className="nav-links">
            <a href="#about" style={{ color: '#555', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>О нас</a>
            <a href="#services" style={{ color: '#555', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Услуги</a>
            <a href="#team" style={{ color: '#555', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Команда</a>
            <a href="#contact" style={{ color: '#555', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Контакты</a>
            <a href="#contact" style={{ padding: '8px 16px', border: '1.5px solid #1B3A2F', borderRadius: 10, color: '#1B3A2F', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Заявка</a>
            <a href="/login" style={{ padding: '8px 16px', background: '#1B3A2F', borderRadius: 10, color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Личный кабинет</a>
          </div>
          <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
            {menuOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B3A2F" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B3A2F" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <a href="#about">О нас</a>
          <a href="#services">Услуги</a>
          <a href="#team">Команда</a>
          <a href="#contact">Контакты</a>
          <a href="#contact" style={{ padding: '12px 24px', border: '2px solid #1B3A2F', borderRadius: 12 }}>Оставить заявку</a>
          <a href="/login" style={{ padding: '12px 24px', background: '#1B3A2F', color: '#fff', borderRadius: 12 }}>Личный кабинет</a>
        </div>
      )}

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0f2318 0%, #1B3A2F 55%, #2D6E5E 100%)', paddingTop: 100, paddingBottom: 60 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }} className="grid-hero">
          <div style={{ color: '#fff' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: 999, fontSize: 13, marginBottom: 24, color: 'rgba(255,255,255,0.85)' }}>
              ★ Санкт-Петербург
            </div>
            <h1 className="hero-title" style={{ fontWeight: 800, lineHeight: 1.15, margin: '0 0 16px', fontFamily: 'Manrope, sans-serif' }}>
              А-57<br /><span style={{ color: '#6ee7b7' }}>Эксплуатация</span>
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', marginBottom: 24, lineHeight: 1.6 }}>
              Комплексное обслуживание инженерных систем и зданий для малого бизнеса
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
              {['a-57service@mail.ru', 'a-57.рф'].map(t => (
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

      {/* ABOUT */}
      <section id="about" style={{ padding: '60px 24px', background: '#F8F7FC' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6B4FA0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>О нас</div>
            <h2 className="section-title" style={{ fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', margin: 0 }}>Зачем нужна А-57?</h2>
          </div>
          <div className="grid-3">
            {[
              { title: 'В чём суть проблемы?', text: 'Владельцы кафе, салонов и офисов вынуждены сами решать технические проблемы и искать отдельных специалистов под каждую поломку: электрика, сантехника, вентиляционщика, плотника.' },
              { title: 'Какова цена проблемы?', text: 'Поиск специалиста отнимает время и может не решить проблему, а технические неисправности грозят недовольством клиентов или полным простоем бизнеса.' },
              { title: 'Почему актуально сейчас?', text: 'В условиях роста расходов и падения спроса бизнес ищет экономию: плановое обслуживание сокращает будущие издержки на срочные работы.' },
            ].map((c, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 28, borderLeft: '4px solid #6B4FA0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 style={{ color: '#6B4FA0', fontSize: 16, fontWeight: 700, marginBottom: 12, marginTop: 0 }}>{c.title}</h3>
                <p style={{ color: '#555', lineHeight: 1.7, margin: 0, fontSize: 15 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{ padding: '60px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#2D6E5E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Как мы работаем</div>
            <h2 className="section-title" style={{ fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', margin: 0 }}>Наш подход</h2>
          </div>
          <div className="grid-solution">
            <div className="grid-solution-inner">
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
      <section id="services" style={{ padding: '60px 24px', background: '#F8F7FC' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6B4FA0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Услуги</div>
            <h2 className="section-title" style={{ fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', margin: 0 }}>Что входит в обслуживание</h2>
          </div>
          <div className="grid-services">
            <div style={{ background: '#fff', borderRadius: 20, padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1B3A2F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>Базовый перечень услуг</div>
              {[
                { icon: '⚡', title: 'Электроснабжение', text: 'Проверка щитов, автоматов, УЗО, розеточных групп, освещения. Замеры на нагрев и максимальные токи.' },
                { icon: '💧', title: 'Водоснабжение и водоотведение', text: 'Проверка кранов, смесителей, гибких подводок, сифонов и подключённого оборудования.' },
                { icon: '🌀', title: 'Вентиляция и кондиционирование', text: 'Чистка фильтров, осмотр вытяжек и дренажа кондиционеров, проверка автоматики.' },
                { icon: '🔨', title: 'Мелкие плотницкие работы', text: 'Ремонт дверей, мебели, доводчиков, плинтусов и мелких конструкций.' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 3 ? 20 : 0, paddingBottom: i < 3 ? 20 : 0, borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none' }}>
                  <div style={{ fontSize: 22, flexShrink: 0, width: 36, textAlign: 'center' }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1B3A2F', marginBottom: 6 }}>{s.title}</div>
                    <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{s.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#1B3A2F', borderRadius: 20, padding: 28, color: '#fff' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6ee7b7', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Тариф</div>
                <div style={{ fontSize: 42, fontWeight: 800, marginBottom: 4 }}>500 ₽</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>от ... за м² в месяц</div>
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

      {/* TEAM */}
      <section id="team" style={{ padding: '60px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#2D6E5E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Команда</div>
            <h2 className="section-title" style={{ fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', margin: 0 }}>Почему именно мы?</h2>
          </div>
          <div className="grid-team">
            <div style={{ background: '#F8F7FC', borderRadius: 20, padding: '28px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1B3A2F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>О руководителе</div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 56, height: 56, background: '#1B3A2F', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, fontWeight: 700, flexShrink: 0 }}>А</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#1B3A2F', fontSize: 16, marginBottom: 4 }}>Александр</div>
                  <div style={{ fontSize: 13, color: '#888', marginBottom: 10 }}>Главный инженер, Санкт-Петербург</div>
                  <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, margin: 0 }}>Начинал с электромонтажа ещё во время учёбы. Работал энергетиком в больнице, стал начальником коммунальной службы. Уже почти 10 лет — главный инженер больницы в Санкт-Петербурге.</p>
                </div>
              </div>
            </div>
            <div style={{ background: '#F8F7FC', borderRadius: 20, padding: '28px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1B3A2F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>О команде</div>
              <p style={{ color: '#555', lineHeight: 1.7, marginBottom: 20, fontSize: 14 }}>Создание команды специалистов 24/7 не станет новой задачей. За время работы сложились знакомства с профессионалами различного профиля, готовыми работать на общий результат.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {['Электрик', 'Сантехник', 'Вентиляционщик', 'Плотник', 'Диспетчер', 'Инженер'].map(r => (
                  <div key={r} style={{ background: '#fff', borderRadius: 10, padding: '8px 6px', textAlign: 'center', fontSize: 12, fontWeight: 500, color: '#1B3A2F', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>{r}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" style={{ padding: '60px 24px', background: '#F8F7FC' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6B4FA0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Связаться</div>
            <h2 className="section-title" style={{ fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', margin: '0 0 12px' }}>Оставить заявку</h2>
            <p style={{ color: '#888', margin: 0, fontSize: 15 }}>Заполните форму — свяжемся в течение часа</p>
          </div>
          <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 20, padding: '28px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <div className="grid-form-2" style={{ marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>Имя *</label>
                <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={inputStyle} placeholder="Ваше имя" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>Телефон *</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} placeholder="+7 (___) ___-__-__" />
              </div>
            </div>
            <div className="grid-form-2" style={{ marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={inputStyle} placeholder="email@example.com" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>Площадь, м²</label>
                <input type="number" value={formData.objectArea} onChange={e => setFormData({ ...formData, objectArea: e.target.value })} style={inputStyle} placeholder="80" />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>Адрес объекта *</label>
              <input required value={formData.objectAddress} onChange={e => setFormData({ ...formData, objectAddress: e.target.value })} style={inputStyle} placeholder="Санкт-Петербург, ул. Примерная, д. 1" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>Тип объекта</label>
              <select value={formData.objectType} onChange={e => setFormData({ ...formData, objectType: e.target.value })} style={{ ...inputStyle, background: '#fff' }}>
                {['Кафе/ресторан', 'Салон красоты', 'Офис', 'Лаборатория/клиника', 'Другое'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>Описание запроса *</label>
              <textarea required rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }} placeholder="Опишите вашу задачу или проблему..." />
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
      <footer style={{ background: '#1B3A2F', color: '#fff', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Manrope, sans-serif' }}>А-57</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Обслуживание инженерных систем и зданий</div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="mailto:a-57service@mail.ru" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>a-57service@mail.ru</a>
            <a href="https://a-57.рф" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>a-57.рф</a>
            <a href="/login" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>Личный кабинет</a>
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, width: '100%' }}>
            <a href="/privacy" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13 }}>Политика конфиденциальности</a>
            <a href="/consent" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13 }}>Согласие на обработку ПДн</a>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>© 2025 А-57 Эксплуатация · Санкт-Петербург</div>
        </div>
      </footer>
    </div>
  );
}
