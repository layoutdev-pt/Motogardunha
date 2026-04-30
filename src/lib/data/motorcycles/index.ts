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

// GTS
import vespaGTS_125_super from './Vespa/GTS/125_super_euro_5.json';
import vespaGTS_310_super from './Vespa/GTS/310_Super_Euro_5.json';
import vespaGTS_125_superSport from './Vespa/GTS/Vespa_GTS_125_SuperSport_Euro_5.json';
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

// SR
import apriliaSR_125 from './Aprilia/SR/sr_125.json';
import apriliaSR_GT_125 from './Aprilia/SR/sr_gt_125.json';
import apriliaSR_GT_Replica_125 from './Aprilia/SR/sr_gt_replica_125.json';
import apriliaSR_GT_Sport_125 from './Aprilia/SR/sr_gt_sport_125.json';

// SX
import apriliaSX_125 from './Aprilia/SX/SX_125.json';

// SXR
import apriliaSXR_50 from './Aprilia/SXR/SXR_50.json';

// TUAREG
import apriliaTuareg_660 from './Aprilia/Tuareg/Tuareg_660.json';
import apriliaTuareg_Rally_660 from './Aprilia/Tuareg/Tuareg_Rally_660.json';

// TUONO
import apriliaTuono_125 from './Aprilia/Tuono/Tuono_125.json';
import apriliaTuono_457 from './Aprilia/Tuono/Tuono_457.json';
import apriliaTuono_660_Factory from './Aprilia/Tuono/Tuono_660_Factory.json';
import apriliaTuono_660_Factory_35kw from './Aprilia/Tuono/Tuono_660_Factory_35kW.json';
import apriliaTuono_V4_1100 from './Aprilia/Tuono/Tuono_V4_1100.json';
import apriliaTuono_V4_Factory_1100 from './Aprilia/Tuono/Tuono_V4_Factory_1100.json';

// ==========================================
// MOTO GUZZI
// ==========================================

// Stelvio
import motoGuzziStelvio_1000 from './Motoguzzi/Stelvio/Stelvio_1000.json';
import motoGuzziStelvio_PFF_1000 from './Motoguzzi/Stelvio/Stelvio_PFF_Rider_Assistance_Solution_1000.json';
import motoGuzziStelvio_Duecento_Tributo_1000 from './Motoguzzi/Stelvio/Stelvio_Duecento_Tributo_1000.json';

// V100
import motoGuzziV100_Mandello_1000 from './Motoguzzi/V100/V100_Mandello_1000.json';
import motoGuzziV100_Mandello_S_1000_2022 from './Motoguzzi/V100/V100_Mandello_S_1000_2022.json';
import motoGuzziV100_Mandello_Aviazione_Navale_1000 from './Motoguzzi/V100/V100_Mandello_Aviazione_Navale_1000.json';
import motoGuzziV100_Mandello_S_1000_2025 from './Motoguzzi/V100/V100_Mandello_S_1000_2025.json';

// V85
import motoGuzziV85_Strada_850 from './Motoguzzi/V85/V85_Strada_850.json';
import motoGuzziV85_TT_850 from './Motoguzzi/V85/V85_TT_850.json';
import motoGuzziV85_TT_Travel_850 from './Motoguzzi/V85/V85_TT_Travel_850.json';

// V7
import motoGuzziV7_Special_850_2023 from './Motoguzzi/V7/V7_Special_850_2023.json';
import motoGuzziV7_Special_850_2025 from './Motoguzzi/V7/V7_Special_850_2025.json';
import motoGuzziV7_Special_Edition_850 from './Motoguzzi/V7/V7_Special_Edition_850.json';
import motoGuzziV7_Sport_850 from './Motoguzzi/V7/V7_Sport_850.json';
import motoGuzziV7_Stone_850_2021 from './Motoguzzi/V7/V7_Stone_850_2021.json';
import motoGuzziV7_Stone_850_2025 from './Motoguzzi/V7/V7_Stone_850_2025.json';
import motoGuzziV7_Stone_Ten_850 from './Motoguzzi/V7/V7_Stone_Ten_850.json';
import motoGuzziV7_Stone_Corsa_850 from './Motoguzzi/V7/V7_Stone_Corsa_850.json';

// ==========================================
// MORBIDELLI
// ==========================================

// TRAIL
import morbidelliT1002VX from './Morbidelli/TRAIL/T1002VX.json';
import morbidelliT502X from './Morbidelli/TRAIL/T502X.json';
import morbidelliT352X from './Morbidelli/TRAIL/T352X.json';
import morbidelliT125X from './Morbidelli/TRAIL/T125X.json';

// Street Fighter
import morbidelliF352 from './Morbidelli/Street_Fighter/F352.json';
import morbidelliF125 from './Morbidelli/Street_Fighter/F125.json';

// Cruisers
import morbidelliC1002V from './Morbidelli/Cruisers/C1002V.json';

// Retro Naked
import morbidelliNR125X from './Morbidelli/Retro_Naked/NR125X.json';

// Naked
import morbidelliN300 from './Morbidelli/Naked/N300.json';
import morbidelliM502N from './Morbidelli/Naked/M502N.json';

// Scooters
import morbidelliSC300 from './Morbidelli/Scooters/SC300.json';
import morbidelliSC125 from './Morbidelli/Scooters/SC125.json';
import morbidelliSC125LX from './Morbidelli/Scooters/SC125LX.json';
import morbidelliSC125RE from './Morbidelli/Scooters/SC125RE.json';

// ==========================================
// KAWASAKI
// ==========================================

