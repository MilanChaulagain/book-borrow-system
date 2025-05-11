import {auth as middleware} from "@/auth";
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export default function auth(request: NextRequest) {
  return NextResponse.next()
}
