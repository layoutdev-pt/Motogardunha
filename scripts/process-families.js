const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const inquirer = require('inquirer');
const os = require('os');
const { exec } = require('child_process');

const PROJECT_ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');

const DOWNLOADS_FOLDER = path.join(os.homedir(), 'Downloads', 'F_EDC_Motogardunha_scripts_input_images');
const LOCAL_FOLDER = path.join(__dirname, 'input_images');

let INPUT_DIR = LOCAL_FOLDER;

if (fs.existsSync(DOWNLOADS_FOLDER) && fs.readdirSync(DOWNLOADS_FOLDER).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).length > 0) {
  INPUT_DIR = DOWNLOADS_FOLDER;
  console.log(`[SISTEMA] Leitura dinâmica ativada: ${INPUT_DIR}`);
} else {
  if (!fs.existsSync(LOCAL_FOLDER)) fs.mkdirSync(LOCAL_FOLDER);
}

const files = fs.readdirSync(INPUT_DIR).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

if (files.length === 0) {
  console.log('FALHA: Nenhuma imagem encontrada na pasta.');
  process.exit(1);
}

function openImage(filePath) {
  let command = process.platform === 'win32' ? `start "" "${filePath}"` : process.platform === 'darwin' ? `open "${filePath}"` : `xdg-open "${filePath}"`;
  exec(command, () => {});
}

async function run() {
  console.log('--- PROCESSAMENTO DE IMAGENS: LANDING PAGE DE FAMÍLIA ---');
  
  const { brand, familyName, slug } = await inquirer.prompt([
    { type: 'input', name: 'brand', message: 'Marca (ex: Piaggio):', default: 'Piaggio' },
    { type: 'input', name: 'familyName', message: 'Nome da Família (ex: Medley):' },
    { type: 'input', name: 'slug', message: 'Slug da Família (ex: piaggio-medley):' }
  ]);

  const relativeImgPath = `/images/families/${brand.toLowerCase()}/${familyName.toLowerCase()}/`;
  const absoluteImgPath = path.join(PUBLIC_DIR, 'images', 'families', brand.toLowerCase(), familyName.toLowerCase());
  
  if (!fs.existsSync(absoluteImgPath)) fs.mkdirSync(absoluteImgPath, { recursive: true });

  console.log(`\nDestino: ${relativeImgPath}\n`);

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    openImage(inputPath);

    const { category } = await inquirer.prompt([
      {
        type: 'list',
        name: 'category',
        message: `Tipologia do bloco visual: (${file})`,
        choices: [
          { name: 'Hero (Banner Principal Topo)', value: 'hero' },
          { name: 'Feature Standard (Texto + Imagem lateral)', value: 'feature' },
          { name: 'Feature Full-Width (Blocos de cor Piaggio 1)', value: 'fullwidth' },
          { name: 'Hotspot (Bolinha interativa na mota)', value: 'hotspot' },
          { name: 'Accordion/Tab (Specs Aprilia/Moto Guzzi)', value: 'accordion' },
          { name: 'Galeria Mosaico (Grid)', value: 'gallery' },
          { name: 'Slider Lifestyle (Carrossel Horizontal)', value: 'slider' },
          { name: 'Lixo (Ignorar e Apagar)', value: 'skip' }
        ]
      }
    ]);

    if (category === 'skip') {
        fs.unlinkSync(inputPath);
        continue;
    }

    let finalName = '';

    if (category === 'hero') {
      finalName = `${slug}-hero.avif`;
    } else if (category === 'feature') {
      const { suffix } = await inquirer.prompt([{ type: 'input', name: 'suffix', message: 'Identificador (ex: design, motor):' }]);
      finalName = `feature-${suffix}.avif`;
    } else if (category === 'fullwidth') {
      const { suffix } = await inquirer.prompt([{ type: 'input', name: 'suffix', message: 'Identificador do bloco de cor (ex: agilidade, silenciosa):' }]);
      finalName = `block-${suffix}.avif`;
    } else if (category === 'hotspot') {
      const { suffix } = await inquirer.prompt([{ type: 'input', name: 'suffix', message: 'Identificador do Hotspot (ex: painel, travao):' }]);
      finalName = `hotspot-${suffix}.avif`;
    } else if (category === 'accordion') {
      const { suffix } = await inquirer.prompt([{ type: 'input', name: 'suffix', message: 'Identificador da tab (ex: aprc, aerodinamica):' }]);
      finalName = `tab-${suffix}.avif`;
    } else if (['gallery', 'slider'].includes(category)) {
      const { num } = await inquirer.prompt([{ type: 'number', name: 'num', message: 'Número sequencial (1,2,3...):' }]);
      finalName = category === 'gallery' ? `galeria-${num}.avif` : `lifestyle-${num}.avif`;
    }

    const outputPath = path.join(absoluteImgPath, finalName);

    try {
      await sharp(inputPath).avif({ quality: 82 }).toFile(outputPath);
      console.log(`> Guardado: ${finalName}`);
      fs.unlinkSync(inputPath); 
    } catch (e) {
      console.log(`[ERRO] Falha na conversão de ${file}: ${e.message}`);
    }
  }

  console.log(`\nOPERAÇÃO CONCLUÍDA. Assets em: ${relativeImgPath}`);
}

run();