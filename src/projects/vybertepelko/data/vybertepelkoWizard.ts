import { Wizard, WizardStep } from '../../../shared/types/wizard';

// Definice všech kroků průvodce pro výběr tepelného čerpadla
export const vybertepelkoSteps: WizardStep[] = [
  {
    id: 'registration',
    title: 'Kontaktní údaje',
    description: 'Vyplňte své kontaktní údaje pro pokračování',
    icon: 'UserCircle',
    groups: [
      {
        id: 'personal',
        title: 'Osobní údaje',
        icon: 'User',
        fields: ['firstName', 'lastName']
      },
      {
        id: 'contact',
        title: 'Kontaktní informace',
        icon: 'Phone',
        fields: ['email', 'phone']
      },
      {
        id: 'business',
        title: 'Firemní údaje',
        icon: 'Building',
        fields: ['company']
      }
    ],
    fields: [
      {
        id: 'firstName',
        type: 'text',
        label: 'Jméno',
        placeholder: 'Zadejte své jméno',
        required: true,
        icon: 'User',
        group: 'personal'
      },
      {
        id: 'lastName',
        type: 'text',
        label: 'Příjmení',
        placeholder: 'Zadejte své příjmení',
        required: true,
        icon: 'User',
        group: 'personal'
      },
      {
        id: 'email',
        type: 'email',
        label: 'E-mailová adresa',
        placeholder: 'vas@email.cz',
        required: true,
        icon: 'Mail',
        group: 'contact',
        validation: {
          pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
          message: 'Zadejte platnou e-mailovou adresu'
        }
      },
      {
        id: 'phone',
        type: 'phone',
        label: 'Telefon',
        placeholder: '+420 777 777 777',
        required: true,
        icon: 'Phone',
        group: 'contact',
        validation: {
          pattern: '^(\\+420)?\\s*[0-9]{3}\\s*[0-9]{3}\\s*[0-9]{3}$',
          message: 'Zadejte platné telefonní číslo'
        }
      },
      {
        id: 'company',
        type: 'text',
        label: 'Název společnosti',
        placeholder: 'Nepovinné - pro firmy',
        required: false,
        icon: 'Building2',
        group: 'business'
      }
    ]
  },
  {
    id: 'property-info',
    title: 'Informace o objektu',
    description: 'Základní údaje o vytápěném objektu',
    icon: 'Home',
    groups: [
      {
        id: 'property-basic',
        title: 'Základní informace o objektu',
        icon: 'Home',
        fields: ['propertyType', 'propertyOwnership', 'propertyOwnershipOther', 'monumentZone', 'buildingAge', 'floorArea', 'floorCount', 'roomCount']
      },
      {
        id: 'location',
        title: 'Lokace objektu',
        icon: 'MapPin',
        fields: ['address', 'addressLon', 'addressLat', 'distributionArea']
      },
      {
        id: 'household',
        title: 'Domácnost',
        icon: 'Users',
        fields: ['adultsCount', 'childrenCount']
      },
      {
        id: 'apartment-units',
        title: 'Počet jednotek',
        icon: 'Grid',
        fields: ['unitsCount']
      },
      {
        id: 'business',
        title: 'Firemní údaje',
        icon: 'Building',
        fields: ['ico'],
        conditional: {
          dependsOn: 'propertyType',
          values: ['commercial', 'industrial']
        }
      }
    ],
    fields: [
      {
        id: 'propertyType',
        type: 'radio',
        label: 'Typ objektu',
        required: true,
        icon: 'Home',
        group: 'property-basic',
        options: [
          { value: 'family-house', label: 'Rodinný dům', icon: 'Home' },
          { value: 'apartment-building', label: 'Bytový dům', icon: 'Building2' },
          { value: 'commercial', label: 'Komerční objekt', icon: 'Store' },
          { value: 'industrial', label: 'Průmyslový objekt', icon: 'Factory' }
        ]
      },
      {
        id: 'propertyOwnership',
        type: 'radio',
        label: 'Vlastnictví objektu',
        required: true,
        icon: 'Key',
        group: 'property-basic',
        options: [
          { value: 'owner', label: 'Vlastník', icon: 'Key' },
          { value: 'tenant', label: 'Nájemník', icon: 'Users' },
          { value: 'other', label: 'Jiné', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'propertyOwnershipOther',
        type: 'select',
        label: 'Specifikujte typ vlastnictví',
        required: true,
        icon: 'HelpCircle',
        group: 'property-basic',
        conditional: {
          dependsOn: 'propertyOwnership',
          values: ['other']
        },
        options: [
          { value: 'investor', label: 'Investor' },
          { value: 'sponsor', label: 'Sponzor' },
          { value: 'cooperative', label: 'Družstvo' },
          { value: 'municipality', label: 'Obec/město' },
          { value: 'company', label: 'Společnost' }
        ]
      },
      {
        id: 'monumentZone',
        type: 'radio',
        label: 'Památková zóna',
        required: true,
        icon: 'Landmark',
        group: 'property-basic',
        conditional: {
          dependsOn: 'propertyType',
          values: ['apartment-building', 'commercial']
        },
        options: [
          { value: 'yes', label: 'Ano', icon: 'Check' },
          { value: 'no', label: 'Ne', icon: 'X' }
        ]
      },
      {
        id: 'buildingAge',
        type: 'select',
        label: 'Stáří budovy',
        required: true,
        icon: 'Clock',
        group: 'property-basic',
        options: [
          { value: 'hp-new', label: 'Novostavba (do 5 let)' },
          { value: 'hp-recent', label: '5-20 let' },
          { value: 'hp-older', label: '20-50 let' },
          { value: 'hp-historic', label: 'Nad 50 let' }
        ]
      },
      {
        id: 'floorArea',
        type: 'number',
        label: 'Vytápěná plocha (m²)',
        placeholder: 'Např. 150',
        required: true,
        icon: 'Ruler',
        group: 'property-basic',
        validation: {
          min: 20,
          max: 5000,
          message: 'Plocha musí být mezi 20 a 5000 m²'
        }
      },
      {
        id: 'floorCount',
        type: 'select',
        label: 'Počet podlaží',
        required: true,
        icon: 'Layers',
        group: 'property-basic',
        options: [
          { value: '1', label: '1 podlaží' },
          { value: '2', label: '2 podlaží' },
          { value: '3', label: '3 podlaží' },
          { value: '4+', label: '4 a více podlaží' }
        ]
      },
      {
        id: 'roomCount',
        type: 'select',
        label: 'Počet místností',
        required: true,
        icon: 'LayoutDashboard',
        group: 'property-basic',
        options: [
          { value: 'hp-1-2', label: '1-2 místnosti' },
          { value: 'hp-3-4', label: '3-4 místnosti' },
          { value: 'hp-5-6', label: '5-6 místností' },
          { value: 'hp-7+', label: '7 a více místností' }
        ]
      },
      {
        id: 'address',
        type: 'autocomplete',
        label: 'Adresa objektu',
        placeholder: 'Začněte psát adresu...',
        required: true,
        icon: 'MapPin',
        group: 'location',
        autocompleteConfig: {
          apiUrl: 'https://api.mapy.cz/v1/suggest',
          apiKey: 'vCdbERKNLmfB7W-gZ1LgJyP2Ou0UnXeR1NhQxB1RclU',
          searchParam: 'query',
          responseField: 'items'
        }
      },
      {
        id: 'addressLon',
        type: 'number',
        label: '',
        required: false,
        group: 'location'
      },
      {
        id: 'addressLat',
        type: 'number',
        label: '',
        required: false,
        group: 'location'
      },
      {
        id: 'distributionArea',
        type: 'select',
        label: 'Distribuční území',
        required: true,
        icon: 'Zap',
        group: 'location',
        options: [
          { value: 'cez', label: 'ČEZ Distribuce' },
          { value: 'pre', label: 'PRE Distribuce' },
          { value: 'edg', label: 'E.ON Distribuce' }
        ]
      },
      {
        id: 'adultsCount',
        type: 'select',
        label: 'Počet dospělých osob v domácnosti',
        required: true,
        icon: 'Users',
        group: 'household',
        conditional: {
          dependsOn: 'propertyType',
          values: ['family-house']
        },
        options: [
          { value: '1', label: '1 osoba' },
          { value: '2', label: '2 osoby' },
          { value: '3', label: '3 osoby' },
          { value: '4', label: '4 osoby' },
          { value: '5', label: '5 osob' },
          { value: '6+', label: '6 a více osob' }
        ]
      },
      {
        id: 'childrenCount',
        type: 'select',
        label: 'Počet dětí v domácnosti',
        required: false,
        icon: 'Baby',
        group: 'household',
        conditional: {
          dependsOn: 'propertyType',
          values: ['family-house']
        },
        options: [
          { value: '0', label: 'Žádné děti' },
          { value: '1', label: '1 dítě' },
          { value: '2', label: '2 děti' },
          { value: '3', label: '3 děti' },
          { value: '4+', label: '4 a více dětí' }
        ]
      },
      {
        id: 'unitsCount',
        type: 'select',
        label: 'Počet bytových jednotek',
        required: true,
        icon: 'Grid',
        group: 'apartment-units',
        conditional: {
          dependsOn: 'propertyType',
          values: ['apartment-building']
        },
        options: [
          { value: '0-5', label: '0 - 5 jednotek' },
          { value: '5-15', label: '5 - 15 jednotek' },
          { value: '15-50', label: '15 - 50 jednotek' },
          { value: '50-100', label: '50 - 100 jednotek' },
          { value: '100+', label: '100+ jednotek' }
        ]
      },
      {
        id: 'ico',
        type: 'text',
        label: 'IČO',
        placeholder: 'Zadejte IČO',
        required: true,
        icon: 'Hash',
        group: 'business',
        conditional: {
          dependsOn: 'propertyType',
          values: ['commercial', 'industrial']
        },
        validation: {
          pattern: '^[0-9]{8}$',
          message: 'IČO musí obsahovat 8 číslic'
        }
      }
    ]
  },
  {
    id: 'current-heating',
    title: 'Stávající vytápění',
    description: 'Informace o současném způsobu vytápění',
    icon: 'Flame',
    groups: [
      {
        id: 'heating-system',
        title: 'Stávající topný systém',
        icon: 'Flame',
        fields: ['currentHeating', 'currentHeatingAge', 'heatingDistribution', 'currentHeatingEfficiency']
      },
      {
        id: 'insulation-status',
        title: 'Izolace objektu',
        icon: 'Layers',
        fields: ['insulationStatus', 'windowsStatus', 'roofInsulation', 'thermalBridges']
      },
      {
        id: 'energy-usage',
        title: 'Spotřeba energie',
        icon: 'Zap',
        fields: ['annualHeatingConsumption', 'monthlyHeatingCosts', 'heatingSeasonLength']
      }
    ],
    fields: [
      {
        id: 'currentHeating',
        type: 'radio',
        label: 'Současný způsob vytápění',
        required: true,
        icon: 'Flame',
        group: 'heating-system',
        options: [
          { value: 'hp-gas', label: 'Plynový kotel', icon: 'Flame' },
          { value: 'hp-electric', label: 'Elektrické topení', icon: 'Zap' },
          { value: 'hp-solid-fuel', label: 'Kotel na tuhá paliva (uhlí, dřevo)', icon: 'TreePine' },
          { value: 'hp-heat-pump', label: 'Tepelné čerpadlo', icon: 'Wind' },
          { value: 'hp-district', label: 'Dálkové vytápění', icon: 'Building' },
          { value: 'hp-central', label: 'Centrální vytápění', icon: 'Building2' },
          { value: 'hp-other', label: 'Jiné', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'currentHeatingAge',
        type: 'select',
        label: 'Stáří současného topného systému',
        required: true,
        icon: 'Clock',
        group: 'heating-system',
        options: [
          { value: 'hp-age-new', label: 'Nový (do 2 let)' },
          { value: 'hp-age-recent', label: '2-5 let' },
          { value: 'hp-age-older', label: '5-10 let' },
          { value: 'hp-age-old', label: '10-20 let' },
          { value: 'hp-age-very-old', label: 'Nad 20 let' }
        ]
      },
      {
        id: 'heatingDistribution',
        type: 'radio',
        label: 'Způsob rozvodu tepla',
        required: true,
        icon: 'Share2',
        group: 'heating-system',
        options: [
          { value: 'hp-radiators', label: 'Radiátory', icon: 'Square' },
          { value: 'hp-floor-heating', label: 'Podlahové vytápění', icon: 'Grid' },
          { value: 'hp-wall-heating', label: 'Stěnové vytápění', icon: 'Layout' },
          { value: 'hp-air-heating', label: 'Teplovzdušné vytápění', icon: 'Wind' },
          { value: 'hp-mixed', label: 'Kombinace více typů', icon: 'Layers' }
        ]
      },
      {
        id: 'currentHeatingEfficiency',
        type: 'select',
        label: 'Efektivita současného vytápění',
        required: false,
        icon: 'TrendingUp',
        group: 'heating-system',
        options: [
          { value: 'hp-efficient', label: 'Velmi efektivní' },
          { value: 'hp-average', label: 'Průměrně efektivní' },
          { value: 'hp-inefficient', label: 'Neefektivní' },
          { value: 'hp-unsure', label: 'Nejsem si jistý' }
        ]
      },
      {
        id: 'insulationStatus',
        type: 'radio',
        label: 'Stav zateplení obvodových stěn',
        required: true,
        icon: 'Layers',
        group: 'insulation-status',
        options: [
          { value: 'hp-none', label: 'Bez zateplení', icon: 'X' },
          { value: 'hp-partial', label: 'Částečné zateplení', icon: 'AlertTriangle' },
          { value: 'hp-complete', label: 'Kompletní zateplení', icon: 'Check' }
        ]
      },
      {
        id: 'windowsStatus',
        type: 'select',
        label: 'Typ oken',
        required: true,
        icon: 'Square',
        group: 'insulation-status',
        options: [
          { value: 'hp-old', label: 'Stará jednoduchá/dvojitá' },
          { value: 'hp-plastic-double', label: 'Plastová dvojskla' },
          { value: 'hp-plastic-triple', label: 'Plastová trojskla' },
          { value: 'hp-wood-double', label: 'Dřevěná dvojskla' },
          { value: 'hp-wood-triple', label: 'Dřevěná trojskla' },
          { value: 'hp-aluminum', label: 'Hliníková okna' },
          { value: 'hp-mixed', label: 'Kombinace více typů' }
        ]
      },
      {
        id: 'roofInsulation',
        type: 'radio',
        label: 'Izolace střechy/stropu',
        required: true,
        icon: 'Home',
        group: 'insulation-status',
        conditional: {
          dependsOn: 'propertyType',
          values: ['family-house']
        },
        options: [
          { value: 'hp-roof-none', label: 'Bez izolace', icon: 'X' },
          { value: 'hp-roof-minimal', label: 'Minimální izolace', icon: 'Minimize' },
          { value: 'hp-roof-standard', label: 'Standardní izolace', icon: 'Square' },
          { value: 'hp-roof-high', label: 'Nadstandardní izolace', icon: 'Maximize' }
        ]
      },
      {
        id: 'thermalBridges',
        type: 'radio',
        label: 'Tepelné mosty v konstrukci',
        required: false,
        icon: 'Bridge',
        group: 'insulation-status',
        options: [
          { value: 'hp-bridges-none', label: 'Řešené/žádné', icon: 'Check' },
          { value: 'hp-bridges-minor', label: 'Menší problémy', icon: 'AlertTriangle' },
          { value: 'hp-bridges-major', label: 'Výrazné tepelné mosty', icon: 'AlertCircle' },
          { value: 'hp-bridges-unsure', label: 'Nejsem si jistý', icon:  'HelpCircle' }
        ]
      },
      {
        id: 'annualHeatingConsumption',
        type: 'select',
        label: 'Roční spotřeba tepla (přibližně)',
        required: true,
        icon: 'Gauge',
        group: 'energy-usage',
        options: [
          { value: 'hp-consumption-unknown', label: 'Nevím' },
          { value: 'hp-consumption-5-10', label: '5-10 MWh' },
          { value: 'hp-consumption-10-15', label: '10-15 MWh' },
          { value: 'hp-consumption-15-20', label: '15-20 MWh' },
          { value: 'hp-consumption-20-30', label: '20-30 MWh' },
          { value: 'hp-consumption-30+', label: 'Nad 30 MWh' }
        ]
      },
      {
        id: 'monthlyHeatingCosts',
        type: 'select',
        label: 'Průměrné měsíční náklady na vytápění (v topné sezóně)',
        required: true,
        icon: 'Banknote',
        group: 'energy-usage',
        options: [
          { value: 'hp-costs-unknown', label: 'Nevím' },
          { value: 'hp-costs-1000-2000', label: '1 000 - 2 000 Kč' },
          { value: 'hp-costs-2000-4000', label: '2 000 - 4 000 Kč' },
          { value: 'hp-costs-4000-6000', label: '4 000 - 6 000 Kč' },
          { value: 'hp-costs-6000-10000', label: '6 000 - 10 000 Kč' },
          { value: 'hp-costs-10000+', label: 'Nad 10 000 Kč' }
        ]
      },
      {
        id: 'heatingSeasonLength',
        type: 'select',
        label: 'Délka topné sezóny',
        required: false,
        icon: 'Calendar',
        group: 'energy-usage',
        options: [
          { value: 'hp-season-short', label: 'Krátká (4-5 měsíců)' },
          { value: 'hp-season-medium', label: 'Střední (6-7 měsíců)' },
          { value: 'hp-season-long', label: 'Dlouhá (8+ měsíců)' },
          { value: 'hp-season-year-round', label: 'Celoroční vytápění' }
        ]
      }
    ]
  },
  {
    id: 'heat-pump-requirements',
    title: 'Požadavky na tepelné čerpadlo',
    description: 'Specifikujte vaše požadavky na tepelné čerpadlo',
    icon: 'Wind',
    groups: [
      {
        id: 'hp-type',
        title: 'Typ tepelného čerpadla',
        icon: 'Wind',
        fields: ['heatPumpType', 'preferredBrand', 'preferredPower']
      },
      {
        id: 'feature-preferences',
        title: 'Funkce a využití',
        icon: 'Settings',
        fields: ['additionalFeatures', 'hotWaterHeating', 'backupHeating']
      },
      {
        id: 'installation-details',
        title: 'Speciální požadavky',
        icon: 'ListChecks',
        fields: ['noiseConcerns', 'designPreferences', 'smartFeatures', 'maintenancePreference']
      }
    ],
    fields: [
      {
        id: 'heatPumpType',
        type: 'radio',
        label: 'Preferovaný typ tepelného čerpadla',
        required: true,
        icon: 'Wind',
        group: 'hp-type',
        options: [
          { value: 'hp-air-water', label: 'Vzduch-voda (nejběžnější)', icon: 'Cloud' },
          { value: 'hp-earth-water', label: 'Země-voda (vrty, kolektory)', icon: 'Mountain' },
          { value: 'hp-water-water', label: 'Voda-voda (studny)', icon: 'Droplets' },
          { value: 'hp-air-air', label: 'Vzduch-vzduch', icon: 'Wind' },
          { value: 'hp-any', label: 'Nevím, potřebuji poradit', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'preferredBrand',
        type: 'multiselect',
        label: 'Preferované značky',
        required: false,
        icon: 'Star',
        group: 'hp-type',
        options: [
          { value: 'hp-mitsubishi', label: 'Mitsubishi Electric' },
          { value: 'hp-daikin', label: 'Daikin' },
          { value: 'hp-panasonic', label: 'Panasonic' },
          { value: 'hp-nibe', label: 'NIBE' },
          { value: 'hp-stiebel-eltron', label: 'Stiebel Eltron' },
          { value: 'hp-lg', label: 'LG' },
          { value: 'hp-samsung', label: 'Samsung' },
          { value: 'hp-bosch', label: 'Bosch' },
          { value: 'hp-viessmann', label: 'Viessmann' },
          { value: 'hp-vaillant', label: 'Vaillant' },
          { value: 'hp-other', label: 'Jiná' },
          { value: 'hp-no-preference', label: 'Nemám preference' }
        ]
      },
      {
        id: 'preferredPower',
        type: 'select',
        label: 'Požadovaný výkon tepelného čerpadla',
        required: true,
        icon: 'Zap',
        group: 'hp-type',
        options: [
          { value: 'hp-power-unknown', label: 'Nevím, potřebuji poradit' },
          { value: 'hp-power-5-8', label: '5-8 kW' },
          { value: 'hp-power-8-12', label: '8-12 kW' },
          { value: 'hp-power-12-16', label: '12-16 kW' },
          { value: 'hp-power-16-22', label: '16-22 kW' },
          { value: 'hp-power-22+', label: 'Nad 22 kW' }
        ]
      },
      {
        id: 'additionalFeatures',
        type: 'multiselect',
        label: 'Dodatečné funkce',
        required: false,
        icon: 'ListChecks',
        group: 'feature-preferences',
        options: [
          { value: 'hp-cooling', label: 'Chlazení v létě', icon: 'Snowflake' },
          { value: 'hp-smart-control', label: 'Chytré ovládání přes aplikaci', icon: 'Smartphone' },
          { value: 'hp-energy-monitoring', label: 'Monitoring spotřeby energie', icon: 'BarChart' },
          { value: 'hp-hybrid-operation', label: 'Hybridní provoz (s jiným zdrojem)', icon: 'Layers' },
          { value: 'hp-weather-compensation', label: 'Ekvitermní regulace', icon: 'Thermometer' },
          { value: 'hp-silence-mode', label: 'Tichý noční režim', icon: 'Volume1' },
          { value: 'hp-cascade-system', label: 'Kaskádové zapojení více jednotek', icon: 'Network' }
        ]
      },
      {
        id: 'hotWaterHeating',
        type: 'radio',
        label: 'Ohřev teplé užitkové vody',
        required: true,
        icon: 'Droplets',
        group: 'feature-preferences',
        options: [
          { value: 'hp-integrated', label: 'Požaduji integrovaný ohřev TUV', icon: 'Check' },
          { value: 'hp-separate', label: 'Požaduji oddělený systém ohřevu TUV', icon: 'Square' },
          { value: 'hp-no', label: 'Nepožaduji ohřev TUV', icon: 'X' },
          { value: 'hp-unsure', label: 'Nejsem si jistý/á', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'backupHeating',
        type: 'radio',
        label: 'Záložní zdroj tepla',
        required: false,
        icon: 'Shield',
        group: 'feature-preferences',
        options: [
          { value: 'hp-backup-electric', label: 'Elektrické topné těleso', icon: 'Zap' },
          { value: 'hp-backup-gas', label: 'Plynový kotel', icon: 'Flame' },
          { value: 'hp-backup-none', label: 'Nepožaduji záložní zdroj', icon: 'X' },
          { value: 'hp-backup-unsure', label: 'Nechám si poradit', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'noiseConcerns',
        type: 'radio',
        label: 'Obavy z hluku venkovní jednotky',
        required: true,
        icon: 'Volume2',
        group: 'installation-details',
        conditional: {
          dependsOn: 'heatPumpType',
          values: ['hp-air-water', 'hp-air-air']
        },
        options: [
          { value: 'hp-noise-high', label: 'Vysoké obavy (sousedé, ložnice)', icon: 'AlertCircle' },
          { value: 'hp-noise-moderate', label: 'Střední obavy', icon: 'AlertTriangle' },
          { value: 'hp-noise-low', label: 'Nízké obavy', icon: 'CheckSquare' },
          { value: 'hp-noise-none', label: 'Žádné obavy', icon: 'Check' }
        ]
      },
      {
        id: 'designPreferences',
        type: 'radio',
        label: 'Preference vzhledu vnitřních jednotek',
        required: false,
        icon: 'Palette',
        group: 'installation-details',
        options: [
          { value: 'hp-design-important', label: 'Velmi důležitý (musí ladit s interiérem)', icon: 'Star' },
          { value: 'hp-design-somewhat', label: 'Středně důležitý', icon: 'StarHalf' },
          { value: 'hp-design-not-important', label: 'Není důležitý', icon: 'X' }
        ]
      },
      {
        id: 'smartFeatures',
        type: 'multiselect',
        label: 'Chytré funkce',
        required: false,
        icon: 'Smartphone',
        group: 'installation-details',
        options: [
          { value: 'hp-app-control', label: 'Ovládání přes mobilní aplikaci', icon: 'Smartphone' },
          { value: 'hp-voice-control', label: 'Hlasové ovládání', icon: 'Mic' },
          { value: 'hp-scheduling', label: 'Automatické plánování', icon: 'Calendar' },
          { value: 'hp-presence-detection', label: 'Detekce přítomnosti', icon: 'User' },
          { value: 'hp-geofencing', label: 'Geofencing (automatické zapnutí při příchodu)', icon: 'MapPin' },
          { value: 'hp-energy-optimization', label: 'Automatická optimalizace spotřeby', icon: 'TrendingUp' }
        ]
      },
      {
        id: 'maintenancePreference',
        type: 'radio',
        label: 'Preference ohledně údržby',
        required: false,
        icon: 'Wrench',
        group: 'installation-details',
        options: [
          { value: 'hp-maintenance-full', label: 'Plná servisní smlouva', icon: 'FileCheck' },
          { value: 'hp-maintenance-basic', label: 'Základní servis', icon: 'Wrench' },
          { value: 'hp-maintenance-none', label: 'Vlastní údržba', icon: 'User' },
          { value: 'hp-maintenance-undecided', label: 'Ještě nevím', icon: 'HelpCircle' }
        ]
      }
    ]
  },
  {
    id: 'energy-consumption',
    title: 'Energetická spotřeba',
    description: 'Informace o současné spotřebě elektřiny',
    icon: 'BarChart3',
    groups: [
      {
        id: 'consumption-basic',
        title: 'Základní spotřeba',
        icon: 'Zap',
        fields: ['annualConsumption', 'annualElectricityCost']
      },
      {
        id: 'consumption-profile',
        title: 'Profil spotřeby',
        icon: 'Clock',
        fields: ['dailyProfile', 'seasonalProfile']
      },
      {
        id: 'heating',
        title: 'Vytápění',
        icon: 'Thermometer',
        fields: ['heating']
      }
    ],
    fields: [
      {
        id: 'annualConsumption',
        type: 'select',
        label: 'Jakou máte roční spotřebu elektřiny?',
        required: true,
        icon: 'Zap',
        group: 'consumption-basic',
        note: 'Najdете na vyúčtování elektřiny za poslední rok',
        options: [
          // Family house options
          { 
            value: '0-4000', 
            label: '0 - 4 000 kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: '4000-8000', 
            label: '4 000 - 8 000 kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: '8000-10000', 
            label: '8 000 - 10 000 kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: '10000-14000', 
            label: '10 000 - 14 000 kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: '15000+', 
            label: '15 000+ kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          // Apartment building options
          { 
            value: '0-30000', 
            label: '0 - 30 000 kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: '30000-80000', 
            label: '30 000 - 80 000 kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: '80000-150000', 
            label: '80 000 - 150 000 kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: '150000-300000', 
            label: '150 000 - 300 000 kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: '300000+', 
            label: '300 000+ kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          // Commercial options
          { 
            value: '0-20000', 
            label: '0 - 20 000 kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: '20000-50000', 
            label: '20 000 - 50 000 kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: '50000-100000', 
            label: '50 000 - 100 000 kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: '100000-200000', 
            label: '100 000 - 200 000 kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: '200000+', 
            label: '200 000+ kWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          // Industrial options
          { 
            value: '0-100', 
            label: '0 - 100 MWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: '100-500', 
            label: '100 - 500 MWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: '500-1000', 
            label: '500 - 1 000 MWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: '1000-5000', 
            label: '1 000 - 5 000 MWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: '5000+', 
            label: '5 000+ MWh',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          }
        ]
      },
      {
        id: 'annualElectricityCost',
        type: 'select',
        label: 'Kolik ročně zaplatíte za elektřinu?',
        required: true,
        icon: 'CreditCard',
        group: 'consumption-basic',
        options: [
          // Family house options
          { 
            value: '5000-10000', 
            label: '5 000 - 10 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: '10000-15000', 
            label: '10 000 - 15 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: '15000-20000', 
            label: '15 000 - 20 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: '20000-30000', 
            label: '20 000 - 30 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: '30000-40000', 
            label: '30 000 - 40 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: '40000-50000', 
            label: '40 000 - 50 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: '50000+', 
            label: 'Nad 50 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          // Apartment building options
          { 
            value: '0-50000', 
            label: '0 - 50 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: '50000-150000', 
            label: '50 000 - 150 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: '150000-300000', 
            label: '150 000 - 300 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: '300000-600000', 
            label: '300 000 - 600 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: '600000-1000000', 
            label: '600 000 - 1 000 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: '1000000+', 
            label: 'Nad 1 000 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          // Commercial options
          { 
            value: '0-50000', 
            label: '0 - 50 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: '50000-150000', 
            label: '50 000 - 150 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: '150000-300000', 
            label: '150 000 - 300 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: '300000-600000', 
            label: '300 000 - 600 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: '600000-1000000', 
            label: '600 000 - 1 000 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: '1000000+', 
            label: 'Nad 1 000 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          // Industrial options
          { 
            value: '0-100000', 
            label: '0 - 100 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: '100000-500000', 
            label: '100 000 - 500 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: '500000-2000000', 
            label: '500 000 - 2 000 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: '2000000-10000000', 
            label: '2 000 000 - 10 000 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: '10000000-40000000', 
            label: '10 000 000 - 40 000 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: '40000000+', 
            label: 'Nad 40 000 000 Kč',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          }
        ]
      },
      {
        id: 'dailyProfile',
        type: 'select',
        label: 'Jak během dne nejčastěji spotřebováváte elektřinu?',
        required: true,
        icon: 'Clock',
        group: 'consumption-profile',
        options: [
          // Family house and apartment building options
          { 
            value: 'morning', 
            label: 'Nejvíce ráno (6-10h)',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house', 'apartment-building']
            }
          },
          { 
            value: 'day', 
            label: 'Nejvíce přes den (10-16h)',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house', 'apartment-building']
            }
          },
          { 
            value: 'evening', 
            label: 'Nejvíce večer (16-22h)',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house', 'apartment-building']
            }
          },
          { 
            value: 'night', 
            label: 'Nejvíce v noci (22-6h)',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house', 'apartment-building']
            }
          },
          { 
            value: 'uniform', 
            label: 'Rovnoměrně celý den',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house', 'apartment-building']
            }
          },
          { 
            value: 'unsure', 
            label: 'Nejsem si jistý',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house', 'apartment-building']
            }
          },
          // Commercial options
          { 
            value: 'morning', 
            label: 'Nejvíce ráno (6-10h)',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'day', 
            label: 'Nejvíce přes den (10-16h)',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'evening', 
            label: 'Nejvíce večer (16-22h)',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'business-hours', 
            label: 'Pouze pracovní doba (8-17h)',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'uniform', 
            label: 'Rovnoměrně celý den',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'unsure', 
            label: 'Nejsem si jistý',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          // Industrial options
          { 
            value: 'morning', 
            label: 'Nejvíce ráno (6-10h)',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'day', 
            label: 'Nejvíce přes den (10-16h)',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'evening', 
            label: 'Nejvíce večer (16-22h)',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'business-hours', 
            label: 'Pouze pracovní doba (8-17h)',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: '24-7', 
            label: 'Nepřetržitý provoz 24/7',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'unsure', 
            label: 'Nejsem si jistý',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          }
        ]
      },
      {
        id: 'seasonalProfile',
        type: 'select',
        label: 'Kdy máte během roku největší spotřebu?',
        required: true,
        icon: 'Calendar',
        group: 'consumption-profile',
        options: [
          { value: 'winter-high', label: 'Nejvíce v zimě' },
          { value: 'summer-high', label: 'Nejvíce v létě' },
          { value: 'spring-autumn-high', label: 'Nejvíce na jaře/na podzim' },
          { value: 'uniform', label: 'Rovnoměrně po celý rok' },
          { value: 'unsure', label: 'Nejsem si jistý' }
        ]
      },
      {
        id: 'heating',
        type: 'multiselect',
        label: 'Aktuální způsob vytápění (objektu)',
        required: true,
        icon: 'Flame',
        group: 'heating',
        options: [
          { value: 'electricity', label: 'Elektřina (přímotopy, akumulace)', icon: 'Zap' },
          { value: 'gas', label: 'Plyn', icon: 'Flame' },
          { value: 'heat-pump', label: 'Tepelné čerpadlo', icon: 'Wind' },
          { value: 'solid-fuel', label: 'Tuhá paliva (dřevo, uhlí)', icon: 'TreePine' },
          { value: 'district-heating', label: 'Dálkové vytápění', icon: 'Building' },
          { 
            value: 'central-heating', 
            label: 'Centrální vytápění', 
            icon: 'Building',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building', 'commercial', 'industrial']
            }
          }
        ]
      }
    ]
  },
  {
    id: 'appliances',
    title: 'Elektrické spotřebiče',
    description: 'Spotřebiče náročné na elektrickou energii',
    icon: 'Plug',
    groups: [
      {
        id: 'current-appliances',
        title: 'Současné spotřebiče',
        icon: 'Plug',
        fields: ['currentAppliances', 'poolHeatPump', 'currentPoolType', 'electricCarType', 'airConditioningCount', 'airConditioningBuildingUnits', 'commercialUnitsCount', 'generatorType', 'generatorBatteryCapacity']
      },
      {
        id: 'future-appliances',
        title: 'Budoucí plány',
        icon: 'Calendar',
        fields: ['futureAppliances', 'futureHeatPumpPower', 'futureElectricCarType', 'futurePoolDetails', 'futureAirConditioningDetails', 'futureCommercialAirConditioningCount', 'futureAirConditioningApartmentDetails']
      }
    ],
    fields: [
      {
        id: 'currentAppliances',
        type: 'multiselect',
        label: 'Současné elektrické spotřebiče',
        required: true,
        icon: 'Plug',
        group: 'current-appliances',
        options: [
          // Family house options
          { 
            value: 'electric-heating', 
            label: 'Elektrické vytápění', 
            icon: 'Zap',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'heat-pump', 
            label: 'Tepelné čerpadlo', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'electric-boiler', 
            label: 'Elektrický bojler', 
            icon: 'Droplets',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'electric-stove', 
            label: 'Elektrický sporák (indukce)', 
            icon: 'ChefHat',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'washing-machine', 
            label: 'Pračka', 
            icon: 'Shirt',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'dishwasher', 
            label: 'Myčka', 
            icon: 'Utensils',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'dryer', 
            label: 'Sušička', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'air-conditioning', 
            label: 'Klimatizace', 
            icon: 'Snowflake',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'pool', 
            label: 'Bazén', 
            icon: 'Waves',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'sauna', 
            label: 'Sauna', 
            icon: 'Thermometer',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'electric-car', 
            label: 'Elektromobil', 
            icon: 'Car',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'wallbox', 
            label: 'Wallbox', 
            icon: 'Zap',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'workshop', 
            label: 'Dílna/garáž', 
            icon: 'Wrench',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'garden-pump', 
            label: 'Zahradní čerpadla', 
            icon: 'Droplets',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'ventilation', 
            label: 'Rekuperace', 
            icon: 'Fan',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'generator', 
            label: 'Záložní generátor elektřiny', 
            icon: 'Battery',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'none', 
            label: 'Žádné náročné spotřebiče', 
            icon: 'Minus',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          // Apartment building options
          { 
            value: 'heat-pump', 
            label: 'Tepelná čerpadla', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'pressure-pumps', 
            label: 'Čerpadla – tlaková', 
            icon: 'Gauge',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'fans', 
            label: 'Ventilátory', 
            icon: 'Fan',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'compressors', 
            label: 'Kompresory', 
            icon: 'Settings',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'washing-machine', 
            label: 'Pračka', 
            icon: 'Shirt',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'dryer', 
            label: 'Sušička', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'air-conditioning', 
            label: 'Klimatizace', 
            icon: 'Snowflake',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'sauna', 
            label: 'Sauna', 
            icon: 'Thermometer',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'pool', 
            label: 'Bazén', 
            icon: 'Waves',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'electric-car', 
            label: 'Nabíjecí stanice pro elektromobily', 
            icon: 'Car',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'generator', 
            label: 'Záložní generátor elektřiny', 
            icon: 'Battery',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'elevator', 
            label: 'Výtah', 
            icon: 'ArrowUpDown',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'ventilation', 
            label: 'Rekuperace', 
            icon: 'Fan',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'none', 
            label: 'Žádné náročné spotřebiče', 
            icon: 'Minus',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          // Commercial options
          { 
            value: 'industrial-cooling', 
            label: 'Průmyslové chlazení', 
            icon: 'Snowflake',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'industrial-heating', 
            label: 'Průmyslové vytápění', 
            icon: 'Flame',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'heat-pump', 
            label: 'Tepelná čerpadla', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'elevator', 
            label: 'Výtah', 
            icon: 'ArrowUpDown',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'ventilation-systems', 
            label: 'Vetrací systémy', 
            icon: 'Fan',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'compressors', 
            label: 'Kompresory', 
            icon: 'Settings',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'production-machines', 
            label: 'Výrobní stroje a zařízení', 
            icon: 'Cog',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'intensive-lighting', 
            label: 'Náročné osvětlení', 
            icon: 'Lightbulb',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'server-room', 
            label: 'Serverovna/IT technika', 
            icon: 'Server',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'electric-car', 
            label: 'Nabíjecí stanice pro elektromobily', 
            icon: 'Car',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'hvac-systems', 
            label: 'Klimatizační systémy', 
            icon: 'Thermometer',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'generator', 
            label: 'Záložní generátor elektřiny', 
            icon: 'Battery',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'none', 
            label: 'Žádné náročné spotřebiče', 
            icon: 'Minus',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          // Industrial options
          { 
            value: 'heavy-machinery', 
            label: 'Těžké stroje a výrobní linky', 
            icon: 'Cog',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'industrial-cooling', 
            label: 'Průmyslové chlazení', 
            icon: 'Snowflake',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'industrial-heating', 
            label: 'Průmyslové vytápění', 
            icon: 'Flame',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'heat-pump', 
            label: 'Tepelná čerpadla', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'conveyor-systems', 
            label: 'Dopravníkové systémy', 
            icon: 'ArrowRight',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'ventilation-systems', 
            label: 'Vetrací systémy', 
            icon: 'Fan',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'compressors', 
            label: 'Kompresory', 
            icon: 'Settings',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'intensive-lighting', 
            label: 'Průmyslové osvětlení', 
            icon: 'Lightbulb',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'electric-car', 
            label: 'Nabíjecí stanice pro elektromobily', 
            icon: 'Car',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'generator', 
            label: 'Záložní generátor elektřiny', 
            icon: 'Battery',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'none', 
            label: 'Žádné náročné spotřebiče', 
            icon: 'Minus',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          }
        ]
      },
      {
        id: 'poolHeatPump',
        type: 'radio',
        label: 'Máte tepelné čerpadlo k bazénu?',
        required: true,
        icon: 'Wind',
        group: 'current-appliances',
        conditional: {
          dependsOn: 'currentAppliances',
          values: ['pool']
        },
        options: [
          { value: 'yes', label: 'Ano', icon: 'Check' },
          { value: 'no', label: 'Ne', icon: 'X' }
        ]
      },
      {
        id: 'currentPoolType',
        type: 'select',
        label: 'Typ současného bazénu',
        required: true,
        icon: 'Waves',
        group: 'current-appliances',
        conditional: {
          dependsOn: 'currentAppliances',
          values: ['pool']
        },
        options: [
          { value: 'small', label: 'Malý bazén (do 20 m³, cca 2x3 m / průměr 3 m)' },
          { value: 'medium', label: 'Střední bazén (20-50 m³, cca 4x8 m / průměr 5 m)' },
          { value: 'large', label: 'Velký bazén (nad 50 m³, cca 6x12 m / průměr 8 m)' },
          { value: 'unknown', label: 'Nejsem si jistý' }
        ]
      },
      {
        id: 'electricCarType',
        type: 'select',
        label: 'Typ elektromobilu',
        required: true,
        icon: 'Car',
        group: 'current-appliances',
        conditional: {
          dependsOn: 'currentAppliances',
          values: ['electric-car'],
          and: [{
            dependsOn: 'propertyType',
            values: ['family-house']
          }]
        },
        options: [
          { value: 'small', label: 'Malý vůz (do 40 kWh baterie)' },
          { value: 'medium', label: 'Střední vůz (40-70 kWh baterie)' },
          { value: 'large', label: 'Velký vůz (nad 70 kWh baterie)' },
          { value: 'multiple', label: 'Více vozidel' }
        ]
      },
      {
        id: 'airConditioningCount',
        type: 'select',
        label: 'Počet klimatizačních jednotek',
        required: true,
        icon: 'Snowflake',
        group: 'current-appliances',
        conditional: {
          dependsOn: 'currentAppliances',
          values: ['air-conditioning'],
          and: [{
            dependsOn: 'propertyType',
            values: ['family-house']
          }]
        },
        options: [
          { value: '1', label: '1 jednotka' },
          { value: '2-3', label: '2-3 jednotky' },
          { value: '3+', label: '3+ jednotek' }
        ]
      },
      {
        id: 'airConditioningBuildingUnits',
        type: 'radio',
        label: 'Kde jsou umístěné klimatizační jednotky?',
        required: true,
        icon: 'Snowflake',
        group: 'current-appliances',
        conditional: {
          dependsOn: 'currentAppliances',
          values: ['air-conditioning'],
          and: [{
            dependsOn: 'propertyType',
            values: ['apartment-building']
          }]
        },
        options: [
          { value: 'common-areas', label: 'Pouze společné prostory' },
          { value: 'each-unit', label: 'Každá bytová jednotka' },
          { value: 'individual', label: 'Řešeno individuálně' }
        ]
      },
      {
        id: 'commercialUnitsCount',
        type: 'select',
        label: 'Kolik klimatizačních jednotek se nachází v objektu?',
        required: true,
        icon: 'Building',
        group: 'current-appliances',
        conditional: {
          dependsOn: 'currentAppliances',
          values: ['hvac-systems'],
          and: [{
            dependsOn: 'propertyType',
            values: ['commercial']
          }]
        },
        options: [
          { value: '1-5', label: '1-5 jednotek' },
          { value: '6-10', label: '6-10 jednotek' },
          { value: '11-25', label: '11-25 jednotek' },
          { value: '25+', label: '25+ jednotek' }
        ]
      },
      {
        id: 'generatorType',
        type: 'select',
        label: 'Typ záložního generátoru',
        required: true,
        icon: 'Fuel',
        group: 'current-appliances',
        conditional: {
          dependsOn: 'currentAppliances',
          values: ['generator']
        },
        options: [
          { value: 'gasoline', label: 'Benzín/nafta' },
          { value: 'gas', label: 'Plyn' },
          { value: 'battery', label: 'Baterie' }
        ]
      },
      {
        id: 'generatorBatteryCapacity',
        type: 'select',
        label: 'Kapacita bateriového generátoru',
        required: true,
        icon: 'Battery',
        group: 'current-appliances',
        conditional: {
          dependsOn: 'generatorType',
          values: ['battery']
        },
        options: [
          { value: 'under-5', label: 'Do 5 kWh' },
          { value: '5-10', label: '5-10 kWh' },
          { value: '10+', label: '10+ kWh' }
        ]
      },
      {
        id: 'futureAppliances',
        type: 'multiselect',
        label: 'Plánované budoucí změny (do 5 let)',
        required: true,
        icon: 'Calendar',
        group: 'future-appliances',
        options: [
          // Family house options
          { 
            value: 'electric-car', 
            label: 'Elektromobil', 
            icon: 'Car',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'heat-pump', 
            label: 'Tepelné čerpadlo', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'pool', 
            label: 'Bazén', 
            icon: 'Waves',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'pool-heat-pump', 
            label: 'Tepelné čerpadlo k bazénu', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'currentAppliances',
              values: ['pool'],
              and: [{
                dependsOn: 'poolHeatPump',
                values: ['no']
              }, {
                dependsOn: 'propertyType',
                values: ['family-house']
              }]
            }
          },
          { 
            value: 'air-conditioning', 
            label: 'Klimatizace', 
            icon: 'Snowflake',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'expansion', 
            label: 'Rozšíření objektu', 
            icon: 'Plus',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'workshop', 
            label: 'Dílna/garáž', 
            icon: 'Wrench',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'washing-machine', 
            label: 'Pračka', 
            icon: 'Shirt',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'dishwasher', 
            label: 'Myčka', 
            icon: 'Utensils',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'dryer', 
            label: 'Sušička', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'electric-stove', 
            label: 'Elektrický sporák (indukce)', 
            icon: 'ChefHat',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'wallbox', 
            label: 'Wallbox', 
            icon: 'Zap',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'ventilation', 
            label: 'Rekuperace', 
            icon: 'Fan',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'generator', 
            label: 'Záložní generátor elektřiny', 
            icon: 'Battery',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          { 
            value: 'none', 
            label: 'Žádné změny', 
            icon: 'Minus',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house']
            }
          },
          // Apartment building options
          { 
            value: 'heat-pump', 
            label: 'Tepelná čerpadla', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'pressure-pumps', 
            label: 'Čerpadla – tlaková', 
            icon: 'Gauge',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'fans', 
            label: 'Ventilátory', 
            icon: 'Fan',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'compressors', 
            label: 'Kompresory', 
            icon: 'Settings',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'washing-machine', 
            label: 'Pračka', 
            icon: 'Shirt',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'dryer', 
            label: 'Sušička', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'air-conditioning', 
            label: 'Klimatizace', 
            icon: 'Snowflake',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'sauna', 
            label: 'Sauna', 
            icon: 'Thermometer',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'pool', 
            label: 'Bazén', 
            icon: 'Waves',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'electric-car', 
            label: 'Nabíjecí stanice pro elektromobily', 
            icon: 'Car',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'generator', 
            label: 'Záložní generátor elektřiny', 
            icon: 'Battery',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'elevator', 
            label: 'Výtah', 
            icon: 'ArrowUpDown',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'ventilation', 
            label: 'Rekuperace', 
            icon: 'Fan',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'none', 
            label: 'Žádné změny', 
            icon: 'Minus',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          // Commercial options
          { 
            value: 'industrial-cooling', 
            label: 'Průmyslové chlazení', 
            icon: 'Snowflake',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'industrial-heating', 
            label: 'Průmyslové vytápění', 
            icon: 'Flame',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'heat-pump', 
            label: 'Tepelná čerpadla', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'elevator', 
            label: 'Výtah', 
            icon: 'ArrowUpDown',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'ventilation-systems', 
            label: 'Vetrací systémy', 
            icon: 'Fan',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'compressors', 
            label: 'Kompresory', 
            icon: 'Settings',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'production-machines', 
            label: 'Výrobní stroje a zařízení', 
            icon: 'Cog',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'intensive-lighting', 
            label: 'Náročné osvětlení', 
            icon: 'Lightbulb',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'server-room', 
            label: 'Serverovna/IT technika', 
            icon: 'Server',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'electric-car', 
            label: 'Nabíjecí stanice pro elektromobily', 
            icon: 'Car',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'hvac-systems', 
            label: 'Klimatizační systémy', 
            icon: 'Thermometer',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'generator', 
            label: 'Záložní generátor elektřiny', 
            icon: 'Battery',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'none', 
            label: 'Žádné náročné spotřebiče', 
            icon: 'Minus',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          // Industrial options
          { 
            value: 'heavy-machinery', 
            label: 'Těžké stroje a výrobní linky', 
            icon: 'Cog',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'industrial-cooling', 
            label: 'Průmyslové chlazení', 
            icon: 'Snowflake',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'industrial-heating', 
            label: 'Průmyslové vytápění', 
            icon: 'Flame',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'heat-pump', 
            label: 'Tepelná čerpadla', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'conveyor-systems', 
            label: 'Dopravníkové systémy', 
            icon: 'ArrowRight',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'ventilation-systems', 
            label: 'Vetrací systémy', 
            icon: 'Fan',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'compressors', 
            label: 'Kompresory', 
            icon: 'Settings',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'intensive-lighting', 
            label: 'Průmyslové osvětlení', 
            icon: 'Lightbulb',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'electric-car', 
            label: 'Nabíjecí stanice pro elektromobily', 
            icon: 'Car',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'generator', 
            label: 'Záložní generátor elektřiny', 
            icon: 'Battery',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'none', 
            label: 'Žádné změny', 
            icon: 'Minus',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          }
        ]
      },
      {
        id: 'futureHeatPumpPower',
        type: 'select',
        label: 'Plánovaný výkon tepelných čerpadel',
        required: true,
        icon: 'Zap',
        group: 'future-appliances',
        conditional: {
          dependsOn: 'futureAppliances',
          values: ['heat-pump']
        },
        options: [
          { value: '3-6', label: '3-6 kW' },
          { value: '6-9', label: '6-9 kW' },
          { value: '9-12', label: '9-12 kW' },
          { value: '12-16', label: '12-16 kW' },
          { value: '16-20', label: '16-20 kW' },
          { value: '20+', label: 'Nad 20 kW' }
        ]
      },
      {
        id: 'futureElectricCarType',
        type: 'select',
        label: 'Typ plánovaného elektromobilu',
        required: true,
        icon: 'Car',
        group: 'future-appliances',
        conditional: {
          dependsOn: 'futureAppliances',
          values: ['electric-car'],
          and: [{
            dependsOn: 'propertyType',
            values: ['family-house']
          }]
        },
        options: [
          { value: 'small', label: 'Malý vůz (do 40 kWh baterie)' },
          { value: 'medium', label: 'Střední vůz (40-70 kWh baterie)' },
          { value: 'large', label: 'Velký vůz (nad 70 kWh baterie)' },
          { value: 'multiple', label: 'Více vozidel' }
        ]
      },
      {
        id: 'futurePoolDetails',
        type: 'select',
        label: 'Typ plánovaného bazénu',
        required: true,
        icon: 'Waves',
        group: 'future-appliances',
        conditional: {
          dependsOn: 'futureAppliances',
          values: ['pool']
        },
        options: [
          { value: 'small', label: 'Malý bazén (do 20 m³, cca 2x3 m / průměr 3 m)' },
          { value: 'medium', label: 'Střední bazén (20-50 m³, cca 4x8 m / průměr 5 m)' },
          { value: 'large', label: 'Velký bazén (nad 50 m³, cca 6x12 m / průměr 8 m)' },
          { value: 'unknown', label: 'Nejsem si jistý' }
        ]
      },
      {
        id: 'futureAirConditioningDetails',
        type: 'select',
        label: 'Očekávaný rozsah klimatizace',
        required: true,
        icon: 'Snowflake',
        group: 'future-appliances',
        conditional: {
          dependsOn: 'futureAppliances',
          values: ['air-conditioning'],
          and: [{
            dependsOn: 'propertyType',
            values: ['family-house', 'industrial']
          }]
        },
        options: [
          { value: '1', label: '1 jednotka' },
          { value: '2-3', label: '2-3 jednotky' },
          { value: '3+', label: '3+ jednotek' }
        ]
      },
      {
        id: 'futureCommercialAirConditioningCount',
        type: 'select',
        label: 'Plánovaný počet klimatizací v objektu?',
        required: true,
        icon: 'Snowflake',
        group: 'future-appliances',
        conditional: {
          dependsOn: 'futureAppliances',
          values: ['hvac-systems'],
          and: [{
            dependsOn: 'propertyType',
            values: ['commercial']
          }]
        },
        options: [
          { value: '1-5', label: '1-5 jednotek' },
          { value: '6-10', label: '6-10 jednotek' },
          { value: '11-25', label: '11-25 jednotek' },
          { value: '25+', label: '25+ jednotek' }
        ]
      },
      {
        id: 'futureAirConditioningApartmentDetails',
        type: 'select',
        label: 'Pro jaké účely plánujete klimatizaci?',
        required: true,
        icon: 'Snowflake',
        group: 'future-appliances',
        conditional: {
          dependsOn: 'futureAppliances',
          values: ['air-conditioning'],
          and: [{
            dependsOn: 'propertyType',
            values: ['apartment-building']
          }]
        },
        options: [
          { value: 'common-areas', label: 'Pro společné prostory' },
          { value: 'each-unit', label: 'Pro každou bytovou jednotku' },
          { value: 'unknown', label: 'Zatím nevíme' }
        ]
      }
    ]
  },
  {
    id: 'budget-timeline',
    title: 'Rozpočet a časování',
    description: 'Informace o plánovaném termínu realizace',
    icon: 'Calendar',
    groups: [
      {
        id: 'financial-aspects',
        title: 'Finanční aspekty',
        icon: 'Banknote',
        fields: ['budget', 'financing']
      },
      {
        id: 'project-timeline',
        title: 'Časování projektu',
        icon: 'Calendar',
        fields: ['installationTiming', 'installationReadiness', 'constructionPhase']
      },
      {
        id: 'attachments',
        title: 'Přílohy',
        icon: 'Camera',
        fields: ['photos']
      },
      {
        id: 'additional-info',
        title: 'Dodatečné informace',
        icon: 'MessageSquare',
        fields: ['notes', 'preferredContactMethod', 'preferredContactTime']
      }
    ],
    fields: [
      {
        id: 'budget',
        type: 'select',
        label: 'Rozpočet na tepelné čerpadlo',
        required: true,
        icon: 'Banknote',
        group: 'financial-aspects',
        options: [
          { value: 'hp-up-to-150k', label: 'Do 150 000 Kč' },
          { value: 'hp-150k-250k', label: '150 000 - 250 000 Kč' },
          { value: 'hp-250k-350k', label: '250 000 - 350 000 Kč' },
          { value: 'hp-350k-500k', label: '350 000 - 500 000 Kč' },
          { value: 'hp-500k+', label: 'Nad 500 000 Kč' },
          { value: 'hp-unknown', label: 'Nemám stanovený rozpočet' }
        ]
      },
      {
        id: 'financing',
        type: 'radio',
        label: 'Způsob financování',
        required: true,
        icon: 'CreditCard',
        group: 'financial-aspects',
        options: [
          { value: 'cash', label: 'Hotovost/vlastní prostředky', icon: 'Banknote' },
          { value: 'loan', label: 'Úvěr/leasing', icon: 'CreditCard' },
          { value: 'subsidy', label: 'Dotace + vlastní prostředky', icon: 'Gift' },
          { value: 'combination', label: 'Kombinace více způsobů', icon: 'Layers' }
        ]
      },
      {
        id: 'installationTiming',
        type: 'radio',
        label: 'Kdy plánujete instalaci?',
        required: true,
        icon: 'Calendar',
        group: 'project-timeline',
        options: [
          { value: 'asap', label: 'Co nejdříve', icon: 'Zap' },
          { value: '1-3months', label: 'Během 1-3 měsíců', icon: 'Calendar' },
          { value: '3-6months', label: 'Za 3-6 měsíců', icon: 'Calendar' },
          { value: '6-12months', label: 'Za 6-12 měsíců', icon: 'CalendarClock' },
          { value: 'hp-more-than-year', label: 'Za více než rok', icon: 'CalendarDays' },
          { value: 'hp-just-info', label: 'Pouze zjišťuji informace', icon: 'Search' }
        ]
      },
      {
        id: 'installationReadiness',
        type: 'multiselect',
        label: 'Připravenost pro instalaci',
        required: false,
        icon: 'Wrench',
        group: 'project-timeline',
        options: [
          { value: 'hp-existing-system', label: 'Stávající systém je funkční a může běžet', icon: 'Check' },
          { value: 'hp-needs-replacement', label: 'Stávající systém je potřeba kompletně nahradit', icon: 'X' },
          { value: 'hp-electrical-ready', label: 'Elektroinstalace je připravena', icon: 'Zap' },
          { value: 'hp-heat-distribution-ready', label: 'Rozvody topení jsou připraveny', icon: 'Share2' },
          { value: 'hp-space-prepared', label: 'Prostor pro vnitřní jednotku je připraven', icon: 'LayoutDashboard' },
          { value: 'hp-permits-in-place', label: 'Mám potřebná povolení', icon: 'FileCheck' }
        ]
      },
      {
        id: 'constructionPhase',
        type: 'radio',
        label: 'Fáze výstavby/rekonstrukce',
        required: false,
        icon: 'Building',
        group: 'project-timeline',
        options: [
          { value: 'hp-existing', label: 'Stávající stavba bez plánované rekonstrukce', icon: 'Home' },
          { value: 'hp-planned-renovation', label: 'Plánovaná rekonstrukce', icon: 'Hammer' },
          { value: 'hp-ongoing-renovation', label: 'Probíhající rekonstrukce', icon: 'Construction' },
          { value: 'hp-new-construction', label: 'Novostavba ve výstavbě', icon: 'Building' }
        ]
      },
      {
        id: 'photos',
        type: 'file',
        label: 'Fotografie objektu nebo technické místnosti',
        placeholder: 'Nahrajte fotografie pro přesnější nabídku',
        required: false,
        icon: 'Camera',
        group: 'attachments',
        note: 'Fotografie technické místnosti, stávajícího kotle nebo venkovního prostoru pro umístění tepelného čerpadla nám pomohou lépe připravit nabídku'
      },
      {
        id: 'notes',
        type: 'textarea',
        label: 'Poznámky a další požadavky',
        placeholder: 'Zde můžete uvést jakékoli další informace, které považujete za důležité...',
        required: false,
        icon: 'FileText',
        group: 'additional-info'
      },
      {
        id: 'preferredContactMethod',
        type: 'radio',
        label: 'Preferovaný způsob kontaktu',
        required: true,
        icon: 'MessageCircle',
        group: 'additional-info',
        options: [
          { value: 'phone', label: 'Telefon', icon: 'Phone' },
          { value: 'email', label: 'E-mail', icon: 'Mail' },
          { value: 'both', label: 'Telefon i e-mail', icon: 'Users' },
          { value: 'research-only', label: 'Nechci být kontaktován/a', icon: 'X' }
        ]
      },
      {
        id: 'preferredContactTime',
        type: 'multiselect',
        label: 'Preferovaný čas pro kontakt',
        required: true,
        icon: 'Clock',
        group: 'additional-info',
        conditional: {
          dependsOn: 'preferredContactMethod',
          values: ['phone', 'both']
        },
        options: [
          { value: 'morning', label: 'Dopoledne (8-12h)', icon: 'Sunrise' },
          { value: 'afternoon', label: 'Odpoledne (12-17h)', icon: 'Sun' },
          { value: 'evening', label: 'Večer (17-20h)', icon: 'Sunset' },
          { value: 'weekend', label: 'Víkend', icon: 'Calendar' }
        ]
      }
    ]
  },
  {
    id: 'summary',
    title: 'Souhrn a dokončení',
    description: 'Zkontrolujte údaje a dokončete poptávku',
    icon: 'CheckCircle',
    groups: [
      {
        id: 'contact-preferences',
        title: 'Preference kontaktu',
        icon: 'Phone',
        fields: ['contactPreference', 'contactTime']
      },
      {
        id: 'consent',
        title: 'Souhlasy',
        icon: 'Shield',
        fields: ['gdprConsent', 'marketingConsent']
      }
    ],
    fields: [
      {
        id: 'contactPreference',
        type: 'radio',
        label: 'Preferovaný způsob kontaktu',
        required: true,
        icon: 'Phone',
        group: 'contact-preferences',
        options: [
          { value: 'phone', label: 'Telefonicky', icon: 'Phone' },
          { value: 'email', label: 'E-mailem', icon: 'Mail' },
          { value: 'both', label: 'Telefonicky i e-mailem', icon: 'MessageCircle' },
          { value: 'research-only', label: 'Nechci být kontaktován, jen si dělám průzkum', icon: 'Search' }
        ]
      },
      {
        id: 'contactTime',
        type: 'multiselect',
        label: 'Vhodný čas pro kontakt',
        required: true,
        icon: 'Clock',
        group: 'contact-preferences',
        conditional: {
          dependsOn: 'contactPreference',
          values: ['phone', 'both']
        },
        options: [
          { value: 'morning', label: 'Ráno (8-12h)', icon: 'Sunrise' },
          { value: 'afternoon', label: 'Odpoledne (12-17h)', icon: 'Sun' },
          { value: 'evening', label: 'Večer (17-20h)', icon: 'Sunset' },
          { value: 'weekend', label: 'Víkend', icon: 'Calendar' }
        ]
      },
      {
        id: 'gdprConsent',
        type: 'checkbox',
        label: 'Souhlasím s všeobecnými podmínkami a beru na vědomí zpracování osobních údajů',
        required: true,
        icon: 'Shield',
        group: 'consent',
        linkText: 'všeobecnými podmínkami a zpracování osobních údajů',
        linkUrl: '#'
      },
      {
        id: 'marketingConsent',
        type: 'checkbox',
        label: 'Souhlasím s kontaktováním ohledně dalších nabídek a novinek v oblasti tepelných čerpadel a vytápění',
        required: false,
        icon: 'Mail',
        group: 'consent'
      }
    ]
  }
];

// Definice kompletního průvodce pro výběr tepelného čerpadla
export const vybertepelkoWizard: Wizard = {
  id: 'vybertepelko',
  name: 'Průvodce výběrem tepelného čerpadla',
  description: 'Interaktivní průvodce pro výběr tepelného čerpadla. Získejte nabídku na míru během několika minut.',
  category: 'Vytápění',
  steps: vybertepelkoSteps,
  settings: {
    theme: {
      primaryColor: '#c2410c',
      secondaryColor: '#ea580c',
      accentColor: '#f97316',
      backgroundColor: '#FFFFFF',
      textColor: '#111827',
      fontFamily: 'Inter',
      borderRadius: '12px',
      shadows: true,
      animations: true,
      gradientBackground: true,
      gradientDirection: 'to-br',
      gradientColors: ['#fff7ed', '#ffffff', '#ffedd5'],
    },
    behavior: {
      showProgressBar: true,
      progressBarStyle: 'steps',
      allowBackNavigation: true,
      allowSkipSteps: false,
      autoSave: true,
      requireEmail: true,
      showBranding: true,
      stepTransition: 'slide',
    },
    completion: {
      message: 'Děkujeme za vyplnění průvodce výběrem tepelného čerpadla!',
      collectAnalytics: false,
      showDownloadPdf: true,
      emailNotification: true,
    },
    embedding: {
      allowedDomains: [],
      allowCustomization: true,
    },
    integrations: {
      mapyApiKey: 'vCdbERKNLmfB7W-gZ1LgJyP2Ou0UnXeR1NhQxB1RclU',
    },
  }
};