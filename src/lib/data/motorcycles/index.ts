import fs from 'fs';
import path from 'path';
import { Motorcycle } from '@/types';

const motorcyclesDir = path.join(process.cwd(), 'src', 'lib', 'data', 'motorcycles');

/**
 * Procura recursivamente todos os ficheiros .json dentro de um diretório.
 */
function findAllJsonFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findAllJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Constrói o registo de motas dinamicamente a partir dos ficheiros JSON.
 * Usa o campo `slug` de cada JSON como chave do registo.
 */
function buildRegistry(): Record<string, Motorcycle> {
  const registry: Record<string, Motorcycle> = {};
  const jsonFiles = findAllJsonFiles(motorcyclesDir);

  for (const filePath of jsonFiles) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8').trim();

      // Ignorar ficheiros vazios ou sem conteúdo válido
      if (!fileContent) {
        console.warn(`⚠ JSON vazio, a ignorar: ${filePath}`);
        continue;
      }

      const data = JSON.parse(fileContent) as Motorcycle;

      if (data.slug) {
        registry[data.slug.toLowerCase()] = data;
      } else {
        console.warn(`⚠ JSON sem slug encontrado: ${filePath}`);
      }
    } catch (error) {
      console.error(`✖ Falha a ler JSON de mota (a ignorar): ${filePath}`, error);
    }
  }

  return registry;
}

export const MOTORCYCLE_REGISTRY: Record<string, Motorcycle> = buildRegistry();

export const getAllMotorcycles = (): Motorcycle[] => {
  return Object.values(MOTORCYCLE_REGISTRY);
};

export const getMotorcycleBySlug = (slug: string): Motorcycle | undefined => {
  return MOTORCYCLE_REGISTRY[slug.toLowerCase()];
};