// Ninja
import kawasakiNinja_e1_ABS from './Kawasaki/Ninja/e-1_ABS.json';
import kawasakiNinja_500 from './Kawasaki/Ninja/500.json';
import kawasakiNinja_500_SE_ABS from './Kawasaki/Ninja/500_se_abs.json';
import kawasakiNinja_500_KRT_Edition from './Kawasaki/Ninja/500_krt_edition.json';
import kawasakiNinja_500_SE_KRT_Edition_ABS from './Kawasaki/Ninja/500_se_krt_edition_abs.json';
import kawasakiNinja_650 from './Kawasaki/Ninja/650.json';
import kawasakiNinja_650_KRT_Edition_ABS from './Kawasaki/Ninja/650_krt_edition_abs.json';
import kawasakiNinja_7_Hybrid_ABS from './Kawasaki/Ninja/7_hybrid_abs.json';
import kawasakiNinja_1100SX_ABS from './Kawasaki/Ninja/1100sx_abs.json';
import kawasakiNinja_1100SX_SE_ABS from './Kawasaki/Ninja/1100sx_se_abs.json';
import kawasakiNinja_ZX4R_ABS from './Kawasaki/Ninja/zx-4r_abs.json';
import kawasakiNinja_ZX4RR_ABS from './Kawasaki/Ninja/zx-4rr_abs.json';
import kawasakiNinja_ZX4RR_KRT_Edition_ABS from './Kawasaki/Ninja/zx-4rr_krt_edition_abs.json';
import kawasakiNinja_ZX6R from './Kawasaki/Ninja/zx-6r.json';
import kawasakiNinja_ZX6R_KRT_Edition from './Kawasaki/Ninja/zx-6r_krt_edition.json';
import kawasakiNinja_ZX10R from './Kawasaki/Ninja/zx-10r.json';
import kawasakiNinja_ZX10RR_ABS from './Kawasaki/Ninja/zx-10rr_abs.json';
import kawasakiNinja_ZX10R_KRT_Edition from './Kawasaki/Ninja/zx-10r_krt_edition.json';
import kawasakiNinja_ZX14R from './Kawasaki/Ninja/zx-14r.json';
import kawasakiNinja_H2_SX_SE_ABS from './Kawasaki/Ninja/h2_sx_se_abs.json';
import kawasakiNinja_H2_ABS from './Kawasaki/Ninja/h2_abs.json';
import kawasakiNinja_H2_Carbon_ABS from './Kawasaki/Ninja/h2_carbon_abs.json';
import kawasakiNinja_H2R_ABS from './Kawasaki/Ninja/h2r_abs.json';

// Z
import kawasakiZ_125_Pro from './Kawasaki/Z/z125_pro.json';
import kawasakiZ_e1_ABS from './Kawasaki/Z/z_e-1_abs.json';
import kawasakiZ_500_ABS from './Kawasaki/Z/z500_abs.json';
import kawasakiZ_500_SE_ABS from './Kawasaki/Z/z500_se_abs.json';
import kawasakiZ_650_S_ABS from './Kawasaki/Z/z650_s_abs.json';
import kawasakiZ_650 from './Kawasaki/Z/z650.json';
import kawasakiZ_7_Hybrid_ABS from './Kawasaki/Z/z7_hybrid_abs.json';
import kawasakiZ_900_ABS from './Kawasaki/Z/z900_abs.json';
import kawasakiZ_900_SE_ABS from './Kawasaki/Z/z900_se_abs.json';
import kawasakiZ_1100_SE_ABS from './Kawasaki/Z/z1100_se_abs.json';
import kawasakiZ_650RS_ABS from './Kawasaki/Z/z650rs_abs.json';
import kawasakiZ_900RS_ABS from './Kawasaki/Z/z900rs_abs.json';
import kawasakiZ_900RS_Cafe_ABS from './Kawasaki/Z/z900rs_cafe_abs.json';
import kawasakiZ_900RS_SE_ABS from './Kawasaki/Z/z900rs_se_abs.json';
import kawasakiZ_H2_SE_ABS from './Kawasaki/Z/h2_se_abs.json';

// Versys
import kawasakiVersys_X_300_ABS from './Kawasaki/Versys/x_300_abs.json';
import kawasakiVersys_650_LT_ABS from './Kawasaki/Versys/650_lt_abs.json';
import kawasakiVersys_1100_SE_LT_ABS from './Kawasaki/Versys/1100_se_lt_abs.json';

// W
import kawasakiW_230_ABS from './Kawasaki/W/230_abs.json';
import kawasakiW_800_ABS from './Kawasaki/W/800_abs.json';

// Eliminator
import kawasakiEliminator from './Kawasaki/Eliminator/eliminator.json';
import kawasakiEliminator_SE_ABS from './Kawasaki/Eliminator/eliminator_se_abs.json';

// Vulcan
import kawasakiVulcan_S from './Kawasaki/Vulcan/s.json';
import kawasakiVulcan_S_Cafe_ABS from './Kawasaki/Vulcan/s_cafe_abs.json';
import kawasakiVulcan_900_Classic from './Kawasaki/Vulcan/900_classic.json';
import kawasakiVulcan_900Custom from './Kawasaki/Vulcan/900_custom.json';
import kawasakiVulcan_900_Classic_LT from './Kawasaki/Vulcan/900_Classic_Lt.json';
import kawasakiVulcan_1700Vaquero_ABS from './Kawasaki/Vulcan/1700_vaquero_abs.json';
import kawasakiVulcan_1700Voyager_ABS from './Kawasaki/Vulcan/1700_voyager_abs.json';

// KLE
import kawasakiKLE_500_ABS from './Kawasaki/Kle/500_abs.json';
import kawasakiKLE_500_SE_ABS from './Kawasaki/Kle/500_se_abs.json';

// KLR
import kawasakiKLR_650 from './Kawasaki/KLR/650.json';
import kawasakiKLR_650_S from './Kawasaki/KLR/650_s.json';
import kawasakiKLR_650_Adventure_ABS from './Kawasaki/KLR/650_adventure_abs.json';

// KLX
import kawasakiKLX_110R from './Kawasaki/KLX/110r.json';
import kawasakiKLX_110R_L from './Kawasaki/KLX/110r_l.json';
import kawasakiKLX_140R from './Kawasaki/KLX/140r.json';
import kawasakiKLX_140R_F from './Kawasaki/KLX/140r_f.json';
import kawasakiKLX_230R from './Kawasaki/KLX/230r.json';
import kawasakiKLX_230R_S from './Kawasaki/KLX/230r_s.json';
import kawasakiKLX_300R from './Kawasaki/KLX/300r.json';
import kawasakiKLX_230_S from './Kawasaki/KLX/230_s.json';
import kawasakiKLX_230_Sherpa_S_ABS from './Kawasaki/KLX/230_sherpa_s_abs.json';
import kawasakiKLX_230_DF_ABS from './Kawasaki/KLX/230_df_abs.json';
import kawasakiKLX_300 from './Kawasaki/KLX/300.json';
import kawasakiKLX_230SM_ABS from './Kawasaki/KLX/230sm_abs.json';
import kawasakiKLX_300SM from './Kawasaki/KLX/300sm.json';

