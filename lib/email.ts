import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mail.ru',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'a-57service@mail.ru',
    pass: process.env.SMTP_PASS || '',
  },
});

function htmlTemplate(title: string, content: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
body { font-family: 'Arial', sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
.container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.header { background: #1B3A2F; color: white; padding: 24px 32px; }
.header h1 { margin: 0; font-size: 24px; font-weight: 700; }
.header p { margin: 4px 0 0; color: #a0c4b8; font-size: 14px; }
.body { padding: 32px; }
.field { margin-bottom: 16px; }
.field label { display: block; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
.field value { display: block; font-size: 15px; color: #1a1a1a; }
.badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.badge-blue { background: #dbeafe; color: #1d4ed8; }
.badge-green { background: #dcfce7; color: #15803d; }
.badge-amber { background: #fef3c7; color: #b45309; }
.footer { background: #f8f8f8; padding: 16px 32px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid #eee; }
</style></head>
<body>
<div class="container">
  <div class="header">
    <h1>А-57 Эксплуатация</h1>
    <p>Обслуживание инженерных систем и зданий</p>
  </div>
  <div class="body">
    <h2 style="margin-top:0;color:#1B3A2F">${title}</h2>
    ${content}
  </div>
  <div class="footer">© 2025 А-57 Эксплуатация · a-57service@mail.ru · a-57.рф</div>
</div>
</body></html>`;
}

export async function sendPublicInquiry(data: {
  name: string; phone: string; email?: string;
  objectAddress: string; objectArea?: string;
  objectType: string; description: string;
}) {
  const content = `
    <div class="field"><label>Имя</label><value>${data.name}</value></div>
    <div class="field"><label>Телефон</label><value>${data.phone}</value></div>
    ${data.email ? `<div class="field"><label>Email</label><value>${data.email}</value></div>` : ''}
    <div class="field"><label>Адрес объекта</label><value>${data.objectAddress}</value></div>
    ${data.objectArea ? `<div class="field"><label>Площадь</label><value>${data.objectArea} м²</value></div>` : ''}
    <div class="field"><label>Тип объекта</label><value>${data.objectType}</value></div>
    <div class="field"><label>Описание</label><value>${data.description}</value></div>
  `;
  try {
    await transporter.sendMail({
      from: `"А-57 Сайт" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Новая заявка с сайта — ${data.name}`,
      html: htmlTemplate('Новая заявка с сайта', content),
    });
  } catch (e) {
    console.error('Email send error:', e);
  }
}

export async function sendNewRequestNotification(data: {
  number: number; clientName: string; type: string; description: string; priority: string;
}) {
  const content = `
    <div class="field"><label>Номер заявки</label><value>#${data.number}</value></div>
    <div class="field"><label>Клиент</label><value>${data.clientName}</value></div>
    <div class="field"><label>Тип работы</label><value>${data.type}</value></div>
    <div class="field"><label>Приоритет</label><value>${data.priority}</value></div>
    <div class="field"><label>Описание</label><value>${data.description}</value></div>
  `;
  try {
    await transporter.sendMail({
      from: `"А-57 Сайт" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Новая заявка #${data.number} — ${data.clientName}`,
      html: htmlTemplate(`Новая заявка из личного кабинета #${data.number}`, content),
    });
  } catch (e) {
    console.error('Email send error:', e);
  }
}

export async function sendStatusUpdate(to: string, data: {
  number: number; status: string; clientName: string;
}) {
  const statusMap: Record<string, string> = {
    sent: 'Отправлено', in_progress: 'В работе', done: 'Выполнено',
  };
  const badgeMap: Record<string, string> = {
    sent: 'badge-blue', in_progress: 'badge-amber', done: 'badge-green',
  };
  const content = `
    <p>Здравствуйте, ${data.clientName}!</p>
    <p>Статус вашей заявки <strong>#${data.number}</strong> был обновлён:</p>
    <p><span class="badge ${badgeMap[data.status] || 'badge-blue'}">${statusMap[data.status] || data.status}</span></p>
    <p>Вы можете отслеживать статус заявки в личном кабинете на нашем сайте.</p>
  `;
  try {
    await transporter.sendMail({
      from: `"А-57 Эксплуатация" <${process.env.SMTP_USER}>`,
      to,
      subject: `Заявка #${data.number} — статус обновлён`,
      html: htmlTemplate('Обновление статуса заявки', content),
    });
  } catch (e) {
    console.error('Email send error:', e);
  }
}
