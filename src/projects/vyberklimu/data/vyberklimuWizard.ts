import { Wizard, WizardStep } from '../../../shared/types/wizard';

// Definice všech kroků průvodce pro výběr klimatizace
export const vyberklimuSteps: WizardStep[] = [
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
    id: 'property-type',
    title: 'Typ a lokace objektu',
    description: 'Specifikujte typ nemovitosti a její umístění',
    icon: 'MapPin',
    groups: [
      {
        id: 'property-basic',
        title: 'Základní informace o objektu',
        icon: 'Home',
        fields: ['propertyType', 'propertyOwnership', 'propertyOwnershipOther', 'monumentZone', 'buildingAge', 'floorArea', 'floorCount', 'ceilingHeight']
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
          { value: 'ac-new', label: 'Novostavba (do 5 let)' },
          { value: 'ac-recent', label: '5-15 let' },
          { value: 'ac-older', label: '15-30 let' },
          { value: 'ac-old', label: 'Nad 30 let' }
        ]
      },
      {
        id: 'floorArea',
        type: 'number',
        label: 'Plocha prostoru pro klimatizaci (m²)',
        placeholder: 'Např. 120',
        required: true,
        icon: 'Ruler',
        group: 'property-basic',
        validation: {
          min: 5,
          max: 5000,
          message: 'Plocha musí být mezi 5 a 5000 m²'
        }
      },
      {
        id: 'floorCount',
        type: 'select',
        label: 'Počet podlaží budovy',
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
        id: 'ceilingHeight',
        type: 'select',
        label: 'Výška stropů',
        required: true,
        icon: 'ArrowUpDown',
        group: 'property-basic',
        options: [
          { value: 'ac-low', label: 'Nízké (do 2.5m)' },
          { value: 'ac-standard', label: 'Standardní (2.5-3m)' },
          { value: 'ac-high', label: 'Vysoké (nad 3m)' }
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
    id: 'ac-requirements',
    title: 'Požadavky na klimatizaci',
    description: 'Specifikujte vaše potřeby pro klimatizaci',
    icon: 'Snowflake',
    groups: [
      {
        id: 'ac-basic',
        title: 'Základní požadavky',
        icon: 'Snowflake',
        fields: ['acPurpose', 'acRooms', 'acUnits']
      },
      {
        id: 'ac-features',
        title: 'Požadované funkce',
        icon: 'Settings',
        fields: ['acFeatures', 'acSmartFeatures', 'acEfficiency']
      },
      {
        id: 'cooling-power',
        title: 'Chladicí a topný výkon',
        icon: 'Thermometer',
        fields: ['acCoolingPower', 'acHeatingPower']
      }
    ],
    fields: [
      {
        id: 'acPurpose',
        type: 'radio',
        label: 'Účel klimatizace',
        required: true,
        icon: 'Snowflake',
        group: 'ac-basic',
        options: [
          { value: 'ac-cooling', label: 'Pouze chlazení', icon: 'Snowflake' },
          { value: 'ac-cooling-heating', label: 'Chlazení a vytápění', icon: 'Thermometer' },
          { value: 'ac-all-year', label: 'Celoroční použití (vytápění i chlazení)', icon: 'Calendar' }
        ]
      },
      {
        id: 'acRooms',
        type: 'multiselect',
        label: 'Místnosti pro klimatizaci',
        required: true,
        icon: 'LayoutDashboard',
        group: 'ac-basic',
        options: [
          { value: 'ac-living-room', label: 'Obývací pokoj', icon: 'Sofa' },
          { value: 'ac-bedroom', label: 'Ložnice', icon: 'Bed' },
          { value: 'ac-kitchen', label: 'Kuchyně', icon: 'ChefHat' },
          { value: 'ac-office', label: 'Pracovna/kancelář', icon: 'Briefcase' },
          { value: 'ac-children-room', label: 'Dětský pokoj', icon: 'Baby' },
          { value: 'ac-hall', label: 'Chodba/hala', icon: 'Door' },
          { value: 'ac-meeting-room', label: 'Jednací místnost', icon: 'Users', conditional: { dependsOn: 'propertyType', values: ['commercial', 'industrial'] } },
          { value: 'ac-production-area', label: 'Výrobní prostory', icon: 'Factory', conditional: { dependsOn: 'propertyType', values: ['industrial'] } },
          { value: 'ac-warehouse', label: 'Sklad', icon: 'Package', conditional: { dependsOn: 'propertyType', values: ['commercial', 'industrial'] } },
          { value: 'ac-server-room', label: 'Serverovna', icon: 'Server', conditional: { dependsOn: 'propertyType', values: ['commercial', 'industrial'] } },
          { value: 'ac-other', label: 'Jiná místnost', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'acUnits',
        type: 'radio',
        label: 'Preferovaný typ klimatizace',
        required: true,
        icon: 'Box',
        group: 'ac-basic',
        options: [
          { value: 'ac-split', label: 'Nástěnné split jednotky (pro jednotlivé místnosti)', icon: 'SplitSquareVertical' },
          { value: 'ac-multi-split', label: 'Multi-split (jedna venkovní, více vnitřních)', icon: 'Network' },
          { value: 'ac-central', label: 'Centrální klimatizace (rozvody po celém objektu)', icon: 'Layout' },
          { value: 'ac-cassette', label: 'Kazetové jednotky (do podhledů)', icon: 'Grid3x3', conditional: { dependsOn: 'propertyType', values: ['commercial', 'industrial'] } },
          { value: 'ac-ducted', label: 'Potrubní jednotky (skryté rozvody)', icon: 'Layers', conditional: { dependsOn: 'propertyType', values: ['commercial', 'industrial'] } },
          { value: 'ac-portable', label: 'Mobilní jednotky (bez instalace)', icon: 'Move' },
          { value: 'ac-advice', label: 'Potřebuji poradit s výběrem', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'acFeatures',
        type: 'multiselect',
        label: 'Důležité funkce',
        required: false,
        icon: 'ListChecks',
        group: 'ac-features',
        options: [
          { value: 'ac-low-noise', label: 'Tichý provoz', icon: 'Volume1' },
          { value: 'ac-air-purification', label: 'Čištění vzduchu / filtrace', icon: 'Wind' },
          { value: 'ac-dehumidification', label: 'Odvlhčování', icon: 'Droplets' },
          { value: 'ac-wifi', label: 'WiFi připojení / ovládání aplikací', icon: 'Wifi' },
          { value: 'ac-energy-efficiency', label: 'Vysoká energetická účinnost', icon: 'Zap' },
          { value: 'ac-design', label: 'Designové provedení', icon: 'Palette' },
          { value: 'ac-inverter', label: 'Inverter technologie', icon: 'BarChart3' },
          { value: 'ac-heat-recovery', label: 'Rekuperace tepla', icon: 'RefreshCw' }
        ]
      },
      {
        id: 'acSmartFeatures',
        type: 'multiselect',
        label: 'Chytré funkce',
        required: false,
        icon: 'Smartphone',
        group: 'ac-features',
        options: [
          { value: 'ac-app-control', label: 'Ovládání přes mobilní aplikaci', icon: 'Smartphone' },
          { value: 'ac-voice-control', label: 'Hlasové ovládání (Google, Alexa, Siri)', icon: 'Mic' },
          { value: 'ac-scheduling', label: 'Automatické plánování provozu', icon: 'Calendar' },
          { value: 'ac-presence-detection', label: 'Detekce přítomnosti osob', icon: 'User' },
          { value: 'ac-remote-diagnostics', label: 'Vzdálená diagnostika', icon: 'ActivitySquare' },
          { value: 'ac-energy-monitoring', label: 'Monitoring spotřeby energie', icon: 'TrendingUp' },
          { value: 'ac-geofencing', label: 'Geofencing (automatické zapnutí při příchodu)', icon: 'MapPin' }
        ]
      },
      {
        id: 'acEfficiency',
        type: 'radio',
        label: 'Preferovaná energetická třída',
        required: true,
        icon: 'Zap',
        group: 'ac-features',
        options: [
          { value: 'ac-a+++', label: 'A+++ (nejvyšší účinnost)', icon: 'Star' },
          { value: 'ac-a++', label: 'A++', icon: 'Star' },
          { value: 'ac-a+', label: 'A+', icon: 'Star' },
          { value: 'ac-any', label: 'Nevím / není důležité', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'acCoolingPower',
        type: 'select',
        label: 'Požadovaný chladicí výkon',
        required: true,
        icon: 'Snowflake',
        group: 'cooling-power',
        options: [
          { value: 'ac-cooling-low', label: 'Nízký (do 2.5 kW)' },
          { value: 'ac-cooling-medium', label: 'Střední (2.5 - 5 kW)' },
          { value: 'ac-cooling-high', label: 'Vysoký (5 - 10 kW)' },
          { value: 'ac-cooling-very-high', label: 'Velmi vysoký (nad 10 kW)' },
          { value: 'ac-cooling-unknown', label: 'Nevím, potřebuji poradit' }
        ]
      },
      {
        id: 'acHeatingPower',
        type: 'select',
        label: 'Požadovaný topný výkon',
        required: true,
        icon: 'Flame',
        group: 'cooling-power',
        conditional: {
          dependsOn: 'acPurpose',
          values: ['ac-cooling-heating', 'ac-all-year']
        },
        options: [
          { value: 'ac-heating-low', label: 'Nízký (do 3 kW)' },
          { value: 'ac-heating-medium', label: 'Střední (3 - 6 kW)' },
          { value: 'ac-heating-high', label: 'Vysoký (6 - 12 kW)' },
          { value: 'ac-heating-very-high', label: 'Velmi vysoký (nad 12 kW)' },
          { value: 'ac-heating-unknown', label: 'Nevím, potřebuji poradit' }
        ]
      }
    ]
  },
  {
    id: 'current-situation',
    title: 'Současná situace',
    description: 'Informace o stávajícím stavu a přípravách',
    icon: 'Home',
    groups: [
      {
        id: 'existing-cooling',
        title: 'Stávající chlazení',
        icon: 'Fan',
        fields: ['hasCooling', 'coolingType', 'coolingAge', 'coolingProblems']
      },
      {
        id: 'installation-readiness',
        title: 'Připravenost pro instalaci',
        icon: 'Wrench',
        fields: ['hasOutdoorSpace', 'hasElectricalReadiness', 'hasWallPermission', 'outdoorUnitDistance']
      },
      {
        id: 'structural-details',
        title: 'Stavební připravenost',
        icon: 'Building',
        fields: ['hasOpenings', 'renovationPlans', 'buildingRestrictions']
      }
    ],
    fields: [
      {
        id: 'hasCooling',
        type: 'radio',
        label: 'Máte v současnosti nějaký systém chlazení?',
        required: true,
        icon: 'Fan',
        group: 'existing-cooling',
        options: [
          { value: 'ac-yes', label: 'Ano', icon: 'Check' },
          { value: 'ac-no', label: 'Ne', icon: 'X' }
        ]
      },
      {
        id: 'coolingType',
        type: 'multiselect',
        label: 'Jaký typ chlazení používáte?',
        required: true,
        icon: 'Fan',
        group: 'existing-cooling',
        conditional: {
          dependsOn: 'hasCooling',
          values: ['ac-yes']
        },
        options: [
          { value: 'ac-portable-ac', label: 'Mobilní klimatizace', icon: 'Move' },
          { value: 'ac-split-ac', label: 'Split jednotky', icon: 'SplitSquareVertical' },
          { value: 'ac-fans', label: 'Ventilátory', icon: 'Fan' },
          { value: 'ac-central-ac', label: 'Centrální klimatizace', icon: 'Layout' },
          { value: 'ac-evaporative', label: 'Evaporativní chlazení', icon: 'Droplets' },
          { value: 'ac-other-cooling', label: 'Jiné', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'coolingAge',
        type: 'select',
        label: 'Stáří stávajícího chlazení',
        required: false,
        icon: 'Clock',
        group: 'existing-cooling',
        conditional: {
          dependsOn: 'hasCooling',
          values: ['ac-yes']
        },
        options: [
          { value: 'ac-age-0-2', label: '0-2 roky' },
          { value: 'ac-age-3-5', label: '3-5 let' },
          { value: 'ac-age-6-10', label: '6-10 let' },
          { value: 'ac-age-10+', label: 'Více než 10 let' }
        ]
      },
      {
        id: 'coolingProblems',
        type: 'multiselect',
        label: 'Problémy se stávajícím chlazením',
        required: false,
        icon: 'AlertTriangle',
        group: 'existing-cooling',
        conditional: {
          dependsOn: 'hasCooling',
          values: ['ac-yes']
        },
        options: [
          { value: 'ac-insufficient-cooling', label: 'Nedostatečné chlazení', icon: 'Thermometer' },
          { value: 'ac-high-consumption', label: 'Vysoká spotřeba energie', icon: 'Zap' },
          { value: 'ac-noise', label: 'Hluk', icon: 'Volume2' },
          { value: 'ac-frequent-breakdowns', label: 'Časté poruchy', icon: 'AlertCircle' },
          { value: 'ac-poor-air-quality', label: 'Špatná kvalita vzduchu', icon: 'Wind' },
          { value: 'ac-uneven-cooling', label: 'Nerovnoměrné chlazení', icon: 'BarChart3' }
        ]
      },
      {
        id: 'hasOutdoorSpace',
        type: 'radio',
        label: 'Máte vhodné místo pro venkovní jednotku?',
        required: true,
        icon: 'ExternalLink',
        group: 'installation-readiness',
        options: [
          { value: 'ac-space-yes', label: 'Ano, mám vhodné místo', icon: 'Check' },
          { value: 'ac-space-limited', label: 'Ano, ale s omezeními', icon: 'AlertTriangle' },
          { value: 'ac-space-no', label: 'Ne, bude potřeba řešit', icon: 'X' },
          { value: 'ac-space-unsure', label: 'Nejsem si jistý/á', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'hasElectricalReadiness',
        type: 'radio',
        label: 'Máte připravenou elektroinstalaci pro klimatizaci?',
        required: true,
        icon: 'Zap',
        group: 'installation-readiness',
        options: [
          { value: 'ac-electrical-yes', label: 'Ano', icon: 'Check' },
          { value: 'ac-electrical-no', label: 'Ne', icon: 'X' },
          { value: 'ac-electrical-unsure', label: 'Nejsem si jistý/á', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'hasWallPermission',
        type: 'radio',
        label: 'Máte povolení k zásahu do fasády/stěn?',
        required: true,
        icon: 'Building',
        group: 'installation-readiness',
        conditional: {
          dependsOn: 'propertyOwnership',
          values: ['tenant']
        },
        options: [
          { value: 'ac-permission-yes', label: 'Ano, mám povolení', icon: 'Check' },
          { value: 'ac-permission-pending', label: 'Zatím ne, ale plánuji získat', icon: 'Clock' },
          { value: 'ac-permission-no', label: 'Ne', icon: 'X' },
          { value: 'ac-permission-unsure', label: 'Nejsem si jistý/á', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'outdoorUnitDistance',
        type: 'select',
        label: 'Vzdálenost venkovní jednotky od vnitřních',
        required: false,
        icon: 'Ruler',
        group: 'installation-readiness',
        options: [
          { value: 'ac-distance-0-3', label: 'Do 3 metrů' },
          { value: 'ac-distance-3-5', label: '3-5 metrů' },
          { value: 'ac-distance-5-10', label: '5-10 metrů' },
          { value: 'ac-distance-10+', label: 'Nad 10 metrů' },
          { value: 'ac-distance-unknown', label: 'Nevím' }
        ]
      },
      {
        id: 'hasOpenings',
        type: 'radio',
        label: 'Máte již připravené průchody pro vedení?',
        required: false,
        icon: 'Aperture',
        group: 'structural-details',
        options: [
          { value: 'ac-openings-yes', label: 'Ano', icon: 'Check' },
          { value: 'ac-openings-no', label: 'Ne', icon: 'X' },
          { value: 'ac-openings-partial', label: 'Částečně', icon: 'AlertTriangle' }
        ]
      },
      {
        id: 'renovationPlans',
        type: 'radio',
        label: 'Plánujete v blízké době rekonstrukci?',
        required: false,
        icon: 'Wrench',
        group: 'structural-details',
        options: [
          { value: 'ac-reno-soon', label: 'Ano, v nejbližších 6 měsících', icon: 'Calendar' },
          { value: 'ac-reno-later', label: 'Ano, za 6-12 měsíců', icon: 'CalendarClock' },
          { value: 'ac-reno-no', label: 'Ne', icon: 'X' }
        ]
      },
      {
        id: 'buildingRestrictions',
        type: 'multiselect',
        label: 'Stavební omezení',
        required: false,
        icon: 'Shield',
        group: 'structural-details',
        options: [
          { value: 'ac-historic-building', label: 'Historická budova', icon: 'Landmark' },
          { value: 'ac-facade-restrictions', label: 'Omezení na fasádu', icon: 'Square' },
          { value: 'ac-roof-restrictions', label: 'Omezení na střechu', icon: 'Triangle' },
          { value: 'ac-noise-restrictions', label: 'Hlukové omezení', icon: 'Volume1' },
          { value: 'ac-no-restrictions', label: 'Žádná omezení', icon: 'Check' }
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
            label: 'Žádné změny', 
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
    description: 'Finanční a časové preference',
    icon: 'Banknote',
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
        fields: ['installationTiming', 'preferredContactMethod', 'preferredContactTime']
      }
    ],
    fields: [
      {
        id: 'budget',
        type: 'select',
        label: 'Předpokládaný rozpočet na klimatizaci',
        required: true,
        icon: 'Banknote',
        group: 'financial-aspects',
        options: [
          { value: 'ac-under-30k', label: 'Do 30 000 Kč' },
          { value: 'ac-30k-50k', label: '30 000 - 50 000 Kč' },
          { value: 'ac-50k-80k', label: '50 000 - 80 000 Kč' },
          { value: 'ac-80k-120k', label: '80 000 - 120 000 Kč' },
          { value: 'ac-120k-200k', label: '120 000 - 200 000 Kč' },
          { value: 'ac-over-200k', label: 'Nad 200 000 Kč' },
          { value: 'ac-not-set', label: 'Nemám stanovený rozpočet' }
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
          { value: 'ac-installments', label: 'Splátkový prodej', icon: 'Calendar' },
          { value: 'ac-undecided', label: 'Ještě nevím', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'installationTiming',
        type: 'radio',
        label: 'Kdy plánujete realizaci?',
        required: true,
        icon: 'Calendar',
        group: 'project-timeline',
        options: [
          { value: 'asap', label: 'Co nejdříve', icon: 'Zap' },
          { value: '1-3months', label: 'Během 1-3 měsíců', icon: 'CalendarCheck' },
          { value: '3-6months', label: 'Za 3-6 měsíců', icon: 'CalendarClock' },
          { value: 'ac-6+months', label: 'Za více než 6 měsíců', icon: 'CalendarDays' },
          { value: 'ac-just-info', label: 'Jen zjišťuji informace', icon: 'Search' }
        ]
      },
      {
        id: 'preferredContactMethod',
        type: 'radio',
        label: 'Preferovaný způsob kontaktu',
        required: true,
        icon: 'MessageCircle',
        group: 'project-timeline',
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
        group: 'project-timeline',
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
    id: 'documents-notes',
    title: 'Dokumenty a poznámky',
    description: 'Nahrajte relevantní dokumenty a přidejte poznámky pro přesnější nabídku',
    icon: 'Upload',
    groups: [
      {
        id: 'attachments',
        title: 'Fotografie a plány',
        icon: 'Camera',
        fields: ['photos', 'buildingPlans']
      },
      {
        id: 'additional-info',
        title: 'Poznámky a speciální požadavky',
        icon: 'MessageSquare',
        fields: ['notes', 'additionalRequirements']
      }
    ],
    fields: [
      {
        id: 'photos',
        type: 'file',
        label: 'Fotografie místností nebo budovy',
        placeholder: 'Přidejte fotografie místností pro lepší návrh řešení',
        required: false,
        icon: 'Camera',
        group: 'attachments',
        note: 'Fotografie nám pomohou lépe navrhnout umístění jednotek klimatizace'
      },
      {
        id: 'buildingPlans',
        type: 'file',
        label: 'Půdorys nebo plány budovy',
        placeholder: 'Přidejte půdorys nebo plány budovy, pokud jsou k dispozici',
        required: false,
        icon: 'FileText',
        group: 'attachments',
        note: 'Půdorysy pomáhají při návrhu optimálního umístění jednotek a vedení'
      },
      {
        id: 'notes',
        type: 'textarea',
        label: 'Poznámky a speciální požadavky',
        placeholder: 'Jakékoli další informace, které nám mohou pomoci lépe porozumět vašim požadavkům...',
        required: false,
        icon: 'FileText',
        group: 'additional-info'
      },
      {
        id: 'additionalRequirements',
        type: 'multiselect',
        label: 'Další speciální požadavky',
        required: false,
        icon: 'List',
        group: 'additional-info',
        options: [
          { value: 'ac-design-focus', label: 'Důraz na design jednotek', icon: 'Palette' },
          { value: 'ac-ultra-quiet', label: 'Extrémně tichý provoz', icon: 'Volume' },
          { value: 'ac-allergy-filter', label: 'Filtrace alergenů', icon: 'Flower2' },
          { value: 'ac-quick-install', label: 'Rychlá instalace', icon: 'Clock' },
          { value: 'ac-specific-brand', label: 'Konkrétní značka/výrobce', icon: 'Star' },
          { value: 'ac-maintenance-contract', label: 'Zájem o servisní smlouvu', icon: 'FileCheck' },
          { value: 'ac-eco-friendly', label: 'Ekologické chladivo', icon: 'Leaf' }
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
        label: 'Souhlasím s kontaktováním ohledně dalších nabídek a novinek v oblasti klimatizací a vzduchotechniky',
        required: false,
        icon: 'Mail',
        group: 'consent'
      }
    ]
  }
];

// Definice kompletního průvodce pro výběr klimatizace
export const vyberklimuWizard: Wizard = {
  id: 'vyberklimu',
  name: 'Průvodce výběrem klimatizace',
  description: 'Interaktivní průvodce pro výběr klimatizace. Získejte nabídku na míru během několika minut.',
  category: 'Vzduchotechnika',
  steps: vyberklimuSteps,
  settings: {
    theme: {
      primaryColor: '#0891b2',
      secondaryColor: '#0e7490',
      accentColor: '#06b6d4',
      backgroundColor: '#FFFFFF',
      textColor: '#111827',
      fontFamily: 'Inter',
      borderRadius: '12px',
      shadows: true,
      animations: true,
      gradientBackground: true,
      gradientDirection: 'to-br',
      gradientColors: ['#f0fdfa', '#ffffff', '#ecfeff'],
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
      message: 'Děkujeme za vyplnění průvodce výběrem klimatizace!',
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