import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const day = resolvedParams.day;
  
  try {
    const filePath = path.join(process.cwd(), 'data', 'days', `day_${day}.json`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Data not found for this day' }, { status: 404 });
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching day data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
