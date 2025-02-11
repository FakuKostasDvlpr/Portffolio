import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const project = await req.json()
    
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()

    if (error) throw error
    
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Error adding project' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching projects' }, { status: 500 })
  }
} 