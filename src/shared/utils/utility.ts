/**
 * Utilita pro převod textu na URL-friendly řetězec (slug)
 * @param text Vstupní text
 * @returns URL-friendly řetězec bez diakritiky, speciálních znaků a mezer
 */
import { OptionConditional } from '../types/wizard';

export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // odstranění diakritiky
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // mezery na pomlčky
    .replace(/[^\w-]+/g, '') // odstranění speciálních znaků
    .replace(/--+/g, '-'); // odstranění duplicitních pomlček
};

/**
 * Generuje ID pole na základě jeho popisku
 * @param label Popisek pole
 * @returns Vygenerované ID
 */
export const generateFieldId = (label: string): string => {
  const baseId = slugify(label);
  // V reálné aplikaci byste mohli ověřit unikátnost proti existujícím ID polí
  // Pro tento kontext je jednoduchý slugifikovaný popisek dostačující
  return baseId;
};

/**
 * Převádí systémové hodnoty polí na uživatelsky čitelné popisky
 * @param fieldId ID pole
 * @param value Systémová hodnota pole
 * @returns Uživatelsky čitelný popisek
 */
export const getFieldDisplayValue = (fieldId: string, value: any): string => {
  if (!value || value === '') {
    return null;
  }
  
  // Speciální zpracování pro pole address, které může být objekt
  if (fieldId === 'address' && typeof value === 'object' && value !== null) {
    return value.value || 'Neuvedeno';
  }

  // Mapování pro typy objektů
  const propertyTypeLabels: { [key: string]: string } = {
    'family-house': 'Rodinný dům',
    'apartment-building': 'Bytový dům',
    'commercial': 'Komerční objekt',
    'industrial': 'Průmyslový objekt'
  };

  // Mapování pro typy FVE systémů
  const fveTypeLabels: { [key: string]: string } = {
    'direct-consumption': 'Fotovoltaika na přímou spotřebu elektrické energie',
    'water-heating': 'Fotovoltaika na ohřev vody',
    'heat-pump': 'Fotovoltaika v kombinaci s tepelným čerpadlem',
    'battery': 'Fotovoltaika s bateriemi'
  };

  // Mapování pro typy tepelných čerpadel
  const heatPumpTypeLabels: { [key: string]: string } = {
    'air-water': 'Tepelné čerpadlo vzduch-voda',
    'ground-water': 'Tepelné čerpadlo země-voda (zemní kolektor)',
    'water-water': 'Tepelné čerpadlo voda-voda (studna)'
  };

  // Mapování pro kontaktní preference
  const contactPreferenceLabels: { [key: string]: string } = {
    'phone': 'Telefonicky',
    'email': 'E-mailem',
    'both': 'Telefonicky i e-mailem',
    'research-only': 'Nechci být kontaktován, jen si dělám průzkum'
  };

  // Mapování pro čas kontaktu
  const contactTimeLabels: { [key: string]: string } = {
    'morning': 'Ráno (8-12h)',
    'afternoon': 'Odpoledne (12-17h)',
    'evening': 'Večer (17-20h)',
    'weekend': 'Víkend'
  };

  // Mapování pro rozpočet
  const budgetLabels: { [key: string]: string } = {
    'under-200k': 'Do 200 000 Kč',
    '200k-400k': '200 000 - 400 000 Kč',
    '400k-600k': '400 000 - 600 000 Kč',
    '600k-800k': '600 000 - 800 000 Kč',
    '800k-1000k': '800 000 - 1 000 000 Kč',
    'over-1000k': 'Nad 1 000 000 Kč'
  };

  // Mapování pro timeline
  const timelineLabels: { [key: string]: string } = {
    'asap': 'Co nejdříve',
    '1-3months': '1-3 měsíce',
    '3-6months': '3-6 měsíců',
    '6-12months': '6-12 měsíců',
    'next-year': 'Příští rok',
    'flexible': 'Jsem flexibilní'
  };

  // Mapování pro klimatizace - stáří budovy
  const acBuildingAgeLabels: { [key: string]: string } = {
    'ac-new': 'Novostavba (do 5 let)',
    'ac-recent': '5-15 let',
    'ac-older': '15-30 let',
    'ac-old': 'Nad 30 let'
  };

  // Mapování pro klimatizace - výška stropů
  const acCeilingHeightLabels: { [key: string]: string } = {
    'ac-low': 'Nízké (do 2.5m)',
    'ac-standard': 'Standardní (2.5-3m)',
    'ac-high': 'Vysoké (nad 3m)'
  };

  // Mapování pro klimatizace - účel
  const acPurposeLabels: { [key: string]: string } = {
    'ac-cooling': 'Pouze chlazení',
    'ac-cooling-heating': 'Chlazení a vytápění',
    'ac-all-year': 'Celoroční použití (vytápění i chlazení)'
  };

  // Mapování pro klimatizace - místnosti
  const acRoomsLabels: { [key: string]: string } = {
    'ac-living-room': 'Obývací pokoj',
    'ac-bedroom': 'Ložnice',
    'ac-kitchen': 'Kuchyně',
    'ac-office': 'Pracovna/kancelář',
    'ac-children-room': 'Dětský pokoj',
    'ac-hall': 'Chodba/hala',
    'ac-meeting-room': 'Jednací místnost',
    'ac-production-area': 'Výrobní prostory',
    'ac-warehouse': 'Sklad',
    'ac-server-room': 'Serverovna',
    'ac-other': 'Jiná místnost'
  };

  // Mapování pro klimatizace - typ jednotek
  const acUnitsLabels: { [key: string]: string } = {
    'ac-split': 'Nástěnné split jednotky (pro jednotlivé místnosti)',
    'ac-multi-split': 'Multi-split (jedna venkovní, více vnitřních)',
    'ac-central': 'Centrální klimatizace (rozvody po celém objektu)',
    'ac-cassette': 'Kazetové jednotky (do podhledů)',
    'ac-ducted': 'Potrubní jednotky (skryté rozvody)',
    'ac-portable': 'Mobilní jednotky (bez instalace)',
    'ac-advice': 'Potřebuji poradit s výběrem'
  };

  // Mapování pro klimatizace - funkce
  const acFeaturesLabels: { [key: string]: string } = {
    'ac-low-noise': 'Tichý provoz',
    'ac-air-purification': 'Čištění vzduchu / filtrace',
    'ac-dehumidification': 'Odvlhčování',
    'ac-wifi': 'WiFi připojení / ovládání aplikací',
    'ac-energy-efficiency': 'Vysoká energetická účinnost',
    'ac-design': 'Designové provedení',
    'ac-inverter': 'Inverter technologie',
    'ac-heat-recovery': 'Rekuperace tepla'
  };

  // Mapování pro klimatizace - chytré funkce
  const acSmartFeaturesLabels: { [key: string]: string } = {
    'ac-app-control': 'Ovládání přes mobilní aplikaci',
    'ac-voice-control': 'Hlasové ovládání (Google, Alexa, Siri)',
    'ac-scheduling': 'Automatické plánování provozu',
    'ac-presence-detection': 'Detekce přítomnosti osob',
    'ac-remote-diagnostics': 'Vzdálená diagnostika',
    'ac-energy-monitoring': 'Monitoring spotřeby energie',
    'ac-geofencing': 'Geofencing (automatické zapnutí při příchodu)'
  };

  // Mapování pro klimatizace - energetická třída
  const acEfficiencyLabels: { [key: string]: string } = {
    'ac-a+++': 'A+++ (nejvyšší účinnost)',
    'ac-a++': 'A++',
    'ac-a+': 'A+',
    'ac-any': 'Nevím / není důležité'
  };

  // Mapování pro klimatizace - chladicí výkon
  const acCoolingPowerLabels: { [key: string]: string } = {
    'ac-cooling-low': 'Nízký (do 2.5 kW)',
    'ac-cooling-medium': 'Střední (2.5 - 5 kW)',
    'ac-cooling-high': 'Vysoký (5 - 10 kW)',
    'ac-cooling-very-high': 'Velmi vysoký (nad 10 kW)',
    'ac-cooling-unknown': 'Nevím, potřebuji poradit'
  };

  // Mapování pro klimatizace - topný výkon
  const acHeatingPowerLabels: { [key: string]: string } = {
    'ac-heating-low': 'Nízký (do 3 kW)',
    'ac-heating-medium': 'Střední (3 - 6 kW)',
    'ac-heating-high': 'Vysoký (6 - 12 kW)',
    'ac-heating-very-high': 'Velmi vysoký (nad 12 kW)',
    'ac-heating-unknown': 'Nevím, potřebuji poradit'
  };

  // Mapování pro klimatizace - stávající chlazení
  const hasCoolingLabels: { [key: string]: string } = {
    'ac-yes': 'Ano',
    'ac-no': 'Ne'
  };

  // Mapování pro klimatizace - typ chlazení
  const coolingTypeLabels: { [key: string]: string } = {
    'ac-portable-ac': 'Mobilní klimatizace',
    'ac-split-ac': 'Split jednotky',
    'ac-fans': 'Ventilátory',
    'ac-central-ac': 'Centrální klimatizace',
    'ac-evaporative': 'Evaporativní chlazení',
    'ac-other-cooling': 'Jiné'
  };

  // Mapování pro klimatizace - stáří chlazení
  const coolingAgeLabels: { [key: string]: string } = {
    'ac-age-0-2': '0-2 roky',
    'ac-age-3-5': '3-5 let',
    'ac-age-6-10': '6-10 let',
    'ac-age-10+': 'Více než 10 let'
  };

  // Mapování pro klimatizace - problémy s chlazením
  const coolingProblemsLabels: { [key: string]: string } = {
    'ac-insufficient-cooling': 'Nedostatečné chlazení',
    'ac-high-consumption': 'Vysoká spotřeba energie',
    'ac-noise': 'Hluk',
    'ac-frequent-breakdowns': 'Časté poruchy',
    'ac-poor-air-quality': 'Špatná kvalita vzduchu',
    'ac-uneven-cooling': 'Nerovnoměrné chlazení'
  };

  // Mapování pro klimatizace - venkovní prostor
  const hasOutdoorSpaceLabels: { [key: string]: string } = {
    'ac-space-yes': 'Ano, mám vhodné místo',
    'ac-space-limited': 'Ano, ale s omezeními',
    'ac-space-no': 'Ne, bude potřeba řešit',
    'ac-space-unsure': 'Nejsem si jistý/á'
  };

  // Mapování pro klimatizace - elektroinstalace
  const hasElectricalReadinessLabels: { [key: string]: string } = {
    'ac-electrical-yes': 'Ano',
    'ac-electrical-no': 'Ne',
    'ac-electrical-unsure': 'Nejsem si jistý/á'
  };

  // Mapování pro klimatizace - povolení
  const hasWallPermissionLabels: { [key: string]: string } = {
    'ac-permission-yes': 'Ano, mám povolení',
    'ac-permission-pending': 'Zatím ne, ale plánuji získat',
    'ac-permission-no': 'Ne',
    'ac-permission-unsure': 'Nejsem si jistý/á'
  };

  // Mapování pro klimatizace - vzdálenost jednotek
  const outdoorUnitDistanceLabels: { [key: string]: string } = {
    'ac-distance-0-3': 'Do 3 metrů',
    'ac-distance-3-5': '3-5 metrů',
    'ac-distance-5-10': '5-10 metrů',
    'ac-distance-10+': 'Nad 10 metrů',
    'ac-distance-unknown': 'Nevím'
  };

  // Mapování pro klimatizace - průchody
  const hasOpeningsLabels: { [key: string]: string } = {
    'ac-openings-yes': 'Ano',
    'ac-openings-no': 'Ne',
    'ac-openings-partial': 'Částečně'
  };

  // Mapování pro klimatizace - rekonstrukce
  const renovationPlansLabels: { [key: string]: string } = {
    'ac-reno-soon': 'Ano, v nejbližších 6 měsících',
    'ac-reno-later': 'Ano, za 6-12 měsíců',
    'ac-reno-no': 'Ne'
  };

  // Mapování pro klimatizace - stavební omezení
  const buildingRestrictionsLabels: { [key: string]: string } = {
    'ac-historic-building': 'Historická budova',
    'ac-facade-restrictions': 'Omezení na fasádu',
    'ac-roof-restrictions': 'Omezení na střechu',
    'ac-noise-restrictions': 'Hlukové omezení',
    'ac-no-restrictions': 'Žádná omezení'
  };

  // Mapování pro klimatizace - rozpočet
  const acBudgetLabels: { [key: string]: string } = {
    'ac-under-30k': 'Do 30 000 Kč',
    'ac-30k-50k': '30 000 - 50 000 Kč',
    'ac-50k-80k': '50 000 - 80 000 Kč',
    'ac-80k-120k': '80 000 - 120 000 Kč',
    'ac-120k-200k': '120 000 - 200 000 Kč',
    'ac-over-200k': 'Nad 200 000 Kč',
    'ac-not-set': 'Nemám stanovený rozpočet'
  };

  // Mapování pro klimatizace - časování instalace
  const acInstallationTimingLabels: { [key: string]: string } = {
    'ac-6+months': 'Za více než 6 měsíců',
    'ac-just-info': 'Jen zjišťuji informace'
  };

  // Mapování pro klimatizace - speciální požadavky
  const acAdditionalRequirementsLabels: { [key: string]: string } = {
    'ac-design-focus': 'Důraz na design jednotek',
    'ac-ultra-quiet': 'Extrémně tichý provoz',
    'ac-allergy-filter': 'Filtrace alergenů',
    'ac-quick-install': 'Rychlá instalace',
    'ac-specific-brand': 'Konkrétní značka/výrobce',
    'ac-maintenance-contract': 'Zájem o servisní smlouvu',
    'ac-eco-friendly': 'Ekologické chladivo'
  };

  // Mapování pro tepelná čerpadla - stáří budovy
  const hpBuildingAgeLabels: { [key: string]: string } = {
    'hp-new': 'Novostavba (do 5 let)',
    'hp-recent': '5-20 let',
    'hp-older': '20-50 let',
    'hp-historic': 'Nad 50 let'
  };

  // Mapování pro tepelná čerpadla - počet místností
  const hpRoomCountLabels: { [key: string]: string } = {
    'hp-1-2': '1-2 místnosti',
    'hp-3-4': '3-4 místnosti',
    'hp-5-6': '5-6 místností',
    'hp-7+': '7 a více místností'
  };

  // Mapování pro tepelná čerpadla - současné vytápění
  const hpCurrentHeatingLabels: { [key: string]: string } = {
    'hp-gas': 'Plynový kotel',
    'hp-electric': 'Elektrické topení',
    'hp-solid-fuel': 'Kotel na tuhá paliva (uhlí, dřevo)',
    'hp-heat-pump': 'Tepelné čerpadlo',
    'hp-district': 'Dálkové vytápění',
    'hp-central': 'Centrální vytápění',
    'hp-other': 'Jiné'
  };

  // Mapování pro tepelná čerpadla - stáří vytápění
  const hpCurrentHeatingAgeLabels: { [key: string]: string } = {
    'hp-age-new': 'Nový (do 2 let)',
    'hp-age-recent': '2-5 let',
    'hp-age-older': '5-10 let',
    'hp-age-old': '10-20 let',
    'hp-age-very-old': 'Nad 20 let'
  };

  // Mapování pro tepelná čerpadla - rozvod tepla
  const hpHeatingDistributionLabels: { [key: string]: string } = {
    'hp-radiators': 'Radiátory',
    'hp-floor-heating': 'Podlahové vytápění',
    'hp-wall-heating': 'Stěnové vytápění',
    'hp-air-heating': 'Teplovzdušné vytápění',
    'hp-mixed': 'Kombinace více typů'
  };

  // Mapování pro tepelná čerpadla - efektivita vytápění
  const hpCurrentHeatingEfficiencyLabels: { [key: string]: string } = {
    'hp-efficient': 'Velmi efektivní',
    'hp-average': 'Průměrně efektivní',
    'hp-inefficient': 'Neefektivní',
    'hp-unsure': 'Nejsem si jistý'
  };

  // Mapování pro tepelná čerpadla - zateplení
  const hpInsulationStatusLabels: { [key: string]: string } = {
    'hp-none': 'Bez zateplení',
    'hp-partial': 'Částečné zateplení',
    'hp-complete': 'Kompletní zateplení'
  };

  // Mapování pro tepelná čerpadla - okna
  const hpWindowsStatusLabels: { [key: string]: string } = {
    'hp-old': 'Stará jednoduchá/dvojitá',
    'hp-plastic-double': 'Plastová dvojskla',
    'hp-plastic-triple': 'Plastová trojskla',
    'hp-wood-double': 'Dřevěná dvojskla',
    'hp-wood-triple': 'Dřevěná trojskla',
    'hp-aluminum': 'Hliníková okna',
    'hp-mixed': 'Kombinace více typů'
  };

  // Mapování pro tepelná čerpadla - izolace střechy
  const hpRoofInsulationLabels: { [key: string]: string } = {
    'hp-roof-none': 'Bez izolace',
    'hp-roof-minimal': 'Minimální izolace',
    'hp-roof-standard': 'Standardní izolace',
    'hp-roof-high': 'Nadstandardní izolace'
  };

  // Mapování pro tepelná čerpadla - tepelné mosty
  const hpThermalBridgesLabels: { [key: string]: string } = {
    'hp-bridges-none': 'Řešené/žádné',
    'hp-bridges-minor': 'Menší problémy',
    'hp-bridges-major': 'Výrazné tepelné mosty',
    'hp-bridges-unsure': 'Nejsem si jistý'
  };

  // Mapování pro tepelná čerpadla - spotřeba tepla
  const hpAnnualHeatingConsumptionLabels: { [key: string]: string } = {
    'hp-consumption-unknown': 'Nevím',
    'hp-consumption-5-10': '5-10 MWh',
    'hp-consumption-10-15': '10-15 MWh',
    'hp-consumption-15-20': '15-20 MWh',
    'hp-consumption-20-30': '20-30 MWh',
    'hp-consumption-30+': 'Nad 30 MWh'
  };

  // Mapování pro tepelná čerpadla - náklady na vytápění
  const hpMonthlyHeatingCostsLabels: { [key: string]: string } = {
    'hp-costs-unknown': 'Nevím',
    'hp-costs-1000-2000': '1 000 - 2 000 Kč',
    'hp-costs-2000-4000': '2 000 - 4 000 Kč',
    'hp-costs-4000-6000': '4 000 - 6 000 Kč',
    'hp-costs-6000-10000': '6 000 - 10 000 Kč',
    'hp-costs-10000+': 'Nad 10 000 Kč'
  };

  // Mapování pro tepelná čerpadla - délka topné sezóny
  const hpHeatingSeasonLengthLabels: { [key: string]: string } = {
    'hp-season-short': 'Krátká (4-5 měsíců)',
    'hp-season-medium': 'Střední (6-7 měsíců)',
    'hp-season-long': 'Dlouhá (8+ měsíců)',
    'hp-season-year-round': 'Celoroční vytápění'
  };

  // Mapování pro tepelná čerpadla - typ TČ
  const hpTypeLabels: { [key: string]: string } = {
    'hp-air-water': 'Vzduch-voda (nejběžnější)',
    'hp-earth-water': 'Země-voda (vrty, kolektory)',
    'hp-water-water': 'Voda-voda (studny)',
    'hp-air-air': 'Vzduch-vzduch',
    'hp-any': 'Nevím, potřebuji poradit'
  };

  // Mapování pro tepelná čerpadla - značky
  const hpPreferredBrandLabels: { [key: string]: string } = {
    'hp-mitsubishi': 'Mitsubishi Electric',
    'hp-daikin': 'Daikin',
    'hp-panasonic': 'Panasonic',
    'hp-nibe': 'NIBE',
    'hp-stiebel-eltron': 'Stiebel Eltron',
    'hp-lg': 'LG',
    'hp-samsung': 'Samsung',
    'hp-bosch': 'Bosch',
    'hp-viessmann': 'Viessmann',
    'hp-vaillant': 'Vaillant',
    'hp-other': 'Jiná',
    'hp-no-preference': 'Nemám preference'
  };

  // Mapování pro tepelná čerpadla - výkon
  const hpPreferredPowerLabels: { [key: string]: string } = {
    'hp-power-unknown': 'Nevím, potřebuji poradit',
    'hp-power-5-8': '5-8 kW',
    'hp-power-8-12': '8-12 kW',
    'hp-power-12-16': '12-16 kW',
    'hp-power-16-22': '16-22 kW',
    'hp-power-22+': 'Nad 22 kW'
  };

  // Mapování pro tepelná čerpadla - dodatečné funkce
  const hpAdditionalFeaturesLabels: { [key: string]: string } = {
    'hp-cooling': 'Chlazení v létě',
    'hp-smart-control': 'Chytré ovládání přes aplikaci',
    'hp-energy-monitoring': 'Monitoring spotřeby energie',
    'hp-hybrid-operation': 'Hybridní provoz (s jiným zdrojem)',
    'hp-weather-compensation': 'Ekvitermní regulace',
    'hp-silence-mode': 'Tichý noční režim',
    'hp-cascade-system': 'Kaskádové zapojení více jednotek'
  };

  // Mapování pro tepelná čerpadla - ohřev TUV
  const hpHotWaterHeatingLabels: { [key: string]: string } = {
    'hp-integrated': 'Požaduji integrovaný ohřev TUV',
    'hp-separate': 'Požaduji oddělený systém ohřevu TUV',
    'hp-no': 'Nepožaduji ohřev TUV',
    'hp-unsure': 'Nejsem si jistý/á'
  };

  // Mapování pro tepelná čerpadla - záložní vytápění
  const hpBackupHeatingLabels: { [key: string]: string } = {
    'hp-backup-electric': 'Elektrické topné těleso',
    'hp-backup-gas': 'Plynový kotel',
    'hp-backup-none': 'Nepožaduji záložní zdroj',
    'hp-backup-unsure': 'Nechám si poradit'
  };

  // Mapování pro tepelná čerpadla - obavy z hluku
  const hpNoiseConcernsLabels: { [key: string]: string } = {
    'hp-noise-high': 'Vysoké obavy (sousedé, ložnice)',
    'hp-noise-moderate': 'Střední obavy',
    'hp-noise-low': 'Nízké obavy',
    'hp-noise-none': 'Žádné obavy'
  };

  // Mapování pro tepelná čerpadla - design
  const hpDesignPreferencesLabels: { [key: string]: string } = {
    'hp-design-important': 'Velmi důležitý (musí ladit s interiérem)',
    'hp-design-somewhat': 'Středně důležitý',
    'hp-design-not-important': 'Není důležitý'
  };

  // Mapování pro tepelná čerpadla - chytré funkce
  const hpSmartFeaturesLabels: { [key: string]: string } = {
    'hp-app-control': 'Ovládání přes mobilní aplikaci',
    'hp-voice-control': 'Hlasové ovládání',
    'hp-scheduling': 'Automatické plánování',
    'hp-presence-detection': 'Detekce přítomnosti',
    'hp-geofencing': 'Geofencing (automatické zapnutí při příchodu)',
    'hp-energy-optimization': 'Automatická optimalizace spotřeby'
  };

  // Mapování pro tepelná čerpadla - údržba
  const hpMaintenancePreferenceLabels: { [key: string]: string } = {
    'hp-maintenance-full': 'Plná servisní smlouva',
    'hp-maintenance-basic': 'Základní servis',
    'hp-maintenance-none': 'Vlastní údržba',
    'hp-maintenance-undecided': 'Ještě nevím'
  };

  // Mapování pro tepelná čerpadla - rozpočet
  const hpBudgetLabels: { [key: string]: string } = {
    'hp-up-to-150k': 'Do 150 000 Kč',
    'hp-150k-250k': '150 000 - 250 000 Kč',
    'hp-250k-350k': '250 000 - 350 000 Kč',
    'hp-350k-500k': '350 000 - 500 000 Kč',
    'hp-500k+': 'Nad 500 000 Kč',
    'hp-unknown': 'Nemám stanovený rozpočet'
  };

  // Mapování pro tepelná čerpadla - časování instalace
  const hpInstallationTimingLabels: { [key: string]: string } = {
    'hp-more-than-year': 'Za více než rok',
    'hp-just-info': 'Pouze zjišťuji informace'
  };

  // Mapování pro tepelná čerpadla - připravenost instalace
  const hpInstallationReadinessLabels: { [key: string]: string } = {
    'hp-existing-system': 'Stávající systém je funkční a může běžet',
    'hp-needs-replacement': 'Stávající systém je potřeba kompletně nahradit',
    'hp-electrical-ready': 'Elektroinstalace je připravena',
    'hp-heat-distribution-ready': 'Rozvody topení jsou připraveny',
    'hp-space-prepared': 'Prostor pro vnitřní jednotku je připraven',
    'hp-permits-in-place': 'Mám potřebná povolení'
  };

  // Mapování pro tepelná čerpadla - fáze výstavby
  const hpConstructionPhaseLabels: { [key: string]: string } = {
    'hp-existing': 'Stávající stavba bez plánované rekonstrukce',
    'hp-planned-renovation': 'Plánovaná rekonstrukce',
    'hp-ongoing-renovation': 'Probíhající rekonstrukce',
    'hp-new-construction': 'Novostavba ve výstavbě'
  };

  // Mapování pro distribuční oblasti
  const distributionAreaLabels: { [key: string]: string } = {
    'cez': 'ČEZ Distribuce',
    'pre': 'PRE Distribuce',
    'edg': 'E.ON Distribuce'
  };

  // Mapování pro regiony/kraje
  const regionLabels: { [key: string]: string } = {
    'praha': 'Praha',
    'stredocesky': 'Středočeský kraj',
    'jihocesky': 'Jihočeský kraj',
    'plzensky': 'Plzeňský kraj',
    'karlovarsky': 'Karlovarský kraj',
    'ustecky': 'Ústecký kraj',
    'liberecky': 'Liberecký kraj',
    'kralovehradecky': 'Královéhradecký kraj',
    'pardubicky': 'Pardubický kraj',
    'vysocina': 'Kraj Vysočina',
    'jihomoravsky': 'Jihomoravský kraj',
    'olomoucky': 'Olomoucký kraj',
    'zlinsky': 'Zlínský kraj',
    'moravskoslezsky': 'Moravskoslezský kraj'
  };

  // Mapování pro FVE typy s novými možnostmi
  const updatedFveTypeLabels: { [key: string]: string } = {
    ...fveTypeLabels,
    'common-areas': 'Fotovoltaika pro společné prostory',
    'individual-units': 'Fotovoltaika s rozdělením na jednotlivé byty',
    'fve-commercial-consumption': 'Fotovoltaika pro vlastní spotřebu v provozu (bez baterií)',
    'fve-industrial-consumption': 'Fotovoltaika pro vlastní spotřebu v provozu (bez baterií)',
    'fve-commercial-battery': 'Fotovoltaika s akumulací do baterií pro zálohování a špičkovou spotřebu',
    'fve-industrial-battery': 'Fotovoltaika s akumulací do baterií pro zálohování a špičkovou spotřebu',
    'fve-commercial-integration': 'Fotovoltaika s integrací do provozu (např. chlazení, kompresory)',
    'fve-industrial-integration': 'Fotovoltaika s integrací do strojního provozu (např. chlazení, kompresory)',
    'fve-esg': 'Fotovoltaika jako součást ESG / zelené strategie firmy',
    'fve-offgrid': 'Ostrovní systém / záložní systém',
    'fve-industrial-offgrid': 'Ostrovní systém / záložní systém pro kritickou infrastrukturu'
  };

  // Mapování pro památkovou zónu
  const monumentZoneLabels: { [key: string]: string } = {
    'yes': 'Ano',
    'no': 'Ne'
  };

  // Mapování pro umístění klimatizačních jednotek v bytových domech
  const airConditioningBuildingUnitsLabels: { [key: string]: string } = {
    'common-areas': 'Pouze společné prostory',
    'each-unit': 'Každá bytová jednotka',
    'individual': 'Řešeno individuálně'
  };

  // Mapování pro typ instalace klimatizace
  const acInstallationTypeLabels: { [key: string]: string } = {
    'common-areas': 'Pouze společné prostory',
    'each-unit': 'Každá bytová jednotka',
    'individual': 'Řešeno individuálně'
  };

  // Mapování pro budoucí klimatizaci v bytových domech
  const futureAcApartmentLabels: { [key: string]: string } = {
    'common-areas': 'Pro společné prostory',
    'each-unit': 'Pro každou bytovou jednotku',
    'unknown': 'Zatím nevíme'
  };

  // Mapování pro budoucí komerční klimatizaci
  const futureCommercialAirConditioningCountLabels: { [key: string]: string } = {
    '1-5': '1-5 jednotek',
    '6-10': '6-10 jednotek',
    '11-25': '11-25 jednotek',
    '25+': '25+ jednotek'
  };

  // Mapování pro komerční klimatizační jednotky
  const commercialUnitsCountLabels: { [key: string]: string } = {
    '1-5': '1-5 jednotek',
    '6-10': '6-10 jednotek',
    '11-25': '11-25 jednotek',
    '25+': '25+ jednotek'
  };

  // Mapování pro umístění instalace
  const installationLocationLabels: { [key: string]: string } = {
    'facade': 'Fasáda',
    'roof': 'Střecha',
    'ground': 'Pozemek'
  };

  // Mapování pro orientaci střechy
  const roofOrientationLabels: { [key: string]: string } = {
    'east': 'Východ',
    'west': 'Západ',
    'south': 'Jih',
    'north': 'Sever',
    'southwest': 'Jihozápad',
    'southeast': 'Jihovýchod',
    'northeast': 'Severovýchod',
    'northwest': 'Severozápad'
  };

  // Mapování pro aktuální způsob vytápění
  const currentHeatingLabels: { [key: string]: string } = {
    'gas': 'Plynový kotel',
    'electricity': 'Elektřina (přímotopy, akumulace)',
    'solid-fuel': 'Kotel na tuhá paliva (uhlí, dřevo)',
    'heat-pump': 'Tepelné čerpadlo',
    'district-heating': 'Dálkové vytápění',
    'central-heating': 'Centrální vytápění',
    'other': 'Jiné'
  };

  // Mapování pro hlavní cíle s FVE
  const systemGoalLabels: { [key: string]: string } = {
    'savings': 'Úspora nákladů',
    'independence': 'Energetická nezávislost',
    'ecology': 'Ekologie',
    'investment': 'Investice'
  };

  // Mapování pro preferovanou velikost FVE
  const systemSizeLabels: { [key: string]: string } = {
    'optimal': 'Optimální (podle spotřeby)',
    'maximum': 'Maximální (podle možností střechy)',
    'budget': 'Podle rozpočtu',
    'subsidies': 'S ohledem na dotace'
  };

  // Mapování pro typy spotřebičů
  const applianceLabels: { [key: string]: string } = {
    'heat-pump': 'Tepelné čerpadlo',
    'pressure-pumps': 'Čerpadla – tlaková',
    'fans': 'Ventilátory',
    'compressors': 'Kompresory',
    'industrial-cooling': 'Průmyslové chlazení',
    'industrial-heating': 'Průmyslové vytápění',
    'elevator': 'Výtah',
    'ventilation-systems': 'Vetrací systémy',
    'production-machines': 'Výrobní stroje a zařízení',
    'intensive-lighting': 'Náročné osvětlení',
    'server-room': 'Serverovna/IT technika',
    'hvac-systems': 'Klimatizační systémy',
    'heavy-machinery': 'Těžké stroje a výrobní linky',
    'central-heating': 'Centrální vytápění',
    'electric-heating': 'Elektrické vytápění',
    'electric-boiler': 'Elektrický bojler',
    'electric-stove': 'Elektrický sporák (indukce)',
    'washing-machine': 'Pračka',
    'dishwasher': 'Myčka',
    'dryer': 'Sušička',
    'air-conditioning': 'Klimatizace',
    'pool': 'Bazén',
    'sauna': 'Sauna',
    'electric-car': 'Elektromobil / Nabíjecí stanice',
    'wallbox': 'Wallbox',
    'workshop': 'Dílna/garáž',
    'garden-pump': 'Zahradní čerpadla',
    'ventilation': 'Rekuperace',
    'generator': 'Záložní generátor elektřiny',
    'none': 'Žádné náročné spotřebiče'
  };

  // Mapování pro denní profil
  const dailyProfileLabels: { [key: string]: string } = {
    'morning': 'Nejvíce ráno (6-10h)',
    'day': 'Nejvíce přes den (10-16h)',
    'evening': 'Nejvíce večer (16-22h)',
    'night': 'Nejvíce v noci (22-6h)',
    'business-hours': 'Pouze pracovní doba (8-17h)',
    '24-7': 'Nepřetržitý provoz 24/7',
    'uniform': 'Rovnoměrně celý den',
    'unsure': 'Nejsem si jistý'
  };

  // Mapování pro vlastnictví objektu
  const propertyOwnershipLabels: { [key: string]: string } = {
    'owner': 'Vlastník',
    'tenant': 'Nájemník',
    'other': 'Jiné'
  };

  // Mapování pro specifikaci vlastnictví
  const propertyOwnershipOtherLabels: { [key: string]: string } = {
    'investor': 'Investor',
    'sponsor': 'Sponzor',
    'cooperative': 'Družstvo',
    'municipality': 'Obec/město',
    'company': 'Společnost'
  };

  // Mapování pro typ střechy
  const roofTypeLabels: { [key: string]: string } = {
    'pitched': 'Sedlová střecha',
    'shed': 'Pultová střecha',
    'flat-sloped': 'Plochá se spádem',
    'flat': 'Rovná střecha'
  };

  // Mapování pro materiál střechy
  const roofMaterialLabels: { [key: string]: string } = {
    'tiles': 'Tašky (betonové/pálené)',
    'sheet-metal': 'Plech (trapézový/falcovaný)',
    'concrete': 'Beton',
    'slate': 'Břidlice',
    'shingles': 'Šindele',
    'other': 'Jiné'
  };

  // Mapování pro stáří střechy
  const roofAgeLabels: { [key: string]: string } = {
    'new': 'Do 5 let',
    'good': '5-15 let',
    'older': '15-30 let',
    'old': 'Nad 30 let'
  };

  // Mapování pro zastínění
  const shadingLabels: { [key: string]: string } = {
    'none': 'Žádné zastínění',
    'minimal': 'Minimální (komíny, antény)',
    'partial': 'Částečné (stromy, budovy)',
    'significant': 'Výrazné zastínění'
  };

  // Mapování pro akumulační nádrž
  const hasAccumulationTankLabels: { [key: string]: string } = {
    'yes': 'Ano',
    'no': 'Ne'
  };

  // Mapování pro velikost nádrže
  const tankSizeLabels: { [key: string]: string } = {
    '100': '100 litrů',
    '150': '150 litrů',
    '200': '200 litrů',
    '300': '300 litrů',
    '500': '500 litrů',
    '1000': '1000 litrů',
    'other': 'Jiná velikost'
  };

  // Mapování pro způsob ohřevu vody
  const currentWaterHeatingLabels: { [key: string]: string } = {
    'electric-boiler': 'Elektrický bojler',
    'gas-boiler': 'Plynový bojler',
    'heat-pump': 'Tepelné čerpadlo',
    'solar': 'Solární ohřev',
    'solid-fuel': 'Tuhá paliva',
    'district-heating': 'Dálkové vytápění',
    'other': 'Jiné'
  };

  // Mapování pro kapacitu baterie
  const batteryCapacityLabels: { [key: string]: string } = {
    '5-10': '5-10 kWh',
    '10-15': '10-15 kWh',
    '15-25': '15-25 kWh',
    '25+': 'Nad 25 kWh',
    'advice': 'Nechám si poradit'
  };

  // Mapování pro sezónní profil spotřeby
  const seasonalProfileLabels: { [key: string]: string } = {
    'winter-high': 'Nejvíce v zimě',
    'summer-high': 'Nejvíce v létě',
    'spring-autumn-high': 'Nejvíce na jaře/na podzim',
    'uniform': 'Rovnoměrně po celý rok',
    'unsure': 'Nejsem si jistý'
  };

  // Mapování pro tepelné čerpadlo k bazénu
  const poolHeatPumpLabels: { [key: string]: string } = {
    'yes': 'Ano',
    'no': 'Ne'
  };

  // Mapování pro výkon tepelných čerpadel
  const heatPumpPowerLabels: { [key: string]: string } = {
    '3-6': '3-6 kW',
    '6-9': '6-9 kW',
    '9-12': '9-12 kW',
    '12-16': '12-16 kW',
    '16-20': '16-20 kW',
    '20+': 'Nad 20 kW',
    'unsure': 'Nejsem si jist'
  };

  // Mapování pro roční spotřebu elektřiny
  const annualConsumptionLabels: { [key: string]: string } = {
    // Family house
    '0-4000': '0 - 4 000 kWh',
    '4000-8000': '4 000 - 8 000 kWh',
    '8000-10000': '8 000 - 10 000 kWh',
    '10000-14000': '10 000 - 14 000 kWh',
    '15000+': '15 000+ kWh',
    // Apartment building
    '0-30000': '0 - 30 000 kWh',
    '30000-80000': '30 000 - 80 000 kWh',
    '80000-150000': '80 000 - 150 000 kWh',
    '150000-300000': '150 000 - 300 000 kWh',
    '300000+': '300 000+ kWh',
    // Commercial
    '0-20000': '0 - 20 000 kWh',
    '20000-50000': '20 000 - 50 000 kWh',
    '50000-100000': '50 000 - 100 000 kWh',
    '100000-200000': '100 000 - 200 000 kWh',
    '200000+': '200 000+ kWh',
    // Industrial (v MWh)
    '0-100': '0 - 100 MWh',
    '100-500': '100 - 500 MWh',
    '500-1000': '500 - 1 000 MWh',
    '1000-5000': '1 000 - 5 000 MWh',
    '5000+': '5 000+ MWh'
  };

  // Mapování pro roční náklady na elektřinu
  const annualElectricityCostLabels: { [key: string]: string } = {
    // Family house
    '5000-10000': '5 000 - 10 000 Kč',
    '10000-15000': '10 000 - 15 000 Kč',
    '15000-20000': '15 000 - 20 000 Kč',
    '20000-30000': '20 000 - 30 000 Kč',
    '30000-40000': '30 000 - 40 000 Kč',
    '40000-50000': '40 000 - 50 000 Kč',
    '50000+': 'Nad 50 000 Kč',
    // Apartment building & Commercial
    '0-50000': '0 - 50 000 Kč',
    '50000-150000': '50 000 - 150 000 Kč',
    '150000-300000': '150 000 - 300 000 Kč',
    '300000-600000': '300 000 - 600 000 Kč',
    '600000-1000000': '600 000 - 1 000 000 Kč',
    '1000000+': 'Nad 1 000 000 Kč',
    // Industrial
    '0-100000': '0 - 100 000 Kč',
    '100000-500000': '100 000 - 500 000 Kč',
    '500000-2000000': '500 000 - 2 000 000 Kč',
    '2000000-10000000': '2 000 000 - 10 000 000 Kč',
    '10000000-40000000': '10 000 000 - 40 000 000 Kč',
    '40000000+': 'Nad 40 000 000 Kč'
  };

  // Mapování pro způsob vytápění (různé od currentHeatingLabels)
  const heatingLabels: { [key: string]: string } = {
    'electricity': 'Elektřina (přímotopy, akumulace)',
    'gas': 'Plyn',
    'heat-pump': 'Tepelné čerpadlo',
    'solid-fuel': 'Tuhá paliva (dřevo, uhlí)',
    'district-heating': 'Dálkové vytápění',
    'central-heating': 'Centrální vytápění'
  };

  // Mapování pro typ bazénu
  const poolTypeLabels: { [key: string]: string } = {
    'small': 'Malý bazén (do 20 m³, cca 2x3 m / průměr 3 m)',
    'medium': 'Střední bazén (20-50 m³, cca 4x8 m / průměr 5 m)',
    'large': 'Velký bazén (nad 50 m³, cca 6x12 m / průměr 8 m)',
    'unknown': 'Nejsem si jistý'
  };

  // Mapování pro typ elektromobilu
  const electricCarTypeLabels: { [key: string]: string } = {
    'small': 'Malý vůz (do 40 kWh baterie)',
    'medium': 'Střední vůz (40-70 kWh baterie)',
    'large': 'Velký vůz (nad 70 kWh baterie)',
    'multiple': 'Více vozidel'
  };

  // Mapování pro počet klimatizačních jednotek
  const airConditioningCountLabels: { [key: string]: string } = {
    '1': '1 jednotka',
    '2-3': '2-3 jednotky',
    '3+': '3+ jednotek'
  };

  // Mapování pro typ generátoru
  const generatorTypeLabels: { [key: string]: string } = {
    'gasoline': 'Benzín/nafta',
    'gas': 'Plyn',
    'battery': 'Baterie'
  };

  // Mapování pro kapacitu bateriového generátoru
  const generatorBatteryCapacityLabels: { [key: string]: string } = {
    'under-5': 'Do 5 kWh',
    '5-10': '5-10 kWh',
    '10+': '10+ kWh'
  };

  // Mapování pro způsob financování
  const financingLabels: { [key: string]: string } = {
    'cash': 'Hotovost/vlastní prostředky',
    'loan': 'Úvěr/leasing',
    'subsidy': 'Dotace + vlastní prostředky',
    'combination': 'Kombinace více způsobů',
    'ac-installments': 'Splátkový prodej',
    'ac-undecided': 'Ještě nevím'
  };

  // Mapování pro počty osob a jednotek
  const countLabels: { [key: string]: string } = {
    '1': '1 jednotka',
    '2': '2 jednotky',
    '3': '3 jednotky',
    '4': '4 jednotky',
    '5': '5 jednotek',
    '6+': '6 a více jednotek',
    '0-5': '0 - 5 jednotek',
    '5-15': '5 - 15 jednotek',
    '15-50': '15 - 50 jednotek',
    '50-100': '50 - 100 jednotek',
    '100+': '100+ jednotek'
  };

  // Mapování pro počty dospělých
  const adultsCountLabels: { [key: string]: string } = {
    '1': '1 osoba',
    '2': '2 osoby',
    '3': '3 osoby',
    '4': '4 osoby',
    '5': '5 osob',
    '6+': '6 a více osob',
  };

  // Mapování pro počty dětí
  const childrenCountLabels: { [key: string]: string } = {
    '0': 'Žádné děti',
    '1': '1 dítě',
    '2': '2 děti',
    '3': '3 děti',
    '4+': '4 a více dětí',
  };

  // Zpracování na základě ID pole
  switch (fieldId) {
    case 'propertyType':
      return propertyTypeLabels[value] || value;
    
    case 'propertyOwnership':
      return propertyOwnershipLabels[value] || value;
    
    case 'propertyOwnershipOther':
      return propertyOwnershipOtherLabels[value] || value;
    
    case 'fveType':
      if (Array.isArray(value)) {
        return value.map(v => updatedFveTypeLabels[v] || v).join(', ');
      }
      return updatedFveTypeLabels[value] || value;
    
    case 'heatPumpType':
      return heatPumpTypeLabels[value] || value;
    
    case 'roofType':
      return roofTypeLabels[value] || value;
    
    case 'roofMaterial':
      return roofMaterialLabels[value] || value;
    
    case 'roofAge':
      return roofAgeLabels[value] || value;
    
    case 'shading':
      return shadingLabels[value] || value;
    
    case 'hasAccumulationTank':
      return hasAccumulationTankLabels[value] || value;
    
    case 'tankSize':
      return tankSizeLabels[value] || value;
    
    case 'currentWaterHeating':
      return currentWaterHeatingLabels[value] || value;
    
    case 'batteryCapacity':
      return batteryCapacityLabels[value] || value;
    
    case 'seasonalProfile':
      return seasonalProfileLabels[value] || value;
    
    case 'poolHeatPump':
      return poolHeatPumpLabels[value] || value;
    
    case 'currentPoolType':
    case 'futurePoolDetails':
      return poolTypeLabels[value] || value;
    
    case 'electricCarType':
    case 'futureElectricCarType':
      return electricCarTypeLabels[value] || value;
    
    case 'airConditioningCount':
    case 'futureAirConditioningDetails':
      return airConditioningCountLabels[value] || value;
    
    case 'generatorType':
      return generatorTypeLabels[value] || value;
    
    case 'generatorBatteryCapacity':
      return generatorBatteryCapacityLabels[value] || value;
    
    case 'financing':
      return financingLabels[value] || value;
    
    case 'adultsCount':
      return adultsCountLabels[value] || value;
    
    case 'childrenCount':
      return childrenCountLabels[value] || value;

    case 'unitsCount':
      return countLabels[value] || value;
    
    case 'contactPreference':
      return contactPreferenceLabels[value] || value;
    
    case 'contactTime':
      if (Array.isArray(value)) {
        return value.map(v => contactTimeLabels[v] || v).join(', ');
      }
      return contactTimeLabels[value] || value;
    
    case 'budget':
      return budgetLabels[value] || value;
      return budgetLabels[value] || acBudgetLabels[value] || hpBudgetLabels[value] || value;
    
    case 'timeline':
      return timelineLabels[value] || value;
    
    case 'distributionArea':
    case 'region':
      return distributionAreaLabels[value] || regionLabels[value] || value;
    
    case 'monumentZone':
      return monumentZoneLabels[value] || value;
    
    case 'airConditioningBuildingUnits':
      return airConditioningBuildingUnitsLabels[value] || value;
    
    case 'hasHeatPump':
      return value === 'yes' ? 'Ano' : 'Ne';
    
    case 'heatPumpPower':
    case 'futureHeatPumpPower':
      return heatPumpPowerLabels[value] || value;
    
    case 'annualConsumption':
      return annualConsumptionLabels[value] || value;
    
    case 'annualElectricityCost':
      return annualElectricityCostLabels[value] || value;
    
    case 'currentAppliances':
    case 'futureAppliances':
      if (Array.isArray(value)) {
        return value.map(v => applianceLabels[v] || v).join(', ');
      }
      return applianceLabels[value] || value;
    
    case 'heating':
      if (Array.isArray(value)) {
        return value.map(v => heatingLabels[v] || v).join(', ');
      }
      return heatingLabels[value] || value;
    
    case 'dailyProfile':
      return dailyProfileLabels[value] || value;
    
    case 'acInstallationType':
      return acInstallationTypeLabels[value] || value;
    
    case 'futureAirConditioningApartmentDetails':
      return futureAcApartmentLabels[value] || value;
    
    case 'futureCommercialAirConditioningCount':
      return futureCommercialAirConditioningCountLabels[value] || value;
    
    case 'commercialUnitsCount':
      return commercialUnitsCountLabels[value] || value;
    
    case 'installationLocation':
      if (Array.isArray(value)) {
        return value.map(v => installationLocationLabels[v] || v).join(', ');
      }
      return installationLocationLabels[value] || value;

    case 'roofOrientation':
      if (Array.isArray(value)) {
        return value.map(v => roofOrientationLabels[v] || v).join(', ');
      }
      return roofOrientationLabels[value] || value;


    case 'systemGoal':
      if (Array.isArray(value)) {
        return value.map(v => systemGoalLabels[v] || v).join(', ');
      }
      return systemGoalLabels[value] || value;

    case 'systemSize':
      if (Array.isArray(value)) {
        return value.map(v => systemSizeLabels[v] || v).join(', ');
      }
      return systemSizeLabels[value] || value;

    // Klimatizace - nová pole
    case 'buildingAge':
      return acBuildingAgeLabels[value] || hpBuildingAgeLabels[value] || value;
    
    case 'ceilingHeight':
      return acCeilingHeightLabels[value] || value;
    
    case 'acPurpose':
      return acPurposeLabels[value] || value;
    
    case 'acRooms':
      if (Array.isArray(value)) {
        return value.map(v => acRoomsLabels[v] || v).join(', ');
      }
      return acRoomsLabels[value] || value;
    
    case 'acUnits':
      return acUnitsLabels[value] || value;
    
    case 'acFeatures':
      if (Array.isArray(value)) {
        return value.map(v => acFeaturesLabels[v] || v).join(', ');
      }
      return acFeaturesLabels[value] || value;
    
    case 'acSmartFeatures':
      if (Array.isArray(value)) {
        return value.map(v => acSmartFeaturesLabels[v] || v).join(', ');
      }
      return acSmartFeaturesLabels[value] || value;
    
    case 'acEfficiency':
      return acEfficiencyLabels[value] || value;
    
    case 'acCoolingPower':
      return acCoolingPowerLabels[value] || value;
    
    case 'acHeatingPower':
      return acHeatingPowerLabels[value] || value;
    
    case 'hasCooling':
      return hasCoolingLabels[value] || value;
    
    case 'coolingType':
      if (Array.isArray(value)) {
        return value.map(v => coolingTypeLabels[v] || v).join(', ');
      }
      return coolingTypeLabels[value] || value;
    
    case 'coolingAge':
      return coolingAgeLabels[value] || value;
    
    case 'coolingProblems':
      if (Array.isArray(value)) {
        return value.map(v => coolingProblemsLabels[v] || v).join(', ');
      }
      return coolingProblemsLabels[value] || value;
    
    case 'hasOutdoorSpace':
      return hasOutdoorSpaceLabels[value] || value;
    
    case 'hasElectricalReadiness':
      return hasElectricalReadinessLabels[value] || value;
    
    case 'hasWallPermission':
      return hasWallPermissionLabels[value] || value;
    
    case 'outdoorUnitDistance':
      return outdoorUnitDistanceLabels[value] || value;
    
    case 'hasOpenings':
      return hasOpeningsLabels[value] || value;
    
    case 'renovationPlans':
      return renovationPlansLabels[value] || value;
    
    case 'buildingRestrictions':
      if (Array.isArray(value)) {
        return value.map(v => buildingRestrictionsLabels[v] || v).join(', ');
      }
      return buildingRestrictionsLabels[value] || value;
    
    case 'installationTiming':
      return acInstallationTimingLabels[value] || hpInstallationTimingLabels[value] || timelineLabels[value] || value;
    
    case 'preferredContactMethod':
      return contactPreferenceLabels[value] || value;
    
    case 'preferredContactTime':
      if (Array.isArray(value)) {
        return value.map(v => contactTimeLabels[v] || v).join(', ');
      }
      return contactTimeLabels[value] || value;
    
    case 'additionalRequirements':
      if (Array.isArray(value)) {
        return value.map(v => acAdditionalRequirementsLabels[v] || v).join(', ');
      }
      return acAdditionalRequirementsLabels[value] || value;

    // Tepelná čerpadla - nová pole
    case 'roomCount':
      return hpRoomCountLabels[value] || value;
    
    case 'currentHeating':
      return hpCurrentHeatingLabels[value] || value;
    
    case 'currentHeatingAge':
      return hpCurrentHeatingAgeLabels[value] || value;
    
    case 'heatingDistribution':
      return hpHeatingDistributionLabels[value] || value;
    
    case 'currentHeatingEfficiency':
      return hpCurrentHeatingEfficiencyLabels[value] || value;
    
    case 'insulationStatus':
      return hpInsulationStatusLabels[value] || value;
    
    case 'windowsStatus':
      return hpWindowsStatusLabels[value] || value;
    
    case 'roofInsulation':
      return hpRoofInsulationLabels[value] || value;
    
    case 'thermalBridges':
      return hpThermalBridgesLabels[value] || value;
    
    case 'annualHeatingConsumption':
      return hpAnnualHeatingConsumptionLabels[value] || value;
    
    case 'monthlyHeatingCosts':
      return hpMonthlyHeatingCostsLabels[value] || value;
    
    case 'heatingSeasonLength':
      return hpHeatingSeasonLengthLabels[value] || value;
    
    case 'heatPumpType':
      return hpTypeLabels[value] || heatPumpTypeLabels[value] || value;
    
    case 'preferredBrand':
      if (Array.isArray(value)) {
        return value.map(v => hpPreferredBrandLabels[v] || v).join(', ');
      }
      return hpPreferredBrandLabels[value] || value;
    
    case 'preferredPower':
      return hpPreferredPowerLabels[value] || value;
    
    case 'additionalFeatures':
      if (Array.isArray(value)) {
        return value.map(v => hpAdditionalFeaturesLabels[v] || v).join(', ');
      }
      return hpAdditionalFeaturesLabels[value] || value;
    
    case 'hotWaterHeating':
      return hpHotWaterHeatingLabels[value] || value;
    
    case 'backupHeating':
      return hpBackupHeatingLabels[value] || value;
    
    case 'noiseConcerns':
      return hpNoiseConcernsLabels[value] || value;
    
    case 'designPreferences':
      return hpDesignPreferencesLabels[value] || value;
    
    case 'smartFeatures':
      if (Array.isArray(value)) {
        return value.map(v => hpSmartFeaturesLabels[v] || v).join(', ');
      }
      return hpSmartFeaturesLabels[value] || value;
    
    case 'maintenancePreference':
      return hpMaintenancePreferenceLabels[value] || value;
    
    case 'installationReadiness':
      if (Array.isArray(value)) {
        return value.map(v => hpInstallationReadinessLabels[v] || v).join(', ');
      }
      return hpInstallationReadinessLabels[value] || value;
    
    case 'constructionPhase':
      return hpConstructionPhaseLabels[value] || value;

    default:
      // Pro ostatní pole vrátit hodnotu jak je
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      return String(value);
  }
};

/**
 * Vyhodnocuje podmínky pro zobrazení pole nebo možnosti.
 * Podporuje jednoduché závislosti, AND a OR operátory.
 * @param conditional Objekt s podmínkami
 * @param formData Aktuální data formuláře
 * @returns true, pokud by se pole/možnost měla zobrazit, jinak false
 */
export const evaluateConditional = (conditional: OptionConditional, formData: any): boolean => {
  const dependentValue = formData?.[conditional.dependsOn];
  let mainCondition = false;

  if (Array.isArray(dependentValue)) {
    mainCondition = conditional.values.some((value: string) => dependentValue.includes(value));
  } else {
    mainCondition = conditional.values.includes(dependentValue);
  }

  // Vyhodnocení AND podmínek
  if (conditional.and && conditional.and.length > 0) {
    const andResults = conditional.and.map(cond => evaluateConditional(cond, formData));
    mainCondition = mainCondition && andResults.every(result => result);
  }

  // Vyhodnocení OR podmínek
  if (conditional.or && conditional.or.length > 0) {
    const orResults = conditional.or.map(cond => evaluateConditional(cond, formData));
    mainCondition = mainCondition || orResults.some(result => result);
  }

  return mainCondition;
};