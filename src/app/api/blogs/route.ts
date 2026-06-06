import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import slugify from 'slugify';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    
    const db = getDb();
    let query = 'SELECT * FROM blogs WHERE 1=1';
    const params: any[] = [];

    if (published) {
      query += ' AND published = ?';
      params.push(parseInt(published));
    }

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC';

    const blogs = db.prepare(query).all(...params);
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error('Fetch blogs error:', error);
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
    const { title, excerpt, content, category, thumbnail, published } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    let slug = slugify(title, { lower: true, strict: true });
    
    const db = getDb();
    
    // Check if slug exists
    const existing = db.prepare('SELECT id FROM blogs WHERE slug = ?').get(slug);
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const insert = db.prepare(`
      INSERT INTO blogs (title, slug, excerpt, content, category, thumbnail, published)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      title,
      slug,
      excerpt || '',
      content,
      category || 'General',
      thumbnail || '',
      published ? 1 : 0
    );

    const newBlog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(result.lastInsertRowid);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Create blog error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
