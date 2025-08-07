import { WizardStep, WizardSettings } from '../types/wizard';

/**
 * Výchozí kroky průvodce, které mohou být použity jako šablona pro vytvoření nového průvodce
 */
export const defaultWizardSteps: WizardStep[] = [
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
  // Další kroky šablony by pokračovaly tady...
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
        label: 'Souhlasím s kontaktováním ohledně dalších nabídek a novinek',
        required: false,
        icon: 'Mail',
        group: 'consent'
      }
    ]
  }
];

/**
 * Výchozí nastavení průvodce
 */
export const defaultWizardSettings: WizardSettings = {
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
    showBranding: false,
    stepTransition: 'slide',
  },
  completion: {
    message: 'Děkujeme za vyplnění průvodce! Vaše poptávka byla úspěšně odeslána.',
    collectAnalytics: false,
    showDownloadPdf: true,
    emailNotification: true,
    pdfFields: [],
  },
  embedding: {
    allowedDomains: [],
    allowCustomization: true,
  },
  integrations: {},
};

/**
 * Vytvoří novou šablonu průvodce s výchozími daty
 * @param name Název průvodce
 * @returns Objekt s výchozím průvodcem
 */
export const createWizardTemplate = (name: string, category: string = 'Obecné') => {
  return {
    id: `wizard-${Date.now()}`,
    name,
    description: `Průvodce pro ${name}`,
    category,
    steps: defaultWizardSteps,
    settings: defaultWizardSettings,
  };
};