import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { usersDb, initDb } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 });
    }
    const user = await usersDb.findOne({ email: email.toLowerCase() }) as any;
    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 401 });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 });
    }
    const session = await getSession();
    session.userId = user._id;
    session.email = user.email;
    session.role = user.role;
    session.firstName = user.firstName;
    session.lastName = user.lastName;
    await session.save();
    return NextResponse.json({ role: user.role, firstName: user.firstName });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
