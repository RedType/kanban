import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import type { Session, User } from '@prisma-generated';
import prisma from '$/lib/server/prisma';
import { FIFTEEN_DAYS, THIRTY_DAYS } from './util';

export const createSession = async (
  token: string,
  userId: string,
): Promise<Session> => {
  const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  return prisma.session.create({
    data: {
      id,
      expires: new Date(Date.now() + THIRTY_DAYS),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export const validateSessionToken = async (
  token: string,
): Promise<SessionValidationResult> => {
  // fetch session
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });
  if (result === null) {
    return { session: null, user: null };
  }
  const { user, ...session } = result;

  // check for expiration
  if (Date.now() >= session.expires.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }

  // update expiry
  if (Date.now() >= session.expires.getTime() - FIFTEEN_DAYS) {
    session.expires = new Date(Date.now() + THIRTY_DAYS);
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        expires: session.expires,
      },
    });
  }

  return { session, user };
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
  await prisma.session.delete({ where: { id: sessionId } });
};

export const invalidateAllSessions = async (userId: string): Promise<void> => {
  await prisma.session.deleteMany({ where: { userId } });
};
