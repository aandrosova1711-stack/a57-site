export default function ConsentPage() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>
      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid #f0f0f0', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <a href="/" style={{ fontSize: 24, fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', textDecoration: 'none' }}>A-57</a>
          <a href="/" style={{ color: '#555', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>&larr; На главную</a>
        </div>
      </nav>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 24px 60px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1B3A2F', fontFamily: 'Manrope, sans-serif', marginBottom: 8 }}>
          Согласие на обработку персональных данных
        </h1>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 40 }}>в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных»</p>

        <div style={{ background: '#F8F7FC', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <p style={{ lineHeight: 1.8, color: '#444', margin: '0 0 16px' }}>
            Я, субъект персональных данных, в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных», даю согласие Андросову Александру Николаевичу (далее — Оператор) на обработку моих персональных данных на следующих условиях:
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1B3A2F', margin: '32px 0 16px', fontFamily: 'Manrope, sans-serif' }}>1. Оператор персональных данных</h2>
        <div style={{ background: '#F8F7FC', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <p style={{ lineHeight: 1.8, color: '#444', margin: 0 }}>
            <strong>Андросов Александр Николаевич</strong><br />
            Контактный email: <a href="mailto:a-57service@mail.ru" style={{ color: '#2D6E5E' }}>a-57service@mail.ru</a><br />
            Веб-сайт: <a href="https://а-57.рф" style={{ color: '#2D6E5E' }}>https://а-57.рф</a>
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1B3A2F', margin: '32px 0 16px', fontFamily: 'Manrope, sans-serif' }}>2. Цель обработки персональных данных</h2>
        <p style={{ lineHeight: 1.8, color: '#444' }}>
          Обработка персональных данных осуществляется <strong>исключительно в целях</strong>:
        </p>
        <ul style={{ lineHeight: 1.8, color: '#444', paddingLeft: 24 }}>
          <li>рассмотрения заявки на обслуживание инженерных систем и зданий;</li>
          <li>предоставления доступа к личному кабинету на веб-сайте https://а-57.рф;</li>
          <li>информирования Пользователя о статусе заявок, регламентных работах и иных услугах Оператора посредством электронной почты или телефонной связи.</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1B3A2F', margin: '32px 0 16px', fontFamily: 'Manrope, sans-serif' }}>3. Перечень обрабатываемых персональных данных</h2>
        <ul style={{ lineHeight: 1.8, color: '#444', paddingLeft: 24 }}>
          <li>фамилия, имя, отчество;</li>
          <li>адрес электронной почты;</li>
          <li>номер телефона;</li>
          <li>адрес объекта обслуживания;</li>
          <li>наименование организации;</li>
          <li>фотографии (при загрузке в заявку).</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1B3A2F', margin: '32px 0 16px', fontFamily: 'Manrope, sans-serif' }}>4. Действия с персональными данными</h2>
        <p style={{ lineHeight: 1.8, color: '#444' }}>
          Согласие предоставляется на осуществление следующих действий в отношении персональных данных: сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), использование, передачу (предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.
        </p>
        <p style={{ lineHeight: 1.8, color: '#444' }}>
          Обработка персональных данных осуществляется как автоматизированным, так и неавтоматизированным способом в соответствии с действующим законодательством Российской Федерации.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1B3A2F', margin: '32px 0 16px', fontFamily: 'Manrope, sans-serif' }}>5. Срок действия согласия</h2>
        <p style={{ lineHeight: 1.8, color: '#444' }}>
          Данное согласие действует до достижения целей обработки персональных данных или до момента отзыва согласия субъектом персональных данных.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1B3A2F', margin: '32px 0 16px', fontFamily: 'Manrope, sans-serif' }}>6. Порядок отзыва согласия</h2>
        <p style={{ lineHeight: 1.8, color: '#444' }}>
          Данное согласие может быть отозвано в любой момент путем направления письменного заявления на адрес электронной почты Оператора: <a href="mailto:a-57service@mail.ru" style={{ color: '#2D6E5E' }}>a-57service@mail.ru</a> с пометкой «Отзыв согласия на обработку персональных данных».
        </p>

        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: 24, marginTop: 32 }}>
          <p style={{ lineHeight: 1.8, color: '#444', margin: 0, fontSize: 14 }}>
            <strong>Обратите внимание:</strong> проставляя отметку в чекбоксе «Я даю согласие на обработку персональных данных» на формах сайта https://а-57.рф, Вы подтверждаете, что ознакомились с настоящим документом и <a href="/privacy" style={{ color: '#2D6E5E' }}>Политикой обработки персональных данных</a>, и даёте своё добровольное согласие на обработку персональных данных на указанных выше условиях.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#1B3A2F', color: '#fff', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Manrope, sans-serif' }}>A-57</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Обслуживание инженерных систем и зданий</div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="mailto:a-57service@mail.ru" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>a-57service@mail.ru</a>
            <a href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>Главная</a>
            <a href="/privacy" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>Политика конфиденциальности</a>
            <a href="/consent" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>Согласие на обработку ПДн</a>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>&copy; 2025 А-57 Эксплуатация &middot; Санкт-Петербург</div>
        </div>
      </footer>
    </div>
  );
}
