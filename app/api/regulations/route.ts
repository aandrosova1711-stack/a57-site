import { NextRequest, NextResponse } from 'next/server';
import { regulationsDb, generateId } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let query: any = {};
  if (session.role === 'client') query.userId = session.userId;

  const regulations = await regulationsDb.find(query).sort({ date: -1 });
  return NextResponse.json({ regulations });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.userId || session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const data = await req.json();
    const { userId, date, type, engineer, conclusions, files } = data;
    if (!userId || !date || !type || !conclusions) {
      return NextResponse.json({ error: 'Заполните все обязательные поля' }, { status: 400 });
    }
    const regulation = await regulationsDb.insert({
      _id: generateId(), userId, date, type, engineer,
      conclusions, files: files || [],
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ regulation });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
