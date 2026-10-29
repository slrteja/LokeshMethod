import { createClient } from '@supabase/supabase-js';

const NextResponse = {
  next: () => new Response(null, { headers: { 'x-middleware-next': '1' } }),
  redirect: (url: URL) => Response.redirect(url),
};

type MiddlewareRequest = {
  nextUrl: URL & { clone(): URL };
};

declare const process: {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  };
};

export async function middleware(req: MiddlewareRequest) {
  const res = NextResponse.next();
  const url = req.nextUrl.clone();

  // 1. Initialize Supabase instance inside the server execution ring
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 2. Fetch authenticated session status
  const { data: { session } } = await supabase.auth.getSession();

  // 3. Handle unprotected public pages cleanly
  if (!session) {
    if (
      url.pathname.startsWith('/admin-console') ||
      url.pathname.startsWith('/coach-console') ||
      url.pathname.startsWith('/client-portal')
    ) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    return res;
  }

  // 4. Extract role parameters to apply strict protection barriers
  const { data: profile } = await supabase
    .from('profiles')
    .select('system_role')
    .eq('id', session.user.id)
    .single();

  const role = profile?.system_role || 'client';

  // 5. Enforce role-locked access routing gates
  if (url.pathname.startsWith('/admin-console') && role !== 'admin') {
    url.pathname = `/${role}-console`; // Redirect coaches/clients away from root control
    if (role === 'client') url.pathname = '/client-portal';
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith('/coach-console') && role !== 'coach' && role !== 'admin') {
    url.pathname = '/client-portal';
    return NextResponse.redirect(url);
  }

  // Prevent logged-in accounts from looping back to empty login screens
  if (url.pathname === '/login') {
    url.pathname = role === 'client' ? '/client-portal' : `/${role}-console`;
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ['/admin-console/:path*', '/coach-console/:path*', '/client-portal/:path*', '/login'],
};