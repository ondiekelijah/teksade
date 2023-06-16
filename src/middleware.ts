//Why this file is important 
// Since the user's session is tracked in a cookie, we need to read this cookie and update it if necessary.
// In Next.js Server Components, you can read a cookie, but you can't write back to it. Middleware on the other hand, allow you to both read a write to cookies.
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Database } from './supabase/schema'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient<Database>({ req, res })
    await supabase.auth.getSession()
    return res
}