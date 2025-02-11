export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
  admin: {
    pin: process.env.NEXT_PUBLIC_ADMIN_SECURITY_PIN,
  },
  adminPin: process.env.NEXT_PUBLIC_ADMIN_SECURITY_PIN || '',
} as const; 