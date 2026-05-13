import { NextRequest, NextResponse } from 'next/server';
import { requestsDb, usersDb, generateId, getNextRequestNumber } from '@/lib/db';
import { getSession } from '@/lib/session';
import { sendNewRequestNotification } from '@/lib/email';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let query: any = {};
  if (session.role === 'client') query.userId = session.userId;

  const requests = await requestsDb.find(query).sort({ createdAt: -1 });
  return NextResponse.json({ requests });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const { type, description, priority, targetUserId } = data;
    if (!type || !description) {
      return NextResponse.json({ error: 'Тип и описание обязательны' }, { status: 400 });
    }

    const userId = session.role === 'admin' && targetUserId ? targetUserId : session.userId;
    const user = await usersDb.findOne({ _id: userId }) as any;
    const clientName = user ? `${user.firstName} ${user.lastName}` : 'Неизвестно';
    const number = await getNextRequestNumber();

    const request = await requestsDb.insert({
      _id: generateId(), number, userId, clientName,
      type, description, priority: priority || 'normal',
      status: 'sent',
      statusHistory: [{ status: 'sent', changedBy: session.role, timestamp: new Date().toISOString() }],
      files: [], adminNotes: '', assignedTo: '',
      objectAddress: user?.objectAddress || '',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    }) as any;

    await sendNewRequestNotification({ number, clientName, type, description, priority: priority || 'normal' });
    return NextResponse.json({ request });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