// KX
import kawasakiKX_65 from './Kawasaki/KX/65.json';
import kawasakiKX_85 from './Kawasaki/KX/85.json';
import kawasakiKX_85_L from './Kawasaki/KX/85_l.json';
import kawasakiKX_112 from './Kawasaki/KX/112.json';
import kawasakiKX_250 from './Kawasaki/KX/250.json';
import kawasakiKX_450 from './Kawasaki/KX/450.json';
import kawasakiKX_450SR from './Kawasaki/KX/450sr.json';
import kawasakiKX_250X from './Kawasaki/KX/250x.json';
import kawasakiKX_450X from './Kawasaki/KX/450x.json';

// ==========================================
// TM MOTO
// ==========================================

// TM MX
import tmMoto_85_JUNIOR_2T from './Tm_Motos/Tm_MX/85_JUNIOR_2T.json';
import tmMoto_125_ES_2T from './Tm_Motos/Tm_MX/125_ES_2T.json';
import tmMoto_125_ES_2T_CORSE from './Tm_Motos/Tm_MX/125_ES_2T_CORSE.json';
import tmMoto_125_ES_FI_2T from './Tm_Motos/Tm_MX/125_ES_FI_2T.json';
import tmMoto_250_ES_2T_CORSE from './Tm_Motos/Tm_MX/250_ES_2T_CORSE.json';
import tmMoto_250_ES_2T from './Tm_Motos/Tm_MX/250_ES_2T.json';
import tmMoto_250_ES_FI_2T from './Tm_Motos/Tm_MX/250_ES_FI_2T.json';
import tmMoto_250_ES_FI_4T_CORSE from './Tm_Motos/Tm_MX/250_ES_FI_4T_CORSE.json';
import tmMoto_250_ES_FI_4T from './Tm_Motos/Tm_MX/250_ES_FI_4T.json';
import tmMoto_300_ES_2T_CORSE from './Tm_Motos/Tm_MX/300_ES_2T_CORSE.json';
import tmMoto_300_ES_2T from './Tm_Motos/Tm_MX/300_ES_2T.json';
import tmMoto_300_ES_FI_2T from './Tm_Motos/Tm_MX/300_ES_FI_2T.json';
import tmMoto_300_ES_FI_4T_CORSE from './Tm_Motos/Tm_MX/300_ES_FI_4T_CORSE.json';
import tmMoto_300_ES_FI_4T from './Tm_Motos/Tm_MX/300_ES_FI_4T.json';
import tmMoto_450_ES_FI_4T_CORSE from './Tm_Motos/Tm_MX/450_ES_FI_4T_CORSE.json';
import tmMoto_450_ES_FI_4T from './Tm_Motos/Tm_MX/450_ES_FI_4T.json';

// TM EN
import tmMoto_EN_125_ES_FI_2T from './Tm_Motos/Tm_EN/125_ES_FI_2T.json';
import tmMoto_EN_125_ES_FI_2T_CORSE from './Tm_Motos/Tm_EN/125_ES_FI_2T_CORSE.json';
import tmMoto_EN_250_ES_FI_2T from './Tm_Motos/Tm_EN/250_ES_FI_2T.json';
import tmMoto_EN_250_ES_FI_2T_CORSE from './Tm_Motos/Tm_EN/250_ES_FI_2T_CORSE.json';
import tmMoto_EN_250_ES_FI_4T from './Tm_Motos/Tm_EN/250_ES_FI_4T.json';
import tmMoto_EN_250_ES_FI_4T_CORSE from './Tm_Motos/Tm_EN/250_ES_FI_4T_CORSE.json';
import tmMoto_EN_300_ES_FI_2T from './Tm_Motos/Tm_EN/300_ES_FI_2T.json';
import tmMoto_EN_300_ES_FI_2T_CORSE from './Tm_Motos/Tm_EN/300_ES_FI_2T_CORSE.json';
import tmMoto_EN_300_ES_FI_4T from './Tm_Motos/Tm_EN/300_ES_FI_4T.json';
import tmMoto_EN_300_ES_FI_4T_CORSE from './Tm_Motos/Tm_EN/300_ES_FI_4T_CORSE.json';
import tmMoto_EN_450_ES_FI_4T from './Tm_Motos/Tm_EN/450_ES_FI_4T.json';
import tmMoto_EN_450_ES_FI_4T_CORSE from './Tm_Motos/Tm_EN/450_ES_FI_4T_CORSE.json';

// TM SMR
import tmMoto_SMR_85_JUNIOR_2T from './Tm_Motos/Tm_SMR/SMX_85_JUNIOR_2T.json';
import tmMoto_SMR_125_ES_FI_2T from './Tm_Motos/Tm_SMR/125_ES_FI_2T.json';
import tmMoto_SMR_300_ES_FI_2T from './Tm_Motos/Tm_SMR/300_ES_FI_2T.json';
import tmMoto_SMR_450_ES_FI_4T from './Tm_Motos/Tm_SMR/450_ES_FI_4T.json';
import tmMoto_SMR_SMK_450_ES_FI_4T from './Tm_Motos/Tm_SMR/SMK_450_ES_FI_4T.json';

// ==========================================
// KYMCO
// ==========================================

// Scooters 50cc
import kymcoAgility_50 from './Kymco/Scooters_50CC/AGILITY_50.json';
import kymcoLike_50 from './Kymco/Scooters_50CC/LIKE_50.json';
import kymcoSuper8_R from './Kymco/Scooters_50CC/SUPER_8_R.json';

// Scooters 125cc
import kymcoAgility_125_16 from './Kymco/Scooters_125CC/AGILITY_125_16.json';
import kymcoLike_125 from './Kymco/Scooters_125CC/LIKE_125.json';
import kymcoDink_R_125 from './Kymco/Scooters_125CC/DINK_R_125.json';
import kymcoXTownCity_125 from './Kymco/Scooters_125CC/X_TOWN_CITY_125.json';
import kymcoDowntown_125 from './Kymco/Scooters_125CC/DOWNTOWN_125.json';
import kymcoDTX_125_TCS from './Kymco/Scooters_125CC/DTX_125_TCS.json';
import kymcoAgility_125_16_Delivery from './Kymco/Scooters_125CC/AGILITY_125_16_DELIVERY.json';
import kymcoMicare_125 from './Kymco/Scooters_125CC/MICARE_125.json';
import kymcoSkyTown_125 from './Kymco/Scooters_125CC/SKY_TOWN_125.json';

