import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { usersDb, initDb, generateId } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const { email, password, firstName, lastName, phone, companyName, objectAddress } = await req.json();
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'Заполните все обязательные поля' }, { status: 400 });
    }
    const existing = await usersDb.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'Пользователь с таким email уже существует' }, { status: 409 });
    }
    const hashed = await bcrypt.hash(password, 12);
    const user = await usersDb.insert({
      _id: generateId(),
      email: email.toLowerCase(),
      password: hashed,
      role: 'client',
      firstName, lastName, phone, companyName, objectAddress,
      createdAt: new Date().toISOString(),
    }) as any;
    const session = await getSession();
    session.userId = user._id;
    session.email = user.email;
    session.role = 'client';
    session.firstName = firstName;
    session.lastName = lastName;
    await session.save();
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
