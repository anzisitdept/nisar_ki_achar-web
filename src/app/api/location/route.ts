import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Province, District, Tehsil } from '@/lib/locationData';

export const dynamic = 'force-static';

let cached: { provinces: Province[]; districts: District[]; tehsils: Tehsil[] } | null = null;

async function readJson<T>(relativePath: string): Promise<T> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'pak', relativePath);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw) as T;
}

export async function GET() {
  if (!cached) {
    const [provinces, districts, tehsils] = await Promise.all([
      readJson<Province[]>('provinces.json'),
      readJson<District[]>('districts.json'),
      readJson<Tehsil[]>('tehsils.json'),
    ]);
    cached = { provinces, districts, tehsils };
  }
  return NextResponse.json(cached);
}
