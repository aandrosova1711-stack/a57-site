import { getIronSession, IronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  userId?: string;
  email?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET || 'a57-super-secret-session-key-change-in-production',
  cookieName: 'a57-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function getSessionFromRequest(req: Request): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(req, new Response(), sessionOptions);
}
