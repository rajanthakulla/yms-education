import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';

let db: Database.Database | null = null;

export function getDb() {
  if (db) return db;

  const dbPath = path.join(process.cwd(), 'yms-education.db');
  db = new Database(dbPath);

  // Enable WAL mode for better performance
  db.pragma('journal_mode = WAL');

  // Create tables if they don't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      category TEXT DEFAULT 'General',
      thumbnail TEXT DEFAULT '',
      author TEXT DEFAULT 'YMS Education',
      published INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      program TEXT DEFAULT '',
      university TEXT DEFAULT '',
      quote TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      photo TEXT DEFAULT '',
      published INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Check if admin exists
  const adminExists = db.prepare('SELECT count(*) as count FROM admins WHERE username = ?').get('admin') as { count: number };

  if (adminExists.count === 0) {
    // Seed default admin: admin / yms2024admin
    const hash = bcrypt.hashSync('yms2024admin', 10);
    db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run('admin', hash);
  }

  // Check if we need to seed blogs
  const blogsExist = db.prepare('SELECT count(*) as count FROM blogs').get() as { count: number };
  if (blogsExist.count === 0) {
    const insertBlog = db.prepare(`
      INSERT INTO blogs (title, slug, excerpt, content, category, thumbnail, published)
      VALUES (?, ?, ?, ?, ?, ?, 1)
    `);

    insertBlog.run(
      'A Comprehensive Guide to the JLPT',
      'comprehensive-guide-to-jlpt',
      'Everything you need to know about the Japanese Language Proficiency Test.',
      '<p>The Japanese Language Proficiency Test (JLPT) is the standard test for evaluating and certifying Japanese language proficiency of non-native speakers.</p><h2>Levels</h2><p>It has 5 levels: N1, N2, N3, N4, and N5. The easiest level is N5 and the most difficult level is N1.</p>',
      'Language Learning',
      ''
    );
    insertBlog.run(
      'Top 5 Reasons to Study in Japan',
      'top-5-reasons-study-japan',
      'Discover why Japan is becoming one of the most popular study destinations.',
      '<p>Japan offers a unique blend of traditional culture and modern technology.</p><ol><li>High quality education</li><li>Safe environment</li><li>Rich culture</li><li>Job opportunities</li><li>Delicious food</li></ol>',
      'Study Tips',
      ''
    );
  }

  // Check if we need to seed testimonials
  const testimonialsExist = db.prepare('SELECT count(*) as count FROM testimonials').get() as { count: number };
  if (testimonialsExist.count === 0) {
    const insertTestimonial = db.prepare(`
      INSERT INTO testimonials (name, program, university, quote, rating, published)
      VALUES (?, ?, ?, ?, ?, 1)
    `);

    insertTestimonial.run(
      'Ram Bahadur',
      'Language Program',
      'YAMASA Institute',
      'YMS Education helped me achieve my dream of studying in Japan. Their language classes are top-notch and the visa processing was so smooth.',
      5
    );
    insertTestimonial.run(
      'Sita Thapa',
      'Undergraduate',
      'Tokyo University',
      'The counselors at YMS are very honest and supportive. They guided me through every step of the process.',
      5
    );
  }

  return db;
}
