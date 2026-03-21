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
  console.log('FALHA: Nenhuma imagem encontrada. Fez o download via ImageAssistant?');
  process.exit(1);
}

function openImage(filePath) {
  let command = process.platform === 'win32' ? `start "" "${filePath}"` : process.platform === 'darwin' ? `open "${filePath}"` : `xdg-open "${filePath}"`;
  exec(command, () => {});
}

async function run() {
  console.log('--- PROCESSAMENTO DE IMAGENS ---');
  
  const { brand, modelFamily, folderName } = await inquirer.prompt([
    { type: 'input', name: 'brand', message: 'Marca (ex: Piaggio):', default: 'Piaggio' },
    { type: 'input', name: 'modelFamily', message: 'Família (ex: Beverly):' },
    { type: 'input', name: 'folderName', message: 'Pasta da Versão (ex: 400_Euro5):' }
  ]);

  const relativeImgPath = `/images/motorcycles/${brand}/${modelFamily}/${folderName}/`;
  const absoluteImgPath = path.join(PUBLIC_DIR, 'images', 'motorcycles', brand, modelFamily, folderName);
  
  if (!fs.existsSync(absoluteImgPath)) fs.mkdirSync(absoluteImgPath, { recursive: true });

  console.log(`\nDestino configurado: ${relativeImgPath}\n`);

  // A cache do prefixo é declarada aqui, fora do loop
  let cachedSlug = '';

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    openImage(inputPath);

    // Esta é a variável que apagaste por acidente
    const { category } = await inquirer.prompt([
      {
        type: 'list',
        name: 'category',
        message: `O que é esta imagem? (${file})`,
        choices: [
          { name: 'Cor/Perfil', value: 'profile' },
          { name: 'Feature (Destaque)', value: 'feature' },
          { name: 'Hotspot (Bolinha)', value: 'hotspot' },
          { name: 'Galeria Mosaico', value: 'galeria' },
          { name: 'Galeria Lifestyle', value: 'lifestyle' },
          { name: 'Lixo (Ignorar e Apagar)', value: 'skip' }
        ]
      }
    ]);

    if (category === 'skip') {
        fs.unlinkSync(inputPath);
        continue;
    }

    let finalName = '';

    if (category === 'profile') {
      if (!cachedSlug) {
        const { slug } = await inquirer.prompt([{ type: 'input', name: 'slug', message: 'Prefixo principal (ex: vespa-gts-125):' }]);
        cachedSlug = slug;
      }
      const { color } = await inquirer.prompt([{ type: 'input', name: 'color', message: 'Cor em inglês (ex: white):' }]);
      finalName = `${cachedSlug}-${color}-profile.avif`;
    } else if (['feature', 'hotspot'].includes(category)) {
      const { suffix } = await inquirer.prompt([{ type: 'input', name: 'suffix', message: 'Tag (ex: motor, led):' }]);
      finalName = `${category}-${suffix}.avif`;
    } else if (['galeria', 'lifestyle'].includes(category)) {
      const { num } = await inquirer.prompt([{ type: 'number', name: 'num', message: 'Número da imagem:' }]);
      finalName = `${category}-${num}.avif`;
    }

    const outputPath = path.join(absoluteImgPath, finalName);

    try {
      await sharp(inputPath).avif({ quality: 80 }).toFile(outputPath);
      console.log(`> Guardado: ${finalName}`);
      fs.unlinkSync(inputPath); 
    } catch (e) {
      console.log(`[ERRO] ${file}: ${e.message}`);
    }
  }

  console.log(`\nOPERAÇÃO CONCLUÍDA. Imagens otimizadas injetadas no projeto.`);
  console.log(`Pasta base: ${relativeImgPath}`);
}

run();