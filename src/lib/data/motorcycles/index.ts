// src/lib/data/motorcycles/index.ts

import { Motorcycle } from '@/types';
import piaggioMP3_310 from './piaggio/mp3/310_Euro_5.json';

// Importa os teus ficheiros JSON aqui


// O registo mestre de todas as motas do site
export const MOTORCYCLE_REGISTRY: Record<string, Motorcycle> = {
  "piaggio-mp3-310": piaggioMP3_310 as unknown as Motorcycle,
};

// Nova função: Devolve TODAS as motas para listar no Stand
export const getAllMotorcycles = (): Motorcycle[] => {
  return Object.values(MOTORCYCLE_REGISTRY);
};

// Nova função: Devolve APENAS a mota solicitada pelo slug (para a página de detalhe)
export const getMotorcycleBySlug = (slug: string): Motorcycle | undefined => {
  return MOTORCYCLE_REGISTRY[slug];
};