import fs from 'fs';
import path from 'path';

export function getFamilyBySlug(slug: string) {
  if (!slug) return null;

  try {
    const familiesDir = path.join(process.cwd(), 'src', 'lib', 'data', 'families');
    const targetFileName = `${slug.toLowerCase()}.json`;
    
    let filePath: string | null = null;
    
    // Function to search for the file in the families directory and its subdirectories
    function findFile(dir: string, fileToFind: string): string | null {
      if (!fs.existsSync(dir)) return null;
      
      let foundPath: string | null = null;
      
      // Try root first
      const rootPath = path.join(dir, fileToFind);
      if (fs.existsSync(rootPath) && fs.statSync(rootPath).isFile()) {
        return rootPath;
      }
      
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const subDirPath = path.join(dir, entry.name);
          const subFile = path.join(subDirPath, fileToFind);
          if (fs.existsSync(subFile)) {
             return subFile;
          }
        }
      }
      
      return null;
    }

    filePath = findFile(familiesDir, targetFileName);
    
    if (!filePath) return null;
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Falha fatal a ler a Família ${slug}:`, error);
    return null;
  }
}