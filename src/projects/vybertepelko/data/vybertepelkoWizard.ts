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
        fields: ['propertyType', 'buildingAge', 'floorArea', 'floorCount', 'roomCount']
      },
      {
        id: 'location',
        title: 'Lokace',
        icon: 'MapPin',
        fields: ['address', 'region']
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
          { value: 'recreational', label: 'Rekreační objekt', icon: 'Tent' },
          { value: 'commercial', label: 'Komerční objekt', icon: 'Store' },
          { value: 'industrial', label: 'Průmyslový objekt', icon: 'Factory' }
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
          { value: 'new', label: 'Novostavba (do 5 let)' },
          { value: 'recent', label: '5-20 let' },
          { value: 'older', label: '20-50 let' },
          { value: 'historic', label: 'Nad 50 let' }
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
          max: 2000,
          message: 'Plocha musí být mezi 20 a 2000 m²'
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
        required: false,
        icon: 'LayoutDashboard',
        group: 'property-basic',
        options: [
          { value: '1-2', label: '1-2 místnosti' },
          { value: '3-4', label: '3-4 místnosti' },
          { value: '5-6', label: '5-6 místností' },
          { value: '7+', label: '7 a více místností' }
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
        fields: ['currentHeating', 'currentHeatingAge', 'heatingDistribution']
      },
      {
        id: 'insulation',
        title: 'Izolace objektu',
        icon: 'Layers',
        fields: ['insulationStatus', 'windowsStatus', 'roofInsulation']
      },
      {
        id: 'energy',
        title: 'Spotřeba energie',
        icon: 'Zap',
        fields: ['annualHeatingConsumption', 'monthlyHeatingCosts']
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
          { value: 'gas', label: 'Plynový kotel', icon: 'Flame' },
          { value: 'electric', label: 'Elektrické topení', icon: 'Zap' },
          { value: 'solid-fuel', label: 'Kotel na tuhá paliva (uhlí, dřevo)', icon: 'Flame' },
          { value: 'heat-pump', label: 'Tepelné čerpadlo', icon: 'Wind' },
          { value: 'district', label: 'Dálkové vytápění', icon: 'Building' },
          { value: 'other', label: 'Jiné', icon: 'HelpCircle' }
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
          { value: 'new', label: 'Nový (do 2 let)' },
          { value: 'recent', label: '2-5 let' },
          { value: 'older', label: '5-10 let' },
          { value: 'old', label: '10-20 let' },
          { value: 'very-old', label: 'Nad 20 let' }
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
          { value: 'radiators', label: 'Radiátory', icon: 'Square' },
          { value: 'floor-heating', label: 'Podlahové vytápění', icon: 'Grid' },
          { value: 'wall-heating', label: 'Stěnové vytápění', icon: 'Layout' },
          { value: 'air-heating', label: 'Teplovzdušné vytápění', icon: 'Wind' },
          { value: 'mixed', label: 'Kombinace více typů', icon: 'Layers' }
        ]
      },
      {
        id: 'insulationStatus',
        type: 'radio',
        label: 'Stav zateplení obvodových stěn',
        required: true,
        icon: 'Layers',
        group: 'insulation',
        options: [
          { value: 'none', label: 'Bez zateplení', icon: 'X' },
          { value: 'partial', label: 'Částečné zateplení', icon: 'AlertTriangle' },
          { value: 'complete', label: 'Kompletní zateplení', icon: 'Check' }
        ]
      },
      {
        id: 'windowsStatus',
        type: 'select',
        label: 'Typ oken',
        required: true,
        icon: 'Square',
        group: 'insulation',
        options: [
          { value: 'old', label: 'Stará jednoduchá/dvojitá' },
          { value: 'plastic-double', label: 'Plastová dvojskla' },
          { value: 'plastic-triple', label: 'Plastová trojskla' },
          { value: 'wood-double', label: 'Dřevěná dvojskla' },
          { value: 'wood-triple', label: 'Dřevěná trojskla' },
          { value: 'aluminum', label: 'Hliníková okna' },
          { value: 'mixed', label: 'Kombinace více typů' }
        ]
      },
      {
        id: 'roofInsulation',
        type: 'radio',
        label: 'Izolace střechy/stropu',
        required: true,
        icon: 'Home',
        group: 'insulation',
        conditional: {
          dependsOn: 'propertyType',
          values: ['family-house', 'recreational']
        },
        options: [
          { value: 'none', label: 'Bez izolace', icon: 'X' },
          { value: 'minimal', label: 'Minimální izolace', icon: 'Minimize' },
          { value: 'standard', label: 'Standardní izolace', icon: 'Square' },
          { value: 'high', label: 'Nadstandardní izolace', icon: 'Maximize' }
        ]
      },
      {
        id: 'annualHeatingConsumption',
        type: 'select',
        label: 'Roční spotřeba tepla (přibližně)',
        required: false,
        icon: 'Gauge',
        group: 'energy',
        options: [
          { value: 'unknown', label: 'Nevím' },
          { value: '5-10', label: '5-10 MWh' },
          { value: '10-15', label: '10-15 MWh' },
          { value: '15-20', label: '15-20 MWh' },
          { value: '20-30', label: '20-30 MWh' },
          { value: '30+', label: 'Nad 30 MWh' }
        ]
      },
      {
        id: 'monthlyHeatingCosts',
        type: 'select',
        label: 'Průměrné měsíční náklady na vytápění',
        required: false,
        icon: 'Banknote',
        group: 'energy',
        options: [
          { value: 'unknown', label: 'Nevím' },
          { value: '1000-2000', label: '1 000 - 2 000 Kč' },
          { value: '2000-4000', label: '2 000 - 4 000 Kč' },
          { value: '4000-6000', label: '4 000 - 6 000 Kč' },
          { value: '6000-10000', label: '6 000 - 10 000 Kč' },
          { value: '10000+', label: 'Nad 10 000 Kč' }
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
        id: 'heat-pump-type',
        title: 'Typ tepelného čerpadla',
        icon: 'Wind',
        fields: ['heatPumpType', 'preferredBrand', 'preferredPower']
      },
      {
        id: 'features',
        title: 'Funkce a využití',
        icon: 'Settings',
        fields: ['additionalFeatures', 'hotWaterHeating']
      },
      {
        id: 'requirements',
        title: 'Speciální požadavky',
        icon: 'ListChecks',
        fields: ['noiseConcerns', 'designPreferences', 'mobilityNeeds']
      }
    ],
    fields: [
      {
        id: 'heatPumpType',
        type: 'radio',
        label: 'Preferovaný typ tepelného čerpadla',
        required: true,
        icon: 'Wind',
        group: 'heat-pump-type',
        options: [
          { value: 'air-water', label: 'Vzduch-voda (nejběžnější)', icon: 'Cloud' },
          { value: 'earth-water', label: 'Země-voda (vrty, kolektory)', icon: 'Mountain' },
          { value: 'water-water', label: 'Voda-voda (studny)', icon: 'Droplets' },
          { value: 'air-air', label: 'Vzduch-vzduch', icon: 'Wind' },
          { value: 'any', label: 'Nevím, potřebuji poradit', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'preferredBrand',
        type: 'multiselect',
        label: 'Preferované značky',
        required: false,
        icon: 'Star',
        group: 'heat-pump-type',
        options: [
          { value: 'mitsubishi', label: 'Mitsubishi Electric' },
          { value: 'daikin', label: 'Daikin' },
          { value: 'panasonic', label: 'Panasonic' },
          { value: 'nibe', label: 'NIBE' },
          { value: 'stiebel-eltron', label: 'Stiebel Eltron' },
          { value: 'lg', label: 'LG' },
          { value: 'samsung', label: 'Samsung' },
          { value: 'bosch', label: 'Bosch' },
          { value: 'viessmann', label: 'Viessmann' },
          { value: 'other', label: 'Jiná' },
          { value: 'no-preference', label: 'Nemám preference' }
        ]
      },
      {
        id: 'preferredPower',
        type: 'select',
        label: 'Požadovaný výkon tepelného čerpadla',
        required: false,
        icon: 'Zap',
        group: 'heat-pump-type',
        options: [
          { value: 'unknown', label: 'Nevím, potřebuji poradit' },
          { value: '5-8', label: '5-8 kW' },
          { value: '8-12', label: '8-12 kW' },
          { value: '12-16', label: '12-16 kW' },
          { value: '16-22', label: '16-22 kW' },
          { value: '22+', label: 'Nad 22 kW' }
        ]
      },
      {
        id: 'additionalFeatures',
        type: 'multiselect',
        label: 'Dodatečné funkce',
        required: false,
        icon: 'ListChecks',
        group: 'features',
        options: [
          { value: 'cooling', label: 'Chlazení v létě', icon: 'Snowflake' },
          { value: 'smart-control', label: 'Chytré ovládání přes aplikaci', icon: 'Smartphone' },
          { value: 'energy-monitoring', label: 'Monitoring spotřeby energie', icon: 'BarChart' },
          { value: 'hybrid-operation', label: 'Hybridní provoz (s jiným zdrojem)', icon: 'Layers' },
          { value: 'weather-compensation', label: 'Ekvitermní regulace', icon: 'Thermometer' }
        ]
      },
      {
        id: 'hotWaterHeating',
        type: 'radio',
        label: 'Ohřev teplé užitkové vody',
        required: true,
        icon: 'Droplets',
        group: 'features',
        options: [
          { value: 'integrated', label: 'Požaduji integrovaný ohřev TUV', icon: 'Check' },
          { value: 'separate', label: 'Požaduji oddělený systém ohřevu TUV', icon: 'Square' },
          { value: 'no', label: 'Nepožaduji ohřev TUV', icon: 'X' },
          { value: 'unsure', label: 'Nejsem si jistý/á', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'noiseConcerns',
        type: 'radio',
        label: 'Obavy z hluku venkovní jednotky',
        required: false,
        icon: 'Volume2',
        group: 'requirements',
        conditional: {
          dependsOn: 'heatPumpType',
          values: ['air-water', 'air-air']
        },
        options: [
          { value: 'high', label: 'Vysoké obavy (sousedé, ložnice)', icon: 'AlertCircle' },
          { value: 'moderate', label: 'Střední obavy', icon: 'AlertTriangle' },
          { value: 'low', label: 'Nízké obavy', icon: 'CheckSquare' },
          { value: 'none', label: 'Žádné obavy', icon: 'Check' }
        ]
      },
      {
        id: 'designPreferences',
        type: 'radio',
        label: 'Preference vzhledu vnitřních jednotek',
        required: false,
        icon: 'Palette',
        group: 'requirements',
        options: [
          { value: 'important', label: 'Velmi důležitý (musí ladit s interiérem)', icon: 'Star' },
          { value: 'somewhat', label: 'Středně důležitý', icon: 'StarHalf' },
          { value: 'not-important', label: 'Není důležitý', icon: 'X' }
        ]
      },
      {
        id: 'mobilityNeeds',
        type: 'radio',
        label: 'Máte zájem o mobilní ovládání?',
        required: false,
        icon: 'Smartphone',
        group: 'requirements',
        options: [
          { value: 'yes', label: 'Ano, je to pro mě důležité', icon: 'Check' },
          { value: 'nice-to-have', label: 'Bylo by to plus, ale není to nutné', icon: 'ThumbsUp' },
          { value: 'no', label: 'Ne, nepotřebuji to', icon: 'X' }
        ]
      }
    ]
  },
  {
    id: 'installation-timing',
    title: 'Časování instalace',
    description: 'Informace o plánovaném termínu realizace',
    icon: 'Calendar',
    groups: [
      {
        id: 'budget-timeline',
        title: 'Rozpočet a termín',
        icon: 'Banknote',
        fields: ['budget', 'installationTiming']
      },
      {
        id: 'preparation',
        title: 'Připravenost',
        icon: 'Wrench',
        fields: ['installationReadiness', 'constructionPhase']
      },
      {
        id: 'extra-info',
        title: 'Doplňující informace',
        icon: 'FileText',
        fields: ['photos', 'notes']
      }
    ],
    fields: [
      {
        id: 'budget',
        type: 'select',
        label: 'Rozpočet na tepelné čerpadlo',
        required: true,
        icon: 'Banknote',
        group: 'budget-timeline',
        options: [
          { value: 'up-to-150k', label: 'Do 150 000 Kč' },
          { value: '150k-250k', label: '150 000 - 250 000 Kč' },
          { value: '250k-350k', label: '250 000 - 350 000 Kč' },
          { value: '350k-500k', label: '350 000 - 500 000 Kč' },
          { value: '500k+', label: 'Nad 500 000 Kč' },
          { value: 'unknown', label: 'Nemám stanovený rozpočet' }
        ]
      },
      {
        id: 'installationTiming',
        type: 'radio',
        label: 'Kdy plánujete instalaci?',
        required: true,
        icon: 'Calendar',
        group: 'budget-timeline',
        options: [
          { value: 'asap', label: 'Co nejdříve', icon: 'Zap' },
          { value: '1-3months', label: 'Během 1-3 měsíců', icon: 'Calendar' },
          { value: '3-6months', label: 'Za 3-6 měsíců', icon: 'Calendar' },
          { value: '6-12months', label: 'Za 6-12 měsíců', icon: 'CalendarClock' },
          { value: 'more-than-year', label: 'Za více než rok', icon: 'CalendarDays' },
          { value: 'just-info', label: 'Pouze zjišťuji informace', icon: 'Search' }
        ]
      },
      {
        id: 'installationReadiness',
        type: 'multiselect',
        label: 'Připravenost pro instalaci',
        required: false,
        icon: 'Wrench',
        group: 'preparation',
        options: [
          { value: 'existing-system', label: 'Stávající systém je funkční a může běžet', icon: 'Check' },
          { value: 'needs-replacement', label: 'Stávající systém je potřeba kompletně nahradit', icon: 'X' },
          { value: 'electrical-ready', label: 'Elektroinstalace je připravena', icon: 'Zap' },
          { value: 'heat-distribution-ready', label: 'Rozvody topení jsou připraveny', icon: 'Share2' },
          { value: 'space-prepared', label: 'Prostor pro vnitřní jednotku je připraven', icon: 'LayoutDashboard' },
          { value: 'permits-in-place', label: 'Mám potřebná povolení', icon: 'FileCheck' }
        ]
      },
      {
        id: 'constructionPhase',
        type: 'radio',
        label: 'Fáze výstavby/rekonstrukce',
        required: false,
        icon: 'Building',
        group: 'preparation',
        options: [
          { value: 'existing', label: 'Stávající stavba bez plánované rekonstrukce', icon: 'Home' },
          { value: 'planned-renovation', label: 'Plánovaná rekonstrukce', icon: 'Hammer' },
          { value: 'ongoing-renovation', label: 'Probíhající rekonstrukce', icon: 'Construction' },
          { value: 'new-construction', label: 'Novostavba ve výstavbě', icon: 'Building' }
        ]
      },
      {
        id: 'photos',
        type: 'file',
        label: 'Fotografie objektu nebo technické místnosti',
        placeholder: 'Nahrajte fotografie pro přesnější nabídku',
        required: false,
        icon: 'Camera',
        group: 'extra-info',
        note: 'Fotografie technické místnosti, stávajícího kotle nebo venkovního prostoru pro umístění tepelného čerpadla nám pomohou lépe připravit nabídku'
      },
      {
        id: 'notes',
        type: 'textarea',
        label: 'Poznámky a další požadavky',
        placeholder: 'Zde můžete uvést jakékoli další informace, které považujete za důležité...',
        required: false,
        icon: 'FileText',
        group: 'extra-info'
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
          values: ['phone', 'email', 'both']
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
      primaryColor: '#c2410c', // Oranžová barva pro tepelná čerpadla (orange-700)
      secondaryColor: '#ea580c', // Světlejší oranžová (orange-600)
      accentColor: '#f97316', // Světlá oranžová (orange-500)
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
      showBranding: false,
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
      mapyApiKey: 'vCdbERKNLmfB7W-gZ1LgJyP2Ou0UnXeR1NhQxB1RclU', // Aktualizováno s platným API klíčem
    },
  }
};