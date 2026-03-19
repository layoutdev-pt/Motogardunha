// src/lib/data/motorcycles/index.ts

import { Motorcycle } from '@/types';
import piaggioMP3_310 from './piaggio/mp3/310_Euro_5.json';
import piaggioMP3_310_Sport from './piaggio/MP3/310_Sport_Euro_5.json';
import piaggioMP3_510_Exclusive from './piaggio/MP3/530_Exclusive_Euro_5.json';

import piaggioBeverly_310 from './piaggio/Beverly/310_Euro_5.json';

// O registo mestre de todas as motas do site
export const MOTORCYCLE_REGISTRY: Record<string, Motorcycle> = {
  "piaggio-mp3-310": piaggioMP3_310 as unknown as Motorcycle,
  "piaggio-mp3-310-sport": piaggioMP3_310_Sport as unknown as Motorcycle,
  "piaggio-mp3-530-exclusive": piaggioMP3_510_Exclusive as unknown as Motorcycle,

  "piaggio-beverly-310": piaggioBeverly_310 as unknown as Motorcycle,
};

// Nova função: Devolve TODAS as motas para listar no Stand
export const getAllMotorcycles = (): Motorcycle[] => {
  return Object.values(MOTORCYCLE_REGISTRY);
};

// Nova função: Devolve APENAS a mota solicitada pelo slug (para a página de detalhe)
export const getMotorcycleBySlug = (slug: string): Motorcycle | undefined => {
  return MOTORCYCLE_REGISTRY[slug];
};