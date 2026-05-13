import { NextRequest, NextResponse } from 'next/server';
import { usersDb } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session.userId || session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const users = await usersDb.find({ role: 'client' }) as any[];
  const safe = users.map(({ password: _, ...u }) => u);
  return NextResponse.json({ users: safe });
}
