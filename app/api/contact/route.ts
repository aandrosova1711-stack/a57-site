import { NextRequest, NextResponse } from 'next/server';
import { publicRequestsDb, generateId } from '@/lib/db';
import { sendPublicInquiry } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, phone, email, objectAddress, objectArea, objectType, description } = data;
    if (!name || !phone || !objectAddress || !description) {
      return NextResponse.json({ error: 'Заполните все обязательные поля' }, { status: 400 });
    }
    await publicRequestsDb.insert({
      _id: generateId(), name, phone, email, objectAddress,
      objectArea: objectArea ? parseFloat(objectArea) : null,
      objectType, description, createdAt: new Date().toISOString(),
    });
    await sendPublicInquiry({ name, phone, email, objectAddress, objectArea, objectType, description });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
