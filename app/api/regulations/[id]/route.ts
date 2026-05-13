import { NextRequest, NextResponse } from 'next/server';
import { regulationsDb } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.userId || session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { id } = await context.params;
  const updates = await req.json();
  await regulationsDb.update({ _id: id }, { $set: updates });
  const updated = await regulationsDb.findOne({ _id: id });
  return NextResponse.json({ regulation: updated });
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.userId || session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { id } = await context.params;
  await regulationsDb.remove({ _id: id }, {});
  return NextResponse.json({ ok: true });
}
