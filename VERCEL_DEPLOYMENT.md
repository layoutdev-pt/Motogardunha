# Vercel Deployment Guide - Motogardunha

## 🚨 CRITICAL: Environment Variables Required

The admin login failing with "Erro interno" on Vercel is caused by **missing environment variables**.

### Required Environment Variables in Vercel

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables** and add:

#### 1. Supabase Configuration (CRITICAL)
```
NEXT_PUBLIC_SUPABASE_URL=https://oyszsvptojpqgxukgsjw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95c3pzdnB0b2pwcWd4dWtnc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNDI4NTgsImV4cCI6MjA4NjYxODg1OH0.VomMKMkob_HjKIcodpGvuQ2Jz_m_DX9VMBXyOWzkAEk
```

#### 2. Service Role Key (CRITICAL - Admin Login Won't Work Without This)
```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95c3pzdnB0b2pwcWd4dWtnc2p3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA0Mjg1OCwiZXhwIjoyMDg2NjE4ODU4fQ.pKvsTDB21YBKgSV9t46HrwmMiTqEAmVLvj259TBZeyc
```

#### 3. Admin Password (CRITICAL)
```
ADMIN_PASSWORD=M0toG@rDuNh4
```

#### 4. Email Configuration (Optional - emails will fail silently if not set)
```
RESEND_API_KEY=re_YOUR_ACTUAL_API_KEY_FROM_RESEND
MOTOGARDUNHA_EMAIL=moto.gardunha@sapo.pt
```

#### 5. Site URL (Production)
```
NEXT_PUBLIC_SITE_URL=https://motogardunha.vercel.app
```
(Or your custom domain if configured)

---

## 📋 Step-by-Step Fix for Admin Login Error

### Step 1: Add Environment Variables
1. Go to https://vercel.com/dashboard
2. Select your Motogardunha project
3. Click **Settings** → **Environment Variables**
4. Add each variable above (copy-paste exactly)
5. Select **Production**, **Preview**, and **Development** for each

### Step 2: Redeploy
After adding all environment variables:
1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 3: Test Admin Login
1. Go to `https://your-domain.vercel.app/admin-login`
2. Enter password: `M0toG@rDuNh4`
3. Should redirect to `/admin` dashboard

---

## 🔍 Debugging Checklist

If admin login still fails after adding environment variables:

### Check Vercel Logs
1. Go to **Deployments** → Click latest deployment
2. Click **Functions** tab
3. Find `/api/admin/login` function
4. Check logs for errors

### Expected Log Output (Success)
```
No errors - clean login
```

### Expected Log Output (Missing Env Vars)
```
Failed to get stored hash: Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY
Environment check: {
  hasSupabaseUrl: true,
  hasServiceRoleKey: false,  ← THIS SHOULD BE TRUE
  hasAdminPassword: true
}
```

---

## ⚠️ Common Issues

### Issue 1: "Erro interno" on Login
**Cause:** Missing `SUPABASE_SERVICE_ROLE_KEY`  
**Fix:** Add the service role key to Vercel environment variables

### Issue 2: "Password incorreta" (but password is correct)
**Cause:** `ADMIN_PASSWORD` not set, or Supabase `settings` table has corrupted hash  
**Fix:** 
1. Add `ADMIN_PASSWORD=M0toG@rDuNh4` to Vercel
2. Or delete the `admin_password_hash` row from Supabase `settings` table

### Issue 3: Admin login works but file uploads fail
**Cause:** Missing `SUPABASE_SERVICE_ROLE_KEY`  
**Fix:** Same as Issue 1

### Issue 4: Orders not appearing in admin panel
**Cause:** RLS policies blocking reads  
**Fix:** Already fixed - admin panel uses service role API routes

---

## 🎯 Quick Verification

After deployment, test these critical flows:

1. **Admin Login** → `/admin-login` → Enter password → Should redirect to `/admin`
2. **View Orders** → `/admin/encomendas` → Should see all orders
3. **Upload Image** → `/admin/motos/novo` → Upload cover image → Should upload to Supabase Storage
4. **Create Order** → Add items to cart → Checkout → Should save to database

---

## 📞 Support

If issues persist after following this guide:
1. Check Vercel function logs
2. Check Supabase logs (Dashboard → Logs)
3. Verify all environment variables are set correctly (no typos)
4. Ensure you redeployed after adding variables

---

## ✅ Deployment Checklist

- [ ] All 5 environment variables added to Vercel
- [ ] Variables set for Production, Preview, and Development
- [ ] Redeployed after adding variables
- [ ] Admin login tested and working
- [ ] Orders page loads correctly
- [ ] File uploads work
- [ ] Email sending configured (optional)
