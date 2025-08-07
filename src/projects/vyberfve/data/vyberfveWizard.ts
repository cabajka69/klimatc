import { Wizard, WizardStep } from '../../../shared/types/wizard';

// Definice všech kroků průvodce pro výběr FVE
export const vyberfveSteps: WizardStep[] = [
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
        fields: ['propertyType', 'propertyOwnership', 'propertyOwnershipOther', 'monumentZone']
      },
      {
        id: 'location',
        title: 'Lokace objektu',
        icon: 'MapPin',
        fields: ['address', 'distributionArea']
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
        id: 'address',
        type: 'autocomplete',
        label: 'Adresa objektu',
        placeholder: 'Začněte psát adresu...',
        required: true,
        icon: 'MapPin',
        group: 'location',
        autocompleteConfig: {
          apiUrl: 'https://api.mapy.cz/v1/suggest',
          apiKey: 'vCdbERKNLmfB7W-gZ1LgJyP2Ou0UnXeR1NhQxB1RclU', // Nahraďte svým skutečným API klíčem
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
    id: 'roof-details',
    title: 'Umístění fotovoltaiky',
    description: 'Místo a parametry instalace fotovoltaiky',
    icon: 'Triangle',
    groups: [
      {
        id: 'installation-location',
        title: 'Umístění instalace',
        icon: 'MapPin',
        fields: ['installationLocation', 'groundArea']
      },
      {
        id: 'roof-basic',
        title: 'Základní parametry střechy',
        icon: 'Triangle',
        fields: ['roofType', 'roofInclination', 'roofArea']
      },
      {
        id: 'roof-technical',
        title: 'Technické vlastnosti',
        icon: 'Settings',
        fields: ['roofOrientation', 'roofMaterial', 'roofAge', 'shading']
      }
    ],
    fields: [
      {
        id: 'installationLocation',
        type: 'multiselect',
        label: 'Umístění instalace',
        required: true,
        icon: 'MapPin',
        group: 'installation-location',
        options: [
          { value: 'roof', label: 'Střecha', icon: 'Triangle' },
          { value: 'facade', label: 'Fasáda', icon: 'Square' },
          { value: 'ground', label: 'Na zemi', icon: 'Circle' }
        ]
      },
      {
        id: 'groundArea',
        type: 'number',
        label: 'Orientační plocha na zemi (m²)',
        placeholder: 'Např. 200',
        required: false,
        icon: 'Ruler',
        group: 'installation-location',
        conditional: {
          dependsOn: 'installationLocation',
          values: ['ground']
        },
        validation: {
          min: 10,
          max: 10000,
          message: 'Plocha musí být mezi 10 a 10000 m²'
        }
      },
      {
        id: 'roofType',
        type: 'radio',
        label: 'Typ střechy',
        required: true,
        icon: 'Triangle',
        group: 'roof-basic',
        conditional: {
          dependsOn: 'installationLocation',
          values: ['roof']
        },
        options: [
          { value: 'pitched', label: 'Sedlová střecha', icon: 'Triangle' },
          { value: 'shed', label: 'Pultová střecha', icon: 'Triangle' },
          { value: 'flat-sloped', label: 'Plochá se spádem', icon: 'Square' },
          { value: 'flat', label: 'Rovná střecha', icon: 'Minus' }
        ]
      },
      {
        id: 'roofInclination',
        type: 'slider',
        label: 'Sklon střechy (stupně)',
        required: false,
        icon: 'TrendingUp',
        group: 'roof-basic',
        conditional: {
          dependsOn: 'roofType',
          values: ['pitched', 'shed', 'flat-sloped']
        },
        sliderConfig: {
          min: 0,
          max: 60,
          step: 5,
          unit: '°',
          marks: [
            { value: 0, label: '0°' },
            { value: 15, label: '15°' },
            { value: 30, label: '30°' },
            { value: 45, label: '45°' },
            { value: 60, label: '60°' }
          ]
        }
      },
      {
        id: 'roofArea',
        type: 'number',
        label: 'Orientační plocha střechy (m²)',
        placeholder: 'Např. 150',
        required: false,
        icon: 'Ruler',
        group: 'roof-basic',
        conditional: {
          dependsOn: 'installationLocation',
          values: ['roof']
        },
        enableAreaCalculation: true,
        validation: {
          min: 10,
          max: 10000,
          message: 'Plocha musí být mezi 10 a 10000 m²'
        }
      },
      {
        id: 'roofOrientation',
        type: 'multiselect',
        label: 'Jakou orientaci má střecha, na kterou budete chtít umístit fotovoltaiku?',
        required: false,
        icon: 'Compass',
        group: 'roof-technical',
        conditional: {
          dependsOn: 'installationLocation',
          values: ['roof']
        },
        options: [
          { value: 'east', label: 'Východ (E)', icon: 'ArrowRight' },
          { value: 'west', label: 'Západ (W)', icon: 'ArrowLeft' },
          { value: 'south', label: 'Jih (S)', icon: 'ArrowDown' },
          { value: 'north', label: 'Sever (N)', icon: 'ArrowUp' },
          { value: 'southeast', label: 'Jihovýchod (SE)', icon: 'ArrowDownRight' },
          { value: 'southwest', label: 'Jihozápad (SW)', icon: 'ArrowDownLeft' },
          { value: 'northeast', label: 'Severovýchod (NE)', icon: 'ArrowUpRight' },
          { value: 'northwest', label: 'Severozápad (NW)', icon: 'ArrowUpLeft' }
        ]
      },
      {
        id: 'roofMaterial',
        type: 'select',
        label: 'Materiál střechy',
        required: true,
        icon: 'Layers',
        group: 'roof-technical',
        conditional: {
          dependsOn: 'installationLocation',
          values: ['roof']
        },
        options: [
          { value: 'tiles', label: 'Tašky (betonové/pálené)' },
          { value: 'sheet-metal', label: 'Plech (trapézový/falcovaný)' },
          { value: 'concrete', label: 'Beton' },
          { value: 'slate', label: 'Břidlice' },
          { value: 'shingles', label: 'Šindele' },
          { value: 'other', label: 'Jiné' }
        ]
      },
      {
        id: 'roofAge',
        type: 'select',
        label: 'Stáří střechy',
        required: true,
        icon: 'Clock',
        group: 'roof-technical',
        conditional: {
          dependsOn: 'installationLocation',
          values: ['roof']
        },
        options: [
          { value: 'new', label: 'Do 5 let' },
          { value: 'good', label: '5-15 let' },
          { value: 'older', label: '15-30 let' },
          { value: 'old', label: 'Nad 30 let' }
        ]
      },
      {
        id: 'shading',
        type: 'radio',
        label: 'Zastínění střechy',
        required: true,
        icon: 'Cloud',
        group: 'roof-technical',
        conditional: {
          dependsOn: 'installationLocation',
          values: ['roof']
        },
        options: [
          { value: 'none', label: 'Žádné zastínění', icon: 'Sun' },
          { value: 'minimal', label: 'Minimální (komíny, antény)', icon: 'CloudDrizzle' },
          { value: 'partial', label: 'Částečné (stromy, budovy)', icon: 'Cloud' },
          { value: 'significant', label: 'Výrazné zastínění', icon: 'CloudRain' }
        ]
      }
    ]
  },
  {
    id: 'fve-type',
    title: 'Druh fotovoltaiky',
    description: 'Vyberte typ fotovoltaického systému podle vašich potřeb',
    icon: 'Zap',
    groups: [
      {
        id: 'fve-main',
        title: 'Typ FVE systému',
        icon: 'Zap',
        fields: ['fveType']
      },
      {
        id: 'heat-pump-check',
        title: 'Kontrola tepelného čerpadla',
        icon: 'Wind',
        fields: ['hasHeatPump', 'heatPumpType', 'heatPumpPower']
      },
      {
        id: 'water-heating',
        title: 'Ohřev vody',
        icon: 'Droplets',
        fields: ['hasAccumulationTank', 'tankSize', 'currentWaterHeating', 'currentWaterHeatingOther']
      },
      {
        id: 'battery',
        title: 'Bateriové úložiště',
        icon: 'Battery',
        fields: ['batteryCapacity']
      }
    ],
    fields: [
      {
        id: 'fveType',
        type: 'multiselect',
        label: 'Jaký typ FVE systému hledáte?',
        required: true,
        icon: 'Zap',
        group: 'fve-main',
        options: [
          { 
            value: 'direct-consumption', 
            label: 'Fotovoltaika pro vlastní spotřebu v provozu (bez baterií)', 
            icon: 'Zap',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house', 'apartment-building']
            }
          },
          { 
            value: 'fve-commercial-consumption', 
            label: 'Fotovoltaika pro vlastní spotřebu v provozu (bez baterií)', 
            icon: 'Zap',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'fve-industrial-consumption', 
            label: 'Fotovoltaika pro vlastní spotřebu v provozu (bez baterií)', 
            icon: 'Zap',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'water-heating', 
            label: 'Fotovoltaika na ohřev vody', 
            icon: 'Droplets',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house', 'apartment-building']
            }
          },
          { 
            value: 'heat-pump', 
            label: 'Fotovoltaika v kombinaci s tepelným čerpadlem', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house', 'apartment-building']
            }
          },
          { 
            value: 'battery', 
            label: 'Fotovoltaika s akumulací do baterií pro zálohování a špičkovou spotřebu', 
            icon: 'Battery',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house', 'apartment-building']
            }
          },
          { 
            value: 'fve-commercial-battery', 
            label: 'Fotovoltaika s akumulací do baterií pro zálohování a špičkovou spotřebu', 
            icon: 'Battery',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'fve-industrial-battery', 
            label: 'Fotovoltaika s akumulací do baterií pro zálohování a špičkovou spotřebu', 
            icon: 'Battery',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'fve-commercial-integration', 
            label: 'Fotovoltaika s integrací do provozu (např. chlazení, kompresory)', 
            icon: 'Cog',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial']
            }
          },
          { 
            value: 'fve-industrial-integration', 
            label: 'Fotovoltaika s integrací do strojního provozu (např. chlazení, kompresory)', 
            icon: 'Cog',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'fve-esg', 
            label: 'Fotovoltaika jako součást ESG / zelené strategie firmy', 
            icon: 'Leaf',
            conditional: {
              dependsOn: 'propertyType',
              values: ['commercial', 'industrial']
            }
          },
          { 
            value: 'fve-offgrid', 
            label: 'Ostrovní systém / záložní systém', 
            icon: 'BatteryCharging',
            conditional: {
              dependsOn: 'propertyType',
              values: ['family-house', 'apartment-building', 'commercial']
            }
          },
          { 
            value: 'fve-industrial-offgrid', 
            label: 'Ostrovní systém / záložní systém pro kritickou infrastrukturu', 
            icon: 'BatteryCharging',
            conditional: {
              dependsOn: 'propertyType',
              values: ['industrial']
            }
          },
          { 
            value: 'common-areas', 
            label: 'Fotovoltaika pro společné prostory', 
            icon: 'Building',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          },
          { 
            value: 'individual-units', 
            label: 'Fotovoltaika s rozdělením na jednotlivé byty', 
            icon: 'Home',
            conditional: {
              dependsOn: 'propertyType',
              values: ['apartment-building']
            }
          }
        ]
      },
      {
        id: 'hasHeatPump',
        type: 'radio',
        label: 'Máte tepelné čerpadlo?',
        required: true,
        icon: 'Wind',
        group: 'heat-pump-check',
        conditional: {
          dependsOn: 'fveType',
          values: ['heat-pump']
        },
        options: [
          { value: 'yes', label: 'Ano', icon: 'Check' },
          { value: 'no', label: 'Ne', icon: 'X' }
        ]
      },
      {
        id: 'heatPumpType',
        type: 'select',
        label: 'Typ tepelného čerpadla',
        required: true,
        icon: 'Wind',
        group: 'heat-pump-check',
        conditional: {
          dependsOn: 'hasHeatPump',
          values: ['yes']
        },
        options: [
          { value: 'air-water', label: 'Vzduch-voda' },
          { value: 'ground-water', label: 'Země-voda (zemní kolektor)' },
          { value: 'water-water', label: 'Voda-voda (studna)' }
        ]
      },
      {
        id: 'heatPumpPower',
        type: 'select',
        label: 'Výkon tepelného čerpadla',
        required: true,
        icon: 'Zap',
        group: 'heat-pump-check',
        conditional: {
          dependsOn: 'hasHeatPump',
          values: ['yes']
        },
        options: [
          { value: '3-6', label: '3-6 kW' },
          { value: '6-9', label: '6-9 kW' },
          { value: '9-12', label: '9-12 kW' },
          { value: '12-16', label: '12-16 kW' },
          { value: '16-20', label: '16-20 kW' },
          { value: '20+', label: 'Nad 20 kW' },
          { value: 'unsure', label: 'Nejsem si jist' }
        ]
      },
      {
        id: 'hasAccumulationTank',
        type: 'radio',
        label: 'Máte akumulační nádrž?',
        required: true,
        icon: 'Droplets',
        group: 'water-heating',
        conditional: {
          dependsOn: 'fveType',
          values: ['water-heating']
        },
        options: [
          { value: 'yes', label: 'Ano', icon: 'Check' },
          { value: 'no', label: 'Ne', icon: 'X' }
        ]
      },
      {
        id: 'tankSize',
        type: 'select',
        label: 'Velikost akumulační nádrže',
        required: true,
        icon: 'Droplets',
        group: 'water-heating',
        conditional: {
          dependsOn: 'hasAccumulationTank',
          values: ['yes']
        },
        options: [
          { value: '100', label: '100 litrů' },
          { value: '150', label: '150 litrů' },
          { value: '200', label: '200 litrů' },
          { value: '300', label: '300 litrů' },
          { value: '500', label: '500 litrů' },
          { value: '1000', label: '1000 litrů' },
          { value: 'other', label: 'Jiná velikost' }
        ]
      },
      {
        id: 'currentWaterHeating',
        type: 'select',
        label: 'Jak aktuálně ohříváte teplou vodu?',
        required: true,
        icon: 'Flame',
        group: 'water-heating',
        conditional: {
          dependsOn: 'fveType',
          values: ['water-heating']
        },
        options: [
          { value: 'electric-boiler', label: 'Elektrický bojler' },
          { value: 'gas-boiler', label: 'Plynový bojler' },
          { 
            value: 'heat-pump', 
            label: 'Tepelné čerpadlo',
            conditional: {
              dependsOn: 'hasHeatPump',
              values: ['yes']
            }
          },
          { value: 'solar', label: 'Solární ohřev' },
          { value: 'solid-fuel', label: 'Tuhá paliva' },
          { value: 'district-heating', label: 'Dálkové vytápění' },
          { value: 'other', label: 'Jiné' }
        ]
      },
      {
        id: 'currentWaterHeatingOther',
        type: 'text',
        label: 'Specifikujte způsob ohřevu',
        placeholder: 'Popište váš způsob ohřevu vody',
        required: true,
        icon: 'Edit',
        group: 'water-heating',
        conditional: {
          dependsOn: 'currentWaterHeating',
          values: ['other']
        }
      },
      {
        id: 'batteryCapacity',
        type: 'select',
        label: 'Očekávaná kapacita baterie',
        required: true,
        icon: 'Battery',
        group: 'battery',
        conditional: {
          dependsOn: 'fveType',
          values: ['battery']
        },
        options: [
          { value: '5-10', label: '5-10 kWh' },
          { value: '10-15', label: '10-15 kWh' },
          { value: '15-25', label: '15-25 kWh' },
          { value: '25+', label: 'Nad 25 kWh' },
          { value: 'advice', label: 'Nechám si poradit' }
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
        note: 'Najdete na vyúčtování elektřiny za poslední rok',
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
          { 
            value: 'heat-pump', 
            label: 'Tepelné čerpadlo', 
            icon: 'Wind',
            conditional: {
              dependsOn: 'hasHeatPump',
              values: ['yes']
            }
          },
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
              dependsOn: 'hasHeatPump',
              values: ['yes'],
              and: [{
                dependsOn: 'propertyType',
                values: ['family-house']
              }]
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
              dependsOn: 'fveType',
              values: ['heat-pump'],
              and: [{
                dependsOn: 'hasHeatPump',
                values: ['no']
              }, {
                dependsOn: 'propertyType',
                values: ['family-house']
              }]
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
    id: 'system-preferences',
    title: 'Preference systému',
    description: 'Vaše požadavky na fotovoltaický systém',
    icon: 'Settings',
    groups: [
      {
        id: 'system-goals',
        title: 'Cíle a velikost instalace',
        icon: 'Target',
        fields: ['systemGoal', 'systemSize']
      },
      {
        id: 'financial',
        title: 'Finanční aspekty',
        icon: 'Banknote',
        fields: ['budget', 'financing', 'timeline']
      }
    ],
    fields: [
      {
        id: 'systemGoal',
        type: 'multiselect',
        label: 'Hlavní cíl instalace FVE',
        required: true,
        icon: 'Target',
        group: 'system-goals',
        options: [
          { value: 'savings', label: 'Maximální úspora na účtech za elektřinu', icon: 'PiggyBank' },
          { value: 'independence', label: 'Energetická nezávislost', icon: 'Shield' },
          { value: 'ecology', label: 'Ekologické důvody', icon: 'Leaf' },
          { value: 'investment', label: 'Investice s návratností', icon: 'TrendingUp' }
        ]
      },
      {
        id: 'systemSize',
        type: 'multiselect',
        label: 'Preferovaná velikost FVE',
        required: true,
        icon: 'Maximize',
        group: 'system-goals',
        options: [
          { value: 'optimal', label: 'Optimální pro mou spotřebu', icon: 'Target' },
          { value: 'maximum', label: 'Maximální možná na střechu', icon: 'Maximize' },
          { value: 'budget', label: 'Podle rozpočtu', icon: 'Banknote' },
          { value: 'subsidies', label: 'Podle maximální možné dotace', icon: 'Gift' }
        ]
      },
      {
        id: 'budget',
        type: 'select',
        label: 'Orientační rozpočet (včetně DPH)',
        required: true,
        icon: 'CreditCard',
        group: 'financial',
        options: [
          { value: 'under-200k', label: 'Do 200 000 Kč' },
          { value: '200k-400k', label: '200 000 - 400 000 Kč' },
          { value: '400k-600k', label: '400 000 - 600 000 Kč' },
          { value: '600k-800k', label: '600 000 - 800 000 Kč' },
          { value: '800k-1000k', label: '800 000 - 1 000 000 Kč' },
          { value: 'over-1000k', label: 'Nad 1 000 000 Kč' }
        ]
      },
      {
        id: 'financing',
        type: 'radio',
        label: 'Způsob financování',
        required: true,
        icon: 'CreditCard',
        group: 'financial',
        options: [
          { value: 'cash', label: 'Hotovost/vlastní prostředky', icon: 'Banknote' },
          { value: 'loan', label: 'Úvěr/leasing', icon: 'CreditCard' },
          { value: 'subsidy', label: 'Dotace + vlastní prostředky', icon: 'Gift' },
          { value: 'combination', label: 'Kombinace více způsobů', icon: 'Layers' }
        ]
      },
      {
        id: 'timeline',
        type: 'select',
        label: 'Preferovaný termín realizace',
        required: true,
        icon: 'Calendar',
        group: 'financial',
        options: [
          { value: 'asap', label: 'Co nejdříve' },
          { value: '1-3months', label: '1-3 měsíce' },
          { value: '3-6months', label: '3-6 měsíců' },
          { value: '6-12months', label: '6-12 měsíců' },
          { value: 'next-year', label: 'Příští rok' },
          { value: 'flexible', label: 'Jsem flexibilní' }
        ]
      }
    ]
  },
  {
    id: 'documents',
    title: 'Dokumenty a přílohy',
    description: 'Nahrajte relevantní dokumenty pro přesnější nabídku',
    icon: 'Upload',
    groups: [
      {
        id: 'photos',
        title: 'Fotografie',
        icon: 'Camera',
        fields: ['roofPhotos']
      },
      {
        id: 'documents',
        title: 'Dokumenty',
        icon: 'FileText',
        fields: ['electricityBill', 'buildingPlans']
      },
      {
        id: 'additional-info',
        title: 'Dodatečné informace',
        icon: 'MessageSquare',
        fields: ['notes']
      }
    ],
    fields: [
      {
        id: 'roofPhotos',
        type: 'file',
        label: 'Fotografie střechy',
        placeholder: 'Nahrajte fotografie střechy ze všech stran',
        required: false,
        icon: 'Camera',
        group: 'photos',
        note: 'Doporučujeme nahrát fotografie střechy ze všech stran pro přesnější návrh'
      },
      {
        id: 'electricityBill',
        type: 'file',
        label: 'Vyúčtování elektřiny',
        placeholder: 'Poslední roční vyúčtování za elektřinu',
        required: false,
        icon: 'FileText',
        group: 'documents',
        note: 'Pomůže nám lépe určit vaši spotřebu a optimální velikost FVE'
      },
      {
        id: 'buildingPlans',
        type: 'file',
        label: 'Plány objektu',
        placeholder: 'Půdorys, situační plán nebo jiné technické dokumenty',
        required: false,
        icon: 'Map',
        group: 'documents',
        note: 'Nepovinné - pomůže při návrhu optimálního umístění'
      },
      {
        id: 'notes',
        type: 'textarea',
        label: 'Poznámky a speciální požadavky',
        placeholder: 'Zde můžete uvést jakékoliv další informace, specifické požadavky, dotazy nebo připomínky...',
        required: false,
        icon: 'MessageSquare',
        group: 'additional-info'
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
        fields: ['marketingConsent']
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
        id: 'marketingConsent',
        type: 'checkbox',
        label: 'Souhlasím s kontaktováním ohledně informací a novinek v oblasti obnovitelných zdrojů energie',
        required: false,
        icon: 'Mail',
        group: 'consent'
      }
    ]
  }
];

