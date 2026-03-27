import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function downloadImagem(url, pasta, nome) {
  try {
    const resposta = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const buffer = Buffer.from(await resposta.arrayBuffer());
    if (!fs.existsSync(pasta)) fs.mkdirSync(pasta, { recursive: true });
    fs.writeFileSync(path.join(pasta, nome), buffer);
    return true;
  } catch (e) { return false; }
}

async function scraperVespaTotal() {
  console.log('🚀 A iniciar Robô de Extração Total (Cores + Abas + Hotspots)...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const aba = await context.newPage();

  const urlMota = 'https://www.vespa.com/pt_PT/models/gts/gts-125-4s4v-2024/';

  try {
    await aba.goto(urlMota, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // 1. Matar o Banner de Cookies (Cookiebot azul)
    try {
      await aba.locator('#onetrust-accept-btn-handler, button:has-text("Allow all cookies")').click({ timeout: 10000 });
      console.log('✅ Cookies aceites.');
    } catch (e) { console.log('ℹ️ Banner de cookies ignorado.'); }

    await aba.waitForTimeout(3000);

    // 2. Extração de Nome Robusta (textContent não falha se estiver tapado)
    const nomeMota = (await aba.locator('h1').first().textContent() || "Vespa GTS 125").trim();
    const slug = nomeMota.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const pastaBase = path.join(process.cwd(), 'public', 'images', 'motorcycles', 'Vespa', 'GTS', slug);
    console.log(`🏍️ Mota detetada: ${nomeMota}`);

    // 3. CAPTURAR CORES (Clica nas bolinhas e baixa as fotos)
    console.log('🎨 A extrair cores...');
    const coresArr = [];
    const bolinhas = await aba.locator('.color-swatch, .color-bullet, [class*="ColorDot"]').all();
    
    for (let i = 0; i < Math.min(bolinhas.length, 5); i++) {
      const nomeCor = await bolinhas[i].getAttribute('title') || `cor-${i}`;
      await bolinhas[i].click();
      await aba.waitForTimeout(2000); // Esperar transição da imagem

      const imgUrl = await aba.locator('img[src*="profile"], img[src*="range"]').first().getAttribute('src');
      const nomeImg = `perfil-${nomeCor.toLowerCase().replace(/\s+/g, '-')}.avif`;
      
      if (imgUrl) {
        await downloadImagem(imgUrl.startsWith('http') ? imgUrl : `https://www.vespa.com${imgUrl}`, pastaBase, nomeImg);
        coresArr.push({ name: nomeCor, hex: "#A0A0A0", image: `/images/motorcycles/Vespa/GTS/${slug}/${nomeImg}` });
      }
    }

    // 4. CAPTURAR RICH CONTENT (Elegante, Confortável...)
    console.log('📂 A extrair abas de design...');
    const sectionsArr = [];
    const botoesAbas = await aba.locator('.tabs-nav__item, .tab-link, [class*="TabButton"]').all();

    for (let i = 0; i < Math.min(botoesAbas.length, 3); i++) {
      await botoesAbas[i].click();
      await aba.waitForTimeout(1000);
      const titulo = await aba.locator('.tabs-content h3').nth(i).innerText().catch(() => "Destaque");
      const desc = await aba.locator('.tabs-content p').nth(i).innerText().catch(() => "");
      sectionsArr.push({ id: `sec-${i}`, type: "text_image", title: titulo, description: desc, reversed: i % 2 !== 0 });
    }

    // 5. CAPTURAR HOTSPOTS (As bolinhas +)
    console.log('🔘 A extrair Hotspots...');
    const hotspotsItems = [];
    const pontos = await aba.locator('.hotspot-item, .pin, [class*="Hotspot"]').all();
    
    for (let i = 0; i < pontos.length; i++) {
      // Calcular posição % aproximada
      const box = await pontos[i].boundingBox();
      const container = await aba.locator('.hotspot-wrapper, .main-image').first().boundingBox();
      
      if (box && container) {
        const x = Math.round(((box.x - container.x) / container.width) * 100);
        const y = Math.round(((box.y - container.y) / container.height) * 100);
        
        await pontos[i].hover().catch(() => {});
        const hTitle = await aba.locator('.hotspot-title').innerText().catch(() => "Ponto de Interesse");
        const hDesc = await aba.locator('.hotspot-description').innerText().catch(() => "Detalhe técnico da Vespa.");

        hotspotsItems.push({ x, y, title: hTitle, description: hDesc, image: `/images/motorcycles/Vespa/GTS/${slug}/hotspot-${i}.avif` });
      }
    }

    // 6. GERAR JSON FINAL (FORMATO 1:1)
    const jsonFinal = {
      id: slug,
      name: nomeMota,
      slug: slug,
      brand: "Vespa",
      year: 2024,
      price: 6299,
      mileage: 0,
      engine_cc: 125,
      horsepower: "14",
      max_torque: "12",
      segment: "Scooter",
      status: "available",
      is_featured: true,
      cover_image: coresArr[0]?.image || "",
      images: coresArr.map(c => c.image),
      rich_content: {
        hero: { tagline: "A verdadeira granturismo" },
        colors: coresArr,
        highlights: [
          { label: "Elegante", value: "", icon: "star" },
          { label: "Confortável", value: "", icon: "bike" },
          { label: "Tecnológica", value: "", icon: "settings" }
        ],
        sections: sectionsArr,
        hotspots: {
          image: coresArr[0]?.image || "",
          items: hotspotsItems
        }
      },
      technical_data: [
        { category: "Motor e Transmissão", items: { "Cilindrada": "125 cc", "Potência": "14 cv" } }
      ]
    };

    const caminhoJSON = path.join(process.cwd(), 'src', 'lib', 'data', 'motorcycles', `${slug}.json`);
    fs.writeFileSync(caminhoJSON, JSON.stringify(jsonFinal, null, 2));
    console.log(`\n✅ TUDO PRONTO! Ficheiro: ${slug}.json`);

  } catch (err) {
    console.error(`🔴 Erro fatal: ${err.message}`);
  } finally {
    await browser.close();
  }
}

scraperVespaTotal();