// Maxiscooters
import kymcoAK550_Premium from './Kymco/Maxiscooters/AK550_PREMIUM.json';
import kymcoCV3 from './Kymco/Maxiscooters/CV3.json';
import kymcoDowntown_350_TCS from './Kymco/Maxiscooters/DOWNTOWN_350_TCS.json';
import kymcoXcitingVS_400 from './Kymco/Maxiscooters/XCITING_VS_400.json';
import kymcoXcitingVS_400_Limited_Edition from './Kymco/Maxiscooters/XCITING_VS_400_LIMITED_EDITION.json';

// ==========================================
// LINHAI
// ==========================================

// Scooter
import linhaiBuck_125 from './Linhai/Scooter/BUCK_125.json';
import linhaiBuck_125_Urban from './Linhai/Scooter/BUCK_125_Urban.json';
import linhaiBuck_125_ADV from './Linhai/Scooter/BUCK_125_ADV.json';

// ==========================================
// SHERCO
// ==========================================

// Enduro
import sherco125_SE_Factory_2026 from './Sherco/Enduro/125_SE_Factory_2026.json';
import sherco250_SE_Factory_2026 from './Sherco/Enduro/250_SE_Factory_2026.json';
import sherco250_SE_XTREM_2026 from './Sherco/Enduro/250_SE_XTREM_2026.json';
import sherco250_SEF_Factory_2026 from './Sherco/Enduro/250_SEF_Factory_2026.json';
import sherco300_SE_Factory_2026 from './Sherco/Enduro/300_SE_Factory_2026.json';
import sherco300_SE_XTREM_2026 from './Sherco/Enduro/300_SE_XTREM_2026.json';
import sherco300_SEF_Factory_2026 from './Sherco/Enduro/300_SEF_Factory_2026.json';
import sherco450_SEF_Factory_2026 from './Sherco/Enduro/450_SEF_Factory_2026.json';
import sherco500_SEF_Factory_2026 from './Sherco/Enduro/500_SEF_Factory_2026.json';

// Trial
import sherco125_TY_LONG_RIDE from './Sherco/Trial/125_TY_LONG_RIDE.json';
import sherco125_TY_LIMITED_EDITION from './Sherco/Trial/125_TY_LIMITED_EDITION.json';
import sherco125_ST_F_FACTORY_2025 from './Sherco/Trial/125_ST_F_FACTORY_2025.json';
import sherco250_ST_F_FACTORY_2025 from './Sherco/Trial/250_ST_F_FACTORY_2025.json';
import sherco300_ST_F_FACTORY_2025 from './Sherco/Trial/300_ST_F_FACTORY_2025.json';

// Street
import sherco125_HRD_SE_Factory_RS from './Sherco/Street/125_HRD_SE_Factory_RS.json';
import sherco125_HRD_SM_Factory_RS from './Sherco/Street/125_HRD_SM_Factory_RS.json';
import sherco125_HRD_SM_Blackmoon_RS from './Sherco/Street/125_HRD_SM_Blackmoon_RS.json';
import sherco125_2T_SM_FACTORY_2026 from './Sherco/Street/125_2T_SM_FACTORY_2026.json';
import sherco500_4T_SM_FACTORY_2025 from './Sherco/Street/500_4T_SM_FACTORY_2025.json';

// Scooter
import shercoEASY_50_Mate_Blue from './Sherco/Scooter/EASY_50_Mate_Blue.json';
import shercoEASY_50_Mate_Black from './Sherco/Scooter/EASY_50_Mate_Black.json';
import shercoFACTORY_50_Factory_Blue from './Sherco/Scooter/FACTORY_50_Factory_Blue.json';
import shercoFACTORY_50_Nardo_Grey from './Sherco/Scooter/FACTORY_50_Nardo_Grey.json';
import shercoFACTORY_50_Blackmoon from './Sherco/Scooter/FACTORY_50_Blackmoon.json';
import shercoCITYCORP_125_Nardo_Grey from './Sherco/Scooter/CITYCORP_125_Nardo_Grey.json';
import shercoCITYCORP_125_Mate_Black from './Sherco/Scooter/CITYCORP_125_Mate_Black.json';

// 50
import sherco50_SM_R_FACTORY from './Sherco/50/50_SM_R_FACTORY.json';
import sherco50_SM_RS_FACTORY from './Sherco/50/50_SM_RS_FACTORY.json';
import sherco50_SM_R_SILVER from './Sherco/50/50_SM_R_SILVER.json';
import sherco50_SM_RS_Silver from './Sherco/50/50_SM_RS_Silver.json';
import sherco50_SM_R_BLACK_MOON from './Sherco/50/50_SM_R_BLACK_MOON.json';
import sherco50_SM_RS_BLACK_MOON from './Sherco/50/50_SM_RS_BLACK_MOON.json';
import sherco50_SE_R_FACTORY from './Sherco/50/50_SE_R_FACTORY.json';
import sherco50_SE_RS_FACTORY from './Sherco/50/50_SE_RS_FACTORY.json';

