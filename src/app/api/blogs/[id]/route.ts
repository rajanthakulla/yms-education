import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import slugify from 'slugify';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    const blog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json(blog);
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
    const { title, excerpt, content, category, thumbnail, published } = body;

    const db = getDb();
    
    // Check if blog exists
    const existing = db.prepare('SELECT id FROM blogs WHERE id = ?').get(id);
    if (!existing) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    let slug = slugify(title, { lower: true, strict: true });
    
    // Check if slug exists for OTHER blogs
    const slugExists = db.prepare('SELECT id FROM blogs WHERE slug = ? AND id != ?').get(slug, id);
    if (slugExists) {
      slug = `${slug}-${Date.now()}`;
    }

    const update = db.prepare(`
      UPDATE blogs 
      SET title = ?, slug = ?, excerpt = ?, content = ?, category = ?, 
          thumbnail = ?, published = ?, updated_at = datetime('now')
      WHERE id = ?
    `);

    update.run(
      title,
      slug,
      excerpt || '',
      content,
      category || 'General',
      thumbnail || '',
      published ? 1 : 0,
      id
    );

    const updatedBlog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);
    return NextResponse.json(updatedBlog);
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
    
    db.prepare('DELETE FROM blogs WHERE id = ?').run(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
