export interface LocationName {
  local: string;
  en: string;
  slug?: string;
}

export interface LocationParent {
  id: string;
  level: number;
  name: LocationName;
}

export interface Province {
  id: string;
  level: number;
  level_name: { local: string; en: string };
  name: LocationName;
  parent: LocationParent | null;
}

export interface District {
  id: string;
  level: number;
  name: LocationName;
  parent: LocationParent;
}

export interface Tehsil {
  id: string;
  level: number;
  name: LocationName;
  parent: LocationParent;
}

export interface LocationDataSet {
  provinces: Province[];
  districts: District[];
  tehsils: Tehsil[];
}

let cache: LocationDataSet | null = null;

export async function loadLocationData(): Promise<LocationDataSet> {
  if (cache) return cache;
  const res = await fetch('/api/location');
  if (!res.ok) throw new Error('Failed to load location data');
  cache = (await res.json()) as LocationDataSet;
  return cache;
}