export const MOTORCYCLE_REGISTRY: Record<string, Motorcycle> = {
  // PIAGGIO
  'piaggio-mp3-310': piaggioMP3_310 as unknown as Motorcycle,
  'piaggio-mp3-310-sport': piaggioMP3_310_Sport as unknown as Motorcycle,
  'piaggio-mp3-530-exclusive': piaggioMP3_530_Exclusive as unknown as Motorcycle,
  'piaggio-beverly-310': piaggioBeverly_310 as unknown as Motorcycle,
  'piaggio-beverly-310-s': piaggioBeverly_310_s as unknown as Motorcycle,
  'piaggio-beverly-400': piaggio_Beverly_400 as unknown as Motorcycle,
  'piaggio-beverly-s-400': piaggioBeverly_400_S as unknown as Motorcycle,
  'piaggio-medley-125-s-euro-5-plus': piaggioMedley_125_S as unknown as Motorcycle,
  'piaggio-liberty-125-euro-5': piaggioLiberty_125 as unknown as Motorcycle,
  'piaggio-liberty-125-s-euro-5': piaggioLiberty_125_S as unknown as Motorcycle,

  // VESPA
  'vespa-gts-125-super-euro-5': vespaGTS_125_super as unknown as Motorcycle,
  'vespa-gts-310-super-euro-5': vespaGTS_310_super as unknown as Motorcycle,
  'vespa-gts-125-supersport-euro-5': vespaGTS_125_superSport as unknown as Motorcycle,

  // APRILIA
  'aprilia-rs-125': apriliaRS_125 as unknown as Motorcycle,
  'aprilia-rs-457': apriliaRS_457 as unknown as Motorcycle,
  'aprilia-rs-660': apriliaRS_660 as unknown as Motorcycle,
  'aprilia-rs-660-35kw': apriliaRS_660_35kW as unknown as Motorcycle,
  'aprilia-rs-660-extrema': apriliaRS_660_Extrema as unknown as Motorcycle,
  'aprilia-rs-660-factory-660': apriliaRS_660_Factory_660 as unknown as Motorcycle,
  'aprilia-rs-660-factory-660-35kw': apriliaRS_660_Factory_660_35kW as unknown as Motorcycle,
  'aprilia-rsv4-1100': apriliaRSV4_1100 as unknown as Motorcycle,
  'aprilia-rsv4-factory-1100': apriliaRSV4_Factory_1100 as unknown as Motorcycle,
  'aprilia-rx-125': apriliaRX_125 as unknown as Motorcycle,
  'aprilia-sr-125': apriliaSR_125 as unknown as Motorcycle,
  'aprilia-sr-gt-125': apriliaSR_GT_125 as unknown as Motorcycle,
  'aprilia-sr-gt-replica-125': apriliaSR_GT_Replica_125 as unknown as Motorcycle,
  'aprilia-sr-gt-sport-125': apriliaSR_GT_Sport_125 as unknown as Motorcycle,
  'aprilia-sx-125': apriliaSX_125 as unknown as Motorcycle,
  'aprilia-sxr-50': apriliaSXR_50 as unknown as Motorcycle,
  'aprilia-tuareg-660': apriliaTuareg_660 as unknown as Motorcycle,
  'aprilia-tuareg-rally-660': apriliaTuareg_Rally_660 as unknown as Motorcycle,
  'aprilia-tuono-125': apriliaTuono_125 as unknown as Motorcycle,
  'aprilia-tuono-457': apriliaTuono_457 as unknown as Motorcycle,
  'aprilia-tuono-660-factory': apriliaTuono_660_Factory as unknown as Motorcycle,
  'aprilia-tuono-660-factory-35kw': apriliaTuono_660_Factory_35kw as unknown as Motorcycle,
  'aprilia-tuono-v4-1100': apriliaTuono_V4_1100 as unknown as Motorcycle,
  'aprilia-tuono-v4-factory-1100': apriliaTuono_V4_Factory_1100 as unknown as Motorcycle,

  // MOTO GUZZI
  'moto-guzzi-stelvio-1000': motoGuzziStelvio_1000 as unknown as Motorcycle,
  'moto-guzzi-stelvio-pff-rider-assistance-solution-1000': motoGuzziStelvio_PFF_1000 as unknown as Motorcycle,
  'moto-guzzi-stelvio-duecento-tributo-1000': motoGuzziStelvio_Duecento_Tributo_1000 as unknown as Motorcycle,
  'moto-guzzi-v100-mandello-1000': motoGuzziV100_Mandello_1000 as unknown as Motorcycle,
  'moto-guzzi-v100-mandello-s-1000-2022': motoGuzziV100_Mandello_S_1000_2022 as unknown as Motorcycle,
  'moto-guzzi-v100-mandello-aviazione-navale-1000': motoGuzziV100_Mandello_Aviazione_Navale_1000 as unknown as Motorcycle,
  'moto-guzzi-v100-mandello-s-1000-2025': motoGuzziV100_Mandello_S_1000_2025 as unknown as Motorcycle,
  'moto-guzzi-v85-strada-850': motoGuzziV85_Strada_850 as unknown as Motorcycle,
  'moto-guzzi-v85-tt-850': motoGuzziV85_TT_850 as unknown as Motorcycle,
  'moto-guzzi-v85-tt-travel-850': motoGuzziV85_TT_Travel_850 as unknown as Motorcycle,
  'moto-guzzi-v7-special-850-2023': motoGuzziV7_Special_850_2023 as unknown as Motorcycle,
  'moto-guzzi-v7-special-850-2025': motoGuzziV7_Special_850_2025 as unknown as Motorcycle,
  'moto-guzzi-v7-special-edition-850': motoGuzziV7_Special_Edition_850 as unknown as Motorcycle,
  'moto-guzzi-v7-sport-850': motoGuzziV7_Sport_850 as unknown as Motorcycle,
  'moto-guzzi-v7-stone-850-2021': motoGuzziV7_Stone_850_2021 as unknown as Motorcycle,
  'moto-guzzi-v7-stone-850-2025': motoGuzziV7_Stone_850_2025 as unknown as Motorcycle,
  'moto-guzzi-v7-stone-ten-850': motoGuzziV7_Stone_Ten_850 as unknown as Motorcycle,
  'moto-guzzi-v7-stone-corsa-850': motoGuzziV7_Stone_Corsa_850 as unknown as Motorcycle,

  // MORBIDELLI
  'morbidelli-t1002vx': morbidelliT1002VX as unknown as Motorcycle,
  'morbidelli-t502x': morbidelliT502X as unknown as Motorcycle,
  'morbidelli-t352x': morbidelliT352X as unknown as Motorcycle,
  'morbidelli-t125x': morbidelliT125X as unknown as Motorcycle,
  'morbidelli-f352': morbidelliF352 as unknown as Motorcycle,
  'morbidelli-f125': morbidelliF125 as unknown as Motorcycle,
  'morbidelli-c1002v': morbidelliC1002V as unknown as Motorcycle,
  'morbidelli-nr125x': morbidelliNR125X as unknown as Motorcycle,
  'morbidelli-n300': morbidelliN300 as unknown as Motorcycle,
  'morbidelli-m502n': morbidelliM502N as unknown as Motorcycle,
  'morbidelli-sc300': morbidelliSC300 as unknown as Motorcycle,
  'morbidelli-sc125': morbidelliSC125 as unknown as Motorcycle,
  'morbidelli-sc125lx': morbidelliSC125LX as unknown as Motorcycle,
  'morbidelli-sc125re': morbidelliSC125RE as unknown as Motorcycle,

  // KAWASAKI
  "kawasaki-ninja-e1": kawasakiNinja_e1_ABS as unknown as Motorcycle,
  "kawasaki-ninja-500": kawasakiNinja_500 as unknown as Motorcycle,
  "kawasaki-ninja-500-se-abs": kawasakiNinja_500_SE_ABS as unknown as Motorcycle,
  "kawasaki-ninja-500-krt-edition": kawasakiNinja_500_KRT_Edition as unknown as Motorcycle,
  "kawasaki-ninja-500-se-krt-edition-abs": kawasakiNinja_500_SE_KRT_Edition_ABS as unknown as Motorcycle,
  "kawasaki-ninja-650": kawasakiNinja_650 as unknown as Motorcycle,
  "kawasaki-ninja-650-krt-edition-abs": kawasakiNinja_650_KRT_Edition_ABS as unknown as Motorcycle,
  "kawasaki-ninja-7-hybrid-abs": kawasakiNinja_7_Hybrid_ABS as unknown as Motorcycle,
  "kawasaki-ninja-1100sx-abs": kawasakiNinja_1100SX_ABS as unknown as Motorcycle,
  "kawasaki-ninja-1100sx-se-abs": kawasakiNinja_1100SX_SE_ABS as unknown as Motorcycle,
  "kawasaki-ninja-zx-4r-abs": kawasakiNinja_ZX4R_ABS as unknown as Motorcycle,
  "kawasaki-ninja-zx-4rr-abs": kawasakiNinja_ZX4RR_ABS as unknown as Motorcycle,
  "kawasaki-ninja-zx-4rr-krt-edition-abs": kawasakiNinja_ZX4RR_KRT_Edition_ABS as unknown as Motorcycle,
  "kawasaki-ninja-zx-6r": kawasakiNinja_ZX6R as unknown as Motorcycle,
  "kawasaki-ninja-zx-6r-krt-edition": kawasakiNinja_ZX6R_KRT_Edition as unknown as Motorcycle,
  "kawasaki-ninja-zx-10r": kawasakiNinja_ZX10R as unknown as Motorcycle,
  "kawasaki-ninja-zx-10rr-abs": kawasakiNinja_ZX10RR_ABS as unknown as Motorcycle,
  "kawasaki-ninja-zx-10r-krt": kawasakiNinja_ZX10R_KRT_Edition as unknown as Motorcycle,
  "kawasaki-ninja-zx-14r": kawasakiNinja_ZX14R as unknown as Motorcycle,
  "kawasaki-ninja-h2-sx-se-abs": kawasakiNinja_H2_SX_SE_ABS as unknown as Motorcycle,
  "kawasaki-ninja-h2-abs": kawasakiNinja_H2_ABS as unknown as Motorcycle,
  "kawasaki-ninja-h2-carbon-abs": kawasakiNinja_H2_Carbon_ABS as unknown as Motorcycle,
  "kawasaki-ninja-h2r-abs": kawasakiNinja_H2R_ABS as unknown as Motorcycle,
  "kawasaki-z-125-pro": kawasakiZ_125_Pro as unknown as Motorcycle,
  "kawasaki-z-e-1-abs": kawasakiZ_e1_ABS as unknown as Motorcycle,
  "kawasaki-z-500-abs": kawasakiZ_500_ABS as unknown as Motorcycle,
  "kawasaki-z-500-se-abs": kawasakiZ_500_SE_ABS as unknown as Motorcycle,
  "kawasaki-z-650-s-abs": kawasakiZ_650_S_ABS as unknown as Motorcycle,
  "kawasaki-z-650": kawasakiZ_650 as unknown as Motorcycle,
  "kawasaki-z-7-hybrid-abs": kawasakiZ_7_Hybrid_ABS as unknown as Motorcycle,
  "kawasaki-z-900-abs": kawasakiZ_900_ABS as unknown as Motorcycle,
  "kawasaki-z-900-se-abs": kawasakiZ_900_SE_ABS as unknown as Motorcycle,
  "kawasaki-z-1100-se-abs": kawasakiZ_1100_SE_ABS as unknown as Motorcycle,
  "kawasaki-z-650rs-abs": kawasakiZ_650RS_ABS as unknown as Motorcycle,
  "kawasaki-z-900rs-abs": kawasakiZ_900RS_ABS as unknown as Motorcycle,
  "kawasaki-z-900rs-cafe-abs": kawasakiZ_900RS_Cafe_ABS as unknown as Motorcycle,
  "kawasaki-z-900rs-se-abs": kawasakiZ_900RS_SE_ABS as unknown as Motorcycle,
  "kawasaki-z-h2-se-abs": kawasakiZ_H2_SE_ABS as unknown as Motorcycle,
  "kawasaki-versys-x-300-abs": kawasakiVersys_X_300_ABS as unknown as Motorcycle,
  "kawasaki-versys-650-lt-abs": kawasakiVersys_650_LT_ABS as unknown as Motorcycle,
  "kawasaki-versys-1100-se-lt-abs": kawasakiVersys_1100_SE_LT_ABS as unknown as Motorcycle,
  "kawasaki-w-230-abs": kawasakiW_230_ABS as unknown as Motorcycle,
  "kawasaki-w-800-abs": kawasakiW_800_ABS as unknown as Motorcycle,
  "kawasaki-eliminator": kawasakiEliminator as unknown as Motorcycle,
  "kawasaki-eliminator-se-abs": kawasakiEliminator_SE_ABS as unknown as Motorcycle,
  "kawasaki-vulcan-s": kawasakiVulcan_S as unknown as Motorcycle,
  "kawasaki-vulcan-s-cafe-abs": kawasakiVulcan_S_Cafe_ABS as unknown as Motorcycle,
  "kawasaki-vulcan-900-classic": kawasakiVulcan_900_Classic as unknown as Motorcycle,
  "kawasaki-vulcan-900-custom": kawasakiVulcan_900Custom as unknown as Motorcycle,
  "kawasaki-vulcan-900-classic-lt": kawasakiVulcan_900_Classic_LT as unknown as Motorcycle,
  "kawasaki-vulcan-1700-vaquero-abs": kawasakiVulcan_1700Vaquero_ABS as unknown as Motorcycle,
  "kawasaki-vulcan-1700-voyager-abs": kawasakiVulcan_1700Voyager_ABS as unknown as Motorcycle,
  "kawasaki-kle-500-abs": kawasakiKLE_500_ABS as unknown as Motorcycle,
  "kawasaki-kle-500-se-abs": kawasakiKLE_500_SE_ABS as unknown as Motorcycle,
  "kawasaki-klr-650": kawasakiKLR_650 as unknown as Motorcycle,
  "kawasaki-klr-650-s": kawasakiKLR_650_S as unknown as Motorcycle,
  "kawasaki-klr-650-adventure-abs": kawasakiKLR_650_Adventure_ABS as unknown as Motorcycle,
  "kawasaki-klx-110r": kawasakiKLX_110R as unknown as Motorcycle,
  "kawasaki-klx-110r-l": kawasakiKLX_110R_L as unknown as Motorcycle,
  "kawasaki-klx-140r": kawasakiKLX_140R as unknown as Motorcycle,
  "kawasaki-klx-140r-f": kawasakiKLX_140R_F as unknown as Motorcycle,
  "kawasaki-klx-230r": kawasakiKLX_230R as unknown as Motorcycle,
  "kawasaki-klx-230r-s": kawasakiKLX_230R_S as unknown as Motorcycle,
  "kawasaki-klx-300r": kawasakiKLX_300R as unknown as Motorcycle,
  "kawasaki-klx-230-s": kawasakiKLX_230_S as unknown as Motorcycle,
  "kawasaki-klx-230-sherpa-s-abs": kawasakiKLX_230_Sherpa_S_ABS as unknown as Motorcycle,
  "kawasaki-klx-230-df-abs": kawasakiKLX_230_DF_ABS as unknown as Motorcycle,
  "kawasaki-klx-300": kawasakiKLX_300 as unknown as Motorcycle,
  "kawasaki-klx-230sm-abs": kawasakiKLX_230SM_ABS as unknown as Motorcycle,
  "kawasaki-klx-300sm": kawasakiKLX_300SM as unknown as Motorcycle,
  "kawasaki-kx-65": kawasakiKX_65 as unknown as Motorcycle,
  "kawasaki-kx-85": kawasakiKX_85 as unknown as Motorcycle,
  "kawasaki-kx-85-l": kawasakiKX_85_L as unknown as Motorcycle,
  "kawasaki-kx-112": kawasakiKX_112 as unknown as Motorcycle,
  "kawasaki-kx-250": kawasakiKX_250 as unknown as Motorcycle,
  "kawasaki-kx-450": kawasakiKX_450 as unknown as Motorcycle,
  "kawasaki-kx-450sr": kawasakiKX_450SR as unknown as Motorcycle,
  "kawasaki-kx-250x": kawasakiKX_250X as unknown as Motorcycle,
  "kawasaki-kx-450x": kawasakiKX_450X as unknown as Motorcycle,

  // TM MOTO
  'mx-85-junior-2t': tmMoto_85_JUNIOR_2T as unknown as Motorcycle,
  'mx-125-es-2t': tmMoto_125_ES_2T as unknown as Motorcycle,
  'mx-125-es-2t-corse': tmMoto_125_ES_2T_CORSE as unknown as Motorcycle,
  'mx-125-es-fi-2t': tmMoto_125_ES_FI_2T as unknown as Motorcycle,
  'mx-250-es-2t-corse': tmMoto_250_ES_2T_CORSE as unknown as Motorcycle,
  'mx-250-es-2t': tmMoto_250_ES_2T as unknown as Motorcycle,
  'mx-250-es-fi-2t': tmMoto_250_ES_FI_2T as unknown as Motorcycle,
  'mx-250-es-fi-4t-corse': tmMoto_250_ES_FI_4T_CORSE as unknown as Motorcycle,
  'mx-250-es-fi-4t': tmMoto_250_ES_FI_4T as unknown as Motorcycle,
  'mx-300-es-2t-corse': tmMoto_300_ES_2T_CORSE as unknown as Motorcycle,
  'mx-300-es-2t': tmMoto_300_ES_2T as unknown as Motorcycle,
  'mx-300-es-fi-2t': tmMoto_300_ES_FI_2T as unknown as Motorcycle,
  'mx-300-es-fi-4t-corse': tmMoto_300_ES_FI_4T_CORSE as unknown as Motorcycle,
  'mx-300-es-fi-4t': tmMoto_300_ES_FI_4T as unknown as Motorcycle,
  'mx-450-es-fi-4t-corse': tmMoto_450_ES_FI_4T_CORSE as unknown as Motorcycle,
  'mx-450-es-fi-4t': tmMoto_450_ES_FI_4T as unknown as Motorcycle,
  'en-125-es-fi-2t': tmMoto_EN_125_ES_FI_2T as unknown as Motorcycle,
  'en-125-es-fi-2t-corse': tmMoto_EN_125_ES_FI_2T_CORSE as unknown as Motorcycle,
  'en-250-es-fi-2t': tmMoto_EN_250_ES_FI_2T as unknown as Motorcycle,
  'en-250-es-fi-2t-corse': tmMoto_EN_250_ES_FI_2T_CORSE as unknown as Motorcycle,
  'en-250-es-fi-4t': tmMoto_EN_250_ES_FI_4T as unknown as Motorcycle,
  'en-250-es-fi-4t-corse': tmMoto_EN_250_ES_FI_4T_CORSE as unknown as Motorcycle,
  'en-300-es-fi-2t': tmMoto_EN_300_ES_FI_2T as unknown as Motorcycle,
  'en-300-es-fi-2t-corse': tmMoto_EN_300_ES_FI_2T_CORSE as unknown as Motorcycle,
  'en-300-es-fi-4t': tmMoto_EN_300_ES_FI_4T as unknown as Motorcycle,
  'en-300-es-fi-4t-corse': tmMoto_EN_300_ES_FI_4T_CORSE as unknown as Motorcycle,
  'en-450-es-fi-4t': tmMoto_EN_450_ES_FI_4T as unknown as Motorcycle,
  'en-450-es-fi-4t-corse': tmMoto_EN_450_ES_FI_4T_CORSE as unknown as Motorcycle,
  'smx-85-junior-2t': tmMoto_SMR_85_JUNIOR_2T as unknown as Motorcycle,
  'smr-125-es-fi-2t': tmMoto_SMR_125_ES_FI_2T as unknown as Motorcycle,
  'smr-300-es-fi-2t': tmMoto_SMR_300_ES_FI_2T as unknown as Motorcycle,
  'smr-450-es-fi-4t': tmMoto_SMR_450_ES_FI_4T as unknown as Motorcycle,
  'smk-450-es-fi-4t': tmMoto_SMR_SMK_450_ES_FI_4T as unknown as Motorcycle,

  // KYMCO
  'kymco-agility-50': kymcoAgility_50 as unknown as Motorcycle,
  'kymco-like-50': kymcoLike_50 as unknown as Motorcycle,
  'kymco-super-8-r': kymcoSuper8_R as unknown as Motorcycle,
  'kymco-agility-125-16': kymcoAgility_125_16 as unknown as Motorcycle,
  'kymco-like-125': kymcoLike_125 as unknown as Motorcycle,
  'kymco-dink-r-125': kymcoDink_R_125 as unknown as Motorcycle,
  'kymco-x-town-city-125': kymcoXTownCity_125 as unknown as Motorcycle,
  'kymco-downtown-125': kymcoDowntown_125 as unknown as Motorcycle,
  'kymco-dtx-125-tcs': kymcoDTX_125_TCS as unknown as Motorcycle,
  'kymco-agility-125-16-delivery': kymcoAgility_125_16_Delivery as unknown as Motorcycle,
  'kymco-micare-125': kymcoMicare_125 as unknown as Motorcycle,
  'kymco-sky-town-125': kymcoSkyTown_125 as unknown as Motorcycle,
  'kymco-ak-550-premium': kymcoAK550_Premium as unknown as Motorcycle,
  'kymco-cv3': kymcoCV3 as unknown as Motorcycle,
  'kymco-downtown-350-tcs': kymcoDowntown_350_TCS as unknown as Motorcycle,
  'kymco-xciting-vs-400': kymcoXcitingVS_400 as unknown as Motorcycle,
  'kymco-xciting-vs-400-limited-edition': kymcoXcitingVS_400_Limited_Edition as unknown as Motorcycle,

  // LINHAI
  'linhai-buck-125': linhaiBuck_125 as unknown as Motorcycle,
  'linhai-buck-125-urban': linhaiBuck_125_Urban as unknown as Motorcycle,
  'linhai-buck-125-adv': linhaiBuck_125_ADV as unknown as Motorcycle,

  // SHERCO
  'sherco-125-se-factory-2026': sherco125_SE_Factory_2026 as unknown as Motorcycle,
  'sherco-250-se-factory-2026': sherco250_SE_Factory_2026 as unknown as Motorcycle,
  'sherco-250-se-xtrem-2026': sherco250_SE_XTREM_2026 as unknown as Motorcycle,
  'sherco-250-sef-factory-2026': sherco250_SEF_Factory_2026 as unknown as Motorcycle,
  'sherco-300-se-factory-2026': sherco300_SE_Factory_2026 as unknown as Motorcycle,
  'sherco-300-se-xtrem-2026': sherco300_SE_XTREM_2026 as unknown as Motorcycle,
  'sherco-300-sef-factory-2026': sherco300_SEF_Factory_2026 as unknown as Motorcycle,
  'sherco-450-sef-factory-2026': sherco450_SEF_Factory_2026 as unknown as Motorcycle,
  'sherco-500-sef-factory-2026': sherco500_SEF_Factory_2026 as unknown as Motorcycle,
  'sherco-125-ty-long-ride': sherco125_TY_LONG_RIDE as unknown as Motorcycle,
  'sherco-125-ty-limited-edition': sherco125_TY_LIMITED_EDITION as unknown as Motorcycle,
  'sherco-125-st-f-factory-2025': sherco125_ST_F_FACTORY_2025 as unknown as Motorcycle,
  'sherco-250-st-f-factory-2025': sherco250_ST_F_FACTORY_2025 as unknown as Motorcycle,
  'sherco-300-st-f-factory-2025': sherco300_ST_F_FACTORY_2025 as unknown as Motorcycle,
  'sherco-125-hrd-se-factory-rs': sherco125_HRD_SE_Factory_RS as unknown as Motorcycle,
  'sherco-125-hrd-sm-factory-rs': sherco125_HRD_SM_Factory_RS as unknown as Motorcycle,
  'sherco-125-hrd-sm-blackmoon-rs': sherco125_HRD_SM_Blackmoon_RS as unknown as Motorcycle,
  'sherco-125-2t-sm-factory-2026': sherco125_2T_SM_FACTORY_2026 as unknown as Motorcycle,
  'sherco-500-4t-sm-factory-2025': sherco500_4T_SM_FACTORY_2025 as unknown as Motorcycle,
  'sherco-easy-50-mate-blue': shercoEASY_50_Mate_Blue as unknown as Motorcycle,
  'sherco-easy-50-mate-black': shercoEASY_50_Mate_Black as unknown as Motorcycle,
  'sherco-factory-50-factory-blue': shercoFACTORY_50_Factory_Blue as unknown as Motorcycle,
  'sherco-factory-50-nardo-grey': shercoFACTORY_50_Nardo_Grey as unknown as Motorcycle,
  'sherco-factory-50-blackmoon': shercoFACTORY_50_Blackmoon as unknown as Motorcycle,
  'sherco-citycorp-125-nardo-grey': shercoCITYCORP_125_Nardo_Grey as unknown as Motorcycle,
  'sherco-citycorp-125-mate-black': shercoCITYCORP_125_Mate_Black as unknown as Motorcycle,
  'sherco-50-sm-r-factory': sherco50_SM_R_FACTORY as unknown as Motorcycle,
  'sherco-50-sm-rs-factory': sherco50_SM_RS_FACTORY as unknown as Motorcycle,
  'sherco-50-sm-r-silver': sherco50_SM_R_SILVER as unknown as Motorcycle,
  'sherco-50-sm-rs-silver': sherco50_SM_RS_Silver as unknown as Motorcycle,
  'sherco-50-sm-r-black-moon': sherco50_SM_R_BLACK_MOON as unknown as Motorcycle,
  'sherco-50-sm-rs-black-moon': sherco50_SM_RS_BLACK_MOON as unknown as Motorcycle,
  'sherco-50-se-r-factory': sherco50_SE_R_FACTORY as unknown as Motorcycle,
  'sherco-50-se-rs-factory': sherco50_SE_RS_FACTORY as unknown as Motorcycle,
};
export const MOTORCYCLE_REGISTRY: Record<string, Motorcycle> = buildRegistry();

export const getAllMotorcycles = (): Motorcycle[] => {
  return Object.values(MOTORCYCLE_REGISTRY);
};

export const getMotorcycleBySlug = (slug: string): Motorcycle | undefined => {
  return MOTORCYCLE_REGISTRY[slug.toLowerCase()];
};