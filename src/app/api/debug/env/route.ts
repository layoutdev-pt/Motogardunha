import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasAdminPassword: !!process.env.ADMIN_PASSWORD,
    adminPasswordLength: process.env.ADMIN_PASSWORD?.length || 0,
    adminPasswordFirstChar: process.env.ADMIN_PASSWORD?.charAt(0) || 'none',
    adminPasswordHash: process.env.ADMIN_PASSWORD ? require('crypto').createHash('sha256').update(process.env.ADMIN_PASSWORD).digest('hex') : 'none',
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    nodeEnv: process.env.NODE_ENV,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  });
}
