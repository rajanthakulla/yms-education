import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published');
    
    const db = getDb();
    let query = 'SELECT * FROM testimonials WHERE 1=1';
    const params: any[] = [];

    if (published) {
      query += ' AND published = ?';
      params.push(parseInt(published));
    }

    query += ' ORDER BY created_at DESC';

    const testimonials = db.prepare(query).all(...params);
    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error('Fetch testimonials error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuth = await requireAuth(request);
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, program, university, quote, rating, photo, published } = body;

    if (!name || !quote) {
      return NextResponse.json({ error: 'Name and quote are required' }, { status: 400 });
    }

    const db = getDb();
    
    const insert = db.prepare(`
      INSERT INTO testimonials (name, program, university, quote, rating, photo, published)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      name,
      program || '',
      university || '',
      quote,
      rating || 5,
      photo || '',
      published ? 1 : 0
    );

    const newTestimonial = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(result.lastInsertRowid);
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error('Create testimonial error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
