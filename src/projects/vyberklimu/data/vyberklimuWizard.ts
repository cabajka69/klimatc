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
        fields: ['propertyType', 'propertyOwnership']
      },
      {
        id: 'location',
        title: 'Lokace objektu',
        icon: 'MapPin',
        fields: ['address', 'region']
      },
      {
        id: 'building-details',
        title: 'Detaily budovy',
        icon: 'Building',
        fields: ['buildingAge', 'floorArea', 'floorCount', 'ceilingHeight']
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
          { value: 'apartment', label: 'Byt', icon: 'Building2' },
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
          { value: 'tenant', label: 'Nájemník', icon: 'Users' }
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
          apiKey: 'VÁŠ_API_KLÍČ_MAPY_CZ', // Nahraďte svým skutečným API klíčem
          searchParam: 'query',
          responseField: 'items'
        }
      },
      {
        id: 'region',
        type: 'select',
        label: 'Kraj',
        required: true,
        icon: 'Map',
        group: 'location',
        options: [
          { value: 'praha', label: 'Praha' },
          { value: 'stredocesky', label: 'Středočeský kraj' },
          { value: 'jihocesky', label: 'Jihočeský kraj' },
          { value: 'plzensky', label: 'Plzeňský kraj' },
          { value: 'karlovarsky', label: 'Karlovarský kraj' },
          { value: 'ustecky', label: 'Ústecký kraj' },
          { value: 'liberecky', label: 'Liberecký kraj' },
          { value: 'kralovehradecky', label: 'Královéhradecký kraj' },
          { value: 'pardubicky', label: 'Pardubický kraj' },
          { value: 'vysocina', label: 'Kraj Vysočina' },
          { value: 'jihomoravsky', label: 'Jihomoravský kraj' },
          { value: 'olomoucky', label: 'Olomoucký kraj' },
          { value: 'zlinsky', label: 'Zlínský kraj' },
          { value: 'moravskoslezsky', label: 'Moravskoslezský kraj' }
        ]
      },
      {
        id: 'buildingAge',
        type: 'select',
        label: 'Stáří budovy',
        required: true,
        icon: 'Clock',
        group: 'building-details',
        options: [
          { value: 'new', label: 'Novostavba (do 5 let)' },
          { value: 'recent', label: '5-15 let' },
          { value: 'older', label: '15-30 let' },
          { value: 'old', label: 'Nad 30 let' }
        ]
      },
      {
        id: 'floorArea',
        type: 'number',
        label: 'Plocha prostoru pro klimatizaci (m²)',
        placeholder: 'Např. 120',
        required: true,
        icon: 'Ruler',
        group: 'building-details',
        validation: {
          min: 5,
          max: 1000,
          message: 'Plocha musí být mezi 5 a 1000 m²'
        }
      },
      {
        id: 'floorCount',
        type: 'select',
        label: 'Počet podlaží budovy',
        required: false,
        icon: 'Layers',
        group: 'building-details',
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
        required: false,
        icon: 'ArrowUpDown',
        group: 'building-details',
        options: [
          { value: 'low', label: 'Nízké (do 2.5m)' },
          { value: 'standard', label: 'Standardní (2.5-3m)' },
          { value: 'high', label: 'Vysoké (nad 3m)' }
        ]
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
        title: 'Chladicí výkon',
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
          { value: 'cooling', label: 'Pouze chlazení', icon: 'Snowflake' },
          { value: 'cooling-heating', label: 'Chlazení a vytápění', icon: 'Thermometer' },
          { value: 'all-year', label: 'Celoroční použití (vytápění i chlazení)', icon: 'Calendar' }
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
          { value: 'living-room', label: 'Obývací pokoj', icon: 'Sofa' },
          { value: 'bedroom', label: 'Ložnice', icon: 'Bed' },
          { value: 'kitchen', label: 'Kuchyně', icon: 'ChefHat' },
          { value: 'office', label: 'Pracovna/kancelář', icon: 'Briefcase' },
          { value: 'children-room', label: 'Dětský pokoj', icon: 'Baby' },
          { value: 'hall', label: 'Chodba/hala', icon: 'Door' },
          { value: 'other', label: 'Jiná místnost', icon: 'HelpCircle' }
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
          { value: 'split', label: 'Nástěnné split jednotky (pro jednotlivé místnosti)', icon: 'SplitSquareVertical' },
          { value: 'multi-split', label: 'Multi-split (jedna venkovní, více vnitřních)', icon: 'Network' },
          { value: 'central', label: 'Centrální klimatizace (rozvody po celém objektu)', icon: 'Layout' },
          { value: 'portable', label: 'Mobilní jednotky (bez instalace)', icon: 'Move' },
          { value: 'advice', label: 'Potřebuji poradit s výběrem', icon: 'HelpCircle' }
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
          { value: 'low-noise', label: 'Tichý provoz', icon: 'Volume1' },
          { value: 'air-purification', label: 'Čištění vzduchu / filtrace', icon: 'Wind' },
          { value: 'dehumidification', label: 'Odvlhčování', icon: 'Droplets' },
          { value: 'wifi', label: 'WiFi připojení / ovládání aplikací', icon: 'Wifi' },
          { value: 'energy-efficiency', label: 'Vysoká energetická účinnost', icon: 'Zap' },
          { value: 'design', label: 'Designové provedení', icon: 'Palette' }
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
          { value: 'app-control', label: 'Ovládání přes mobilní aplikaci', icon: 'Smartphone' },
          { value: 'voice-control', label: 'Hlasové ovládání (Google, Alexa, Siri)', icon: 'Mic' },
          { value: 'scheduling', label: 'Automatické plánování provozu', icon: 'Calendar' },
          { value: 'presence-detection', label: 'Detekce přítomnosti osob', icon: 'User' },
          { value: 'remote-diagnostics', label: 'Vzdálená diagnostika', icon: 'ActivitySquare' }
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
          { value: 'a+++', label: 'A+++ (nejvyšší účinnost)', icon: 'Star' },
          { value: 'a++', label: 'A++', icon: 'Star' },
          { value: 'a+', label: 'A+', icon: 'Star' },
          { value: 'any', label: 'Nevím / není důležité', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'acCoolingPower',
        type: 'select',
        label: 'Požadovaný chladicí výkon',
        required: false,
        icon: 'Snowflake',
        group: 'cooling-power',
        options: [
          { value: 'low', label: 'Nízký (do 2.5 kW)' },
          { value: 'medium', label: 'Střední (2.5 - 5 kW)' },
          { value: 'high', label: 'Vysoký (5 - 10 kW)' },
          { value: 'very-high', label: 'Velmi vysoký (nad 10 kW)' },
          { value: 'unknown', label: 'Nevím, potřebuji poradit' }
        ]
      },
      {
        id: 'acHeatingPower',
        type: 'select',
        label: 'Požadovaný topný výkon',
        required: false,
        icon: 'Flame',
        group: 'cooling-power',
        conditional: {
          dependsOn: 'acPurpose',
          values: ['cooling-heating', 'all-year']
        },
        options: [
          { value: 'low', label: 'Nízký (do 3 kW)' },
          { value: 'medium', label: 'Střední (3 - 6 kW)' },
          { value: 'high', label: 'Vysoký (6 - 12 kW)' },
          { value: 'very-high', label: 'Velmi vysoký (nad 12 kW)' },
          { value: 'unknown', label: 'Nevím, potřebuji poradit' }
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
        fields: ['hasCooling', 'coolingType', 'coolingAge']
      },
      {
        id: 'installation-readiness',
        title: 'Připravenost pro instalaci',
        icon: 'Wrench',
        fields: ['hasOutdoorSpace', 'hasElectricalReadiness', 'hasWallPermission', 'outdoorUnitDistance']
      },
      {
        id: 'structural',
        title: 'Stavební připravenost',
        icon: 'Building',
        fields: ['hasOpenings', 'renovationPlans']
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
          { value: 'yes', label: 'Ano', icon: 'Check' },
          { value: 'no', label: 'Ne', icon: 'X' }
        ]
      },
      {
        id: 'coolingType',
        type: 'select',
        label: 'Jaký typ chlazení používáte?',
        required: true,
        icon: 'Fan',
        group: 'existing-cooling',
        conditional: {
          dependsOn: 'hasCooling',
          values: ['yes']
        },
        options: [
          { value: 'portable-ac', label: 'Mobilní klimatizace' },
          { value: 'split-ac', label: 'Split jednotky' },
          { value: 'fans', label: 'Ventilátory' },
          { value: 'central', label: 'Centrální klimatizace' },
          { value: 'other', label: 'Jiné' }
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
          values: ['yes']
        },
        options: [
          { value: '0-2', label: '0-2 roky' },
          { value: '3-5', label: '3-5 let' },
          { value: '6-10', label: '6-10 let' },
          { value: '10+', label: 'Více než 10 let' }
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
          { value: 'yes', label: 'Ano, mám vhodné místo', icon: 'Check' },
          { value: 'limited', label: 'Ano, ale s omezeními', icon: 'AlertTriangle' },
          { value: 'no', label: 'Ne, bude potřeba řešit', icon: 'X' },
          { value: 'unsure', label: 'Nejsem si jistý/á', icon: 'HelpCircle' }
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
          { value: 'yes', label: 'Ano', icon: 'Check' },
          { value: 'no', label: 'Ne', icon: 'X' },
          { value: 'unsure', label: 'Nejsem si jistý/á', icon: 'HelpCircle' }
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
          { value: 'yes', label: 'Ano, mám povolení', icon: 'Check' },
          { value: 'pending', label: 'Zatím ne, ale plánuji získat', icon: 'Clock' },
          { value: 'no', label: 'Ne', icon: 'X' },
          { value: 'unsure', label: 'Nejsem si jistý/á', icon: 'HelpCircle' }
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
          { value: '0-3', label: 'Do 3 metrů' },
          { value: '3-5', label: '3-5 metrů' },
          { value: '5-10', label: '5-10 metrů' },
          { value: '10+', label: 'Nad 10 metrů' },
          { value: 'unknown', label: 'Nevím' }
        ]
      },
      {
        id: 'hasOpenings',
        type: 'radio',
        label: 'Máte již připravené průchody pro vedení?',
        required: false,
        icon: 'Aperture',
        group: 'structural',
        options: [
          { value: 'yes', label: 'Ano', icon: 'Check' },
          { value: 'no', label: 'Ne', icon: 'X' },
          { value: 'partial', label: 'Částečně', icon: 'AlertTriangle' }
        ]
      },
      {
        id: 'renovationPlans',
        type: 'radio',
        label: 'Plánujete v blízké době rekonstrukci?',
        required: false,
        icon: 'Wrench',
        group: 'structural',
        options: [
          { value: 'yes-soon', label: 'Ano, v nejbližších 6 měsících', icon: 'Calendar' },
          { value: 'yes-later', label: 'Ano, za 6-12 měsíců', icon: 'CalendarClock' },
          { value: 'no', label: 'Ne', icon: 'X' }
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
        id: 'budget',
        title: 'Rozpočet',
        icon: 'Banknote',
        fields: ['budget', 'financing']
      },
      {
        id: 'timeline',
        title: 'Časování',
        icon: 'Calendar',
        fields: ['installationTime', 'preferredContactMethod', 'preferredContactTime']
      }
    ],
    fields: [
      {
        id: 'budget',
        type: 'select',
        label: 'Předpokládaný rozpočet na klimatizaci',
        required: true,
        icon: 'Banknote',
        group: 'budget',
        options: [
          { value: 'under-30k', label: 'Do 30 000 Kč' },
          { value: '30k-50k', label: '30 000 - 50 000 Kč' },
          { value: '50k-80k', label: '50 000 - 80 000 Kč' },
          { value: '80k-120k', label: '80 000 - 120 000 Kč' },
          { value: 'over-120k', label: 'Nad 120 000 Kč' },
          { value: 'not-set', label: 'Nemám stanovený rozpočet' }
        ]
      },
      {
        id: 'financing',
        type: 'radio',
        label: 'Způsob financování',
        required: false,
        icon: 'CreditCard',
        group: 'budget',
        options: [
          { value: 'cash', label: 'Hotovost / vlastní prostředky', icon: 'Banknote' },
          { value: 'loan', label: 'Úvěr / leasing', icon: 'CreditCard' },
          { value: 'installments', label: 'Splátkový prodej', icon: 'Calendar' },
          { value: 'undecided', label: 'Ještě nevím', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'installationTime',
        type: 'radio',
        label: 'Kdy plánujete realizaci?',
        required: true,
        icon: 'Calendar',
        group: 'timeline',
        options: [
          { value: 'asap', label: 'Co nejdříve', icon: 'Zap' },
          { value: '1-3months', label: 'Během 1-3 měsíců', icon: 'CalendarCheck' },
          { value: '3-6months', label: 'Za 3-6 měsíců', icon: 'CalendarClock' },
          { value: '6+months', label: 'Za více než 6 měsíců', icon: 'CalendarDays' },
          { value: 'just-info', label: 'Jen zjišťuji informace', icon: 'Search' }
        ]
      },
      {
        id: 'preferredContactMethod',
        type: 'radio',
        label: 'Preferovaný způsob kontaktu',
        required: true,
        icon: 'MessageCircle',
        group: 'timeline',
        options: [
          { value: 'phone', label: 'Telefon', icon: 'Phone' },
          { value: 'email', label: 'E-mail', icon: 'Mail' },
          { value: 'both', label: 'Telefon i e-mail', icon: 'Users' },
          { value: 'none', label: 'Nechci být kontaktován/a', icon: 'X' }
        ]
      },
      {
        id: 'preferredContactTime',
        type: 'multiselect',
        label: 'Preferovaný čas pro kontakt',
        required: false,
        icon: 'Clock',
        group: 'timeline',
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
    id: 'additional-info',
    title: 'Doplňující informace',
    description: 'Další informace pro přesnější nabídku',
    icon: 'FileText',
    groups: [
      {
        id: 'photos',
        title: 'Fotografie a plány',
        icon: 'Camera',
        fields: ['photos', 'buildingPlans']
      },
      {
        id: 'notes',
        title: 'Poznámky a požadavky',
        icon: 'FileText',
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
        group: 'photos',
        note: 'Fotografie nám pomohou lépe navrhnout umístění jednotek klimatizace'
      },
      {
        id: 'buildingPlans',
        type: 'file',
        label: 'Půdorys nebo plány budovy',
        placeholder: 'Přidejte půdorys nebo plány budovy, pokud jsou k dispozici',
        required: false,
        icon: 'FileText',
        group: 'photos',
        note: 'Půdorysy pomáhají při návrhu optimálního umístění jednotek a vedení'
      },
      {
        id: 'notes',
        type: 'textarea',
        label: 'Poznámky',
        placeholder: 'Jakékoli další informace, které nám mohou pomoci lépe porozumět vašim požadavkům...',
        required: false,
        icon: 'FileText',
        group: 'notes'
      },
      {
        id: 'additionalRequirements',
        type: 'multiselect',
        label: 'Další speciální požadavky',
        required: false,
        icon: 'List',
        group: 'notes',
        options: [
          { value: 'design', label: 'Důraz na design jednotek', icon: 'Palette' },
          { value: 'noise', label: 'Extrémně tichý provoz', icon: 'Volume' },
          { value: 'allergens', label: 'Filtrace alergenů', icon: 'Flower2' },
          { value: 'installation', label: 'Rychlá instalace', icon: 'Clock' },
          { value: 'brand', label: 'Konkrétní značka/výrobce', icon: 'Star' }
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
        id: 'consent',
        title: 'Souhlasy',
        icon: 'Shield',
        fields: ['gdprConsent', 'marketingConsent']
      }
    ],
    fields: [
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
  id: 'vyberklima',
  name: 'Průvodce výběrem klimatizace',
  description: 'Interaktivní průvodce pro výběr klimatizace. Získejte nabídku na míru během několika minut.',
  category: 'Vzduchotechnika',
  steps: vyberklimuSteps,
  settings: {
    theme: {
      primaryColor: '#0891b2', // Tyrkysová barva pro klimatizaci (teal-600)
      secondaryColor: '#0e7490', // Tmavší tyrkysová (teal-700)
      accentColor: '#06b6d4', // Světlejší tyrkysová (teal-500)
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
      showBranding: false,
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
      mapyApiKey: 'vCdbERKNLmfB7W-gZ1LgJyP2Ou0UnXeR1NhQxB1RclU', // Aktualizováno s platným API klíčem
    },
  }
};