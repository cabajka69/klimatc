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
    'combination': 'Kombinace více způsobů'
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