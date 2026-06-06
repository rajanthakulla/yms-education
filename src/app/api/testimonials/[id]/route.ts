import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    const testimonial = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(id);
    
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await requireAuth(request);
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, program, university, quote, rating, photo, published } = body;

    const db = getDb();
    
    const update = db.prepare(`
      UPDATE testimonials 
      SET name = ?, program = ?, university = ?, quote = ?, rating = ?, 
          photo = ?, published = ?
      WHERE id = ?
    `);

    update.run(
      name,
      program || '',
      university || '',
      quote,
      rating || 5,
      photo || '',
      published ? 1 : 0,
      id
    );

    const updatedTestimonial = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(id);
    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await requireAuth(request);
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const db = getDb();
    
    db.prepare('DELETE FROM testimonials WHERE id = ?').run(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
