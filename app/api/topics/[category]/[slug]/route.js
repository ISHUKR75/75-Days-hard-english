// ============================================================
// API Route: Serve topic data by category and slug
// GET /api/topics/[category]/[slug]
// ============================================================

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const { category, slug } = params;
  
  try {
    // Map category to data directory
    const dataDir = path.join(process.cwd(), 'data', category);
    const filePath = path.join(dataDir, `${slug}.json`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Topic "${slug}" not found in category "${category}".` },
        { status: 404 }
      );
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Return with cache headers for performance
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching topic data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
