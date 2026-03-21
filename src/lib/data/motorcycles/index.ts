import { Motorcycle } from '@/types';

// PIAGGIO

// MP3
import piaggioMP3_310 from './piaggio/mp3/310_Euro_5.json';
import piaggioMP3_310_Sport from './piaggio/MP3/310_Sport_Euro_5.json';
import piaggioMP3_510_Exclusive from './piaggio/MP3/530_Exclusive_Euro_5.json';

// Beverly
import piaggioBeverly_310 from './piaggio/Beverly/310_Euro_5.json';
import piaggioBeverly_310_s from './piaggio/Beverly/310_S_Euro_5.json';
import piaggio_Beverly_400 from './piaggio/Beverly/400_Euro_5.json';
import piaggioBeverly_400_S from './piaggio/Beverly/400_S_Euro_5.json';


// Vespa
// GTS

import vespaGTS_125 from './vespa/gts/125_Euro5.json';


// Medley
import piaggioMedley_125_S from './piaggio/Medley/125_S_Euro5.json';

// Liberty
import piaggioLiberty_125 from './piaggio/Liberty/125_Euro5.json';
import piaggioLiberty_125_S from './piaggio/Liberty/125_S_Euro5.json'; // CORRIGIDO AQUI!

// O registo mestre de todas as motas do site
export const MOTORCYCLE_REGISTRY: Record<string, Motorcycle> = {
  // PIAGGIO
  
  // MP3
  "piaggio-mp3-310": piaggioMP3_310 as unknown as Motorcycle,
  "piaggio-mp3-310-sport": piaggioMP3_310_Sport as unknown as Motorcycle,
  "piaggio-mp3-530-exclusive": piaggioMP3_510_Exclusive as unknown as Motorcycle,
  
  // Beverly
  "piaggio-beverly-310": piaggioBeverly_310 as unknown as Motorcycle,
  "piaggio-beverly-310-s": piaggioBeverly_310_s as unknown as Motorcycle,
  "piaggio-beverly-400": piaggio_Beverly_400 as unknown as Motorcycle,
  "piaggio-beverly-s-400": piaggioBeverly_400_S as unknown as Motorcycle,
  
  // Medley
  "piaggio-medley-125-s-euro-5-plus": piaggioMedley_125_S as unknown as Motorcycle,

  // Liberty
  "piaggio-liberty-125-euro-5": piaggioLiberty_125 as unknown as Motorcycle,
  "piaggio-liberty-125-s-euro-5": piaggioLiberty_125_S as unknown as Motorcycle,



// Vespa
// GTS
  "vespa-gts-125": vespaGTS_125 as unknown as Motorcycle,
  
};
// Nova função: Devolve TODAS as motas para listar no Stand
export const getAllMotorcycles = (): Motorcycle[] => {
  return Object.values(MOTORCYCLE_REGISTRY);
};

// Nova função: Devolve APENAS a mota solicitada pelo slug (para a página de detalhe)
export const getMotorcycleBySlug = (slug: string): Motorcycle | undefined => {
  return MOTORCYCLE_REGISTRY[slug];
};