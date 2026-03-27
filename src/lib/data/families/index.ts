import fs from 'fs';
import path from 'path';

export function getFamilyBySlug(slug: string) {
  if (!slug) return null;

  try {
    // Leitura plana: procura diretamente pelo slug (ex: "piaggio-mp3.json") na raiz
    const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'families', `${slug.toLowerCase()}.json`);
    
    if (!fs.existsSync(filePath)) return null;
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Falha fatal a ler a Família ${slug}:`, error);
    return null;
  }
}