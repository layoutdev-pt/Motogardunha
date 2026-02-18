import { Resend } from 'resend';

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY environment variable is not set');
  return new Resend(apiKey);
}

export const MOTOGARDUNHA_EMAIL = process.env.MOTOGARDUNHA_EMAIL || 'moto.gardunha@gpepe.pt';