// Definice kompletního průvodce pro výběr FVE
export const vyberfveWizard: Wizard = {
  id: 'vyberfve',
  name: 'Průvodce výběrem fotovoltaiky',
  description: 'Interaktivní průvodce pro výběr fotovoltaické elektrárny. Získejte nabídku na míru během několika minut.',
  category: 'Energie',
  steps: vyberfveSteps,
  settings: {
    theme: {
      primaryColor: '#374151',
      secondaryColor: '#6B7280',
      accentColor: '#3B82F6',
      backgroundColor: '#FFFFFF',
      textColor: '#111827',
      fontFamily: 'Inter',
      borderRadius: '12px',
      shadows: true,
      animations: true,
      gradientBackground: true,
      gradientDirection: 'to-br',
      gradientColors: ['#f8fafc', '#ffffff', '#f1f5f9'],
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
      message: 'Děkujeme za vyplnění průvodce výběrem fotovoltaiky!',
      collectAnalytics: false,
      showDownloadPdf: true,
      emailNotification: true,
      pdfLogoUrl: 'https://i.imgur.com/7HIO2Pw.jpeg',
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

// Poznámka: Pro funkčnost map je potřeba nakonfigurovat API klíč
// vyberfveWizard.settings.integrations = {
//   mapyApiKey: 'vCdbERKNLmfB7W-gZ1LgJyP2Ou0UnXeR1NhQxB1RclU'
// };