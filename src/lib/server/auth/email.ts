import type { User } from '@prisma-generated';
import { getRequestEvent } from '$app/server';
import prisma from '$/lib/server/prisma';
import { ONE_HOUR, generateSecureToken } from './util';
import { AUTH_RESEND_FROM, AUTH_RESEND_KEY } from '$env/static/private';

export type ValidateLoginResult =
  | { result: 'success'; user: User }
  | { result: 'missing'; user: null }
  | { result: 'expired'; user: null };

export const validateLoginToken = async (
  token: string,
): Promise<ValidateLoginResult> => {
  const verification = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verification) {
    return { result: 'missing', user: null };
  }

  // token is either valid or expired, so delete
  await prisma.verificationToken.delete({
    where: { token },
  });

  if (verification.expires.getTime() < Date.now()) {
    return { result: 'expired', user: null };
  }

  // upsert user
  const user = await prisma.user.upsert({
    where: { email: verification.email },
    update: {
      emailVerified: new Date(),
    },
    create: {
      email: verification.email,
      emailVerified: new Date(),
    },
  });

  return { result: 'success', user };
};

export const sendLoginEmail = async (to: string): Promise<Response> => {
  const event = getRequestEvent();
  const token = generateSecureToken();
  const origin = new URL(event.url.href).origin;
  const url = `${origin}/auth/${token}`;

  // create verification token
  await prisma.verificationToken.create({
    data: {
      email: to,
      token,
      expires: new Date(Date.now() + ONE_HOUR),
    },
  });

  return await event.fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + AUTH_RESEND_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: AUTH_RESEND_FROM,
      to,
      subject: 'Sign in to Notes',
      text: text(url),
      html: html(url),
    }),
  });
};

const text = (url: string): string =>
  `
  Sign in to Notes:
  ${url}

  If you did not request this email you can safely ignore it.
`
    .replace(/^[ \t]+/, '')
    .trim();
const html = (url: string): string =>
  `
  <body>
    <table width="100%" border="0" cellspacing="20" cellpadding="0" 
      style="max-width: 600px; margin: auto; border-radius: 10px;"
    >
      <tr>
        <td align="center" 
          style="padding: 10px 0px; font-size: 22px; 
                 font-family: Helvetica, Arial, sans-serif;"
        >
          Sign in to <strong>Redtype Kanban</strong>
        </td>
      </tr>
      <tr>
        <td aligh="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td align="center" style="border-radius: 5px;">
                <a href="${url}" target="_blank"
                   style="font-size: 18px; color: #fff; background-color: #00d;
                          font-family: Helvetica, Arial, sans-serif;
                          text-decoration: none; border-radius: 5px;
                          padding: 10px 20px; border: 1px solid;
                          display: inline-block; font-weight: bold;"
                >
                  Sign In
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
            style="padding: 0px 0px 10px 0px; font-size: 16px;
            line-height: 22px;
            font-family: Helvetica, Arial, sans-serif;"
        >
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
`
    .replace(/\s+/g, ' ')
    .trim();
