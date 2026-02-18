import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const MOTOGARDUNHA_EMAIL = process.env.MOTOGARDUNHA_EMAIL || 'moto.gardunha@gpepe.pt';
