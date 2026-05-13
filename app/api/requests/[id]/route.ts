import { NextRequest, NextResponse } from 'next/server';
import { requestsDb, usersDb } from '@/lib/db';
import { getSession } from '@/lib/session';
import { sendStatusUpdate } from '@/lib/email';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await context.params;
  const request = await requestsDb.findOne({ _id: id }) as any;
  if (!request) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (session.role === 'client' && request.userId !== session.userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.json({ request });
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await context.params;

  const request = await requestsDb.findOne({ _id: id }) as any;
  if (!request) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (session.role === 'client' && request.userId !== session.userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const updates = await req.json();
  const filtered: any = {};

  if (session.role === 'admin') {
    for (const key of ['status', 'adminNotes', 'assignedTo']) {
      if (updates[key] !== undefined) filtered[key] = updates[key];
    }
    if (updates.status) {
      const history = request.statusHistory || [];
      history.push({ status: updates.status, changedBy: 'admin', timestamp: new Date().toISOString() });
      filtered.statusHistory = history;
      const user = await usersDb.findOne({ _id: request.userId }) as any;
      if (user?.email) {
        await sendStatusUpdate(user.email, { number: request.number, status: updates.status, clientName: user.firstName });
      }
    }
    if (updates.addFile) {
      const files = request.files || [];
      files.push({ ...updates.addFile, uploadedBy: 'admin', timestamp: new Date().toISOString() });
      filtered.files = files;
    }
  }

  if (updates.addFileClient) {
    const files = request.files || [];
    files.push({ ...updates.addFileClient, uploadedBy: 'client', timestamp: new Date().toISOString() });
    filtered.files = files;
  }

  filtered.updatedAt = new Date().toISOString();
  await requestsDb.update({ _id: id }, { $set: filtered });
  const updated = await requestsDb.findOne({ _id: id });
  return NextResponse.json({ request: updated });
}
